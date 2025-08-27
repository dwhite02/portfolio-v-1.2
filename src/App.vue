
<script setup lang="ts">
    import { ref} from 'vue';
    import { projects } from "./data/ProjectItems";

    import HeaderNavigation from './components/HeaderNavigation.vue';
    import ProjectModal from './components/ProjectModal.vue';

    import HomePage from './views/HomePage.vue';
    import About from './views/About.vue';
    import Work from './views/Work.vue';
    import Contact from './views/Contact.vue';

    const projectItems = ref(projects);

    projects.forEach((project, index) => {
        project.id = 'mod-' + (index + 1);
    });
</script>

<template>
    <HeaderNavigation/>
    <HomePage/>
    <About/>
    <Work :projects="projectItems"/>
    <Contact/>
    <ProjectModal :projects="projectItems"/>
</template>

<style lang="scss">

    .t-view {
        position: relative;
        min-height: 100vh;
        height: 100%;
    }
    
    .t-brain {
        img {
            @include breakpoint(md) {
                animation: float 1.25s ease-in-out infinite alternate;
            }
        }
    }

    .t-icon-txt {
        background-color: $primary;
    }

    .t-icons a:hover>img {
        transform: scale(1.25);
    }

    .t-title {
        font-size: clamp(toRem(67.5), 13vw, toRem(150) );
        color: white;
        text-shadow: -5px 8px rgba(0, 0, 0, .8);
    }

    .t-project-title {
        color: $primary;
        font-size: 10vw;
        line-height: 1;

        @include breakpoint(xs) {
            font-size: 6vw;
        }
    }

    .t-wrapper {
        position: relative;
        width: 100%;
        height: 100%;
        z-index: 0;
        // overflow: hidden;
        padding: 20px;
    }
</style>