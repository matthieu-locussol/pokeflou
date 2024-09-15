import { useCallback, useRef } from 'react';

type AnyFunction = (...args: unknown[]) => unknown;

export const useSafeCallback = <T extends AnyFunction>(callback: T) => {
   const callbackRef = useRef({ callback });
   callbackRef.current.callback = callback;
   const safeCallback = useCallback(
      (...args: unknown[]) => callbackRef.current.callback(...args),
      [],
   );
   return safeCallback as unknown as T;
};
