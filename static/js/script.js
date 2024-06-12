document.addEventListener("DOMContentLoaded", () => {
    var record_button = document.querySelector(".record-button");
    var audio_container = document.querySelector(".audioContainer");

    var mediaRecorder;
    var audioChunks = [];

    record_button.addEventListener("click", async () => {
        if (record_button.textContent == "Start Recording") {
            var stream = await navigator.mediaDevices.getUserMedia({ audio: true });
            mediaRecorder = new MediaRecorder(stream);

            mediaRecorder.start();
            record_button.textContent = "Stop Recording";

            mediaRecorder.ondataavailable = event => {
                audioChunks.push(event.data);
            };

            mediaRecorder.onstop = () => {
                var audioBlob = new Blob(audioChunks, { type: "audio/wav" });
                var audioUrl = URL.createObjectURL(audioBlob);

                var audio = document.createElement("audio");
                audio.controls = true;
                audio.src = audioUrl;

                audio_container.appendChild(audio);

                var formData = new FormData();
                formData.append("audio", audioBlob, "recording.wav");

                fetch("/upload", {
                    method: "POST",
                    body: formData
                })
                .then(response => {
                    if (response.ok) {
                        console.log("Audio file sent successfully");
                    } else {
                        console.error("Error sending audio file:", response.statusText);
                    }
                })
                .catch(error => {
                    console.error("Error sending audio file:", error);
                });

                audioChunks = [];
            };
        } else {
            mediaRecorder.stop();
            record_button.textContent = "Start Recording";
        }
    });
});
