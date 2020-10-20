'use strict';

let cart = [];
const productsArray = [
        {
            id: "000001",
            imgsrc: "./img/small/Arduino%20Uno.png",
            title: "Arduino Uno",
            currency: "₽",
            price: 499.75,
        },
        {
            id: "000002",
            imgsrc: "./img/small/arduino-nano-atmega328.png",
            title: "Arduino Nano",
            currency: "₽",
            price: 399.96,
        },
        {
            id: "000003",
            imgsrc: "./img/small/esp32.png",
            title: "ESP32",
            currency: "₽",
            price: 599.93,
        },
        {
            id: "000004",
            imgsrc: "./img/small/esp8266%20NodeMCU.png",
            title: "ESP8266 NodeMCU v3",
            currency: "₽",
            price: 299.97,
        },
        {
            id: "000005",
            imgsrc: "./img/small/raspberry_pi_3_b.png",
            title: "Raspberry Pi 3b",
            currency: "₽",
            price: 2836.24,
        },
        {
            id: "000006",
            imgsrc: "./img/small/raspberry_pi_zero.jpg",
            title: "Raspberry Pi zero",
            currency: "₽",
            price: 1715.44,
        },
];

function Container() {
    this.name = "container";
    this.className = "container";
}

Container.prototype.render = function () {
    let div = document.createElement('div');
    div.id = this.id;
    div.classList.add(this.className);
    return div;
}

function Menu(_id, _class, _items) {
    Container.call(this);
    this.id = _id;
    this.className = _class;
    this.items = _items;
}

Menu.prototype = Object.create(Container.prototype);
Menu.prototype.constructor = Menu;
Menu.prototype.render = function () {
    let ul = document.createElement('ul');
    ul.id = this.id;
    ul.classList.add(this.className);
    for (let i = 0; i < this.items.length; i++) {
        if (this.items[i].item instanceof MenuItem) {
            ul.append(this.items[i].item.render());
        }
    }
    return ul;
}

function MenuItem(_href, _class, _aclass, _label, _submenu) {
    Container.call(this);
    this.href = _href;
    this.className = _class;
    this.aclass = _aclass;
    this.label = _label;
    this.submenu = _submenu;
}

MenuItem.prototype = Object.create(Container.prototype);
MenuItem.prototype.constructor = MenuItem;
MenuItem.prototype.render = function () {
    let li = document.createElement('li');
    li.classList.add(this.className);
    let a = document.createElement('a');
    a.href = this.href;
    a.classList.add(this.aclass);
    a.textContent = this.label;
    li.append(a);
    if(this.submenu){
        li.append(this.submenu.render());
    }
    return li;
}

function Product(_id, _class, _imgsrc, _title, _currency, _price) {
    Container.call(this);
    this.id = _id;
    this.className = _class;
    this.imgsrc = _imgsrc;
    this.title = _title;
    this.currency = _currency;
    this.price = _price;
}

Product.prototype = Object.create(Container.prototype);
Product.prototype.constructor = Product;
Product.prototype.render = function () {
    let productItem = document.createElement('div');
    productItem.id = this.id;
    productItem.classList.add(this.className);
    let img = document.createElement('img');
    img.src = this.imgsrc;
    img.width = "250";
    img.height = "250";
    productItem.append(img);
    let productItemSpec = document.createElement('div');
    productItemSpec.classList.add("product-item-spec");
    let h3 = document.createElement('h3');
    h3.textContent = this.title;
    productItemSpec.append(h3);
    let span = document.createElement('span');
    span.classList.add("product-item-spec-price");
    span.innerHTML = this.currency + " " + this.price;
    productItemSpec.append(span);
    let a = document.createElement('a');
    a.href = "#";
    a.id = "buybutton-"+this.id;
    a.classList.add("product-item-spec-button");
    a.textContent = "В корзину";
    a.addEventListener("click", buttonBuyHandler);
    productItemSpec.append(a);
    productItem.append(productItemSpec);
    return productItem;
}


function recalcCostLabel(){
    let cartSum = 0;
    for (var i = 0; i < cart.length; i++) {
        cartSum += +(cart[i].q * cart[i].price).toFixed(2);
    }
    cartSum = (+cartSum.toFixed(2));
    let cartCostLabel = document.getElementById("cart-cost");
    cartCostLabel.innerHTML = "&#8381; " + cartSum;
}

function getPriceById(productId){
    return productsArray.filter(elem => elem.id === productId)[0].price;
}

function addToCart(productId){
    let added = false;
    for(let i = 0; i < cart.length; i++){
        if(cart[i].id === productId){
            cart[i].q += cart[i].q;
            added = true;
            break;
        }
    }
    if(!added){
        cart.push({id: productId, q: 1, price: getPriceById(productId)});
    }
    recalcCostLabel();
    console.log(cart);
}

function buttonBuyHandler(e){
    e.preventDefault();
    let eIdArray = e.target.id.split('-');
    if(eIdArray[0]==="buybutton"){
        addToCart(eIdArray[1]);
    }
}

function getMenuArr() {
    return [
        {
            href: "#",
            label: "Controllers",
            submenu: [
                {
                    href: "#",
                    label: "ESP",
                },
                {
                    href: "#",
                    label: "Arduino",
                },
                {
                    href: "#",
                    label: "Raspberry",
                },
            ],
        },
        {
            href: "#",
            label: "Periferals",
            submenu: [
                {
                    href: "#",
                    label: "Thermosensors",
                },
                {
                    href: "#",
                    label: "Air quality",
                },
                {
                    href: "#",
                    label: "Relay",
                },
            ],

        },
        {
            href: "#",
            label: "About",
        },
        {
            href: "#",
            label: "Blog",
        },
        {
            href: "#",
            label: "Support",
        },
    ];
}

function getLatestProductsArray(){
    return productsArray.filter((element, index)  => index < 3);
}

function getPopularProductsArray(){
    return productsArray.filter((element, index) => index > 2 && index < 6);
}

function createMenu(){
    let menuArr = getMenuArr();
    let menuItem;
    for (let i = 0; i < menuArr.length; i++) {
        let submenu;
        if("submenu" in menuArr[i] && menuArr[i].submenu instanceof Array && menuArr[i].submenu.length > 0){
            let submenuArr = [];
            for(let j = 0; j<menuArr[i].submenu.length; j++){
                submenuArr.push({item: new MenuItem(menuArr[i].submenu[j].href, "page-header-nav-item-submenu-item", "page-header-nav-item-link", menuArr[i].submenu[j].label)});
            }
            submenu = new Menu("nav-menu-submenu-"+i, "page-header-nav-item-submenu", submenuArr);
        }
        menuArr[i].item = new MenuItem(menuArr[i].href, "page-header-nav-item", "page-header-nav-item-link", menuArr[i].label, submenu);
    }
    let menu = new Menu("nav-menu", "page-header-nav-menu", menuArr);
    let nav = document.getElementById('nav');
    nav.append(menu.render());
}

function showSectionsList(arr, sectionId){
    let div = document.getElementById(sectionId);
    for(let i = 0; i<arr.length; i++){
        div.append(new Product(arr[i].id, "product-item", arr[i].imgsrc, arr[i].title, arr[i].currency, arr[i].price).render());
    }
}


function init() {
    createMenu();
    showSectionsList(getLatestProductsArray(), "latestList");
    showSectionsList(getPopularProductsArray(), "popularList");
}
