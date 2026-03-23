import { NextStudio } from 'next-sanity/studio'
import config from '../../../../sanity.config'

export { metadata, viewport } from 'next-sanity/studio'

/** Required for `output: 'export'` (GitHub Pages static hosting). */
export function generateStaticParams() {
  return [{ tool: [] as string[] }]
}

export default function StudioPage() {
  return <NextStudio config={config} />
}
