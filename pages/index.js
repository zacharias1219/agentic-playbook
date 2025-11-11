import Layout from '../components/Layout'
import Link from 'next/link'
import { BookOpen, Wand2, Rocket, ArrowRight } from 'lucide-react'

export default function Home() {
  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Hero Section */}
        <div className="text-center py-16">
          <h1 className="text-5xl font-bold text-foreground mb-6">
            Learn Agentic AI by Building Real Systems
          </h1>
          <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto">
            Master the art of building AI agents step-by-step. Interact with checklists, quizzes, and wizards. 
            Generate project ideas, get templates, deploy your work, and showcase it in your portfolio.
          </p>
          <div className="text-6xl mb-8">🤖⚙️</div>
        </div>

        {/* Three Main CTAs */}
        <div className="grid md:grid-cols-3 gap-8">
          {/* CTA 1: Start Learning */}
          <Link href="/modules" className="group">
            <div className="bg-card border rounded-lg p-8 hover:shadow-lg transition-shadow h-full">
              <div className="flex items-center justify-center w-16 h-16 bg-primary/10 rounded-lg mb-4 group-hover:bg-primary/20 transition-colors">
                <BookOpen className="w-8 h-8 text-primary" />
              </div>
              <h2 className="text-2xl font-bold text-foreground mb-3">Start Learning</h2>
              <p className="text-muted-foreground mb-4">
                Dive into step-by-step modules covering everything from AI agent basics to advanced deployment strategies.
              </p>
              <div className="flex items-center text-primary font-medium">
                Explore Modules
                <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          </Link>

          {/* CTA 2: Build a Project */}
          <Link href="/builder" className="group">
            <div className="bg-card border rounded-lg p-8 hover:shadow-lg transition-shadow h-full">
              <div className="flex items-center justify-center w-16 h-16 bg-contrast/10 rounded-lg mb-4 group-hover:bg-contrast/20 transition-colors">
                <Wand2 className="w-8 h-8 text-contrast" />
              </div>
              <h2 className="text-2xl font-bold text-foreground mb-3">Build a Project</h2>
              <p className="text-muted-foreground mb-4">
                Use our interactive wizard to generate project ideas, get code templates, and start building your AI agent.
              </p>
              <div className="flex items-center text-primary font-medium">
                Launch Wizard
                <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          </Link>

          {/* CTA 3: Deploy & Showcase */}
          <Link href="/deploy" className="group">
            <div className="bg-card border rounded-lg p-8 hover:shadow-lg transition-shadow h-full">
              <div className="flex items-center justify-center w-16 h-16 bg-primary/10 rounded-lg mb-4 group-hover:bg-primary/20 transition-colors">
                <Rocket className="w-8 h-8 text-primary" />
              </div>
              <h2 className="text-2xl font-bold text-foreground mb-3">Deploy & Showcase</h2>
              <p className="text-muted-foreground mb-4">
                Learn how to deploy your projects and showcase them in your portfolio. See what others have built.
              </p>
              <div className="flex items-center text-primary font-medium">
                Get Started
                <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          </Link>
        </div>

        {/* Features Section */}
        <div className="mt-24">
          <h2 className="text-3xl font-bold text-center mb-12">What You'll Learn</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="text-4xl mb-3">🧠</div>
              <h3 className="font-semibold mb-2">Agent Thinking</h3>
              <p className="text-sm text-muted-foreground">Understand how AI agents reason and make decisions</p>
            </div>
            <div className="text-center">
              <div className="text-4xl mb-3">🧰</div>
              <h3 className="font-semibold mb-2">CrewAI Framework</h3>
              <p className="text-sm text-muted-foreground">Build multi-agent systems with real code examples</p>
            </div>
            <div className="text-center">
              <div className="text-4xl mb-3">🔗</div>
              <h3 className="font-semibold mb-2">Tools & APIs</h3>
              <p className="text-sm text-muted-foreground">Connect agents to the internet, databases, and more</p>
            </div>
            <div className="text-center">
              <div className="text-4xl mb-3">⚖️</div>
              <h3 className="font-semibold mb-2">Ethics & Safety</h3>
              <p className="text-sm text-muted-foreground">Learn responsible AI development practices</p>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}

