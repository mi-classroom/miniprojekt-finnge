// eslint-disable-next-line no-unused-vars
class LangChooser {
    constructor(selector) {
        this.selector = selector;
        this.root = document.querySelector(`.${selector.root}`);
        this.bg = document.querySelector(`.${selector.bg}`);
        this.isOpen = false;

        this.init();
    }

    init() {
        window.addEventListener('langchange', () => {
            this.onLangChange();
        });
        this.onLangChange();
    }

    onLangChange() {
        if (!window.location.language) this.open();
        else this.close();
    }

    open() {
        if (this.isOpen) return;
        this.root.classList.add(`${this.selector.root}--visible`);
        this.bg.classList.add(`${this.selector.bg}--visible`);
        this.isOpen = true;
    }

    close() {
        if (!this.isOpen) return;
        this.root.classList.remove(`${this.selector.root}--visible`);
        this.bg.classList.remove(`${this.selector.bg}--visible`);
        this.isOpen = false;
    }
}
