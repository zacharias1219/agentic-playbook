import Layout from '../components/Layout'
import { CheckCircle2, ExternalLink, Code, FileText } from 'lucide-react'

export default function Deploy() {
  return (
    <Layout>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-foreground mb-4">Deployment Guide</h1>
          <p className="text-xl text-muted-foreground">
            Learn how to deploy your AI agent projects and showcase them
          </p>
        </div>

        {/* Step 1: Push to GitHub */}
        <div className="mb-12">
            <div className="flex items-center mb-4">
              <div className="flex items-center justify-center w-10 h-10 rounded-full bg-gradient-to-r from-primary to-contrast text-white font-bold mr-4">
                1
              </div>
            <h2 className="text-2xl font-bold">Push to GitHub</h2>
          </div>
          <div className="bg-card border rounded-lg p-6 ml-14">
            <p className="mb-4 text-foreground">
              Create a new repository on GitHub and push your project code.
            </p>
            <div className="bg-muted p-4 rounded-lg mb-4">
              <code className="text-sm">
                git init<br />
                git add .<br />
                git commit -m "Initial commit"<br />
                git branch -M main<br />
                git remote add origin https://github.com/yourusername/your-repo.git<br />
                git push -u origin main
              </code>
            </div>
            <div className="flex items-start">
              <CheckCircle2 className="w-5 h-5 text-green-500 mr-2 mt-0.5" />
              <span className="text-sm text-muted-foreground">
                Make sure to add a <code className="bg-muted px-1 rounded">.gitignore</code> file to exclude sensitive files
              </span>
            </div>
          </div>
        </div>

        {/* Step 2: Add .env safely */}
        <div className="mb-12">
          <div className="flex items-center mb-4">
              <div className="flex items-center justify-center w-10 h-10 rounded-full bg-gradient-to-r from-primary to-contrast text-white font-bold mr-4">
              2
            </div>
            <h2 className="text-2xl font-bold">Add .env Safely</h2>
          </div>
          <div className="bg-card border rounded-lg p-6 ml-14">
            <p className="mb-4 text-foreground">
              Never commit your <code className="bg-muted px-1 rounded">.env</code> file to GitHub. Instead, use environment variables in your hosting platform.
            </p>
            <div className="bg-muted p-4 rounded-lg mb-4">
              <code className="text-sm">
                # .gitignore<br />
                .env<br />
                .env.local<br />
                __pycache__/<br />
                *.pyc
              </code>
            </div>
            <div className="space-y-2">
              <div className="flex items-start">
                <CheckCircle2 className="w-5 h-5 text-green-500 mr-2 mt-0.5" />
                <span className="text-sm text-foreground">
                  Create a <code className="bg-muted px-1 rounded">.env.example</code> file with placeholder values
                </span>
              </div>
              <div className="flex items-start">
                <CheckCircle2 className="w-5 h-5 text-green-500 mr-2 mt-0.5" />
                <span className="text-sm text-foreground">
                  Add your actual API keys in your hosting platform's environment variables section
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Step 3: Deploy on Netlify or Vercel */}
        <div className="mb-12">
          <div className="flex items-center mb-4">
              <div className="flex items-center justify-center w-10 h-10 rounded-full bg-gradient-to-r from-primary to-contrast text-white font-bold mr-4">
              3
            </div>
            <h2 className="text-2xl font-bold">Deploy on Netlify or Vercel</h2>
          </div>
          
          {/* Netlify Option */}
          <div className="bg-card border rounded-lg p-6 ml-14 mb-4">
            <h3 className="text-xl font-semibold mb-3 flex items-center">
              <ExternalLink className="w-5 h-5 mr-2" />
              Option A: Netlify
            </h3>
            <ol className="list-decimal list-inside space-y-2 text-foreground mb-4">
              <li>Go to <a href="https://netlify.com" className="text-primary hover:underline" target="_blank" rel="noopener noreferrer">netlify.com</a> and sign in</li>
              <li>Click "Add new site" → "Import an existing project"</li>
              <li>Connect your GitHub repository</li>
              <li>Configure build settings:
                <div className="bg-muted p-3 rounded mt-2 ml-4">
                  <code className="text-sm">
                    Build command: npm run build<br />
                    Publish directory: .next
                  </code>
                </div>
              </li>
              <li>Add environment variables in Site settings → Environment variables</li>
              <li>Deploy!</li>
            </ol>
          </div>

          {/* Vercel Option */}
          <div className="bg-card border rounded-lg p-6 ml-14">
            <h3 className="text-xl font-semibold mb-3 flex items-center">
              <ExternalLink className="w-5 h-5 mr-2" />
              Option B: Vercel
            </h3>
            <ol className="list-decimal list-inside space-y-2 text-foreground mb-4">
              <li>Go to <a href="https://vercel.com" className="text-primary hover:underline" target="_blank" rel="noopener noreferrer">vercel.com</a> and sign in</li>
              <li>Click "Add New Project"</li>
              <li>Import your GitHub repository</li>
              <li>Vercel auto-detects Next.js settings</li>
              <li>Add environment variables in Project settings</li>
              <li>Deploy!</li>
            </ol>
          </div>
        </div>

        {/* Step 4: Add Disclaimer & Security */}
        <div className="mb-12">
          <div className="flex items-center mb-4">
              <div className="flex items-center justify-center w-10 h-10 rounded-full bg-gradient-to-r from-primary to-contrast text-white font-bold mr-4">
              4
            </div>
            <h2 className="text-2xl font-bold">Add Disclaimer & Security</h2>
          </div>
          <div className="bg-card border rounded-lg p-6 ml-14">
            <p className="mb-4 text-foreground">
              Add important disclaimers and security measures to your project.
            </p>
            <div className="space-y-4">
              <div>
                <h4 className="font-semibold mb-2 flex items-center">
                  <FileText className="w-4 h-4 mr-2" />
                  README.md Checklist
                </h4>
                <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground ml-6">
                  <li>Project description and purpose</li>
                  <li>Installation instructions</li>
                  <li>Environment variables setup</li>
                  <li>Usage examples</li>
                  <li>Limitations and disclaimers</li>
                  <li>License information</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold mb-2">Security Best Practices</h4>
                <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground ml-6">
                  <li>Never expose API keys in client-side code</li>
                  <li>Use rate limiting for API calls</li>
                  <li>Add input validation and sanitization</li>
                  <li>Include error handling</li>
                  <li>Add logging for debugging</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Step 5: Portfolio Screenshot */}
        <div className="mb-12">
          <div className="flex items-center mb-4">
              <div className="flex items-center justify-center w-10 h-10 rounded-full bg-gradient-to-r from-primary to-contrast text-white font-bold mr-4">
              5
            </div>
            <h2 className="text-2xl font-bold">Make Portfolio Screenshot</h2>
          </div>
          <div className="bg-card border rounded-lg p-6 ml-14">
            <p className="mb-4 text-foreground">
              Capture screenshots of your deployed project for your portfolio.
            </p>
            <div className="space-y-2">
              <div className="flex items-start">
                <CheckCircle2 className="w-5 h-5 text-green-500 mr-2 mt-0.5" />
                <span className="text-sm text-foreground">
                  Take screenshots of key features and UI
                </span>
              </div>
              <div className="flex items-start">
                <CheckCircle2 className="w-5 h-5 text-green-500 mr-2 mt-0.5" />
                <span className="text-sm text-foreground">
                  Create a demo video or GIF (optional but recommended)
                </span>
              </div>
              <div className="flex items-start">
                <CheckCircle2 className="w-5 h-5 text-green-500 mr-2 mt-0.5" />
                <span className="text-sm text-foreground">
                  Add project to your portfolio website
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Links */}
        <div className="bg-primary/5 border border-primary/20 rounded-lg p-6">
          <h3 className="text-xl font-semibold mb-4">Next Steps</h3>
          <div className="grid md:grid-cols-2 gap-4">
            <a
              href="/showcase"
              className="flex items-center p-4 bg-card border rounded-lg hover:shadow-md transition-shadow"
            >
              <ExternalLink className="w-5 h-5 mr-3" />
              <div>
                <div className="font-semibold">View Showcase</div>
                <div className="text-sm text-muted-foreground">See what others have built</div>
              </div>
            </a>
            <a
              href="/modules"
              className="flex items-center p-4 bg-card border rounded-lg hover:shadow-md transition-shadow"
            >
              <Code className="w-5 h-5 mr-3" />
              <div>
                <div className="font-semibold">Continue Learning</div>
                <div className="text-sm text-muted-foreground">Explore more modules</div>
              </div>
            </a>
          </div>
        </div>
      </div>
    </Layout>
  )
}

