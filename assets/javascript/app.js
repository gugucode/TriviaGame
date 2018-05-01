var q1 = {
    question: "What is the heaviest naturally occurring element found on Earth?",
    choices: ["Uranium","Magnesium","Iron","Gold"],
    answer: "Uranium",
    image: "../images/uranium.jpg"
};

var q2 = {
    question: "Which scientist is considered the father of modern genetics?",
    choices: ["Charles Darwin","Albert Einstein","Gregor Mendel","Stephen Hawking"],
    answer: "Gregor Mendel",
    image: "../images/GregorMendel.jpg"
};

var questions = [q1,q2];

function myTimer(time){
    $("#timer").html("<h2>Time remaining: " + time + "</h2>");
}

$("document").ready(function(){
    var SECOND = 1000;
    console.log("hi");
    // for(var i = 0; i < questions.length; i++){
    // print timmer
    var t = 10;
    var timer = setInterval(function(){
        myTimer(t--)
    }, SECOND);

    setTimeout(function(){
        clearInterval(timer);
        $("#answer").html("<h2>Time out!</h2><h2>The correct answer is: " + questions[0].answer+ "</h2");
    },SECOND*(t+1));

    $("#question").html("<h2>" + questions[0].question + "</h2>");

    // create choice tags
    var choices_div = $("#choices");
    for(var j = 0; j < 4; j++){
        choices_div.append($("<input type='button' value='" + questions[0].choices[j] + "'><br>"));
    }

    $("input").on("click",function(){
        if($(this).val() === questions[0].answer){
            $("#answer").html("<h2>Correct!</h2");
        }else{
            $("#answer").html("<h2>Nope!</h2><h2>The correct answer is: " + questions[0].answer+ "</h2");
        }
    })
        
    // }
})