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

function print_overall_result(){
    $("#question").html("You answer "+ correct_num + " questions correctly.");
    $("#choices").html("You answer "+ failure_num + " questions incorrectly.");
    $("#answer").html("You missed "+ missed_run + " questions questions.")
    $("#image").html("<img src=" + game_over_image + ">");
}

function print_questions_n_choices(){
    $("#answer").empty();
    $("#image").empty();

    // print question
    $("#question").html("<h2>" + questions[q_index].question + "</h2>");

    // print choice tags
    var buttons = $("<div>");
    for(var j = 0; j < 4; j++){
        var bnt = $("<input>");
        bnt.attr("type","button").attr("class",'bnt')
        bnt.attr("value",questions[q_index].choices[j]);
        // bnt.append($("<br>"));
        buttons.append(bnt,$("<br>"));
    }
    $("#choices").html(buttons);
}

function trivialGame(){
    start_new_game = false;
    can_select = true;
    q_index++;
    if(q_index < questions.length){
        // print timer
        var t = 10;
        myTimer(t--)
        timer = setInterval(function(){
                    myTimer(t--)
                }, SECOND);

        // Time out counter
        print_time_out = setTimeout(function(){
                            clearInterval(timer);
                            $("#answer").html("<h2>Time out!</h2><h2>The correct answer is: " + questions[q_index].answer+ "</h2");
                            $("#image").html("<img src=" + questions[q_index].image + ">");
                            missed_run++;                           
                        },SECOND*10);
        
        
        can_start_game = setTimeout(function(){
                            start_new_game = true;
                        },SECOND*14);
        
        print_questions_n_choices();
        
    }else{
        print_overall_result();
        clearInterval(game_controller);
    }
}

$("document").ready(function(){
    // Game controller running in back ground to check when to start game
    game_controller = setInterval(function(){
                        if(start_new_game){
                            trivialGame();
                        }
                    }, SECOND);

    // handle button click event
    $("#choices").on("click",".bnt",function(){
        if(can_select){
            can_select = false;
            clearInterval(timer); // Stop timer
            clearTimeout(print_time_out);  // stop print time out event
            clearTimeout(can_start_game); // stop can_start_game event
            if($(this).val() === questions[q_index].answer){ // If selected choice is correct
                $("#answer").html("<h2>Correct!</h2");
                $("#image").html("<img src=" + questions[q_index].image + ">");
                correct_num++;
            }else{
                $("#answer").html("<h2>Nope!</h2><h2>The correct answer is: " + questions[q_index].answer+ "</h2");
                $("#image").html("<img src=" + questions[q_index].image + ">");
                failure_num++;
            }

            // start game after 4 seconds
            setTimeout(trivialGame,SECOND*4);
        }    
    })
          
})