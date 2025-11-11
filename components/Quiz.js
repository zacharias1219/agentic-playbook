import { useState } from 'react'
import { CheckCircle2, XCircle, ChevronRight, ChevronLeft } from 'lucide-react'

// Single question quiz (backward compatible)
export default function Quiz({ question, options, correctAnswer, id, explanation, questions }) {
  // If questions array is provided, use MultiQuiz
  if (questions && Array.isArray(questions)) {
    return <MultiQuiz questions={questions} id={id} />
  }

  // Original single question quiz
  const [selectedAnswer, setSelectedAnswer] = useState(null)
  const [showResult, setShowResult] = useState(false)

  const handleSelect = (index) => {
    if (showResult) return
    setSelectedAnswer(index)
    setShowResult(true)
  }

  const isCorrect = selectedAnswer === correctAnswer

  if (!question || !options || !Array.isArray(options)) {
    return null
  }

  return (
    <div className="my-6 p-6 bg-card border rounded-lg">
      <h3 className="text-lg font-semibold mb-4 text-foreground">{question}</h3>
      <div className="space-y-2">
        {options.map((option, index) => {
          const isSelected = selectedAnswer === index
          const isCorrectOption = index === correctAnswer
          let bgColor = 'bg-card hover:bg-accent'
          
          if (showResult) {
            if (isCorrectOption) {
              bgColor = 'bg-primary/10 border-primary'
            } else if (isSelected && !isCorrectOption) {
              bgColor = 'bg-contrast/10 border-contrast'
            }
          }

          return (
            <button
              key={index}
              onClick={() => handleSelect(index)}
              disabled={showResult}
              className={`w-full text-left p-4 rounded-lg border transition-colors ${bgColor} ${
                showResult ? '' : 'cursor-pointer'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="text-foreground">{option}</span>
                {showResult && isSelected && (
                  <>
                    {isCorrect ? (
                      <CheckCircle2 className="w-5 h-5 text-primary" />
                    ) : (
                      <XCircle className="w-5 h-5 text-contrast" />
                    )}
                  </>
                )}
                {showResult && !isSelected && isCorrectOption && (
                  <CheckCircle2 className="w-5 h-5 text-primary" />
                )}
              </div>
            </button>
          )
        })}
      </div>
      {showResult && (
        <div className={`mt-4 p-3 rounded-lg ${
          isCorrect ? 'bg-primary/10 text-primary border border-primary/20' : 'bg-contrast/10 text-contrast border border-contrast/20'
        }`}>
          {isCorrect ? (
            <div>
              <p className="font-medium mb-2">✅ Correct! Great job!</p>
              {explanation && (
                <p className="text-sm opacity-90">{explanation}</p>
              )}
            </div>
          ) : (
            <div>
              <p className="font-medium mb-2">❌ Not quite. Try again or review the material!</p>
              {explanation && (
                <p className="text-sm opacity-90">{explanation}</p>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  )
}

// Multi-question quiz component
function MultiQuiz({ questions, id }) {
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [answers, setAnswers] = useState({})
  const [showResults, setShowResults] = useState({})
  const [showFinalResults, setShowFinalResults] = useState(false)

  const handleSelect = (questionIndex, answerIndex) => {
    if (showResults[questionIndex]) return
    setAnswers({ ...answers, [questionIndex]: answerIndex })
    setShowResults({ ...showResults, [questionIndex]: true })
  }

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1)
    } else {
      setShowFinalResults(true)
    }
  }

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1)
    }
  }

  const handleReset = () => {
    setCurrentQuestion(0)
    setAnswers({})
    setShowResults({})
    setShowFinalResults(false)
  }

  const currentQ = questions[currentQuestion]
  const selectedAnswer = answers[currentQuestion]
  const isCorrect = selectedAnswer === currentQ.correctAnswer
  const totalCorrect = Object.keys(answers).filter(
    (idx) => answers[idx] === questions[idx].correctAnswer
  ).length

  if (!questions || questions.length === 0) {
    return null
  }

  if (showFinalResults) {
    const score = totalCorrect
    const total = questions.length
    const percentage = Math.round((score / total) * 100)

    return (
      <div className="my-6 p-6 bg-card border rounded-lg">
        <h3 className="text-2xl font-bold mb-4 text-foreground">Quiz Results</h3>
        <div className="text-center mb-6">
          <div className="text-5xl font-bold mb-2 text-primary">{score}/{total}</div>
          <div className="text-xl text-muted-foreground">{percentage}% Correct</div>
        </div>

        <div className="space-y-4 mb-6">
          {questions.map((q, idx) => {
            const userAnswer = answers[idx]
            const correct = userAnswer === q.correctAnswer
            return (
              <div
                key={idx}
                className={`p-4 rounded-lg border ${
                  correct ? 'bg-primary/10 border-primary/20' : 'bg-contrast/10 border-contrast/20'
                }`}
              >
                <div className="flex items-start justify-between mb-2">
                  <p className="font-semibold text-foreground">{q.question}</p>
                  {correct ? (
                    <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0 ml-2" />
                  ) : (
                    <XCircle className="w-5 h-5 text-contrast flex-shrink-0 ml-2" />
                  )}
                </div>
                <p className="text-sm text-muted-foreground mb-1">
                  Your answer: {q.options[userAnswer]}
                </p>
                {!correct && (
                  <p className="text-sm text-primary">
                    Correct answer: {q.options[q.correctAnswer]}
                  </p>
                )}
                {q.explanation && (
                  <p className="text-sm mt-2 text-foreground opacity-90">{q.explanation}</p>
                )}
              </div>
            )
          })}
        </div>

        <button
          onClick={handleReset}
          className="w-full py-2 px-4 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
        >
          Retake Quiz
        </button>
      </div>
    )
  }

  return (
    <div className="my-6 p-6 bg-card border rounded-lg">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-foreground">
          Question {currentQuestion + 1} of {questions.length}
        </h3>
        <div className="text-sm text-muted-foreground">
          {totalCorrect} correct so far
        </div>
      </div>

      {/* Progress bar */}
      <div className="mb-4">
        <div className="flex gap-1">
          {questions.map((_, idx) => (
            <div
              key={idx}
              className={`h-2 flex-1 rounded ${
                idx === currentQuestion
                  ? 'bg-primary'
                  : answers[idx] !== undefined
                  ? answers[idx] === questions[idx].correctAnswer
                    ? 'bg-primary/50'
                    : 'bg-contrast/50'
                  : 'bg-muted'
              }`}
            />
          ))}
        </div>
      </div>

      <h4 className="text-xl font-semibold mb-4 text-foreground">{currentQ.question}</h4>
      <div className="space-y-2 mb-4">
        {currentQ.options.map((option, index) => {
          const isSelected = selectedAnswer === index
          const isCorrectOption = index === currentQ.correctAnswer
          const showResult = showResults[currentQuestion]
          let bgColor = 'bg-card hover:bg-accent'

          if (showResult) {
            if (isCorrectOption) {
              bgColor = 'bg-primary/10 border-primary'
            } else if (isSelected && !isCorrectOption) {
              bgColor = 'bg-contrast/10 border-contrast'
            }
          }

          return (
            <button
              key={index}
              onClick={() => handleSelect(currentQuestion, index)}
              disabled={showResult}
              className={`w-full text-left p-4 rounded-lg border transition-colors ${bgColor} ${
                showResult ? '' : 'cursor-pointer'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="text-foreground">{option}</span>
                {showResult && isSelected && (
                  <>
                    {isCorrect ? (
                      <CheckCircle2 className="w-5 h-5 text-primary" />
                    ) : (
                      <XCircle className="w-5 h-5 text-contrast" />
                    )}
                  </>
                )}
                {showResult && !isSelected && isCorrectOption && (
                  <CheckCircle2 className="w-5 h-5 text-primary" />
                )}
              </div>
            </button>
          )
        })}
      </div>

      {showResults[currentQuestion] && currentQ.explanation && (
        <div className={`mb-4 p-3 rounded-lg ${
          isCorrect ? 'bg-primary/10 text-primary border border-primary/20' : 'bg-contrast/10 text-contrast border border-contrast/20'
        }`}>
          <p className="text-sm">{currentQ.explanation}</p>
        </div>
      )}

      <div className="flex justify-between">
        <button
          onClick={handlePrevious}
          disabled={currentQuestion === 0}
          className="flex items-center px-4 py-2 border rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-accent"
        >
          <ChevronLeft className="w-4 h-4 mr-2" />
          Previous
        </button>
        <button
          onClick={handleNext}
          disabled={!showResults[currentQuestion]}
          className="flex items-center px-4 py-2 bg-primary text-primary-foreground rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-primary/90"
        >
          {currentQuestion === questions.length - 1 ? 'See Results' : 'Next'}
          <ChevronRight className="w-4 h-4 ml-2" />
        </button>
      </div>
    </div>
  )
}
