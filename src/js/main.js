// On load
function domLoaded() {
    document.querySelector('body').classList.add('page-loaded');
}

window.addEventListener("DOMContentLoaded", domLoaded);


// BS popovers and tooltips
$(function () {
    $('.chart-popover').popover({
        container: 'body',
        trigger: 'click',
        html: true
    });
    $('.popoverIsShown').popover('show');
});

$(function () {
    $('[data-toggle="tooltip"]').tooltip()
});

// Logos slider TODO

// Fire publication slider
$(document).ready(function () {
    $('.slider-logos').slick({
        infinite: true,
        dots: false,
        arrows: false,
        slidesToShow: 8,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 2000,
        speed: 1500,
        swipeToSlide: true,
        responsive: [
            {
                breakpoint: 560,
                settings: {
                    slidesToShow: 3,
                }
            },
        ]
    });
});

// Fire testimonials slider
if ($(window).width() > 800) {
    $(document).ready(function () {
        $('.pf-testimonials').slick({
            infinite: false,
            dots: false,
            arrows: false,
            variableWidth: true,
            slidesToShow: 2,
            slidesToScroll: 1
        });
    });
}

// Handling modal data
(function () {
    window.addEventListener("DOMContentLoaded", function () {

        var modalScreensData = document.querySelectorAll('.js-modal-data');
        var modalTitle = document.getElementById('modal-screen-title');
        var modalDesc = document.getElementById('modal-screen-desc');
        var modalImage = document.getElementById('modal-screen-image');

        for (var i = 0; i < modalScreensData.length; i++) {
            modalScreensData[i].addEventListener('click', function () {
                var modalScreenTitle = this.getAttribute("data-modal-title");
                var modalScreenDesc = this.getAttribute("data-modal-desc");
                var modalScreenImage = this.getAttribute("src").slice(0, -4);

                modalTitle.innerHTML = modalScreenTitle;
                modalDesc.innerHTML = modalScreenDesc;
                modalImage.setAttribute('src', '' + modalScreenImage + '-large.png');
            });
        }

    });
})();

// Mobile menu
(function () {
    window.addEventListener("DOMContentLoaded", function () {

        var menuMobBtn = document.getElementById('menu-mob-trigger');
        var menuMob = document.getElementById('menu-mob');

        menuMobBtn.addEventListener('click', function (e) {
            e.preventDefault();
            this.classList.toggle('is-open');
            menuMob.classList.toggle('is-open');
        });
    });
})();