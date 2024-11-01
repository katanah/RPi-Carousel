
import sqlite3
from config import DATABASE_PATH

class database_manager:
    def __init__(self) -> None:
        self.connection = sqlite3.connect(DATABASE_PATH)
        self.cursor = self.connection.cursor()

    def read_statements(self, path) -> str:
        statements = ""
        with open(path, 'r') as file:
            for line in file:
                statements += line
        return statements
    
    def execute(self, file) -> None:
        command = self.read_statements(file)
        self.cursor.execute(command)
        self.close()
        
    def close(self) -> None:
        self.cursor.close()
        self.connection.close()