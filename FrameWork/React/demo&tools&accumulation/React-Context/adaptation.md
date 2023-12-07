# 多设备屏幕适配

## 利用matchMedia, Context等实现适配

IsMobileProvider.tsx

```tsx
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
```

App.tsx

```tsx
import * as React from 'react';
import Routes from '@/views';
import IsMobileProvider from '@/providers/IsMobileProvider';
export default React.memo(() => (
  <IsMobileProvider>
      <Routes />
  </IsMobileProvider>
));
```

PageA.tsx

```tsx
import React from 'react';
import { useIsMobile } from '@/providers/IsMobileProvider';
import PageViewA from '@/views/PageA/components/PageViewA';
import MobilePageViewA from '@/views/PageA/components/MobilePageViewA';

function Index() {
  const isMobile = useIsMobile();
  if (isMobile) return <MobilePageViewA />;
  return <PageViewA />;
}

export default Index;
```
