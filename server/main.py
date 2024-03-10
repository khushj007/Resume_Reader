from fastapi import FastAPI, UploadFile
from helpers import Helper
from fastapi.middleware.cors import CORSMiddleware
from mydatabase import Database
from datetime import datetime



app = FastAPI()

# middle ware for cors
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# configuring helpers functions
helper = Helper()


database = Database()

# connecting database
response  = database.connect()

if response == True:
    @app.get("/")
    def read_root():
        return {"Hello": "World"}

    # receiving pdf
    @app.post("/pdf")
    async def get_pdf(file: UploadFile):
        pdf_content = file.file.read()
        file_name  = file.filename
        data = {
            "file_name" : file_name,
            "date_time" : datetime.now()
        }
        database.insertone(data)
        response = helper.pdf_to_text(pdf_content)
        helper.configModel()
        return {"response":"file loaded succesfully"}

    # receiving query
    @app.post("/query")
    def get_response(query:dict):
        response = helper.Response(query["query"])
        return {"response":response}
else :
    print("database connection failed")



