import { ITest } from "../models";
import { languages } from "../problems";
import { equal } from "../utils";
import { getProblemRating, getProblemSummary, getTestSuite } from "./prompts";
import fs from "fs";

const gptPrivateKey = "";

export async function agentCall(userPrompt: string, systemPrompt = "", model = "gpt-3.5-turbo") {
  const url = "https://api.openai.com/v1/chat/completions";

  const payload = {
    model,
    messages: [
      { role: "system", content: systemPrompt },
      { role: "user", content: userPrompt }
    ],
    temperature: 0
  };

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${gptPrivateKey}`
      },
      body: JSON.stringify(payload)
    });

    if (!response.ok) {
      throw new Error(`OpenAI API error: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    const content = data.choices[0]?.message?.content;
    // console.log(content);
    return content;
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
}

export async function agentCallJSON(userPrompt: string, systemPrompt = "", model = "gpt-3.5-turbo") {
  const rawResponse = await agentCall(userPrompt, systemPrompt, model);
  const sanitized = rawResponse
    .replace("```json", "")
    .replace("```", "");
  return JSON.parse(sanitized);
}

async function addNewTestSQL() {

  for (const problem of languages.SQL.problems) {
    const filename = problem.filename;
    const fileNumber = Number(filename.split("-")[0]);
    const testSuiteOld = problem.tests;

    if (testSuiteOld.length > 1) {
      continue;
    }

    console.log(fileNumber);

    const problemSummary = await agentCall(getProblemSummary(problem.description));
    // console.log(problemSummary);

    const problemRating = await agentCall(getProblemRating(problemSummary, problem.solution));
    // console.log(problemRating);

    const testSuiteNew = await agentCallJSON(getTestSuite(problemSummary, testSuiteOld));
    // console.log(testSuiteNew);

    const objToSave = {
      rating: Number(problemRating),
      tests: [] as ITest[]
    };
    if (!equal(testSuiteOld[0], testSuiteNew[0])) {
      console.log("First test in the suite changed!");
      objToSave.tests = testSuiteOld;
      testSuiteNew.shift();
      objToSave.tests.push(...testSuiteNew);
    } else {
      console.log("Additional test added!");
      objToSave.tests = testSuiteNew;
    }
    fs.writeFileSync(`./src/challenges/sql/${problem.filename}.json`, JSON.stringify(objToSave, null, 4));
  }

}

async function addRatingSQL() {

  for (const problem of languages.SQL.problems) {
    const filename = problem.filename;
    const fileNumber = Number(filename.split("-")[0]);

    if (problem.rating > 0) {
      continue;
    }

    console.log(fileNumber);

    const problemSummary = await agentCall(getProblemSummary(problem.description));
    // console.log(problemSummary);

    const problemRating = await agentCall(getProblemRating(problemSummary, problem.solution));
    // console.log(problemRating);

    fs.writeFileSync(
      `./src/challenges/sql/${problem.filename}.json`,
      JSON.stringify({
        rating: Number(problemRating),
        tests: problem.tests
      }, null, 4)
    );
  }

}

async function addRatingJS() {

  for (const problem of languages.JS.problems) {
    const filename = problem.filename;

    // if (problem.rating > 0) {
    //   continue;
    // }

    console.log(filename);

    const problemSummary = await agentCall(getProblemSummary(problem.description));
    // console.log(problemSummary);

    const problemRating = await agentCall(getProblemRating(problemSummary, problem.solution, problem.rating));
    // console.log(problemRating);

    fs.writeFileSync(
      `./src/challenges/js/${problem.filename}.json`,
      JSON.stringify({
        rating: Number(problemRating),
        tests: problem.tests
      }, null, 4)
    );
  }

}

addRatingJS();