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

# import ML dependencies
from tensorflow.keras.models import Sequential, load_model
from tensorflow.keras.layers import Dense
from sklearn.metrics import accuracy_score

# create Neural Network with sequential model and add two dense hidden layers
model = Sequential()
model.add(Dense(units=32, activation='relu', input_shape=(15,)))
model.add(Dense(units=16, activation='relu'))
model.add(Dense(units=1, activation='sigmoid'))

# use adam optimizer and compile for binary classification
adam = tf.keras.optimizers.Adam(learning_rate=0.001)
model.compile(loss='binary_crossentropy', optimizer=adam, metrics=["accuracy"])

# train model with epochs
model.fit(X_train, Y_train, epochs=2000)

# prediction with test data
y_hat = model.predict(X_test)
# make prediction with training data to evaluate learning
# accuracy, this does not necessarily reflect actual score
y_hat_train = model.predict(X_train)


# calculate score metrics: accuracy and f1
from sklearn.metrics import f1_score, confusion_matrix, ConfusionMatrixDisplay

# calculate optimal threshold by brute force
thresholds = np.linspace(0, 1, 101)
best_f1 = 0
best_t = 0

for t in thresholds:
    y_test_th = [0 if val < t else 1 for val in y_hat]
    score = f1_score(Y_test, y_test_th)
    if score > best_f1:
        best_f1 = score
        best_t = t

# apply optimal threshold
y_hat = [0 if val < best_t else 1 for val in y_hat]
y_hat_train = [0 if val < best_t else 1 for val in y_hat_train]

# print accuracy, f1 results and confusion matrix for the newborn model
acu = accuracy_score(Y_test, y_hat)
f1 = f1_score(Y_test, y_hat)
acu_train = accuracy_score(Y_train, y_hat_train)
f1_train  = f1_score(Y_train, y_hat_train)
print("Best threshold: ", best_t)
print("Accuracy: ", acu)
print("F1: ", f1)
print("Train Accuracy: ", acu_train)
print("Train F1: ", f1_train)

conf_mat = confusion_matrix(Y_test, y_hat)
print(conf_mat)

# save model to disk
model.save('models/SchneiderNNModel2000.h5')

# to reload model:
# model = load_model('SchneiderNNModel.h5')
# works in another python file