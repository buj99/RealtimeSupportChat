import AbstractView from "./AbstractView.js";

export default class extends AbstractView {
    constructor(params) {
        super(params);
        this.setTitle('User meniu ');
    }
    async getHTML() {
        return `<div class="user-meniu">

        <h1>User meniu </h1>
        </div>`
    };
}