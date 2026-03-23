import React from 'react'

export const metadata = {
  title: 'Yoobe Marketing Studio',
  description: 'Gestor de Conteúdo e Landing Pages da Yoobe',
}

export default function StudioLayout({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ margin: 0, padding: 0, height: '100vh' }}>
      {children}
    </div>
  )
}
