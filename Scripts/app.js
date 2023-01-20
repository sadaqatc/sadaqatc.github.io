"use strict";

(function (){
    function DisplayHomePage(){
        let AboutUsButton =document.getElementById("AboutUsBtn");
        AboutUsButton.addEventListener("click", function(){
            location.href = "about.html"
        });
    }
    let MainContent = document.getElementsByTagName("main")[0];
    let MainParagraph = document.createElement("p")
    MainParagraph.setAttribute("id", "MainParagraph")
    MainParagraph.setAttribute("class", "mt-3")
    MainParagraph.textContent = "This is the main Paragraph!"
    MainContent.appendChild(MainParagraph)
    let FirstString = "This is";
    let SecondString =  `${FirstString} the Main Paragraph. `;
    MainParagraph.textContent = SecondString;
    //Create Article
    let DocumentBody = document.getElementsByTagName("body")[0];
    let Article = document.createElement("article");
    let ArticleParagraph = `<p id="ArticleParagraph" class="mt-3">This is my article paragraph</p>`;
    Article.setAttribute("class","container");
    Article.innerHTML = ArticleParagraph;
    DocumentBody.appendChild(Article);


    function DisplayProductsPage(){

    }
    function DisplayServicesPage(){

    }
    function DisplayAboutUsPage(){

    }
    function DisplayContactsPage(){

    }
    function Start(){
        console.log("App Started!")
        switch(document.title)
        {
            case "Home":
                DisplayHomePage();
                break;
            case "Our Products":
                DisplayProductsPage();
                break;
            case "About Us":
                DisplayAboutUsPage();
                break;
            case "Our Services":
                DisplayServicesPage();
                break;
            case "Contact Us":
                DisplayContactsPage();
                break;
        }
    }
    window.addEventListener("load", Start)


})();
