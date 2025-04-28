import React, { useRef, useEffect, useState } from 'react';
import { motion, useSpring, useTransform, MotionValue } from 'framer-motion';
import { useCursor } from '../../context/CursorContext';

// Helper function to create smooth spring motion values
function useSmoothTransform(
  value: MotionValue<number>,
  springOptions: any, // Adjust type as needed for SpringOptions
  transformer?: (v: number) => number
) {
  return useSpring(useTransform(value, transformer || (v => v)), springOptions);
}

// Declare MotionValue instances outside the component to ensure stable references
const immediateX = new MotionValue(0);
const immediateY = new MotionValue(0);
const borderRadiusValue = new MotionValue(50);

const CustomCursor = () => {
  const { isTargeted, targetRect } = useCursor();
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  const springConfig = { stiffness: 400, damping: 30, mass: 1 };

  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => {
      window.removeEventListener('resize', checkMobile);
    };
  }, []);

  const mouseX = useRef(0);
  const mouseY = useRef(0);

  // Use the externally declared MotionValue instances
  const smoothX = useSmoothTransform(immediateX, springConfig);
  const smoothY = useSmoothTransform(immediateY, springConfig);

  const targetWidth = useSpring(10, springConfig);
  const targetHeight = useSpring(10, springConfig);
  const targetX = useSpring(0, springConfig);
  const targetY = useSpring(0, springConfig);

  // Use the externally declared MotionValue instance
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
      return () => {
        window.removeEventListener('mousemove', handleMouseMove);
      };
    }
  }, [isMobile]);

  useEffect(() => {
    if (!isMobile) {
      if (isTargeted && targetRect) {
        targetWidth.set(targetRect.width + 8);
        targetHeight.set(targetRect.height + 8);
        targetX.set(targetRect.left - 4);
        targetY.set(targetRect.top - 4);
        borderRadiusValue.set(4); // small radius for box shape
        borderWidth.set(2);
      } else {
        targetWidth.set(48);
        targetHeight.set(48);
        targetX.set(smoothX.get() - 24);
        targetY.set(smoothY.get() - 24);
        borderRadiusValue.set(50); // back to circular
        borderWidth.set(2);
      }

      const unsubscribeX = smoothX.on("change", (latest) => {
        if (!isTargeted) {
          targetX.set(latest - 24);
        }
      });
      const unsubscribeY = smoothY.on("change", (latest) => {
        if (!isTargeted) {
          targetY.set(latest - 24);
        }
      });

      return () => {
        unsubscribeX();
        unsubscribeY();
      };
    }
  }, [isTargeted, targetRect, isMobile, smoothX, smoothY, targetWidth, targetHeight, targetX, targetY, borderWidth]);

  const dotX = useTransform(smoothX, val => val - 4);
  const dotY = useTransform(smoothY, val => val - 4);

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
              borderStyle: 'solid', // Make sure border is visible
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
