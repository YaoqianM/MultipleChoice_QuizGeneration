/*!
 * SlickQuiz jQuery Plugin
 * http://github.com/jewlofthelotus/SlickQuiz
 *
 * @updated October 25, 2014
 * @version 1.5.20
 *
 * @author Julie Cameron - http://www.juliecameron.com
 * @copyright (c) 2013 Quicken Loans - http://www.quickenloans.com
 * @license MIT
 */

(function($){
    $.slickQuiz = function(element, options) {
        var plugin   = this,
            $element = $(element),
            _element = '#' + $element.attr('id'),

            defaults = {
                checkAnswerText:  'Check My Answer!',
                nextQuestionText: 'Next &raquo;',
                backButtonText: '',
                completeQuizText: '',
                tryAgainText: '',
                questionCountText: 'Question %current of %total',
                preventUnansweredText: 'You must select at least one answer.',
                questionTemplateText:  '%count. %text',
                scoreTemplateText: '%score / %total',
                nameTemplateText:  '<span>Quiz: </span>%name',
                skipStartButton: false,
                numberOfQuestions: null,
                randomSortQuestions: false,
                randomSortAnswers: false,
                preventUnanswered: false,
                disableScore: false,
                disableRanking: false,
                scoreAsPercentage: false,
                perQuestionResponseMessaging: true,
                perQuestionResponseAnswers: false,
                completionResponseMessaging: false,
                displayQuestionCount: true,   // Deprecate?
                displayQuestionNumber: true,  // Deprecate?
                animationCallbacks: { // only for the methods that have jQuery animations offering callback
                    setupQuiz: function () {},
                    startQuiz: function () {},
                    resetQuiz: function () {},
                    checkAnswer: function () {},
                    nextQuestion: function () {},
                    backToQuestion: function () {},
                    completeQuiz: function () {}
                },
                events: {
                    onStartQuiz: function (options) {},
                    onCompleteQuiz: function (options) {}  // reserved: options.questionCount, options.score
                }
            },

            // Class Name Strings (Used for building quiz and for selectors)
            questionCountClass     = 'questionCount',
            questionGroupClass     = 'questions',
            questionClass          = 'question',
            answersClass           = 'answers',
            responsesClass         = 'responses',
            completeClass          = 'complete',
            correctClass           = 'correctResponse',
            incorrectClass         = 'incorrectResponse',
            correctResponseClass   = 'correct',
            incorrectResponseClass = 'incorrect',
            checkAnswerClass       = 'checkAnswer',
            nextQuestionClass      = 'nextQuestion',
            lastQuestionClass      = 'lastQuestion',
            backToQuestionClass    = 'backToQuestion',
            tryAgainClass          = 'tryAgain',

            // Sub-Quiz / Sub-Question Class Selectors
            _questionCount         = '.' + questionCountClass,
            _questions             = '.' + questionGroupClass,
            _question              = '.' + questionClass,
            _answers               = '.' + answersClass,
            _answer                = '.' + answersClass + ' li',
            _responses             = '.' + responsesClass,
            _response              = '.' + responsesClass + ' li',
            _correct               = '.' + correctClass,
            _correctResponse       = '.' + correctResponseClass,
            _incorrectResponse     = '.' + incorrectResponseClass,
            _checkAnswerBtn        = '.' + checkAnswerClass,
            _nextQuestionBtn       = '.' + nextQuestionClass,
            _prevQuestionBtn       = '.' + backToQuestionClass,
            _tryAgainBtn           = '.' + tryAgainClass,

            // Top Level Quiz Element Class Selectors
            _quizStarter           = _element + ' .startQuiz',
            _quizName              = _element + ' .quizName',
            _quizArea              = _element + ' .quizArea',
            _quizResults           = _element + ' .quizResults',
            _quizResultsCopy       = _element + ' .quizResultsCopy',
            _quizHeader            = _element + ' .quizHeader',
            _quizScore             = _element + ' .quizScore',
            _quizLevel             = _element + ' .quizLevel',

            // Top Level Quiz Element Objects
            $quizStarter           = $(_quizStarter),
            $quizName              = $(_quizName),
            $quizArea              = $(_quizArea),
            $quizResults           = $(_quizResults),
            $quizResultsCopy       = $(_quizResultsCopy),
            $quizHeader            = $(_quizHeader),
            $quizScore             = $(_quizScore),
            $quizLevel             = $(_quizLevel),

            // Timer variables
            timerInterval = null, // For setInterval ID
            startTime = 0,        // To store quiz start time
            timerRunning = false   // Flag for timer status

        ;


        // Reassign user-submitted deprecated options
        var depMsg = '';

        if (options && typeof options.disableNext != 'undefined') {
            if (typeof options.preventUnanswered == 'undefined') {
                options.preventUnanswered = options.disableNext;
            }
            depMsg += 'The \'disableNext\' option has been deprecated, please use \'preventUnanswered\' in it\'s place.\n\n';
        }

        if (options && typeof options.disableResponseMessaging != 'undefined') {
            if (typeof options.preventUnanswered == 'undefined') {
                options.perQuestionResponseMessaging = options.disableResponseMessaging;
            }
            depMsg += 'The \'disableResponseMessaging\' option has been deprecated, please use' +
                      ' \'perQuestionResponseMessaging\' and \'completionResponseMessaging\' in it\'s place.\n\n';
        }

        if (options && typeof options.randomSort != 'undefined') {
            if (typeof options.randomSortQuestions == 'undefined') {
                options.randomSortQuestions = options.randomSort;
            }
            if (typeof options.randomSortAnswers == 'undefined') {
                options.randomSortAnswers = options.randomSort;
            }
            depMsg += 'The \'randomSort\' option has been deprecated, please use' +
                      ' \'randomSortQuestions\' and \'randomSortAnswers\' in it\'s place.\n\n';
        }

        if (depMsg !== '') {
            if (typeof console != 'undefined') {
                console.warn(depMsg);
            } else {
                alert(depMsg);
            }
        }
        // End of deprecation reassignment


        plugin.config = $.extend(defaults, options);

        // Set via json option or quizJSON variable (see slickQuiz-config.js)
        var quizValues = (plugin.config.json ? plugin.config.json : typeof quizJSON != 'undefined' ? quizJSON : null);

        // Get questions, possibly sorted randomly
        var questions = plugin.config.randomSortQuestions ?
                        quizValues.questions.sort(function() { return (Math.round(Math.random())-0.5); }) :
                        quizValues.questions;

        // Count the number of questions
        var questionCount = questions.length;

        // Select X number of questions to load if options is set
        if (plugin.config.numberOfQuestions && questionCount >= plugin.config.numberOfQuestions) {
            questions = questions.slice(0, plugin.config.numberOfQuestions);
            questionCount = questions.length;
        }

        // some special private/internal methods
        var internal = {method: {
            // get a key whose notches are "resolved jQ deferred" objects; one per notch on the key
            // think of the key as a house key with notches on it
            getKey: function (notches) { // returns [], notches >= 1
                var key = [];
                for (i=0; i<notches; i++) key[i] = $.Deferred ();
                return key;
            },

            // put the key in the door, if all the notches pass then you can turn the key and "go"
            turnKeyAndGo: function (key, go) { // key = [], go = function ()
                // when all the notches of the key are accepted (resolved) then the key turns and the engine (callback/go) starts
                $.when.apply (null, key). then (function () {
                    go ();
                });
            },

            // get one jQ
            getKeyNotch: function (key, notch) { // notch >= 1, key = []
                // key has several notches, numbered as 1, 2, 3, ... (no zero notch)
                // we resolve and return the "jQ deferred" object at specified notch
                return function () {
                    key[notch-1].resolve (); // it is ASSUMED that you initiated the key with enough notches
                };
            }
        }};

        plugin.method = {
            // Sets up the questions and answers based on above array
            setupQuiz: function(options) { // use 'options' object to pass args
                // ... (existing setupQuiz logic)
                var key, keyNotch, kN;
                key = internal.method.getKey (3);
                keyNotch = internal.method.getKeyNotch;
                kN = keyNotch;

                $quizName.hide().html(plugin.config.nameTemplateText
                    .replace('%name', quizValues.info.name) ).fadeIn(1000, kN(key,1));
                $quizHeader.hide().prepend($('<div class="quizDescription">' + quizValues.info.main + '</div>')).fadeIn(1000, kN(key,2));
                $quizResultsCopy.append(quizValues.info.results);

                // add retry button to results view, if enabled
                if (plugin.config.tryAgainText && plugin.config.tryAgainText !== '') {
                    $quizResultsCopy.append('<p><a class="button ' + tryAgainClass + '" href="#">' + plugin.config.tryAgainText + '</a></p>');
                }

                // Setup questions
                var quiz  = $('<ol class="' + questionGroupClass + '"></ol>'),
                    count = 1;

                // Loop through questions object
                for (var i_q in questions) { // Renamed loop variable to avoid conflict
                    if (questions.hasOwnProperty(i_q)) {
                        var question = questions[i_q];

                        var questionHTML = $('<li class="' + questionClass +'" id="question' + (count - 1) + '"></li>');

                        if (plugin.config.displayQuestionCount) {
                            questionHTML.append('<div class="' + questionCountClass + '">' +
                                plugin.config.questionCountText
                                    .replace('%current', '<span class="current">' + count + '</span>')
                                    .replace('%total', '<span class="total">' +
                                        questionCount + '</span>') + '</div>');
                        }

                        var formatQuestion = '';
                        if (plugin.config.displayQuestionNumber) {
                            formatQuestion = plugin.config.questionTemplateText
                                .replace('%count', count).replace('%text', question.q);
                        } else {
                            formatQuestion = question.q;
                        }
                        questionHTML.append('<h3>' + formatQuestion + '</h3>');

                        // Count the number of true values
                        var truths = 0;
                        for (var i_a in question.a) { // Renamed loop variable
                            if (question.a.hasOwnProperty(i_a)) {
                                var answer_obj = question.a[i_a]; // Renamed to avoid conflict with answersClass
                                if (answer_obj.correct) {
                                    truths++;
                                }
                            }
                        }

                        // Now let's append the answers with checkboxes or radios depending on truth count
                        var answerHTML = $('<ul class="' + answersClass + '"></ul>');

                        // Get the answers
                        var answers_list = plugin.config.randomSortAnswers ? // Renamed
                            question.a.sort(function() { return (Math.round(Math.random())-0.5); }) :
                            question.a;

                        // prepare a name for the answer inputs based on the question
                        var selectAny     = question.select_any ? question.select_any : false,
                            forceCheckbox = question.force_checkbox ? question.force_checkbox : false,
                            checkbox      = (truths > 1 && !selectAny) || forceCheckbox,
                            inputName     = $element.attr('id') + '_question' + (count - 1),
                            inputType     = checkbox ? 'checkbox' : 'radio';

                        for (var i_ans in answers_list) { // Renamed loop variable
                            if (answers_list.hasOwnProperty(i_ans)) {
                                var answer_item   = answers_list[i_ans], // Renamed
                                optionId = inputName + '_' + i_ans.toString();

                                // If question has >1 true answers and is not a select any, use checkboxes; otherwise, radios
                                var input = '<input id="' + optionId + '" name="' + inputName +
                                            '" type="' + inputType + '" /> ';
                                var optionLabel = '<label for="' + optionId + '">' + answer_item.option + '</label>';
                                var answerContent = $('<li></li>')
                                    .append(input)
                                    .append(optionLabel);
                                answerHTML.append(answerContent);
                            }
                        }

                        // Append answers to question
                        questionHTML.append(answerHTML);

                        // If response messaging is NOT disabled, add it
                        if (plugin.config.perQuestionResponseMessaging || plugin.config.completionResponseMessaging) {
                            // Now let's append the correct / incorrect response messages
                            var responseHTML = $('<ul class="' + responsesClass + '"></ul>');
                            responseHTML.append('<li class="' + correctResponseClass + '">' + question.correct + '</li>');
                            responseHTML.append('<li class="' + incorrectResponseClass + '">' + question.incorrect + '</li>');

                            // Append responses to question
                            questionHTML.append(responseHTML);
                        }

                        // Appends check answer / back / next question buttons
                        if (plugin.config.backButtonText && plugin.config.backButtonText !== '') {
                            questionHTML.append('<a href="#" class="button ' + backToQuestionClass + '">' + plugin.config.backButtonText + '</a>');
                        }

                        // Buttons are hidden in paper mode by startQuiz
                        quiz.append(questionHTML);

                        count++;
                    }
                }

                // Add the quiz content to the page
                $quizArea.append(quiz);

                // Toggle the start button OR start the quiz if start button is disabled
                if (plugin.config.skipStartButton || $quizStarter.length == 0) {
                    $quizStarter.hide();
                    this.startQuiz({callback: plugin.config.animationCallbacks.startQuiz}); 
                    kN(key,3).apply (null, []);
                } else {
                    $quizStarter.fadeIn(500, kN(key,3));
                }
                internal.method.turnKeyAndGo (key, options && options.callback ? options.callback : function () {});
            },

            // Starts the quiz (hides start button and displays first question)
            startQuiz: function(options) {
                var $this = this;
                var key, keyNotch, kN;
                key = internal.method.getKey (1);
                keyNotch = internal.method.getKeyNotch;
                kN = keyNotch;

                $this.resetTimer();
                $this.startTimer();
                $(_element + ' .viewResults').remove();

                function start(o) { 
                    // Show all questions
                    $(_element + ' ' + _questions + ' li').show();

                    // Hide "Next" and "Back" buttons on individual questions
                    $(_element + ' ' + _nextQuestionBtn).hide();
                    $(_element + ' ' + _prevQuestionBtn).hide();
                    $(_element + ' ' + _checkAnswerBtn).hide(); // Hide individual check answer buttons

                    // Remove any existing submit button to prevent duplicates if startQuiz is called multiple times (e.g. on reset)
                    $(_element + ' .submitQuiz').remove();

                    // Show a single "Submit Quiz" button at the end
                    var $submitButton = $('<a href="#" class="button submitQuiz">Submit Quiz</a>');
                    $quizArea.append($submitButton);

                    // Use $.proxy to ensure 'this' inside the click handler refers to $this (plugin.method)
                    $submitButton.on('click', $.proxy(function(e) {
                        e.preventDefault();
                        // 'this' inside this function is now guaranteed to be $this from the outer scope (plugin.method)
                        this.submitQuiz();
                    }, $this)); // Pass $this as the context for the event handler

                    if (o && o.callback) o.callback ();
                }

                if (plugin.config.skipStartButton || $quizStarter.length == 0) {
                    start({callback: kN(key,1)});
                } else {
                    $quizStarter.fadeOut(300, function(){
                        start({callback: kN(key,1)});
                    });
                }
                internal.method.turnKeyAndGo (key, options && options.callback ? options.callback : function () {});
                if (plugin.config.events && plugin.config.events.onStartQuiz) {
                    plugin.config.events.onStartQuiz.apply (null, []);
                }
            },

            // New function to handle the submission of all answers
            submitQuiz: function() {
                var $this = this;
                $this.stopTimer();
                var allQuestions = $(_element + ' ' + _questions + ' > li');
                plugin.config.score = 0;
                allQuestions.each(function() {
                    $(this).removeClass(correctClass + ' ' + incorrectClass + ' ' + completeClass);
                    $(this).find(_responses + ' li').hide();
                });

                allQuestions.each(function() {
                    var questionLI = $(this);
                    var questionIdAttr = questionLI.attr('id');
                    if (typeof questionIdAttr === 'undefined' || !questionIdAttr.startsWith('question')) {
                        if (typeof console !== 'undefined' && console.warn) {
                            console.warn('SlickQuiz: submitQuiz - Skipping an li element due to missing or invalid ID:', questionLI[0]);
                        }
                        return;
                    }
                    var questionIndex = parseInt(questionIdAttr.replace(/(question)/, ''), 10);
                    var questionData = questions[questionIndex];
                    if (!questionData || typeof questionData.a === 'undefined') {
                        questionLI.addClass(incorrectClass).addClass(completeClass);
                        questionLI.find(_responses).show();
                        questionLI.find('input').prop('disabled', true);
                        if (typeof console !== 'undefined' && console.warn) {
                            console.warn('SlickQuiz: submitQuiz - Missing questionData or answers for questionIndex:', questionIndex, questionLI[0]);
                        }
                        return;
                    }
                    var answers = questionData.a;
                    var selectAny = questionData.select_any ? questionData.select_any : false;
                    var answerLIs = questionLI.find(_answers + ' li');
                    answerLIs.removeClass(correctResponseClass + ' ' + incorrectResponseClass);
                    var trueAnswers = [];
                    for (var i_a in answers) {
                        if (answers.hasOwnProperty(i_a)) {
                            var answer = answers[i_a];
                            if (answer.correct) {
                                trueAnswers.push(parseInt(i_a, 10));
                            }
                        }
                    }
                    var selectedAnswers = [];
                    var answerSelects = answerLIs.find('input:checked');
                    answerSelects.each(function() {
                        var id = $(this).attr('id');
                        selectedAnswers.push(parseInt(id.replace(/(.*_question\d{1,}_)/, ''), 10));
                    });
                    if (plugin.config.preventUnanswered && selectedAnswers.length === 0) {
                        questionLI.addClass('unanswered');
                    } else {
                        questionLI.removeClass('unanswered');
                    }
                    var correctResponse = $this.compareAnswers(trueAnswers, selectedAnswers, selectAny);
                    if (correctResponse) {
                        questionLI.addClass(correctClass);
                        plugin.config.score++;
                    } else {
                        questionLI.addClass(incorrectClass);
                    }
                    questionLI.find(_responses).show();
                    questionLI.find(correctResponse ? _correctResponse : _incorrectResponse).show();
                    questionLI.find('input').prop('disabled', true);
                    questionLI.addClass(completeClass);
                });

                $(_element + ' .submitQuiz').hide();
                var $viewResultsButton = $('<a href="#" class="button viewResults">View Results</a>');
                $quizArea.append($viewResultsButton);
                $viewResultsButton.on('click', $.proxy(function(e) {
                    e.preventDefault();
                    this.completeQuiz();
                    $(e.currentTarget).hide();
                }, $this));
            },

            // Resets (restarts) the quiz (hides results, resets inputs, and displays first question)
            resetQuiz: function(startButton, options) {
                var $this = this;
                $this.resetTimer();
                var key, keyNotch, kN;
                key = internal.method.getKey (1);
                keyNotch = internal.method.getKeyNotch;
                kN = keyNotch;
                $quizResults.fadeOut(300, function() {
                    $(_element + ' input').prop('checked', false).prop('disabled', false);
                    $quizLevel.attr('class', 'quizLevel');
                    $(_element + ' ' + _question).removeClass(correctClass).removeClass(incorrectClass).removeClass(completeClass);
                    $(_element + ' ' + _answer).removeClass(correctResponseClass).removeClass(incorrectResponseClass);
                    $(_element + ' .viewResults').remove();
                    $(_element + ' ' + _question + ',' +
                      _element + ' ' + _responses + ',' +
                      _element + ' ' + _response + ',' +
                      _element + ' ' + _nextQuestionBtn + ',' +
                      _element + ' ' + _prevQuestionBtn + ',' +
                      _element + ' ' + _checkAnswerBtn + ',' +
                      _element + ' .submitQuiz'
                    ).hide();
                    $(_element + ' ' + _questionCount + ',' +
                      _element + ' ' + _answers
                    ).show();
                    $quizArea.append($(_element + ' ' + _questions)).show();
                    kN(key,1).apply(null, []);
                    $this.startQuiz({callback: plugin.config.animationCallbacks.startQuiz},$quizResults); 
                });
                internal.method.turnKeyAndGo (key, options && options.callback ? options.callback : function () {});
            },

            // Validates the response selection(s), displays explanations & next question button
            checkAnswer: function(checkButton, options) { 
                var key, keyNotch, kN;
                key = internal.method.getKey (2); 
                keyNotch = internal.method.getKeyNotch; 
                kN = keyNotch; 
                var questionLI    = $($(checkButton).parents(_question)[0]),
                    answerLIs     = questionLI.find(_answers + ' li'),
                    answerSelects = answerLIs.find('input:checked'),
                    questionIndex = parseInt(questionLI.attr('id').replace(/(question)/, ''), 10),
                    answers       = questions[questionIndex].a,
                    selectAny     = questions[questionIndex].select_any ? questions[questionIndex].select_any : false;
                answerLIs.addClass(incorrectResponseClass);
                var trueAnswers = [];
                for (var i_ans_check in answers) {
                    if (answers.hasOwnProperty(i_ans_check)) {
                        var answer = answers[i_ans_check],
                            index  = parseInt(i_ans_check, 10);
                        if (answer.correct) {
                            trueAnswers.push(index);
                            answerLIs.eq(index).removeClass(incorrectResponseClass).addClass(correctResponseClass);
                        }
                    }
                }
                var selectedAnswers = [];
                answerSelects.each( function() {
                    var id = $(this).attr('id');
                    selectedAnswers.push(parseInt(id.replace(/(.*_question\d{1,}_)/, ''), 10));
                });
                if (plugin.config.preventUnanswered && selectedAnswers.length === 0) {
                    alert(plugin.config.preventUnansweredText);
                    return false;
                }
                var correctResponse = plugin.method.compareAnswers(trueAnswers, selectedAnswers, selectAny);
                if (correctResponse) {
                    questionLI.addClass(correctClass);
                } else {
                    questionLI.addClass(incorrectClass);
                }
                questionLI.find(correctResponse ? _correctResponse : _incorrectResponse).show();
                if (plugin.config.perQuestionResponseMessaging) {
                    $(checkButton).hide();
                    if (!plugin.config.perQuestionResponseAnswers) {
                        questionLI.find(_answers).hide({
                            duration: 0,
                            complete: function() {
                                questionLI.addClass(completeClass);
                            }
                        });
                    } else {
                        questionLI.addClass(completeClass);
                    }
                    questionLI.find('input').prop('disabled', true);
                    questionLI.find(_responses).show();
                    questionLI.find(_nextQuestionBtn).fadeIn(300, kN(key,1));
                    questionLI.find(_prevQuestionBtn).fadeIn(300, kN(key,2));
                    if (!questionLI.find(_prevQuestionBtn).length) kN(key,2).apply (null, []);
                } else {
                    kN(key,1).apply (null, []); 
                    kN(key,2).apply (null, []); 
                }
                internal.method.turnKeyAndGo (key, options && options.callback ? options.callback : function () {});
             },
            // Moves to the next question OR completes the quiz if on last question
            nextQuestion: function(nextButton, options) { 
                var key, keyNotch, kN;
                key = internal.method.getKey (1);
                keyNotch = internal.method.getKeyNotch;
                kN = keyNotch;
                var currentQuestion = $($(nextButton).parents(_question)[0]),
                    nextQuestion    = currentQuestion.next(_question),
                    answerInputs    = currentQuestion.find('input:checked');
                if (plugin.config.preventUnanswered && answerInputs.length === 0) {
                    return false;
                }
                if (nextQuestion.length) {
                    currentQuestion.fadeOut(300, function(){
                        nextQuestion.find(_prevQuestionBtn).show().end().fadeIn(500, kN(key,1));
                        if (!nextQuestion.find(_prevQuestionBtn).show().end().length) kN(key,1).apply (null, []);
                    });
                } else {
                    kN(key,1).apply (null, []);
                    plugin.method.completeQuiz({callback: plugin.config.animationCallbacks.completeQuiz});
                }
                internal.method.turnKeyAndGo (key, options && options.callback ? options.callback : function () {});
            },
            // Go back to the last question
            backToQuestion: function(backButton, options) { 
                var key, keyNotch, kN;
                key = internal.method.getKey (2); 
                keyNotch = internal.method.getKeyNotch; 
                kN = keyNotch; 
                var questionLI = $($(backButton).parents(_question)[0]),
                    responses  = questionLI.find(_responses);
                if (responses.css('display') === 'block' ) {
                    questionLI.find(_responses).fadeOut(300, function(){
                        questionLI.removeClass(correctClass).removeClass(incorrectClass).removeClass(completeClass);
                        questionLI.find(_responses + ', ' + _response).hide();
                        questionLI.find(_answers).show();
                        questionLI.find(_answer).removeClass(correctResponseClass).removeClass(incorrectResponseClass);
                        questionLI.find('input').prop('disabled', false);
                        questionLI.find(_answers).fadeIn(500, kN(key,1)); 
                        questionLI.find(_checkAnswerBtn).fadeIn(500, kN(key,2));
                        questionLI.find(_nextQuestionBtn).hide();
                        if (questionLI.attr('id') != 'question0') {
                            questionLI.find(_prevQuestionBtn).show();
                        } else {
                            questionLI.find(_prevQuestionBtn).hide();
                        }
                    });
                } else {
                    var prevQuestion = questionLI.prev(_question);
                    questionLI.fadeOut(300, function() {
                        prevQuestion.removeClass(correctClass).removeClass(incorrectClass).removeClass(completeClass);
                        prevQuestion.find(_responses + ', ' + _response).hide();
                        prevQuestion.find(_answers).show();
                        prevQuestion.find(_answer).removeClass(correctResponseClass).removeClass(incorrectResponseClass);
                        prevQuestion.find('input').prop('disabled', false);
                        prevQuestion.find(_nextQuestionBtn).hide();
                        prevQuestion.find(_checkAnswerBtn).show();
                        if (prevQuestion.attr('id') != 'question0') {
                            prevQuestion.find(_prevQuestionBtn).show();
                        } else {
                            prevQuestion.find(_prevQuestionBtn).hide();
                        }
                        prevQuestion.fadeIn(500, kN(key,1));
                        kN(key,2).apply (null, []); 
                    });
                }
                internal.method.turnKeyAndGo (key, options && options.callback ? options.callback : function () {});
            },

            // Hides all questions, displays the final score and some conclusive information
            completeQuiz: function(options) {
                var $this = this;
                var key, keyNotch, kN;
                key = internal.method.getKey (1);
                keyNotch = internal.method.getKeyNotch;
                kN = keyNotch;

                var score = plugin.config.score;
                var numQuestions = questions.length;
                var percentage = 0;
                if (plugin.config.scoreAsPercentage) {
                    percentage = (score / numQuestions * 100);
                    $quizScore.find('span').text(percentage.toFixed(0) + '%');
                } else {
                    $quizScore.find('span').text(score + ' / ' + numQuestions);
                }
                var levelRank = $this.calculateLevel(score);
                if (levelRank && levelRank !== '') {
                    $quizLevel.find('span').text(levelRank);
                    $quizLevel.show();
                } else {
                    $quizLevel.hide();
                }
                $quizArea.fadeOut(300, function() {
                    $quizResults.fadeIn(300, kN(key,1));
                });
                internal.method.turnKeyAndGo(key, options && options.callback ? options.callback : function () {});
                if (plugin.config.events && typeof plugin.config.events.onCompleteQuiz === 'function') {
                    plugin.config.events.onCompleteQuiz.call($this, {
                        score: score,
                        questionCount: numQuestions,
                        percentage: percentage
                    });
                }
            },

            // Helper for calculating level
            calculateLevel: function (score) {
                var numQuestions = questions.length;
                var percentage = (score / numQuestions) * 100;
                var level = null;
                if (quizValues && quizValues.info) {
                    if (quizValues.info.level1 && percentage >= 90) {
                        level = quizValues.info.level1;
                    } else if (quizValues.info.level2 && percentage >= 70) {
                        level = quizValues.info.level2;
                    } else if (quizValues.info.level3 && percentage >= 50) {
                        level = quizValues.info.level3;
                    } else if (quizValues.info.level4 && percentage >= 20) {
                        level = quizValues.info.level4;
                    } else if (quizValues.info.level5) {
                        level = quizValues.info.level5;
                    }
                }
                return level;
            },

            // Compares selected responses with true answers, returns true if they match exactly
            compareAnswers: function(trueAnswers, selectedAnswers, selectAny) {
                if ( selectAny ) {
                    return $.inArray(selectedAnswers[0], trueAnswers) > -1;
                } else {
                    return ($(trueAnswers).not(selectedAnswers).length === 0 && $(selectedAnswers).not(trueAnswers).length === 0);
                }
            },

            startTimer: function() {
                var $this = this;
                if (timerRunning) return;
                startTime = new Date().getTime();
                timerInterval = setInterval(function() {
                    $this.updateTimerDisplay();
                }, 1000);
                timerRunning = true;
            },

            stopTimer: function() {
                clearInterval(timerInterval);
                timerRunning = false;
            },

            resetTimer: function() {
                this.stopTimer();
                var $quizTimeSpan = $('#quizTime');
                if ($quizTimeSpan.length) {
                    $quizTimeSpan.text('00:00');
                }
            },

            updateTimerDisplay: function() {
                var now = new Date().getTime();
                var distance = now - startTime;
                var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
                var seconds = Math.floor((distance % (1000 * 60)) / 1000);
                minutes = minutes < 10 ? '0' + minutes : minutes;
                seconds = seconds < 10 ? '0' + seconds : seconds;
                var $quizTimeSpan = $('#quizTime');
                if ($quizTimeSpan.length) {
                     $quizTimeSpan.text(minutes + ':' + seconds);
                }
            }
        };

        plugin.init = function() {
            // Setup quiz
            // Corrected call to setupQuiz to ensure 'this' inside setupQuiz is plugin.method
            plugin.method.setupQuiz({callback: plugin.config.animationCallbacks.setupQuiz});

            // Bind "start" button
            $quizStarter.on('click', function(e) {
                e.preventDefault();

                if (!this.disabled && !$(this).hasClass('disabled')) {
                    // Corrected call to startQuiz to ensure 'this' inside startQuiz is plugin.method
                    plugin.method.startQuiz({callback: plugin.config.animationCallbacks.startQuiz});
                }
            });

            // Bind "try again" button
            $(_element + ' ' + _tryAgainBtn).on('click', function(e) {
                e.preventDefault();
                plugin.method.resetQuiz(this, {callback: plugin.config.animationCallbacks.resetQuiz});
            });

            // Bind "check answer" buttons
            $(_element + ' ' + _checkAnswerBtn).on('click', function(e) {
                e.preventDefault();
                plugin.method.checkAnswer(this, {callback: plugin.config.animationCallbacks.checkAnswer});
            });

            // Bind "back" buttons
            $(_element + ' ' + _prevQuestionBtn).on('click', function(e) {
                e.preventDefault();
                plugin.method.backToQuestion(this, {callback: plugin.config.animationCallbacks.backToQuestion});
            });

            // Bind "next" buttons
            $(_element + ' ' + _nextQuestionBtn).on('click', function(e) {
                e.preventDefault();
                plugin.method.nextQuestion(this, {callback: plugin.config.animationCallbacks.nextQuestion});
            });

            // Accessibility (WAI-ARIA).
            var _qnid = $element.attr('id') + '-name';
            $quizName.attr('id', _qnid);
            $element.attr({
              'aria-labelledby': _qnid,
              'aria-live': 'polite',
              'aria-relevant': 'additions',
              'role': 'form'
            });
            $(_quizStarter + ', [href = "#"]').attr('role', 'button');
        };

        plugin.init();
    };

    $.fn.slickQuiz = function(options) {
        return this.each(function() {
            if (undefined === $(this).data('slickQuiz')) {
                var plugin = new $.slickQuiz(this, options);
                $(this).data('slickQuiz', plugin);
            }
        });
    };
})(jQuery);
