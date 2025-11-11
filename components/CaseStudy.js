export default function CaseStudy({ title, scenario, solution, outcome, lessons }) {
  return (
    <div className="bg-card border rounded-lg p-6 my-6">
      <h3 className="text-2xl font-bold mb-4 text-foreground">{title}</h3>
      
      <div className="space-y-4">
        <div>
          <h4 className="font-semibold text-primary mb-2">📋 Scenario</h4>
          <p className="text-foreground">{scenario}</p>
        </div>
        
        <div>
          <h4 className="font-semibold text-primary mb-2">💡 Solution</h4>
          <p className="text-foreground">{solution}</p>
        </div>
        
        <div>
          <h4 className="font-semibold text-primary mb-2">✅ Outcome</h4>
          <p className="text-foreground">{outcome}</p>
        </div>
        
        {lessons && lessons.length > 0 && (
          <div>
            <h4 className="font-semibold text-primary mb-2">🎓 Key Lessons</h4>
            <ul className="list-disc list-inside space-y-1 text-foreground ml-4">
              {lessons.map((lesson, index) => (
                <li key={index}>{lesson}</li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  )
}

