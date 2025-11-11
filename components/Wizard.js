import { useState } from 'react'
import { ChevronRight, ChevronLeft, Check } from 'lucide-react'
import { generateProjectTemplate } from '../lib/wizard-generator'

const PROJECT_TYPES = [
  'Personal Assistant',
  'Research Agent',
  'Finance Helper',
  'Social Media Agent',
  'Custom Idea'
]

export default function Wizard() {
  const [step, setStep] = useState(1)
  const [answers, setAnswers] = useState({
    projectType: '',
    customIdea: '',
    useInternet: null,
    useMemory: null,
    useMultiAgent: null,
  })
  const [output, setOutput] = useState(null)

  const handleNext = () => {
    if (step < 4) {
      setStep(step + 1)
    } else {
      generateOutput()
    }
  }

  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1)
    }
  }

  const generateOutput = () => {
    const template = generateProjectTemplate(answers)
    setOutput(template)
    setStep(5)
  }

  const handleAnswer = (key, value) => {
    setAnswers({ ...answers, [key]: value })
  }

  const canProceed = () => {
    switch (step) {
      case 1:
        return answers.projectType !== ''
      case 2:
        return answers.useInternet !== null
      case 3:
        return answers.useMemory !== null
      case 4:
        return answers.useMultiAgent !== null
      default:
        return true
    }
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      {/* Progress Bar */}
      <div className="mb-8">
        <div className="flex justify-between mb-2">
          {[1, 2, 3, 4].map((s) => (
            <div
              key={s}
              className={`flex-1 h-2 mx-1 rounded ${
                s <= step ? (s % 2 === 0 ? 'bg-primary' : 'bg-contrast') : 'bg-muted'
              }`}
            />
          ))}
        </div>
        <p className="text-sm text-muted-foreground text-center">
          Step {step} of 4
        </p>
      </div>

      {/* Step Content */}
      {step === 1 && (
        <div className="space-y-4">
          <h2 className="text-2xl font-bold mb-4">What do you want to build?</h2>
          <div className="grid gap-4">
            {PROJECT_TYPES.map((type) => (
              <button
                key={type}
                onClick={() => handleAnswer('projectType', type)}
                className={`p-4 border rounded-lg text-left transition-colors ${
                  answers.projectType === type
                    ? 'border-primary bg-primary/5'
                    : 'border-border hover:bg-accent'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="font-medium">{type}</span>
                  {answers.projectType === type && (
                    <Check className="w-5 h-5 text-primary" />
                  )}
                </div>
              </button>
            ))}
          </div>
          {answers.projectType === 'Custom Idea' && (
            <input
              type="text"
              placeholder="Describe your custom project idea..."
              value={answers.customIdea}
              onChange={(e) => handleAnswer('customIdea', e.target.value)}
              className="w-full p-3 border rounded-lg mt-4"
            />
          )}
        </div>
      )}

      {step === 2 && (
        <div className="space-y-4">
          <h2 className="text-2xl font-bold mb-4">Will it use internet tools?</h2>
          <p className="text-muted-foreground mb-6">
            This allows your agent to search the web, browse websites, and access real-time information.
          </p>
          <div className="grid grid-cols-2 gap-4">
            <button
              onClick={() => handleAnswer('useInternet', true)}
              className={`p-6 border rounded-lg text-center transition-colors ${
                answers.useInternet === true
                  ? 'border-primary bg-primary/5'
                  : 'border-border hover:bg-accent'
              }`}
            >
              <div className="text-2xl mb-2">✅</div>
              <div className="font-medium">Yes</div>
            </button>
            <button
              onClick={() => handleAnswer('useInternet', false)}
              className={`p-6 border rounded-lg text-center transition-colors ${
                answers.useInternet === false
                  ? 'border-primary bg-primary/5'
                  : 'border-border hover:bg-accent'
              }`}
            >
              <div className="text-2xl mb-2">❌</div>
              <div className="font-medium">No</div>
            </button>
          </div>
        </div>
      )}

      {step === 3 && (
        <div className="space-y-4">
          <h2 className="text-2xl font-bold mb-4">Will it save memory?</h2>
          <p className="text-muted-foreground mb-6">
            Persistent memory allows your agent to remember past conversations and learn from interactions.
          </p>
          <div className="grid grid-cols-2 gap-4">
            <button
              onClick={() => handleAnswer('useMemory', true)}
              className={`p-6 border rounded-lg text-center transition-colors ${
                answers.useMemory === true
                  ? 'border-primary bg-primary/5'
                  : 'border-border hover:bg-accent'
              }`}
            >
              <div className="text-2xl mb-2">✅</div>
              <div className="font-medium">Yes</div>
            </button>
            <button
              onClick={() => handleAnswer('useMemory', false)}
              className={`p-6 border rounded-lg text-center transition-colors ${
                answers.useMemory === false
                  ? 'border-primary bg-primary/5'
                  : 'border-border hover:bg-accent'
              }`}
            >
              <div className="text-2xl mb-2">❌</div>
              <div className="font-medium">No</div>
            </button>
          </div>
        </div>
      )}

      {step === 4 && (
        <div className="space-y-4">
          <h2 className="text-2xl font-bold mb-4">Do you want multi-agent teamwork?</h2>
          <p className="text-muted-foreground mb-6">
            Multiple agents can work together, each specializing in different tasks for more complex workflows.
          </p>
          <div className="grid grid-cols-2 gap-4">
            <button
              onClick={() => handleAnswer('useMultiAgent', true)}
              className={`p-6 border rounded-lg text-center transition-colors ${
                answers.useMultiAgent === true
                  ? 'border-primary bg-primary/5'
                  : 'border-border hover:bg-accent'
              }`}
            >
              <div className="text-2xl mb-2">✅</div>
              <div className="font-medium">Yes</div>
            </button>
            <button
              onClick={() => handleAnswer('useMultiAgent', false)}
              className={`p-6 border rounded-lg text-center transition-colors ${
                answers.useMultiAgent === false
                  ? 'border-primary bg-primary/5'
                  : 'border-border hover:bg-accent'
              }`}
            >
              <div className="text-2xl mb-2">❌</div>
              <div className="font-medium">No</div>
            </button>
          </div>
        </div>
      )}

      {step === 5 && output && (
        <div className="space-y-6">
          <h2 className="text-2xl font-bold mb-4">Your Project Template</h2>
          
          <div className="bg-card border rounded-lg p-6">
            <h3 className="text-xl font-semibold mb-3">System Prompt</h3>
            <p className="text-muted-foreground whitespace-pre-wrap">{output.systemPrompt}</p>
          </div>

          <div className="bg-card border rounded-lg p-6">
            <h3 className="text-xl font-semibold mb-3">Tech Stack</h3>
            <ul className="list-disc list-inside space-y-2">
              {output.techStack.map((tech, idx) => (
                <li key={idx}>{tech}</li>
              ))}
            </ul>
          </div>

          <div className="bg-card border rounded-lg p-6">
            <h3 className="text-xl font-semibold mb-3">File Structure</h3>
            <pre className="bg-muted p-4 rounded-lg overflow-x-auto text-sm">
              {output.fileStructure}
            </pre>
          </div>

          <div className="bg-card border rounded-lg p-6">
            <h3 className="text-xl font-semibold mb-3">Code Template</h3>
            <pre className="bg-muted p-4 rounded-lg overflow-x-auto text-sm">
              {output.codeTemplate}
            </pre>
          </div>
        </div>
      )}

      {/* Navigation Buttons */}
      {step < 5 && (
        <div className="flex justify-between mt-8">
          <button
            onClick={handleBack}
            disabled={step === 1}
            className="flex items-center px-4 py-2 border rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-accent"
          >
            <ChevronLeft className="w-4 h-4 mr-2" />
            Back
          </button>
          <button
            onClick={handleNext}
            disabled={!canProceed()}
            className="flex items-center px-4 py-2 bg-gradient-to-r from-primary to-contrast text-white rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:opacity-90 transition-opacity"
          >
            {step === 4 ? 'Generate' : 'Next'}
            <ChevronRight className="w-4 h-4 ml-2" />
          </button>
        </div>
      )}
    </div>
  )
}

