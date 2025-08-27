<!-- src/components/CtaCard.vue -->
<script setup lang="ts">
import { type Project } from "../data/ProjectItems";

type Props = {
    project: Project;
    /** Optional: hide Website/GitHub links if you only want the button */
    showLinks?: boolean;
};

const props = withDefaults(defineProps<Props>(), {
    showGlow: true,
    showLinks: true,
});

const emit = defineEmits<{
    (e: "view-more", id?: string): void;
}>();
</script>

<template>
    <article class="t-card">
        <div class="t-card__backdrop" aria-hidden="true" />

        <header class="t-card__header">
            <div class="t-card__icon-wrapper">
                <img class="t-card__icon" :src="project.img" :alt="project.alt || (project.title + ' icon')"
                    loading="lazy" decoding="async" />
            </div>
        </header>

        <div class="t-card__body text-center">
            <h2 class="t-card__headline font-black">
                {{ project.title.toUpperCase() }}
            </h2>

            <p class="t-card__desc">
                {{ project.about.split(" ").splice(0, 15).join(" ") }} …
            </p>

            <div class="t-card__actions">
                <button class="t-card__view-all-btn" type="button" @click="emit('view-more', project.id)">
                    View More
                </button>

                <template v-if="props.showLinks">
                    <a v-if="project.web" class="t-card__link" :href="project.web" target="_blank"
                        rel="noopener noreferrer">
                        Website
                    </a>

                    <a v-if="project.github" class="t-card__link t-card__link--ghost" :href="project.github"
                        target="_blank" rel="noopener noreferrer">
                        GitHub
                    </a>
                </template>
            </div>
        </div>
    </article>
</template>

<style lang="scss" scoped>
/* Self-contained styles — no external SCSS vars */

/* Card wrapper */
.t-card {
    /* theming hooks */
    --accent: #{$primary};
    --accent2: #{$secondary};
    --glow-opacity: .75;

    position: relative;
    display: flex;
    flex-direction: column;
    border-radius: 32px;
    padding: clamp(18px, 3.5vw, 26px);
    min-height: 350px;
    height: 100%;
    /* stretch to slide height */
    width: 100%;
    box-sizing: border-box;

    background:
        linear-gradient(180deg, rgba(255, 255, 255, 0.04), rgba(255, 255, 255, 0) 60%),
        #0e0e11;
    color: #fff;
    border: 1px solid rgba(255, 255, 255, 0.08);
    box-shadow: 0 10px 28px rgba(0, 0, 0, 0.45);
    overflow: hidden;
    isolation: isolate;

    transition: transform 0.2s ease;
}

.t-card:active {
    transform: translateY(1px);
}

/* Radial glow */
.t-card__backdrop {
    position: absolute;
    inset: -20%;
    z-index: 0;
    opacity: var(--glow-opacity);
    background:
        radial-gradient(60% 60% at 18% 12%, color-mix(in oklab, var(--accent) 92%, black 8%) 0%, transparent 70%),
        radial-gradient(50% 50% at 85% 20%, color-mix(in oklab, var(--accent2) 88%, black 12%) 0%, transparent 65%);
    mask-image: radial-gradient(85% 85% at 50% 45%, black 60%, transparent 100%);
    pointer-events: none;
    border-radius: inherit;
}

/* Header / icon */
.t-card__header {
    display: grid;
    place-items: center;
    margin-bottom: clamp(10px, 2.2vw, 14px);
    z-index: 1;
}

.t-card__icon-wrapper {
    background: linear-gradient(180deg, #111, #0a0a0a);
    border-radius: 16px;
    aspect-ratio: 1 / 1;
    width: clamp(64px, 10vw, 92px);
    display: grid;
    place-items: center;
    border: 1px solid rgba(255, 255, 255, 0.06);
    box-shadow: 0 8px 20px rgba(0, 0, 0, 0.35);
}

.t-card__icon {
    width: 70%;
    height: 70%;
    object-fit: contain;
    filter: drop-shadow(0 6px 12px rgba(0, 0, 0, 0.35));
}

/* Body */
.t-card__body {
    position: relative;
    z-index: 1;
    margin-top: 4px;
    display: flex;
    flex-direction: column;
    height: 100%;
}

.t-card__headline {
    font-size: clamp(1.375rem, 6vw, 1.75rem);
    line-height: 1.15;
    margin: 0 0 10px 0;
    letter-spacing: -0.015em;
    text-shadow:
        0 0 0.01px color-mix(in oklab, var(--accent) 40%, white 60%),
        0 10px 28px rgba(0, 0, 0, 0.45);
}

.t-card__desc {
    font-size: clamp(0.875rem, 2.2vw, 1rem);
    line-height: 1.6;
    color: rgba(255, 255, 255, 0.9);
    margin: 0 0 clamp(14px, 2.8vw, 18px) 0;
    max-width: 60ch;

    /* clamp lines to help equalize heights */
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
    overflow: hidden;
}

/* Actions */
.t-card__actions {
    margin-top: auto;
    /* push actions to bottom for aligned bottoms */
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 10px;
}

.t-card__view-all-btn {
    --accent2: var(--accent);
    
    background: linear-gradient(135deg, var(--accent), var(--accent2));
    color: #fff;
    font-weight: 800;
    border: 1px solid color-mix(in oklab, var(--accent) 35%, white 65%);
    border-radius: 999px;
    padding: 10px 22px;
    cursor: pointer;
    transition: transform 120ms ease, box-shadow 120ms ease;
    box-shadow: 0 8px 18px rgba(0, 0, 0, 0.35);
}

.t-card__view-all-btn:hover,
.t-card__view-all-btn:focus-visible {
    transform: translateY(-1px);
}

.t-card__link {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    border-radius: 999px;
    padding: 10px 18px;
    font-weight: 700;
    text-decoration: none;
    border: 1px solid rgba(255, 255, 255, 0.18);
    color: color-mix(in oklab, white 92%, var(--accent) 8%);
    background: rgba(255, 255, 255, 0.02);
    backdrop-filter: blur(2px);
    transition: transform 120ms ease;
}

.t-card__link:hover,
.t-card__link:focus-visible {
    transform: translateY(-1px);
}

.t-card__link--ghost {
    opacity: 0.9;
}
</style>
