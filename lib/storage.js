import { useState, useEffect } from 'react'

export function saveToStorage(key, value) {
  if (typeof window !== 'undefined') {
    try {
      localStorage.setItem(key, JSON.stringify(value))
    } catch (error) {
      console.error('Error saving to localStorage:', error)
    }
  }
}

export function loadFromStorage(key, defaultValue = null) {
  if (typeof window !== 'undefined') {
    try {
      const item = localStorage.getItem(key)
      return item ? JSON.parse(item) : defaultValue
    } catch (error) {
      console.error('Error loading from localStorage:', error)
      return defaultValue
    }
  }
  return defaultValue
}

