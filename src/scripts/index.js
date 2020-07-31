const config = {
    baseURL: 'http://localhost:5500/',
};

async function fetchData(apiURL, parseJSON = true) {
    const response = await fetch(apiURL);
    if (!response.ok) {
        throw new Error(response.statusText);
    }
    let data = null;
    if (parseJSON) {
        data = await response.json();
    } else {
        data = await response.text();
    }
    return data;
}

class SingleView {
    constructor(selector, data) {
        this.data = data;
        this.root = document.querySelector(selector);
        this.lang = 'de';
        this.current = null;
    }

    open(inventoryNumber) {
        console.log(this.findData(inventoryNumber));
        console.log(inventoryNumber);
    }

    openWithUrl(url) {
        this.open(SingleView.getInventoryNumber(url));
    }

    /*switchTo(inventoryNumber) {

    }

    close() {

    }*/

    findData(inventoryNumber) {
        return this.data[this.lang]?.find((el) => el.inventoryNumber === inventoryNumber);
    }

    static getInventoryNumber(url) {
        return url.replace(config.baseURL, '').replace('#', '').replace('/', '').replace('/', '');
    }
}

(async () => {
    const data = {
        de: (await fetchData(`${config.baseURL}src/data/cda-paintings-v2.de.json`, true)).items,
        en: (await fetchData(`${config.baseURL}src/data/cda-paintings-v2.en.json`, true)).items,
    };

    const singleview = new SingleView('.singleview', data);

    // get url hash
    // if null => put '#/' as url hash
    // if !null => open single view

    if (window.location.hash === '') {
        window.location.hash = '#/';
    }
    else {
        singleview.openWithUrl(window.location.hash);
    }

    window.addEventListener('hashchange', (event) => {
        singleview.openWithUrl(event.newURL);
    });

    console.log(data);
})();
