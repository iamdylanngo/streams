
function init() {
    $("#player").css("display", "none");
    $("#chat-box").css("display", "none");

    $("#btnLogin").click(function () {
        var userName = $("#username").val();
        var password = $("#password").val();

        $("#player").css("display", "block");
        $("#chat-box").css("display", "block");
        $("#login").css("display", "none");
    });


    $("#btnRegister").click(function () {
        var userName = $("#username").val();
        var password = $("#password").val();

        // $("#player").css("display", "block");
        // $("#chat-box").css("display", "block");
        // $("#login").css("display", "none");
    });
}

init();