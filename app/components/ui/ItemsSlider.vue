<template>
  <div
    ref="root"
    tabindex="0"
    class="relative w-full group"
    @keydown.left.prevent="prev"
    @keydown.right.prevent="next"
  >
    <!-- Viewport -->
    <div ref="viewport" class="overflow-hidden w-full">
      <div
        ref="track"
        class="grid transition-transform duration-300 ease-in-out overscroll-x-none"
        :style="trackStyle"
        @pointerdown="onPointerDown"
      >
        <div
          v-for="(item, i) in items"
          :key="itemKey(item, i)"
          class="overflow-hidden"
          :style="itemStyle"
          :draggable="false"
        >
          <slot name="item" :item="item" :index="i">
            <div class="p-4 bg-white border rounded shadow-sm h-full">
              {{ item }}
            </div>
          </slot>
        </div>
      </div>
    </div>

    <!-- Left arrow -->
    <button
      v-if="showArrows"
      :disabled="!loop && atStart"
      :class="[
        'absolute hidden lg:inline-block opacity-0 left-2 top-1/2 -translate-y-1/2 z-20 p-2 rounded-full bg-white/90 shadow hover:bg-white focus:outline-none focus-visible:ring transition-opacity duration-300',
        !loop && atStart
          ? 'group-hover:opacity-50 cursor-not-allowed'
          : 'group-hover:opacity-100',
      ]"
      aria-label="Previous slide"
      type="button"
      @click="prev"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        class="h-5 w-5 rotate-180"
        viewBox="0 0 20 20"
        fill="currentColor"
      >
        <path
          fill-rule="evenodd"
          d="M12.293 16.293a1 1 0 010-1.414L15.586 11H4a1 1 0 110-2h11.586l-3.293-3.879a1 1 0 011.486-1.322l5 5.875a1 1 0 010 1.322l-5 5.875a1 1 0 01-1.486 0z"
          clip-rule="evenodd"
        />
      </svg>
    </button>

    <!-- Right arrow -->
    <button
      v-if="showArrows"
      :disabled="!loop && atEnd"
      :class="[
        'absolute hidden lg:inline-block opacity-0 right-2 top-1/2 -translate-y-1/2 z-20 p-2 rounded-full bg-white/90 shadow hover:bg-white focus:outline-none focus-visible:ring transition-opacity duration-300',
        !loop && atEnd
          ? 'group-hover:opacity-50 cursor-not-allowed'
          : 'group-hover:opacity-100',
      ]"
      aria-label="Next slide"
      type="button"
      @click="next"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        class="h-5 w-5"
        viewBox="0 0 20 20"
        fill="currentColor"
      >
        <path
          fill-rule="evenodd"
          d="M12.293 16.293a1 1 0 010-1.414L15.586 11H4a1 1 0 110-2h11.586l-3.293-3.879a1 1 0 011.486-1.322l5 5.875a1 1 0 010 1.322l-5 5.875a1 1 0 01-1.486 0z"
          clip-rule="evenodd"
        />
      </svg>
    </button>

    <!-- Dots -->
    <div v-if="showDots" class="mt-3 flex justify-center gap-2">
      <button
        v-for="n in dotsCount"
        :key="n"
        :class="[
          'w-2 h-2 rounded-full transition-colors',
          currentIndex === n - 1 ? 'bg-gray-800' : 'bg-gray-300',
        ]"
        type="button"
        :aria-label="`Go to slide ${n}`"
        @click="goTo(n - 1)"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch, onMounted, onBeforeUnmount, nextTick } from "vue";

type Item = any;

const props = defineProps({
  items: { type: Array as () => Item[], default: () => [] },
  itemsPerView: { type: Number, default: 3 },
  gap: { type: Number, default: 16 },
  showArrows: { type: Boolean, default: true },
  showDots: { type: Boolean, default: false },
  loop: { type: Boolean, default: false },
  itemKeyField: { type: String, default: "" },
});

const emit = defineEmits<{ (e: "update:index", value: number): void }>();

const root = ref<HTMLElement | null>(null);
const viewport = ref<HTMLElement | null>(null);
const track = ref<HTMLElement | null>(null);

