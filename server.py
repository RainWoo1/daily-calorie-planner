from flask import Flask, request, render_template
from pydub import AudioSegment
import speech_recognition as sr
import os
import spacy
import json
import requests

# pip install flask
# pip pydub
# brew install ffmpeg

app = Flask(__name__)

@app.route("/")
def index():
    return render_template("index.html")

@app.route('/upload', methods=['POST'])
def upload_calories():
    audio_file = request.files["audio_data"]
    audio_file.save("./audio.webm")
    audio = AudioSegment.from_file("audio.webm", format="webm")
    audio.export("audio.wav", format="wav")
    
    os.remove("./audio.webm")


    app_id = "d5fd616b"
    app_key = "5c06fb4f5bd545920f9d620b5a5a63d4"

    sentence = convert_audio_to_text()
    queries = get_food(sentence)
    queries_for_nutrients = auto_complete_api_request(queries, app_id, app_key)
    calories_information, total_calories = calory_api_request(queries_for_nutrients, queries, app_id, app_key)

    print(calories_information, total_calories)
    calories_text = append_text_calories(sentence, calories_information, total_calories)

    return calories_text, 200

def convert_audio_to_text():
    recognizer = sr.Recognizer()
    sentence = []

    with sr.AudioFile("audio.wav") as source:
        audio_data = recognizer.record(source)
        text = recognizer.recognize_google(audio_data)
        text = text.lower()
        sentence.append(text)
        print(text)
    
    return sentence

def get_food(sentence):
    nlp = spacy.load("./Spacy_fine_tuned_NER_for_Food")

    queries = []
    for text in sentence:
        doc = nlp(text)
        for ent in doc.ents:
            print(ent.text, ent.label_)
            queries.append(ent.text)

    return queries

def auto_complete_api_request(queries, app_id, app_key):
    queries_for_nutrients = []

    for query in queries:
        url = "https://trackapi.nutritionix.com/v2/search/instant/?query=" + query
        headers = {
            "Content-Type": "application/json",
            "x-app-id": app_id,
            "x-app-key": app_key
        }

        response = requests.get(url, headers=headers)

        if response.status_code != 200:
            raise Exception(f"Error: {response.status_code}")
        else:
            response_json = response.json()
            branded_food = 0   # check if we found the same food name as query in common food, if not, we use the first element of branded foods
            
            if "common" in response_json:
                for common in response_json["common"]:
                    if common["food_name"].lower() == query.lower(): # if there's a name matching
                        branded_food = 1
                        print(common["food_name"])
                        queries_for_nutrients.append(common["food_name"])
                        break

            if branded_food == 0 and "branded" in response_json:
                if response_json["branded"]:
                    print(response_json["branded"][0]["food_name"]) # pop the first element of branded food
                    queries_for_nutrients.append(response_json["branded"][0]["food_name"])

    return queries_for_nutrients

def calory_api_request(queries_for_nutrients, queries, app_id, app_key):
    calories_information = [] # have {query, calories}
    index = 0
    total_calories = 0

    url = "https://trackapi.nutritionix.com/v2/natural/nutrients"
    headers = {
        "Content-Type": "application/json",
        "x-app-id": app_id,
        "x-app-key": app_key
    }
    for query_for_nutrients in queries_for_nutrients:
        body = {
            "query": query_for_nutrients
        }

        response = requests.post(url, headers=headers, data=json.dumps(body))

        # check if the key "foods" exists in the JSON response
        if "foods" in response.json():
            sum_calories = 0
            for food in response.json()["foods"]:
                print(food["food_name"] + ": " + str(food["nf_calories"]) + " calories")
                sum_calories += food["nf_calories"]

            total_calories += sum_calories
            calories_information.append({queries[index]: sum_calories})
            index = index + 1
        else:
            print("No foods found for query:", query_for_nutrients)

    return calories_information, total_calories

def append_text_calories(sentence, calories_information, total_calories):
    full_text = ""
    for text in sentence:
        full_text += text.capitalize() + ";"
    full_text += ";"

    for food in calories_information:
        for key, value in food.items():
            full_text += key.capitalize() + ": " + str(round(value, 2)) + " calories;"
    full_text += ";"

    full_text += str(round(total_calories, 2)) + " calories"

    return full_text

if __name__ == '__main__':
    app.run(debug=True)
