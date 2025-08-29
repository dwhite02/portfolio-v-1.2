<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from "vue"

const currentSection = ref("#home")
let prevScrollpos = window.pageYOffset;

const links = [
    { href: "#home", label: "Home" },
    { href: "#about", label: "About" },
    { href: "#work", label: "Work" },
    { href: "#contact", label: "Contact" },
]

function scrollToHash(hash: string) {
    const el = document.querySelector<HTMLElement>(hash)
    if (!el) return
    el.scrollIntoView({ behavior: "smooth", block: "start" })
    currentSection.value = hash
    history.pushState(null, "", hash)
}

function onScroll() {
    const sections = document.querySelectorAll<HTMLElement>(".t-view")
    const scrollPos = window.scrollY + (document.querySelector(".t-header")?.clientHeight || 0) + 10

    let activeId = "#home"
    sections.forEach(section => {
        if (section.offsetTop <= scrollPos) activeId = `#${section.id}`
    })

    if (currentSection.value !== activeId) {
        currentSection.value = activeId
        history.replaceState(null, "", activeId)
    }
}

/* ------------------ ONLY THE HIDE/SHOW NAV LOGIC BELOW ------------------ */

let headerEl: HTMLElement | null = null
let ticking = false
const THRESHOLD = 0  // ignore tiny scroll jitter
const HIDE_OFFSET = "-58px" // keep your exact visual behavior

function handleScroll() {
    if (!ticking) {
        ticking = true
        requestAnimationFrame(() => {
            onScroll() // keep your section highlight logic

            const currentY = window.pageYOffset
            if (headerEl) {
                if (currentY > prevScrollpos + THRESHOLD) {
                    // scrolling down
                    headerEl.style.top = HIDE_OFFSET
                } else if (currentY < prevScrollpos - THRESHOLD || currentY <= 0) {
                    // scrolling up or at very top
                    headerEl.style.top = "0"
                }
            }
            prevScrollpos = currentY
            ticking = false
        })
    }
}

onMounted(() => {
    headerEl = document.querySelector(".t-header") as HTMLElement | null
    window.addEventListener("scroll", handleScroll, { passive: true })
    onScroll() // initialize on load
})

onBeforeUnmount(() => {
    window.removeEventListener("scroll", handleScroll)
})
</script>

<template>
    <header class="t-header p-4">
        <div class="t-header__container flex justify-center items-center">
            <nav class="t-nav-items" aria-label="Main navigation">
                <ul class="flex gap-x-4">
                    <li v-for="link in links" :key="link.href"
                        :class="['t-nav', { current: currentSection === link.href }]">
                        <a @click.prevent="scrollToHash(link.href)" class="font-bold" :href="link.href"
                            :aria-current="currentSection === link.href ? 'page' : undefined">
                            {{ link.label }}
                        </a>
                    </li>
                </ul>
            </nav>
        </div>
    </header>
</template>

<style lang="scss" scoped>
.t-header {
    position: fixed;
    inset-inline: 0;
    top: 0;
    width: 100%;
    background-color: $secondary;
    box-shadow: 0 8px 10px rgba(0, 0, 0, .5);
    color: black;
    z-index: 100;
    transition: top 0.3s;

    &__container {
        max-width: $container-base;
        margin-inline: auto;
        width: calc(100% - 20px * 2);
    }
}

/* The magic that makes anchor stops perfect under the fixed header */
:global(.t-view) {
    scroll-margin-top: var(--header-h, 58px);
}

.t-nav {
    display: inline-flex;
    justify-content: center;
    align-items: center;
    color: white;
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
            background: rgba(255, 255, 255, 1);
            z-index: -1;
            transition: color 300ms, clip-path 600ms;
            clip-path: circle(0%);
        }
    }

    &:hover:not(.current) {
        @include breakpoint(md) {
            color: black;

            &::after {
                clip-path: circle(100%);
            }
        }
    }

    &.current {
        background: #000;
        border-radius: 20px;
        color: white;
        box-shadow: 0 8px 10px rgba(0, 0, 0, .25);
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