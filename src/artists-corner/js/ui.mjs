import { setupPromptButton, setupStyleButton, setupApplyButton, setupPaletteButton, setupMoodButton, setupSavePromptButton, showSavedPrompts, setupSavePaletteButton } from "./display.mjs";

document.addEventListener('DOMContentLoaded', () => {
    setupPromptButton();
    setupStyleButton();
    setupApplyButton();
    setupPaletteButton();
    setupMoodButton();
    setupSavePromptButton();
    showSavedPrompts();
    setupSavePaletteButton();
});