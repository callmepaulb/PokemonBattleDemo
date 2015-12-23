var charmander = {
    name: "Charmander",
    health: 100,
    lvl: 12,
    effect: null,
    moves: [{
            name: "Ember",
            type: "Attack",
            power: 40,
            accuracy: .80
    },
        {
            name: "Scratch",
            type: "Attack",
            power: 30,
            accuracy: .90
    },
        {
            name: "Growl",
            type: "Defense",
            power: .20,
            accuracy: 1.0
    },
        {
            name: "Smokescreen",
            type: "Defense",
            power: .65,
            accuracy: .90
    }]

};

var pikachu = {
    name: "Pikachu",
    health: 100,
    lvl: 12,
    effect: null,
    moves: [{
            name: "Thunder Shock",
            type: "Attack",
            power: 40,
            accuracy: .80
    },
        {
            name: "Tail Whip",
            type: "Defense",
            power: .75,
            accuracy: .90
    },
        {
            name: "Growl",
            type: "Defense",
            power: .20,
            accuracy: 1.0
    },
        {
            name: "Quick Attack",
            type: "Attack",
            power: 30,
            accuracy: .90
    }]

};

var currentState;
var cpuPokemon;
var userPokemon;

var cpuTurn = {
    play: function () {
        var randomMove = Math.floor(Math.random() * 4);
        var currentCPUMove = cpuPokemon.moves[randomMove];

        var setUpCPUField = function () {
            $("#chat-text").text("What will " + cpuPokemon.name + " do?");
            prepareToAttack();
        };

        var prepareToAttack = function () {
            $("#pikachu-img").animate({
                top: "-=25"
            }, 150, function () {
                $("#pikachu-img").animate({
                    top: "+=25"
                }, 150, function () {
                    $("#pikachu-img").animate({
                        top: "-=25"
                    }, 150, function () {
                        $("#pikachu-img").animate({
                            top: "+=25"
                        }, 150)
                    });
                })
            });
            getAccuracy();
        };

        var getAccuracy = function () {
            var setAccuracy = Math.random();
            if (setAccuracy <= currentCPUMove.accuracy) {
                $("#chat-text").text(cpuPokemon.name + " used " + currentCPUMove.name + "!");
                getMoveType();
            } else {
                $("#chat-text").text(cpuPokemon.name + " used " + currentCPUMove.name + " but it missed!");
                currentState = playerTurn;
                setTimeout(loop, 1500);
            }
        };

        var getMoveType = function () {
            showMoveAnimation();

            if (currentCPUMove.type == "Attack") {
                setTimeout(attackingMove, 1500);
            } else {
                setTimeout(defensiveMove, 1500);
            }
        };

        var showMoveAnimation = function () {
            if (currentCPUMove.name == "Quick Attack") {
                $("#pikachu-img").animate({top: "+=85"}, 150);
                $("#pikachu-img").animate({right: "+=225"}, 150);
                $("#pikachu-img").animate({right: "-=225"}, 150);
                $("#pikachu-img").animate({right: "+=225"}, 150);
                $("#pikachu-img").animate({right: "-=225"}, 150);
                $("#pikachu-img").animate({top: "-=85"}, 150);
                $("#collision-img").addClass("cpu-collision-img");
                $("#collision-img").removeClass("hide");
                $("#collision-img").fadeIn(1120).fadeOut(220).fadeIn(220).fadeOut(220);
            } else if(currentCPUMove.name == "Growl"){
                $("#pika-growl-img").addClass("cpu-growl-img");
                $("#pika-growl-img").removeClass("hide");
                $("#pika-growl-img").fadeIn(120).fadeOut(120).fadeIn(120).fadeOut(120).fadeIn(120).fadeOut(120);
            } else if(currentCPUMove.name == "Tail Whip") {
                $("#pikachu-img").animate({right: "+=25"}, 150);
                $("#pikachu-img").animate({right: "-=25"}, 150);
                $("#pikachu-img").animate({right: "+=25"}, 150);
                $("#pikachu-img").animate({right: "-=25"}, 150);
            } else if(currentCPUMove.name = "Thunder Shock"){
                $("#tshock-img").addClass("cpu-tshock-img1");
                $("#tshock-img").removeClass("hide");
                $("#tshock-img").fadeIn(400).fadeOut(400).fadeIn(120).fadeOut(120).fadeIn(120).fadeOut(120);
            } 
        }
        
        var attackingMove = function () {
            if(!cpuPokemon.effect) {
                userPokemon.health -= currentCPUMove.power;
            } else {
                userPokemon.health -= (currentCPUMove.power) - (currentCPUMove.power * cpuPokemon.effect);
                cpuPokemon.effect = null;
            }
            $("#user-health-bar").css("width", userPokemon.health + "%");
            currentState = playerTurn;
            loop();
        };
        
        var defensiveMove = function () {
            userPokemon.effect = currentCPUMove.power;
            currentState = playerTurn;
            loop();
        };

        setUpCPUField();
    }
};

