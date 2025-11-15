from pathlib import Path
from tensorflow.keras.models import load_model

# Absolute path to model.h5 file
MODEL_PATH = Path(__file__).resolve().parents[3] / "ml" / "models" / "model.h5"

# To load the model into memory when initializing the backend
# model = load_model(MODEL_PATH)