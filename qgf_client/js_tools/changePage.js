//SCRIPT POUR LE CHANGEMENT D'AFFICHAGE DYNAMIQUE DE LA PAGE
var currentPage = "login";
$("#bodyContent").load("./html/index/" + currentPage + ".html");
$("#" + currentPage).attr("href", "./html/index/" + currentPage + ".css");

function changeCurrentPage(path, nextPage) 
{
    $("#bodyContent").fadeOut(200, () => {
        $("#bodyContent").empty();
        $("#bodyContent").load("./html/" + path + "/" + nextPage + ".html");
        $("#" + currentPage).attr("href", "./html/" + path + "/" + nextPage + ".css");
        $("#" + currentPage).attr("id" , nextPage);
        currentPage = nextPage;
    });
    $("#bodyContent").fadeIn();
}
