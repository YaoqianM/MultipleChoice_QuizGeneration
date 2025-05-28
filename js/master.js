// Modified by YaoqianM - 2025
// Based on SlickQuiz by Julie Cameron (jewlofthelotus) and Quicken Loans
// Original source: https://github.com/jewlofthelotus/SlickQuiz
//
// This file handles dynamic quiz loading, selection, and timer functionality.

// Put all your page JS here

//*
// ADD your NEW quiz files to the availableQuizzes array below.


// Manually define the available quizzes
const availableQuizzes = [
    { name: "English Vocabulary", path: './quizzes/vocabulary_english_quiz.js' },
    { name: "Full Stack Engineer", path: './quizzes/full_stack_engineer_quiz.js' },
    { name: "Humor Quiz", path: './quizzes/humor_quiz.js' },
    { name: "Test Quiz", path: './quizzes/test_quiz.js' }
];

$(function () {
    const $quizSelector = $('#quizSelector');
    const $slickQuiz = $('#slickQuiz');
    const $quizArea = $('.quizArea');
    const $quizHeader = $('.quizHeader');
    const $quizName = $('.quizName');
    const $quizResults = $('.quizResults');
    const $quizScore = $('.quizScore span');
    const $quizLevel = $('.quizLevel span');
    const $quizResultsCopy = $('.quizResultsCopy');
    const $quizSelectionArea = $('#quizSelectionArea');
    const $quizControls = $('.quizControls');

    // Populate the dropdown
    availableQuizzes.forEach(quiz => {
        $quizSelector.append(`<option value="${quiz.path}">${quiz.name}</option>`);
    });

    // Function to initialize or re-initialize SlickQuiz with new data
    async function loadAndInitQuiz(quizPath) {
        if (!quizPath) {
            // Reset to initial state if no quiz is selected
            window.quizJSON = { // Default empty/welcome state
                "info": {
                    "name": "Welcome to SlickQuiz!",
                    "main": "<p>Please select a quiz from the dropdown above and click 'Get Started!'</p>"
                },
                "questions": []
            };
            // Clear potential old quiz elements
            $quizArea.find("ol.questions").remove();
            $quizArea.find(".submitQuiz").remove();
            $quizArea.find(".viewResults").remove();
            $quizHeader.find(".quizDescription").remove();
            $quizResults.hide();
            $quizResultsCopy.empty();
            $quizName.empty();
            $quizScore.empty();
            $quizLevel.empty();
            $('#quizTime').text('00:00');
            $slickQuiz.removeData('slickQuiz'); // Remove old instance
            $slickQuiz.slickQuiz(); // Initialize with default/welcome
            $quizSelectionArea.show();
            $quizControls.show(); // Show quiz controls (timer and button wrapper)
            $('.startQuiz').show(); // Ensure start button is visible
            return;
        }

        console.log('[MasterJS] Selected quiz path:', quizPath);

        try {
            const selectedQuizModule = await import(quizPath);
            const selectedQuizData = selectedQuizModule.default;

            console.log('[MasterJS] Selected quiz data loaded:', selectedQuizData);

            if (!selectedQuizData || !selectedQuizData.info || !selectedQuizData.questions) {
                console.error('[MasterJS] Loaded quiz data is invalid:', selectedQuizData);
                alert('The selected quiz data is invalid. Please check the console.');
                return;
            }

            window.quizJSON = selectedQuizData; // Set the global quizJSON
            console.log('[MasterJS] Global quizJSON updated. Name:', window.quizJSON.info.name);

            // Clear out old quiz elements thoroughly before re-initializing
            $quizArea.find("ol.questions").remove();
            $quizArea.find(".submitQuiz").remove();
            $quizArea.find(".viewResults").remove();
            $quizHeader.find(".quizDescription").remove(); // Remove description from previous quiz
            $quizResults.hide();
            $quizResultsCopy.empty();
            $quizName.empty(); // Clear name, score, level before SlickQuiz sets them
            $quizScore.empty();
            $quizLevel.empty();
            $('#quizTime').text('00:00'); // Reset timer display

            // Remove the old SlickQuiz instance data and re-initialize
            $slickQuiz.removeData('slickQuiz');
            console.log('[MasterJS] Removed old slickQuiz data instance.');

            console.log('[MasterJS] Re-initializing slickQuiz with new data...');
            // SlickQuiz will handle the start button visibility based on its config
            $slickQuiz.slickQuiz({
                skipStartButton: false // Ensure SlickQuiz manages its own start button
            });
            console.log('[MasterJS] slickQuiz re-initialized.');
            $quizSelectionArea.show(); // Keep selection area visible
            $quizControls.show(); // Keep controls visible

        } catch (error) {
            console.error("[MasterJS] Error loading or initializing quiz:", error);
            alert("Failed to load or initialize the selected quiz. Please check the console for details.");
        }
    }

    // Event listener for the quiz selector
    $quizSelector.on('change', function() {
        const selectedQuizPath = $(this).val();
        loadAndInitQuiz(selectedQuizPath);
    });

    // Initial load (default welcome message)
    loadAndInitQuiz(''); 

    // Note: The click handler for '.startQuiz' is now managed by SlickQuiz itself.
    // We don't need a separate one in master.js if skipStartButton is false.
});
