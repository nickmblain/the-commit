<script setup lang="ts">
import { PortableText } from '@portabletext/vue'
import type { Article } from '@/types/article'

const props = defineProps<{ article: Article }>()
</script>

<template>
  <div class="article-body">
    <PortableText :value="props.article.body" :components="portableComponents" />
  </div>
</template>

<script lang="ts">
// Custom component overrides for Portable Text rendering.
// All text values are passed through Vue's template interpolation — no v-html.
import { h, defineComponent } from 'vue'

const portableComponents = {
  block: {
    normal: defineComponent({
      props: ['value'],
      setup(props) {
        // Extract plain text from children spans
        const text = () =>
          (props.value?.children ?? [])
            .map((c: { text?: string }) => c.text ?? '')
            .join('')
        return () => h('p', { class: 'body-paragraph' }, text())
      },
    }),
    h2: defineComponent({
      props: ['value'],
      setup(props) {
        const text = () =>
          (props.value?.children ?? [])
            .map((c: { text?: string }) => c.text ?? '')
            .join('')
        return () => h('h2', { class: 'body-h2' }, text())
      },
    }),
    h3: defineComponent({
      props: ['value'],
      setup(props) {
        const text = () =>
          (props.value?.children ?? [])
            .map((c: { text?: string }) => c.text ?? '')
            .join('')
        return () => h('h3', { class: 'body-h3' }, text())
      },
    }),
    h4: defineComponent({
      props: ['value'],
      setup(props) {
        const text = () =>
          (props.value?.children ?? [])
            .map((c: { text?: string }) => c.text ?? '')
            .join('')
        return () => h('h4', { class: 'body-h4' }, text())
      },
    }),
    blockquote: defineComponent({
      props: ['value'],
      setup(props) {
        const text = () =>
          (props.value?.children ?? [])
            .map((c: { text?: string }) => c.text ?? '')
            .join('')
        return () => h('blockquote', { class: 'body-quote' }, [h('p', text())])
      },
    }),
  },
  types: {
    code: defineComponent({
      props: ['value'],
      setup(props) {
        return () =>
          h('pre', { class: 'body-code' }, [
            h(
              'code',
              { class: props.value?.language ? `language-${props.value.language}` : '' },
              String(props.value?.code ?? ''),
            ),
          ])
      },
    }),
  },
  list: {
    bullet: defineComponent({
      setup(_props, { slots }) {
        return () => h('ul', { class: 'body-list' }, slots.default?.())
      },
    }),
    number: defineComponent({
      setup(_props, { slots }) {
        return () => h('ol', { class: 'body-list body-list--ordered' }, slots.default?.())
      },
    }),
  },
  listItem: {
    bullet: defineComponent({
      setup(_props, { slots }) {
        return () => h('li', slots.default?.())
      },
    }),
    number: defineComponent({
      setup(_props, { slots }) {
        return () => h('li', slots.default?.())
      },
    }),
  },
}
</script>

<style scoped>
.article-body {
  display: flex;
  flex-direction: column;
  gap: var(--space-5);
}

/* Portable Text wraps everything in a div — target children */
.article-body :deep(.body-paragraph) {
  font-size: 1.0625rem;
  line-height: 1.8;
  color: var(--color-text);
}

.article-body :deep(.body-h2) {
  font-size: 1.5rem;
  margin-top: var(--space-4);
  color: var(--color-heading);
}

.article-body :deep(.body-h3) {
  font-size: 1.25rem;
  margin-top: var(--space-3);
  color: var(--color-heading);
}

.article-body :deep(.body-h4) {
  font-size: 1.1rem;
  margin-top: var(--space-3);
  color: var(--color-muted);
}

.article-body :deep(.body-code) {
  position: relative;
}

.article-body :deep(.body-quote) {
  margin: 0;
}

.article-body :deep(.body-list) {
  display: flex;
  flex-direction: column;
  gap: var(--space-2);
  padding-left: var(--space-6);
}

.article-body :deep(.body-list li) {
  font-size: 1.0625rem;
  line-height: 1.75;
}
</style>
