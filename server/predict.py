# predict.py
import sys
import joblib
import json

# Load the trained model
model = joblib.load('esg.pkl')

# Get the features from command-line arguments
features = json.loads(sys.argv[1])

# Make prediction
prediction = model.predict([features])

# Return the prediction
print(prediction[0])  # Output the prediction as string
