# Daily Calorie Planner
Transform the way you track your diet with Daily Calorie Planner, the innovative app that turns your spoken words into a detailed dietary history. Simply speak about your meals—whether it's a hearty breakfast, a light lunch, a quick snack, or an extravagant dinner—and let Daily Calorie Planner handle the rest. Using advanced speech-to-text technology, our app captures your food descriptions and breaks them down into individual components. It then analyzes the nutritional content of each ingredient, providing you with a comprehensive summary of your daily calorie intake. Additionally, it suggests the types of food you need to balance your meals throughout the day.

### How It Works
### Step 1: Speech-to-Text Conversion

We use the Google Speech-to-Text API to convert your spoken words into text, which is then used in the subsequent steps.
### Step 2: Text Processing and Information Extraction

We utilize the spaCy library with pre-trained Named Entity Recognition (NER) models and custom entity recognition training to accurately identify and extract food items and quantities from the text.
### Step 3: Mapping Food Items to Calorie Information

After extracting the food items and their quantities, we map these to their respective calorie values using the Nutritionix API, a commercial API that offers comprehensive nutritional data for various foods.
Embrace effortless dietary tracking and balanced meal planning with Daily Calorie Planner, your personal nutrition assistant!
