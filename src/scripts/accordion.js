// eslint-disable-next-line no-unused-vars
class Accordion {
    constructor(element, selector, startOpen = true) {
        this.selector = selector;
        this.root = element;
        this.header = this.root.querySelector(`.${this.selector.header}`);
        this.list = this.root.querySelector(`.${this.selector.list}`);
        this.icon = this.root.querySelector(`.${this.selector.icon}`);
        this.artefacts = this.list.querySelectorAll(`.${this.selector.list}__item`);
        this.isOpen = startOpen;

        this.init();
    }

    init() {
        this.header.addEventListener('click', () => {
            this.switchState();
        });

        this.header.addEventListener('keydown', (event) => {
            if (event.code === 'Enter') this.switchState();
        });

        // language
        window.addEventListener('langchange', () => {
            this.onLangChange();
        });
        this.onLangChange();

        // colapse all
        document.getElementById(this.selector.collapse_all).addEventListener('change', (event) => {
            if (event.target.checked) {
                this.close();
            } else {
                this.open();
            }
        });

        // change size
        document.getElementById(this.selector.preview_size).addEventListener('change', (event) => {
            const { value } = event.target.selectedOptions[0];
            this.onSizeChange(value);
        });
    }

    switchState() {
        if (this.isOpen) this.close();
        else this.open();
    }

    open() {
        this.list.classList.remove(`${this.selector.list}--minified`);
        this.icon.innerHTML = 'expand_less';
        this.isOpen = true;
    }

    close() {
        this.list.classList.add(`${this.selector.list}--minified`);
        this.icon.innerHTML = 'expand_more';
        this.isOpen = false;
    }

    onLangChange() {
        this.artefacts.forEach((el) => {
            const newTitle = el.getAttribute(`data-title-${window.location.language}`);
            const inventoryNumber = el.getAttribute('data-inventoryNumber');

            const artefact = el.querySelector('.artefact');
            const artefactImage = el.querySelector('.artefact__image');

            artefact.setAttribute('title', newTitle);
            artefact.setAttribute('href', `#/${window.location.language}/${inventoryNumber}/`);
            artefactImage.setAttribute('alt', newTitle);
        });
    }

    onSizeChange(newSize) {
        this.list.classList.remove(`${this.selector.list}--big`);
        this.list.classList.remove(`${this.selector.list}--medium`);

        if (newSize !== 'small') {
            this.list.classList.add(`${this.selector.list}--${newSize}`);
        }
    }
}
