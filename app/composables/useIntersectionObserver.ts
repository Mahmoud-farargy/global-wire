import { onMounted, onUnmounted, type Ref } from "vue";

interface UseIntersectionObserverOptions extends IntersectionObserverInit {
  widthToInitialize?: number;
  onIntersect?: () => void;
  onLeave?: () => void;
}

export default function useIntersectionObserver(
  targetRef: Ref<HTMLElement | null>,
  options: UseIntersectionObserverOptions = {}
) {
  const isElementIntersecting = ref<boolean>(false);
  let observer: IntersectionObserver | null = null;

  const handleIntersection: IntersectionObserverCallback = (entries) => {
    const [entry] = entries;
    if (!entry) return;
    isElementIntersecting.value = entry.isIntersecting;
    if (entry.isIntersecting) {
      options.onIntersect?.();
    } else {
      options.onLeave?.();
    }
  };

  onMounted(() => {
    const shouldInitialize =
      options.widthToInitialize ? window.innerWidth > options.widthToInitialize : true;

    if (shouldInitialize && targetRef.value) {
      observer = new IntersectionObserver(handleIntersection, options);
      observer.observe(targetRef.value);
    }
  });

  onUnmounted(() => {
    observer?.disconnect();
  });
  return isElementIntersecting;
}
