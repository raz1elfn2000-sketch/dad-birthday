/* =========================================
   ФОТОГРАФИЯЛАР
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
   НАСТРОЙКИ
========================================= */

let currentPhoto = 0;

let autoSlide;

let musicPlaying = false;


/* =========================================
   МУЗЫКА
========================================= */

const music = new Audio("music/music.mp3");

music.loop = true;

music.volume = 0.45;


/* =========================================
   ЭЛЕМЕНТЫ СТРАНИЦЫ
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

const musicButton =
    document.getElementById("musicButton");

const finalMusicButton =
    document.getElementById("finalMusicButton");


/* =========================================
   НАЧАЛО ПОДАРКА
========================================= */

function startMemories() {

    /*
       Прячем первый экран
    */

    welcome.style.display = "none";


    /*
       Показываем фотографии
    */

    gallery.style.display = "flex";


    /*
       Прячем финал
    */

    finalScreen.style.display = "none";


    /*
       Показываем первую фотографию
    */

    showPhoto(0);


    /*
       Начинаем автоматическую смену
    */

    startAutoSlide();


    /*
       И самое главное —
       запускаем музыку после нажатия кнопки
    */

    music.play()
        .then(() => {

            musicPlaying = true;

            updateMusicButtons();

        })
        .catch((error) => {

            console.log(
                "Музыку не удалось запустить:",
                error
            );

        });

}


/* =========================================
   ПОКАЗ ФОТОГРАФИИ
========================================= */

function showPhoto(index) {

    if (index < 0) {

        index = photos.length - 1;

    }


    if (index >= photos.length) {

        index = 0;

    }


    currentPhoto = index;


    /*
       Плавно скрываем фотографию
    */

    mainPhoto.style.opacity = "0";

    mainPhoto.style.transform = "scale(0.98)";


    setTimeout(() => {

        mainPhoto.src =
            photos[currentPhoto];


        mainPhoto.onload = () => {

            mainPhoto.style.opacity = "1";

            mainPhoto.style.transform =
                "scale(1)";

        };

    }, 200);


    updateInterface();

}


/* =========================================
   ОБНОВЛЕНИЕ СЧЁТЧИКА
========================================= */

function updateInterface() {

    const number =
        currentPhoto + 1;


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
   СЛЕДУЮЩАЯ ФОТОГРАФИЯ
========================================= */

function nextPhoto() {

    /*
       Если сейчас 40-я фотография,
       дальше автоматически не переходим
       к первой.
    */

    if (currentPhoto === photos.length - 1) {

        clearInterval(autoSlide);

        return;

    }


    showPhoto(currentPhoto + 1);

    restartAutoSlide();

}


/* =========================================
   ПРЕДЫДУЩАЯ ФОТОГРАФИЯ
========================================= */

function previousPhoto() {

    showPhoto(currentPhoto - 1);

    restartAutoSlide();

}


/* =========================================
   АВТОМАТИЧЕСКАЯ СМЕНА
========================================= */

function startAutoSlide() {

    clearInterval(autoSlide);


    autoSlide = setInterval(() => {

        /*
           Если дошли до 40-й фотографии,
           останавливаем автоматическую смену.
        */

        if (currentPhoto >= photos.length - 1) {

            clearInterval(autoSlide);

            return;

        }


        showPhoto(currentPhoto + 1);

    }, 4500);

}


/* =========================================
   ПЕРЕЗАПУСК АВТОСЛАЙДА
========================================= */

function restartAutoSlide() {

    clearInterval(autoSlide);

    startAutoSlide();

}


/* =========================================
   ПОКАЗ ФИНАЛА
========================================= */

function showFinal() {

    /*
       Останавливаем смену фотографий
    */

    clearInterval(autoSlide);


    /*
       Прячем галерею
    */

    gallery.style.display = "none";


    /*
       Показываем финальное поздравление
    */

    finalScreen.style.display = "flex";


    /*
       Музыку НЕ останавливаем.
       Она продолжает играть.
    */

    window.scrollTo({

        top: 0,

        behavior: "smooth"

    });

}


/* =========================================
   МУЗЫКА ON / OFF
========================================= */

function toggleMusic() {

    if (musicPlaying) {

        music.pause();

        musicPlaying = false;

    } else {

        music.play()
            .then(() => {

                musicPlaying = true;

            })
            .catch((error) => {

                console.log(
                    "Не удалось включить музыку:",
                    error
                );

            });

    }


    updateMusicButtons();

}


/* =========================================
   ОБНОВЛЕНИЕ КНОПКИ МУЗЫКИ
========================================= */

function updateMusicButtons() {

    if (musicPlaying) {

        musicButton.textContent = "🔊";

        finalMusicButton.textContent = "🔊";

    } else {

        musicButton.textContent = "🔇";

        finalMusicButton.textContent = "🔇";

    }

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


    /*
       Слишком маленькое движение
       не считается свайпом.
    */

    if (Math.abs(difference) < 50) {

        return;

    }


    /*
       Свайп влево → следующее фото
    */

    if (difference > 0) {

        nextPhoto();

    }

    /*
       Свайп вправо → предыдущее фото
    */

    else {

        previousPhoto();

    }

}


/* =========================================
   КЛАВИАТУРА КОМПЬЮТЕРА
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
