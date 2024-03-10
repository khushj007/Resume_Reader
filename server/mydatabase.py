from pymongo.mongo_client import MongoClient
import os
from dotenv import load_dotenv
load_dotenv()
import certifi
from pydantic import BaseModel
from datetime import datetime



class Database:
    def __init__(self):
        print("connecting to database")
        self.client = None
    
    # function to connect database
    def connect(self):
        uri = os.getenv("uri") 
        self.client = MongoClient(uri,tlsCAFile=certifi.where())
        try:
            self.client.admin.command('ping')
            print("Pinged your deployment. You successfully connected to MongoDB!")
            return True
        except Exception as e:
            print(str(e))
    # function to insert value in database
    def insertone(self,data):
          try:
            self.client.resumedetails.details.insert_one(data)
            print("Data inserted successfully")
          except PyMongoError as e:
            print(f"Error inserting data: {e}")


