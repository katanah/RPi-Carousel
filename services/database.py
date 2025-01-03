import sqlite3
from config import DATABASE_PATH
from image_model import ImageModel


class database_manager:
    def __init__(self) -> None:
        self.connection = sqlite3.connect(DATABASE_PATH)
        self.cursor = self.connection.cursor()

    def read_statements(self, path) -> str:
        statements = ""
        with open(path, "r") as file:
            for line in file:
                statements += line
        return statements

    def execute(self, file_path: str = None, command: str = None, params: tuple = None) -> None:
        if file_path:
            command = self.read_statements(file_path)
        self.cursor.execute(command)
        self.close()

    def close(self) -> None:
        self.cursor.close()
        self.connection.close()

    def upload_image_metadata(self, image: ImageModel) -> None:
        command = """INSERT INTO IMAGES (file_path, file_name)
        VALUES(?, ?)
        """
        self.execute(command=command, params=(image.path, image.name))
