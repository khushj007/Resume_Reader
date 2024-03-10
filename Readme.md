# Resume Reader

## Overview

Resume Reader is an AI-powered application designed to process and analyze resumes. The backend of the application utilizes FastAPI, Langchain for model training, and MongoDB for data storage.

## Endpoints

### 1. PDF Processing Endpoint

- **Endpoint URL:**(https://resume-reader.onrender.com/pdf)
- **Description:** This endpoint receives a PDF resume, triggering the model training based on the extracted information from the uploaded resume.

### 2. Query Endpoint

- **Endpoint URL:** (https://resume-reader.onrender.com/query)
- **Description:** Clients can submit queries to this API, receiving responses generated by the trained model. This allows users to interact with the AI, asking questions related to the processed resume.

## Frontend

The frontend, developed using React, consists of two main pages:

1. **Landing Page:** Allows clients to upload their PDF resumes.
2. **Homepage:** Enables users to engage in a chat with the AI model, discussing details from the processed resume.

## How to Start

### Online Usage

For regular usage, access the application through the provided link: [Resume Reader](https://resume-reader.vercel.app/).

### Local Setup

1. Download the repository.
2. Run the following commands:
   - For running the frontend in developer mode: `npm run dev`
   - For starting the FastAPI backend in developer mode: `uvicorn main:app --reload`

Now, you can access the application locally.

## Note

Ensure that all required dependencies are installed before starting the local setup.