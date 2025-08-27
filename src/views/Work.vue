<!-- src/components/WorkSection.vue -->
<script setup lang="ts">
import { type Project } from "../data/ProjectItems";
import CtaCard from "../components/CtaCard.vue";

// Keep your modal opener for "View More"
const openModal = (mod: string | undefined) => {
    if (!mod) return;
    const modal = document.getElementById(mod);
    modal?.classList.add("overlay--in-view");
};

// Props
defineProps<{
    projects: Project[];
}>();

// --- Swiper (use built-in spacing to avoid overflow) ---
let swiperInstance: Swiper | null = null;

function initSwiper() {
    if (window.innerWidth > 1024 && !swiperInstance) {
        swiperInstance = new Swiper(".swiper", {
            // loop: true,
            pagination: {
                el: ".swiper-pagination",
                clickable: true,
            },
            breakpoints: {
                1024: {
                    slidesPerView: 3,
                },
            },
        });
    }
}

function destroySwiper() {
    if (window.innerWidth <= 1024 && swiperInstance) {
        swiperInstance.destroy(true, true);
        swiperInstance = null;
    }
}

function handleResize() {
    initSwiper();
    destroySwiper();
}

document.addEventListener("DOMContentLoaded", () => {
    initSwiper(); // Initialize on load
    window.addEventListener("resize", handleResize);
});
</script>

<template>
    <section id="work" class="t-view">
        <div class="t-wrapper flex flex-col justify-center">
            <div class="t-content">
                <div class="t-image">
                    <img class="mx-auto" src="@/assets/triangle.svg" alt="triangle" />
                </div>

                <div class="t-info flex flex-col items-center">
                    <h1 class="t-title flex-1"> WORK </h1>

                    <div class="t-cards-container">
                        <!-- Slider main container -->
                        <div class="swiper">
                            <!-- Required wrapper -->
                            <div class="swiper-wrapper">
                                <!-- Slides -->
                                <div v-for="project in projects" :key="project.id" class="swiper-slide">
                                    <CtaCard :project="project" :showGlow="true" @view-more="openModal(project.id)" />
                                </div>
                            </div>

                            <!-- Pagination -->
                            <div class="swiper-pagination"></div>
                        </div>
                    </div>

                    <div class="t-bg">
                        <div class="t-brain two">
                            <img src="@/assets/brain.svg" alt="brain" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>

<style lang="scss" scoped>
@use "sass:map";

/* ---------------------------------------
   BG Embellishment
--------------------------------------- */
.t-brain {
    position: absolute;

    &.two {
        right: 5%;
        top: 9%;
        width: 10%;

        @include breakpoint(md) {
            width: 20%;
        }
    }
}

/* ---------------------------------------
   Cards Container
--------------------------------------- */
.t-cards-container {
    max-width: $container-base;
    width: 100%;
    margin-top: 8%;

    @include breakpoint(md) {
        margin-top: 0;
        margin-inline: auto;
        width: calc(100% - 40px * 2);
    }
}

/* ---------------------------------------
   Info / Title / Hero Triangle
--------------------------------------- */
.t-info {
    margin-top: -32%;

    @include breakpoint(xl) {
        margin-top: unset;
    }
}

.t-image {
    margin-top: 0;
    margin-left: 24%;

    @include breakpoint(xl) {
        position: absolute;
        z-index: -1;
        margin-top: -8%;
    }
}

.t-title {
    @include breakpoint(xl) {
        margin-top: 60px;
    }
}

/* ---------------------------------------
   Swiper Layout (equal height + spacing)
--------------------------------------- */
.swiper {
    --swiper-pagination-bullet-size: 12.5px;
    --swiper-pagination-bullet-inactive-color: #{#fff};

    padding-top: 30px;
    width: 100%;
    overflow: hidden;
    /* prevent visual overflow */

    @include breakpoint(md) {
        padding-top: 50px;
    }

    @media (min-width: map.get($breakpoints, xl)) and (max-height: 768px) {
        padding-top: clamp(toRem(10), 3vh, toRem(50));
    }
}

/* Let Swiper manage widths; we only ensure the slide lets its child stretch. */
.swiper-wrapper {
    display: flex;
    flex-direction: column;
    /* stack on small screens */
    flex-wrap: wrap;
    /* allow multiple rows when needed */
    align-items: stretch;
    /* <-- key: same height per row */

    @include breakpoint(md) {
        flex-direction: row;
        /* rows on medium+ screens */
    }

    @include breakpoint(xl) {
        flex-wrap: nowrap;
        /* no wrap on xl if desired */
    }
}

/* Slides should be flex containers so the card can stretch */
.swiper-slide {
    display: flex;
    height: auto !important;
    /* allow natural height; wrapper will stretch */
    align-items: stretch;
    padding-inline: 10px;
    padding-bottom: 20px;

    @include breakpoint(md) {
        max-width: 50%;
    }
}

/* Pagination visibility */
.swiper-pagination {
    position: relative;
    display: none;

    @include breakpoint(xl) {
        display: block;
    }
}
</style>
