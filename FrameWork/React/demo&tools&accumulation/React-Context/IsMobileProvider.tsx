import React, { createContext, useCallback, useContext, useEffect, useState } from 'react';

const SmallScreenContext = createContext(false);

export function useIsSmallScreen(): boolean {
  return useContext(SmallScreenContext);
}

function IsSmallScreenProvider({ children }) {
  const [isSmallScreen, setIsSmallScreen] = useState(false);

  const handleScreenChange = useCallback((e) => {
    setIsSmallScreen(e.matches || navigator.userAgent.match(/(iPhone|iPod|Android|ios)/i));
    // to do something
    // ...
  }, []);

  useEffect(() => {
    const matchMediaQueryList = window.matchMedia('(max-width: 720px)');
    handleScreenChange(matchMediaQueryList);
    if (matchMediaQueryList.addEventListener) {
      matchMediaQueryList.addEventListener('change', handleScreenChange);
    } else {
      matchMediaQueryList.addListener(handleScreenChange);
    }

    return () => {
      matchMediaQueryList.removeEventListener('change', handleScreenChange);
      matchMediaQueryList.removeListener(handleScreenChange);
    };
  }, [handleScreenChange]);
  return <SmallScreenContext.Provider value={isSmallScreen}>{children}</SmallScreenContext.Provider>;
}

export default IsSmallScreenProvider;
