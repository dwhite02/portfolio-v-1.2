<script setup lang="ts">
import { onMounted, onBeforeUnmount } from "vue";
import { projectStore } from '../data/projectStore';

/** Close a specific modal by its id (keeps your existing open/close pattern) */
const closeModal = (): void => {
    const modal = document.getElementById("pm-modal");
    modal?.classList.remove("overlay--in-view");
};

/** Global Escape handler closes the first open overlay (optional, nice UX) */
function onKeydown(e: KeyboardEvent) {
    if (e.key !== "Escape") return;
    const open = document.querySelector<HTMLElement>(".overlay.overlay--in-view");
    open?.classList.remove("overlay--in-view");
}

/** Split the tools string into readable chips (supports commas, pipes, slashes) */
function tokenizeTools(tools: string): string[] {
    return tools
        .split(/[,/|]/g)
        .map((t) => t.trim())
        .filter(Boolean);
}

onMounted(() => window.addEventListener("keydown", onKeydown));
onBeforeUnmount(() => window.removeEventListener("keydown", onKeydown));

</script>

<template>
    <div v-if="projectStore.selectedProject" id="pm-modal" class="overlay" role="dialog" aria-modal="true" :aria-labelledby="`project-title-${projectStore.selectedProject.id}`" tabindex="-1" @click.self="closeModal">
        <!-- Card surface inside the overlay -->
        <div class="overlay__content">
            <!-- Top bar: Title + primary actions -->
            <header class="pm-header">
                <h2 class="pm-title" :id="`project-title-${projectStore.selectedProject.id}`">
                    {{ projectStore.selectedProject.title }}
                </h2>
                <div class="pm-actions">
                    <a v-if="projectStore.selectedProject.web" class="btn btn--primary" :href="projectStore.selectedProject.web" target="_blank"
                        rel="noopener noreferrer">
                        <img src="../assets/www.svg" alt="" aria-hidden="true" class="btn__icon" />
                        <span>View site</span>
                    </a>
                    <a v-if="projectStore.selectedProject.github" class="btn btn--ghost" :href="projectStore.selectedProject.github" target="_blank"
                        rel="noopener noreferrer">
                        <img src="../assets/git.svg" alt="" aria-hidden="true" class="btn__icon" />
                        <span>GitHub</span>
                    </a>
                </div>

                <!-- Close button lives in the header on the far right (mobile-friendly) -->
                <button type="button" class="overlay__close-btn" aria-label="Close" @click="closeModal">
                    <img class="icon icon--inactive" src="../assets/close.svg" alt="" aria-hidden="true" />
                    <img class="icon icon--active" src="../assets/close-solid.svg" alt="" aria-hidden="true" />
                </button>
            </header>

            <!-- Meta row -->
            <section class="pm-meta" v-if="projectStore.selectedProject.for">
                <span class="pm-label">FOR</span>
                <span class="pm-value">{{ projectStore.selectedProject.for }}</span>
            </section>

            <!-- About -->
            <section class="pm-about" v-if="projectStore.selectedProject.about">
                <h3 class="pm-section">About</h3>
                <p class="pm-text">{{ projectStore.selectedProject.about }}</p>
            </section>

            <!-- Tools as chips -->
            <section class="pm-tools" v-if="projectStore.selectedProject.tools">
                <h3 class="pm-section">Tools</h3>
                <div class="pm-chips">
                    <span v-for="t in tokenizeTools(projectStore.selectedProject.tools)" :key="t" class="chip">
                        {{ t }}
                    </span>
                </div>
            </section>

            <!-- Decorative art -->
            <div class="t-brain" aria-hidden="true">
                <img src="../assets/brain.svg" alt="" />
            </div>
        </div>
    </div>
</template>

<style lang="scss" scoped>
/* === Overlay shell (full-screen) === */
.overlay {
    position: fixed;
    inset: 0;
    z-index: 1000;
    display: grid;
    place-items: center;
    overflow: hidden;
    color: white;

    /* Closed by default; open when .overlay--in-view is added */
    height: 0;
    width: 100%;
    top: 0%;
    background: rgba(0, 0, 0, 0.65);
    backdrop-filter: blur(15px);
    transition: height 0.5s ease, opacity 0.3s ease;
    opacity: 0;

    &.overlay--in-view {
        height: 100%;
        opacity: 1;
    }
}

