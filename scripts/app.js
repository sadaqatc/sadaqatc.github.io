"use strict";

//IIFE - Immediately Invoked Functional Expression
(function () {

    function CheckLogin(){
        if(sessionStorage.getItem("user")){
            $("#login").html(`<a id="logout" class="nav-link" href="#">
                                <i class="fa-solid fa-sign-out-alt"></i> Logout</a>`)


        }
        $("#logout").on("click", function(){

           sessionStorage.clear();
           location.href = "login.html";

        });


    }

    function LoadHeader(html_data){
        $("header").html(html_data);
        $(`li>a:contains(${document.title})`).addClass("active").attr("aria-current", "page");

        CheckLogin();
    }
    function AjaxRequest(method, url, callback){
        //Step 1: instantiate new XHR object
        let xhr = new XMLHttpRequest();

        //Step 2: Open XHR request
        xhr.open(method, url);

        //Step 4: Add event listener for the readystatechange event
        // THe readystatechange event is triggered when the state of a document being fetched chages
        xhr.addEventListener("readystatechange", () =>{

           if(xhr.readyState === 4 && xhr.status === 200){
               if(typeof callback == "function"){
                   callback(xhr.responseText);
               }else{
                   console.error("ERROR: callback not a function");
               }
           }

        });

        //Step 3: Send XHR request
        xhr.send();
    }

    function ContactFormValidation(){
        //FullName
        ValidateField("#fullName",
            /^([A-Z][a-z]{1,3}\.?\s)?([A-Z][a-z]+)+([\s,-]([A-z][a-z]+))*$/,
            "Please enter valid full name.");

        //ContactNumber
        ValidateField("#contactNumber",
            /^(\+\d{1,3}[\s-.])?\(?\d{3}\)?[\s-.]?\d{3}[\s-.]\d{4}$/,
            "Please enter valid contact number");

        //EmailAddress
        ValidateField("#emailAddress",
            /^[a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z]{2,10}$/,
            "Please enter valid email address");
    }
    /**
     * Validate form fields provided by users
     * @param input_field_id
     * @param regular_expression
     * @param error_message
     */
    function ValidateField(input_field_id, regular_expression, error_message){
        let messageArea = $("#messageArea").hide();

        // The "blue" event fires when an element has lost focus.
        $(input_field_id).on("blur", function (){
           let inputFieldText = $(this).val();
           if(!regular_expression.test(inputFieldText)){
               $(this).trigger("focus").trigger("select"); // select all the text in the fullName textbox
               messageArea.addClass("alert alert-danger").text(error_message).show();
           }else{
               messageArea.removeAttr("class").hide();
           }
        });
    }

    /**
     * Add contact to locationStorage
     * @param fullName
     * @param contactNumber
     * @param emailAddress
     */
    function AddContact(fullName, contactNumber, emailAddress){
        let contact = new core.Contact(fullName, contactNumber, emailAddress);
        if(contact.serialize()){
            let key = contact.fullName.substring(0,1) + Date.now();
            localStorage.setItem(key, contact.serialize());
        }
    }

    function DisplayHomePage(){
        console.log("Called DisplayHomePage()");

        $("#AboutUsBtn").on("click", () => {
            location.href = "about.html";
        });

        $("main").append(`<p id="MainParagraph" class="mt-3"> This is the first Paragraph </p>`);

        $("body").append('<article class ="container"> ' +
            '<p id="ArticleParagraph" class="mt-3">This is my article paragraph</p></article>');

    }
    function DisplayProductsPage(){
        console.log("Called DisplayProductsPage()");
    }
    function DisplayServicesPage(){
        console.log("Called DisplayServicesPage()");
    }
    function DisplayAboutPage(){
        console.log("Called DisplayAboutPage()");
    }
    function DisplayContactPage(){
        console.log("Called DisplayContactPage()");

        ContactFormValidation();

        let sendButton = document.getElementById("sendButton");
        let subscribeCheckbox = document.getElementById("subscribeCheckbox");

        sendButton.addEventListener("click", function(){
            if(subscribeCheckbox.checked){
                let contact = new Contact(fullName.value, contactNumber.value, emailAddress.value)
                if(contact.serialize()){
                    let key = contact.fullName.substring(0,1) + Date.now();
                    localStorage.setItem(key, contact.serialize())
                }

            }
        });
    }

    function DisplayContactListPage(){
        console.log("Called DisplayContactListPage()");

        if(localStorage.length > 0){
            let contactList = document.getElementById("contactList");
            let data = "";

            let keys = Object.keys(localStorage);

            let index = 1;
            for(const key of keys){
                let contact = new core.Contact();
                let contactData = localStorage.getItem(key);
                contact.deserialize(contactData);
                data += `<tr><th scope="row" class="text-center">${index}</th>
                            <td>${contact.fullName}</td>
                            <td>${contact.contactNumber}</td>
                            <td>${contact.emailAddress}</td>
                            <td class="text-center">
                                <button value="${key}" class="btn btn-primary btn-sm edit">
                                <i class="fas fa-edit fa-sm"> Edit</i>
                                </button>
                            </td>
                            <td>
                                <button value="${key}" class="btn btn-danger btn-sm delete">
                                <i class="fas fa-trash-alt fa-sm"> Delete</i>
                                </button>
                            </td>
                        </tr>`;
                index++;
            }
            contactList.innerHTML = data;
        }
        $("#addButton").on("click", () =>{
           location.href = "edit.html#add"
        });

        $("button.delete").on("click", function(){
           if(confirm("Please confirm to delete contact.")){
               localStorage.removeItem($(this).val())
           }
           location.href = "contact-list.html";
        });

        $("button.edit").on("click", function(){
            location.href = "edit.html#" + $(this).val();
        });
    }

    function DisplayEditPage(){
        console.log("Called DisplayEditPage()");
        ContactFormValidation();

        let page = location.hash.substring(1);

        switch(page){
            case "add":

                $("main>h1").text("Add Contact");
                $("#editButton").html(`<i class="fas fa-plus-circle fa-sm"/> Add`);
                $("#editButton").on("click", (event) => {
                    event.preventDefault();
                    AddContact(fullName.value, contactNumber.value, emailAddress.value);

                    location.href = "contact-list.html";
                });

                $("#cancelButton").on("click", () =>{
                   location.href = "contact-list.html";
                });

                break;
            default:
                // edit contact
                // https://localhost:3000/edit.html#{key}
                let contact = new core.Contact();
                contact.deserialize(localStorage.getItem(page));

                // Update form field
                $("#fullName").val(contact.fullName);
                $("#contactNumber").val(contact.contactNumber);
                $("#emailAddress").val(contact.emailAddress);

                $("#editButton").on("click", (event) => {

                    // prevent for submission
                    event.preventDefault();

                    contact.fullName = $("#fullName").val();
                    contact.contactNumber = $("#contactNumber").val();
                    contact.emailAddress = $("#emailAddress").val();

                    // replace the contact in localStorage
                    localStorage.setItem(page, contact.serialize());

                    location.href ="contact-list.html";

                });

                $("#cancelButton").on("click", () =>{
                    location.href = "contact-list.html";
                });

                break;
        }

    }

    function DisplayRegisterPage(){
        console.log("Called DisplayRegisterPage()");
    }

    function DisplayLoginPage(){
        console.log("Called DisplayLoginPage()");

        let messageArea = $("#messageArea").hide();

        $("#loginButton").on("click", function(){
           let success = false;
            let newUser = new core.User();

            $.get("./data/users.json", function(data){

                // request succeeded
                for(const user of data.users){
                    console.log(data.user);
                    if(username.value === user.Username && password.value === user.Password){

                        newUser.fromJSON(user);
                        success = true;
                        break;
                    }

                }

                if(success){
                    sessionStorage.setItem("user", newUser.serialize());
                    messageArea.removeAttr("class").hide();
                    location.href = "contact-list.html";
                }else{
                    $("#user").trigger("focus").trigger("select");
                    messageArea.addClass("alert alert-danger").text("Error: Invalid Credentials").show();
                }

                $("#cancelButton").on("click", function(){
                   document.forms[0].reset();
                   location.href = "index.html";

                });

            });

        });

    }
    function Start(){
        console.log("App Started");

        AjaxRequest("GET", "header.html", LoadHeader);

        switch(document.title){
            case "Home":
                DisplayHomePage();
                break;
            case "Products":
                DisplayProductsPage();
                break;
            case "Services":
                DisplayServicesPage();
                break;
            case "About Us":
                DisplayAboutPage()
                break;
            case "Contact Us":
                DisplayContactPage()
                break;
            case "Contact List":
                DisplayContactListPage()
                break;
            case "Edit Contact":
                DisplayEditPage()
                break;

            case "Register":
                DisplayRegisterPage()
                break;
            case "Login":
                DisplayLoginPage()
                break;

        }
    }
    window.addEventListener("load", Start);
})();


