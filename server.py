from flask import Flask, request, render_template
from pydub import AudioSegment
import speech_recognition as sr
import os

# pip install flask
# pip pydub
# brew install ffmpeg

app = Flask(__name__)
    
@app.route("/")
def index():
	return render_template("index.html")

@app.route('/upload', methods=['POST'])
def upload_audio():
    audio_file = request.files["audio_data"]
    audio_file.save("./audio.webm")

    audio = AudioSegment.from_file("audio.webm", format="webm")
    audio.export("audio.wav", format="wav")
    os.remove("./audio.webm")


    recognizer = sr.Recognizer()
    with sr.AudioFile("audio.wav") as source:
        audio_data = recognizer.record(source)
        text = recognizer.recognize_google(audio_data)
        print(text)

    return text, 200

if __name__ == '__main__':
    app.run(debug=True)
