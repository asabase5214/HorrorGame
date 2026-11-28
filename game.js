// Scenes

const scenes = {

    entrance: {

        image: "/HorrorPhotos/entrance.jpeg",

        text:
            "The trail disappears into the woods.",

        transition: "normal",

        choices: [
            {
                text: "Forward",
                nextScene: "path01"
            }
        ]

    },

    path01: {

        image: "HorrorPhotos/path01-1.jpeg",

        transition: "move",

        choices: [
            {
                text: "Forward",
                nextScene: "clearing"
            },

            {
                text: "Back",
                nextScene: "entrance"
            }
        ]

    },

    clearing: {
        image: "HorrorPhotos/clearing01.jpeg",

        text: "The trail splits into two paths.",

        transition: "normal",

        choices: [
            {
                image: "HorrorPhotos/path01-2.jpeg",
                label: "Left Path",
                nextScene: "left01"
            },

            {
                image: "HorrorPhotos/path01-3.jpeg",
                label: "Right Path",
                nextScene: "right01"
            }
        ]
    }

};



// DOM Elements

const startBtn = document.getElementById("start-btn");
const optionsBtn = document.getElementById("options-btn");
const creditsBtn = document.getElementById("credits-btn");
const titleScreen = document.getElementById("title-screen");
const gameScreen = document.getElementById("game-screen");

const sceneImage = document.getElementById("scene-image");
const sceneText = document.getElementById("scene-text");
const choicesDiv = document.getElementById("choices");

const modal = document.getElementById("modal");
const modalTitle = document.getElementById("modal-title");
const modalBody = document.getElementById("modal-body");
const closeModal = document.getElementById("close-modal");

const staticScreen = document.getElementById("static-screen");

const clickSound = new Audio("Audio/mouseClick.mp3");
clickSound.volume = 0.6;

const fade = document.getElementById("fade");

const sceneScreen = document.getElementById("scene-screen");



// Audio

let audio = new Audio('Audio/HorrorGameThemeTest.mp3');
audio.loop = true;

function playLoop() {
    audio.play().catch(e => console.error(e));
}
document.body.addEventListener('click', playLoop);



// Event Listeners

startBtn.addEventListener("click", () => {

    clickSound.currentTime = 0;
    clickSound.play();

    titleScreen.classList.add("hidden");

    gameScreen.classList.remove("hidden");

    transitionToScene("entrance");
    document.getElementById("scene-screen").requestFullscreen();
});

closeModal.addEventListener("click", () => {

    clickSound.currentTime = 0;
    clickSound.play();

    modal.classList.remove("show");

    setTimeout(() => {
        modal.classList.add("hidden");
    }, 400);

});

creditsBtn.addEventListener("click", () => {

    clickSound.currentTime = 0;
    clickSound.play();

    modalTitle.textContent = "Credits";

    modalBody.innerHTML = `
        <p>credits</p>
    `;

    modal.classList.remove("hidden");
    modal.classList.add("show");

});

optionsBtn.addEventListener("click", () => {

    clickSound.currentTime = 0;
    clickSound.play();

    modalTitle.textContent = "Options";

    modalBody.innerHTML = `
        <p>Music Volume</p>

        <input type="range" min="0" max="100" value="30" id="volume-slider">
        `;

    modal.classList.remove("hidden");
    modal.classList.add("show");

    const slider = document.getElementById("volume-slider");

    slider.addEventListener("input", () => {

        audio.volume =
            slider.value / 100;

    });

});


// Functions

function transitionToScene(sceneId) {

    if (sceneId === "title") {
        returnToTitle();
        return;
    }

    const scene = scenes[sceneId];

    switch(scene.transition) {

        case "jumpscare":
            jumpscareTransition(sceneId);
            break;

        case "longPause":
            longPauseTransition(sceneId);
            break;

        case "quick":
            quickTransition(sceneId);
            break;

        case "longFade":
            longFadeTransition(sceneId);
            break;

        case "static":
            staticTransition(sceneId);
            break;

        case "glimpse":
            glimpseTransition(sceneId, scene.glimpseImage);
            break;

        case "reverseFade":
            reverseFadeTransition(sceneId);
            break;

        case "drift":
            driftTransition(sceneId);
            break;

        case "echo":
            echoTransition(sceneId);
            break;

        case "normal":
        default:
            normalTransition(sceneId);
            break;
    }
}

