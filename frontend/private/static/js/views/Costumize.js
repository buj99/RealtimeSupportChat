import AbstractView from "./AbstractView.js";

export default class extends AbstractView {
    constructor(params) {
            super(params);
            this.setTitle("Costumize");
        }
        //handlers
    saveBtnClickHandler(event) {
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
        fetch("http://localhost:3000/admins/customizations/" + admin, {
            method: "POST",
            headers: {
                auth_token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MGMzODVlMjk1ZmQwZmMwMjVkZDQwMjIiLCJpYXQiOjE2MjM1MjkxOTJ9.pNc27gbH9qi3wJtlIn4hES3InINGVte0oT3-MTzrZSE",
            },
            body: JSON.stringify({
                backgroudTheme: backgroudTheme,
                textColor: textColor,
                welcomeMessage: welcomeMessage,
                fontSize: fontSize,
                adminName: "George",
                adminPhotoLink: "https://fiverr-res.cloudinary.com/images/q_auto,f_auto/gigs/125568526/original/cd9c93141521436a112722e8c5c0c7ba0d60a4a2/be-your-telegram-group-admin.jpg"
            }),
        }).then((res) => {
            if (res.status == 200) console.log("succes!");
        });
    }

    backBtnClickHandler(event) {
        console.log("back button clicked");
    }

    displayImage(event){
      var img = new Image();
      let myUrl = document.getElementById("url-id");
      img.src=myUrl.value;
    
    // The URL isn't valid or the resource isn't a picture
    img.onerror = function() { alert("Provided URL does not point to a valid picture. "+myUrl.value) };
    
    // Ok, we have correct picture; display it
    img.onload = function() {
        document.getElementById("yourImgElement").src = img.src;
    };
    }

    loadSetupDomElements() {
        this.smallRadioButton = document.getElementsByName("choice")[0];
        this.smallRadioButton.onclick = () => {
            this.fontSize = "small";
        };
        this.normalRadioButton = document.getElementsByName("choice")[1];
        this.largeRadioButton = document.getElementsByName("choice")[2];
        const saveBtn = document.getElementsByClassName("save-btn")[0];
        saveBtn.addEventListener("click", this.saveBtnClickHandler);
        const backBtn = document.getElementsByClassName("back-btn")[0];
        backBtn.addEventListener("click", this.backBtnClickHandler);
        const previewBtn = document.getElementsByClassName("preview")[0];
        previewBtn.addEventListener("click",this.displayImage);
        
    }
        

    async getHTML() {
        return `
    <div class="customize-container">
        <div class="image-container-costumization">
          <img src="http://localhost:8090/static/Images/background.jpg" />
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
            <p>Say someting before your costumer sends you a message</p>
            <textarea name="" id="welcomeMsg" cols="30" rows="5"></textarea>
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