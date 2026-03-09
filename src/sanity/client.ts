import { createClient } from '@sanity/client'

const projectId = import.meta.env['VITE_SANITY_PROJECT_ID'] as string
const dataset = import.meta.env['VITE_SANITY_DATASET'] as string

if (!projectId || !dataset) {
  console.warn(
    '[the-commit] Sanity env vars missing. Set VITE_SANITY_PROJECT_ID and VITE_SANITY_DATASET.',
  )
}

export const sanityClient = createClient({
  projectId,
  dataset,
  apiVersion: '2025-01-01',
  useCdn: true, // cached reads via Sanity CDN — safe for public content
})
