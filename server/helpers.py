import fitz
from langchain.embeddings.openai import OpenAIEmbeddings
from langchain.text_splitter import CharacterTextSplitter
from langchain.chains.question_answering import load_qa_chain
from langchain.llms import OpenAI
from langchain.vectorstores import FAISS
import os
from dotenv import load_dotenv
load_dotenv()

class Helper:
    def __init__(self):
        os.environ["OPENAI_API_KEY"] = os.getenv("HUB_TOKEN")
        self.rawtext = ""
        self.document_search = None
        self.chain = None
    

    # function to convert pdf to text 
    def pdf_to_text(self,pdf):
            doc = fitz.open(stream=pdf, filetype="pdf")
            text=""
            for page_num in range(doc.page_count):
                page = doc[page_num]
                text += page.get_text()
            doc.close()
            self.rawtext = text
            return "file uploaded successfully"
    
    # feeding pdf to model 
    def configModel(self):
         text_splitter = CharacterTextSplitter(
                         separator = "\n",
                         chunk_size = 800,
                         chunk_overlap  = 200,
                         length_function = len,
                                              ) 
         texts = text_splitter.split_text(self.rawtext)
         embeddings = OpenAIEmbeddings()
         self.document_search = FAISS.from_texts(texts, embeddings)
         self.chain = load_qa_chain(OpenAI(), chain_type="stuff")
        
     # asking questions from model 
    def Response(self,query):
        docs = self.document_search.similarity_search(query)
        response = self.chain.run(input_documents=docs, question=query)
        return response