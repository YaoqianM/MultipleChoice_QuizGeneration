// Optional: Define a default info block if individual quizzes don't have one
// or if you want to override parts of it for the combined quiz.
const mainQuizInfo = {
    "name":    "Test Your Knowledge!! (Combined)",
    "main":    "<p>Think you're smart enough? Find out with this super crazy knowledge quiz covering various topics!</p>",
    "results": "<h5>Learn More</h5><p>Keep exploring and learning!</p>",
    "level1":  "Quiz Virtuoso!",
    "level2":  "Quiz Expert",
    "level3":  "Quiz Adept",
    "level4":  "Quiz Novice",
    "level5":  "Keep Practicing!"
};

// For a temporary direct test (without a server for ES Modules):
// Comment out or remove ES module imports for now.

// import vocabularyQuiz from './quizzes/vocabulary_english_quiz.js';
// import fullStackQuiz from './quizzes/full_stack_engineer_quiz.js';
// import humorQuiz from './quizzes/humor_quiz.js';

var quizJSON = {
    "info": {
        "name":    "Welcome to SlickQuiz!",
        "main":    "<p>Please select a quiz from the dropdown above and click 'Get Started!'</p>"
        // Default levels can also be here if you want fallbacks
    },
    "questions": [] // This will be filled by the selected quiz
};

// The existing slickQuiz.js will pick up this global quizJSON variable.