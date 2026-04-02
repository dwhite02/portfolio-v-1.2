<script setup lang="ts">
import { computed, nextTick, onBeforeUnmount, onMounted, ref, watch } from "vue";
import brain from "@/assets/brain.svg";
import closeIcon from "@/assets/close.svg";
import closeSolidIcon from "@/assets/close-solid.svg";
import gitIcon from "@/assets/git.svg";
import websiteIcon from "@/assets/www.svg";
import { projectStore } from "@/data/projectStore";

const overlayRef = ref<HTMLElement | null>(null);
const contentRef = ref<HTMLElement | null>(null);
const isAnimatingOut = ref(false);
const isOpen = computed(() => !!projectStore.selectedProject || isAnimatingOut.value);

// Precompute tools split so it doesn't run on every render
const tools = computed(() =>
    projectStore.selectedProject?.tools
        ?.split(/[,/|]/g)
        .map(t => t.trim())
        .filter(Boolean) ?? []
);

let lastFocused: HTMLElement | null = null;
let closeTimeout: ReturnType<typeof setTimeout> | null = null;

function finishClose() {
    if (closeTimeout) clearTimeout(closeTimeout);
    closeTimeout = setTimeout(() => {
        projectStore.clearActiveProject();
        isAnimatingOut.value = false;
        closeTimeout = null;
    }, 250);
}

function closeModal() {
    if (!projectStore.selectedProject) return;
    isAnimatingOut.value = true;
    overlayRef.value?.classList.remove("t-modal--open");
    // Use class instead of inline style — avoids layout recalc cascade
    document.body.classList.remove("modal-open");
    lastFocused?.focus?.();
    finishClose();
}

function onKeydown(e: KeyboardEvent) {
    if (e.key === "Escape" && projectStore.selectedProject) closeModal();
}

// Trap focus inside modal
function onFocusTrap(e: KeyboardEvent) {
    if (!isOpen.value || e.key !== "Tab" || !contentRef.value) return;

    const focusable = contentRef.value.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])'
    );
    const first = focusable[0];
    const last = focusable[focusable.length - 1];

    if (e.shiftKey) {
        if (document.activeElement === first) {
            e.preventDefault();
            last?.focus();
        }
    } else {
        if (document.activeElement === last) {
            e.preventDefault();
            first?.focus();
        }
    }
}

watch(
    () => projectStore.selectedProject,
    async (project) => {
        if (project) {
            if (closeTimeout) clearTimeout(closeTimeout);
            isAnimatingOut.value = false;
            lastFocused = document.activeElement as HTMLElement;

            // Class swap instead of inline style
            document.body.classList.add("modal-open");

            await nextTick();
            overlayRef.value?.classList.remove("t-modal--open");
            // Force reflow in one read — batch it before the rAF write
            void overlayRef.value?.offsetWidth;

            requestAnimationFrame(() => {
                overlayRef.value?.classList.add("t-modal--open");
                contentRef.value?.focus();
            });
        }
    }
);

onMounted(() => {
    window.addEventListener("keydown", onKeydown);
    window.addEventListener("keydown", onFocusTrap);
});

onBeforeUnmount(() => {
    window.removeEventListener("keydown", onKeydown);
    window.removeEventListener("keydown", onFocusTrap);
    document.body.classList.remove("modal-open");
    if (closeTimeout) clearTimeout(closeTimeout);
});
</script>

