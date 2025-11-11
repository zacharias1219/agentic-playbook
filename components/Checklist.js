import { useState, useEffect } from 'react'
import { Check } from 'lucide-react'

export default function Checklist({ items, id }) {
  const storageKey = `checklist-${id || 'default'}`
  const [checkedItems, setCheckedItems] = useState([])

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem(storageKey)
      if (saved) {
        setCheckedItems(JSON.parse(saved))
      }
    }
  }, [storageKey])

  const toggleItem = (index) => {
    const newChecked = checkedItems.includes(index)
      ? checkedItems.filter(i => i !== index)
      : [...checkedItems, index]
    
    setCheckedItems(newChecked)
    if (typeof window !== 'undefined') {
      localStorage.setItem(storageKey, JSON.stringify(newChecked))
    }
  }

  if (!items || !Array.isArray(items)) {
    return null
  }

  return (
    <div className="my-6 space-y-3">
      {items.map((item, index) => {
        const isChecked = checkedItems.includes(index)
        return (
          <label
            key={index}
            className={`flex items-start p-3 rounded-lg border cursor-pointer transition-colors ${
              isChecked
                ? 'bg-primary/5 border-primary/20'
                : 'bg-card border-border hover:bg-accent'
            }`}
          >
            <input
              type="checkbox"
              checked={isChecked}
              onChange={() => toggleItem(index)}
              className="sr-only"
            />
            <div
              className={`flex-shrink-0 w-5 h-5 rounded border-2 mr-3 mt-0.5 flex items-center justify-center transition-colors ${
                isChecked
                  ? 'bg-primary border-primary'
                  : 'border-border'
              }`}
            >
              {isChecked && <Check className="w-3 h-3 text-primary-foreground" />}
            </div>
            <span
              className={`flex-1 ${
                isChecked ? 'line-through text-muted-foreground' : 'text-foreground'
              }`}
            >
              {item}
            </span>
          </label>
        )
      })}
    </div>
  )
}

