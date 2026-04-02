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

const cardAccent = computed(() => props.project.accent ?? "var(--clr-primary)");
const cardAccent2 = computed(() => props.project.accent2 ?? "var(--clr-secondary)");

const openModal = async (project: Project) => {
    projectStore.updateActiveProject(project);
    await nextTick();
};

const shortDesc = computed(() =>
    props.project.about.split(" ").slice(0, 18).join(" ") + "…"
);

const topTools = computed(() =>
    props.project.tools.split(",").slice(0, 3).map(t => t.trim())
);
</script>

<template>
    <Motion tag="article" class="t-card" :style="{ '--accent': cardAccent, '--accent2': cardAccent2 }"
        :initial="{ opacity: 0, y: 32 }" :while-in-view="{ opacity: 1, y: 0 }" :viewport="{ once: true, amount: 0.15 }"
        :transition="{ duration: 0.45, delay: index * 0.08, ease: [0.22, 1, 0.36, 1] }">
        <!-- Gradient accent top band -->
        <div class="t-card__accent-bar" aria-hidden="true"></div>

        <!-- Ambient backdrop glow -->
        <div class="t-card__backdrop" aria-hidden="true"></div>

        <!-- Glimmer sweep — fires on hover via CSS -->
        <div class="t-card__glimmer" aria-hidden="true"></div>

        <header class="t-card__header">
            <div class="t-card__icon-wrapper">
                <!-- <span class="t-card__icon-burst" aria-hidden="true"></span> -->
                <img class="t-card__icon" :src="project.img" :alt="project.alt || `${project.title} icon`"
                    loading="lazy" decoding="async" />
            </div>
        </header>

        <div class="t-card__body text-center">
            <div class="t-card__label" aria-hidden="true">
                <span class="t-card__label-super">{{ project.for }}</span>
                <h3 class="t-card__label-title">{{ project.title.toUpperCase() }}</h3>
            </div>

            <!-- Tool chips -->
            <div class="t-card__tools">
                <span v-for="tool in topTools" :key="tool" class="t-card__chip">
                    {{ tool}}
                </span>
            </div>

            <p class="t-card__desc"> {{ shortDesc }} </p>

            <div class="t-card__actions">
                <button class="t-card__view-btn" type="button" @click="openModal(project)">
                    View More
                </button>

                <template v-if="props.showLinks">

                    <a v-if="project.web"
                    class="t-card__link"
                    :href="project.web"
                    target="_blank"
                    rel="noopener noreferrer"
                    >
                    Website
                    </a>

                    <a v-if="project.github"
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

/* ─────────────────────────────────────────
       Glimmer keyframe
    ───────────────────────────────────────── */
@keyframes glimmer-sweep {
    0% {
        transform: translateX(-120%) skewX(-18deg);
        opacity: 0;
    }

    35% {
        opacity: 1;
    }

    100% {
        transform: translateX(220%) skewX(-18deg);
        opacity: 0;
    }
}

@keyframes burst-spin {
    from {
        transform: rotate(0deg) scale(0.9);
        opacity: 0;
    }

    to {
        transform: rotate(120deg) scale(1.1);
        opacity: 0.45;
    }
}

/* ─────────────────────────────────────────
       Card shell — keeps original layout
    ───────────────────────────────────────── */
.t-card {
    --glow-opacity: 0.7;
    position: relative;
    display: flex;
    flex-direction: column;
    border-radius: 32px;
    padding: clamp(18px, 3.5vw, 26px);
    padding-top: calc(clamp(18px, 3.5vw, 26px) + 6px);
    min-height: 380px;
    height: 100%;
    width: 100%;
    box-sizing: border-box;
    background:
        linear-gradient(180deg, rgba(255, 255, 255, 0.04), rgba(255, 255, 255, 0) 60%),
        var(--clr-card-bg);
    color: var(--clr-card-text);
    border: 1.5px solid var(--clr-border);
    box-shadow:
        0 10px 28px var(--clr-shadow),
        0 0 0 1px color-mix(in oklab, var(--accent) 18%, transparent);
    overflow: hidden;
    isolation: isolate;
    transition: transform 0.22s ease, box-shadow 0.22s ease;
    cursor: pointer;

    &:hover {
        transform: translateY(-3px);
        box-shadow:
            0 18px 40px var(--clr-shadow),
            0 0 0 1.5px color-mix(in oklab, var(--accent) 45%, transparent),
            0 0 32px color-mix(in oklab, var(--accent) 12%, transparent);

        .t-card__glimmer::after {
            animation: glimmer-sweep 0.65s ease forwards;
        }

        .t-card__icon-burst {
            animation: burst-spin 0.55s ease forwards;
        }

        .t-card__icon-wrapper {
            box-shadow:
                0 0 0 2px var(--accent),
                0 8px 20px var(--clr-shadow);
        }
    }

    &:active {
        transform: translateY(0);
    }
}

