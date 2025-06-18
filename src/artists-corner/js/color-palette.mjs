const randColorAPI = "https://x-colors.yurace.pro/api/random?number=4";

const colorDisplay = document.getElementById("color-display");

async function fetchRandomColors() {
    try {
        const response = await fetch(randColorAPI);
        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Error fetching color:", error)
    }
};

const moodPalettes = {
    calm: ["#87A96B", "#A8DADC", "#C7CEEA", "#F1FAEE", "#E9C46A"],
    creative: ["#00BFFF", "#FF4500", "#ADFF2F", "#9370DB", "#FF7F00"],
    energetic: ["#FF6B35", "#F7CA18", "#E91E63", "#8BC34A", "#2196F3"],
};

function getPalette() {
    const moodSelect = document.getElementById("moods");
    const selectedMood = moodSelect.value;
    const colors = moodPalettes[selectedMood];
    colorDisplay.innerHTML = "";

    colors.forEach(hex => {
        const colorBox = document.createElement('div');
        colorBox.style.backgroundColor = hex;
        colorBox.textContent = hex;
        colorBox.style.padding = '10px';
        colorBox.style.margin = '5px';
        colorBox.style.borderRadius = '5px';
        colorDisplay.appendChild(colorBox);
    });
}

export { fetchRandomColors, getPalette };