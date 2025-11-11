import Layout from '../components/Layout'
import Wizard from '../components/Wizard'

export default function Builder() {
  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-foreground mb-4">Project Builder</h1>
          <p className="text-xl text-muted-foreground">
            Answer a few questions to generate your AI agent project template
          </p>
        </div>
        <Wizard />
      </div>
    </Layout>
  )
}

