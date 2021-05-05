import AbstractView from "./AbstractView.js";

export default class extends AbstractView{
    constructor(params){
        super(params);
        this.setTitle('Costumize');
    }
    async getHTML(){
        return `<div class="costumize-meniu">
        <h1>Costumize</h1>
        </div>`
    };
}