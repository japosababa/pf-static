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

<!--Handling the queries and publictions-->


var publicationsSection = document.querySelector('.js-pb');

if (publicationsSection) {
    $.ajax({
        type: "GET",
        beforeSend: function (request) {
            request.setRequestHeader("Current-Version", "v1");
        },
        url: 'https://api.pressfeed.ru/publications/release',
        success: function (msg) {

            var queries = msg.data;

            var publicationSlider = document.querySelector('.js-slider-publications');
            var publicationHTML = '';

            for (var x = 0; x < 5; x++) {
                var mediaName = queries[x].media_name;
                var queryTitle = queries[x].query_title;
                var queryText = queries[x].query_text.substring(0, 600);
                var queryLink = '//pressfeed.ru/private/allquerydetail/' + queries[x].query_id + '';
                var articleDate = '' + queries[x].publication_created_at.slice(8, 10) + '.' + queries[x].publication_created_at.slice(5, 7) + '.' + queries[x].publication_created_at.slice(0, 4) + '';
                var articleTitle = queries[x].publication_title;
                var articleLink = queries[x].publication_link;
                var articleImage = queries[x].publication_img;
                var mediaFavicon = '//' + queries[x].media_site + '/favicon.ico';

                if (x === 0) {
                    var slideIsActive = 'active';
                } else {
                    slideIsActive = '';
                }

                publicationHTML += `
                <div class="carousel-item ${slideIsActive}">
                <div class="row justify-content-center mb-4 mb-sm-6">
                <div class="col-md-5">
                <a class="card pf-card-query" target="_blank" href="${queryLink}">
                    <div class="card-header">
                        <div class="d-flex justify-content-center align-items-center">
                            <img class="mr-2 js-img-cheking" onerror="this.style.display='none'" src="${mediaFavicon}">
                            <span class="f-semi text-nowrap">${mediaName}</span>
                        </div>
                        <div class="d-flex justify-content-center align-items-center">
                            <span>Запрос</span>
                        </div>
                    </div>
                    <div class="card-body">
                        <h4 class="f-semi t-m mt-3 mb-5">${queryTitle}</h4>
                        <div>${queryText}</div>
                    </div>
                </a>
            </div>
                <div class="col-md-1 d-flex justify-content-center">
                <i class="material-icons d-block d-md-none my-2 text-danger">arrow_downward</i>
                <svg class="img-fluid d-none d-md-inline-block" width="124" height="22" viewBox="0 0 124 22"
                     xmlns="http://www.w3.org/2000/svg"
                     xmlns:xlink="http://www.w3.org/1999/xlink">
                    <defs>
                        <path d="M522.62 169l-5.055-5.055-.026-3.861 11.775 10.853-11.629 10.998-.027-4.1 4.835-4.835h-116.493v-4h116.62z"
                              id="a"/>
                    </defs>
                    <g transform="translate(-406 -160)" fill="none">
                        <mask>
                            <use xlink:href="#a"/>
                        </mask>
                        <use fill="#FF5252" xlink:href="#a"/>
                    </g>
                </svg>
            </div>
                    <div class="col-md-5">
                        <a class="card pf-card-article" target="_blank" href="${articleLink}" style="background-image: url('${articleImage}')">
                            <div class="card-header text-right">
                                <span class="align-middle">Публикация</span>
                            </div>
                            <div class="card-body">
                                <div class="t-s pb-2">${articleDate}</div>
                                <h3 class="t-m">${articleTitle}</h3>
                            </div>
                            <div class="card-layer"></div>
                        </a>
                    </div>
                </div>
            </div>`;
            }

            publicationSlider.innerHTML = publicationHTML;

        }
    });
}


// Plans switcher

let planSwitcher = document.querySelector('.js-plan-switcher');

if (planSwitcher) {

    // Animated scroll
    let scroll = new SmoothScroll('a[href*="#"]', {
        header: '[data-scroll-header]',
        ignore: '[data-scroll-ignore]',
        offset: 30,
    });

    // Terms switcher

    for (let x = 0; x < 3; x++) {
        planSwitcher.getElementsByTagName('a')[x].addEventListener('click', function (e) {
            e.preventDefault();

            planSwitcher.querySelector('.active').classList.remove('active');
            this.classList.add('active');

            let planPrice = document.querySelectorAll('.js-plan-price');
            for (let y = 0; y < planPrice.length; y++) {
                planPrice[y].classList.add('isChanged');
                setTimeout(function () {
                    planPrice[y].classList.remove('isChanged');
                }, 750)
            }

            if (x === 0) {
                document.querySelector('.js-plan-1 .js-plan-price').innerHTML = '3591 <span class="f-xs">&#8381</span>';
                document.querySelector('.js-plan-2 .js-plan-price').innerHTML = '8910 <span class="f-xs">&#8381</span>';
                document.querySelector('.js-plan-3 .js-plan-price').innerHTML = '25 200 <span class="f-xs">&#8381</span>';
                document.querySelector('.js-plan-1 .js-plan-note').innerHTML = 'В месяц при подписке на год<br><span class="text-black">Экономия 4788&nbsp;&#8381</span>';
                document.querySelector('.js-plan-2 .js-plan-note').innerHTML = 'В месяц при подписке на год<br><span class="text-black">Экономия 11 880&nbsp;&#8381</span>';
                document.querySelector('.js-plan-3 .js-plan-note').innerHTML = 'В месяц при подписке на год<br><span class="text-black">Экономия 33 600&nbsp;&#8381</span>';
            } else if (x === 1) {
                document.querySelector('.js-plan-1 .js-plan-price').innerHTML = '3790 <span class="f-xs">&#8381</span>';
                document.querySelector('.js-plan-2 .js-plan-price').innerHTML = '9405 <span class="f-xs">&#8381</span>';
                document.querySelector('.js-plan-3 .js-plan-price').innerHTML = '26 400 <span class="f-xs">&#8381</span>';
                document.querySelector('.js-plan-1 .js-plan-note').innerHTML = 'В месяц при подписке на полгода<br>&nbsp;';
                document.querySelector('.js-plan-2 .js-plan-note').innerHTML = 'В месяц при подписке на полгода<br>&nbsp;';
                document.querySelector('.js-plan-3 .js-plan-note').innerHTML = 'В месяц при подписке на полгода<br>&nbsp;';
            } else if (x === 2) {
                document.querySelector('.js-plan-1 .js-plan-price').innerHTML = '3990 <span class="f-xs">&#8381</span>';
                document.querySelector('.js-plan-2 .js-plan-price').innerHTML = '9900 <span class="f-xs">&#8381</span>';
                document.querySelector('.js-plan-3 .js-plan-price').innerHTML = '28 000 <span class="f-xs">&#8381</span>';
                document.querySelector('.js-plan-1 .js-plan-note').innerHTML = 'В месяц<br><span class="text-danger">Подписка минимум на&nbsp;3&nbsp;месяца</span>';
                document.querySelector('.js-plan-2 .js-plan-note').innerHTML = 'В месяц<br>&nbsp;';
                document.querySelector('.js-plan-3 .js-plan-note').innerHTML = 'В месяц<br>&nbsp;';
            }

        })

    }

}