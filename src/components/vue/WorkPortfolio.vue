<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref } from "vue";
import Swiper from "swiper";
import { Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import brain from "@/assets/brain.svg";
import triangle from "@/assets/triangle.svg";
import { projects } from "@/data/projects";
import CtaCard from "./CtaCard.vue";
import ProjectModal from "./ProjectModal.vue";

const swiperRoot = ref<HTMLElement | null>(null);
let swiperInstance: Swiper | null = null;

function initSwiper() {
    if (!swiperRoot.value || window.innerWidth < 1024 || swiperInstance) {
        return;
    }

    swiperInstance = new Swiper(swiperRoot.value, {
        modules: [Pagination],
        slidesPerView: 3,
        watchOverflow: true,
        pagination: {
            el: swiperRoot.value.querySelector<HTMLElement>(".swiper-pagination"),
            clickable: true,
        },
        breakpoints: {
            1024: {
                slidesPerView: 3,
            },
        },
    });
}

function destroySwiper(force = false) {
    if (!swiperInstance) {
        return;
    }

    if (force || window.innerWidth < 1024) {
        swiperInstance.destroy(true, true);
        swiperInstance = null;
    }
}

function handleResize() {
    if (window.innerWidth >= 1024) {
        initSwiper();
        return;
    }
    destroySwiper();
}

onMounted(() => {
    requestAnimationFrame(() => {
        initSwiper();
    });
    window.addEventListener("resize", handleResize, { passive: true });
});

onBeforeUnmount(() => {
    window.removeEventListener("resize", handleResize);
    destroySwiper(true);
});
</script>

<template>
    <section id="work" class="t-view">
        <div class="t-wrapper flex flex-col justify-center">

            <!-- Floating decal stars -->
            <div class="t-decals" aria-hidden="true">
                <span class="decal star s1"></span>
                <span class="decal star s2"></span>
                <span class="decal cross c1"></span>
            </div>

            <div class="t-content">
                <div class="t-image">
                    <img class="mx-auto" :src="triangle.src" :width="triangle.width" :height="triangle.height"
                        alt="Triangle graphic" loading="lazy" decoding="async" />
                </div>

                <div class="t-info flex flex-col items-center">

                    <div class="t-heading-group">
                        <p class="t-eyebrow">Selected projects</p>
                        <h2 class="t-title">WORK</h2>
                    </div>

                    <div class="t-cards-container">
                        <div ref="swiperRoot" class="swiper">
                            <div class="swiper-wrapper">
                                <div v-for="(project, i) in projects" :key="project.id" class="swiper-slide">
                                    <CtaCard :project="project" :index="i" />
                                </div>
                            </div>
                            <div class="swiper-pagination"></div>
                        </div>
                    </div>

                    <div class="t-bg">
                        <div class="t-brain two">
                            <img :src="brain.src" :width="brain.width" :height="brain.height" alt="Brain graphic"
                                loading="lazy" decoding="async" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <ProjectModal />
    </section>
</template>

<style lang="scss" scoped>
@use "../../scss/abstracts" as *;

/* ─────────────────────────────────────────
       Section
    ───────────────────────────────────────── */
.t-view {
    position: relative;
    background-color: var(--clr-bg);
    color: var(--clr-text);
    overflow: hidden;
    isolation: isolate;

    // Ambient glow pools
    &::before {
        content: "";
        position: absolute;
        inset: 0;
        z-index: 0;
        pointer-events: none;
        background:
            radial-gradient(ellipse 50vw 40vh at 8% 30%, color-mix(in oklab, var(--clr-primary) 8%, transparent), transparent 70%),
            radial-gradient(ellipse 40vw 35vh at 92% 65%, color-mix(in oklab, var(--clr-secondary) 8%, transparent), transparent 70%);
    }
}

/* ─────────────────────────────────────────
       Decals
    ───────────────────────────────────────── */
@keyframes floaty {
    from {
        transform: translateY(0) rotate(0deg);
    }

    to {
        transform: translateY(-10px) rotate(8deg);
    }
}

@keyframes floaty-r {
    from {
        transform: translateY(0) rotate(0deg);
    }

    to {
        transform: translateY(-7px) rotate(-6deg);
    }
}

.t-decals {
    position: absolute;
    inset: 0;
    z-index: 1;
    pointer-events: none;
}

.decal {
    position: absolute;
    display: block;
    animation: floaty 4s ease-in-out infinite alternate;
}

.decal.star {
    width: clamp(14px, 1.8vw, 24px);
    height: clamp(14px, 1.8vw, 24px);
    background: var(--clr-primary);
    clip-path: polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%);
    filter: drop-shadow(0 0 6px var(--clr-primary));
}

