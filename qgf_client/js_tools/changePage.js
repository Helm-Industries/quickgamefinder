//SCRIPT POUR LE CHANGEMENT D'AFFICHAGE DYNAMIQUE DE LA PAGE
var registerButton = document.getElementById("registerPageButton");
var currentPage = "login";
$("#bodyContent").load("./html/index/" + currentPage + ".html");
$("#" + currentPage).attr("href", "./css/index/" + currentPage + ".css");

function changeCurrentPage(nextPage) 
{
    $("#bodyContent").fadeOut(200, () => {
        $("#bodyContent").empty();
        $("#bodyContent").load("./html/index/" + nextPage + ".html");
        $("#" + currentPage).attr("href", "./css/index/" + nextPage + ".css");
        $("#" + currentPage).attr("id" , currentPage);
        currentPage = nextPage;
    });
    $("#bodyContent").fadeIn();

}
