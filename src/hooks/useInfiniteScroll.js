import { useState, useEffect, useMemo } from 'react';

export default function useInfiniteScroll(ref, option) {
  const [isVisible, setIsVisible] = useState(false);

  function cb(entries) {
    const [entry] = entries;
    setIsVisible(entry.isIntersecting);
  }

  const optionMemo = useMemo(() => {
    return option;
  }, [option]);

  useEffect(() => {
    const observer = new IntersectionObserver(cb, optionMemo);
    const target = ref.current;
    if (target && !isVisible) {
      observer.observe(target);
    }

    return () => {
      if (target) observer.unobserve(target);
    };
  }, [ref, optionMemo]);

  return isVisible;
}
