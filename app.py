from flask import Flask, render_template, request, url_for
from config import UPLOAD_PHOTOS_PATH
import os



app = Flask(__name__)
app.config['UPLOAD_FOLDER'] = UPLOAD_PHOTOS_PATH 

@app.route("/")
def index():
    return render_template("index.html")

@app.route("/upload", methods=["POST"])
def upload_file():
    if "file" not in request.files:
        return "Not a file", 400
    
    file = request.files['file']
    
    if file.filename == '':
        return "Unnamed file", 400
    
    if file:
        filepath = os.path.join(app.config['UPLOAD_FOLDER'], file.filename)
        file.save(filepath)
        return "File uploaded"

if __name__ == "__main__":
    app.run(port=6969, debug=True)
