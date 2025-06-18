function savePrompt() {
    const prompt = document.getElementById("display").textContent;

    const prompts = JSON.parse(localStorage.getItem("artPrompts")) || [];
    prompts.push(prompt);

    localStorage.setItem("artPrompts", JSON.stringify(prompts));
}


export { savePrompt };