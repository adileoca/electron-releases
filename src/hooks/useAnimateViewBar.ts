import { CSSProperties, MutableRefObject, useEffect, useState } from "react";
import anime from "animejs";

type UtilityItem = {
  ref: MutableRefObject<HTMLDivElement | null>;
  show: boolean;
};

export const useAnimateViewBar = ({
  defaultRef,
  utilities,
  duration,
}: {
  defaultRef: MutableRefObject<HTMLDivElement | null>;
  utilities: UtilityItem[];
  duration?: number;
}) => {
  const [defaultRefStyles, setDefaultRefStyles] = useState<CSSProperties>({});
  const [utilityRefStyles, setUtilityRefStyles] = useState<CSSProperties>({
    display: "none",
  });
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(
    () => {
      if (!hasMounted) {
        setHasMounted(true);
        return;
      }

      const showAnyUtility = utilities.some((item) => item.show);

      if (showAnyUtility) {
        anime({
          targets: defaultRef.current,
          opacity: [1, 0],
          duration: duration || 100,
          easing: "easeInCubic",
          complete: () => {
            setDefaultRefStyles({ display: "none" });
            setUtilityRefStyles({});
            anime({
              targets: utilities[0].ref.current,
              opacity: [0, 1],
              duration: duration || 100,
              easing: "easeInCubic",
            });
          },
        });
      } else {
        anime({
          targets: utilities[0].ref.current,
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
    },
    utilities.map((item) => item.show)
  );

  return { defaultRefStyles, utilityRefStyles };
};
