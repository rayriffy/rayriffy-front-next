import React from 'react'

export interface INav {
  transition: boolean
  from: 'top' | 'bottom' | 'left' | 'right'
  items: {
    name: string
    href: string
    icon: React.FC
  }[]
}
