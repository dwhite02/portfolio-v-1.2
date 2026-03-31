<script setup lang="ts">
type Size = "lg" | "md" | "sm";

interface Skill {
    label: string;
    size: Size;
    top: string;
    left: string;
    delay: string;
    accent: "primary" | "secondary";
}

const skills: Skill[] = [
    { label: "Vue",        size: "lg", top: "8%",  left: "12%", delay: "0s",    accent: "primary"   },
    { label: "TypeScript", size: "lg", top: "52%", left: "6%",  delay: "0.6s",  accent: "secondary" },
    { label: "React",      size: "md", top: "18%", left: "68%", delay: "1.1s",  accent: "primary"   },
    { label: "Astro",      size: "md", top: "74%", left: "28%", delay: "0.3s",  accent: "secondary" },
    { label: "SCSS",       size: "sm", top: "62%", left: "64%", delay: "0.85s", accent: "primary"   },
    { label: "Tailwind",   size: "sm", top: "36%", left: "46%", delay: "1.4s",  accent: "secondary" },
    { label: "Figma",      size: "sm", top: "82%", left: "76%", delay: "0.5s",  accent: "primary"   },
    { label: "Git",        size: "sm", top: "6%",  left: "50%", delay: "1.7s",  accent: "secondary" },
];
</script>

<template>
    <div class="t-skill-map" aria-label="Skills and technologies">
        <!-- Floating scatter layout (md+) -->
        <div class="t-skill-map__scatter" aria-hidden="true">
            <span
                v-for="skill in skills"
                :key="skill.label"
                :class="['t-skill-bubble', `t-skill-bubble--${skill.size}`, `t-skill-bubble--${skill.accent}`]"
                :style="{ top: skill.top, left: skill.left, animationDelay: skill.delay }"
            >
                {{ skill.label }}
            </span>
        </div>

        <!-- Mobile flex-wrap fallback (below md) -->
        <div class="t-skill-map__mobile" aria-hidden="true">
            <span
                v-for="skill in skills"
                :key="`mob-${skill.label}`"
                :class="['t-skill-bubble', `t-skill-bubble--sm`, `t-skill-bubble--${skill.accent}`]"
                style="position: static;"
            >
                {{ skill.label }}
            </span>
        </div>

        <!-- Accessible flat list for screen readers -->
        <ul class="t-skill-map__list">
            <li v-for="skill in skills" :key="`sr-${skill.label}`">{{ skill.label }}</li>
        </ul>
    </div>
</template>

<style lang="scss" scoped>
    @use "../../scss/abstracts" as *;

    @keyframes skill-float {
        0%   { transform: translateY(0px); }
        50%  { transform: translateY(-10px); }
        100% { transform: translateY(0px); }
    }

    .t-skill-map {
        position: relative;
        width: 100%;

        &__list {
            position: absolute;
            width: 1px;
            height: 1px;
            overflow: hidden;
            clip: rect(0, 0, 0, 0);
            white-space: nowrap;
            border: 0;
        }
    }

    .t-skill-map__scatter {
        position: relative;
        width: 100%;
        height: clamp(300px, 45vw, 460px);

        @include breakpoint(md, max) {
            display: none;
        }
    }

    .t-skill-bubble {
        position: absolute;
        display: inline-flex;
        align-items: center;
        justify-content: center;
        border-radius: 999px;
        font-weight: 700;
        letter-spacing: 0.03em;
        white-space: nowrap;
        background: rgba(10, 12, 20, 0.85);
        backdrop-filter: blur(4px);
        cursor: default;
        transition: transform 0.25s ease, box-shadow 0.25s ease;
        animation: skill-float 4s ease-in-out infinite;

        &--lg {
            font-size: clamp(0.9rem, 1.4vw, 1.15rem);
            padding: 14px 28px;
        }

        &--md {
            font-size: clamp(0.8rem, 1.1vw, 1rem);
            padding: 11px 22px;
        }

        &--sm {
            font-size: clamp(0.72rem, 0.9vw, 0.88rem);
            padding: 9px 18px;
        }

        &--primary {
            color: $primary;
            border: 1.5px solid rgba($primary, 0.5);
            box-shadow: 0 4px 20px rgba($primary, 0.12);

            &:hover {
                transform: scale(1.1) translateY(-4px) !important;
                box-shadow: 0 8px 28px rgba($primary, 0.35);
            }
        }

        &--secondary {
            color: $secondary;
            border: 1.5px solid rgba($secondary, 0.5);
            box-shadow: 0 4px 20px rgba($secondary, 0.12);

            &:hover {
                transform: scale(1.1) translateY(-4px) !important;
                box-shadow: 0 8px 28px rgba($secondary, 0.35);
            }
        }
    }

    .t-skill-map__mobile {
        display: flex;
        flex-wrap: wrap;
        gap: 10px;
        justify-content: center;
        padding-block: 1rem;

        @include breakpoint(md) {
            display: none;
        }
    }

    @media (prefers-reduced-motion: reduce) {
        .t-skill-bubble {
            animation: none;
        }
    }
</style>
