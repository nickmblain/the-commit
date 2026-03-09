<script setup lang="ts">
type BlobVariant = 'violet' | 'cyan' | 'amber' | 'mixed'
type BlobPosition = 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right' | 'center'

const props = withDefaults(
  defineProps<{
    variant?: BlobVariant
    position?: BlobPosition
    size?: 'sm' | 'md' | 'lg'
    opacity?: number
  }>(),
  {
    variant: 'violet',
    position: 'top-right',
    size: 'lg',
    opacity: 0.35,
  },
)

const gradients: Record<BlobVariant, string> = {
  violet: 'radial-gradient(ellipse, #7c3aed 0%, #4f1d96 40%, transparent 70%)',
  cyan:   'radial-gradient(ellipse, #06b6d4 0%, #0e4f6e 40%, transparent 70%)',
  amber:  'radial-gradient(ellipse, #f59e0b 0%, #92400e 40%, transparent 70%)',
  mixed:  'radial-gradient(ellipse, #7c3aed 0%, #06b6d4 50%, transparent 70%)',
}

const sizes: Record<'sm' | 'md' | 'lg', string> = {
  sm: '300px',
  md: '500px',
  lg: '700px',
}

const positions: Record<BlobPosition, { top?: string; right?: string; bottom?: string; left?: string; transform?: string }> = {
  'top-left':     { top: '-15%', left: '-10%' },
  'top-right':    { top: '-15%', right: '-10%' },
  'bottom-left':  { bottom: '-15%', left: '-10%' },
  'bottom-right': { bottom: '-15%', right: '-10%' },
  'center':       { top: '50%', left: '50%', transform: 'translate(-50%, -50%)' },
}
</script>

<template>
  <div
    class="blob"
    :style="{
      background: gradients[props.variant],
      width: sizes[props.size],
      height: sizes[props.size],
      opacity: props.opacity,
      ...positions[props.position],
    }"
    aria-hidden="true"
  />
</template>

<style scoped>
.blob {
  position: absolute;
  border-radius: 50%;
  pointer-events: none;
  filter: blur(80px);
  will-change: transform;
  animation: blob-drift 12s ease-in-out infinite alternate;
}

@keyframes blob-drift {
  from { transform: v-bind("positions[props.position].transform ?? 'none'") scale(1); }
  to   { transform: v-bind("positions[props.position].transform ?? 'none'") scale(1.08) translateY(-12px); }
}
</style>
