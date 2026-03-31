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
    pagination: {
      el: swiperRoot.value.querySelector(".swiper-pagination"),
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
  initSwiper();
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
          <img class="mx-auto" :src="triangle.src" alt="Triangle graphic" loading="lazy" decoding="async" />
        </div>

        <div class="t-info flex flex-col items-center">
          <h2 class="t-title flex-1">WORK</h2>

          <div class="t-cards-container">
            <div ref="swiperRoot" class="swiper">
              <div class="swiper-wrapper">
                <div v-for="project in projects" :key="project.id" class="swiper-slide">
                  <CtaCard :project="project" />
                </div>
              </div>
              <div class="swiper-pagination"></div>
            </div>
          </div>

          <div class="t-bg">
            <div class="t-brain two">
              <img :src="brain.src" alt="Brain graphic" loading="lazy" decoding="async" />
            </div>
          </div>
        </div>
      </div>
    </div>
    <ProjectModal />
  </section>
</template>

<style lang="scss" scoped>
  @use "sass:map";
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
    margin-top: 8%;

    @include breakpoint(md) {
      margin-top: 0;
      margin-inline: auto;
      width: calc(100% - 40px * 2);
    }
  }

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

  .swiper {
    --swiper-pagination-bullet-size: 12.5px;
    --swiper-pagination-bullet-inactive-color: #{#fff};
    padding-top: 30px;
    width: 100%;
    overflow: hidden;

    @include breakpoint(md) {
      padding-top: 50px;
    }

    @media (min-width: map.get($breakpoints, xl)) and (max-height: 768px) {
      padding-top: clamp(toRem(10), 3vh, toRem(50));
    }
  }

  .swiper-wrapper {
    display: flex;
    flex-direction: column;
    flex-wrap: wrap;
    align-items: stretch;

    @include breakpoint(md) {
      flex-direction: row;
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

    @include breakpoint(md) {
      padding-bottom: 60px;
      max-width: 50%;
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
