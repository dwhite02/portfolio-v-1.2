<script setup lang="ts">
import { ref, computed, onMounted } from "vue";
import { Motion } from "motion-v";

type Category = "All" | "Frontend" | "Styling" | "Testing" | "Performance" | "Backend" | "Design";
type Prominence = "hero" | "primary" | "secondary";

interface Skill {
  label: string;
  category: Exclude<Category, "All">;
  prominence: Prominence;
  /** Polar coords relative to the center orb (degrees from top, percent radius 0–1) */
  angle: number;
  radius: number;
}

const CATEGORIES: Category[] = ["All", "Frontend", "Styling", "Testing", "Performance", "Backend", "Design"];

const skills: Skill[] = [
  // Frontend
  { label: "TypeScript", category: "Frontend",    prominence: "hero",      angle: 330, radius: 0.72 },
  { label: "React",      category: "Frontend",    prominence: "hero",      angle: 15,  radius: 0.78 },
  { label: "Next.js",    category: "Frontend",    prominence: "primary",   angle: 45,  radius: 0.62 },
  { label: "Astro",      category: "Frontend",    prominence: "primary",   angle: 355, radius: 0.55 },
  { label: "JavaScript", category: "Frontend",    prominence: "secondary", angle: 30,  radius: 0.88 },

  // Styling
  { label: "SCSS/CSS",   category: "Styling",     prominence: "hero",      angle: 135, radius: 0.70 },
  { label: "Tailwind",   category: "Styling",     prominence: "primary",   angle: 115, radius: 0.58 },
  { label: "HTML5",      category: "Styling",     prominence: "secondary", angle: 155, radius: 0.85 },

  // Testing
  { label: "Playwright", category: "Testing",     prominence: "primary",   angle: 200, radius: 0.65 },
  { label: "Jest",       category: "Testing",     prominence: "secondary", angle: 220, radius: 0.80 },

  // Performance
  { label: "Core Web Vitals", category: "Performance", prominence: "primary",   angle: 90,  radius: 0.72 },
  { label: "WCAG 2.1",        category: "Performance", prominence: "primary",   angle: 75,  radius: 0.58 },
  { label: "Axe DevTools",    category: "Performance", prominence: "secondary", angle: 100, radius: 0.88 },
  { label: "Lighthouse",      category: "Performance", prominence: "secondary", angle: 60,  radius: 0.82 },
  { label: "ARIA",            category: "Performance", prominence: "secondary", angle: 85,  radius: 0.95 },

  // Backend
  { label: "Node.js",      category: "Backend", prominence: "hero",      angle: 255, radius: 0.68 },
  { label: "ASP.NET Core", category: "Backend", prominence: "primary",   angle: 240, radius: 0.58 },
  { label: "REST APIs",    category: "Backend", prominence: "primary",   angle: 270, radius: 0.80 },
  { label: "Docker",       category: "Backend", prominence: "secondary", angle: 285, radius: 0.62 },
  { label: "WordPress",    category: "Backend", prominence: "secondary", angle: 225, radius: 0.88 },
  { label: "PHP",          category: "Backend", prominence: "secondary", angle: 300, radius: 0.90 },

  // Design
  { label: "Figma",           category: "Design", prominence: "hero",      angle: 175, radius: 0.68 },
  { label: "Design Systems",  category: "Design", prominence: "primary",   angle: 190, radius: 0.55 },
  { label: "Storybook",       category: "Design", prominence: "secondary", angle: 165, radius: 0.82 },
  { label: "GitHub Actions",  category: "Design", prominence: "secondary", angle: 210, radius: 0.78 },
];

const activeCategory = ref<Category>("All");

const filteredSkills = computed(() =>
  activeCategory.value === "All"
    ? skills
    : skills.filter((s) => s.category === activeCategory.value)
);

/** Convert polar (angle in deg from top, radius 0-1) → { x%, y% } for the scatter field */
function toXY(angle: number, radius: number, fieldW: number, fieldH: number) {
  const rad = ((angle - 90) * Math.PI) / 180;
  const cx = fieldW / 2;
  const cy = fieldH / 2;
  const rx = (fieldW / 2) * 0.88 * radius;
  const ry = (fieldH / 2) * 0.88 * radius;
  return {
    x: cx + rx * Math.cos(rad),
    y: cy + ry * Math.sin(rad),
  };
}

const FIELD_W = 700;
const FIELD_H = 480;

function bubbleStyle(skill: Skill) {
  const { x, y } = toXY(skill.angle, skill.radius, FIELD_W, FIELD_H);
  return {
    left: `${(x / FIELD_W) * 100}%`,
    top:  `${(y / FIELD_H) * 100}%`,
  };
}

function floatDelay(i: number) {
  return `${(i * 0.37) % 3.5}s`;
}

function floatDuration(skill: Skill) {
  const base = skill.prominence === "hero" ? 5.5 : skill.prominence === "primary" ? 4.8 : 4.2;
  return `${base}s`;
}

const prefersReducedMotion = ref(false);
onMounted(() => {
  prefersReducedMotion.value = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
});