<template>
    <Teleport to="body">
        <Transition name="t-modal-fade">
            <div v-if="isOpen && projectStore.selectedProject" id="pm-modal" ref="overlayRef" class="t-modal"
                role="dialog" aria-modal="true" :aria-labelledby="`project-title-${projectStore.selectedProject.id}`"
                :aria-describedby="projectStore.selectedProject.about ? 'project-desc' : undefined" tabindex="-1"
                @click.self="closeModal">
                <div ref="contentRef" class="t-modal__content" tabindex="-1">

                    <header class="t-modal__header">
                        <h2 class="t-modal__title" :id="`project-title-${projectStore.selectedProject.id}`">
                            {{ projectStore.selectedProject.title }}
                        </h2>

                        <div class="t-modal__actions">

                            <a v-if="projectStore.selectedProject.web"
                            class="t-btn t-btn--primary"
                            :href="projectStore.selectedProject.web"
                            target="_blank"
                            rel="noopener noreferrer"
                            >
                            <img :src="websiteIcon.src" alt="" aria-hidden="true" class="t-btn__icon" />
                            <span>View site</span>
                            </a>

                            <a v-if="projectStore.selectedProject.github"
                            class="t-btn t-btn--ghost"
                            :href="projectStore.selectedProject.github"
                            target="_blank"
                            rel="noopener noreferrer"
                            >
                            <img :src="gitIcon.src" alt="" aria-hidden="true" class="t-btn__icon" />
                            <span>GitHub</span>
                            </a>
                        </div>

                        <button type="button" class="t-modal__close" aria-label="Close modal" @click="closeModal">
                            <img class="icon icon--inactive" :src="closeIcon.src" alt="" aria-hidden="true" />
                            <img class="icon icon--active" :src="closeSolidIcon.src" alt="" aria-hidden="true" />
                        </button>
                    </header>

                    <section v-if="projectStore.selectedProject.for" class="t-modal__meta">
                        <span class="t-modal__label">For</span>
                        <span class="t-modal__value">{{ projectStore.selectedProject.for }}</span>
                    </section>

                    <section v-if="projectStore.selectedProject.about" class="t-modal__about">
                        <h3 class="t-modal__section-heading">About</h3>
                        <p id="project-desc" class="t-modal__text">
                            {{ projectStore.selectedProject.about }}
                        </p>
                    </section>

                    <section v-if="tools.length" class="t-modal__tools">
                        <h3 class="t-modal__section-heading">Tools</h3>
                        <div class="t-modal__chips">
                            <span v-for="tool in tools" :key="tool" class="t-chip">
                                {{ tool }}
                            </span>
                        </div>
                    </section>

                    <div class="t-brain" aria-hidden="true">
                        <img :src="brain" alt="" />
                    </div>

                </div>
            </div>
        </Transition>
    </Teleport>
</template>

<style lang="scss" scoped>
@use "../../scss/abstracts" as *;

.t-modal-fade-enter-active,
.t-modal-fade-leave-active {
    transition: opacity 0.25s ease;
}

.t-modal-fade-enter-from,
.t-modal-fade-leave-to {
    opacity: 0;
}

.t-modal {
    position: fixed;
    inset: 0;
    z-index: 1000;
    display: grid;
    place-items: center;
    overflow: hidden;
    color: var(--clr-modal-text);
    height: 0;
    width: 100%;
    background: var(--clr-overlay);
    backdrop-filter: blur(15px);
    transition: height 0.5s ease, opacity 0.3s ease;
    opacity: 0;

    &--open {
        height: 100%;
        opacity: 1;
    }
}

.t-modal__content {
    position: relative;
    width: min(900px, calc(100% - 32px));
    max-width: $container-base;
    margin-inline: auto;
    text-align: left;
    z-index: 1;
    overflow: auto;
    background: var(--clr-modal-bg);
    border: 2px solid var(--clr-card-border);
    border-radius: 20px;
    box-shadow: 0 20px 60px var(--clr-shadow);
    padding-inline: max(clamp(16px, 3vw, 32px), env(safe-area-inset-left));
    padding-block: max(clamp(16px, 3vw, 32px), env(safe-area-inset-top));
    max-height: calc(100dvh - 2 * clamp(16px, 3vw, 32px));
}

.t-modal__header {
    position: sticky;
    top: 0;
    z-index: 2;
    margin-bottom: 8px;
    padding-bottom: 8px;
    background: linear-gradient(var(--clr-modal-header), var(--clr-modal-header));
    display: grid;
    grid-template-areas:
        "title close"
        "actions actions";
    grid-template-columns: 1fr auto;
    row-gap: 10px;
    column-gap: 12px;
    align-items: center;

    @include breakpoint(sm) {
        grid-template-areas: "title actions close";
        grid-template-columns: 1fr auto auto;
        row-gap: 8px;
    }
}

.t-modal__title {
    grid-area: title;
    font-weight: 900;
    letter-spacing: 0.02em;
    font-size: clamp(20px, 5.5vw, 28px);
    line-height: 1.2;
    margin: 0;
    overflow-wrap: anywhere;
    color: var(--clr-text);

    @include breakpoint(sm) {
        font-size: clamp(24px, 3.2vw, 40px);
    }
}

