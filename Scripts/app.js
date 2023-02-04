"use strict";

(function (){
    /**
     * Instantiates a contact and stores in localStorage
     * @param fullName
     * @param phoneNumber
     * @param emailAddress
     * @constructor
     */
    function AddContact(fullName, phoneNumber, emailAddress){
        let contact = new core.Contact(fullName.value, phoneNumber.value, emailAddress.value);
        if(contact.serialize()) {
            let key = contact.FullName.substring(0, 1) + Date.now();
            localStorage.setItem(key, contact.serialize());
        }
    }
    function DisplayHomePage(){
        console.log("Home Page");

        $("#AboutUsBtn").on("click",()=>{
            location.href = "about.html"
        });
        $("main").append(`<p id="MainParagraph" class="mt-3">This is my main paragraph</p>`);

        $("body").append(`<article class="container">
                <p id="ArticleParagraph" class="mt-3"> This is my article paragraph</p></article>`);
    }


    function DisplayProductsPage(){
        console.log("Products Page");


    }

    function DisplayServicesPage(){
        console.log("Services Page");


    }

    function DisplayAboutUsPage(){
        console.log("About Us Page");

        let sendButton = document.getElementById("sendButton");
        let subscribeCheckbox = document.getElementById("subscribeCheckBox");

        sendButton.addEventListener("click", function(event){
            event.preventDefault();
            if (subscribeCheckbox.checked){
                let contact = new core.Contact(fullName.value, phoneNumber.value, emailAddress.value);
                if(contact.serialize()){
                    let key = contact.FullName.substring(0,1) +Date.now();
                    localStorage.setItem(key, contact.serialize());

                }
            }
        });



    }
function DisplayContactListPage(){
    console.log("Contact List Page");

    if(localStorage.length >0){
        let contactList = document.getElementById("contactList");
        let data = "";
        let keys = Object.keys(localStorage);
        let index = 1;
        for(const key of keys){
            let contactData = localStorage.getItem(key);
            let contact = new core.Contact();
            contact.deserialize(contactData);
            data += `<tr><th scope="row" class="text-center>"${index}</th>
                     <td>$[contact.FullName}</td>
                     <td>${contact.phoneNumber}</td>
                     <td>${contact.emailAddress}</td>
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
            location.href = "edit.html#add" + $(this).val();

        });
        $("button.delete").on("click", function(){
            if(confirm("Delete contact, are you sure?")){
                localStorage.removeItem($(this).val())
            }
            location.href = "contact-list.html"
        })
    }


}

    function DisplayContactPage() {
        console.log("Contact Us Page");

        let sendButton = document.getElementById("sendButton");
        let subscribeCheckbox = document.getElementById("subscribeCheckBox");

        sendButton.addEventListener("click", function(event){
            event.preventDefault();
            if (subscribeCheckbox.checked){
                let contact = new core.Contact(fullName.value, phoneNumber.value, emailAddress.value);
                if(contact.serialize()){
                    let key = contact.FullName.substring(0,1) +Date.now();
                    localStorage.setItem(key, contact.serialize());

                }
            }
        });
        sendButton.addEventListener("click", function()
        {
            event.preventDefault();
            if(subscribeCheckbox.checked){
                console.log("Checkbox checked!")
            }
        });

    }
    function DisplayEditContactPage() {
        console.log("Edit Contact Page");
        let page = location.hash.substring(1);
        switch (page){
            case "add":
                $("main>h1").text("Add Contact");
                $("#editButton").html(`<i class="fas fa-plus-circle fa-sm"</i> Add`);
                $("editButton").on("click", (event) => {
                    event.preventDefault();
                    new AddContact(fullName.value, phoneNumber.value, emailAddress.value);
                    location.href = "contact-list.html";
                });
                $("#cancelButton").on("click", ()=>{
                    location.href = "contact-list.html";
                })

                                 break;
            default:{ //edit-case
                //get contact info from localStorage
                let contact = new Contact ();
                contact.deserialize(localStorage.getItem(page));
                // display the contact info in the edit form
                $("#fullName").val(contact.FullName);
                $("#phoneNumber").val(contact.PhoneNumber);
                $("#emailAddress").val(contact.EmailAddress);

                //when editButton is pressed- update the contact
                $("#editButton").on("click", (event) =>{
                    event.preventDefault();
                    //get changes
                    contact.FullName = $("#fullName").val();
                    contact.ContactNumber = $("#phoneNumber").val();
                    contact.EmailAddress = $("emailAddress").val();

                    //replace item in local storage
                    localStorage.setItem(page, contact.serialize());
                    //return to contact-list
                    location.href = "contact-list.html";
                });


            }
            break;
        }
    }
    function Start()
    {
        console.log("App Started!")
        switch (document.title)
        {
            case "Assignment1":
                DisplayHomePage();
                break;
            case "Products":
                DisplayProductsPage();
                break;
            case "Our Services":
                DisplayServicesPage();
                break;
            case "About Us":
                DisplayAboutUsPage();
                break;
            case "Contact Us":
                DisplayContactPage();
                break;
            case "Contact List":
                DisplayContactListPage();
            break;
            case "Edit Contact":
                DisplayEditContactPage();
                break;

        }
    }
    window.addEventListener("load", Start)

})();
