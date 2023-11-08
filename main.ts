
const OpenAI = require("openai")
import * as dotenv from "dotenv";
import * as fs from "fs";

//npm install -g ts-node
//ts-node filename.ts

dotenv.config()

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY
})

const readline = require("readline").createInterface({
  input: process.stdin,
  output: process.stdout,
});

async function askQuestion(question: string) {
  return new Promise((resolve, reject) => {
    readline.question(question, (answer: string) => {
      resolve(answer);
    });
  });
}

async function main() {

  const file = await openai.files.create({
    file: fs.createReadStream("MathTest.pdf"),
    purpose: "assistants",
  });


  try {
    const assistant = await openai.beta.assistants.create({
      name: "Math Tutor",
      instructions:
        "You are a personal math tutor. Don't describe any steps you take, always only answer to the users questions directly.",
      tools: [{ type: "retrieval" }],
      model: "gpt-4-1106-preview",
      file_ids: [file.id]
    });

    // Log the first greeting
    console.log(
      "\nHello there, I'm your personal math tutor. Ask some complicated questions.\n"
    );

    // Create a thread
    //@ts-ignore
    const thread = await openai.beta.threads.create();

    // Use keepAsking as state for keep asking questions
    let keepAsking = true;
    while (keepAsking) {
      const userQuestion = await askQuestion("\nWhat is your question? ");

      // Pass in the user question into the existing thread
      await openai.beta.threads.messages.create(thread.id, {
        role: "user",
        content: userQuestion as string,
      });

      // Use runs to wait for the assistant response and then retrieve it
      const run = await openai.beta.threads.runs.create(thread.id, {
        assistant_id: assistant.id,
      });

      let runStatus = await openai.beta.threads.runs.retrieve(
        thread.id,
        run.id
      );

      // Polling mechanism to see if runStatus is completed
      // This should be made more robust.
      while (runStatus.status !== "completed") {
        await new Promise((resolve) => setTimeout(resolve, 2000));
        runStatus = await openai.beta.threads.runs.retrieve(thread.id, run.id);
      }

      // Get the last assistant message from the messages array
      const messages = await openai.beta.threads.messages.list(thread.id);

      // Find the last message for the current run
      const lastMessageForRun = messages.data
        .filter(
          (message: typeof messages ) => message.run_id === run.id && message.role === "assistant"
        )
        .pop();

      // If an assistant message is found, console.log() it
      if (lastMessageForRun) {
         //@ts-ignore
        console.log(`${lastMessageForRun.content[0].text.value} \n`);
      }

      const continueAsking = await askQuestion("Do you want to ask another question? (yes/no) ") as string;

      keepAsking = continueAsking.toLowerCase() === "yes";

      // If the keepAsking state is falsy show an ending message
      if (!keepAsking) {
        console.log("Alrighty then, I hope you learned something!\n");
      }
    }

    // close the readline
    readline.close();
  } catch (error) {
    console.error(error);
  }
}

main()