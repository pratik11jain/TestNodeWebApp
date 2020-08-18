// let myNode = document.querySelector('.pixgrid');
//     myNode.addEventListener(

class Listeners {
    constructor() {
        document.getElementById('clickName')?.addEventListener('click', (e: Event) => this.renderPage(e));
    }

    renderPage(e: Event): void {
        console.log(JSON.stringify(e));
    }
}

new Listeners();
