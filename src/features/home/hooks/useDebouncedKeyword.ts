import { useEffect, useMemo, useState } from 'react';
import debounce from 'lodash.debounce';

export default function useDebouncedKeyword(delayMs: number = 350) {
  const [keyword, setKeyword] = useState('');
  const [debouncedKeyword, setDebouncedKeyword] = useState('');

  const debouncedUpdate = useMemo(
    () => debounce((nextKeyword: string) => setDebouncedKeyword(nextKeyword), delayMs),
    [delayMs],
  );

  useEffect(() => {
    debouncedUpdate(keyword);
  }, [debouncedUpdate, keyword]);

  useEffect(() => {
    return () => {
      debouncedUpdate.cancel();
    };
  }, [debouncedUpdate]);

  return {
    keyword,
    setKeyword,
    debouncedKeyword,
  };
}