var playerTurn = {
    play: function () {
        var currentUserMove;
        
        var setUpUserField = function() {
            var moveButtons = ["#move1-text", "#move2-text", "#move3-text", "#move4-text"];
            
            $("#user-buttons").removeClass("hide");
            $("#chat-text").text("What will " + userPokemon.name + " do?");
            
            for (var i = moveButtons.length - 1; i >= 0; i--) {
              $(moveButtons[i]).text(userPokemon.moves[i].name);  
            };
        };
        
        var prepareToAttack = function () {
            $("#user-buttons").addClass("hide");
            
            $("#charmander-img").animate({
                left: "-=25"
            }, 150, function () {
                $("#charmander-img").animate({
                    left: "+=25"
                }, 150, function () {
                    $("#charmander-img").animate({
                        left: "-=25"
                    }, 150, function () {
                        $("#charmander-img").animate({
                            left: "+=25"
                        }, 150)
                    });
                })
            });
            getAccuracy();
        };
        
        var getAccuracy = function () {
            var setAccuracy = Math.random();
            
            if (setAccuracy <= currentUserMove.accuracy) {
                $("#chat-text").text(userPokemon.name + " used " + currentUserMove.name + "!");
                getMoveType();
            } else {
                $("#chat-text").text(userPokemon.name + " used " + currentUserMove.name + " but it missed!");
                currentState = cpuTurn;
                setTimeout(loop, 2500);
            }
        };
        
        var getMoveType = function () {
            showMoveAnimation();

            if (currentUserMove.type == "Attack") {
                setTimeout(attackingMove, 2500);
            } else {
                setTimeout(defensiveMove, 2500);
            }
        };
        
        var showMoveAnimation = function (){
            if (currentUserMove.name == "Ember"){
                $("#ember-img").addClass("user-ember-img");
                $("#ember-img").removeClass("hide");
                $("#ember-img").fadeIn(120).fadeOut(120).fadeIn(120).fadeOut(120).fadeIn(120).fadeOut(120);
                $("#ember-img").animate({right: "+=25"}, 150);
                $("#ember-img").fadeIn(120).fadeOut(120).fadeIn(120).fadeOut(120).fadeIn(120).fadeOut(120);
                $("#ember-img").animate({right: "-=25"}, 150);
            } else if (currentUserMove.name == "Scratch") {
                $("#scratch-img").addClass("user-scratch-img");
                $("#scratch-img").removeClass("hide");
                $("#scratch-img").fadeIn(120);
                $("#scratch-img").animate({right: "+=45", top: "+=45"}, 150);
                $("#scratch-img").fadeOut(120);
                $("#scratch-img").animate({right: "-=45", top: "-=45"}, 150);
            } else if (currentUserMove.name == "Growl") {
                $("#charmander-growl-img").addClass("user-growl-img");
                $("#charmander-growl-img").removeClass("hide");
                $("#charmander-growl-img").fadeIn(120).fadeOut(120).fadeIn(120).fadeOut(120).fadeIn(120).fadeOut(120);
            } else if (currentUserMove.name == "Smokescreen") {
                $("#smoke1-img").addClass("user-smoke1-img");
                $("#smoke1-img").removeClass("hide");
                $("#smoke1-img").fadeIn(120).fadeOut(120).fadeIn(120).fadeOut(120).fadeIn(120).fadeOut(120);
                $("#smoke2-img").addClass("user-smoke2-img");
                $("#smoke2-img").removeClass("hide");
                $("#smoke2-img").fadeIn(120).fadeOut(120).fadeIn(120).fadeOut(120).fadeIn(120).fadeOut(120);
            }
        };
        
         var attackingMove = function () {
            if(!userPokemon.effect) {
                cpuPokemon.health -= currentUserMove.power;
            } else {
                cpuPokemon.health -= (currentUserMove.power) - (currentUserMove.power * userPokemon.effect);
                userPokemon.effect = null;
            }
            $("#cpu-health-bar").css("width", cpuPokemon.health + "%");
            currentState = cpuTurn;
            loop();
        };
        
        var defensiveMove = function () {
            cpuPokemon.effect = currentUserMove.power;
            currentState = cpuTurn;
            loop();
        };
        
        $("#move1-button, #move2-button, #move3-button, #move4-button").unbind().click(function () {
            var move = $(this).attr("value");
            currentUserMove = userPokemon.moves[move];
            prepareToAttack();
        });
        
        
        setUpUserField();
    }
};

var loop = function () {
    if (cpuPokemon.health <= 0) {
        $("#pikachu-img").fadeOut(100);
        $("#chat-text").text("You defeated Pikachu! Refresh to start again!");
    } else if (userPokemon.health <= 0) {
        $("#chat-text").text("Game Over: You Lose.");
    } else {
        currentState.play();
    }
};

var init = function () {
    cpuPokemon = pikachu;
    userPokemon = charmander;
    $("#cpu-name").text(cpuPokemon.name);
    $("#cpu-lvl").text("lvl " + cpuPokemon.lvl);
    $("#user-name").text(userPokemon.name);
    $("#user-lvl").text("lvl " + userPokemon.lvl);
    currentState = playerTurn;
    loop();
};



init();