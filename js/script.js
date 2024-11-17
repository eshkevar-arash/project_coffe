let navList = document.querySelector('.nav__list');
let navItems = Array.from(navList.querySelectorAll('.nav__item'));
let sections = document.querySelectorAll('.main-section'); // پیدا کردن تمام sectionها
let headerTop = document.querySelector('.header-top');
let navHamburger = document.querySelector('.nav__hamburger');
document.addEventListener("scroll", () => {
    const scrollBar = document.querySelector(".progress-bar");
    const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
    const scrollPosition = window.scrollY;

    const scrollPercentage = (scrollPosition / scrollHeight) * 100;
    scrollBar.style.width = scrollPercentage + "%";
});

function activateNavItemOnScroll() {
    let scrollPosition = window.scrollY;

    sections.forEach((section, index) => {
        let sectionTop = section.offsetTop;
        let sectionHeight = section.offsetHeight;

        // چک می‌کنیم آیا بخش در موقعیت دید کاربر قرار گرفته است
        if (scrollPosition >= sectionTop - sectionHeight / 3 &&
            scrollPosition < sectionTop + sectionHeight - sectionHeight / 3) {

            // حذف کلاس active از تمام آیتم‌ها
            navItems.forEach(item => item.classList.remove('active'));

            // اضافه کردن کلاس active به آیتم متناظر با بخش در موقعیت دید
            navItems[index].classList.add('active');
        }
    });
}
navList.addEventListener('click', (event) => {
    let clickedItem = event.target.closest('.nav__item'); // اگر روی فرزندهای li کلیک شد، li را پیدا می‌کند
    console.log(clickedItem)
    if (clickedItem) {
        let index = navItems.indexOf(clickedItem);

        // حذف کلاس active از تمام آیتم‌ها
        navItems.forEach(item => item.classList.remove('active'));

        // اضافه کردن کلاس active به آیتم کلیک شده
        clickedItem.classList.add('active');
        // رفتن به بخش متناظر با ایندکس آیتم
        let targetSection = sections[index]; // پیدا کردن بخش متناظر با ایندکس
        if (targetSection) {
            targetSection.scrollIntoView({
                behavior: 'smooth', // پیمایش روان
                block: 'start' // بخش به بالای صفحه بیاید
            });
        }
    }
});


let coverElem = document.querySelector('.cover')
navHamburger.addEventListener('click', function() {
    navHamburger.classList.toggle('open');  // تغییر وضعیت آیکن همبرگر
    navList.classList.toggle('open')
    coverElem.classList.toggle('fade')
})
coverElem.addEventListener('click',function (){
    navHamburger.classList.remove('open');  // تغییر وضعیت آیکن همبرگر
    navList.classList.remove('open')
    coverElem.classList.remove('fade')
})

window.addEventListener('scroll', function() {
    activateNavItemOnScroll()

    // بررسی مقدار اسکرول صفحه
    if (window.scrollY > 50) { // اگر از بالای صفحه 50 پیکسل پایین رفته بود
        headerTop.classList.add('scrolled'); // کلاس جدید اضافه کن
    } else {
        headerTop.classList.remove('scrolled'); // کلاس را حذف کن
    }
});




let headerFormElem = document.querySelector('.header-form')
headerFormElem.addEventListener('submit', event => event.preventDefault())

let formInputElems = document.querySelectorAll('.form-input')
function inputReset(){
    formInputElems.forEach(function (input){
        input.value = ''
    })
}
formInputElems = Object.values(formInputElems)
formInputElems.forEach(function (input){
    input.addEventListener('input',function (){
        if (input.value === ''){
            this.parentElement.classList.remove('toTop')
        }else {
            this.parentElement.classList.add('toTop')
        }
    })
})


const dropdowns = document.querySelectorAll('.dropdown');

dropdowns.forEach((dropdown) => {
    const btn = dropdown.querySelector('.dropdown-btn');
    const menu = dropdown.querySelector('.dropdown-menu');
    const items = dropdown.querySelectorAll('.dropdown-item');
    const hiddenInput = dropdown.parentElement.querySelector('.form-input');

    // نمایش یا مخفی کردن منو
    btn.addEventListener('click', () => {
        menu.classList.toggle('show');
    });

    // انتخاب آیتم
    items.forEach((item) => {
        item.addEventListener('click', () => {
            btn.textContent = item.textContent; // تغییر متن دکمه به متن آیتم
            hiddenInput.value = item.getAttribute('data-value'); // مقدار input را به مقدار آیتم تنظیم کن
            menu.classList.remove('show'); // بستن منو
            dropdown.parentElement.classList.add('toTop'); // جابجایی لیبل
        });
    });

    // بستن منو با کلیک خارج از دراپ‌داون
    document.addEventListener('click', (e) => {
        if (!dropdown.contains(e.target)) {
            menu.classList.remove('show');
        }
    });
});






formInputElems = document.querySelectorAll('.form-input, .form-select'); // شامل select هم شود
formInputElems = Object.values(formInputElems);

formInputElems.forEach(function (input) {
    input.addEventListener('input', function () {
        if (input.value === '') {
            this.parentElement.classList.remove('toTop');
        } else {
            this.parentElement.classList.add('toTop');
        }
    });

    // برای select: هنگام تغییر مقدار
    input.addEventListener('change', function () {
        if (input.value === '') {
            this.parentElement.classList.remove('toTop');
        } else {
            this.parentElement.classList.add('toTop');
        }
    });
});


const quantitySelector = document.querySelector('.quantity-selector');
const decrementBtn = quantitySelector.querySelector('.decrement');
const incrementBtn = quantitySelector.querySelector('.increment');
const quantityInput = quantitySelector.querySelector('.quantity-input');
const hiddenInput = document.getElementById('quantity');

// تابع برای به‌روزرسانی مقدار
function updateQuantity(value) {
    const min = parseInt(quantityInput.min);
    const max = parseInt(quantityInput.max);
    const newValue = Math.min(Math.max(value, min), max); // محدود کردن مقدار به بازه
    quantityInput.value = newValue;
    hiddenInput.value = newValue;

    // فعال/غیرفعال کردن دکمه‌ها
    decrementBtn.disabled = newValue === min;
    incrementBtn.disabled = newValue === max;
}

// دکمه کاهش
decrementBtn.addEventListener('click', () => {
    updateQuantity(parseInt(quantityInput.value) - 1);
});

// دکمه افزایش
incrementBtn.addEventListener('click', () => {
    updateQuantity(parseInt(quantityInput.value) + 1);
});

// تغییر مقدار دستی در ورودی
quantityInput.addEventListener('input', () => {
    updateQuantity(parseInt(quantityInput.value) || 1); // پیش‌فرض به 1 در صورت مقدار نامعتبر
});

// مقدار اولیه
updateQuantity(parseInt(quantityInput.value));


window.onload = function (){
    inputReset()
}
