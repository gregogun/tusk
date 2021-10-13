import { useEffect, useState } from 'react';

export default function useMediaQuery(query) {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    // check if value passed in via 'query' matches the current window query
    const media = window.matchMedia(query);
    if (media.matches !== matches) {
      setMatches(media.matches);
    }
    // keep media variable in sync with window changing sizes
    const listener = () => {
      setMatches(media.matches);
    };
    media.addEventListener('change', listener);
    // cleanup to prevent memory leak
    return () => media.removeEventListener('change', listener);
  }, [matches, query]);

  return matches;
}
