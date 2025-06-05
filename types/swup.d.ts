
declare module 'swup' {
  export default class Swup {
    constructor(options?: any);
    on(event: string, callback: () => void): void;
    destroy(): void;
  }
}

declare module '@swup/overlay-theme' {
  export default class SwupOverlayTheme {
    constructor(options?: {
      color?: string;
      duration?: number;
      direction?: string;
    });
  }
}
