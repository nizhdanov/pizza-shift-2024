import { useMediaQuery } from '@siberiacancode/reactuse';

export const useIsDesktop = () => useMediaQuery('(min-width: 768px)');
