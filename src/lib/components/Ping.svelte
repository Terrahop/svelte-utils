<!--@component
Renders a small pulsing notification dot to indicate activity or draw attention, should be used sparingly.
Parent element must be relatively positioned to work.
@example svelte```
<div class="relative">
  <Ping/>
</div>
```
-->
<script lang="ts">
  interface Props {
    /** Dot color. @default "bg-secondary-500". */
    color?: string
    /** Dot position. @default "indicator-top indicator-end". */
    position?: string
    class?: string
  }
  const { color = 'bg-primary', position = 'indicator-top indicator-end', class: className }: Props = $props()
</script>

<span class="{className} absolute {position} z-10 flex size-2.5">
  <span class="absolute inline-flex h-full w-full animate-ping rounded-full opacity-75 {color} "></span>
  <span class="relative inline-flex size-2.5 rounded-full {color}"></span>
</span>
