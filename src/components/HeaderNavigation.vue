<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount, nextTick } from "vue"

type NavLink = { href: `#${string}`, label: string }
const links: NavLink[] = [
    { href: "#home", label: "Home" },
    { href: "#about", label: "About" },
    { href: "#work", label: "Work" },
    { href: "#contact", label: "Contact" },
]

const currentSection = ref<string>(window.location.hash || "#home")

let io: IntersectionObserver | null = null

function headerH(): number {
    return (document.querySelector(".t-header") as HTMLElement)?.offsetHeight || 72
}

function setScrollMarginTop() {
    document.documentElement.style.setProperty("--header-h", `${headerH()}px`)
}

function scrollToHash(hash: string) {
    const el = document.querySelector<HTMLElement>(hash)
    if (!el) return
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    el.scrollIntoView({ behavior: reduce ? "auto" : "smooth", block: "start" })
    currentSection.value = hash
    history.pushState(null, "", hash)
}

function makeObserver() {
    io?.disconnect()
    const h = headerH()

    // Observe the actual sections (no sentinels), with a top offset for the fixed header
    io = new IntersectionObserver(
        (entries) => {
            // choose the section whose top is closest to the header edge and is intersecting
            let best: { id: string; dist: number } | null = null
            for (const e of entries) {
                if (!e.isIntersecting) continue
                const id = (e.target as HTMLElement).id
                if (!id) continue
                const top = (e.target as HTMLElement).getBoundingClientRect().top
                const dist = Math.abs(top - h)
                if (!best || dist < best.dist) best = { id, dist }
            }
            if (best && currentSection.value !== `#${best.id}`) {
                currentSection.value = `#${best.id}`
                history.replaceState(null, "", `#${best.id}`)
            }
        },
        {
            root: null,
            rootMargin: `-${h}px 0px -60% 0px`, // start tracking after header; don't flip too late
            threshold: [0, 0.5, 1],
        }
    )

    document.querySelectorAll<HTMLElement>(".t-view").forEach((sec) => io!.observe(sec))
}

function onScrollTopGuard() {
    // If user is at the very top, force Home to be active
    if (window.scrollY <= 2 && currentSection.value !== "#home") {
        currentSection.value = "#home"
        history.replaceState(null, "", "#home")
    }
}

onMounted(async () => {
    setScrollMarginTop()
    makeObserver()
    window.addEventListener("scroll", onScrollTopGuard, { passive: true })

    await nextTick()
    // Respect deep links on load
    const initial = window.location.hash || "#home"
    currentSection.value = initial
    if (initial !== "#home") scrollToHash(initial)

    // Rebuild IO on header resize (simple: listen to resize)
    window.addEventListener("resize", () => {
        setScrollMarginTop()
        makeObserver()
    })
})

onBeforeUnmount(() => {
    io?.disconnect()
    window.removeEventListener("scroll", onScrollTopGuard)
})
</script>

<template>
    <header class="t-header p-4">
        <div class="t-header__container flex justify-center items-center">
            <nav class="t-nav-items" aria-label="Main navigation">
                <ul class="flex gap-x-4">
                    <li v-for="link in links" :key="link.href"
                        :class="['t-nav', { current: currentSection === link.href }]">
                        <a :href="link.href" class="font-bold"
                            :aria-current="currentSection === link.href ? 'page' : undefined"
                            @click.prevent="scrollToHash(link.href)">
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
    width: 100%;
    left: 0;
    right: 0;
    margin-inline: auto;
    background-color: $secondary;
    box-shadow: 0 8px 10px rgba(0, 0, 0, .5);
    color: black;
    z-index: 100;

    // @include breakpoint(md) {
    //     background-color: unset;
    //     box-shadow: unset;
    //     top: 10px;
    // }

    &__container {
        max-width: $container-base;
        margin-inline: auto;
        width: calc(100% - 20px * 2);
    }
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
    position: relative;
    z-index: 1;

    @include breakpoint(md) {
        // color: #000;
        // border: 1px solid white;
        // background: rgba($color: #000, $alpha: .795);

        &::after {
            position: absolute;
            content: "";
            inset: 0;
            background: rgba($color: white, $alpha: 1);
            z-index: -1;
            width: 100%;
            height: 100%;
            transition: color 300ms, clip-path 600ms;
            clip-path: circle(0%);
        }
    }

    &:hover:not(.current) {
        @include breakpoint(md) {
            // background-color: #000;
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

        // @include breakpoint(md) {
        //     background: $secondary;
        // }
    }

    a {

        @include breakpoint(md) {
            &::after {
                position: absolute;
                top: 0;
                right: 0;
                bottom: 0;
                left: 0;
                content: "";
            }
        }

    }
}

/* makes scrollIntoView stop under the header nicely */
:global(.t-view) {
    scroll-margin-top: var(--header-h, 72px);
}
</style>