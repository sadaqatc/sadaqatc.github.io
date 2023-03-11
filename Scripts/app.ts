"use strict";




(function (){
    /**
     * Instantiates a contact and stores in localStorage
     * @param fullName
     * @param phoneNumber
     * @param emailAddress
     * @constructor
     */
    function AddContact(fullName: string, phoneNumber: string, emailAddress: string){
        let contact = new core.Contact(fullName, phoneNumber, emailAddress);
        if(contact.serialize()) {
            let key = contact.FullName.substring(0, 1) + Date.now();
            localStorage.setItem(key, contact.serialize()as string);
        }
    }

    function AjaxRequest(method: string, url: string, callback: Function){
        let xhr = new XMLHttpRequest();
        xhr.addEventListener("readystatechange", () =>{
            if(xhr.readyState === 4 && xhr.status ===200)
            {
                if(typeof callback ==="function"){
                    callback(xhr.responseText);

                }else{
                    console.error("Error: callback is not a valid function.");
                }


            }

        });
        xhr.open(method, url);
        xhr.send();
    }
    function LoadHeader(){
        $.get("/views/components/header.html", function(html_data) {
            $("header").html(html_data);
            document.title = capitalizeFirstLetter(router.ActiveLink);
            $(`li > a:contains(${document.title})`).addClass("active");
            CheckLogin();


        });

    }
    function capitalizeFirstLetter(str: string){
        return str.charAt(0).toUpperCase()+str.slice(1);
    }
    function LoadFooter(){
        $.get("/views/components/footer.html", function(html_data) {
            $("footer").html(html_data);



        });

    }
    function LoadContent(){
        let page_name= router.ActiveLink;
        let callback = ActiveLinkCallBack();
        $.get(`./Views/content/${page_name}.html`, function(html_data){
            $("main").html(html_data);
            callback();
        });
    }
    function DisplayHomePage(){
        console.log("Home Page");



        $("#AboutUsBtn").on("click", () => {
            location.href = "about.html"
        });

        $("main").append(`<p id="MainParagraph" class="mt-3"> This is the main paragraph</p>`);
        $("body").append(`<article class="container"><p id="ArticleParagraph" class="mt-3">This is my article paragraph</p>`)
    }

    function DisplayProductsPage(){
        console.log("Products Page");
    }

    function DisplayServicesPage(){
        console.log("Services Page");
    }

    function DisplayAboutUsPage(){
        console.log("About us Page");
    }

    /**
     * This function will validate a input provided based on a given regular expresssion
     *@param {string} input_field_id
     * @param {RegEx} regular_expression
     * @param {string} error_message
     * @constructor
     */
    function validateField(input_field_id: string, regular_expression: RegExp, error_message:string){
        let messageArea = $("#messageArea");
        $(input_field_id).on("blur",function() {


            let fullNameText = $(this).val() as string;
            if (!regular_expression.test(fullNameText)) {
                //fail validation
                $(this).trigger("focus").trigger("select");
                messageArea.addClass("alert alert-danger").text(error_message).show();
        }else {
                //pass validation
                messageArea.removeAttr("class").hide();

            }
    });
    }

    function ContactFormValidation(){
        validateField("#fullName",
            /^([A-Z][a-z]{1,3}\.?\s)?([A-Z][a-z]+)+([\s,-]([A-z][a-z]+))*$/,
            "Please enter a valid first and last name (ex: Matt Murdock)");
        validateField("#contactNumber", /^(\+\d{1,3}[\s-.])?\(?\d{3}\)?[\s-.]?\d{3}[\s-.]\d{4}$/,
            "Please enter a valid phone contact number.");
        validateField("#emailAddress", /^[a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z]{2,10}$/,
            "Please enter a valid email address");

    }

    function DisplayContactPage(){
        console.log("Contact Us Page");
        ContactFormValidation();

        let sendButton = document.getElementById("sendButton") as HTMLElement;
        let subscribeCheckbox = document.getElementById("subscribeCheckBox") as HTMLInputElement;

        sendButton.addEventListener("click", function(event){

            if (subscribeCheckbox.checked){
                let fullName = document.forms[0].fullName.value;
                let contactNumber= document.forms[0].phoneNumber.value;
                let emailAddress = document.forms[0].emailAddress.value;
                let contact = new core.Contact(fullName.value, contactNumber.value, emailAddress.value);
                if(contact.serialize()){
                    let key = contact.FullName.substring(0,1) +Date.now();
                    localStorage.setItem(key, contact.serialize()as string);
                }
            }
        });
    }

    function DisplayContactListPage(){
        console.log("Contact List Page");

        if(localStorage.length >0){
            let contactList = document.getElementById("contactList")as HTMLElement;
            let data = "";
            let keys = Object.keys(localStorage);
            let index = 1;
            for(const key of keys){
                let contactData = localStorage.getItem(key) as string;
                let contact = new core.Contact();
                contact.deserialize(contactData);
                data += `<tr><th scope="row" class="text-center>"${index}</th>
                     <td>${contact.FullName}</td>
                     <td>${contact.PhoneNumber}</td>
                     <td>${contact.EmailAddress}</td>
                     <td class="text-center">
                         <button value="${key}" class="btn btn-primary btn-sm edit">
                            <i class="fas fa-edit fa-sm"></i>Edit</button>
                     </td>
                      <td class="text-center">
                        <button value="${key}" class="btn btn-danger btn-sm delete">
                            <i class="fas fa-trash-alt fa-sm"></i>Delete</button>
                     </td>
                     
                     </tr>`;
                index++;
            }
            contactList.innerHTML = data;

            $("#addButton").on("click", () => {
                location.href = "edit.html#add";

            });
            $("button.delete").on("click", function(){
                if(confirm("Delete contact, are you sure?")){
                    localStorage.removeItem($(this).val() as string)
                }
                location.href = "contact-list.html"
            })
        }

    }

    function DisplayEditPage(){
        console.log("Edit Contact Page");
        ContactFormValidation();

        let page = location.hash.substring(1);
        switch (page){
            case "add":
                $("main>h1").text("Add Contact");
                $("#editButton").html(`<i class="fas fa-plus-circle fa-sm"</i> Add`);

                $("#editButton").on("click", (event) => {
                    event.preventDefault();


                    let fullName = document.forms[0].fullName.value;
                    let contactNumber= document.forms[0].phoneNumber.value;
                    let emailAddress = document.forms[0].emailAddress.value;

                    AddContact(fullName.value, contactNumber.value, emailAddress.value);
                    location.href = "contact-list.html";
                });

                $("#cancelButton").on("click", ()=> {
                    location.href = "contact-list.html";
                });

                break;
            default:{ //edit-case
                //get contact info from localStorage
                let contact = new core.Contact ();
                contact.deserialize(localStorage.getItem(page)as string);
                // display the contact info in the edit form
                $("#fullName").val(contact.FullName);
                $("#phoneNumber").val(contact.PhoneNumber);
                $("#emailAddress").val(contact.EmailAddress);

                //when editButton is pressed- update the contact
                $("#editButton").on("click", (event) =>{
                    event.preventDefault();
                    //get changes

                    contact.FullName = $("#fullName").val()as string;
                    contact.PhoneNumber = $("#phoneNumber").val() as string;
                    contact.EmailAddress = $("#emailAddress").val()as string;

                    //replace item in local storage
                    localStorage.setItem(page, contact.serialize()as string);
                    //return to contact-list
                    location.href = "contact-list.html";
                });


            }
                break;
        }
    }


    function DisplayLoginPage(){
        console.log("Login Page");
        let messageArea = $("#messageArea");
        messageArea.hide();
        $("#loginButton").on("click", function(){
            let success = false;
            let newUser = new core.User();
            $.get("./data/user.json",function(data){
               for(const user of data.user){
                   let username = document.forms[0].username.value
                   let password = document.forms[0].password.value


                   if(username === user.Username && password ===user.Password){
                       success = true;
                       newUser.fromJSON(user);
                       break;

                   }
               }
               if (success){
                   sessionStorage.setItem("user", newUser.serialize()as string);
                   messageArea.removeAttr("class").hide();
               }else{
                   //failed authentication
                   $("#username").trigger("focus").trigger("select");
                   messageArea.addClass("alert alert-danger")
                       .text("Error: Invalid Credentials!");
               }
            });
            $("#cancelButton").on("click", function(){
                document.forms[0].reset();
                location.href = "index.html"

            });
        });
    }
    function CheckLogin(){
        if(sessionStorage.getItem("user"))
        {
            $("#login").html(`<a id="logout" class="nav-link" href="#"><i class="fas fa-sign-out-alt"></i>Logout</a>`)

        }
        $("#logout").on("click", function(){
            sessionStorage.clear();
            location.href = "login.html";
        });
    }
    function DisplayRegisterPage(){
        console.log("Register Page");
    }
    function Display404Page(){
    console.log("404 Page");
    }
    function ActiveLinkCallBack(): Function{
        switch(router.ActiveLink){
            case "home": return DisplayHomePage;
            case "about": return DisplayAboutUsPage;
            case "services": return DisplayServicesPage;
            case "contact": return DisplayContactPage;
            case "contact-list": return DisplayContactListPage;
            case "products": return DisplayProductsPage;
            case "register": return DisplayRegisterPage;
            case "login": return DisplayLoginPage;
            case "edit": return DisplayEditPage;
            case "404": return Display404Page;
            default:
                console.error("ERROR: callback does not exist" + router.ActiveLink);
               return new Function;
        }
    }
    function Start()
    {

        console.log("App Started!");
        LoadHeader();
        LoadContent();

        LoadFooter();


    }
    window.addEventListener("load", Start)

})();