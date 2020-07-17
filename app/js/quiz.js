



export function getQuestions(category = null, difficulty = null) {
  let url;

  if (!category && !difficulty) {
    url = "https://opentdb.com/api.php?amount=5&type=boolean";
  } else if (!category) {
    url = `https://opentdb.com/api.php?amount=5&type=boolean&difficulty=${difficulty}`;
  } else {
    url = `https://opentdb.com/api.php?amount=5&type=boolean&category=${category}`;
  }

  return fetch(url)
    .then((r) => r.json())
    .then((response) => {
      // result = response;
      // console.log(response);
      return response["results"].map((q) => {
        return {
          questionText: q.question,
          answer: q.correct_answer,
        };
      });
    });
}

export function getQuestionContent(question) {
  let questionContainer = document.createElement("div");
  let questionText = document.createTextNode(question.questionText);

  let options = generateQuestionOptions();

  questionContainer.appendChild(questionText);
  questionContainer.appendChild(options);

  return questionContainer;
}

export function displayQuestion(container, question, index) {
  container.innerHTML = `${index}/5`;
//   container.append = `${index}/5`;
  container.appendChild(getQuestionContent(question));
  // container.appendChild(NextQuestionbutton);
}

export function generateQuestionOptions() {
  let parentOptionsContainer = document.createElement("div");

  // Create 'true' option elements
  let trueOption = document.createElement("input");
  let trueOptionLabel = document.createElement("label");

  // Create 'false' option elements
  let falseOption = document.createElement("input");
  let falseOptionLabel = document.createElement("label");

  trueOption.setAttribute("type", "radio");
  falseOption.setAttribute("type", "radio");
  trueOption.setAttribute("name", "option");
  falseOption.setAttribute("name", "option");

  trueOption.id = "true";
  falseOption.id = "false";

  trueOptionLabel.setAttribute("for", "true");
  falseOptionLabel.setAttribute("for", "false");

  trueOptionLabel.append("True");
  falseOptionLabel.append("False");

  parentOptionsContainer.appendChild(trueOption);
  parentOptionsContainer.appendChild(trueOptionLabel);
  parentOptionsContainer.appendChild(falseOption);
  parentOptionsContainer.appendChild(falseOptionLabel);

  return parentOptionsContainer;
}