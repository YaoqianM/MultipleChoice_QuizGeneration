// js/quizzes/vocabulary_english_quiz.js
const vocabularyQuiz = {
    "info": {
        "name": "English Vocabulary Quiz",
        "main": "<p>How strong is your English vocabulary? Let\'s find out!</p>"
    },
    "questions": [
        {
            "q": "What is the synonym of 'ephemeral'?",
            "a": [
                {"option": "Eternal", "correct": false},
                {"option": "Transient", "correct": true},
                {"option": "Robust", "correct": false},
                {"option": "Ancient", "correct": false}
            ],
            "correct": "<p><span>Correct!</span> Ephemeral means lasting for a very short time.</p>",
            "incorrect": "<p><span>Not quite.</span> 'Transient' is the correct synonym for ephemeral.</p>"
        },
        {
            "q": "Which word means 'a person who is new to a subject or activity'?",
            "a": [
                {"option": "Veteran", "correct": false},
                {"option": "Expert", "correct": false},
                {"option": "Novice", "correct": true},
                {"option": "Prodigy", "correct": false}
            ],
            "correct": "<p><span>That's right!</span> A novice is a beginner.</p>",
            "incorrect": "<p><span>Incorrect.</span> The correct term is 'novice'.</p>"
        }
        // Add more vocabulary questions here
    ]
};

export default vocabularyQuiz;
