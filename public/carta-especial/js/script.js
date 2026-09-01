/* =========================================================
   CARTA ESPECIAL
   SCRIPT.JS
========================================================= */


/* =========================================================
   ELEMENTOS PRINCIPALES
========================================================= */

const mainContent = document.getElementById("mainContent");

const musicButton = document.getElementById("musicButton");
const backgroundMusic = document.getElementById("backgroundMusic");

const particlesContainer = document.getElementById("particles");


/* =========================================================
   CONFIGURACIÓN
========================================================= */

const CONFIG = {

    // Menos partículas en celular para que la animación se sienta fluida
    particles: window.innerWidth < 600 ? 20 : 45,

    stars: 15,

    musicVolume: 0.35,

    revealDelay: 400

};


/* =========================================================
   FOTOS (carrusel automático)
========================================================= */

const GALLERY_IMAGES = Array.from(
    { length: 29 },
    (_, i) => `img/foto-${String(i + 1).padStart(2, "0")}.jpg`
);


/* =========================================================
   ICONOS SVG (reemplazan los caracteres ✦ ♪ usados antes)
========================================================= */

const SPARK_SVG =
    '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2 L14.5 9.5 L22 12 L14.5 14.5 L12 22 L9.5 14.5 L2 12 L9.5 9.5 Z"/></svg>';

const MUSIC_NOTE_SVG =
    '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 18V5l12-2v13"/><circle cx="6" cy="18" r="3"/><circle cx="18" cy="16" r="3"/></svg>';

const MUSIC_PLAYING_SVG =
    '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M4 10v4M9 6v12M14 9v6M19 11v2"/></svg>';


/* =========================================================
   ESTADO
========================================================= */

let musicPlaying = false;


/* =========================================================
   INICIAR PÁGINA
========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    createParticles();

    createStars();

    prepareScrollReveal();

    startPhotoRotators();

    prepareMemoryVideo();

    prepareStarExplosion();

    revealLetter();

});


/* =========================================================
   MOSTRAR LA CARTA
   (Vincent ya se encargó de la ceremonia de apertura en la
   app, así que aquí la carta aparece directo al cargar).
========================================================= */

function revealLetter() {

    setTimeout(() => {

        mainContent.classList.add("show");

        musicButton.classList.add("show");

    }, CONFIG.revealDelay);


    /*
        Intentamos reproducir la música. Como esta página se abrió
        con una navegación normal (no un click dentro de ella), es
        muy probable que el navegador bloquee el autoplay — sobre
        todo en celular.
    */

    (async () => {

        try {

            backgroundMusic.volume = CONFIG.musicVolume;

            await backgroundMusic.play();

            musicPlaying = true;

            updateMusicButton();

        } catch (error) {

            console.log("Autoplay bloqueado. Se activará con el primer toque.");

            enableMusicOnFirstInteraction();

        }

    })();

}


/*
    Si el navegador bloqueó el autoplay, en vez de obligar a Angela a
    encontrar y tocar el botón de música, aprovechamos el primer
    toque/scroll/click que haga en cualquier parte de la página (algo
    que va a pasar casi de inmediato, en cuanto empiece a leer) para
    arrancar la música sola en ese momento — así, en la práctica, se
    escucha "desde que entra".
*/

function enableMusicOnFirstInteraction() {

    const events = ["touchstart", "pointerdown", "click", "scroll", "keydown"];

    async function tryPlay() {

        if (musicPlaying) return;

        try {

            backgroundMusic.volume = CONFIG.musicVolume;

            await backgroundMusic.play();

            musicPlaying = true;

            updateMusicButton();

        } catch (error) {

            // Se queda esperando el siguiente intento de interacción.
            return;

        }

        events.forEach(evt =>
            window.removeEventListener(evt, tryPlay)
        );

    }

    events.forEach(evt =>
        window.addEventListener(evt, tryPlay, { passive: true, once: false })
    );

}


/* =========================================================
   PARTÍCULAS
========================================================= */

function createParticles() {

    if (!particlesContainer) return;

    for (let i = 0; i < CONFIG.particles; i++) {

        const particle = document.createElement("div");

        particle.classList.add("particle");

        particle.style.left = Math.random() * 100 + "%";

        const size = Math.random() * 3 + 1;
        particle.style.width = size + "px";
        particle.style.height = size + "px";

        particle.style.animationDuration = Math.random() * 12 + 8 + "s";
        particle.style.animationDelay = Math.random() * 10 + "s";

        particlesContainer.appendChild(particle);

    }

}


