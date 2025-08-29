<template>
    <section id="home" class="t-view" data-style="glow" aria-labelledby="home-title">
        <div class="t-wrapper flex items-center justify-center">
            <!-- Flat color panels (abstract blocks) -->
            <div class="t-panels" aria-hidden="true">
                <span class="panel p1"></span>
                <span class="panel p2"></span>
                <span class="panel p3"></span>
                <span class="panel p4"></span>
            </div>

            <!-- Abstract decals (stars/diamonds/check) -->
            <div class="t-decals" aria-hidden="true">
                <span class="decal check a"></span>
                <!-- <span class="decal star b"></span> -->
                <!-- <span class="decal diamond c"></span> -->
                <span class="decal star d"></span>
            </div>

            <!-- Content -->
            <div class="t-content">
                <h1 id="home-title" class="t-title text-center">
                    <span class="t-title__txt">
                        <span class="t-title__shine" aria-hidden="true"></span>
                        MIND OF TAY
                    </span>
                </h1>

                <div class="t-image">
                    <!-- scalloped luxe frame -->
                    <div class="t-frame">
                        <img class="t-img mx-auto" src="/tay.png" alt="Tay Character graphic" />
                    </div>
                </div>
            </div>

            <!-- Existing brains (unchanged) -->
            <!-- <div class="t-bg" aria-hidden="true">
                <div class="t-brain one">
                    <img src="@/assets/brain.svg" alt="" />
                </div>
                <div class="t-brain two">
                    <img src="@/assets/brain.svg" alt="" />
                </div>

            </div> -->
        </div>
    </section>
</template>

<style lang="scss" scoped>
/* =========================================================
   Dark CN x Regency theme — adjusted layout & brains
   (keeps your existing variables/colors from last step)
   ========================================================= */

