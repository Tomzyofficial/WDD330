//Api url
const key = "QBeNgGbV0V1rLkd9FXP6Yg==yLxRscpzveIxNFgF";
const animalAPI = "https://api.api-ninjas.com/v1/animals";

const personAPI = "https://api.api-ninjas.com/v1/celebrity";



//Fetch the names of animals
async function fetchRandomAnimal() {
    const maxAttempts = 5;
    let data = [];

    for (let i = 0; i < maxAttempts; i++) {
        const alphabet = "abcdefghijklmnopqrstuvwxyz";
        const randChar = alphabet[Math.floor(Math.random() * alphabet.length)]
        const url = `${animalAPI}?name=${randChar}`;
        const response = await fetch(url, {
            headers: { "X-Api-Key": key }
        });

        if (response.ok) {
            data = await response.json();
            // console.log('Full API data:', data);
            if (data.length) break;
        }
    };

    if (!data.length) return "Imaginary Beast";

    const randAnimal = data[Math.floor(Math.random() * data.length)] || {};
    // console.log('Random animal object:', randAnimal);
    const name = randAnimal.characteristics?.common_name?.trim() || "Unknown Animal";

    return name;
}

async function fetchRandomPerson() {
    const maxAttempts = 5;
    let data = [];

    for (let i = 0; i < maxAttempts; i++) {
        const letters = "abcdefghijklmnopqrstuvwy".split("");
        const randLetter = letters[Math.floor(Math.random() * letters.length)]
        const url = `${personAPI}?name=${randLetter}`;
        const response = await fetch(url, {
            headers: { "X-Api-Key": key }
        });

        
        
        if (response.ok) {
            data = await response.json();
            data = data.filter(person =>
                Array.isArray(person.occupation) && person.occupation.length > 0
            );
            // console.log('Full API data:', data);
            if (data.length) break;
        }
    };

    if (data.length > 0) {
        const randCeleb = data[Math.floor(Math.random() * data.length)] || {};
        // console.log('Random animal object:', randAnimal);
        const occupation = randCeleb.occupation;
    
        let formattedOccupation = "Mystery Persona";
    
        if (Array.isArray(occupation) && occupation.length > 0) {
            const randomOccupation = occupation[Math.floor(Math.random() * occupation.length)];
    
            formattedOccupation = randomOccupation
                .split(' ')
                .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
                .join(' ');
        
        }
        return formattedOccupation;
    }  
    return "mystery Persona";
};

async function fetchRandomPrompt() {
    const source = Math.random() < 0.5 ? "animal" : "person";
    console.log('Prompt source:', source);

    if (source == "animal") {
        const animalName = await fetchRandomAnimal();
        return buildPrompt(animalName);
    } else {
        const personName = await fetchRandomPerson();
        return buildPrompt(personName);
    }
} 

function buildPrompt(subject) {
    const verbs = ["Dancing", "Jumping", "Floating", "Charging", "Observing", "Singing"];
    const places = ["in a forest", "at the beach", "in the desert", "in space", "on top of a building"];

    const randVerb = verbs[Math.floor(Math.random() * verbs.length)];
    const randPlace = places[Math.floor(Math.random() * places.length)];

    return `${randVerb} ${subject} ${randPlace}.`;

}

function getRandomStyle() {
    const styles = ["Impressionism", "Surrealism", "Cubism", "Art Deco", "Pop Art", "Minimalism", "Realism", "Hyperrealism", "Gothic", "Rococo", "Romantisism", "Street Art", "Graffiti", "Cyberpunk", "Steampunk", "Fantasy Illustration", "Low Poly", "Pixel Art", "Watercolor", "Photorealism", "Symbolism"];
    const randStyle = styles[Math.floor(Math.random() * styles.length)];

    return randStyle;
}

export { fetchRandomPrompt, fetchRandomAnimal, getRandomStyle };