/* =========================================================
   ESTRELLAS
========================================================= */

function createStars() {

    if (!particlesContainer) return;

    for (let i = 0; i < CONFIG.stars; i++) {

        const star = document.createElement("div");

        star.classList.add("floating-star");

        star.innerHTML = SPARK_SVG;

        star.style.left = Math.random() * 100 + "%";
        star.style.fontSize = Math.random() * 14 + 10 + "px";
        star.style.animationDuration = Math.random() * 15 + 12 + "s";
        star.style.animationDelay = Math.random() * 15 + "s";

        particlesContainer.appendChild(star);

    }

}


/* =========================================================
   CARRUSEL DE FOTOS

   Cada caja ".rotator" tiene DOS <img> encimadas (capas). Para
   cambiar de foto: se precarga la siguiente imagen en la capa
   que está oculta y, solo cuando ya terminó de cargar, se hace
   un fundido cruzado (una capa sube de opacidad mientras la
   otra baja) — así nunca hay un instante en blanco/"trabado"
   como pasaba antes con una sola imagen que se apagaba y
   volvía a prender.

   Además, cada caja recorre una baraja aleatoria de TODAS las
   fotos (sin repetir ninguna) antes de volver a barajar, así
   se ven todas y no se sienten repeticiones tan seguidas.
========================================================= */

function shuffle(array) {
    const copy = array.slice();
    for (let i = copy.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [copy[i], copy[j]] = [copy[j], copy[i]];
    }
    return copy;
}

function startPhotoRotators() {

    const rotators = document.querySelectorAll(".rotator");

    rotators.forEach((box, i) => {

        const layers = box.querySelectorAll(".rotator-layer");
        if (layers.length < 2) return;

        const interval = parseInt(box.dataset.interval, 10) || (3200 + i * 400);
        const startOffset = parseInt(box.dataset.start, 10) || 0;

        // Baraja propia de esta caja, empezando en un punto distinto
        // para que las cajas no cambien todas la misma foto a la vez.
        let deck = shuffle(GALLERY_IMAGES);
        let deckPos = startOffset % deck.length;

        let activeIndex = 0; // cuál de las dos capas está visible ahora

        function nextImage() {

            deckPos++;

            if (deckPos >= deck.length) {
                // Se acabó la baraja: se ven todas antes de repetir.
                deck = shuffle(GALLERY_IMAGES);
                deckPos = 0;
            }

            return deck[deckPos];

        }

        setInterval(() => {

            const hiddenLayer = layers[1 - activeIndex];
            const nextSrc = nextImage();

            // Precargamos la imagen antes de mostrarla, para que el
            // fundido cruzado sea siempre fluido y no haya salto.
            const preloader = new Image();

            preloader.onload = () => {

                hiddenLayer.src = nextSrc;

                layers[activeIndex].classList.remove("is-active");
                hiddenLayer.classList.add("is-active");

                activeIndex = 1 - activeIndex;

            };

            preloader.src = nextSrc;

        }, interval);

    });

}


/* =========================================================
   VIDEO DEL RECUERDO
   Se queda fijo en la última sección, en pausa, con su propia
   miniatura. Angela tiene que tocar el botón de play para que
   arranque (no autoplay, porque la música de fondo ya está
   sonando y no queremos encimar los dos audios).

   Si el archivo todavía no existe, este bloque se queda oculto
   solo — no se ve nada roto.
========================================================= */

function prepareMemoryVideo() {

    const wrapper = document.getElementById("memoryVideo");
    if (!wrapper) return;

    const video = document.getElementById("memoryVideoEl");
    const playBtn = document.getElementById("memoryVideoPlay");
    if (!video || !playBtn) return;

    function reveal() {
        wrapper.style.display = "";
    }

    // "loadeddata" a veces nunca llega en celular porque el video
    // usa preload="metadata" (para no gastar datos de más) y algunos
    // navegadores móviles nunca avanzan más allá de la metadata hasta
    // que el usuario le da play. "loadedmetadata" sí llega siempre
    // que el archivo carga bien, así que es más confiable aquí.
    video.addEventListener("loadedmetadata", reveal);
    video.addEventListener("loadeddata", reveal);
    video.addEventListener("error", () => {
        wrapper.style.display = "none";
    });

    if (video.readyState >= 1) {
        reveal();
    }

    playBtn.addEventListener("click", () => {

        video.muted = false;

        video
            .play()
            .then(() => {
                wrapper.classList.add("is-playing");
            })
            .catch(() => {
                console.log("No se pudo reproducir el video.");
            });

    });

    video.addEventListener("pause", () => {
        wrapper.classList.remove("is-playing");
    });

    video.addEventListener("play", () => {
        wrapper.classList.add("is-playing");
    });

    video.addEventListener("ended", () => {
        wrapper.classList.remove("is-playing");
        video.currentTime = 0;
    });

}


