import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import { visionTool } from '@sanity/vision'
import { codeInput } from '@sanity/code-input'
import { schemaTypes } from './schemaTypes/index'

// Get these from manage.sanity.io — must match your .env.local in the root
const projectId = process.env['SANITY_STUDIO_PROJECT_ID'] ?? ''
const dataset = process.env['SANITY_STUDIO_DATASET'] ?? 'production'

export default defineConfig({
  name: 'the-commit',
  title: 'The Commit with Nick',
  projectId,
  dataset,
  plugins: [
    structureTool(),
    visionTool(),   // lets you run GROQ queries directly in Studio
    codeInput(),    // enables code block type in article body
  ],
  schema: {
    types: schemaTypes,
  },
})
