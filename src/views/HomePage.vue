<template>
    <section id="home">
        <div class="t-wrapper flex items-center justify-center">
            <div class="t-content">
                <div class="t-image">
                    <img class="mx-auto" src="/tay.png" alt="Tay Character graphic">
                </div>
                <h1 class="t-title text-center"> <span class="t-title__txt">MIND OF TAY</span> </h1>
            </div>
            <div class="t-bg">
                <div class="t-brain one">
                    <img class="" src="@/assets/brain.svg" alt="brain">
                </div>
                <div class="t-brain two">
                    <img class="" src="@/assets/brain.svg" alt="brain">
                </div>
                <div class="t-brain three">
                    <img class="w-11/12" src="@/assets/brain.svg" alt="brain">
                </div>
                <div class="t-brain four">
                    <img class="" src="@/assets/brain.svg" alt="brain">
                </div>
            </div>
        </div>
    </section>
</template>

<style lang="scss" scoped>
    #home {
        height: 100vh;
    }

    .t-content {
        width: 100%;
        // position: relative;
    }

    .t-brain {
        position: absolute;

        &.one {
            left: 3%;
            top: 8%;
            width: 25%;
        }

        &.two {
            right: 11%;
            bottom: 2%;
            width: 12%;
            opacity: .8;
            display: none;

            @include breakpoint(xl) {
                display: block;
            }
        }

        &.three {
            right: -10%;
            top: -22%;
            width: 40%;
            transform: rotate(195deg) !important;
            opacity: .5;

            @media (min-width:376px) and (max-width:1024px) {
                top: -6%;
            }
        }

        &.four {
            left: 8%;
            bottom: 8%;
            width: 5%;
            transform: rotate(247deg) !important;
            opacity: .15;
        }
    }

    .t-title {
        position: absolute;
        right: 0;
        left: 0;
        z-index: 10;
        bottom: 12%;
        // text-shadow: -15px -12.5px 2.5px rgba(0, 0, 0, 1);
        // font-size: 15vw;

        @include breakpoint(md, max) {
            text-shadow: -12px -10px 1px rgba(0, 0, 0, .9);
        }

        @include breakpoint(md) {
            // text-shadow: 5px 10px 1px $primary;
            font-size: 5rem;
            letter-spacing: -4px;
        }

        &__txt {
            position: relative;

            @include breakpoint(md) {
                background-color: black;
                // background-color: $secondary;
                border: #fff 1px solid;
                box-shadow: 0 -10px 10px #000000e9;
                padding-inline: 60px;
                border-radius: 50px;
            }
        }

    }
</style>