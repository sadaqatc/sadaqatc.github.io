"use strict";

class Contact{
    constructor(fullName="", phoneNumber ="", emailAddress="") {
        this.FullName = fullName;
        this.PhoneNumber = phoneNumber;
        this.EmailAddress = emailAddress;
    }
    //getters
    get FullName(){
        return this.FullName;
    }
    get PhoneNumber(){
        return this.PhoneNumber;
    }
    get EmailAddress(){
        return this.EmailAddress;
    }
    //setters
    set FullName(fullName){
        this.m_fullName = fullName;
    }
    set PhoneNumber(phoneNumber){
        this.m_phoneNumber = phoneNumber;
    }
    set EmailAddress(emailAddress){
        this.m_emailAddress = emailAddress;
    }
    toString(){
        return `Full Name: ${this.FullName}\n Phone Number: ${this.PhoneNumber}\n Email Address: ${this.EmailAddress}`;
    }
    serialize(){
        if (this.FullName != "" && this.phoneNumber != "" && this.emailAddress != "") {
            return `${this.fullName}, ${this.phoneNumber}, ${this.emailAddress}`;

        }
        console.error("One or more of the properties of the contact object are missing or inavlid");
        return null;
    }
    deserialize(data){
        let propertyArray = data.split(",");
        this.FullName = propertyArray[0];
        this.phoneNumber = propertyArray[1];
        this.emailAddress = propertyArray[2];
    }


}
