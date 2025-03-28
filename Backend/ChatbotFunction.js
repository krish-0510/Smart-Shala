
import { ChatGoogleGenerativeAI } from "@langchain/google-genai";
import { PromptTemplate } from "@langchain/core/prompts";


const llm = new ChatGoogleGenerativeAI({
    model: "gemini-1.0-pro",
    temperature: 0,
    maxRetries: 2,
    apiKey: "AIzaSyCYEMFZZeap0EDgbvFZMHcwILWB8bK-zJ4",
  });

  
  const promptTemplate = PromptTemplate.fromTemplate(
    "You are a AI teacher.A student has asked you a question. The question is: {que}. Please provide a clear answer."
  );
  // const promptanaylseTemplate = PromptTemplate.fromTemplate(
  //   "You are a AI anaylser.Ignore the Text Scanned with Oken Scanner. Understand the que and ans written in the text. Give output listing the spelling mistakes and grammer in text.Also,if the the ans is very wrong according to que asked then correct it. The text given is {text}."
  // );

  const spellingMistakesTemplate = PromptTemplate.fromTemplate(
    "You are a AI anaylser.Understand the que and ans written in the text. Give output listing the spelling mistakes in text. The text given is {text}."
  );

  const grammerMistakesTemplate = PromptTemplate.fromTemplate(
    "You are a AI anaylser.Understand the que and ans written in the text. Give output listing the grammer mistakes in text.Also,if the the ans is very wrong according to que asked then correct it. The text given is {text}."
  );

  const correctAnswerTemplate = PromptTemplate.fromTemplate(
    "You are a AI anaylser.Understand the que and ans written in the text. Give output listing if the the ans is wrong according to que asked if not then correct it. The text given is {text}."
  );



export async function Chatbotfunction(que){

    const message = await promptTemplate.invoke({ que: que });
    const response = await llm.invoke(message.value);

    const ans = response.content;

    return ans;


}

export async function spellingAnaylsisfunction(text){

  const message = await spellingMistakesTemplate.invoke({ text: text });
  const response = await llm.invoke(message.value);

  const ans = response.content;

  return ans;


}
export async function grammerAnaylsisfunction(text){

  const message = await grammerMistakesTemplate.invoke({ text: text });
  const response = await llm.invoke(message.value);

  const ans = response.content;

  return ans;


}
export async function correctnessAnaylsisfunction(text){

  const message = await correctAnswerTemplate.invoke({ text: text });
  const response = await llm.invoke(message.value);

  const ans = response.content;

  return ans;


}