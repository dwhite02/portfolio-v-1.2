<script setup lang="ts">
    import { type Project } from "../data/ProjectItems";

    const closeModal = (mod: string | undefined) => {
        if (!mod) return;
        const modal = document.getElementById(mod);
        modal?.classList.remove('overlay--in-view');
    }

    defineProps<{
        projects: Project[]
    }>();
</script>

<template>
    <div v-for="project in projects" :key="project.id" v-bind:id="project.id" class="overlay flex items-center">
        <!-- Overlay content -->
        <div class="overlay__content flex flex-col w-10/12 md:w-1/2">
            <div class="t-icons flex justify-center">
                <a v-if="project.web" class="m-4 " v-bind:href="project.web" target="_blank">
                    <p class="t-icon-txt mb-4"> WEB </p>
                    <img class="h-12" src="../assets/www.svg" alt="browser icon">
                </a>
                <a v-if="project.github" class="m-4" v-bind:href="project.github" target="_blank">
                    <p class="t-icon-txt mb-4"> GIT </p>
                    <img class="h-12" src="../assets/git.svg" alt="github icon">
                </a>
            </div>
            <div v-if="project.title" class="t-project-title mb-5">
                <h2 class="font-black"> {{ project.title.toUpperCase() }}</h2>
            </div>
            <div v-if="project.for" class="t-for mb-5">
                <h3 class="font-bold">For :</h3>
                <p> {{ project.for }}</p>
            </div>
            <div v-if="project.about" class="t-about mb-5">
                <h3 class="font-bold">About :</h3>
                <p>
                    {{ project.about }}
                </p>
            </div>
            <div v-if="project.tools" class="t-tools mb-5">
                <h3 class="font-bold">Tools :</h3>
                <p> {{ project.tools }} </p>
            </div>
        </div>
        <div @click="closeModal(project.id)" class="overlay__close-btn">
            <img class="icon icon--inactive" src="../assets/close.svg" alt="close icon">
            <img class="icon icon--active" src="../assets/close-solid.svg" alt="close icon">
        </div>
        <div class="t-brain">
            <img class="" src="../assets/brain.svg" alt="brain">
        </div>
    </div>
</template>

<style lang="scss" scoped>

    .overlay {
        color: white;
        /* Height & width depends on how you want to reveal the overlay (see JS below) */
        height: 0;
        width: 100%;
        position: fixed;
        z-index: 1000;
        left: 0;
        top: 0%;
        background-color: black;
        transition: 0.5s;
        /* 0.5 second transition effect to slide in or slide down the overlay (height or width, depending on reveal) */
        overflow: hidden;

        &__close-btn {
            position: absolute;
            top: 12%;
            right: 2%;
            cursor: pointer;
            color: white;

            @include breakpoint(xs) {
                top: 5%;
                right: 5%;
            }

            &:hover {
                .icon--active {
                    opacity: 1;
                }
            }

            .icon {
                width: 60%;

                @include breakpoint(xs) {
                    width: auto;
                }

                &--active {
                    position: absolute;
                    top: 0;
                    opacity: 0;
                    transition: all .5s;
                }
            }
        }

        &__content {
            max-width: $container-base;
            margin-inline: auto;
            width: calc(100% - 20px * 2);
            text-align: center;

            h3 {
                font-size: 6vw;

                @include breakpoint(xs) {
                    font-size: 3vw;
                }
            }
        }

        .t-brain {
            position: absolute;
            left: -20%;
            bottom: -12%;
            width: 50%;

            @include breakpoint(sm) {
                left: -5%;
                bottom: -15%;
                width: 30%;
            }

            @include breakpoint(xl) {
                left: -5%;
                bottom: -15%;
                width: 25%;
            }

        }

        &.overlay--in-view {
            height: 100%;
        }
    }

</style>