export default class {
    constructor(params) {
        this.params = params;
    }

    setTitle(title) {
        document.title = title;
    }
    loadSetupDomElements() {}
    async getHTML() {
        return "";
    }
}