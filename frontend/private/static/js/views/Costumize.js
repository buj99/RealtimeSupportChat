import AbstractView from "./AbstractView.js";
import UserMeniu from "./UserMeniu.js";

export default class extends AbstractView {
    constructor(params) {
            super(params);
            this.setTitle("Costumize");
            this.admin = window.localStorage.getItem("admin");
            this.uniqueAdminToken = window.localStorage.getItem("unique_admin_token_" + this.admin);


        }
        //handlers

    saveBtnClickHandler(event) {
        let adminName = document.getElementsByClassName("txt-picker")[1].value;
        let isInCorrectNameFormat = true;
        if (adminName != null && adminName != undefined) {
            for (let c of adminName) {
                if (c >= '0' && c <= '9' || c >= 'a' && c <= 'z' || c >= 'A' && c <= 'Z') {
                    continue;
                } else {
                    alert('White characters are not allowed!')
                    isInCorrectNameFormat = false;
                }
            }
        }
        if (adminName == "") {
            alert('The textbox is empty!')
            isInCorrectNameFormat = false;
        }
        if (isInCorrectNameFormat) {
            let adminPhotoLink = document.getElementsByClassName("photo-url picker")[0].value;
            let backgroudTheme =
                document.getElementsByClassName("color-picker")[0].value;
            let textColor = document.getElementsByClassName("color-picker")[1].value;
            let welcomeMessage = document.getElementById("welcomeMsg").value;

            let isSmallRadioButton = document.getElementsByName("choice")[0].checked;
            let isLargeRadioButton = document.getElementsByName("choice")[2].checked;
            let fontSize = "medium";
            if (isSmallRadioButton) {
                fontSize = "small";
            } else if (isLargeRadioButton) {
                fontSize = "large";
            }


            let admin = window.localStorage.getItem("admin");
            let authToken = window.localStorage.getItem("auth_token_" + admin);
            console.log(authToken)
            fetch("http://localhost:3000/admins/customizations/" + admin, {
                method: "POST",
                headers: {
                    auth_token: authToken,
                },
                body: JSON.stringify({
                    backgroudTheme: backgroudTheme,
                    textColor: textColor,
                    welcomeMessage: welcomeMessage,
                    fontSize: fontSize,
                    adminName: adminName,
                    adminPhotoLink: adminPhotoLink
                }),
            }).then((res) => {
                if (res.status == 200) alert("Your new customizations were sent");
            });
        }
    }



    backBtnClickHandler(event) {

        console.log("Back bttn clicked");
    }

    displayImage(event) {
        var img = new Image();
        let myUrl = document.getElementById("url-id");
        img.src = myUrl.value;

        // The URL isn't valid or the resource isn't a picture
        img.onerror = function() { alert("Provided URL does not point to a valid picture. " + myUrl.value) };
        // Ok, we have correct picture; display it
        img.onload = function() {
            document.getElementById("yourImgElement").src = img.src;
        };
    }

    loadSetupDomElements() {
        console.log(this.uniqueAdminToken)
        fetch("http://localhost:3000/admins/customizations/" + this.admin, {
                method: "GET",
                headers: { auth_unique_admin_token: this.uniqueAdminToken }
            })
            .then((res) => {
                return res.json();
            })
            .then((configuration) => {
                console.log(configuration)
                document.getElementsByClassName("txt-picker")[1].value = configuration.adminName;

                console.log(document.getElementsByClassName("photo-url picker")[0])
                document.getElementsByClassName("photo-url picker")[0].value = configuration.adminPhotoLink;
                document.getElementsByClassName("color-picker")[0].value = configuration.backgroudTheme;
                document.getElementsByClassName("color-picker")[1].value = configuration.textColor;
                document.getElementById("welcomeMsg").value = configuration.welcomeMessage;


                if (configuration.fontSize == "small") {
                    document.getElementById("small").checked = true;
                } else if (configuration.fontSize == "large") {
                    document.getElementById("large").checked = true;
                } else {
                    document.getElementById("normal").checked = true;
                }

                this.smallRadioButton = document.getElementsByName("choice")[0];
                this.normalRadioButton = document.getElementsByName("choice")[1];
                this.largeRadioButton = document.getElementsByName("choice")[2];
            })
        const saveBtn = document.getElementsByClassName("save-btn")[0];
        saveBtn.addEventListener("click", this.saveBtnClickHandler);
        const backBtn = document.getElementsByClassName("back-btn")[0];
        backBtn.addEventListener("click", this.backBtnClickHandler);
        const previewBtn = document.getElementsByClassName("preview")[0];
        previewBtn.addEventListener("click", this.displayImage);

    }


    async getHTML() {
        return `
    <div class="customize-container">
        <div class="image-container-costumization">
          <img class="img-customize" src="http://localhost:8090/static/Images/background.jpg"  />
        </div>
        <div class="customization-options">
          <header></header>
          <div class="background-color picker">
            <p>Choose background color</p>
            <input type="color" class="color-picker" />
          </div>
          <div class="text-color picker">
            <p>Choose text color</p>
            <input type="color" class="color-picker" />
          </div>
          <div class="welcome-message picker">
            <p>Default message </p>
            <textarea class="txt-picker" id="welcomeMsg" cols="30" rows="5"></textarea>
          </div>
          <div class="font-size picker">
            <div class="option">
              <label for="small">Small</label>
              <input type="radio" name="choice" id="small" />
            </div>
            <div class="option">
              <label for="normal">Normal</label>
              <input type="radio" name="choice" id="normal" />
            </div>
            <div class="option">
              <label for="large">Large</label>
              <input type="radio" name="choice" id="large" />
            </div>
          </div>

          <div class="admin-name picker">
              <p>Change admin name </p>
              <input type="text" class="txt-picker">
          </div>

          <div class="photo-url picker">
              <p>Url for your profile picture</p>
              <input type="url" id="url-id" class="txt-picker">
              <img id="yourImgElement" class="profile-photo" >
              <button class="preview">Preview</button>
            
          </div>

          <div class="btn-box">
            <button class="back-btn">Back</button>
            <button class="save-btn">Save</button>
          </div>
        </div>
      </div>
    `;
    }
}