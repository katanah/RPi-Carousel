from datetime import datetime

class ImageModel:
    def __init__(self, file_path, file_name):
        self.path = file_path 
        self.name = file_name
        self.uploaded_at = datetime.now()