import { fetchRandomPrompt, fetchRandomAnimal, getRandomStyle } from "./prompts-styles.mjs";
import { fetchRandomColors, getPalette } from "./color-palette.mjs";
import { savePrompt } from "./saves.mjs";

const promptDisplay = document.getElementById("display");
const paletteDisplay = document.getElementById("palette-display");

function showRandomPrompt() {
    // console.log('showRandomPrompt triggered');

    fetchRandomPrompt().then(prompt => {
        promptDisplay.textContent = prompt;
    }).catch(err => {
        console.error('Prompt fetch failed:', err);
        promptDisplay.textContent = 'Something went wrong. Try again!';
    });
}

function showRandomStyle() {
    try {
        const style = getRandomStyle();
        promptDisplay.textContent = style;
    } catch(err){
        console.error('Prompt fetch failed:', err);
        promptDisplay.textContent = 'Something went wrong. Try again!';
    };
}

function setupPromptButton() {
    const promptBtn = document.getElementById("prompt-btn");
    if (promptBtn) {
        promptBtn.addEventListener('click', showRandomPrompt);
    }
}

function setupStyleButton() {
    const styleBtn = document.getElementById("style-btn");
    if (styleBtn) {
        styleBtn.addEventListener('click', showRandomStyle);
    }
}

function setupApplyButton() {
    const applyBtn = document.getElementById("apply");
    if (applyBtn) {
        applyBtn.addEventListener('click', onlyAnimals);
    }
}

function onlyAnimals() {
    const extraSelect = document.getElementById("prompt-cat");

    if (extraSelect.value == "animal") {
        fetchRandomAnimal().then(animalPrompt => {
            promptDisplay.textContent = animalPrompt;
        }).catch(error => {
            console.error("Error fetching animal prompt:", error);
            document.getElementById("prompt-display").textContent = "Couldn't fetch an animal prompt.";
        });
    }
}


function showRandomPalette() {

    fetchRandomColors().then(palette => {
        paletteDisplay.innerHTML = "";
        palette.forEach(color => {
            const colorBox = document.createElement("div");
            colorBox.className = "color";
            colorBox.style.backgroundColor = color.hex;
            colorBox.textContent = color.hex; // Display HEX value
            colorBox.style.padding = '20px';
            colorBox.style.margin = '5px';
            colorBox.style.borderRadius = '5px';
            paletteDisplay.appendChild(colorBox);
        })
    }).catch(err => {
        console.error('Palette fetch failed:', err);
        paletteDisplay.textContent = 'Something went wrong. Try again!';
    });
}

function setupPaletteButton() {
    const paletteBtn = document.getElementById("rand-palette");
    if (paletteBtn) {
        paletteBtn.addEventListener('click', showRandomPalette);
    }
}

function setupMoodButton() {
    const moodBtn = document.getElementById("show");
    if (moodBtn) {
        moodBtn.addEventListener('click', getPalette);
    }
}

function setupSavePromptButton() {
    const savePromptBtn = document.getElementById("savePrompt");
    if (savePromptBtn) {
        savePromptBtn.addEventListener('click', savePrompt);
    }
}

function showSavedPrompts() {
    const saveContainer = document.getElementById("saved-prompt-display");
    console.log(saveContainer);

    saveContainer.innerHTML = "";
    const prompts = JSON.parse(localStorage.getItem("artPrompts")) || [];

    if (prompts.length == 0) {
        saveContainer.textContent = "No saved Prompts yet.";
        return;
    }

    prompts.forEach((prompt) => {
        const promptEl = document.createElement("div");
        promptEl.className = "saved-prompt";
        promptEl.textContent = `${prompt}`;
        saveContainer.appendChild(promptEl);

    })
}

function setupSavePaletteButton() {
    const savePaletteBtn = document.getElementById("savePalette");
    if (savePaletteBtn) {
        console.log("Button connected!");
        savePaletteBtn.addEventListener('click', savePalette);
        console.log("listener attached");
    } else {
        console.warn("Save button not found!");
    }
}





export { setupPromptButton, setupStyleButton, setupApplyButton, setupPaletteButton, setupMoodButton, setupSavePromptButton, showSavedPrompts, setupSavePaletteButton };
  