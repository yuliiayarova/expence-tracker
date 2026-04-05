"use client";
import Image from "next/image";
import css from "./BgImageWrapper.module.css";
import { useEffect, useRef, useState } from "react";
import DecorationTab from "../DecorationTab/DecorationTab";

type Position = { x: number; y: number };

const getInitialPosition = (): Position => {
  if (typeof window === "undefined") {
    return { x: -10, y: 235 };
  }

  if (window.innerWidth >= 1440) return { x: -45, y: 350 };
  if (window.innerWidth >= 768) return { x: -15, y: 350 };
  return { x: -10, y: 235 };
};

export const BgImageWrapper = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const tabRef = useRef<HTMLDivElement>(null);

  const [position, setPosition] = useState<Position>(() => {
    if (typeof window === "undefined") return { x: -10, y: 235 };
    return getInitialPosition();
  });

  const [velocity, setVelocity] = useState({ vx: 0.5, vy: 0.3 });

  useEffect(() => {
    const handleResize = () => {
      setPosition(getInitialPosition());
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    let animationFrameId: number;

    const animate = () => {
      const container = containerRef.current;
      const tab = tabRef.current;

      if (!container || !tab) {
        animationFrameId = requestAnimationFrame(animate);
        return;
      }

      const containerRect = container.getBoundingClientRect();
      const tabRect = tab.getBoundingClientRect();

      const OFFSET = 10;

      let nextX = position.x + velocity.vx;
      let nextY = position.y + velocity.vy;

      let nextVx = velocity.vx;
      let nextVy = velocity.vy;

      if (
        nextX <= -OFFSET ||
        nextX + tabRect.width >= containerRect.width + OFFSET
      ) {
        nextVx = -velocity.vx;
        nextX = Math.max(
          -OFFSET,
          Math.min(nextX, containerRect.width + OFFSET - tabRect.width),
        );
      }

      if (
        nextY <= -OFFSET ||
        nextY + tabRect.height >= containerRect.height + OFFSET
      ) {
        nextVy = -velocity.vy;
        nextY = Math.max(
          -OFFSET,
          Math.min(nextY, containerRect.height + OFFSET - tabRect.height),
        );
      }

      setPosition({ x: nextX, y: nextY });

      if (nextVx !== velocity.vx || nextVy !== velocity.vy) {
        setVelocity({ vx: nextVx, vy: nextVy });
      }

      animationFrameId = requestAnimationFrame(animate);
    };

    animationFrameId = requestAnimationFrame(animate);

    return () => {
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
    };
  }, [position, velocity]);

  return (
    <div className={css.wrapper}>
      <div className={css.imageContainer} ref={containerRef}>
        <Image
          src="/images/bg-image-mobile.png"
          alt="User managing finances"
          width={335}
          height={381}
          className={`${css.bgImage} ${css.mobileImage}`}
          priority
        />

        <Image
          src="/images/bg-image-tablet.png"
          alt="User managing finances"
          width={704}
          height={482}
          className={`${css.bgImage} ${css.tabletImage}`}
        />

        <Image
          src="/images/bg-image-desc.png"
          alt="User managing finances"
          width={611}
          height={568}
          className={`${css.bgImage} ${css.desktopImage}`}
        />

        <div
          className={css.decorationTab}
          ref={tabRef}
          suppressHydrationWarning
          style={{
            transform: `translate(${position.x}px, ${position.y}px)`,
            top: 0,
            left: 0,
            position: "absolute",
          }}
        >
          <DecorationTab />
        </div>
      </div>
    </div>
  );
};
