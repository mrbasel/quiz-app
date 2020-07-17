import {
  getQuestions,
  getQuestionContent,
  displayQuestion,
  generateQuestionOptions,
} from "./quiz.js";


const startButton = document.querySelector("#start-button");


// Start quiz
startButton.addEventListener('click', async () => {
  const innerContainer = document.querySelector('#inner-container')
  const selectionForm = document.querySelector("#selection-form");


  let categoryChoice = selectionForm.querySelectorAll("select").item(0).value;
  let difficultyChoice = selectionForm.querySelectorAll("select").item(1).value;

  let NextQuestionbutton = document.createElement('button');
  NextQuestionbutton.append('Next question');

  let score = 0;
  let index = 0;
  NextQuestionbutton.addEventListener('click', () => {
    const trueOption = document.querySelector('#true');
    const falseOption = document.querySelector('#false');
    
    const userChoice = trueOption.checked == true ? 'true' : 'false';

    if (questions[index].answer.toLowerCase() == userChoice) {
      score++;
    }

    // Check if current question is last question
    if (index +1 >= questions.length){
      console.log(index);
      innerContainer.innerHTML = `<h1>Finished!</h1><h4>You scored ${score}/5 !</h4><button onclick='window.location = window.location'>play again?</button> `;
    }
    // Check if user picked an option
    else if (trueOption.checked == false && falseOption.checked == false) {
      alert('Please provide an answer.')
    } else {
           index++;
           let question = questions[index];
           displayQuestion(innerContainer, question, index + 1);
           innerContainer.appendChild(NextQuestionbutton);
         }
  });
  
  
  let questions = await getQuestions(categoryChoice, difficultyChoice)
  displayQuestion(innerContainer, questions[index], 1);
  innerContainer.appendChild(NextQuestionbutton);
  console.log(index);

});
