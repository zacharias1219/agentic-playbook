import { useState } from 'react'
import { Play, Copy, Check } from 'lucide-react'

export default function CodePlayground({ 
  defaultCode = '', 
  language = 'python',
  title = 'Code Playground',
  editable = true 
}) {
  const [code, setCode] = useState(defaultCode)
  const [output, setOutput] = useState('')
  const [isRunning, setIsRunning] = useState(false)
  const [copied, setCopied] = useState(false)

  const handleCopy = async () => {
    await navigator.clipboard.writeText(code)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const handleRun = () => {
    setIsRunning(true)
    setOutput('Running code...\n\nNote: This is a demo. In a real implementation, code would be executed securely on a server.')
    
    // Simulate execution
    setTimeout(() => {
      setOutput('Code execution simulated.\n\n⚠️ For security reasons, code execution is disabled in this demo.\n\nTo run Python code:\n1. Copy the code\n2. Run it locally in your Python environment\n3. Or use online Python playgrounds like repl.it')
      setIsRunning(false)
    }, 1000)
  }

  return (
    <div className="my-6 bg-card border rounded-lg overflow-hidden">
      <div className="flex items-center justify-between p-4 border-b bg-muted/50">
        <h4 className="font-semibold text-foreground">{title}</h4>
        <div className="flex gap-2">
          <button
            onClick={handleCopy}
            className="flex items-center px-3 py-1.5 text-sm border rounded hover:bg-accent transition-colors"
            title="Copy code"
          >
            {copied ? (
              <>
                <Check className="w-4 h-4 mr-1 text-primary" />
                Copied!
              </>
            ) : (
              <>
                <Copy className="w-4 h-4 mr-1" />
                Copy
              </>
            )}
          </button>
          {editable && (
            <button
              onClick={handleRun}
              disabled={isRunning}
              className="flex items-center px-3 py-1.5 text-sm bg-primary text-primary-foreground rounded hover:bg-primary/90 disabled:opacity-50 transition-colors"
            >
              <Play className="w-4 h-4 mr-1" />
              {isRunning ? 'Running...' : 'Run'}
            </button>
          )}
        </div>
      </div>

      <div className="relative">
        {editable ? (
          <textarea
            value={code}
            onChange={(e) => setCode(e.target.value)}
            className="w-full h-64 p-4 bg-muted font-mono text-sm text-foreground resize-none focus:outline-none focus:ring-2 focus:ring-primary"
            placeholder={`Enter your ${language} code here...`}
            spellCheck={false}
          />
        ) : (
          <pre className="p-4 bg-muted overflow-x-auto">
            <code className={`language-${language} text-sm text-foreground`}>{code}</code>
          </pre>
        )}
        <div className="absolute top-2 right-2">
          <span className="text-xs bg-background/80 px-2 py-1 rounded text-muted-foreground">
            {language}
          </span>
        </div>
      </div>

      {output && (
        <div className="p-4 border-t bg-muted/50">
          <div className="text-sm font-semibold mb-2 text-foreground">Output:</div>
          <pre className="text-sm text-foreground whitespace-pre-wrap font-mono">
            {output}
          </pre>
        </div>
      )}

      <div className="p-3 bg-muted/30 border-t">
        <p className="text-xs text-muted-foreground">
          💡 Tip: Copy the code and run it in your local Python environment or use an online Python playground.
        </p>
      </div>
    </div>
  )
}