function normalTransition(sceneId) {

    fade.classList.add("active");

    setTimeout(() => {

        loadScene(sceneId);

        fade.classList.remove("active");

    }, 800);

}

function loadScene(sceneId) {

    const scene = scenes[sceneId];
    
    sceneText.classList.remove("fade-visible");
    sceneText.classList.add("fade-hidden");

    choicesDiv.classList.remove("fade-visible");
    choicesDiv.classList.add("fade-hidden");

    sceneScreen.style.backgroundImage = `url(${scene.image})`;

    sceneText.textContent = scene.text;

    choicesDiv.innerHTML = "";

    scene.choices.forEach(choice => {

        if (choice.image) {

            const card = document.createElement("div");

            card.classList.add("path-card");

            card.innerHTML = `
                <img src="${choice.image}">
                <p>${choice.label}</p>
            `;

            card.addEventListener("click", () => {
                transitionToScene(choice.nextScene);
            });

            choicesDiv.appendChild(card);

        } else {

            const button = document.createElement("button");

            button.textContent = choice.text;

            button.addEventListener("click", () => {
                transitionToScene(choice.nextScene);
            });

            choicesDiv.appendChild(button);

        }

    });

    setTimeout(() => {
        sceneText.classList.remove("fade-hidden");
        sceneText.classList.add("fade-visible");
    }, 300);

    setTimeout(() => {
        choicesDiv.classList.remove("fade-hidden");
        choicesDiv.classList.add("fade-visible");
    }, 600);
}

function returnToTitle() {

    fade.classList.add("active");

    setTimeout(() => {

        gameScreen.classList.add("hidden");
        titleScreen.classList.remove("hidden");

        fade.classList.remove("active");

    }, 800);

}

// Special Functions

function jumpscareTransition(sceneId) {

    fade.classList.add("active");

    setTimeout(() => {

        loadScene(sceneId);

        fade.style.transition = "none";
        fade.classList.remove("active");

        setTimeout(() => {
            fade.style.transition = "opacity 0.8s ease";
        }, 10);

    }, 2500);

}

function longPauseTransition(sceneId) {

    fade.classList.add("active");

    setTimeout(() => {

        loadScene(sceneId);

        fade.classList.remove("active");

    }, 2500);

}

function quickTransition(sceneId) {

    fade.classList.add("active");

    setTimeout(() => {

        loadScene(sceneId);

        fade.classList.remove("active");

    }, 300);

}

function longFadeTransition(sceneId) {

    fade.style.transition = "opacity 2s ease";

    fade.classList.add("active");

    setTimeout(() => {

        loadScene(sceneId);

        fade.classList.remove("active");

        setTimeout(() => {
            fade.style.transition = "opacity 0.8s ease";
        }, 2000);

    }, 2000);

}

function staticTransition(sceneId) {

    setTimeout(() => {

        fade.classList.remove("active");

        setTimeout(() => {

            staticScreen.style.opacity = "1";

            setTimeout(() => {

                staticScreen.style.opacity = "0";

                loadScene(sceneId);

            }, 300);

        }, 800);

    }, 800);

}

function glimpseTransition(sceneId, glimpseImage) {

    const glimpse =
        document.getElementById("glimpse-screen");

    glimpse.style.backgroundImage =
        `url(${glimpseImage})`;

    glimpse.style.opacity = "1";

    setTimeout(() => {

        glimpse.style.opacity = "0";

        loadScene(sceneId);

    }, 1000);

}

function reverseFadeTransition(sceneId) {

    const whiteFade = document.getElementById("white-fade");

    console.log("reverse fade");
    console.log(whiteFade);

    setTimeout(() => {

        whiteFade.style.opacity = "1";
        console.log(
            window.getComputedStyle(whiteFade).opacity
        );

        setTimeout(() => {

            loadScene(sceneId);

            whiteFade.style.opacity = "0";

        }, 1500);

    }, 1000);

}

function driftTransition(sceneId) {

    fade.classList.add("active");

    setTimeout(() => {

        loadScene(sceneId);

    }, 3000);

    setTimeout(() => {

        fade.classList.remove("active");

    }, 3800);

}

function echoTransition(sceneId) {

    fade.classList.add("active");

    setTimeout(() => {

        loadScene(sceneId);

        fade.classList.remove("active");

        setTimeout(() => {

            fade.classList.add("active");

            setTimeout(() => {

                fade.classList.remove("active");

            }, 150);

        }, 100);

    }, 800);

}