function setCategory(cat: Category) {
  activeCategory.value = cat;
}

/** motion-v initial/animate/exit for each bubble */
function bubbleMotion(i: number) {
  return {
    initial: { opacity: 0, scale: 0.6 },
    animate: { opacity: 1, scale: 1 },
    exit:    { opacity: 0, scale: 0.6 },
    transition: {
      duration: prefersReducedMotion.value ? 0 : 0.35,
      delay:    prefersReducedMotion.value ? 0 : i * 0.045,
      easing:   [0.34, 1.56, 0.64, 1],
    },
  };
}
</script>

<template>
  <div class="skill-map" role="region" aria-label="Skills and technologies">

    <!-- ── FILTER TABS ───────────────────────────────────────────── -->
    <div class="skill-map__filters" role="tablist" aria-label="Filter skills by category">
      <button
        v-for="cat in CATEGORIES"
        :key="cat"
        role="tab"
        :aria-selected="activeCategory === cat"
        :class="['filter-btn', { 'filter-btn--active': activeCategory === cat }]"
        @click="setCategory(cat)"
      >
        {{ cat }}
      </button>
    </div>

    <!-- ── DESKTOP SCATTER FIELD (md+) ───────────────────────────── -->
    <div class="skill-map__field" aria-hidden="true">

      <!-- Ambient rings -->
      <span class="field-ring field-ring--1" />
      <span class="field-ring field-ring--2" />
      <span class="field-ring field-ring--3" />

      <!-- Center orb -->
      <div class="field-orb">
        <span class="field-orb__label">{{ activeCategory }}</span>
        <span class="field-orb__glow" />
      </div>

      <!-- Skill bubbles -->
      <TransitionGroup name="bubble">
        <Motion
          v-for="(skill, i) in filteredSkills"
          :key="skill.label"
          tag="span"
          v-bind="bubbleMotion(i)"
          :class="[
            'skill-bubble',
            `skill-bubble--${skill.prominence}`,
            `skill-bubble--cat-${skill.category.toLowerCase()}`,
          ]"
          :style="{
            ...bubbleStyle(skill),
            animationDelay: prefersReducedMotion ? '0s' : floatDelay(i),
            animationDuration: prefersReducedMotion ? '0s' : floatDuration(skill),
          }"
        >
          {{ skill.label }}
        </Motion>
      </TransitionGroup>
    </div>

    <!-- ── MOBILE CHIP LIST (below md) ───────────────────────────── -->
    <div class="skill-map__mobile" aria-hidden="true">
      <span
        v-for="skill in filteredSkills"
        :key="`mob-${skill.label}`"
        :class="[
          'skill-chip',
          `skill-chip--${skill.prominence}`,
          `skill-chip--cat-${skill.category.toLowerCase()}`,
        ]"
      >
        {{ skill.label }}
      </span>
    </div>

    <!-- ── SR-ONLY LIST ──────────────────────────────────────────── -->
    <ul class="skill-map__sr-list">
      <li v-for="skill in skills" :key="`sr-${skill.label}`">
        {{ skill.label }} ({{ skill.category }})
      </li>
    </ul>
  </div>
</template>

<style lang="scss" scoped>
@use "../../scss/abstracts" as *;

/* ── Tokens ──────────────────────────────────────────────────────── */
$orb-size: clamp(100px, 14vw, 160px);
$ring-color-primary:   rgba($primary, 0.18);
$ring-color-secondary: rgba($secondary, 0.12);

/* ── Float animation ─────────────────────────────────────────────── */
@keyframes skillFloat {
  0%   { transform: translate(-50%, -50%) translateY(0px); }
  50%  { transform: translate(-50%, -50%) translateY(-9px); }
  100% { transform: translate(-50%, -50%) translateY(0px); }
}

/* ── Root ────────────────────────────────────────────────────────── */
.skill-map {
  position: relative;
  width: 100%;
  user-select: none;

  &__sr-list {
    position: absolute;
    width: 1px;
    height: 1px;
    overflow: hidden;
    clip: rect(0, 0, 0, 0);
    white-space: nowrap;
    border: 0;
  }
}

/* ── Filter tabs ─────────────────────────────────────────────────── */
.skill-map__filters {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  justify-content: center;
  margin-bottom: clamp(1.5rem, 4vw, 2.5rem);
}

.filter-btn {
  padding: 6px 16px;
  border-radius: 999px;
  border: 1.5px solid rgba(white, 0.18);
  background: rgba(white, 0.04);
  color: rgba(white, 0.55);
  font-size: clamp(0.7rem, 1vw, 0.82rem);
  font-weight: 600;
  letter-spacing: 0.06em;
  cursor: pointer;
  transition: color 0.2s ease, background 0.2s ease, border-color 0.2s ease, box-shadow 0.2s ease;

  &:focus-visible {
    outline: 2px solid $primary;
    outline-offset: 3px;
  }

  &--active {
    color: $primary;
    border-color: rgba($primary, 0.6);
    background: rgba($primary, 0.1);
    box-shadow: 0 0 14px rgba($primary, 0.2);
  }

  &:hover:not(&--active) {
    color: rgba(white, 0.85);
    border-color: rgba(white, 0.35);
    background: rgba(white, 0.08);
  }
}

