'use client';

import React, { useState, useEffect, useRef } from 'react';
import Image from "next/image";
import css from "./BgImageWrapper.module.css";
import DecorationTab from '../DecorationTab/DecorationTab';


export const BgImageWrapper = () => {
  // Посилання на батьківський контейнер та анімований блок
  const containerRef = useRef(null);
  const tabRef = useRef(null);

  // Стан для позиції (x, y) та швидкості (vx, vy)
  const [position, setPosition] = useState({ x: 50, y: 50 }); // Початкова позиція
  const [velocity, setVelocity] = useState({ vx: 2, vy: 1.5 }); // Швидкість (пікселів за кадр)

  useEffect(() => {
    // Функція анімації
    const animate = () => {
      const container = containerRef.current;
      const tab = tabRef.current;

      if (!container || !tab) return;

      // Отримуємо поточні розміри контейнера та блоку
      const containerRect = container.getBoundingClientRect();
      const tabRect = tab.getBoundingClientRect();

      // Розраховуємо наступну позицію
      let nextX = position.x + velocity.vx;
      let nextY = position.y + velocity.vy;

      let nextVx = velocity.vx;
      let nextVy = velocity.vy;

      // --- ПЕРЕВІРКА ЗІТКНЕНЬ З КРАЯМИ ---

      // Відбивання від лівого або правого краю
      if (nextX <= 0 || nextX + tabRect.width >= containerRect.width) {
        nextVx = -velocity.vx; // Міняємо напрямок по X
        // Трохи коригуємо позицію, щоб блок не "застряг" у стіні
        nextX = Math.max(0, Math.min(nextX, containerRect.width - tabRect.width));
      }

      // Відбивання від верхнього або нижнього краю
      if (nextY <= 0 || nextY + tabRect.height >= containerRect.height) {
        nextVy = -velocity.vy; // Міняємо напрямок по Y
        // Трохи коригуємо позицію
        nextY = Math.max(0, Math.min(nextY, containerRect.height - tabRect.height));
      }

      // Оновлюємо стан: позицію та (якщо треба) швидкість
      setPosition({ x: nextX, y: nextY });
      if (nextVx !== velocity.vx || nextVy !== velocity.vy) {
        setVelocity({ vx: nextVx, vy: nextVy });
      }
    };

    // Запускаємо анімацію через requestAnimationFrame для плавності
    const animationFrameId = requestAnimationFrame(animate);

    // Очищення при відмонтуванні компонента
    return () => cancelAnimationFrame(animationFrameId);
  }, [position, velocity]); // Ефект перезапускається при зміні позиції або швидкості

  return (
    <div className={css.wrapper}>
      {/* Додаємо ref до батьківського контейнера */}
      <div className={css.imageContainer} ref={containerRef}>
        <Image
          src="/images/bg-image-tablet.png"
          alt="User managing finances"
          width={611}
          height={568}
          className={css.bgImage}
          priority
        />
        
        {/* Додаємо ref до анімованого блоку і застосовуємо стилі руху */}
        <div 
          className={css.decorationTab} 
          ref={tabRef}
          style={{
            // Використовуємо transform: translate для максимальної продуктивності анімації
            transform: `translate(${position.x}px, ${position.y}px)`,
            // Обов'язково прибираємо top/left, які могли бути раніше
            top: 0,
            left: 0,
          }}
        >
          <DecorationTab />
        </div>
      </div>
    </div>
  );
};