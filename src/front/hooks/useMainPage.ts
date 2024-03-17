import { useEffect, useState, useCallback, useMemo } from 'react';

function useMainPage<T>(pageList: Array<T>) {
  const [page, setPage] = useState(0);
  const [isScrolling, setIsScrolling] = useState(false);

  const pageUp = useCallback(() => {
    if (page < pageList.length - 1) setPage(page + 1);
  }, [page]);

  const pageDown = useCallback(() => {
    if (page > 0) setPage(page - 1);
  }, [page]);

  const pageControl = useCallback((type: 'up' | 'down') => {
    if (isScrolling) return;
    setIsScrolling(true);
    if (type === 'up') pageUp();
    else pageDown();
    setTimeout(() => {
      setIsScrolling(false);
    }, 1000);
  }, [isScrolling, pageUp, pageDown]);

  const wheelEvent = useCallback((e: WheelEvent) => {
    if(page === pageList.length - 1 && e.deltaY > 0 && !isScrolling) return;
    e.preventDefault();
    if (e.deltaY > 0) return pageControl('up');
    pageControl('down');
  }, [pageControl]);

  const touchEvent = useCallback(() => {
    let startY = 0;
    const touchStart = (e: TouchEvent) => {
      startY = e.touches[0].clientY;
    }
    const touchEnd = (e: TouchEvent) => {
      const endY = e.changedTouches[0].clientY;
      if (startY - endY > 50) return pageControl('up');
      if (startY - endY < -50) return pageControl('down');
    }
    return { touchStart, touchEnd };
  }, [pageControl]);

  useEffect(() => {
    window.addEventListener('wheel', wheelEvent, { passive: false });
    const { touchStart, touchEnd } = touchEvent();
    window.addEventListener('touchstart', touchStart);
    window.addEventListener('touchend', touchEnd);
    return () => {
      window.removeEventListener('wheel', wheelEvent);
      window.removeEventListener('touchstart', touchStart);
      window.removeEventListener('touchend', touchEnd);
    };
  }, [wheelEvent, touchEvent]);

  useEffect(()=> {
    scrollTo(0,0);
  }, [page]);

  return useMemo(()=>({page,info:pageList[page], pageUp}), [page, pageList, pageUp]);
}

export default useMainPage;
