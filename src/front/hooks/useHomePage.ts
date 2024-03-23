import { useEffect, useState, useRef, useCallback, useMemo } from 'react';

function useMainPage() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    const children = container.children;
    const upAnimationObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!(entry.target instanceof HTMLElement)) return;
          if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
            return;
          }
          if (entry.boundingClientRect.top > 0) {
            entry.target.style.opacity = '0';
            entry.target.style.transform = 'translateY(50%)';
          }
        });
      },
      { threshold: 0 }
    );
    [...children].forEach((child) => {
      upAnimationObserver.observe(child);
    });
  }, [containerRef]);

  return { containerRef };
}

export default useMainPage;
