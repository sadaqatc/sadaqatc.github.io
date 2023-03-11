"use strict";

namespace core {


  export  class User {
      private m_displayName: string;
      private m_emailAddress: string;
      private m_username: string;
      private m_password: string;
        constructor(displayName:string = "", emailAddress:string = "", username:string = "", password:string = "") {
            this.m_displayName = displayName;
            this.m_emailAddress = emailAddress;
            this.m_username = username;
            this.m_password = password;
        }

        //getters
       public  get DisplayName():string {
            return this.m_displayName;
        }


        public get EmailAddress():string {
            return this.m_emailAddress;
        }

        public get Username() :string{
            return this.m_username;
        }

        public get Password():string {
            return this.m_password;
        }

        //setters
        public set DisplayName(displayName:string) {
            this.m_displayName = displayName;
        }


        public set EmailAddress(emailAddress: string) {
            this.m_emailAddress = emailAddress;
        }

        public set Username(username:string) {
            this.m_username = username;
        }

        public set Password(password:string) {
            this.m_password = password;
        }

       public  toString() : string{
            return `DisplayName: ${this.DisplayName}\n Email Address: ${this.EmailAddress} \n Username: ${this.Username}`;
        }

        public toJSON(): { Username: string, DisplayName: string, EmailAddress: string}{
            return {
                "DisplayName": this.m_displayName,
                "EmailAddress": this.m_emailAddress,
                "Username": this.m_username

            }
        }

        fromJSON(data: User) {
            this.m_displayName = data.DisplayName;
            this.m_emailAddress = data.EmailAddress;
            this.m_username = data.Username;
            this.m_password = data.Password;
        }

        public serialize(): string | null {
            if (this.DisplayName !== "" && this.Username !== "" && this.EmailAddress !== "" && this.m_password !== "") {
                return `${this.DisplayName}, ${this.EmailAddress},${this.Username}, ${this.Password}`;

            }
            console.error("One or more of the properties of the contact object are missing or inavlid");
            return null;
        }

        public deserialize(data: string) {
            let propertyArray = data.split(",");
            this.m_displayName = propertyArray[0];
            this.m_emailAddress = propertyArray[1];
            this.m_username = propertyArray[2];
            this.m_password = propertyArray [3];
        }

    }
}

