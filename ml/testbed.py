# import packages
import pandas as pd
import tensorflow as tf
import sklearn
from sklearn.model_selection import train_test_split
import numpy as np

# read dataset
df = pd.read_csv('data/dataset.csv')

# get target variable (Y) and model variables (X)
target_column = "target_variable"
Y = df[target_column]
X = df.drop(columns=[target_column, "id"])
X_train, X_test, Y_train, Y_test = train_test_split(X, Y, test_size=0.2)

from tensorflow.keras.models import load_model

model = load_model('models/SchneiderNNModel.h5')
y_hat = model.predict(X_test)

from sklearn.metrics import accuracy_score
from sklearn.metrics import f1_score
thresholds = np.linspace(0, 1, 101)
best_f1 = 0
best_t = 0

for t in thresholds:
    y_test_th = [0 if val < t else 1 for val in y_hat]
    score = f1_score(Y_test, y_test_th)
    if score > best_f1:
        best_f1 = score
        best_t = t

y_hat = [0 if val < best_t else 1 for val in y_hat]
acu = accuracy_score(Y_test, y_hat)
f1 = f1_score(Y_test, y_hat)
print("Best threshold: ", best_t)
print("Accuracy: ", acu)
print("F1: ", f1)
