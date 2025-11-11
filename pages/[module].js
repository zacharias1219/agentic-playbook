import { MDXRemote } from 'next-mdx-remote'
import Layout from '../components/Layout'
import MDXComponents from '../components/MDXComponents'
import { serializeMDX } from '../lib/mdx'
import { promises as fs } from 'fs'
import path from 'path'
import modulesData from '../content/modules.json'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'

export async function getStaticPaths() {
  const modules = modulesData.modules.map(module => ({
    params: { module: module.slug }
  }))

  return {
    paths: modules,
    fallback: false,
  }
}

export async function getStaticProps({ params }) {
  const { module } = params
  const filePath = path.join(process.cwd(), 'content', `${module}.md`)
  
  try {
    const fileContents = await fs.readFile(filePath, 'utf8')
    const mdxSource = await serializeMDX(fileContents)
    
    const moduleInfo = modulesData.modules.find(m => m.slug === module)
    
    return {
      props: {
        source: mdxSource,
        moduleInfo,
      },
    }
  } catch (error) {
    return {
      notFound: true,
    }
  }
}

export default function ModulePage({ source, moduleInfo }) {
  return (
    <Layout>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <Link
          href="/modules"
          className="inline-flex items-center text-muted-foreground hover:text-foreground mb-6"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Modules
        </Link>

        {moduleInfo && (
          <div className="mb-8">
            <div className="text-5xl mb-4">{moduleInfo.icon}</div>
            <h1 className="text-4xl font-bold text-foreground mb-2">{moduleInfo.title}</h1>
            <p className="text-xl text-muted-foreground">{moduleInfo.description}</p>
          </div>
        )}

        <div className="prose prose-lg max-w-none">
          <MDXRemote {...source} components={MDXComponents} />
        </div>
      </div>
    </Layout>
  )
}

