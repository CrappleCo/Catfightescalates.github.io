const textArea = document.getElementById("textToConvert");
const convertBtn = document.getElementById("convertBtn");
const voiceSelect = document.getElementById("voiceSelect");

// Initialize speech synthesis
const speechSynth = window.speechSynthesis;

// Get available voices
const voices = speechSynth.getVoices();

// Populate voice options
voices.forEach((voice) => {
    const option = document.createElement("option");
    option.value = voice.name;
    option.textContent = voice.name;
    voiceSelect.appendChild(option);
});

// Convert text to speech
convertBtn.addEventListener("click", function () {
    const enteredText = textArea.value.trim();
    const error = document.querySelector(".error-para");

    if (!speechSynth.speaking && !enteredText.length) {
        error.textContent = "Nothing to Convert! Enter text in the text area.";
    } else if (!speechSynth.speaking && enteredText.length) {
        error.textContent = "";
        const newUtter = new SpeechSynthesisUtterance(enteredText);
        newUtter.voice = speechSynth.getVoices().find((voice) => voice.name === voiceSelect.value);
        speechSynth.speak(newUtter);
        convertBtn.textContent = "Sound is Playing...";
    }

    setTimeout(() => {
        convertBtn.textContent = "Play Converted Sound";
    }, 5000);
});
