import { CSSProperties, MutableRefObject, useEffect, useState } from "react";
import anime from "animejs";

const useAnimateViewBar = ({
  defaultRef,
  utilityRef,
  showUtilityRef,
  duration,
}: {
  defaultRef: MutableRefObject<HTMLDivElement | null>;
  utilityRef: MutableRefObject<HTMLDivElement | null>;
  showUtilityRef: boolean;
  duration?: number;
}) => {
  const [defaultRefStyles, setDefaultRefStyles] = useState<CSSProperties>({});
  const [utilityRefStyles, setUtilityRefStyles] = useState<CSSProperties>({
    display: "none",
  });
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    if (!hasMounted) {
      setHasMounted(true);
      return;
    }
    if (showUtilityRef) {
      anime({
        targets: defaultRef.current,
        opacity: [1, 0],
        duration: duration || 100,
        easing: "easeInCubic",
        complete: () => {
          setDefaultRefStyles({ display: "none" });
          setUtilityRefStyles({});
          anime({
            targets: utilityRef.current,
            opacity: [0, 1],
            duration: duration || 100,
            easing: "easeInCubic",
          });
        },
      });
    } else {
      anime({
        targets: utilityRef.current,
        opacity: [1, 0],
        duration: duration || 100,
        easing: "easeInCubic",
        complete: () => {
          setUtilityRefStyles({ display: "none" });
          setDefaultRefStyles({});
          anime({
            targets: defaultRef.current,
            opacity: [0, 1],
            duration: duration || 100,
            easing: "easeInCubic",
          });
        },
      });
    }
  }, [showUtilityRef]);

  return { defaultRefStyles, utilityRefStyles };
};

export default useAnimateViewBar;
