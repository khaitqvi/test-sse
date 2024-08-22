1. Set up the backend:

Create a new directory for your project and navigate into it.
Create a virtual environment: python -m venv venv
Activate the virtual environment:

On Windows: venv\Scripts\activate
On macOS/Linux: source venv/bin/activate


Install required packages: pip install fastapi uvicorn sse-starlette
Save the FastAPI code in a file named main.py
Run the server: python main.py

2. Set up the frontend:
cd sse-frontend
npm install
npm run dev