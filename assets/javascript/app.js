var q1 = {
    question: "What is the heaviest naturally occurring element found on Earth?",
    choices: ["Uranium","Magnesium","Iron","Gold"],
    answer: "Uranium",
    image: "assets/images/uranium.jpg"
};

var q2 = {
    question: "Which scientist is considered the father of modern genetics?",
    choices: ["Charles Darwin","Albert Einstein","Gregor Mendel","Stephen Hawking"],
    answer: "Gregor Mendel",
    image: "assets/images/GregorMendel.jpg"
};

var q3 = {
    question: "What is the name for the branch of mathematics dealing with lengths and angles of triangles?",
    choices: ["Central Angle Theorem","Trigonometry","Orthopole","Symmedian"],
    answer: "Trigonometry",
    image: "assets/images/Trigonometry.png"
};

var q4 = {
    question: "What is the closest star to our own sun?",
    choices: ["Alpha Centauri","Mars","Proxima Centauri","Sirius"],
    answer: "Proxima Centauri",
    image: "assets/images/ProximaCentauri.jpg"
};

var q5 = {
    question: "Which U.S. President made the first telephone call to the moon?",
    choices: ["Richard Nixon","Lyndon Johnson","John Kennedy","Alben Barkley"],
    answer: "Richard Nixon",
    image: "assets/images/RichardNixon.jpg"
};

var q6 = {
    question: "What is the most common blood type in humans?",
    choices: ["A","B","C","O+"],
    answer: "O+",
    image: "assets/images/oplus.jpg"
};

var q7 = {
    question: "In our solar system, which planet has the shortest day?",
    choices: ["Mercury","Venus","Saturn","Jupiter"],
    answer: "Jupiter",
    image: "assets/images/jupiter.jpg"
};

var q8 = {
    question: "Bronze is an alloy consisting primarily of what two elements?",
    choices: ["Copper & Tin","Iron & Copper","Tin & Iron","Iron & Aluminium"],
    answer: "Copper & Tin",
    image: "assets/images/bronze.jpeg"
};

var q9 = {
    question: "What vitamin is produced when a person is exposed to sunlight?",
    choices: ["Vitamin B","Vitamin E","Vitamin A","Vitamin D"],
    answer: "Vitamin D",
    image: "assets/images/VitaminD.jpeg"
};

var q10 = {
    question: "What is the third most abundant gas in Earth’s atmosphere?",
    choices: ["oxygen","Argon","Carbon Dioxide","Neon"],
    answer: "Argon",
    image: "assets/images/argon.jpg"
};


var SECOND = 1000;
var questions = [q1,q2,q3,q4,q5,q6,q7,q8,q9,q10];
var q_index = -1;
var timer;
var can_start_game;
var print_time_out;
var can_select = true;
var start_new_game = true;
var game_controller;
var correct_num = 0;
var failure_num = 0;
var missed_run = 0;
var game_over_image = "assets/images/win.jpeg";

// print time
function myTimer(time){
    if(time > -1){
        $("#timer").html("<h2>Time remaining: " + time + "</h2>");
    }
}

// print the final result when player finishes the game
function print_overall_result(){
    $("#question").html("You answer "+ correct_num + " questions correctly.");
    $("#choices").html("You answer "+ failure_num + " questions incorrectly.");
    $("#answer").html("You missed "+ missed_run + " questions questions.")
    $("#image").html("<img src=" + game_over_image + ">");
    $("#restartbnt").attr("style","display:block");
}

// print question and choices
function print_questions_n_choices(){
    $("#answer").empty();
    $("#image").empty();

    // print question
    var q = (q_index+1) + "/" + questions.length +": " + questions[q_index].question;
    $("#question").html("<h2>" + q + "</h2>");

    // print choice
    var buttons = $("<div>");
    for(var j = 0; j < 4; j++){
        var bnt = $("<button>");
        bnt.attr("class",'bnt')
        bnt.text(questions[q_index].choices[j]);
        buttons.append(bnt,$("<br>"));
    }
    $("#choices").html(buttons);
}

// change questions order every time player restart the game
function shuffle_question_array(array){
    for (var i = array.length - 1; i > -1; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
    return array;
}

// change questions' choice order every time player restart the game
function shuffle_answers_array(){
    for(var i = 0; i < questions.length; i++){
        questions[i].choices = shuffle_question_array(questions[i].choices);
    }
}

// game function and set checker and game killer process
function trivialGame(){
    start_new_game = false;
    can_select = true;
    q_index++;
    if(q_index < questions.length){  // if player doesn't answer all questions
        // print timer
        var t = 20;
        myTimer(t--);
        timer = setInterval(function(){
                    myTimer(t--)
                }, SECOND);

        // Print answer when time out
        print_time_out = setTimeout(function(){
                            clearInterval(timer);
                            var a = "The correct answer is: " + questions[q_index].answer;
                            $("#answer").empty();
                            $("#answer").append("<h2>Time out!</h2>");
                            $("#answer").append("<h2>" + a + "</h2");
                            $("#image").html("<img src=" + questions[q_index].image + ">");
                            missed_run++;                           
                        },SECOND*20);
        
        // set the game start checker to continue with next question
        can_start_game = setTimeout(function(){
                            start_new_game = true;
                        },SECOND*25);
        
        print_questions_n_choices();
        
    }else{
        print_overall_result();
    }
}

$("document").ready(function(){

    // shuffle the questions array and choice array
    questions = shuffle_question_array(questions);
    shuffle_answers_array();

    // Game controller running in back ground to check when to start game
    game_controller = setInterval(function(){
                        if(start_new_game){
                            trivialGame();
                        }
                    }, SECOND);

    // handle button click event
    $("#choices").on("click",".bnt",function(){
        if(can_select){  //allow player to select answer when game is on.
            can_select = false;
            clearInterval(timer); // Stop timer
            clearTimeout(print_time_out);  // stop print time out event
            clearTimeout(can_start_game); // stop can_start_game event
            if($(this).text() === questions[q_index].answer){ // If selected choice is correct
                $("#answer").html("<h2>Correct!</h2");
                $("#image").html("<img src=" + questions[q_index].image + ">");
                correct_num++;
            }else{
                $("#answer").empty();
                $("#answer").append("<h2>Nope!</h2>");
                $("#answer").append("<h2>The correct answer is: " + questions[q_index].answer+ "</h2");
                $("#image").html("<img src=" + questions[q_index].image + ">");
                failure_num++;
            }

            // start game after 4 seconds
            setTimeout(trivialGame,SECOND*5);
        }    
    })

    // handle restart game event
    $("#restart").on("click","#restartbnt",function(){
        correct_num = 0;
        failure_num = 0;
        missed_run = 0;
        q_index = -1;
        questions = shuffle_question_array(questions);
        shuffle_answers_array();
        start_new_game = true;
        $("#restartbnt").attr("style","display:none");
    })
          
})