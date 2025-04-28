import { useEffect, useRef, useState } from "react";
import anime from "animejs";

function useAnimateWidthTransition(show: boolean) {
  const [hasMounted, setHasMounted] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    if (!ref.current) return;
    const element = ref.current;

    if (!hasMounted) {
      setHasMounted(true);
      return;
    }
    if (show) {
      requestAnimationFrame(() => {
        anime({
          targets: element,
          // opacity: [0, 1],
          width: ["calc(100% - 200px)", "calc(100% - 58px)"],
          // translateX: [-16, 0],
          duration: 200,
          easing: "easeInCubic",
        });
      });
    } else {
      requestAnimationFrame(() => {
        anime({
          targets: element,
          // opacity: [1, 0],
          width: ["calc(100% - 58px)", "calc(100% - 200px)"],
          // translateX: [0, -16],
          duration: 200,
          easing: "easeOutCubic",
        });
      });
    }
  }, [show]);

  return ref;
}

export default useAnimateWidthTransition;
