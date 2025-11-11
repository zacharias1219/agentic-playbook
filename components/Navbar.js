import Link from 'next/link'
import { useState } from 'react'
import { Menu, X, BookOpen, Wand2, Rocket, Trophy } from 'lucide-react'

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <nav className="border-b bg-card">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <Link href="/" className="flex items-center">
              <span className="text-xl font-bold bg-gradient-to-r from-primary to-contrast bg-clip-text text-transparent">Agentic AI Playbook</span>
            </Link>
          </div>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex md:items-center md:space-x-4">
            <Link href="/modules" className="flex items-center px-3 py-2 rounded-md text-sm font-medium text-foreground hover:bg-accent">
              <BookOpen className="w-4 h-4 mr-2" />
              Modules
            </Link>
            <Link href="/builder" className="flex items-center px-3 py-2 rounded-md text-sm font-medium text-foreground hover:bg-accent">
              <Wand2 className="w-4 h-4 mr-2" />
              Builder
            </Link>
            <Link href="/deploy" className="flex items-center px-3 py-2 rounded-md text-sm font-medium text-foreground hover:bg-accent">
              <Rocket className="w-4 h-4 mr-2" />
              Deploy
            </Link>
            <Link href="/showcase" className="flex items-center px-3 py-2 rounded-md text-sm font-medium text-foreground hover:bg-accent">
              <Trophy className="w-4 h-4 mr-2" />
              Showcase
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-foreground hover:bg-accent"
            >
              {mobileMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {mobileMenuOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 border-t">
            <Link
              href="/modules"
              className="flex items-center px-3 py-2 rounded-md text-base font-medium text-foreground hover:bg-accent"
              onClick={() => setMobileMenuOpen(false)}
            >
              <BookOpen className="w-4 h-4 mr-2" />
              Modules
            </Link>
            <Link
              href="/builder"
              className="flex items-center px-3 py-2 rounded-md text-base font-medium text-foreground hover:bg-accent"
              onClick={() => setMobileMenuOpen(false)}
            >
              <Wand2 className="w-4 h-4 mr-2" />
              Builder
            </Link>
            <Link
              href="/deploy"
              className="flex items-center px-3 py-2 rounded-md text-base font-medium text-foreground hover:bg-accent"
              onClick={() => setMobileMenuOpen(false)}
            >
              <Rocket className="w-4 h-4 mr-2" />
              Deploy
            </Link>
            <Link
              href="/showcase"
              className="flex items-center px-3 py-2 rounded-md text-base font-medium text-foreground hover:bg-accent"
              onClick={() => setMobileMenuOpen(false)}
            >
              <Trophy className="w-4 h-4 mr-2" />
              Showcase
            </Link>
          </div>
        </div>
      )}
    </nav>
  )
}

