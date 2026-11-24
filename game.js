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
        ]
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
        ]
    },

    ending1: {
        image: "Test (1080 x 1350 px) (1920 x 1920 px).png",

        text: "Ending 1",

        choices: [
            {
                text: "Try Again",
                nextScene: "title"
            }
        ]
    }
};


const startBtn = document.getElementById("start-btn");
const titleScreen = document.getElementById("title-screen");
const gameScreen = document.getElementById("game-screen");

const sceneImage = document.getElementById("scene-image");
const sceneText = document.getElementById("scene-text");
const choicesDiv = document.getElementById("choices");

const fade = document.getElementById("fade");

const sceneScreen = document.getElementById("scene-screen");


startBtn.addEventListener("click", () => {

    titleScreen.classList.add("hidden");

    gameScreen.classList.remove("hidden");

    transitionToScene("start");
    document.getElementById("scene-screen").requestFullscreen();
});

function transitionToScene(sceneId) {

    fade.classList.add("active");

    if (sceneId === "title") {
        returnToTitle();
        return;
    }

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

        // DON'T fade back in yet

    }, 1500); // longer pause

    setTimeout(() => {

        fade.classList.remove("active");

    }, 1600); // image appears almost instantly

}

function returnToTitle() {

    fade.classList.add("active");

    setTimeout(() => {

        gameScreen.classList.add("hidden");
        titleScreen.classList.remove("hidden");

        fade.classList.remove("active");

    }, 800);
}
