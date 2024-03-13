import { MainContainer } from '@components';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

function Main() {
  const [page, setPage] = useState(0);
  const [isScrolling, setIsScrolling] = useState(false);
  const pageList = [
    <div>
      <h1>page1</h1>
      <Link to="/wordbook">단어장</Link>
    </div>,
    <div>
      <h1>page2</h1>
      <Link to="/wordbook">단어장</Link>
    </div>,
    <div>
      <h1>page3</h1>
      <Link to="/wordbook">단어장</Link>
    </div>,
  ];
  useEffect(() => {
    window.scrollTo(0, 0);
    const wheelEvent = (e: WheelEvent) => {
      e.preventDefault();
      if(isScrolling) return;
      if(e.deltaY > 0 && page == pageList.length - 1) return;
      if(e.deltaY < 0 && page == 0) return;
      setIsScrolling(true);
      if(e.deltaY > 0) setPage(page + 1);
      else setPage(page - 1);
      setTimeout(() => {
        setIsScrolling(false);
      }, 1000);
    }
    window.addEventListener('wheel', wheelEvent, {passive: false});
    return () => {
      window.removeEventListener('wheel', wheelEvent);
    };
  }, [page, isScrolling]);
  
  console.log(page);

  return (
    <MainContainer $background='white' style={{height:"100%"}}>
      {pageList[page]}
    </MainContainer>
  );
}

export default Main;
