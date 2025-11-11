import { useEffect, useRef } from 'react'

export default function Diagram({ children, title }) {
  const diagramRef = useRef(null)

  useEffect(() => {
    if (typeof window !== 'undefined' && diagramRef.current) {
      import('mermaid').then((mermaid) => {
        mermaid.default.initialize({
          startOnLoad: true,
          theme: 'dark',
          themeVariables: {
            primaryColor: '#3b82f6',
            primaryTextColor: '#ffffff',
            primaryBorderColor: '#60a5fa',
            lineColor: '#94a3b8',
            secondaryColor: '#f97316',
            tertiaryColor: '#64748b',
          },
        })
        mermaid.default.contentLoaded()
      })
    }
  }, [children])

  if (!children) return null

  return (
    <div className="my-6">
      {title && (
        <h4 className="text-lg font-semibold mb-3 text-foreground">{title}</h4>
      )}
      <div className="bg-muted p-4 rounded-lg overflow-x-auto">
        <div ref={diagramRef} className="mermaid">
          {children}
        </div>
      </div>
    </div>
  )
}

