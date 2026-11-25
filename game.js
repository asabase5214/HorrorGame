// Scenes

const scenes = {

    start: {
        image: "Test.png",
        text: "First choice",
        choices: [
            {
                text: "Choice 1",
            nextScene: "scene1"
        },
            {
                text: "Choice 2",
            nextScene: "ending1"
        }
        ],
        transition: "normal",
    },

    scene1: {
        image: "Test (1080 x 1350 px).png",
        text: "Second choice",
        choices: [
            {
                text: "Choice A",
                nextScene: "start"
            },
            {
                text: "Choice B",
                nextScene: "start"
            }
        ],
        transition: "jumpscare"
    },

    ending1: {
        image: "Test (1080 x 1350 px) (1920 x 1920 px).png",
        text: "Ending 1",
        choices: [
            {
                text: "Try Again",
                nextScene: "title"
            }
        ],
        transition: "normal"
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

const clickSound = new Audio("mouseClick.mp3");
clickSound.volume = 0.6;

const fade = document.getElementById("fade");

const sceneScreen = document.getElementById("scene-screen");



// Audio

let audio = new Audio('HorrorGameThemeTest.mp3');
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

    transitionToScene("start");
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

function normalTransition(sceneId) {

    fade.classList.add("active");

    setTimeout(() => {

        loadScene(sceneId);

        fade.classList.remove("active");

    }, 800);

}

function transitionToScene(sceneId) {

    fade.classList.add("active");

    if (sceneId === "title") {
        returnToTitle();
        return;
    }

    const scene = scenes[sceneId];

    switch(scene.transition) {

        case "jumpscare":
            jumpscareTransition(sceneId);
            break;

        case "normal":
        default:
            normalTransition(sceneId);
            break;
    }

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

        const button = document.createElement("button");

        button.textContent = choice.text;

        button.addEventListener("click", () => {
            transitionToScene(choice.nextScene);
        });

        choicesDiv.appendChild(button);
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

function returnToTitle() {

    fade.classList.add("active");

    setTimeout(() => {

        gameScreen.classList.add("hidden");
        titleScreen.classList.remove("hidden");

        fade.classList.remove("active");

    }, 800);

}
