from pathlib import Path
from tensorflow.keras.models import load_model
import sklearn
from sklearn.model_selection import train_test_split
import pandas as pd
import numpy as np

# Absolute path to model.h5 file
BASE_PATH = Path(__file__).resolve().parents[3]
MODEL_PATH = BASE_PATH / "ml" / "models" / "SchneiderNNModel2000.h5"

# To load the model into memory when initializing the backend
model = load_model(MODEL_PATH)

DATA_PATH = BASE_PATH / "ml" / "data" / "dataset.csv"
df = pd.read_csv(DATA_PATH)
target_column = "target_variable"
Y = df[target_column]
X = df.drop(columns=[target_column, "id"])
X_train, X_test, Y_train, Y_test = train_test_split(X, Y, test_size=0.2)

y_hat = model.predict(X_test)

from sklearn.metrics import f1_score, accuracy_score
thresholds = np.linspace(0, 1, 101)
best_f1 = 0
best_t = 0

for t in thresholds:
    y_test_th = [0 if val < t else 1 for val in y_hat]
    score = f1_score(Y_test, y_test_th)
    if score > best_f1:
        best_f1 = score
        best_t = t

threshold = best_t
y_hat = [0 if val < best_t else 1 for val in y_hat]
acu = accuracy_score(Y_test, y_hat)
f1 = f1_score(Y_test, y_hat)
print("Best threshold: ", best_t)
print("Accuracy: ", acu)
print("F1: ", f1)