.decal.cross {
    width: clamp(10px, 1.2vw, 18px);
    height: clamp(10px, 1.2vw, 18px);
    background: var(--clr-secondary);
    clip-path: polygon(35% 0%, 65% 0%, 65% 35%, 100% 35%, 100% 65%, 65% 65%, 65% 100%, 35% 100%, 35% 65%, 0% 65%, 0% 35%, 35% 35%);
    filter: drop-shadow(0 0 5px var(--clr-secondary));
    animation-name: floaty-r;
}

.decal.s1 {
    top: 12%;
    left: 6%;
    animation-duration: 3.8s;
}

.decal.s2 {
    bottom: 18%;
    right: 5%;
    animation-duration: 4.5s;
    animation-delay: 0.6s;
}

.decal.c1 {
    top: 45%;
    right: 8%;
    animation-duration: 3.3s;
    animation-delay: 0.3s;
}

@media (prefers-reduced-motion: reduce) {
    .decal {
        animation: none;
    }
}

/* ─────────────────────────────────────────
       Brain
    ───────────────────────────────────────── */
.t-brain {
    position: absolute;
    filter: drop-shadow(0 0 20px var(--clr-secondary-dim));

    &.two {
        right: 5%;
        top: 9%;
        width: 10%;

        @include breakpoint(md) {
            width: 20%;
        }
    }
}

/* ─────────────────────────────────────────
       Heading group
    ───────────────────────────────────────── */
.t-heading-group {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 4px;

    @include breakpoint(xl) {
        align-items: center;
    }
}

.t-eyebrow {
    font-size: clamp(0.6rem, 1vw, 0.72rem);
    font-weight: 700;
    letter-spacing: 0.18em;
    text-transform: uppercase;
    color: var(--clr-text-dim);
    margin: 0;
}

.t-title {
    margin: 0;
    color: var(--clr-primary);
    text-shadow:
        0 0 40px var(--clr-primary-dim),
        2px 4px 0 color-mix(in oklab, var(--clr-primary) 20%, transparent);

}

/* ─────────────────────────────────────────
       Triangle image
    ───────────────────────────────────────── */
.t-image {
    display: flex;
    justify-content: center;
    width: min(100%, 280px);
    margin: 0 auto clamp(1rem, 3vw, 2rem);
    filter: drop-shadow(0 0 28px var(--clr-primary-dim));

    @include breakpoint(xl) {
        position: absolute;
        z-index: -1;
        top: 0;
        left: 50%;
        margin: 0;
        transform: translateX(-5%);
    }
}

/* ─────────────────────────────────────────
       Info
    ───────────────────────────────────────── */
.t-info {
    position: relative;
    width: 100%;
    gap: clamp(1rem, 3vw, 2rem);

    @include breakpoint(xl) {
        align-items: center;
    }
}

/* ─────────────────────────────────────────
       Cards container — untouched sizing
    ───────────────────────────────────────── */
.t-cards-container {
    max-width: $container-base;
    width: 100%;
    margin-top: clamp(1.5rem, 4vw, 3rem);
    min-height: clamp(900px, 110vw, 1200px);

    @include breakpoint(md) {
        margin-inline: auto;
        width: calc(100% - 40px * 2);
        min-height: clamp(720px, 72vw, 860px);
    }

    @include breakpoint(xl) {
        min-height: clamp(420px, 34vw, 560px);
    }
}

/* ─────────────────────────────────────────
       Swiper — untouched structure, updated tokens
    ───────────────────────────────────────── */
.swiper {
    --swiper-pagination-bullet-size: 12.5px;
    --swiper-pagination-bullet-inactive-color: var(--clr-border);
    --swiper-pagination-bullet-inactive-opacity: 1;
    --swiper-pagination-color: var(--clr-primary);

    padding-top: 30px;
    width: 100%;
    overflow: hidden;

    @include breakpoint(md) {
        padding-top: 50px;
    }

    @include breakpoint(xl) {
        @media (max-height: 768px) {
            padding-top: clamp(toRem(10), 3vh, toRem(50));
        }
    }
}

.swiper-wrapper {
    display: flex;
    flex-direction: column;
    align-items: stretch;

    @include breakpoint(md) {
        flex-direction: row;
        flex-wrap: wrap;
        justify-content: center;
    }

    @include breakpoint(xl) {
        justify-content: flex-start;
        flex-wrap: nowrap;
    }
}

.swiper-slide {
    display: flex;
    height: auto !important;
    align-items: stretch;
    padding-inline: 10px;
    padding-bottom: 20px;
    width: 100%;

    @include breakpoint(md) {
        padding-bottom: 60px;
        width: 50%;
        max-width: 50%;
        flex: 0 0 50%;
    }

    @include breakpoint(xl) {
        width: 33.3333%;
        max-width: 33.3333%;
        flex: 0 0 33.3333%;
    }
}

.swiper-pagination {
    position: relative;
    display: none;

    @include breakpoint(xl) {
        display: block;
        margin-top: 8px;
    }
}
</style>