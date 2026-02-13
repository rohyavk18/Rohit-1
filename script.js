let day = 1;
let health = 100;
let energy = 100;
let credits = 50;
let trust = 50;

const storyElement = document.getElementById("story");
const choicesElement = document.getElementById("choices");

function updateStats() {
    document.getElementById("day").textContent = day;
    document.getElementById("health").textContent = health;
    document.getElementById("energy").textContent = energy;
    document.getElementById("credits").textContent = credits;
    document.getElementById("trust").textContent = trust;
}

function nextDay() {
    day++;
    energy -= 10;

    if (health <= 0 || energy <= 0 || credits <= 0 || trust <= 0) {
        storyElement.textContent = "You failed to survive the AI collapse.";
        choicesElement.innerHTML = "";
        return;
    }

    if (day > 7) {
        storyElement.textContent = "You survived the AI collapse. Humanity has hope.";
        choicesElement.innerHTML = "";
        return;
    }

    generateEvent();
}

function generateEvent() {
    const events = [
        {
            text: "A rogue AI drone scans your location.",
            options: [
                { text: "Hide", effect: () => { energy -= 15; trust += 5; } },
                { text: "Fight", effect: () => { health -= 20; trust += 10; } }
            ]
        },
        {
            text: "A survivor group offers you a trade.",
            options: [
                { text: "Trade 20 credits for supplies", effect: () => { credits -= 20; health += 10; } },
                { text: "Refuse", effect: () => { trust -= 10; } }
            ]
        },
        {
            text: "City power grid malfunction detected.",
            options: [
                { text: "Repair it", effect: () => { energy -= 20; trust += 15; } },
                { text: "Ignore it", effect: () => { trust -= 10; } }
            ]
        }
    ];

    const event = events[Math.floor(Math.random() * events.length)];

    storyElement.textContent = event.text;
    choicesElement.innerHTML = "";

    event.options.forEach(option => {
        const button = document.createElement("button");
        button.textContent = option.text;
        button.onclick = () => {
            option.effect();
            updateStats();
            nextDay();
        };
        choicesElement.appendChild(button);
    });
}

updateStats();
generateEvent();
