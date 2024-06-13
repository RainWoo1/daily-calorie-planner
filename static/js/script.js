document.addEventListener("DOMContentLoaded", () => {
    main();
});

function main() {
    const record_button = document.querySelector(".record-button");
    const speech_to_text = document.querySelector(".speech-to-text");
    
    var mediaRecorder;
    var audioChunks = [];
    
    navigator.mediaDevices.getUserMedia({
        audio: true
    })
    .then(stream => {
        mediaRecorder = new MediaRecorder(stream);
        mediaRecorder.ondataavailable = e => {
            audioChunks.push(e.data);
            if (mediaRecorder.state == "inactive") {
                var blob = new Blob(audioChunks, {
                    type: "audio/webm"
                });
                var form_data = new FormData();
                form_data.append("audio_data", blob);
                fetch('/upload', {
                    method: 'POST',
                    body: form_data
                })
                .then(response => {
                    if (!response.ok) {
                        throw new Error('Network response was not ok');
                    }
                    return response.text();
                })
                .then(data => {
                    console.log('Response from server:', data);
                    speech_to_text.textContent = data;
                })
                .catch(error => {
                    console.error('Error uploading file:', error);
                });
            }
        }
    });
    
    record_button.onclick = () => {
        if (record_button.textContent == "Start Recording") {
            record_button.textContent = "Stop Recording";
            audioChunks = [];
            mediaRecorder.start();
        }
        else {
            record_button.textContent = "Start Recording";
            mediaRecorder.stop();
        }
    };
}
