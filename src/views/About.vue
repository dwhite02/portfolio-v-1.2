<script setup lang="ts">
    import { ref } from 'vue'

    let id = 0

    interface JobItem {
        id: number,
        org: string,
        role: string,
        date: string
    }

    const jobs = ref<JobItem[]>([
        {id: id++, org:"Radancy", role:"UI Frontend Developer", date:"MAR21 ~"},
        {id: id++, org:"Rise Foundation of Chicago", role:"Digital Specialist", date:"JUL20 - JAN21"},
        {id: id++, org:"Neon One", role:"Junior Web Designer", date:"OCT18 - JUL20"},
    ])
</script>

<template>
    <section id="about" class="t-view">
        <div class="t-wrapper flex flex-col">
            <div class="t-content flex flex-1 lg:flex-row">
                <div class="t-image lg:w-6/12 flex-auto p-2">
                    <img class="mx-auto" src="../assets/elipse.svg" alt="elipse">
                </div>
                <div class="t-info flex-auto lg:w-7/12 p-2">
                    <h1 class="t-title"> ABOUT </h1>
                    <div class="t-text-container w-11/12 text-center md:text-left mx-auto">
                        <p class="t-text">
                            Hey there! Welcome to what you could call my mind—pretty wild, right? 🤯 But let’s skip the tour and get to the good stuff. I’m a digital designer with a passion for blending design and front-end development. I'm always exploring new ways to merge creativity with tech, adding my own twist along the way. If you're here to look around, feel free to treat this like a chill screensaver. And don’t worry—you’re not actually trapped in here (probably). I’ve got to prep for my trip to Mars... or was it Mercury? Either way, thanks for stopping by. Who knows, maybe we’ll cross paths again in the digital cosmos. 🚀
                        </p>
                    </div>
                </div>
            </div>
            <div class="t-side-content flex justify-evenly">
                <div class="t-sub-title">
                    <h2> RESUME </h2>
                </div>
                <div v-for="job in jobs" :key="job.id" class="t-job">
                    <h3 class="t-org">{{ job.org}} </h3>
                    <p class="t-role "> {{ job.role}} </p>
                    <p class="t-date"> {{ job.date}} </p>
                </div>
            </div>
            <div class="t-bg">
                <div class="t-brain one">
                    <img class="" src="../assets/brain.svg" alt="brain">
                </div>
                <div class="t-brain two">
                    <img class="" src="../assets/brain.svg" alt="brain">
                </div>
            </div>
        </div>
    </section>
</template>

<style lang="scss" scoped>

    .t-view {
        @include breakpoint(xl) {
            left: 100%;
        }
    }
    
    .t-brain {
        position: absolute;

        &.one {
            left: 3%;
            bottom: 11%;
            width: 20%;
            display: none;

            @include breakpoint(xl) {
                width: 25%;
                display: block;
            }
        }

        &.two {
            right: 5%;
            width: 12%;
            top: 0;

            @include breakpoint(md) {
                top: 6%;
            }
        }
    }

    .t-content {
        @include breakpoint(xl,max) {
            flex-direction: column;
        }

        @include breakpoint(xl) {
            width: calc(100% - 20px * 2);
            margin-inline: auto;
        }

        @include breakpoint(1600px) {
            width: calc(100% - 80px * 2);
        }
    }

    .t-image {
        margin-left: 0;

        @include breakpoint(xl,max) {
            width: 100%;
        }

        @include breakpoint(xl) {
            margin-left: 4%;
        }
    }

    .t-info {
        position: relative;
        margin-top: -35%;
        color: white;

        @include breakpoint(xl) {
            margin-top: 5%;
        }

        @include breakpoint(xl,max) {
            width: 100%;
        }
    }

    .t-job {
        margin-bottom: 10%;

        @include breakpoint(md) {
            margin-bottom: 0;
        }

        h3 {
            color: $primary;
        }
    }

    .t-side-content {
        color: white;
        margin-bottom: 10%;
        flex-direction: column;
        text-align: center;
        margin-top: 5%;

        @include breakpoint(md) {
            flex-direction: row;
            text-align: left;
        }

        @include breakpoint(xl) {
            margin-top: 2%;
            margin-bottom: 1%;
        }
    }

    .t-sub-title {
        border-top: none;
        margin-block: 5%;

        @include breakpoint(md) {
            border-top: 10px solid #fff;
            margin-block: 0;
        }

        h2 {
            text-shadow: -2px 5px $secondary;
            font-size: 7vw;

            @include breakpoint(md) {
                font-size: 3vw;
            }
        }
    }

    .t-text {
        @include breakpoint(xl) {
            font-size: 15px;
        }
    }

    .t-text-container {
        position: relative;
        background-color: transparent;
        padding: 20px;
        border: 10px solid $primary;
        border-radius: 50px;
        height: auto;
        margin-top: 3%;
        
        @include breakpoint(xl) {
            margin-top: -6%;
        }

        &::after {
            display: none;
            position: absolute;
            content: "";
            height: 100%;
            width: 100%;
            right: 0;
            bottom: 0;
            z-index: -1;
            border: 10px solid rgba(255, 255, 255, .11);
            border-radius: 50px;
            top: 20%;
            left: 10%;

            @include breakpoint(xl) {
                display: block;
            }
        }
    }

    .t-title {
        margin-left: 0%;

        @include breakpoint(xl) {
            margin-left: -20%;
        }
    }
</style>