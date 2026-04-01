<script setup lang="ts">
import { computed, nextTick } from "vue";
import { Motion } from "motion-v";
import type { Project } from "@/types";
import { projectStore } from "@/data/projectStore";

type Props = {
    project: Project;
    showLinks?: boolean;
    index?: number;
};

const props = withDefaults(defineProps<Props>(), {
    showLinks: true,
    index: 0,
});

const cardAccent = computed(() => props.project.accent ?? "#F59E0B");

const openModal = async (project: Project) => {
    projectStore.updateActiveProject(project);
    await nextTick();
};
</script>

<template>
    <Motion
        tag="article"
        class="t-card"
        :style="{ '--accent': cardAccent, '--accent2': 'var(--clr-bg)' }"
        :initial="{ opacity: 0, y: 32 }"
        :while-in-view="{ opacity: 1, y: 0 }"
        :viewport="{ once: true, amount: 0.15 }"
        :transition="{ duration: 0.45, delay: index * 0.08, ease: [0.22, 1, 0.36, 1] }"
    >
        <!-- Bold accent top band — character-world ink stroke treatment -->
        <div class="t-card__accent-bar" aria-hidden="true"></div>
        <div class="t-card__backdrop" aria-hidden="true"></div>

        <header class="t-card__header">
            <div class="t-card__icon-wrapper">
                <img
                    class="t-card__icon"
                    :src="project.img"
                    :alt="project.alt || `${project.title} icon`"
                    loading="lazy"
                    decoding="async"
                />
            </div>
        </header>

        <div class="t-card__body text-center">
            <h2 class="t-card__headline font-black">
                {{ project.title.toUpperCase() }}
            </h2>

            <p class="t-card__desc">
                {{ project.about.split(" ").slice(0, 15).join(" ") }} ...
            </p>

            <div class="t-card__actions">
                <button class="t-card__view-btn" type="button" @click="openModal(project)">
                    View More
                </button>

                <template v-if="props.showLinks">
                    <a v-if="project.web" class="t-card__link" :href="project.web" target="_blank" rel="noopener noreferrer">
                        Website
                    </a>

                    <a
                        v-if="project.github"
                        class="t-card__link t-card__link--ghost"
                        :href="project.github"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        GitHub
                    </a>
                </template>
            </div>
        </div>
    </Motion>
</template>

<style lang="scss" scoped>
    @use "../../scss/abstracts" as *;

    .t-card {
        --glow-opacity: 0.75;
        position: relative;
        display: flex;
        flex-direction: column;
        border-radius: 32px;
        padding: clamp(18px, 3.5vw, 26px);
        padding-top: calc(clamp(18px, 3.5vw, 26px) + 6px);
        min-height: 350px;
        height: 100%;
        width: 100%;
        box-sizing: border-box;
        background:
            linear-gradient(180deg, rgba(255, 255, 255, 0.04), rgba(255, 255, 255, 0) 60%),
            var(--clr-card-bg);
        color: var(--clr-card-text);
        border: 1px solid var(--clr-card-border);
        box-shadow:
            0 10px 28px var(--clr-shadow),
            0 0 0 1px color-mix(in oklab, var(--accent) 20%, transparent);
        overflow: hidden;
        isolation: isolate;
        transition: transform 0.2s ease, box-shadow 0.2s ease;

        &:hover {
            box-shadow:
                0 14px 36px rgba(0, 0, 0, 0.5),
                0 0 0 1px color-mix(in oklab, var(--accent) 35%, transparent);
        }

        &:active {
            transform: translateY(1px);
        }
    }

    // ── Bold accent top band (ink-stroke treatment) ───────────────────────────
    .t-card__accent-bar {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        height: 5px;
        background: var(--accent);
        border-radius: 32px 32px 0 0;
        z-index: 2;
    }

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

    .t-card__header {
        display: grid;
        place-items: center;
        margin-bottom: clamp(10px, 2.2vw, 14px);
        z-index: 1;
    }

    .t-card__icon-wrapper {
        background: var(--clr-icon-panel-bg);
        border-radius: 16px;
        aspect-ratio: 1 / 1;
        width: clamp(64px, 10vw, 92px);
        display: grid;
        place-items: center;
        border: 1px solid var(--clr-card-border);
        box-shadow: 0 8px 20px var(--clr-shadow-soft);
    }

    .t-card__icon {
        width: 70%;
        height: 70%;
        object-fit: contain;
        filter: drop-shadow(0 6px 12px rgba(0, 0, 0, 0.35));
    }

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
        margin: 0 0 10px;
        letter-spacing: -0.015em;
        text-shadow:
            0 0 0.01px color-mix(in oklab, var(--accent) 40%, white 60%),
            0 10px 28px rgba(0, 0, 0, 0.45);
    }

    .t-card__desc {
        font-size: clamp(0.875rem, 2.2vw, 1rem);
        line-height: 1.6;
        color: var(--clr-card-muted);
        margin: 0 0 clamp(14px, 2.8vw, 18px);
        max-width: 60ch;
        display: -webkit-box;
        -webkit-line-clamp: 3;
        -webkit-box-orient: vertical;
        overflow: hidden;
    }

    .t-card__actions {
        margin-top: auto;
        display: flex;
        flex-wrap: wrap;
        justify-content: center;
        gap: 10px;
    }

    .t-card__view-btn {
        --accent2: var(--clr-bg);
        background: linear-gradient(135deg, var(--accent), var(--accent2));
        color: var(--clr-card-text);
        font-weight: 800;
        border: 1px solid color-mix(in oklab, var(--accent) 35%, white 65%);
        border-radius: 999px;
        padding: 10px 22px;
        cursor: pointer;
        transition: transform 120ms ease, box-shadow 120ms ease, background 0.85s ease;
        box-shadow: 0 8px 18px var(--clr-shadow-soft);

        &:hover,
        &:focus-visible {
            transform: translateY(-1px);
            background: var(--clr-secondary);
        }
    }

    .t-card__link {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        border-radius: 999px;
        padding: 10px 18px;
        font-weight: 700;
        text-decoration: none;
        border: 1px solid color-mix(in oklab, var(--clr-card-text) 16%, transparent);
        color: color-mix(in oklab, var(--clr-card-text) 92%, var(--accent) 8%);
        background: var(--clr-card-chip-bg);
        backdrop-filter: blur(2px);
        transition: transform 120ms ease, background 0.35s ease;

        &:hover,
        &:focus-visible {
            transform: translateY(-1px);
            background: var(--clr-secondary);
            color: var(--clr-bg);
        }

        &--ghost {
            opacity: 0.9;
        }
    }
</style>
