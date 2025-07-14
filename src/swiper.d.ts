// src/types/swiper.d.ts
export { }; // makes this a module-safe global type file

declare global {
    class Swiper {
        constructor(container: string | Element, options?: any);
        slideNext(): void;
        slidePrev(): void;
        destroy(deleteInstance?: boolean, cleanStyles?: boolean): void;
        // Add more methods if needed
    }
}
