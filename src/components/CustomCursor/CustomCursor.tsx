'use client';

import React, { useRef, useEffect, useState } from 'react';
import { motion, useSpring, useTransform, useMotionValue, MotionValue, SpringOptions } from 'framer-motion';
import { useCursor } from '../../context/CursorContext';

// Helper function to create smooth spring motion values
function useSmoothTransform(
  value: MotionValue<number>,
  springOptions: SpringOptions,
  transformer: (v: number) => number = (v) => v
) {
  return useSpring(useTransform(value, transformer), springOptions);
}

const CustomCursor: React.FC = () => {
  const { isTargeted, targetRect } = useCursor();
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  const [isMobile, setIsMobile] = useState(false);

  const springConfig: SpringOptions = { stiffness: 400, damping: 30, mass: 1 };

  // Moved useMotionValue calls inside the component
  const immediateX = useMotionValue(0);
  const immediateY = useMotionValue(0);
  const borderRadiusValue = useMotionValue(50);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const mouseX = useRef(0);
  const mouseY = useRef(0);

  const smoothX = useSmoothTransform(immediateX, springConfig);
  const smoothY = useSmoothTransform(immediateY, springConfig);

  const targetWidth = useSpring(10, springConfig);
  const targetHeight = useSpring(10, springConfig);
  const targetX = useSpring(0, springConfig);
  const targetY = useSpring(0, springConfig);
  const borderRadius = useSmoothTransform(borderRadiusValue, springConfig);
  const borderWidth = useSpring(2, springConfig);

  useEffect(() => {
    if (!isMobile) {
      const handleMouseMove = (e: MouseEvent) => {
        mouseX.current = e.clientX;
        mouseY.current = e.clientY;
        immediateX.set(e.clientX);
        immediateY.set(e.clientY);
      };
      window.addEventListener('mousemove', handleMouseMove);
      return () => window.removeEventListener('mousemove', handleMouseMove);
    }
  }, [isMobile]);

  useEffect(() => {
    if (!isMobile) {
      if (isTargeted && targetRect) {
        targetWidth.set(targetRect.width + 8);
        targetHeight.set(targetRect.height + 8);
        targetX.set(targetRect.left - 4);
        targetY.set(targetRect.top - 4);
        borderRadiusValue.set(4);
        borderWidth.set(2);
      } else {
        targetWidth.set(48);
        targetHeight.set(48);
        targetX.set(smoothX.get() - 24);
        targetY.set(smoothY.get() - 24);
        borderRadiusValue.set(50);
        borderWidth.set(2);
      }

      const unsubscribeX = smoothX.on('change', (latest) => {
        if (!isTargeted) targetX.set(latest - 24);
      });
      const unsubscribeY = smoothY.on('change', (latest) => {
        if (!isTargeted) targetY.set(latest - 24);
      });

      return () => {
        unsubscribeX();
        unsubscribeY();
      };
    }
  }, [isTargeted, targetRect, isMobile, smoothX, smoothY, targetX, targetY, targetWidth, targetHeight, borderWidth]);

  const dotX = useTransform(smoothX, (v) => v - 4);
  const dotY = useTransform(smoothY, (v) => v - 4);

  return (
    <>
      {!isMobile && (
        <>
          {/* Ring */}
          <motion.div
            ref={ringRef}
            className="fixed border-white pointer-events-none z-[9998] top-0 left-0"
            style={{
              width: targetWidth,
              height: targetHeight,
              x: targetX,
              y: targetY,
              borderRadius: borderRadius,
              borderWidth: borderWidth,
              opacity: isTargeted ? 1 : 0.3,
              borderStyle: 'solid',
            }}
            transition={springConfig}
          />
          {/* Dot */}
          <motion.div
            ref={dotRef}
            className="fixed w-2 h-2 bg-white rounded-full pointer-events-none z-[9999] top-0 left-0"
            style={{
              x: dotX,
              y: dotY,
              opacity: isTargeted ? 0 : 1,
            }}
            transition={{ type: 'spring', ...springConfig }}
          />
        </>
      )}
    </>
  );
};

export default CustomCursor;
