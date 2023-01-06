import React from 'react';
interface ScreenPropperties {
  width: number;
  name: 'mobileS' | 'mobileM' | 'mobileL' | 'tablet' | 'laptop' | 'laptopL' | '4k';
}

const listScreen: ScreenPropperties[] = [
  { width: 320, name: 'mobileS' },
  { width: 375, name: 'mobileM' },
  { width: 425, name: 'mobileL' },
  { width: 768, name: 'tablet' },
  { width: 1024, name: 'laptop' },
  { width: 1440, name: 'laptopL' },
  { width: 2560, name: '4k' },
];

export const useViewport = () => {
  const [width, setWidth] = React.useState(window.innerWidth);

  React.useEffect(() => {
    const handleWindowResize = () => setWidth(window.innerWidth);
    window.addEventListener('resize', handleWindowResize);
    return () => window.removeEventListener('resize', handleWindowResize);
  }, []);

  return { ...listScreen.filter((item) => width <= item.width)[0], width } as ScreenPropperties;
};
