import Navbar from '../components/Navbar'

export default function Layout({ children }) {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        {children}
      </main>
      <footer className="border-t bg-card py-8 mt-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-center text-muted-foreground">
            © 2025 Agentic AI Playbook - Learn by Building
          </p>
        </div>
      </footer>
    </div>
  )
}

