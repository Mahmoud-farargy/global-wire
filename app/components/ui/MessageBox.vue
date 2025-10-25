<template>
  <transition
    name="fade"
    appear
    enter-active-class="transition-all duration-500 ease-out"
    enter-from-class="opacity-0 translate-y-2"
    enter-to-class="opacity-100 translate-y-0"
  >
    <div
      v-if="message"
      :class="[
        'flex items-start gap-3 px-4 py-3 rounded-2xl shadow-lg border backdrop-blur-sm select-none mb-4 mt-10 max-w-[37rem] mx-auto',
        typeClasses,
      ]"
    >
      <!-- Icon -->
      <div
        :class="[
          'flex items-center justify-center w-9 h-9 rounded-full shrink-0',
          iconBg,
        ]"
      >
        <Icon :name="icon" class="w-5 h-5" :class="iconColor" />
      </div>

      <!-- Text -->
      <div class="flex flex-col">
        <p class="font-semibold capitalize mb-2" :class="textColor">{{ title }}</p>
        <p class="text-sm leading-snug opacity-90 text-white/90">
          {{ message }}
        </p>
      </div>
    </div>
  </transition>
</template>

<script setup lang="ts">
interface MessageProps {
  type: 'info' | 'success' | 'warning' | 'error' | 'neutral' | 'loading'
  message: string
}
const { type, message } = defineProps<MessageProps>()

const config = {
  info: {
    icon: 'heroicons:information-circle',
    title: 'Information',
    classes:
      'bg-gradient-to-r from-blue-500/90 to-blue-600/90 border-blue-400/70 text-white',
    iconBg: 'bg-blue-100/20',
    iconColor: 'text-blue-200',
    textColor: 'text-white',
  },
  success: {
    icon: 'heroicons:check-circle',
    title: 'Success',
    classes:
      'bg-gradient-to-r from-emerald-500/90 to-emerald-600/90 border-emerald-400/70 text-white',
    iconBg: 'bg-emerald-100/20',
    iconColor: 'text-emerald-200',
    textColor: 'text-white',
  },
  warning: {
    icon: 'heroicons:exclamation-triangle',
    title: 'Warning',
    classes:
      'bg-gradient-to-r from-amber-500/90 to-amber-600/90 border-amber-400/70 text-white',
    iconBg: 'bg-amber-100/20',
    iconColor: 'text-amber-200',
    textColor: 'text-white',
  },
  error: {
    icon: 'heroicons:x-circle',
    title: 'Error',
    classes:
      'bg-gradient-to-r from-rose-500/90 to-rose-600/90 border-rose-400/70 text-white',
    iconBg: 'bg-rose-100/20',
    iconColor: 'text-rose-200',
    textColor: 'text-white',
  },
  neutral: {
    icon: 'heroicons:chat-bubble-left-ellipsis',
    title: 'Note',
    classes:
      'bg-gradient-to-r from-slate-600/90 to-slate-700/90 border-slate-500/70 text-white',
    iconBg: 'bg-slate-100/20',
    iconColor: 'text-slate-200',
    textColor: 'text-white',
  },
  loading: {
    icon: 'heroicons:arrow-path',
    title: 'Loading',
    classes:
      'bg-gradient-to-r from-indigo-500/90 to-indigo-600/90 border-indigo-400/70 text-white animate-pulse',
    iconBg: 'bg-indigo-100/20',
    iconColor: 'text-indigo-200 animate-spin',
    textColor: 'text-white',
  },
}

const icon = config[type].icon
const title = config[type].title
const typeClasses = config[type].classes
const iconBg = config[type].iconBg
const iconColor = config[type].iconColor
const textColor = config[type].textColor
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: all 0.4s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  transform: translateY(8px);
}
</style>
