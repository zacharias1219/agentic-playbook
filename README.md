# Agentic AI Playbook

An interactive web learning portal where students can learn Agentic AI step-by-step, interact with checklists, quizzes, and wizards, generate project ideas, get templates, deploy their work, and showcase it as a portfolio highlight.

## Features

- 📚 **Interactive Modules**: Step-by-step lessons with embedded quizzes and checklists
- 🧙 **Project Builder Wizard**: Generate AI agent project templates based on your needs
- 🚀 **Deployment Guides**: Learn how to deploy your projects on Netlify, Vercel, and more
- 🏆 **Showcase**: Display student projects and build your portfolio
- ✅ **Progress Tracking**: Save your progress with local storage
- 🎨 **Beautiful UI**: Built with Tailwind CSS and ShadCN UI components

## Tech Stack

- **Framework**: Next.js (Pages Router)
- **Styling**: Tailwind CSS + ShadCN UI
- **Content**: MDX with next-mdx-remote
- **Icons**: Lucide React
- **Deployment**: Netlify / Vercel ready

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/agentic-playbook.git
cd agentic-playbook
```

2. Install dependencies:
```bash
npm install
```

3. Run the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

## Project Structure

```
agentic-playbook/
├── content/           # Markdown lesson files
├── components/        # React components
├── lib/              # Utilities and helpers
├── pages/            # Next.js pages
├── public/           # Static assets
└── styles/           # Global styles
```

## Adding Content

### Modules

Add new modules by:
1. Creating a markdown file in `content/` (e.g., `content/my-module.md`)
2. Adding module metadata to `content/modules.json`
3. The module will automatically appear in the modules listing

### Showcase Projects

Edit `public/showcase.json` to add student projects:

```json
{
  "projects": [
    {
      "title": "Project Name",
      "screenshot": "/path/to/screenshot.png",
      "github": "https://github.com/username/repo",
      "live": "https://project-url.com",
      "description": "Project description"
    }
  ]
}
```

## Deployment

### Netlify

1. Push your code to GitHub
2. Go to [Netlify](https://netlify.com)
3. Import your repository
4. Build command: `npm run build`
5. Publish directory: `.next`
6. Deploy!

### Vercel

1. Push your code to GitHub
2. Go to [Vercel](https://vercel.com)
3. Import your repository
4. Vercel auto-detects Next.js settings
5. Deploy!

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

MIT License - see LICENSE file for details
