## SlickQuiz Project Features & Configuration

This SlickQuiz setup allows you to easily create and manage JavaScript-based quizzes. Quizzes are defined in individual JavaScript files (e.g., `js/quizzes/my_quiz.js`) and can be dynamically selected and loaded on the main page.

### Core Capabilities:

*   **Multiple Choice Questions:** Present users with a question and several answer options.
*   **Dynamic Quiz Loading:** Select different quizzes from a dropdown menu.
*   **Customizable Quiz Information:** Define titles, welcome messages, and results messages for each quiz.
*   **Performance Levels:** Provide custom feedback messages based on the user's score.
*   **Immediate Answer Feedback:** Show users if their answer was correct or incorrect right after they respond (if configured).
*   **Quiz Timer:** A timer tracks how long the user takes.

### Defining a Quiz:

Each quiz is a JavaScript object exported from its own file (e.g., `js/quizzes/example_quiz.js`). Here's the basic structure:

```javascript
const exampleQuiz = {
    "info": {
        "name":    "My Awesome Quiz Title",
        "main":    "<p>Welcome to this quiz! Test your knowledge on various amazing topics.</p>",
        "results": "<h5>Congratulations!</h5><p>You've completed the quiz. Check out your score and ranking.</p>",
        "level1":  "Quiz Master!",
        "level2":  "Expert",
        "level3":  "Pro",
        "level4":  "Rookie",
        "level5":  "Beginner"  // More levels mean a wider range of feedback
    },
    "questions": [
        {
            "q": "What is the capital of France?",
            "a": [
                {"option": "Berlin", "correct": false},
                {"option": "Madrid", "correct": false},
                {"option": "Paris",  "correct": true},
                {"option": "Rome",   "correct": false}
            ],
            "correct": "<p><span>Correct!</span> Paris is indeed the capital of France.</p>",
            "incorrect": "<p><span>Not quite.</span> The correct answer is Paris.</p>"
        },
        {
            "q": "Which planet is known as the Red Planet?",
            "a": [
                {"option": "Earth",   "correct": false},
                {"option": "Mars",    "correct": true},
                {"option": "Jupiter", "correct": false},
                {"option": "Venus",   "correct": false}
            ],
            "correct": "<p><span>That's right!</span> Mars is known as the Red Planet.</p>",
            "incorrect": "<p><span>Incorrect.</span> Mars is the planet known for its reddish appearance.</p>"
        },
        // Add more question objects here
        {
            "q": "Is JavaScript a programming language? (True/False)",
            "a": [
                {"option": "True",  "correct": true},
                {"option": "False", "correct": false}
            ],
            "correct": "<p><span>Correct!</span> JavaScript is a versatile programming language.</p>",
            "incorrect": "<p><span>Actually...</span> JavaScript is indeed a programming language.</p>"
        }
    ]
};

export default exampleQuiz;
```

### Key Configuration Points in the JSON:

*   **`info.name`**: The title displayed for the quiz.
*   **`info.main`**: The introductory text or description for the quiz. HTML can be used.
*   **`info.results`**: Text shown on the final results page. HTML can be used.
*   **`info.levelX`**: Feedback text for different score ranges. `level1` is for the highest scores, `level5` (or the highest number you define) for the lowest.
*   **`questions`**: An array of question objects.
    *   **`q`**: The question text. HTML can be used.
    *   **`a`**: An array of answer choice objects.
        *   **`option`**: The text for an answer choice. HTML can be used.
        *   **`correct`**: Set to `true` for the correct answer(s), `false` otherwise.
    *   **`correct`**: Message shown if the user answers correctly. HTML can be used.
    *   **`incorrect`**: Message shown if the user answers incorrectly. HTML can be used.

### How to Add a New Quiz:

1.  Create a new `.js` file in the [`js/quizzes`](./) directory (e.g., `my_new_quiz.js`).
2.  Define your quiz object in this file using the structure shown above, and make sure to `export default` it.
3.  Update `js/master.js`: Add your new quiz to the `availableQuizzes` array at the top of the file:
    ```javascript
    // js/master.js
    const availableQuizzes = [
        // ... other quizzes
        { name: "My New Quiz Display Name", path: './quizzes/my_new_quiz.js' }
    ];
    ```

### Advanced Question Examples & Other Types:

While SlickQuiz is primarily designed for single-answer multiple-choice questions, its structure can be adapted for other formats.

**1. True/False Questions:**

These are a simple form of multiple-choice.

```javascript
{
    "q": "The Earth is flat.",
    "a": [
        {"option": "True",  "correct": false},
        {"option": "False", "correct": true}
    ],
    "correct": "<p><span>Correct!</span> The Earth is an oblate spheroid.</p>",
    "incorrect": "<p><span>Not quite.</span> The Earth is not flat.</p>"
}
```

**2. Multiple Correct Answers (Select All That Apply):**

SlickQuiz can handle questions where multiple options are correct. It will typically render these with checkboxes. The scoring logic in `slickQuiz.js` (specifically the `compareAnswers` function) determines if the user's selections match all the true answers.

*   To enable checkbox rendering for a question with multiple correct answers, ensure more than one option in the `"a"` array has `"correct": true`.
*   Alternatively, you can add `"force_checkbox": true` to the question object if you want checkboxes even for a single correct answer (though this is less common for standard "select all that apply").
*   The `select_any: true` property on a question object changes the scoring: if `true`, the user gets the question right if *any* of their selected answers are correct. If `false` (default), the user must select *all* correct answers and *only* the correct answers.

```javascript
{
    "q": "Which of the following are primary colors? (Select all that apply)",
    "a": [
        {"option": "Red",    "correct": true},
        {"option": "Green",  "correct": false}, // In additive color models (light), Green is primary. For subtractive (pigment), it's not. Assuming subtractive for this example.
        {"option": "Blue",   "correct": true},
        {"option": "Yellow", "correct": true},
        {"option": "Orange", "correct": false}
    ],
    "correct": "<p><span>Well done!</span> Red, Yellow, and Blue are traditionally considered primary colors in subtractive color models.</p>",
    "incorrect": "<p><span>Check again!</span> The primary colors (subtractive) are Red, Yellow, and Blue.</p>"
    // "force_checkbox": true, // Optionally add this if you want to ensure checkboxes
    // "select_any": false // Default behavior: user must select all correct options and no incorrect ones.
}
```

**3. Fill-in-the-Blank (with options):**

You can simulate a "fill-in-the-blank" by phrasing the question appropriately and providing the missing word(s) as options.

```javascript
{
    "q": "The famous play 'Romeo and Juliet' was written by William ______.",
    "a": [
        {"option": "Dickens",     "correct": false},
        {"option": "Shakespeare", "correct": true},
        {"option": "Chaucer",     "correct": false},
        {"option": "Austen",      "correct": false}
    ],
    "correct": "<p><span>Correct!</span> It was William Shakespeare.</p>",
    "incorrect": "<p><span>Incorrect.</span> The author is William Shakespeare.</p>"
}
```

**4. Limitations - True Fill-in-the-Blank (Free Text Input):**

This version of SlickQuiz **does not natively support** true fill-in-the-blank questions where the user types an answer into a text field without predefined options. Implementing this would require significant modifications to the core `slickQuiz.js` to:
*   Render text input fields.
*   Handle and evaluate free-text user input (which can be complex due to typos, variations, case sensitivity, etc.).
*   Adjust scoring and feedback mechanisms accordingly.

### Advanced Configuration (slickQuiz.js):

Many other behaviors of SlickQuiz (like randomization, button text, timer settings, enabling/disabling per-question feedback, etc.) can be configured by modifying the `defaults` object within the `slickQuiz.js` file or by passing an options object when initializing the plugin in `js/master.js` (e.g., `$('#slickQuiz').slickQuiz({ optionName: value });`). Refer to the comments and `defaults` object in `js/slickQuiz.js` for more details.