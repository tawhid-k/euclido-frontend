'use client'
import { useState, useEffect } from 'react';

export const useMobileDevice = (breakpoint = 768) => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobileDevice = () => {
      setIsMobile(window.innerWidth <= breakpoint);
    };

    checkMobileDevice();

    window.addEventListener('resize', checkMobileDevice);

    return () => window.removeEventListener('resize', checkMobileDevice);
  }, [breakpoint]);

  return isMobile;
};