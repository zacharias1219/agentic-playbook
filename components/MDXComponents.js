import Checklist from '../components/Checklist'
import Quiz from '../components/Quiz'
import TipBox from '../components/TipBox'
import CaseStudy from '../components/CaseStudy'
import ResourceCard from '../components/ResourceCard'
import Diagram from '../components/Diagram'
import CodePlayground from '../components/CodePlayground'

const MDXComponents = {
  Checklist,
  Quiz,
  TipBox,
  CaseStudy,
  ResourceCard,
  Diagram,
  CodePlayground,
  h1: (props) => <h1 className="text-4xl font-bold mt-8 mb-4 text-foreground" {...props} />,
  h2: (props) => <h2 className="text-3xl font-bold mt-8 mb-4 text-foreground" {...props} />,
  h3: (props) => <h3 className="text-2xl font-semibold mt-6 mb-3 text-foreground" {...props} />,
  h4: (props) => <h4 className="text-xl font-semibold mt-4 mb-2 text-foreground" {...props} />,
  p: (props) => <p className="mb-4 text-foreground leading-relaxed" {...props} />,
  ul: (props) => <ul className="list-disc list-inside mb-4 space-y-2 text-foreground" {...props} />,
  ol: (props) => <ol className="list-decimal list-inside mb-4 space-y-2 text-foreground" {...props} />,
  li: (props) => <li className="ml-4" {...props} />,
  blockquote: (props) => (
    <blockquote className="border-l-4 border-primary pl-4 italic my-4 text-muted-foreground bg-muted/50" {...props} />
  ),
  code: (props) => {
    const { children, className } = props
    const isInline = !className
    if (isInline) {
      return <code className="bg-muted px-1 py-0.5 rounded text-sm" {...props} />
    }
    return <code className={className} {...props} />
  },
  pre: (props) => (
    <pre className="bg-muted p-4 rounded-lg overflow-x-auto my-4" {...props} />
  ),
  a: (props) => (
    <a className="text-primary hover:underline" {...props} />
  ),
  img: (props) => (
    <img className="rounded-lg my-4 max-w-full" {...props} />
  ),
  table: (props) => (
    <div className="overflow-x-auto my-4">
      <table className="min-w-full border-collapse border border-border" {...props} />
    </div>
  ),
  th: (props) => (
    <th className="border border-border px-4 py-2 bg-muted font-semibold text-left" {...props} />
  ),
  td: (props) => (
    <td className="border border-border px-4 py-2" {...props} />
  ),
}

export default MDXComponents