/* ─────────────────────────────────────────
       Accent bar — gradient across both accents
    ───────────────────────────────────────── */
.t-card__accent-bar {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 4px;
    background: linear-gradient(90deg, var(--clr-accent-deep-pink), var(--clr-accent-warm));
    border-radius: 32px 32px 0 0;
    z-index: 2;
}

/* ─────────────────────────────────────────
       Backdrop ambient glow
    ───────────────────────────────────────── */
.t-card__backdrop {
    position: absolute;
    inset: -20%;
    z-index: 0;
    opacity: var(--glow-opacity);
    background:
        radial-gradient(55% 55% at 18% 10%, color-mix(in oklab, var(--clr-accent-warm) 18%, transparent) 0%, transparent 70%),
        radial-gradient(45% 45% at 82% 18%, color-mix(in oklab, var(--clr-accent-deep-pink) 14%, transparent) 0%, transparent 65%);
    mask-image: radial-gradient(85% 85% at 50% 40%, black 55%, transparent 100%);
    pointer-events: none;
    border-radius: inherit;
}

/* ─────────────────────────────────────────
       Glimmer sweep
    ───────────────────────────────────────── */
.t-card__glimmer {
    position: absolute;
    inset: 0;
    z-index: 10;
    pointer-events: none;
    border-radius: inherit;
    overflow: hidden;

    &::after {
        content: "";
        position: absolute;
        top: -40%;
        left: 0;
        width: 38%;
        height: 180%;
        background: linear-gradient(105deg,
                transparent 0%,
                color-mix(in oklab, var(--accent) 20%, white) 45%,
                color-mix(in oklab, var(--accent2) 16%, white) 55%,
                transparent 100%);
        transform: translateX(-120%) skewX(-18deg);
        opacity: 0;
    }
}

/* ─────────────────────────────────────────
       Seán-style label — top right
    ───────────────────────────────────────── */
.t-card__label {
    // position: absolute;
    // top: 4px; // sits just below the accent bar
    // right: 0;
    // padding: 10px 18px 8px;
    // display: flex;
    // flex-direction: column;
    // align-items: flex-end;
    // text-align: right;
    // z-index: 3;
}

.t-card__label-super {
    font-size: 0.58rem;
    font-weight: 700;
    letter-spacing: 0.18em;
    text-transform: uppercase;
    color: var(--clr-text-dim);
    line-height: 1;
}

.t-card__label-title {
    font-size: clamp(1rem, 2.8vw, 1.3rem);
    font-weight: 900;
    letter-spacing: -0.02em;
    line-height: 1.1;
    color: var(--clr-text);
    text-shadow: 2px 3px 0 color-mix(in oklab, var(--accent) 25%, transparent);
    margin-bottom: 10px;
}

/* ─────────────────────────────────────────
       Icon
    ───────────────────────────────────────── */
.t-card__header {
    display: grid;
    place-items: center;
    margin-top: clamp(36px, 6vw, 48px);
    margin-bottom: clamp(10px, 2vw, 14px);
    z-index: 1;
}

.t-card__icon-wrapper {
    position: relative;
    background: var(--clr-icon-panel-bg);
    border-radius: 20px;
    aspect-ratio: 1;
    width: clamp(68px, 10vw, 92px);
    display: grid;
    place-items: center;
    border: 1.5px solid var(--clr-border);
    box-shadow: 0 8px 20px var(--clr-shadow);
    transition: box-shadow 0.2s ease;
    isolation: isolate;
}

/* Conic burst ring — cartoon energy on hover */
.t-card__icon-burst {
    position: absolute;
    inset: -8px;
    border-radius: 26px;
    background: conic-gradient(from 0deg,
            var(--accent) 0deg 18deg,
            transparent 18deg 45deg,
            var(--accent2) 45deg 63deg,
            transparent 63deg 90deg,
            var(--accent) 90deg 108deg,
            transparent 108deg 135deg,
            var(--accent2) 135deg 153deg,
            transparent 153deg 180deg,
            var(--accent) 180deg 198deg,
            transparent 198deg 225deg,
            var(--accent2) 225deg 243deg,
            transparent 243deg 270deg,
            var(--accent) 270deg 288deg,
            transparent 288deg 315deg,
            var(--accent2) 315deg 333deg,
            transparent 333deg 360deg);
    opacity: 0;
    z-index: -1;
}

