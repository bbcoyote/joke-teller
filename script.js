const button = document.getElementById("button");
const audioElement = document.getElementById("audio");

// Disable/enable button
function toggleButton() {
  button.disabled = !button.disabled;
}

// Passing our joke to our voice rss API
function tellMe(joke) {
  VoiceRSS.speech({
    key: "b1611c72b0494c369f945e62d4ffcc92",
    src: joke,
    hl: "en-us",
    v: "Linda",
    r: 0,
    c: "mp3",
    f: "44khz_16bit_stereo",
    ssml: false,
  });
}

// Get Jokes from Joke API
async function getJokes() {
  let joke = "";
  const apiUrl =
    "https://v2.jokeapi.dev/joke/Miscellaneous,Dark,Spooky?blacklistFlags=nsfw,racist";
  try {
    const response = await fetch(apiUrl);
    const data = await response.json();
    if (data.setup) {
      joke = `${data.setup} ... ${data.delivery}`;
    } else {
      joke = data.joke;
    }
    // Text-to-Speech
    tellMe(joke);
    // disable button
    toggleButton();
    tellMe(joke);
  } catch (error) {
    // Catch Error here
    console.log("Whoops", error);
  }
}

// Event Listeners
button.addEventListener("click", getJokes);
audioElement.addEventListener("ended", toggleButton);
