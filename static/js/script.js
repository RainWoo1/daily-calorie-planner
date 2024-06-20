document.addEventListener("DOMContentLoaded", () => {
    main();
});



function main() {
    const record_button = document.querySelector(".record-button");
    const sentence = document.querySelector(".sentence");
    const food_calories = document.querySelector(".food-calories");
    const total_calories = document.querySelector(".total-calories");
    
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
                    split_data = data.split(";;")
                    sentence.textContent = split_data[0];

                    foods = split_data[1].split(";");
                    for(var i = 0; i < foods.length; i++) {
                        var newDiv = document.createElement("div");
                        if (foods[i] != "") {
                            newDiv.textContent = foods[i];
                        }
                        food_calories.appendChild(newDiv);
                    }

                    total_calories.textContent = split_data[2];
                })
                .catch(error => {
                    console.error('Error uploading file:', error);
                });
            }
        }
    });
    
    record_button.onclick = () => {
        if (record_button.textContent == "Start Recording") {
            sentence.innerHTML = "";
            food_calories.innerHTML = "";
            total_calories.innerHTML = "";

            record_button.textContent = "Stop Recording";
            record_button.style.backgroundColor = "#ef2929";

            audioChunks = [];
            mediaRecorder.start();
        }
        else {
            record_button.textContent = "Start Recording";
            record_button.style.backgroundColor = "#007bff";

            mediaRecorder.stop();
        }
    };
}
