# Chat with an AI Assistant Using OpenAI's GPT-4

This guide demonstrates how to use OpenAI's GPT-4 model to create a conversational AI assistant that can answer questions based on the content of an uploaded PDF file. This interactive assistant is designed to help users with inquiries related to the provided PDF document.

## Prerequisites

Before you start, make sure you have the following set up:

- **Node.js**: Ensure you have Node.js installed on your system.
- **OpenAI API Key**: You'll need to obtain an API key from OpenAI. Store this key securely and use it to authenticate your API requests.
- **PDF Document**: Prepare a PDF file that contains the content you want to use for answering questions.

## Installation

1. Clone or download this code repository to your local machine.

2. Navigate to the project directory in your terminal and run the following command to install the required dependencies:

   ```bash
   npm install openai fs dotenv

3. Install TypeScript:
    ```bash
    npm install -g ts-node 

## Get Started
1. Create a .env file in the project directory and store your OpenAI API key as follows: OPENAI_API_KEY=YOUR_API_KEY
2. Upload Your PDF Document: Place the PDF file you want to use in the project directory.
3. Run the Application: Execute the application using the following command: ts-node main.ts


## Expanding this Assistent
You can modify the assistant's behavior, instructions, or name by updating the respective parameters in the code. For example, you can change the assistant's name to "Science Tutor" or adjust the instructions provided to the assistant.
If you have a different PDF document you'd like to use, make sure to replace "MathTest.pdf" with the correct file name in the code.


Please be aware of OpenAI's usage policies and guidelines when using the GPT-4 model and the OpenAI API. Ensure that you comply with all terms and conditions.
