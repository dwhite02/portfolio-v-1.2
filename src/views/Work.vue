<script setup>
    const openModal = (mod) => {
        const modal = document.getElementById(mod);
        const body = document.querySelector('body');
        const header = document.getElementsByClassName('t-header')
        modal.classList.add('overlay--in-view');
    }

    // Define props using defineProps in the child component
    const props = defineProps({
        projects: {
            type: Array,
            required: true
        }
    });

    let swiperInstance = null;

    function initSwiper() {
        if (window.innerWidth > 1024 && !swiperInstance) {
            swiperInstance = new Swiper('.swiper', {
                // loop: true,
                pagination: {
                    el: '.swiper-pagination',
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

    document.addEventListener('DOMContentLoaded', () => {
        initSwiper(); // Initialize on load
        window.addEventListener('resize', handleResize);
    });
</script>

<template>
    <section id="work" class="t-view">
        <div class="t-wrapper flex flex-col">
            <div class="t-content">
                <div class="t-image">
                    <img class="mx-auto" src="@/assets/triangle.svg" alt="triangle">
                </div>
                <div class="t-info flex flex-col items-center">
                    <h1 class="t-title flex-1"> WORK </h1>
                    <div class="t-cards-container ">
                        <!-- Slider main container -->
                        <div class="swiper">
                            <!-- Additional required wrapper -->
                            <div class="swiper-wrapper">
                                <!-- Slides -->
                                <div v-for="project in projects" :key="project.id" class="swiper-slide">
                                    <div class="t-card flex-auto ">
                                        <div class="t-card__icon-wrapper">
                                            <img class="t-card__icon" v-bind:src="project.img" v-bind:alt="project.alt">
                                        </div>
                                        <span class="t-card__fake-title">{{project.title.toUpperCase()}}</span>
                                        <div class="t-card__info text-center">
                                            <h2 class="t-card__headline font-black">{{project.title.toUpperCase()}}</h2>
                                            <p>
                                                {{project.about.split(" ").splice(0,15).join(" ")}} ...
                                            </p>
                                            <button @click="openModal(project.id)" class="t-card__view-all-btn"> View More </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <!-- If we need pagination -->
                            <div class="swiper-pagination"></div>
                        
                            <!-- If we need navigation buttons -->
                            <!-- <div class="swiper-button-prev"></div>
                            <div class="swiper-button-next"></div> -->
                
                        </div>
                        
                    </div>
                    <div class="t-bg">
                        <div class="t-brain one">
                            <img class="" src="@/assets/brain.svg" alt="brain">
                        </div>
                        <div class="t-brain two">
                            <img class="" src="@/assets/brain.svg" alt="brain">
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>

<style lang="scss" scoped>

    .t-view {
        @include breakpoint(xl) {
            left: 200%;
        }
    }

    .t-brain {
        position: absolute;

        &.one {
            left: 10%;
            top: 1%;
            width: 5%;
            display: none;

            @include breakpoint(md) {
                display: block;
            }

        }

        &.two {
            right: 5%;
            top: 9%;
            width: 10%;

            @include breakpoint(md) {
                width: 20%;
            }

        }
    }

    .t-card {
        position: relative;
        background-color: white;
        display: flex;
        justify-content: center;
        align-items: center;
        border-radius: 50px;
        padding-inline: 20px;
        padding-block: 5%;
        transition: all .4s;
        overflow: hidden;
        min-height: 350px;
        margin-bottom: 8%;
        box-shadow: 10px 15px 0px 0px rgba(#fff, .375);
        width: 100%;
        margin-inline: auto;
        box-sizing: border-box;
        border-block-end: solid 3px;
        border-inline-end: solid 3px;

        @include breakpoint(xs) {
            width: 70%;
            height: 50%;
            max-width: 100%;
        }

        @include breakpoint(md) {
            width: 85%;
        }

        @include breakpoint(xl) {
            margin-bottom: 60px;
        }

        &:hover {
            box-shadow: 0px 15px #fff;
            border: 5px solid #fff;

            .t-card__info {
                top: 0;
            }
        }

        &__fake-title {
            font-weight: 900;
            max-width: 100%;
            font-size: 1rem;
            letter-spacing: -1px;
            font-family: $base-font;
            position: absolute;
            left: 0;
            right: 0;
            margin: auto;
            bottom: 80px;
            text-align: center;
            color: $secondary-dark;
            // text-shadow: 2px 5px 5px rgba(0, 0,0,.25);
        }

        &__headline {
            font-size: clamp(1.5rem, 6vw, 1.75rem); // Adjust the min, preferred, and max font sizes
            margin-bottom: 5%;
        }

        &__icon {
            scale: .65;
            width: 100%;
            height: 100%;
            object-fit: contain;
        }

        &__icon-wrapper {
            background-color: black;
            border-radius: 10px;
            aspect-ratio: 1;
            display: flex;
            align-content: center;
            max-width: 100px;
        }

        &__info {
            position: absolute;
            content: "";
            top: 100%;
            bottom: 0;
            left: 0;
            right: 0;
            padding: 20px;
            height: 100%;
            width: 100%;
            background: black;
            color: white;
            transition: all .4s;
        }

        &__view-all-btn {
            background-color: $primary;
            border-radius: 100px;
            padding: 10px 25px;
            margin-top: 15%;
            transition: all .3s;
            font-weight: bold;
            cursor: pointer;

            &:hover {
                background-color: $secondary;
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

        @include breakpoint(md) {
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

        @include breakpoint(md) {
            margin-top: 50px;
        }
       
    }

    .swiper {
        --swiper-navigation-sides-offset: 0;
        --swiper-navigation-size: 34px;
        --swiper-pagination-bullet-size: 12.5px;
        --swiper-pagination-bullet-inactive-color: #{#fff};

        padding-top: 30px;
        width: 100%;

        @include breakpoint(md) {
            padding-top: 50px;
        }
    }

    .swiper-slide {
        height: auto !important;

        @include breakpoint(md) {
            max-width: 50%;
        }
    }

    .swiper-wrapper {
        flex-direction: column;
        align-items: center;
        flex-wrap: wrap;
        row-gap: 30px;

        @include breakpoint(md) {
            flex-direction: row;
        }

        @include breakpoint(xl) {
            flex-wrap: nowrap;
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