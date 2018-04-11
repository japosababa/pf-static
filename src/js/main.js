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


var publicationBox = document.querySelector('.js-pb');
var pbMedia = document.querySelector('.js-pb-media');
var pbQueryTitle = document.querySelector('.js-pb-query-title');
var pbFavicon = document.querySelector('.js-pb-query-favicon');
var pbQueryBody = document.querySelector('.js-pb-query-body');
var pbQueryLink = document.querySelector('.js-pb-query-link');
var pbArticleDate = document.querySelector('.js-pb-article-date');
var pbArticleTitle = document.querySelector('.js-pb-article-title');
var pbArticleLink = document.querySelector('.js-pb-article-link');


if (publicationBox) {
    $.ajax({
        type: "GET",
        beforeSend: function (request) {
            request.setRequestHeader("Current-Version", "v1");
        },
        url: 'https://api.pressfeed.ru/publications/release',
        success: function (msg) {

            var queryData = msg.data[0];

            pbMedia.innerText = queryData.media_name;
            pbQueryTitle.innerText = queryData.query_title;
            pbQueryBody.innerText = queryData.query_text.substring(0, 600);
            pbQueryLink.href = '//pressfeed.ru/private/allquerydetail/' + queryData.query_id + '';
            pbArticleDate.innerText = '' + queryData.publication_created_at.slice(8, 10) + '.' + queryData.publication_created_at.slice(5, 7) + '.' + queryData.publication_created_at.slice(0, 4);
            pbArticleTitle.innerText = queryData.publication_title;
            pbArticleLink.href = queryData.publication_link;
            pbArticleLink.style.backgroundImage = "url('" + queryData.publication_img + "')";

            // todo: insert favicon if it exists
            var faviconUrl = 'https://' + queryData.media_site + '/favicon.ico';

            function checkFavicon(imageSrc, good, bad) {
                var img = new Image();
                img.onload = good;
                img.onerror = bad;
                img.src = imageSrc;
            }

            checkFavicon(faviconUrl, function () {
                pbFavicon.src = faviconUrl;
                pbFavicon.classList.add('mr-2');
            }, function () {
                pbFavicon.classList.add('d-none');
            });


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