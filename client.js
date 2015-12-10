

$(document).ready(function() {

    console.log("ready");

//login

    $("#loginbtn").click(function () {

        var username = $("#username").val();
        var password = $("#password").val();

        var logindata = {
            username: username,
            password: password
        };  // making a data object with login information.

if( username == "" || password== ""){
    alert("please fill both password and username");

}
else {


    console.log(JSON.stringify(logindata));

        $.ajax({
            type: "POST",
            url: "http://localhost:8888/api/login",
            data: JSON.stringify(logindata),

            success: function (data) {

                sessionStorage.setItem("userID", data.userid);
                window.location.href = 'menu.html';
            },

            error: function () {
                alert('you have fucked something up. plz try again.');
            }
        });
    } // ends if-else statement
    }); // end of login.

    $("#registernewuser").click(function() {
        var Username = $("#createnewuser_username").val();
        var Password = $("#createnewuser_password").val();
        var FirstName = $("#createnewuser_firstname").val();
        var LastName = $("#createnewuser_lastname").val();
        var Email = $("#createnewuser_email").val();


        var newuser = {
            Username: Username,
            Password: Password,
            Firstname: FirstName,
            Lastname: LastName,
            Email: Email
        };        // ends newuser object.



        $.ajax({
            type:"POST",
            url:"http://localhost:8888/api/users/",
            data: JSON.stringify(newuser),

            succes: function(newuser){
                alert("welcome to SNAKE /n the most awesome Snakegame ever!");
                window.location.href= 'menu.html';
            },
            error: function () {
                alert("you've fucked something up. plz try again.");
            }
        });
    });

   /*$("#registernewuserID").validate({

        rules: {
            createnewuser_username:{
                required: true,
                minlength: 2
            },
            createnewuser_password:{
                required: true,
                minlength: 6
            },
            createnewuser_verifypassword:{
                required: true,
                equalTo:"#createnewuser_password"
            },
            createnewuser_firstname:{
                requierd: true,
                minlength: 2
            },
            createnewuser_lastname:{
                required: true,
                minlength: 2
            },
            createnewuser_email:{
                required: true,
                email: true
            }
        } //closes rules
    });
    //closes validation*/


    // create new game
    $("#creategamebtn").click(function () {

        var createnewgame = {
            name: $("#gamename").val(),

            host: {
                id: sessionStorage.getItem('userID'),
                controls: $("#controls").val()
            },

            mapSize: $("#mapsize").val()
        };
        console.log(window.sessionStorage); // made for test during coding
        console.log(createnewgame);

        $.ajax({
            type: "POST",
            url: "http://localhost:8888/api/games/",
            data: JSON.stringify(createnewgame),

            success: function (data) {
                console.log(window.sessionStorage);
                alert("Game was created");
               window.location.href = 'joingame.html';
            },

            error: function () {
                alert("you've fucked something up. plz try again.");
            }
        });
    });

    //Join and execute game

    $("#joingamebtn").click(function(){
        var joinnewgame = {
            gameId: $("#joingameid").val(),
                opponent: {
                    id: sessionStorage.getItem('userID')
                } // ends.


        }; // ends joinnewgame object

        $.ajax({
            type: "POST",
            url: "http://localhost:8888/api/games/join/",
            data: JSON.stringify(joinnewgame),

            success: function(data){
                sessionStorage.setItem("gameID", data.game);
                alert("The game was joined. The game ID is: " + sessionStorage.getItem("gameID"));
                window.location.href= 'startgame.html';
            },

            error: function(){
                alert("Something when wrong. plz try something else.");
            }

        });//ends joinnewgame ajax


        });// end of Join and execute game.


    //Start game
    $("#startgamebtn").click(function(){

        var startnewgame ={
            gameId: $("#startgameid").val(),
                opponent: {
                    controls: $("#oppcontrols").val()
                }

        };
        $.ajax({
           type:"POST",
            url:"http://localhost:8888/api/games/start/",
            data: JSON.stringify(startnewgame),

            success: function(data){
                alert("The was was executed. Go to highscore in the menu bar and see how far up the highscore list you are.");

            },
            error: function(){
                alert("Something didn't go right. please give it another shot.")
            }


        });//ends start game ajax




    });// ends the start game function


    $.ajax({
        type: "GET",
        url: "http://localhost:8888/api/scores/",

        success: function (data) {
            console.log(data);

            data.forEach(function (item){
                var highscoretable =
                    "<tr><td>" + item.game.created + "</td><td>" + item.user.username + "</td><td>" + item.score + "</td><td>" + item.game.name + "</td></tr>";

                $("#highscoretable").append(highscoretable);


            });

        },

        error: function () {
            alert("Something didn't go as expected. give it another shot");
        }
    });//ends highscore ajaxs




    // delete game

    $("#deletegamebtn").click(function(){

        var gameID = $("#gameid").val();


        $.ajax({
            type: "POST",
            url : "http://localhost:8888/api/games/" + gameID,
            data: JSON.stringify(gameID),

            succes: function(){
                alert("game was deleted!")
            }

        })
    });



$("#logoutbtn" + "#logout").click(function(){
    console.log("session storage is cleared!");
    sessionStorage.clear();

}); //clears the userID saved in session Storage every time the user logs out.




});       // denne tuborgklamme lukker DOM