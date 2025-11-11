import { ExternalLink, Book, Video, FileText, Code } from 'lucide-react'

export default function ResourceCard({ title, description, url, type = 'link', tags = [] }) {
  const iconMap = {
    link: ExternalLink,
    book: Book,
    video: Video,
    doc: FileText,
    code: Code,
  }

  const Icon = iconMap[type] || ExternalLink

  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="block bg-card border rounded-lg p-4 hover:border-primary transition-colors mb-4"
    >
      <div className="flex items-start">
        <Icon className="w-5 h-5 text-primary mr-3 mt-0.5 flex-shrink-0" />
        <div className="flex-1">
          <h4 className="font-semibold text-foreground mb-1">{title}</h4>
          {description && (
            <p className="text-sm text-muted-foreground mb-2">{description}</p>
          )}
          {tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-2">
              {tags.map((tag, index) => (
                <span
                  key={index}
                  className="text-xs bg-muted px-2 py-1 rounded text-muted-foreground"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}
        </div>
        <ExternalLink className="w-4 h-4 text-muted-foreground ml-2 flex-shrink-0" />
      </div>
    </a>
  )
}