/* === Card surface === */
.overlay__content {
    position: relative;
    width: min(900px, calc(100% - 32px));
    max-width: $container-base;
    margin-inline: auto;
    text-align: left;
    z-index: 1;
    overflow: hidden;

    /* Card look */
    background: rgba(12, 12, 14, 1);
    border: 2px solid rgba(255, 255, 255, 0.08);
    border-radius: 20px;
    box-shadow: 0 20px 60px rgba(0, 0, 0, 0.5);
    padding: clamp(16px, 3vw, 32px);
}

/* === Header: title + actions + close === */
.pm-header {
    display: grid;
    grid-template-columns: 1fr auto auto;
    /* title | actions | close */
    align-items: center;
    gap: 12px 16px;
    margin-bottom: 8px;

    @include breakpoint(xs) {
        grid-template-columns: 1fr auto auto;
    }
}

.pm-title {
    font-weight: 900;
    letter-spacing: 0.02em;
    font-size: clamp(24px, 3.2vw, 40px);
    line-height: 1.1;
    margin: 0;
}

.pm-actions {
    display: inline-flex;
    gap: 10px;
    align-items: center;

    .btn {
        display: inline-flex;
        align-items: center;
        gap: 8px;
        padding: 10px 14px;
        border-radius: 999px;
        font-weight: 700;
        text-decoration: none;
        border: 1px solid transparent;
        transition: transform 0.15s ease, opacity 0.15s ease;

        &:hover {
            transform: translateY(-1px);
            background: $secondary;
        }

        &__icon {
            width: 18px;
            height: 18px;
            opacity: 0.9;
        }
    }

    .btn--primary {
        background: $primary;
        /* $primary if you prefer */
        color: #fff;
    }

    .btn--ghost {
        background: transparent;
        color: #fff;
        border-color: rgba(255, 255, 255, 0.18);
        border-style: solid;
    }
}

/* Close button (bigger hit target, lives in header) */
.overlay__close-btn {
    justify-self: end;
    cursor: pointer;
    background: transparent;
    border: 0;
    padding: 0;
    width: 48px;
    height: 48px;
    position: relative;
    color: white;

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
            left: 0;
            opacity: 0;
            transition: opacity 0.2s;
        }
    }
}

/* === Meta / About / Tools === */
.pm-meta {
    display: flex;
    align-items: baseline;
    gap: 8px;
    margin: 4px 0 12px;

    .pm-label {
        font-size: 12px;
        letter-spacing: 0.12em;
        color: #9aa1aa;
    }

    .pm-value {
        font-weight: 700;
        color: #fff;
    }
}

.pm-section {
    font-size: 12px;
    letter-spacing: 0.12em;
    color: #9aa1aa;
    text-transform: uppercase;
    margin: 20px 0 8px;
}

.pm-text {
    color: #e8e9ee;
    line-height: 1.55;
    max-width: 75ch;
}

/* Tools as chips */
.pm-chips {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
}

.chip {
    --ring: rgba(255, 255, 255, 0.1);
    display: inline-block;
    padding: 6px 10px;
    border-radius: 999px;
    border: 1px solid var(--ring);
    color: #dfe3ee;
    font-size: 12px;
    background: linear-gradient(to bottom,
            rgba(255, 255, 255, 0.03),
            rgba(255, 255, 255, 0));
}

/* Decorative illustration */
.t-brain {
    position: absolute;
    right: -20%;
    bottom: -12%;
    width: 50%;
    opacity: 0.1;
    filter: saturate(0.25) blur(10px);
    pointer-events: none;
    animation: float 10s ease-in-out infinite alternate;
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

@keyframes float {
    from {
        transform: translate3d(0, 0, 0) rotate(-1deg);
    }

    to {
        transform: translate3d(0, -6px, 0) rotate(1deg);
    }
}
</style>
