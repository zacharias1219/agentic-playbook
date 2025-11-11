import Layout from '../components/Layout'
import { ExternalLink, Github, MessageSquare, FileText, Mail } from 'lucide-react'
import { promises as fs } from 'fs'
import path from 'path'

export async function getStaticProps() {
  const filePath = path.join(process.cwd(), 'public', 'showcase.json')
  try {
    const fileContents = await fs.readFile(filePath, 'utf8')
    const showcaseData = JSON.parse(fileContents)
    return {
      props: {
        showcaseData,
      },
    }
  } catch (error) {
    return {
      props: {
        showcaseData: { projects: [] },
      },
    }
  }
}

export default function Showcase({ showcaseData }) {
  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-foreground mb-4">Project Showcase</h1>
          <p className="text-xl text-muted-foreground">
            See what students have built with Agentic AI
          </p>
        </div>

        {showcaseData.projects.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-muted-foreground mb-4">
              No projects yet. Be the first to showcase your work!
            </p>
            <p className="text-sm text-muted-foreground">
              Projects are manually added to <code className="bg-muted px-2 py-1 rounded">public/showcase.json</code>
            </p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {showcaseData.projects.map((project, index) => (
              <div
                key={index}
                className="bg-card border rounded-lg overflow-hidden hover:shadow-lg transition-shadow"
              >
                {project.screenshot && (
                  <div className="aspect-video bg-muted flex items-center justify-center">
                    <img
                      src={project.screenshot}
                      alt={project.title}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.target.style.display = 'none'
                        e.target.parentElement.innerHTML = '<div class="w-full h-full flex items-center justify-center text-muted-foreground">No Image</div>'
                      }}
                    />
                  </div>
                )}
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-2 text-foreground">{project.title}</h3>
                  <p className="text-muted-foreground mb-4 text-sm line-clamp-3">
                    {project.description}
                  </p>
                  <div className="flex flex-wrap gap-3">
                    {project.github && (
                      <a
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center text-sm text-primary hover:underline"
                      >
                        <Github className="w-4 h-4 mr-1" />
                        GitHub
                      </a>
                    )}
                    {project.live && (
                      <a
                        href={project.live}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center text-sm text-primary hover:underline"
                      >
                        <ExternalLink className="w-4 h-4 mr-1" />
                        Live Demo
                      </a>
                    )}
                    {project.issue && (
                      <a
                        href={project.issue}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center text-sm text-primary hover:underline"
                        title="Open GitHub issue for feedback/questions"
                      >
                        <MessageSquare className="w-4 h-4 mr-1" />
                        Feedback
                      </a>
                    )}
                    {project.docs && (
                      <a
                        href={project.docs}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center text-sm text-primary hover:underline"
                      >
                        <FileText className="w-4 h-4 mr-1" />
                        Docs
                      </a>
                    )}
                    {project.contact && (
                      <a
                        href={project.contact}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center text-sm text-primary hover:underline"
                      >
                        <Mail className="w-4 h-4 mr-1" />
                        Contact
                      </a>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        <div className="mt-12 bg-card border rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-3">Want to showcase your project?</h2>
          <p className="text-muted-foreground mb-4">
            If you've built something awesome with Agentic AI, we'd love to feature it! 
            Contact the maintainers or submit a pull request with your project details.
          </p>
          
          <div className="mb-6">
            <h3 className="font-semibold mb-2">Available Link Types:</h3>
            <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground ml-4">
              <li><strong>github</strong>: Link to your project repository</li>
              <li><strong>live</strong>: Link to your deployed project</li>
              <li><strong>issue</strong>: Link to GitHub issue for feedback/questions (e.g., <code className="bg-muted px-1 rounded">https://github.com/user/repo/issues/new</code>)</li>
              <li><strong>docs</strong>: Link to project documentation</li>
              <li><strong>contact</strong>: Email or contact link (use <code className="bg-muted px-1 rounded">mailto:</code> for emails)</li>
            </ul>
          </div>

          <div className="text-sm text-muted-foreground">
            <p className="mb-2">To add a project manually, edit <code className="bg-muted px-2 py-1 rounded">public/showcase.json</code>:</p>
            <pre className="bg-muted p-3 rounded overflow-x-auto text-xs">
{`{
  "projects": [
    {
      "title": "Your Project Name",
      "screenshot": "/path/to/screenshot.png",
      "github": "https://github.com/yourusername/repo",
      "live": "https://your-project.netlify.app",
      "issue": "https://github.com/yourusername/repo/issues/new",
      "docs": "https://your-project-docs.com",
      "contact": "mailto:your@email.com",
      "description": "A brief description of what your project does."
    }
  ]
}`}
            </pre>
            <p className="text-xs text-muted-foreground mt-2">
              All fields except "title" and "description" are optional. Use "issue" to link to a GitHub issue template for feedback.
            </p>
            <div className="mt-4 p-3 bg-gradient-to-r from-primary/10 to-contrast/10 border border-primary/20 rounded">
              <p className="text-xs font-semibold mb-1">💡 Pro Tip:</p>
              <p className="text-xs">
                Create a GitHub issue template in your repo at <code className="bg-muted px-1 rounded">.github/ISSUE_TEMPLATE/feedback.md</code> 
                and link to it using: <code className="bg-muted px-1 rounded">https://github.com/user/repo/issues/new?template=feedback.md</code>
              </p>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}

