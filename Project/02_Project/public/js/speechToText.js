// Getting DOM Here.
const startRecording = document.querySelector(".btn-start");
const stopRecording = document.querySelector(".btn-end");
const output = document.querySelector(".output");

// Getting SpeechRecognition And Other Related Things  Here.
// Note : below we need to use "var" keyword not const
var SpeechRecognition = SpeechRecognition || webkitSpeechRecognition;

// Initializing SpeechRecognition Here.
const recognition = new SpeechRecognition();

// Setting Up  few other properties of the recognition instance before we move on
recognition.continuous = true;
recognition.lang = "en-US";
recognition.interimResults = false;
recognition.maxAlternatives = 1;

// Adding Event Handlers Here.
startRecording.addEventListener("click", () => {
  recognition.start();
  console.log("Ready to Receive Command");
});

stopRecording.addEventListener("click", () => {
  recognition.stop();
});

// Getting Result Here.
recognition.onresult = (event) => {
  let data = event.results[0][0].transcript;
  // console.log(output.textContent);
  output.textContent = data;
  recognition.stop();
};

// On Speech End
recognition.onspeechend = () => {
  recognition.stop();
};

// On No Match
recognition.onnomatch = (event) => {
  output.textContent = "I didnt recognise.";
};

// Error Handling Here
recognition.onerror = (event) => {
  output.textContent = "Error occurred in recognition: " + event.error;
};
