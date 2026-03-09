<script setup lang="ts">
import type { Article } from '@/types/article'

const props = defineProps<{ article: Article }>()
</script>

<template>
  <div class="article-body">
    <template v-for="(block, index) in props.article.body" :key="index">
      <p v-if="block.type === 'paragraph'" class="body-paragraph">
        {{ block.content }}
      </p>

      <h2 v-else-if="block.type === 'heading' && block.level === 2" class="body-h2">
        {{ block.content }}
      </h2>

      <h3 v-else-if="block.type === 'heading' && block.level === 3" class="body-h3">
        {{ block.content }}
      </h3>

      <h4 v-else-if="block.type === 'heading' && block.level === 4" class="body-h4">
        {{ block.content }}
      </h4>

      <pre v-else-if="block.type === 'code'" class="body-code"><code :class="block.language ? `language-${block.language}` : ''">{{ block.content }}</code></pre>

      <blockquote v-else-if="block.type === 'quote'" class="body-quote">
        <p>{{ block.content }}</p>
      </blockquote>

      <ul v-else-if="block.type === 'list'" class="body-list">
        <li v-for="(item, i) in block.items" :key="i">{{ item }}</li>
      </ul>

      <hr v-else-if="block.type === 'divider'" class="section-divider" />
    </template>
  </div>
</template>

<style scoped>
.article-body {
  display: flex;
  flex-direction: column;
  gap: var(--space-5);
}

.body-paragraph {
  font-size: 1.0625rem;
  line-height: 1.8;
  color: var(--color-text);
}

.body-h2 { font-size: 1.5rem;  margin-top: var(--space-4); }
.body-h3 { font-size: 1.25rem; margin-top: var(--space-3); }
.body-h4 { font-size: 1.1rem;  margin-top: var(--space-3); color: var(--color-muted); }

.body-quote { margin: 0; }

.body-list {
  display: flex;
  flex-direction: column;
  gap: var(--space-2);
  padding-left: var(--space-6);
}

.body-list li {
  font-size: 1.0625rem;
  line-height: 1.75;
}
</style>
