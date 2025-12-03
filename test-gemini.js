const { GoogleGenerativeAI } = require("@google/generative-ai");
const fs = require('fs');

async function test() {
    const envContent = fs.readFileSync('.env', 'utf8');
    const match = envContent.match(/GEMINI_API_KEY="([^"]+)"/);
    const key = match ? match[1] : null;

    console.log("Testing Key:", key ? key.substring(0, 5) + "..." : "Missing");

    if (!key) {
        console.error("Could not find GEMINI_API_KEY in .env");
        return;
    }

    // We can't easily list models with the SDK directly in this version without a model instance, 
    // so we'll try a raw fetch to the list endpoint.
    const url = `https://generativelanguage.googleapis.com/v1beta/models?key=${key}`;

    try {
        const response = await fetch(url);
        const data = await response.json();

        if (data.error) {
            console.error("Error listing models:", data.error);
        } else {
            console.log("Available Models:");
            if (data.models) {
                data.models.forEach(m => console.log(`- ${m.name}`));
            } else {
                console.log("No models found.");
            }
        }
    } catch (error) {
        console.error("Fetch error:", error.message);
    }
}

test();
