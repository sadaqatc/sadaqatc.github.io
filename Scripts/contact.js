"use strict";

(function (core){

    class Contact {
        constructor(fullName = "", phoneNumber = "", emailAddress = "") {
            this.FullName = fullName;
            this.PhoneNumber = phoneNumber;
            this.EmailAddress = emailAddress;
        }

        //getters
        get FullName() {
            return this.m_fullName;
        }

        get PhoneNumber() {
            return this.m_phoneNumber;
        }

        get EmailAddress() {
            return this.m_emailAddress;
        }

        //setters
        set FullName(fullName) {
            this.m_fullName = fullName;
        }

        set PhoneNumber(phoneNumber) {
            this.m_phoneNumber = phoneNumber;
        }

        set EmailAddress(emailAddress) {
            this.m_emailAddress = emailAddress;
        }

        toString() {
            return `Full Name: ${this.FullName}\n Phone Number: ${this.PhoneNumber}\n Email Address: ${this.EmailAddress}`;
        }

        serialize(){
            if (this.FullName !== "" && this.PhoneNumber !== "" && this.EmailAddress !== "") {
                return `${this.FullName}, ${this.PhoneNumber}, ${this.EmailAddress}`;

            }
            console.error("One or more of the properties of the contact object are missing or inavlid");
            return null;
        }

        deserialize(data){
            let propertyArray = data.split(",");
            this.FullName = propertyArray[0];
            this.PhoneNumber = propertyArray[1];
            this.EmailAddress = propertyArray[2];
        }

    }

    core.Contact = Contact;

})(core || (core ={}));