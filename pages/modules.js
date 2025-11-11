import Layout from '../components/Layout'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import modulesData from '../content/modules.json'

export default function Modules() {
  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-foreground mb-4">Learning Modules</h1>
          <p className="text-xl text-muted-foreground">
            Step-by-step lessons to master Agentic AI
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {modulesData.modules.map((module) => (
            <Link
              key={module.slug}
              href={`/${module.slug}`}
              className="group"
            >
              <div className="bg-card border rounded-lg p-6 hover:shadow-lg transition-shadow h-full">
                <div className="text-4xl mb-4">{module.icon}</div>
                <h2 className="text-xl font-bold text-foreground mb-2 group-hover:text-primary transition-colors">
                  {module.title}
                </h2>
                <p className="text-muted-foreground mb-4">
                  {module.description}
                </p>
                <div className="flex items-center text-primary font-medium">
                  Start Learning
                  <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </Layout>
  )
}

