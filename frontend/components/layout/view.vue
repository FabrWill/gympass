<template>
  <div class="bg-slate-100 dark:bg-slate-800 h-full min-h-screen">
    <layout-navbar />
    <div class="flex max-w-screen">
      <layout-menu />
      <div
        class="ml-16 p-6 mt-10 w-screen flex flex-1"
        style="min-height: calc(100vh - 86px)"
      >
        <div
          class="bg-white dark:bg-slate-800 rounded border border-grey-500 flex-1 p-6"
        >
          <slot />
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup></script>
