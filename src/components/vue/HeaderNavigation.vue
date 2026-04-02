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
let navScrollDebounce: number | null = null;
let resizeDebounce: number | null = null;
let sections: HTMLElement[] = [];
let sectionTops: number[] = [];
let headerHeight = 64;

const SCROLL_END_DEBOUNCE_MS = 200;
const THRESHOLD = 6;
const TOP_VISIBILITY_OFFSET = 16;

function getScrollY() {
    return Math.max(window.scrollY || window.pageYOffset || 0, 0);
}

function cacheSectionTops() {
    sectionTops = sections.map(s => s.offsetTop);
}

function syncHeaderHeight() {
    headerHeight = headerEl?.offsetHeight ?? 64;
    document.documentElement.style.setProperty("--header-h", `${headerHeight}px`);
    cacheSectionTops();
}

function handleResize() {
    if (resizeDebounce !== null) window.clearTimeout(resizeDebounce);
    resizeDebounce = window.setTimeout(syncHeaderHeight, 100);
}

function setHeaderHidden(hidden: boolean) {
    headerEl?.classList.toggle("is-hidden", hidden);
}

function onNavScrollEnd() {
    isNavScrolling = false;
    navScrollDebounce = null;
    prevScrollPos = getScrollY();
}

function resetNavScrollDebounce() {
    if (navScrollDebounce !== null) window.clearTimeout(navScrollDebounce);
    navScrollDebounce = window.setTimeout(onNavScrollEnd, SCROLL_END_DEBOUNCE_MS);
}

function scrollToHash(hash: string) {
    const idx = links.findIndex(l => l.href === hash);
    const el = sections[idx] ?? document.querySelector<HTMLElement>(hash);
    if (!el) return;

    // Set active state and history synchronously — zero delay, instant pill update
    currentSection.value = hash;
    history.pushState(null, "", hash);

    isNavScrolling = true;
    setHeaderHidden(false);

    const cachedTop = sectionTops[idx] ?? el.offsetTop;
    const targetTop = Math.max(cachedTop - headerHeight, 0);

    window.scrollTo({ top: targetTop, behavior: "smooth" });
}

function detectActiveSection() {
    // Don't let scroll detection override a nav click in progress
    if (isNavScrolling) return;

    const scrollMid = getScrollY() + headerHeight + Math.floor(window.innerHeight * 0.25);
    let activeId = "#home";

    for (let i = 0; i < sectionTops.length; i++) {
        if (sectionTops[i] <= scrollMid) {
            activeId = `#${sections[i].id}`;
        } else {
            break;
        }
    }

    if (currentSection.value !== activeId) {
        currentSection.value = activeId;
        history.replaceState(null, "", activeId);
    }
}

function handleScroll() {
    if (ticking) return;
    ticking = true;

    requestAnimationFrame(() => {
        const currentY = getScrollY();

        if (isNavScrolling) {
            setHeaderHidden(false);
            prevScrollPos = currentY;
            resetNavScrollDebounce();
            ticking = false;
            return;
        }

        detectActiveSection();

        if (headerEl) {
            const hideStart = Math.max(headerHeight, TOP_VISIBILITY_OFFSET + THRESHOLD);
            if (currentY <= TOP_VISIBILITY_OFFSET) setHeaderHidden(false);
            else if (currentY > hideStart && currentY > prevScrollPos + THRESHOLD) setHeaderHidden(true);
            else if (currentY < prevScrollPos - THRESHOLD) setHeaderHidden(false);
        }

        prevScrollPos = currentY;
        ticking = false;
    });
}

onMounted(() => {
    headerEl = document.querySelector(".t-header");
    sections = Array.from(document.querySelectorAll<HTMLElement>(".t-view"));
    prevScrollPos = getScrollY();

    syncHeaderHeight();
    setHeaderHidden(false);
    detectActiveSection();

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleResize, { passive: true });

    if ("onscrollend" in window) {
        window.addEventListener("scrollend", () => {
            if (isNavScrolling) onNavScrollEnd();
        }, { passive: true });
    }
});

onBeforeUnmount(() => {
    window.removeEventListener("scroll", handleScroll);
    window.removeEventListener("resize", handleResize);
    if ("onscrollend" in window) {
        window.removeEventListener("scrollend", onNavScrollEnd);
    }
    if (navScrollDebounce !== null) window.clearTimeout(navScrollDebounce);
    if (resizeDebounce !== null) window.clearTimeout(resizeDebounce);
});
</script>