const containerWidth = ref(0);
const itemWidth = ref(0);
const currentTranslate = ref(0);
const internalIndex = ref(0);

const itemsCount = computed(() => props.items.length);
const maxIndex = computed(() => Math.max(0, itemsCount.value - props.itemsPerView));
const dotsCount = computed(() =>
  Math.max(1, Math.ceil(itemsCount.value / props.itemsPerView))
);

const atStart = computed(() => !props.loop && internalIndex.value <= 0);
const atEnd = computed(() => !props.loop && internalIndex.value >= maxIndex.value);

const currentIndex = computed(() => internalIndex.value);

watch(currentIndex, (v) => emit("update:index", v));

function itemKey(item: Item, i: number) {
  return props.itemKeyField &&
    item &&
    typeof item === "object" &&
    props.itemKeyField in item
    ? item[props.itemKeyField]
    : i;
}

function clampIndex(i: number) {
  if (props.loop) {
    const total = Math.max(1, itemsCount.value);
    return ((i % total) + total) % total;
  }
  return Math.max(0, Math.min(i, maxIndex.value));
}

function goTo(i: number) {
  internalIndex.value = clampIndex(i);
  updateTranslateForIndex();
}

function prev() {
  goTo(internalIndex.value - 1);
}

function next() {
  goTo(internalIndex.value + 1);
}

const trackStyle = computed(() => ({
  gridAutoFlow: "column",
  gridAutoColumns: `${itemWidth.value}px`,
  gap: `${props.gap}px`,
  transform: `translateX(${currentTranslate.value}px)`,
}));

const itemStyle = computed(() => ({
  width: `${itemWidth.value}px`,
}));

let resizeObserver: ResizeObserver | null = null;

function updateSizes() {
  if (!viewport.value) return;
  containerWidth.value = viewport.value.clientWidth;
  const totalGap = props.gap * (props.itemsPerView - 1);
  itemWidth.value = (containerWidth.value - totalGap) / props.itemsPerView;
  updateTranslateForIndex();
}

function updateTranslateForIndex() {
  currentTranslate.value = -internalIndex.value * (itemWidth.value + props.gap);
}

/* --- Pointer Events --- */
let pointerMoveHandler: ((e: PointerEvent) => void) | null = null;
let pointerUpHandler: ((e: PointerEvent) => void) | null = null;
const isPointerDown = ref(false);
const startX = ref(0);
const prevTranslate = ref(0);

function onPointerDown(e: PointerEvent) {
  isPointerDown.value = true;
  startX.value = e.clientX;
  prevTranslate.value = currentTranslate.value;

  pointerMoveHandler = onPointerMove;
  pointerUpHandler = onPointerUp;

  window.addEventListener("pointermove", pointerMoveHandler);
  window.addEventListener("pointerup", pointerUpHandler);
}

function onPointerMove(e: PointerEvent) {
  if (!isPointerDown.value) return;
  const dx = e.clientX - startX.value;
  currentTranslate.value = prevTranslate.value + dx;
}

function onPointerUp(e: PointerEvent) {
  isPointerDown.value = false;
  if (pointerMoveHandler) window.removeEventListener("pointermove", pointerMoveHandler);
  if (pointerUpHandler) window.removeEventListener("pointerup", pointerUpHandler);
  const dx = e.clientX - startX.value;
  const threshold = Math.max(20, itemWidth.value * 0.2);
  if (dx > threshold) prev();
  else if (dx < -threshold) next();
  else updateTranslateForIndex();
}

onMounted(async () => {
  await nextTick();
  updateSizes();
  if (viewport.value) {
    resizeObserver = new ResizeObserver(updateSizes);
    resizeObserver.observe(viewport.value);
  }
  root.value?.setAttribute("tabindex", "0");
});

onBeforeUnmount(() => {
  if (resizeObserver && viewport.value) resizeObserver.unobserve(viewport.value);
  if (pointerMoveHandler) window.removeEventListener("pointermove", pointerMoveHandler);
  if (pointerUpHandler) window.removeEventListener("pointerup", pointerUpHandler);
});
</script>