/* =========================================================
   BOTÓN DE MÚSICA
========================================================= */

musicButton.addEventListener("click", async () => {

    if (musicPlaying) {

        backgroundMusic.pause();
        musicPlaying = false;

    } else {

        try {

            backgroundMusic.volume = CONFIG.musicVolume;

            await backgroundMusic.play();

            musicPlaying = true;

        } catch (error) {

            console.log("No se pudo reproducir la música.");

        }

    }

    updateMusicButton();

});


function updateMusicButton() {

    const icon = musicButton.querySelector(".music-icon");
    const text = musicButton.querySelector(".music-text");

    if (musicPlaying) {

        icon.innerHTML = MUSIC_PLAYING_SVG;
        text.textContent = "Sonando";

    } else {

        icon.innerHTML = MUSIC_NOTE_SVG;
        text.textContent = "Música";

    }

}


/* =========================================================
   REVELADO AL HACER SCROLL

   Un solo patrón para cualquier sección: cada bloque, foto,
   tarjeta del carrusel y la tarjeta de la carta se marcan con
   la clase "reveal" y, cuando entran en pantalla, se les
   agrega "is-visible" (el efecto vive en style.css, no aquí).
========================================================= */

function prepareScrollReveal() {

    const selectors = [
        ".block",
        ".block-photo",
        ".filmstrip-item",
        ".letter-card",
        ".memory-video"
    ];

    const elements = document.querySelectorAll(selectors.join(","));

    elements.forEach(el => el.classList.add("reveal"));

    const observer = new IntersectionObserver(
        entries => {

            entries.forEach(entry => {

                if (entry.isIntersecting) {

                    entry.target.classList.add("is-visible");

                    observer.unobserve(entry.target);

                }

            });

        },
        {
            threshold: 0.15,
            rootMargin: "0px 0px -60px 0px"
        }
    );

    elements.forEach(el => observer.observe(el));

}


/* =========================================================
   DOBLE CLICK/TOQUE EN LA ESTRELLA FINAL
========================================================= */

function prepareStarExplosion() {

    const star = document.querySelector(".section-star");
    if (!star) return;

    star.style.cursor = "pointer";

    star.addEventListener("dblclick", createStarExplosion.bind(null, star));

    // En celular no hay doble click con mouse, así que un doble
    // toque rápido hace lo mismo.
    let lastTap = 0;
    star.addEventListener("touchend", () => {
        const now = Date.now();
        if (now - lastTap < 350) {
            createStarExplosion(star);
        }
        lastTap = now;
    });

}


function createStarExplosion(star) {

    const rect = star.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    for (let i = 0; i < 25; i++) {

        const spark = document.createElement("div");

        spark.innerHTML = SPARK_SVG;

        spark.style.position = "fixed";
        spark.style.left = centerX + "px";
        spark.style.top = centerY + "px";
        spark.style.zIndex = "9999";
        spark.style.pointerEvents = "none";
        spark.style.color = Math.random() > 0.5 ? "#e8a7b7" : "#d8b27c";
        spark.style.fontSize = Math.random() * 15 + 10 + "px";

        document.body.appendChild(spark);

        const angle = Math.random() * Math.PI * 2;
        const distance = Math.random() * 180 + 80;
        const destinationX = Math.cos(angle) * distance;
        const destinationY = Math.sin(angle) * distance;

        const animation = spark.animate(
            [
                { transform: "translate(-50%, -50%) scale(0)", opacity: 0 },
                { transform: "translate(-50%, -50%) scale(1)", opacity: 1 },
                {
                    transform: `translate(calc(-50% + ${destinationX}px), calc(-50% + ${destinationY}px)) scale(0.3)`,
                    opacity: 0
                }
            ],
            {
                duration: 1400 + Math.random() * 700,
                easing: "cubic-bezier(.17,.67,.38,1)"
            }
        );

        animation.finished.then(() => spark.remove());

    }

}


/* =========================================================
   FIN
========================================================= */

console.log("Carta especial cargada correctamente.");
