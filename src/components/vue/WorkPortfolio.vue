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
    if (!swiperRoot.value || window.innerWidth <= 1024 || swiperInstance) {
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

    if (force || window.innerWidth <= 1024) {
        swiperInstance.destroy(true, true);
        swiperInstance = null;
    }
}

function handleResize() {
    if (window.innerWidth > 1024) {
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
            <div class="t-content">
                <div class="t-image">
                    <img
                        class="mx-auto"
                        :src="triangle.src"
                        :width="triangle.width"
                        :height="triangle.height"
                        alt="Triangle graphic"
                        loading="lazy"
                        decoding="async"
                    />
                </div>

                <div class="t-info flex flex-col items-center">
                    <h2 class="t-title flex-1">WORK</h2>

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
                            <img
                                :src="brain.src"
                                :width="brain.width"
                                :height="brain.height"
                                alt="Brain graphic"
                                loading="lazy"
                                decoding="async"
                            />
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

    .t-info {
        position: relative;
        width: 100%;
        gap: clamp(1rem, 3vw, 2rem);

        @include breakpoint(xl) {
            align-items: center;
        }
    }

    .t-image {
        display: flex;
        justify-content: center;
        width: min(100%, 280px);
        margin: 0 auto clamp(1rem, 3vw, 2rem);

        @include breakpoint(xl) {
            position: absolute;
            z-index: -1;
            top: 0;
            left: 50%;
            margin: 0;
            transform: translateX(-5%);
        }
    }

    .t-title {
        margin-top: 0;

        @include breakpoint(xl) {
            margin-top: 40px;
        }
    }

    .swiper {
        --swiper-pagination-bullet-size: 12.5px;
        --swiper-pagination-bullet-inactive-color: #{#fff};
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
        }
    }
</style>
