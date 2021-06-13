import AbstractView from "./AbstractView.js";

export default class extends AbstractView {
  constructor(params) {
    super(params);
    this.setTitle("Costumize");
  }
  //handlers
  saveBtnClickHandler(event) {
    console.log("save button clicked");
  }
  backBtnClickHandler(event) {
    console.log("back button clicked");
  }

  loadSetupDomElements() {
    const saveBtn = document.getElementsByClassName("save-btn")[0];
    saveBtn.addEventListener("click", this.saveBtnClickHandler);
    const backBtn = document.getElementsByClassName("back-btn")[0];
    backBtn.addEventListener("click", this.backBtnClickHandler);
  }
  async getHTML() {
    return `
    <div class="customize-container">
        <div class="image-container-costumization">
          <img src="./static/Images/background.jpg" />
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
              <input type="radio" name="small" id="small" />
            </div>
            <div class="option">
              <label for="normal">Normal</label>
              <input type="radio" name="normal" id="normal" />
            </div>

            <div class="option">
              <label for="large">Large</label>
              <input type="radio" name="small" id="large" />
            </div>
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
