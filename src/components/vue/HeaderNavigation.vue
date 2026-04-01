<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref } from "vue";

const currentSection = ref("#home");
const links = [
    { href: "#home", label: "Home" },
    { href: "#about", label: "About" },
    { href: "#work", label: "Work" },
    { href: "#contact", label: "Contact" },
];

let prevScrollPos = 0;
let headerEl: HTMLElement | null = null;
let ticking = false;
let isNavScrolling = false;
// Debounce timer used as fallback for browsers without scrollend support
let navScrollDebounce: number | null = null;
const SCROLL_END_DEBOUNCE_MS = 150;
const THRESHOLD = 6;
const TOP_VISIBILITY_OFFSET = 16;

function getScrollY() {
    return Math.max(window.scrollY || window.pageYOffset || 0, 0);
}

function syncHeaderHeight() {
    const headerHeight = headerEl?.offsetHeight ?? 58;
    document.documentElement.style.setProperty("--header-h", `${headerHeight}px`);
}

function setHeaderHidden(hidden: boolean) {
    if (!headerEl) return;
    headerEl.classList.toggle("is-hidden", hidden);
}

function onNavScrollEnd() {
    isNavScrolling = false;
    navScrollDebounce = null;
    // Sync position so the hide/show logic has a fresh baseline
    prevScrollPos = getScrollY();
}

function resetNavScrollDebounce() {
    if (navScrollDebounce !== null) {
        window.clearTimeout(navScrollDebounce);
    }
    navScrollDebounce = window.setTimeout(onNavScrollEnd, SCROLL_END_DEBOUNCE_MS);
}

function scrollToHash(hash: string) {
    const el = document.querySelector<HTMLElement>(hash);
    if (!el) return;

    syncHeaderHeight();
    isNavScrolling = true;
    setHeaderHidden(false);

    const headerOffset = (headerEl?.offsetHeight ?? 58) + 8;
    const targetTop = Math.max(el.getBoundingClientRect().top + getScrollY() - headerOffset, 0);

    window.scrollTo({ top: targetTop, behavior: "smooth" });
    currentSection.value = hash;
    history.pushState(null, "", hash);
}

function onScroll() {
    const sections = document.querySelectorAll<HTMLElement>(".t-view");
    const scrollPos = getScrollY() + (document.querySelector(".t-header")?.clientHeight || 0) + 10;

    let activeId = "#home";
    sections.forEach((section) => {
        if (section.offsetTop <= scrollPos) activeId = `#${section.id}`;
    });

    if (currentSection.value !== activeId) {
        currentSection.value = activeId;
        history.replaceState(null, "", activeId);
    }
}

function handleScroll() {
    if (ticking) return;

    ticking = true;
    requestAnimationFrame(() => {
        onScroll();

        const currentY = getScrollY();

        if (isNavScrolling) {
            // Keep header visible and push the debounce fallback deadline forward
            setHeaderHidden(false);
            prevScrollPos = currentY;
            resetNavScrollDebounce();
            ticking = false;
            return;
        }

        if (headerEl) {
            const headerHeight = headerEl.offsetHeight || 58;
            const hideStartOffset = Math.max(headerHeight, TOP_VISIBILITY_OFFSET + THRESHOLD);

            if (currentY <= TOP_VISIBILITY_OFFSET) {
                setHeaderHidden(false);
            } else if (currentY > hideStartOffset && currentY > prevScrollPos + THRESHOLD) {
                setHeaderHidden(true);
            } else if (currentY < prevScrollPos - THRESHOLD) {
                setHeaderHidden(false);
            }
        }

        prevScrollPos = currentY;
        ticking = false;
    });
}

onMounted(() => {
    prevScrollPos = getScrollY();
    headerEl = document.querySelector(".t-header");
    syncHeaderHeight();
    setHeaderHidden(false);
    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", syncHeaderHeight, { passive: true });

    // scrollend fires reliably when smooth scroll finishes in supporting browsers
    // (Chrome 114+, Firefox 109+, Safari 16.4+). The debounce fallback above
    // handles older versions.
    if ("onscrollend" in window) {
        window.addEventListener("scrollend", () => {
            if (isNavScrolling) {
                onNavScrollEnd();
            }
        }, { passive: true });
    }

    onScroll();
});

onBeforeUnmount(() => {
    window.removeEventListener("scroll", handleScroll);
    window.removeEventListener("resize", syncHeaderHeight);
    if ("onscrollend" in window) {
        window.removeEventListener("scrollend", onNavScrollEnd);
    }
    if (navScrollDebounce !== null) {
        window.clearTimeout(navScrollDebounce);
    }
});
</script>

<template>
    <header class="t-header p-4">
        <div class="t-header__container flex justify-center items-center">
            <nav class="t-nav-items" aria-label="Main navigation">
                <ul class="flex gap-x-4">
                    <li v-for="link in links" :key="link.href" :class="['t-nav', { current: currentSection === link.href }]">
                        <a
                            :href="link.href"
                            class="font-bold"
                            :aria-current="currentSection === link.href ? 'page' : undefined"
                            @click.prevent="scrollToHash(link.href)"
                        >
                            {{ link.label }}
                        </a>
                    </li>
                </ul>
            </nav>
        </div>
    </header>
</template>

<style lang="scss" scoped>
    @use "../../scss/abstracts" as *;

    .t-header {
        position: fixed;
        inset-inline: 0;
        top: 0;
        width: 100%;
        background-color: var(--clr-header-bg);
        box-shadow: 0 8px 10px rgba(0, 0, 0, 0.35);
        color: var(--clr-header-text);
        z-index: 100;
        transform: translateY(0);
        transition: transform 0.3s ease;
        will-change: transform;

        &__container {
            max-width: $container-base;
            margin-inline: auto;
            width: calc(100% - 20px * 2);
        }

        &.is-hidden {
            transform: translateY(calc(-1 * var(--header-h, 58px)));
        }
    }

    :global(.t-view) {
        scroll-margin-top: var(--header-h, 58px);
    }

    .t-nav {
        display: inline-flex;
        justify-content: center;
        align-items: center;
        color: var(--clr-header-text);
        line-height: 1;
        border-radius: 5px;
        min-height: 20px;
        position: relative;
        transition: all 600ms;
        padding: 5px 10px;
        overflow: hidden;
        z-index: 1;

        @include breakpoint(md) {
            &::after {
                position: absolute;
                content: "";
                inset: 0;
                background: var(--clr-bg);
                z-index: -1;
                transition: color 300ms, clip-path 600ms;
                clip-path: circle(0%);
            }
        }

        &:hover:not(.current) {
            @include breakpoint(md) {
                color: var(--clr-primary);

                &::after {
                    clip-path: circle(100%);
                }
            }
        }

        &.current {
            background: var(--clr-bg);
            border-radius: 20px;
            color: var(--clr-primary);
            box-shadow: 0 8px 10px var(--clr-shadow);
        }

        a {
            @include breakpoint(md) {
                &::after {
                    position: absolute;
                    inset: 0;
                    content: "";
                }
            }
        }
    }
</style>
