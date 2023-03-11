"use strict";

namespace core{

    export class Contact {
        private m_fullName: string;
        private m_phoneNumber: string;
        private m_emailAddress: string;
        constructor(fullName : string = "", phoneNumber :string= "", emailAddress: string = "") {
            this.m_fullName = fullName;
            this.m_phoneNumber = phoneNumber;
            this.m_emailAddress = emailAddress;
        }

        //getters
       public get FullName() : string {
            return this.m_fullName;
        }

        public get PhoneNumber() : string{
            return this.m_phoneNumber;
        }

       public get EmailAddress() :string {
            return this.m_emailAddress;
        }

        //setters
        public set FullName(fullName: string) {
            this.m_fullName = fullName;
        }

       public set PhoneNumber(phoneNumber:string) {
            this.m_phoneNumber = phoneNumber;
        }

        public set EmailAddress(emailAddress: string) {
            this.m_emailAddress = emailAddress;
        }

       public toString() :string {
            return `Full Name: ${this.FullName}\n Phone Number: ${this.PhoneNumber}\n Email Address: ${this.EmailAddress}`;
        }

        public serialize() : string | null{
            if (this.FullName !== "" && this.PhoneNumber !== "" && this.EmailAddress !== "") {
                return `${this.FullName}, ${this.PhoneNumber}, ${this.EmailAddress}`;

            }
            console.error("One or more of the properties of the contact object are missing or invalid");
            return null;
        }

       public deserialize(data: string): void{
            let propertyArray = data.split(",");
            this.m_fullName = propertyArray[0];
            this.m_phoneNumber = propertyArray[1];
            this.m_emailAddress = propertyArray[2];
        }

    }



}