.t-modal__actions {
    grid-area: actions;
    display: grid;
    grid-template-columns: 1fr;
    gap: 10px;
    margin-top: 20px;

    @include breakpoint(xs) {
        grid-template-columns: 1fr 1fr;
    }

    @include breakpoint(sm) {
        margin-top: 0;
        display: inline-flex;

        .t-btn {
            width: auto;
        }
    }
}

.t-btn {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    padding: 10px 14px;
    border-radius: 999px;
    font-weight: 700;
    font-size: 0.82rem;
    letter-spacing: 0.04em;
    text-decoration: none;
    border: 1.5px solid transparent;
    // Cartoon offset
    box-shadow: 2px 2px 0 rgba(0, 0, 0, 0.3);
    transition: transform 0.15s ease, box-shadow 0.15s ease, filter 0.15s ease;

    &:hover {
        transform: translate(-1px, -1px);
        box-shadow: 3px 3px 0 rgba(0, 0, 0, 0.3);
        filter: brightness(1.08);
    }

    &:active {
        transform: translate(1px, 1px);
        box-shadow: 0 0 0 rgba(0, 0, 0, 0.3);
    }

    &--primary {
        background: linear-gradient(110deg, var(--clr-secondary), var(--clr-primary));
        color: var(--clr-header-text);
        border-color: color-mix(in oklab, var(--clr-primary) 40%, transparent);
    }

    &--ghost {
        background: transparent;
        color: var(--clr-modal-text);
        border-color: color-mix(in oklab, var(--clr-modal-text) 18%, transparent);

        &:hover {
            background: var(--clr-surface);
        }
    }
}

.t-btn__icon {
    width: 18px;
    height: 18px;
    opacity: 0.9;
    background-color: var(--clr-bg);
}

.t-modal__close {
    grid-area: close;
    justify-self: end;
    cursor: pointer;
    background: transparent;
    border: 0;
    padding: 0;
    width: 40px;
    height: 40px;
    position: relative;
    color: var(--clr-modal-text);
    transition: transform 0.15s ease;

    &:hover {
        transform: scale(1.1);

        .icon--active {
            opacity: 1;
        }

        .icon--inactive {
            opacity: 0;
        }
    }

    &:active {
        transform: scale(0.95);
    }

    .icon--active {
        position: absolute;
        top: 0;
        left: 0;
        opacity: 0;
        transition: opacity 0.2s ease;
    }

    @include breakpoint(sm) {
        width: 48px;
        height: 48px;
    }
}

.t-modal__meta {
    display: flex;
    align-items: baseline;
    gap: 8px;
    margin: 4px 0 12px;
}

.t-modal__label,
.t-modal__section-heading {
    font-size: 11px;
    letter-spacing: 0.14em;
    color: var(--clr-text-dim);
    text-transform: uppercase;
    font-weight: 700;
    margin: 20px 0 8px;
}

.t-modal__label {
    margin: 0;
}

.t-modal__value {
    font-weight: 700;
    color: var(--clr-modal-text);
}

.t-modal__text {
    color: var(--clr-modal-text);
    line-height: 1.7;
    opacity: 0.88;
    max-width: 100ch;
}

.t-modal__chips {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
}

.t-chip {
    display: inline-flex;
    align-items: center;
    padding: 5px 12px;
    border-radius: 999px;
    font-size: 0.65rem;
    font-weight: 700;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    color: var(--clr-primary);
    background: var(--clr-primary-dim);
    border: 1.5px solid color-mix(in oklab, var(--clr-primary) 28%, transparent);
    box-shadow: 1px 2px 0 color-mix(in oklab, var(--clr-primary) 18%, transparent);

    &:nth-child(even) {
        color: var(--clr-secondary);
        background: var(--clr-secondary-dim);
        border-color: color-mix(in oklab, var(--clr-secondary) 28%, transparent);
        box-shadow: 1px 2px 0 color-mix(in oklab, var(--clr-secondary) 18%, transparent);
    }
}

.t-brain {
    position: absolute;
    right: -20%;
    bottom: -12%;
    width: 50%;
    opacity: 0.06;
    filter: saturate(0.2) blur(12px);
    pointer-events: none;
    z-index: -1;

    @include breakpoint(sm) {
        right: -5%;
        bottom: -15%;
        width: 30%;
    }

    @include breakpoint(xl) {
        width: 25%;
    }
}
</style>

<style>
/* Global — not scoped so it applies to body */
body.modal-open {
    overflow: hidden;
}
</style>