/* =========================================
   ФОТО
========================================= */

const photos = [

    "photos/01.jpg",
    "photos/02.jpg",
    "photos/03.jpg",
    "photos/04.jpg",
    "photos/05.jpg",
    "photos/06.jpg",
    "photos/07.jpg",
    "photos/08.jpg",
    "photos/09.jpg",
    "photos/10.jpg",

    "photos/11.jpg",
    "photos/12.jpg",
    "photos/13.jpg",
    "photos/14.jpg",
    "photos/15.jpg",
    "photos/16.jpg",
    "photos/17.jpg",
    "photos/18.jpg",
    "photos/19.jpg",
    "photos/20.jpg",

    "photos/21.jpg",
    "photos/22.jpg",
    "photos/23.jpg",
    "photos/24.jpg",
    "photos/25.jpg",
    "photos/26.jpg",
    "photos/27.jpg",
    "photos/28.jpg",
    "photos/29.jpg",
    "photos/30.jpg",

    "photos/31.jpg",
    "photos/32.jpg",
    "photos/33.jpg",
    "photos/34.jpg",
    "photos/35.jpg",
    "photos/36.jpg",
    "photos/37.jpg",
    "photos/38.jpg",
    "photos/39.jpg",
    "photos/40.jpg"

];


/* =========================================
   ПЕРЕМЕННЫЕ
========================================= */

let currentPhoto = 0;
let autoSlide = null;
let musicPlaying = false;


/* =========================================
   ЭЛЕМЕНТЫ
========================================= */

const welcome =
    document.getElementById("welcome");

const gallery =
    document.getElementById("gallery");

const finalScreen =
    document.getElementById("final");

const mainPhoto =
    document.getElementById("mainPhoto");

const counter =
    document.getElementById("counter");

const photoNumber =
    document.getElementById("photoNumber");

const progressBar =
    document.getElementById("progressBar");

const finishButton =
    document.getElementById("finishButton");

const music =
    document.getElementById("backgroundMusic");

const musicButtons =
    document.querySelectorAll(".music-button");


/* =========================================
   НАЧАЛО
========================================= */

function startMemories() {

    welcome.style.display = "none";

    gallery.style.display = "flex";

    finalScreen.style.display = "none";

    currentPhoto = 0;

    finishButton.style.display = "none";

    showPhoto(currentPhoto);

    startAutoSlide();


    /* ================================
       ЗАПУСК МУЗЫКИ
    ================================= */

    music.volume = 0.45;

    music.currentTime = 0;

    const playPromise = music.play();

    if (playPromise !== undefined) {

        playPromise
            .then(() => {

                musicPlaying = true;

                updateMusicButton();

                console.log("Музыка запущена");

            })
            .catch((error) => {

                musicPlaying = false;

                updateMusicButton();

                console.error(
                    "Не удалось запустить музыку:",
                    error
                );

            });

    }

}


/* =========================================
   ПОКАЗ ФОТО
========================================= */

function showPhoto(index) {

    if (index < 0) {
        index = 0;
    }

    if (index >= photos.length) {
        index = photos.length - 1;
    }

    currentPhoto = index;


    /* Анимация */

    mainPhoto.style.opacity = "0";

    mainPhoto.style.transform = "scale(0.98)";


    setTimeout(() => {

        mainPhoto.src = photos[currentPhoto];

        mainPhoto.onload = () => {

            mainPhoto.style.opacity = "1";

            mainPhoto.style.transform = "scale(1)";

        };

    }, 200);


    updateInterface();


    /* =================================
       ПРОВЕРКА 40-Й ФОТОГРАФИИ
    ================================= */

    if (currentPhoto === photos.length - 1) {

        clearInterval(autoSlide);

        finishButton.style.display =
            "inline-block";

    } else {

        finishButton.style.display =
            "none";

    }

}


/* =========================================
   ИНТЕРФЕЙС
========================================= */

function updateInterface() {

    const number = currentPhoto + 1;

    const formattedNumber =
        String(number).padStart(2, "0");


    counter.textContent =
        `${formattedNumber} / ${photos.length}`;


    photoNumber.textContent =
        formattedNumber;


    const progress =
        (number / photos.length) * 100;


    progressBar.style.width =
        `${progress}%`;

}


/* =========================================
   NEXT
========================================= */

function nextPhoto() {

    if (currentPhoto >= photos.length - 1) {

        return;

    }

    showPhoto(currentPhoto + 1);

    restartAutoSlide();

}


/* =========================================
   PREVIOUS
========================================= */

function previousPhoto() {

    if (currentPhoto > 0) {

        showPhoto(currentPhoto - 1);

        restartAutoSlide();

    }

}


/* =========================================
   АВТОСЛАЙД
========================================= */

function startAutoSlide() {

    clearInterval(autoSlide);

    autoSlide = setInterval(() => {

        if (currentPhoto >= photos.length - 1) {

            clearInterval(autoSlide);

            return;

        }

        showPhoto(currentPhoto + 1);

    }, 4500);

}


/* =========================================
   RESTART AUTO SLIDE
========================================= */

function restartAutoSlide() {

    clearInterval(autoSlide);

    startAutoSlide();

}


/* =========================================
   ФИНАЛ
========================================= */

function showFinal() {

    /*
       Финал разрешён ТОЛЬКО
       после 40-й фотографии.
    */

    if (currentPhoto !== photos.length - 1) {

        return;

    }


    clearInterval(autoSlide);


    gallery.style.display = "none";

    finalScreen.style.display = "flex";


    /*
       Музыку НЕ останавливаем.
    */

    updateMusicButton();


    window.scrollTo({

        top: 0,

        behavior: "smooth"

    });

}


/* =========================================
   МУЗЫКА
========================================= */

function toggleMusic() {

    if (music.paused) {

        music.play()
            .then(() => {

                musicPlaying = true;

                updateMusicButton();

            })
            .catch((error) => {

                console.error(
                    "Ошибка запуска музыки:",
                    error
                );

            });

    } else {

        music.pause();

        musicPlaying = false;

        updateMusicButton();

    }

}


/* =========================================
   ИКОНКА МУЗЫКИ
========================================= */

function updateMusicButton() {

    musicButtons.forEach(button => {

        if (!music.paused) {

            button.textContent = "🔊";

        } else {

            button.textContent = "🔇";

        }

    });

}


/* =========================================
   СВАЙП НА ТЕЛЕФОНЕ
========================================= */

let touchStartX = 0;

let touchEndX = 0;


mainPhoto.addEventListener(
    "touchstart",
    function(event) {

        touchStartX =
            event.changedTouches[0].screenX;

    }
);


mainPhoto.addEventListener(
    "touchend",
    function(event) {

        touchEndX =
            event.changedTouches[0].screenX;

        handleSwipe();

    }
);


function handleSwipe() {

    const difference =
        touchStartX - touchEndX;


    if (Math.abs(difference) < 50) {

        return;

    }


    if (difference > 0) {

        nextPhoto();

    } else {

        previousPhoto();

    }

}


/* =========================================
   КЛАВИАТУРА
========================================= */

document.addEventListener(
    "keydown",
    function(event) {

        if (event.key === "ArrowRight") {

            nextPhoto();

        }


        if (event.key === "ArrowLeft") {

            previousPhoto();

        }

    }
);


/* =========================================
   НАЧАЛЬНОЕ СОСТОЯНИЕ
========================================= */

updateMusicButton();


