
import AbstractView from "./AbstractView.js";


export default class extends AbstractView{
    constructor(params){
        super(params);
        this.setTitle('Costumize');
    }


    async getHTML(){
        return `<section class="custom-container">
        <header class="header-costumize">
            <h1 class="txt">
                Personalize your chat! 
            </h1>
        </header>
       
        <form class="form-costumize">
            <div class="box">
                <p class="reg">Background theme: </p>  
                <label class="label-costumize" style="width:200px;">
                    <select>
                    <option   value="0">Light</option>
                    <option   value="1">Dark</option>    
                    </select>
                </label>
            </div>

            <div class="box">
                <p class="reg-costumize">Text color: </p>  
                <label class="label-costumize" style="width:200px;">
                    <select>
                    <option  value="0">Blue</option>
                    <option  value="1">Red</option> 
                    <option  value="2">Black</option> 
                    <option  value="3">Purple</option>    
                    </select>
                </label>        
            </div>

            <div class="box">
                <p class="reg">Choose your message:</p>
                <label class="c-container">Hello!What cand I help you with?
                    <input type="radio" checked="checked" name="radio">
                    <span class="checkmark"></span>
                </label>
                <label class="c-container">Hi! I am here to help you!
                    <input type="radio" name="radio">
                    <span class="checkmark"></span>
                </label>
                <label class="c-container">Hello! Can you explain me your problem?
                    <input type="radio" name="radio">
                    <span class="checkmark"></span>
                </label>
            </div>

            <label class="label-costumize" for="number-input">
                <input class="input-costumize" type="number" placeholder="Font-size" id="number-input">
            </label>
            <div class="box">
            <button class="button-customize" type="submit">
                Apply changes
            </button>
        </div>
        
        </form>
        <a href="/login" data-link>
            <input class="nav-button" type="button" name="" value="Back ">
         </a> 
    </section>
    
    `
    };
}