<template>
    <header class="t-header" role="banner">
        <div class="t-header__container">


            <a class="t-header__logo"
            href="#home"
            aria-label="Go to top"
            @click.prevent="scrollToHash('#home')"
            >
            DW<span class="t-header__logo-dot" aria-hidden="true">.</span>
            </a>

            <nav class="t-nav-pill" aria-label="Main navigation">
                <ul class="t-nav-pill__list">
                    <li v-for="link in links" :key="link.href" class="t-nav-pill__item">

                        <a :href="link.href"
                        class="t-nav-pill__link"
                        :class="{ 'is-active': currentSection === link.href }"
                        :aria-current="currentSection === link.href ? 'page' : undefined"
                        @click.prevent="scrollToHash(link.href)"
                        >
                        {{ link.label }}
                        <span v-if="currentSection === link.href" class="t-nav-pill__dot" aria-hidden="true"></span>
                        </a>
                    </li>
                </ul>
            </nav>


            <a class="t-header__cta"
            href="#contact"
            @click.prevent="scrollToHash('#contact')"
            >
            Let's talk
            <span class="t-header__cta-arrow" aria-hidden="true">↗</span>
            </a>

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
    z-index: 100;
    background: color-mix(in oklab, var(--clr-bg) 80%, transparent);
    backdrop-filter: blur(16px) saturate(1.4);
    -webkit-backdrop-filter: blur(16px) saturate(1.4);
    border-bottom: 1px solid var(--clr-border);
    transform: translateY(0);
    transition: transform 0.3s ease;
    will-change: transform;

    &.is-hidden {
        transform: translateY(calc(-1 * var(--header-h, 64px)));
    }
}

.t-header__container {
    max-width: $container-base;
    margin-inline: auto;
    width: calc(100% - clamp(24px, 5vw, 80px) * 2);
    padding-block: 12px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 20px;
}

:global(.t-view) {
    scroll-margin-top: var(--header-h, 58px);
}

.t-header__logo {
    font-size: clamp(1rem, 1.5vw, 1.2rem);
    font-weight: 900;
    letter-spacing: -0.03em;
    text-decoration: none;
    color: var(--clr-text);
    text-transform: uppercase;
    transition: color 0.2s ease;
    flex-shrink: 0;

    &:hover {
        color: var(--clr-primary);
    }
}

.t-header__logo-dot {
    color: var(--clr-primary);
    display: inline-block;
    animation: dot-pulse 3s ease-in-out infinite;
}

@keyframes dot-pulse {

    0%,
    100% {
        opacity: 1;
    }

    50% {
        opacity: 0.4;
    }
}

.t-nav-pill {
    flex: 1;
    display: flex;
    justify-content: center;
}

.t-nav-pill__list {
    display: flex;
    align-items: center;
    gap: 2px;
    list-style: none;
    margin: 0;
    padding: 4px;
    background: color-mix(in oklab, var(--clr-surface) 60%, transparent);
    border: 1px solid var(--clr-border);
    border-radius: 999px;
}

.t-nav-pill__link {
    position: relative;
    display: inline-flex;
    align-items: center;
    gap: 5px;
    padding: 5px 14px;
    border-radius: 999px;
    font-size: clamp(0.7rem, 1vw, 0.8rem);
    font-weight: 700;
    letter-spacing: 0.06em;
    text-transform: uppercase;
    text-decoration: none;
    color: var(--clr-text-dim);
    transition: color 0.2s ease, background 0.2s ease;
    white-space: nowrap;

    &:hover:not(.is-active) {
        color: var(--clr-text);
        background: color-mix(in oklab, var(--clr-border) 40%, transparent);
    }

    &.is-active {
        color: var(--clr-header-text);
        background: var(--clr-primary);
        box-shadow:
            2px 2px 0 color-mix(in oklab, var(--clr-primary) 45%, black),
            0 4px 12px var(--clr-primary-dim);
    }
}

.t-nav-pill__dot {
    display: inline-block;
    width: 5px;
    height: 5px;
    border-radius: 50%;
    background: var(--clr-header-text);
    opacity: 0.7;
    animation: dot-pulse 2s ease-in-out infinite;
    flex-shrink: 0;
}

.t-header__cta {
    display: inline-flex;
    align-items: center;
    gap: 4px;
    padding: 7px 16px;
    border-radius: 999px;
    font-size: clamp(0.68rem, 0.9vw, 0.78rem);
    font-weight: 800;
    letter-spacing: 0.06em;
    text-transform: uppercase;
    text-decoration: none;
    color: var(--clr-header-text);
    background: var(--clr-text);
    border: 1.5px solid color-mix(in oklab, var(--clr-text) 60%, transparent);
    box-shadow:
        2px 2px 0 color-mix(in oklab, var(--clr-text) 40%, black),
        0 4px 12px var(--clr-text-dim);
    transition: transform 0.15s ease, box-shadow 0.15s ease, filter 0.15s ease;
    flex-shrink: 0;
    white-space: nowrap;

    @include breakpoint(sm, max) {
        display: none;
    }

    &:hover {
        transform: translate(-1px, -1px);
        box-shadow:
            3px 3px 0 color-mix(in oklab, var(--clr-secondary) 40%, black),
            0 6px 16px var(--clr-secondary-dim);
        filter: brightness(1.08);
    }

    &:active {
        transform: translate(1px, 1px);
        box-shadow: 1px 1px 0 color-mix(in oklab, var(--clr-secondary) 40%, black);
    }
}

.t-header__cta-arrow {
    display: inline-block;
    transition: transform 0.2s ease;

    .t-header__cta:hover & {
        transform: translate(2px, -2px);
    }
}

@media (prefers-reduced-motion: reduce) {

    .t-header__logo-dot,
    .t-nav-pill__dot {
        animation: none;
    }

    .t-header {
        transition: none;
    }

    .t-header__cta {
        transition: none;
    }
}
</style>