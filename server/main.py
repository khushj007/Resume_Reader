from fastapi import FastAPI, UploadFile
from helpers import Helper
from fastapi.middleware.cors import CORSMiddleware





app = FastAPI()
helper = Helper()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/")
def read_root():
    return {"Hello": "World"}


@app.post("/pdf")
async def get_pdf(file: UploadFile):
    pdf_content = file.file.read()
    response = helper.pdf_to_text(pdf_content)
    helper.configModel()
    return {"response":"file loaded succesfully"}

@app.post("/query")
def get_response(query:dict):
    response = helper.Response(query["query"])
    return {"response":response}



