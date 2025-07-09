<script setup lang="ts">
    import { ref, onMounted } from 'vue'

    // Reactive state for current section
    const currentSection = ref<string>(window.location.hash || '#home');

    interface NavLink {
        href: string,
        label: string 
    }

    // Section links
    const links: NavLink[]  = [
        { href: '#home', label: 'Home' },
        { href: '#about', label: 'About' },
        { href: '#work', label: 'Work' },
        { href: '#contact', label: 'Contact' },
    ]

    const scroll = (hash: string): void => {
        const target = document.querySelector(hash) as HTMLElement | null
        if (!target) return

        const isHorizontal: boolean = document.body.scrollWidth > document.body.clientWidth
        const scrollContainer: (Window & typeof globalThis) | HTMLElement = isHorizontal ? document.body : window;

        const scrollOptions: ScrollToOptions = {
            behavior: 'smooth',
            [isHorizontal ? 'left' : 'top']: isHorizontal ? target.offsetLeft : target.offsetTop,
        }

        scrollContainer.scrollTo(scrollOptions)
        history.pushState(null, '', hash)
        currentSection.value = hash

        // Optional: Move focus to target for accessibility
        // if (!target.hasAttribute('tabindex')) target.setAttribute('tabindex', '-1')
        // target.focus({ preventScroll: true })
    }

    onMounted(() => {
        // Set the current section on initial load (e.g., #about)
        currentSection.value = window.location.hash || '#home';
        scroll(currentSection.value)
    })

    window.onhashchange = function () {
        currentSection.value = window.location.hash
    }
</script>

<template>
    <header class="t-header p-4">
        <div class="t-header__container flex justify-center items-center">
            <nav class="t-nav-items" aria-label="Main navigation">
                <ul class="flex gap-x-4">
                    <li
                        v-for="link in links"
                        :key="link.href"
                        :class="['t-nav', { current: currentSection === link.href }]"
                    >
                        <a
                            @click.prevent="scroll(link.href)"
                            class="font-bold"
                            :href="link.href"
                            :aria-current="currentSection === link.href ? 'page' : undefined"
                        >
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

        @include breakpoint(md) {
            background-color: unset;
            box-shadow: unset;
            top: 10px;
        }

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
            padding: 10px 30px;
            border: 1px solid white;
            background: rgba($color: #000, $alpha: .795);
            box-shadow: 0 8px 10px rgba(0, 0, 0, .25);

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
 
            @include breakpoint(md) {
                background: $secondary;
            }
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
</style>