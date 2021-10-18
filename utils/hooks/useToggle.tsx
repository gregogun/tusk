import { useCallback, useState } from 'react';

/* typing return as any until issue fix */
export default function useToggle(initialValue = false): any {
  const [value, setValue] = useState(initialValue);
  const toggle = useCallback(() => {
    setValue((v) => !v);
  }, []);
  return [value, toggle];
}