/* ── Desktop scatter field ───────────────────────────────────────── */
.skill-map__field {
  position: relative;
  width: 100%;
  height: clamp(340px, 50vw, 500px);

  /* Hide on small screens */
  @include breakpoint(md, max) {
    display: none;
  }
}

/* Ambient rings */
.field-ring {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  border-radius: 50%;
  pointer-events: none;

  &--1 {
    width: calc($orb-size * 1.9);
    height: calc($orb-size * 1.9);
    border: 1px solid $ring-color-primary;
  }

  &--2 {
    width: calc($orb-size * 3.4);
    height: calc($orb-size * 3.4);
    border: 1px solid $ring-color-secondary;
  }

  &--3 {
    width: calc($orb-size * 5.0);
    height: calc($orb-size * 5.0);
    border: 1px dashed rgba(white, 0.05);
  }
}

/* Center orb */
.field-orb {
  position: absolute;
  top: 50%;
  left: 50%;
  width: $orb-size;
  height: $orb-size;
  transform: translate(-50%, -50%);
  border-radius: 50%;
  background: radial-gradient(circle at 40% 35%, rgba($primary, 0.22), rgba($secondary, 0.14) 60%, transparent 80%);
  border: 1.5px solid rgba($primary, 0.4);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 2;

  &__label {
    color: white;
    font-size: clamp(0.7rem, 1.1vw, 0.95rem);
    font-weight: 700;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    text-align: center;
    line-height: 1.2;
    z-index: 1;
  }

  &__glow {
    position: absolute;
    inset: -20px;
    border-radius: 50%;
    background: radial-gradient(circle, rgba($primary, 0.1) 0%, transparent 70%);
    pointer-events: none;
  }
}

/* ── Skill bubbles (scatter, desktop) ───────────────────────────── */
.skill-bubble {
  position: absolute;
  transform: translate(-50%, -50%);
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-radius: 999px;
  font-weight: 700;
  letter-spacing: 0.04em;
  white-space: nowrap;
  background: rgba(10, 12, 20, 0.82);
  backdrop-filter: blur(6px);
  cursor: default;
  z-index: 1;
  animation: skillFloat linear infinite;
  transition: box-shadow 0.25s ease;
  will-change: transform;

  /* Prominence tiers */
  &--hero {
    font-size: clamp(0.88rem, 1.3vw, 1.05rem);
    padding: 12px 24px;
    color: $primary;
    border: 1.5px solid rgba($primary, 0.55);
    box-shadow: 0 4px 22px rgba($primary, 0.14), inset 0 1px 0 rgba(white, 0.06);

    &:hover {
      box-shadow: 0 6px 30px rgba($primary, 0.38);
    }
  }

  &--primary {
    font-size: clamp(0.78rem, 1.1vw, 0.92rem);
    padding: 10px 20px;
    color: rgba($primary, 0.85);
    border: 1.5px solid rgba($primary, 0.32);
    box-shadow: 0 4px 14px rgba($primary, 0.08);

    &:hover {
      box-shadow: 0 6px 22px rgba($primary, 0.25);
    }
  }

  &--secondary {
    font-size: clamp(0.68rem, 0.9vw, 0.82rem);
    padding: 8px 16px;
    color: rgba($secondary, 0.75);
    border: 1.5px solid rgba($secondary, 0.28);
    box-shadow: 0 2px 10px rgba($secondary, 0.06);
    opacity: 0.85;

    &:hover {
      box-shadow: 0 4px 18px rgba($secondary, 0.22);
      opacity: 1;
    }
  }
}

/* ── Bubble enter/leave transitions (TransitionGroup) ──────────── */
.bubble-enter-active,
.bubble-leave-active {
  transition: opacity 0.3s ease, transform 0.3s ease;
}

.bubble-enter-from,
.bubble-leave-to {
  opacity: 0;
  transform: translate(-50%, -50%) scale(0.65);
}

/* ── Mobile chip row ─────────────────────────────────────────────── */
.skill-map__mobile {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  justify-content: center;
  padding-block: 0.5rem;

  @include breakpoint(md) {
    display: none;
  }
}

.skill-chip {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-radius: 999px;
  font-weight: 600;
  letter-spacing: 0.04em;
  white-space: nowrap;
  font-size: clamp(0.7rem, 2.2vw, 0.82rem);
  padding: 7px 14px;
  background: rgba(10, 12, 20, 0.75);
  border: 1.5px solid rgba($primary, 0.3);
  color: rgba($primary, 0.85);

  &--secondary {
    border-color: rgba($secondary, 0.3);
    color: rgba($secondary, 0.8);
  }
}

/* ── Reduced motion ──────────────────────────────────────────────── */
@media (prefers-reduced-motion: reduce) {
  .skill-bubble {
    animation: none !important;
  }

  .filter-btn,
  .skill-chip {
    transition: none;
  }

  .bubble-enter-active,
  .bubble-leave-active {
    transition: none;
  }
}
</style>
