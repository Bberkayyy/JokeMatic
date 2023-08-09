const button = document.getElementById("button");
const audioElement = document.getElementById("audio");
const textElement = document.getElementById("joke-text");



//Disable/Enable Button
function toggleButton() {
  button.disabled = !button.disabled;
  if (button.disabled) {
    textJoke();
  } else {
    textElement.textContent = "Joke Text";
  }
}

//Passing Joke to VoiceRSS API

function tellMe(joke) {
  VoiceRSS.speech({
    key: "139469e9a78c498d94a28eacadc9f408",
    src: joke,
    hl: "en-us",
    v: "Linda",
    r: 0,
    c: "mp3",
    f: "44khz_16bit_stereo",
    ssml: false,
  });
}

//Get Jokes from Joke API
async function getJokes() {
  let joke = "";
  const apiURL =
    "https://v2.jokeapi.dev/joke/Any?blacklistFlags=nsfw,religious,political,racist,sexist,explicit";
  try {
    const response = await fetch(apiURL);
    const data = await response.json();
    if (data.setup) {
      joke = `${data.setup} ... ${data.delivery}`;
    } else {
      joke = data.joke;
    }
    //Text-to-Speech
    tellMe(joke);
    //Disable Button
    toggleButton();
    textJoke(joke);
  } catch (error) {
    console.log("Error!!", error);
  }
}

function textJoke(joke) {
  textElement.textContent = joke;
}

//Event Listeners
button.addEventListener("click", getJokes);
audioElement.addEventListener("ended", toggleButton);
