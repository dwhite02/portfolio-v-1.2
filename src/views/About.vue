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
    { id: id++, org: "Radancy", role: "UI Frontend Developer", date: "MAR21 ~" },
    { id: id++, org: "Rise Foundation of Chicago", role: "Digital Specialist", date: "JUL20 - JAN21" },
    { id: id++, org: "Neon One", role: "Junior Web Designer", date: "OCT18 - JUL20" },
])

// Point this to your actual PDF (best: place under /public/resume/...)
const resumeUrl = '/resume.pdf'
</script>

<template>
    <section id="about" class="t-view">
        <div class="t-wrapper flex flex-col">
            <div class="t-content ">
                <div class="t-image flex-auto p-2">
                    <img class="mx-auto" src="../assets/elipse.svg" alt="elipse">
                </div>
                <div class="t-info flex-auto p-2">
                    <h1 class="t-title"> ABOUT </h1>
                    <div class="t-text-container text-center md:text-left mx-auto">
                        <p class="t-text">
                            Hey there! Welcome to what you could call my mind—pretty wild, right? 🤯 But let’s skip the
                            tour and get to the good stuff. I’m a digital designer with a passion for blending design
                            and front-end development. I'm always exploring new ways to merge creativity with tech,
                            adding my own twist along the way. If you're here to look around, feel free to treat this
                            like a chill screensaver. And don’t worry—you’re not actually trapped in here (probably).
                            I’ve got to prep for my trip to Mars... or was it Mercury? Either way, thanks for stopping
                            by. Who knows, maybe we’ll cross paths again in the digital cosmos. 🚀
                        </p>
                    </div>
                </div>
            </div>

            <div class="t-side-content flex justify-evenly">
                <div class="t-sub-title">
                    <h2> RESUME </h2>
                </div>

                <div v-for="job in jobs" :key="job.id" class="t-job">
                    <h3 class="t-org">{{ job.org }} </h3>
                    <p class="t-role "> {{ job.role }} </p>
                    <p class="t-date"> {{ job.date }} </p>
                </div>
            </div>

            <!-- NEW: Download Resume CTA -->
            <div class="t-actions">
                <a class="t-btn t-btn--primary" :href="resumeUrl" download aria-label="Download full resume (PDF)">
                    Download Full Resume
                </a>
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
.t-wrapper {
    padding-top: 100px;
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
            scale: .25;
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
    max-width: $container-lg;

    @include breakpoint(xl, max) {
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

    @include breakpoint(xl, max) {
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

    @include breakpoint(xl, max) {
        width: 100%;
    }
}

.t-job {
    &:not(:last-of-type) {
        margin-bottom: 7.5%;
    }

    h3 {
        color: $primary;
    }
}

.t-side-content {
    color: white;
    margin-bottom: 2.5rem;
    flex-direction: column;
    text-align: center;
    margin-top: 5%;
}

.t-sub-title {
    border-top: none;
    margin-block: 5%;

    h2 {
        text-shadow: -2px 5px $secondary;
        font-size: 7vw;

        @include breakpoint(md) {
            font-size: 3vw;
        }
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
    max-width: $container-md;

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

/* NEW: CTA styles */
.t-actions {
    display: flex;
    justify-content: center;
    margin: 0 auto 20%;
    padding-inline: 1rem;

    @include breakpoint(md) {
        justify-content: flex-start;
    }
}

.t-btn {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    font-weight: 700;
    letter-spacing: .02em;
    text-decoration: none;
    border-radius: 999px;
    padding: 0.9rem 1.5rem;
    border: 2px solid transparent;
    transition: transform .15s ease, background .35s ease, border-color .2s ease;
    outline: none;

    &--primary {
        background: $secondary;
        color: #fff;
        box-shadow: 0 10px 24px rgba(0, 0, 0, .25);

        &:hover {
            transform: translateY(-1px);
            background: $primary;
            border-color: color-mix(in oklab, $primary 35%, white 65%);
        }

        &:focus-visible {
            box-shadow: 0 0 0 4px rgba($primary, .35), 0 10px 24px rgba(0, 0, 0, .25);
        }

        &:active {
            transform: translateY(0);
            box-shadow: 0 8px 18px rgba(0, 0, 0, .22);
        }
    }
}

@media (prefers-reduced-motion: reduce) {
    .t-btn {
        transition: none;
    }
}
</style>
