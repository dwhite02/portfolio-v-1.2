<template>
    <section id="contact" class="t-view">
        <div class="t-wrapper flex items-center justify-center">
            <div class="t-content w-full">
                <div class="t-image t-brain">
                    <img class="mx-auto w-1/2" src="../assets/brain.svg" alt="brain">
                </div>
                <h1 class="t-title text-center"> CONTACT </h1>
                <div class="t-button-container flex justify-center">
                    <a href="mailto:dpwhite22@gmail.com">
                        <div class="t-button flex items-center py-2 px-8">
                            <p class="mr-5 font-bold">EMAIL</p>
                            <img class="w-10" src="../assets/email.svg" alt="email icon">
                        </div>
                    </a>
                </div>
            </div>
        </div>
    </section>
</template>

<style lang="scss" scoped>

    .t-view {
        height: 100vh;
    
        @include breakpoint(xl) {
            left: 300%;
        }
    }

    .t-button {
        color: white;
        position: relative;
        border-bottom: 10px solid $primary;
        cursor: pointer;

        &:hover {
            animation: impact .6s ease-in-out;

            &::after {
                animation: impact2 .6s ease-in-out;
            }

            img {
                animation: jump .6s ease-in-out;
            }
        }

        &::after {
            position: absolute;
            border-bottom: 10px solid #fff;
            content: "";
            top: 63px;
            left: 10px;
            right: 0;
            bottom: 0;
            z-index: -1;
            width: 100%;
        }
    }

    .t-title {
        margin-top: -18%;
        position: relative;
        z-index: 10;
    }
</style>