.t-card__icon {
    position: relative;
    z-index: 1;
    width: 68%;
    height: 68%;
    object-fit: contain;
    filter: drop-shadow(0 6px 12px rgba(0, 0, 0, 0.35));
}

/* ─────────────────────────────────────────
       Body
    ───────────────────────────────────────── */
.t-card__body {
    position: relative;
    z-index: 1;
    margin-top: 4px;
    display: flex;
    flex-direction: column;
    flex: 1;
    gap: 10px;
}

/* ─────────────────────────────────────────
       Tool chips — alternating accent colors
    ───────────────────────────────────────── */
.t-card__tools {
    display: flex;
    flex-wrap: wrap;
    gap: 6px;
    justify-content: center;
    margin-bottom: 2px;
}

.t-card__chip {
    display: inline-flex;
    align-items: center;
    border-radius: 999px;
    padding: 3px 11px;
    font-size: 0.63rem;
    font-weight: 700;
    letter-spacing: 0.1em;
    text-transform: uppercase;

    &:nth-child(odd) {
        color: var(--accent);
        background: color-mix(in oklab, var(--accent) 10%, transparent);
        border: 1.5px solid color-mix(in oklab, var(--accent) 28%, transparent);
        box-shadow: 1px 2px 0 color-mix(in oklab, var(--accent) 18%, transparent);
    }

    &:nth-child(even) {
        color: var(--accent2);
        background: color-mix(in oklab, var(--accent2) 10%, transparent);
        border: 1.5px solid color-mix(in oklab, var(--accent2) 28%, transparent);
        box-shadow: 1px 2px 0 color-mix(in oklab, var(--accent2) 18%, transparent);
    }
}

/* ─────────────────────────────────────────
       Desc
    ───────────────────────────────────────── */
.t-card__desc {
    font-size: clamp(0.875rem, 2.2vw, 1rem);
    line-height: 1.6;
    color: var(--clr-text-dim);
    margin: 0;
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
    overflow: hidden;
}

/* ─────────────────────────────────────────
       Actions
    ───────────────────────────────────────── */
.t-card__actions {
    margin-top: auto;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 10px;
    padding-top: 4px;
}

.t-card__view-btn {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    background: linear-gradient(110deg, var(--accent), var(--accent2));
    color: var(--clr-header-text);
    font-weight: 800;
    font-size: 0.8rem;
    letter-spacing: 0.06em;
    text-transform: uppercase;
    border: none;
    border-radius: 999px;
    padding: 10px 22px;
    cursor: pointer;
    box-shadow:
        3px 3px 0 color-mix(in oklab, var(--accent) 45%, black),
        0 6px 16px color-mix(in oklab, var(--accent) 25%, transparent);
    transition: transform 0.15s ease, box-shadow 0.15s ease, filter 0.15s ease;

    &:hover,
    &:focus-visible {
        transform: translate(-1px, -2px);
        box-shadow:
            4px 5px 0 color-mix(in oklab, var(--accent) 45%, black),
            0 10px 24px color-mix(in oklab, var(--accent) 30%, transparent);
        filter: brightness(1.08);
    }

    &:active {
        transform: translate(1px, 1px);
        box-shadow: 1px 1px 0 color-mix(in oklab, var(--accent) 45%, black);
    }

    &:focus-visible {
        outline: 2px solid var(--clr-primary);
        outline-offset: 3px;
    }
}

.t-card__link {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    border-radius: 999px;
    padding: 10px 18px;
    font-size: 0.78rem;
    font-weight: 700;
    letter-spacing: 0.04em;
    text-decoration: none;
    border: 1.5px solid var(--clr-border);
    color: var(--clr-text-dim);
    background: transparent;
    box-shadow: 2px 2px 0 var(--clr-border);
    transition: transform 0.15s ease, box-shadow 0.15s ease, color 0.15s ease, border-color 0.15s ease;

    &:hover,
    &:focus-visible {
        transform: translate(-1px, -1px);
        color: var(--accent);
        border-color: color-mix(in oklab, var(--accent) 40%, transparent);
        box-shadow: 3px 3px 0 color-mix(in oklab, var(--accent) 30%, transparent);
    }

    &:active {
        transform: translate(1px, 1px);
        box-shadow: none;
    }

    &--ghost {
        opacity: 0.85;
    }
}
</style>