#home {
    --primary: #3399ff;
    --secondary: #ff3366;
    --ink: #f5f7ff;
    --ink-dim: #cfd5ff;
    --bg: #0a0b10;
    --bg-elev: #11131a;
    --ring: #0d0f16;
    --shadow-ink: rgba(0, 0, 0, 0.35);

    --panel-1: color-mix(in oklab, var(--primary) 76%, black);
    --panel-2: color-mix(in oklab, var(--secondary) 76%, black);
    --panel-3: color-mix(in oklab, var(--primary) 58%, #141826);
    --panel-4: color-mix(in oklab, var(--secondary) 58%, #141826);
    --pinstripe: var(--ink-dim);
    --panel-radius: 28px;

    height: 100vh;
    position: relative;
    // overflow: clip;
    
    color: var(--ink);

    @include breakpoint(lg) {
        background: linear-gradient(45deg, #0f1220 -50%, #000 42.5%) no-repeat, var(--bg);
    }
}

.t-wrapper {
    width: 100%;
    height: 100%;
    position: relative;
    padding-inline: clamp(12px, 4vw, 36px);
}

/* ===================== Stacking order ===================== */
/* 0: panels, 1: brains, 2: decals, 3: content */
.t-panels {
    position: absolute;
    inset: 0;
    z-index: 0;
}

.t-bg {
    position: absolute;
    inset: 0;
    z-index: 1;
    pointer-events: none;
}

.t-decals {
    position: absolute;
    inset: 0;
    z-index: 2;
}

.t-content {
    position: relative;
    z-index: 3;
    width: 100%;
    max-width: 1600px;
}

/* ===================== Flat color panels ===================== */
.t-panels .panel {
    position: absolute;
    border-radius: var(--panel-radius);
    background: var(--bg-elev);
    box-shadow: 0 10px 24px var(--shadow-ink), inset 0 0 0 2px rgba(255, 255, 255, 0.04);
}

.t-panels .p1 {
    background: var(--panel-1);
    width: clamp(220px, 38vw, 520px);
    height: clamp(140px, 20vh, 260px);
    top: 6%;
    left: 4%;
    transform: rotate(-3deg);
}

.t-panels .p2 {
    background: var(--panel-3);
    width: clamp(160px, 26vw, 360px);
    height: clamp(120px, 16vh, 220px);
    bottom: 8%;
    left: 10%;
    transform: rotate(2deg);
}

.t-panels .p3 {
    background: var(--panel-2);
    width: clamp(200px, 34vw, 460px);
    height: clamp(140px, 20vh, 260px);
    top: 14%;
    right: 6%;
    transform: rotate(4deg);
}

.t-panels .p4 {
    background: var(--panel-4);
    width: clamp(180px, 28vw, 380px);
    height: clamp(120px, 18vh, 220px);
    bottom: 10%;
    right: 12%;
    transform: rotate(-4deg);
}

/* ===================== Responsive content layout ===================== */
.t-content {
    display: grid;
    grid-template-areas:
        "art"
        "title";
    justify-items: center;
    gap: clamp(16px, 3vw, 28px);
    margin-top: clamp(32px, 7vh, 72px);

    @include breakpoint(lg) {
        grid-template-columns: 1.05fr 0.95fr;
        grid-template-areas: "title art";
        align-items: center;
        margin-top: 0;
    }
}

.t-image {
    grid-area: art;
    display: grid;
    place-items: center;
}

.t-frame {
    --frame-pad: clamp(10px, 2.2vw, 18px);
    display: inline-block;
    margin-inline: auto;
    padding: var(--frame-pad);
    border-radius: 28px;
    background: #121520;
    box-shadow:
        0 0 0 2px var(--pinstripe),
        0 0 0 8px #0b0e17,
        0 0 0 10px var(--pinstripe),
        0 16px 36px var(--shadow-ink);
    position: relative;
    isolation: isolate;

    &::before {
        content: "";
        position: absolute;
        inset: -8px;
        border-radius: 36px;
        background:
            radial-gradient(circle at 12px 12px, #0b0e17 8px, transparent 9px) 0 0/24px 24px repeat;
        mask: linear-gradient(#000, #000);
        z-index: -1;
        opacity: .6;
    }
}

.t-img {
    display: block;
    max-width: min(70vw, 520px);
    width: 100%;
}

/* ===================== Headline: never overlaps the image ===================== */
.t-title {
    grid-area: title;
    position: static;
    /* no absolute overlay */
    padding: 0 12px;
    text-align: center;

    @media (min-width: 992px) {
        text-align: left;
        /* left column on desktop */
        padding: 0;
    }

    &__txt {
        position: relative;
        display: inline-block;
        background: #0f1220;
        /* deep pill for separation */
        color: #ffffff;
        /* high contrast */
        border-radius: 999px;
        border: 2px solid var(--pinstripe);
        padding: clamp(10px, 2vw, 16px) clamp(24px, 6vw, 64px);
        font-weight: 1000;
        letter-spacing: -0.015em;
        line-height: 1;
        font-size: clamp(32px, 6.5vw, 92px);
        text-transform: uppercase;
        max-width: 30ch;
        /* prevents overly long lines */
        box-shadow:
            0 0 0 4px rgba(10, 12, 20, 0.85) inset,
            0 10px 0 0 #000000,
            0 18px 28px rgba(0, 0, 0, .5),
            0 0 0 6px color-mix(in oklab, var(--primary) 70%, transparent),
            0 0 0 10px color-mix(in oklab, var(--secondary) 70%, transparent);
        -webkit-text-stroke: 0.75px rgba(0, 0, 0, 0.35);
        text-shadow:
            0 1px 0 rgba(0, 0, 0, .35),
            0 0 24px color-mix(in oklab, var(--primary) 24%, transparent);
    }

    &__shine {
        content: "";
        position: absolute;
        inset: 6px auto auto 12px;
        width: 18%;
        height: 22%;
        border-radius: 999px;
        background: rgba(255, 255, 255, 0.08);
        transform: skewX(-18deg);
        pointer-events: none;
    }
}

/* ===================== Decals (unchanged, above brains) ===================== */
@keyframes floaty {
    from {
        transform: translateY(0) rotate(0deg);
    }

    to {
        transform: translateY(-10px) rotate(6deg);
    }
}

.t-decals .decal {
    position: absolute;
    width: clamp(22px, 2.6vw, 36px);
    height: clamp(22px, 2.6vw, 36px);
    background-repeat: no-repeat;
    background-size: contain;
    opacity: 0.95;
    animation: floaty 3.6s ease-in-out infinite alternate;
    filter: drop-shadow(0 2px 2px rgba(0, 0, 0, .35));
}

.t-decals .star {
    background-image: url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'><path fill='%23f5f7ff' d='M12 0l2.3 7.4L22 2l-5.4 7 7.4 2.3-7.4 2.3L22 21.9l-7.7-5.4L12 24l-2.3-7.4L2 22l5.4-7-7.4-2.3 7.4-2.3L2 2.1l7.7 5.4z'/></svg>");
}

.t-decals .brain {
    background-image: url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' width='372' height='318' viewBox='0 0 372 318'%3e%3cg%3e%3cpath fill='rgb(51,153,255)' fill-rule='evenodd' d='M6.88888889 138.26086957l34.44444444 41.47826086h75.77777778l27.55555556 27.65217392h62l89.55555555 103.69565217V255.7826087h41.33333334l27.55555555-27.65217392v-124.4347826l-27.55555555-27.65217392H310V48.39130435l-27.55555556-27.65217392h-48.22222222L220.44444444 6.91304348H110.22222222L75.77777778 34.56521739H48.22222222L6.8888889 76.04347826v62.2173913z'/%3e%3cg%3e%3cpath fill='rgb(0,64,128)' fill-rule='evenodd' d='M124 179.73913043h-13.77777778v-41.47826086c0-1.83627718.72677778-3.5913261 2.01844445-4.88752174l27.55555555-27.65217392c1.29166667-1.29619565 3.04402778-2.02552174 4.87044445-2.02552174h79.81466666l18.64822223-18.7136087 9.74175 9.77590762-20.66666667 20.73913043c-1.29166667 1.29619565-3.04402778 2.02552174-4.87044445 2.02552174h-79.81466666L124 141.1237337v38.61539673z'/%3e%3cpath fill='rgb(0,64,128)' fill-rule='evenodd' d='M241.11111111 165.91304348h-75.77777778v-13.82608696h72.92577778l18.64822222-18.7136087 9.74175 9.77590761-20.66666666 20.73913044c-1.29252778 1.29533152-3.0448889 2.0246576-4.87130556 2.0246576z'/%3e%3cpath fill='rgb(0,64,128)' fill-rule='evenodd' d='M220.44444444 62.2173913h-13.77777777V41.47826087c0-1.83627717.72677777-3.59132609 2.01844444-4.88752174l20.66666667-20.73913043 9.74175 9.7759076-18.64908334 18.7136087v17.8762663z'/%3e%3cpath fill='rgb(0,64,128)' fill-rule='evenodd' d='M303.11111111 255.7826087h-13.77777778v-17.87713044l-18.64822222-18.7136087c-1.29166667-1.29619565-2.01844444-3.05124456-2.01844444-4.88752173V186.6521739c0-1.83627717.72677777-3.59132608 2.01844444-4.88752174l20.66666667-20.73913043C292.64344444 159.72932609 294.39580556 159 296.22222222 159h20.66666667v13.82608696h-17.81466667l-16.62977778 16.68895108v21.92730979l18.64822223 18.7136087c1.29166666 1.29619564 2.01844444 3.05124456 2.01844444 4.88752173v20.73913044z'/%3e%3cpath fill='rgb(0,64,128)' fill-rule='evenodd' d='M275.55555556 96.7826087h-6.8888889V82.95652174h4.0368889l11.75933333-11.80056522c1.29166667-1.29619565 3.04402778-2.02552174 4.87044444-2.02552174H310v13.82608696h-17.81466667L280.426 94.75708696c-1.29166667 1.29619565-3.04402778 2.02552174-4.87044444 2.02552174z'/%3e%3cpath fill='rgb(0,64,128)' fill-rule='evenodd' d='M103.33333333 76.04347826H89.55555556v-17.8762663L70.90733333 39.45273913l9.74175-9.7759076L101.31575 50.41596195c1.29166667 1.29619565 2.01844444 3.05124456 2.01844444 4.88752174v20.73999456h-.0008611z'/%3e%3cpath fill='rgb(0,64,128)' fill-rule='evenodd' d='M55.11111111 131.34782609H41.33333333v-13.82608696c0-1.83627717.72677778-3.59132609 2.01844445-4.88752174l13.77777778-13.82608696C58.42122222 97.51193478 60.17358333 96.7826087 62 96.7826087h41.33333333v13.82608695H64.85286111l-9.74175 9.77590761v10.96322283z'/%3e%3cpath fill='rgb(0,64,128)' fill-rule='evenodd' d='M344.44444444 152.08695652h-13.77777777v-10.96408695l-9.7408889-9.77504348h-24.70355555v-13.82608696h27.55555556c1.82641666 0 3.57877778.72932609 4.87044444 2.02552174L342.426 133.37334783c1.29166667 1.29619565 2.01844444 3.05124456 2.01844444 4.88752174v13.82608695z'/%3e%3cpath fill='rgb(0,64,128)' fill-rule='evenodd' d='M151.55555556 76.04347826h-13.77777778V62.2173913c0-1.83627717.72677778-3.59132608 2.01844444-4.88752173L153.574 43.5037826c1.29166667-1.29619565 3.04402778-2.02552174 4.87044444-2.02552174h13.77777778v13.82608696h-10.92577778l-9.74088888 9.7759076v10.96322283z'/%3e%3cpath fill='rgb(0,64,128)' fill-rule='evenodd' d='M337.55555556 221.2173913h-13.77777778c-1.82641667 0-3.57877778-.72932608-4.87044445-2.02552173l-13.77777777-13.82608696 9.74175-9.77590761 11.75933333 11.80142935h10.92491667v13.82608695z'/%3e%3crect width='27.556' height='13.826' x='248' y='200.478' fill='rgb(0,64,128)' rx='0' ry='0'/%3e%3cpath fill='rgb(0,64,128)' fill-rule='evenodd' d='M6.88888889 138.26086957H117.1111111l34.44444445 34.56521739h82.66666666l62 138.26086956-89.55555555-103.69565217h-62l-27.55555556-27.65217392H41.33333333L6.8888889 138.26086957z'/%3e%3cpath fill='rgb(0,64,128)' fill-rule='evenodd' d='M282.44444444 20.73913043v55.30434783H310V48.39130435l-27.55555556-27.65217392z'/%3e%3cpath fill='rgb(0,64,128)' fill-rule='evenodd' d='M296.22222222 255.7826087h41.33333334l27.55555555-27.65217392h-68.88888889v27.65217392z'/%3e%3cpath fill='rgb(0,64,128)' fill-rule='evenodd' d='M110.22222222 6.91304348v48.39130435H96.44444444L75.77777778 34.56521739l34.44444444-27.65217391z'/%3e%3cpath fill='rgb(0,64,128)' fill-rule='evenodd' d='M337.55555556 82.95652174v145.17391304h27.55555555v-124.4347826'/%3e%3c/g%3e%3cpath fill='rgb(0,0,0)' fill-rule='evenodd' d='M342.42599487 71.15596008l27.55557251 27.6521759C371.27322388 100.10432435 372 101.859375 372 103.6956482v124.43478394c0 1.8362732-.72677612 3.5913086-2.01843262 4.8875122l-27.5555725 27.65219117c-1.2916565 1.29620361-3.04403687 2.0255127-4.87045289 2.0255127H303.1111145v48.39129638c0 2.88275146-1.7859497 5.4682312-4.4803772 6.47409058-.78704834.2972412-1.60079956.43896484-2.4085083.43896484-1.9581604 0-3.87155151-.8373413-5.20715332-2.38327026L203.52191162 214.3043518h-58.85523987c-1.82641601 0-3.57878113-.7293396-4.87045288-2.02554322l-25.53710937-25.62664795H41.33332825c-2.0451355 0-3.9826355-.9116516-5.29151917-2.484375L1.59736252 142.68954468C.564888 141.44778442 0 139.88111878 0 138.26086426V76.04348755c0-1.83628845.72677612-3.59133911 2.01844406-4.88752747l41.33333206-41.47825622c1.29167176-1.29620362 3.04402924-2.02552796 4.87044525-2.02552796h25.14014435l32.55773926-26.13994598C107.14117432.53316498 108.65844727 0 110.222229 0h110.222229c1.82641602 0 3.57876588.72932434 4.87042237 2.02552032l11.75933838 11.80056763h45.37023926c1.82641601 0 3.57876587.72932434 4.87042236 2.02552033l27.55557251 27.6521759c1.2916565 1.29620361 2.01843262 3.05123901 2.01843262 4.8875122v20.73913575h20.6666565c1.826416 0 3.57879638.7293396 4.87045287 2.02552795zm-7.72244262 177.7136078l23.51867675-23.60113526V106.55851746l-23.51867675-23.602005h-42.5173645l-11.76019288 11.80056762c-1.2916565 1.29620361-3.04403686 2.02552795-4.87045288 2.02552795h-6.8888855V82.95651245h4.03689576l11.75933838-11.80055237c1.29165649-1.29620361 3.04400634-2.02552795 4.87042236-2.02552795h13.77780151V51.25416565L279.59243774 27.6521759h-42.5173645L220.44445801 44.3411255v17.87626648h-13.77780152V41.47825623c0-1.8362732.72677613-3.59132386 2.01846314-4.88751221l15.79620361-15.8516159-6.8888855-6.91304017H112.63763428L86.09130859 35.13986206l15.22357178 15.27696228c1.29168701 1.29620361 2.01846314 3.05125427 2.01846314 4.88752747v20.73913574H89.55555725V58.1672058l-16.629776-16.68894958H51.0750885L13.77777863 78.90634155v56.85028076l30.78128051 37.06945801H110.222229v-34.56521606c0-1.8362732.72677613-3.5913086 2.01843262-4.8875122l27.55557251-27.65217591c1.2916565-1.29618836 3.04400635-2.02552796 4.87042236-2.02552796h79.81466675l18.64736939-18.71447754 9.74176025 9.77590943-20.66668701 20.73913574c-1.2916565 1.29620361-3.04400635 2.02552795-4.87042236 2.02552795h-79.81381226L124 141.12373352v35.75340271l23.51867676 23.60113525H234.222229v13.82608033h-12.46630859l67.57739258 78.25131225v-54.6493225L270.6850891 219.191864c-1.2916565-1.29620361-2.01843262-3.05123901-2.01843262-4.8875122H248v-13.82608033h20.6666565v-13.82611084c0-1.83627319.72677612-3.59130859 2.01843261-4.8875122l20.66668701-20.73913574C292.64343262 159.7293396 294.395813 159 296.222229 159h20.6666565v13.82608032h-17.81381226l-16.63064575 16.68896485v21.92730712l18.64822388 18.71359253c1.291687 1.29620362 2.01846313 3.05126954 2.01846313 4.88754273v13.82608032h31.59243775z'/%3e%3cpath fill='rgb(0,0,0)' fill-rule='evenodd' d='M238.25911111 152.08695652h-72.92577778v13.82608696h75.77777778c1.82641667 0 3.57877778-.72932609 4.87044445-2.02552174l20.66666666-20.73913044-9.74175-9.7759076-18.6473611 18.71447282z'/%3e%3cpath fill='rgb(0,0,0)' fill-rule='evenodd' d='M57.12955556 98.80813043L43.35177778 112.6342174c-1.29166667 1.29619565-2.01844445 3.05124457-2.01844445 4.88752174v13.82608696h13.77777778v-10.96408696l9.74175-9.77504348h38.48047222V96.7826087H62c-1.82641667 0-3.57877778.72932608-4.87044444 2.02552173z'/%3e%3cpath fill='rgb(0,0,0)' fill-rule='evenodd' d='M323.77777778 117.52173913h-27.55555556v13.82608696h24.70355556l9.74088889 9.7759076v10.96322283h13.77777777v-13.82608695c0-1.83627718-.72677777-3.5913261-2.01844444-4.88752174l-13.77777778-13.82608696c-1.29166666-1.29619565-3.04402778-2.02552174-4.87044444-2.02552174z'/%3e%3cpath fill='rgb(0,0,0)' fill-rule='evenodd' d='M153.574 43.5037826l-13.77777778 13.82608697c-1.29166666 1.29619565-2.01844444 3.05124456-2.01844444 4.88752173v13.82608696h13.77777778V65.0793913l9.74175-9.77504347h10.92491666V41.47826087h-13.77777778c-1.82641666 0-3.57877777.72932609-4.87044444 2.02552174z'/%3e%3cpath fill='rgb(0,0,0)' fill-rule='evenodd' d='M314.87044444 195.59073913l-9.74175 9.7759076 13.77777778 13.82608697c1.29166667 1.29619565 3.04402778 2.02552173 4.87044445 2.02552173h13.77777777v-13.82608695h-10.92577777l-11.75847223-11.80142935z'/%3e%3c/g%3e%3c/svg%3e ");
}

.t-decals .diamond {
    background-image: url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'><path fill='%23cfd5ff' d='M12 0l12 12-12 12L0 12 12 0z'/></svg>");
}

.t-decals .check {
    background-image: url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 8 8'><path fill='%23f5f7ff' d='M0 0h4v4H0zM4 4h4v4H4z'/></svg>");
    opacity: 0.85;
}

.t-decals .a {
    top: 12%;
    left: 48%;
    animation-duration: 3.2s;
}

.t-decals .b {
    top: 62%;
    left: 22%;
    animation-duration: 3.8s;
}

.t-decals .c {
    top: 28%;
    right: 18%;
    animation-duration: 3.4s;
}

.t-decals .d {
    bottom: 14%;
    right: 52%;
    animation-duration: 3.1s;
}

@media (prefers-reduced-motion: reduce) {
    .t-decals .decal {
        animation: none;
    }
}

/* ===================== Brains (repositioned to support composition) ===================== */
.t-brain {
    position: absolute;
    filter: grayscale(1) contrast(1.05) drop-shadow(0 6px 18px rgba(0, 0, 0, .45));
}

.t-brain.one {
    /* behind the headline, top-left */
    left: 4%;
    top: 6%;
    width: clamp(200px, 24vw, 380px);
    // opacity: .16;
    transform: rotate(350deg);
    /* gentle fade near center so it doesn’t fight the title */
    mask-image: radial-gradient(60% 60% at 60% 40%, rgba(0, 0, 0, 0.2) 0%, black 70%);
    -webkit-mask-image: radial-gradient(60% 60% at 60% 40%, rgba(0, 0, 0, 0.2) 0%, black 70%);
}

.t-brain.three {
    /* tucked to the right behind the portrait */
    right: -6%;
    top: 4%;
    width: clamp(280px, 36vw, 560px);
    transform: rotate(198deg) !important;
    opacity: .22;

    /* fade toward center-left so it doesn't crowd the title column */
    mask-image: radial-gradient(70% 70% at 80% 50%, black 65%, transparent 100%);
    -webkit-mask-image: radial-gradient(70% 70% at 80% 50%, black 65%, transparent 100%);

    @media (min-width:376px) and (max-width:1024px) {
        top: 0%;
        right: -12%;
    }
}

.t-brain.four {
    /* small “stamp” near bottom, mid-left */
    left: 18%;
    bottom: 8%;
    width: clamp(36px, 5vw, 60px);
    transform: rotate(247deg) !important;
    opacity: .18;
}

/* (Optional if you ever re-enable .two) place it low-right as a tiny stamp
.t-brain.two {
  right: 10%;
  bottom: 6%;
  width: clamp(36px, 5vw, 64px);
  opacity: .22;
  transform: rotate(25deg);
}
*/
/* ===================== Ambient background glow (optional) ===================== */
/* Place glows under panels/brains/decals/content */
#home {
    /* dial this between 0 and 0.08 */
    --glow-alpha: 0;

    @include breakpoint(lg) {
        --glow-alpha: 0.225;
    }

    /* default: clean, no glow */
    &::before {
        content: "";
        position: absolute;
        inset: -12%;
        z-index: 0;
        /* base layer */
        pointer-events: none;
        opacity: 0;
        /* off by default */
        background:
            radial-gradient(900px 600px at 18% 24%, rgba(51, 153, 255, var(--glow-alpha)) 0%, transparent 60%),
            radial-gradient(1000px 700px at 82% 70%, rgba(255, 51, 102, var(--glow-alpha)) 0%, transparent 70%);
        filter: blur(18px);
        /* very soft */
    }

    /* enable glow */
    &[data-style="glow"]::before {
        opacity: 1;
    }

    /* adjust stack: 0 glow, 1 panels, 2 brains, 3 decals, 4 content */
    .t-panels {
        z-index: 1;
    }

    .t-bg {
        z-index: 2;
    }

    .t-decals {
        z-index: 3;
    }

    .t-content {
        z-index: 4;
    }
}

/* ===================== Minimal mode (fewer shapes, calmer accents) ===================== */
#home[data-minimal="true"] {

    /* calm the scene */
    .t-panels .p2,
    .t-panels .p4 {
        display: none;
    }

    .t-panels .p1,
    .t-panels .p3 {
        transform: rotate(0.5deg);
        box-shadow: 0 8px 18px rgba(0, 0, 0, .3), inset 0 0 0 1px rgba(255, 255, 255, .04);
    }

    .t-decals .c,
    .t-decals .d {
        display: none;
    }

    /* fewer decals */
    .t-decals .decal {
        opacity: .7;
        animation-duration: 4s;
    }

    /* calmer motion */

    /* headline: keep contrast but reduce “neon” rings */
    .t-title__txt {
        box-shadow:
            0 0 0 2px rgba(10, 12, 20, 0.85) inset,
            0 8px 0 0 #000,
            /* CN-ish drop */
            0 16px 26px rgba(0, 0, 0, .45);
        /* softer outer */
        border-width: 1px;
        /* slimmer pinstripe */
        text-shadow: 0 1px 0 rgba(0, 0, 0, .35);
    }
}

/* ===================== Brain refinements for minimal look ===================== */
/* make them feel like watermarks; softer, slightly larger, less rotation noise */
.t-brain.one {
    opacity: .14;
    transform: rotate(352deg);
    filter: grayscale(1) contrast(1.05) drop-shadow(0 4px 12px rgba(0, 0, 0, .35));
}

.t-brain.three {
    opacity: .20;
    transform: rotate(192deg) !important;
    right: -4%;
    top: 6%;
}

.t-brain.four {
    opacity: .16;
    transform: rotate(240deg) !important;
}

/* ===================== Headline fit & balance (avoids covering art) ===================== */
.t-title {
    text-wrap: balance;

    /* nicer line breaks where supported */
    &__txt {
        max-width: 22ch;
        /* tighter measure for stronger punch */
    }
}

/* Accessibility: if user prefers less motion, also calm glow flicker (none here) */
@media (prefers-reduced-motion: reduce) {
    .t-decals .decal {
        animation: none;
    }
}
</style>

  
