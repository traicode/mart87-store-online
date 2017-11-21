var API = "http://localhost:1337/api";
var tags = [];
tags.push('<div class="item"><img src="/images/icon/loading_spinner.gif">' +  + '</div>');
$('#listItems').html(tags.join(''));
$('.owl-carousel').owlCarousel({
    loop: true,
    margin: 10,
    responsiveClass: true,
    responsive: {
        0: {
            items: 1,
            nav: true
        },
        600: {
            items: 3,
            nav: false
        },
        1000: {
            items: 5,
            nav: true,
            loop: false,
            margin: 20
        }
    }
})

$(document).ready(function () {
    function loadCategorySlide() {
        var url = API + "/categories";
        $.get(url, function (res) {
            loadCategorySlideToView(res.categories);
        });
    }
    
});
function loadCategorySlideToView(categories) {
    if(categories.length > 0){
        $.each(categories, function(key,category ) {
            console.log('caste: ' + category.image + ' | id: ' + category.name);
            tags.push('<div class="item"><img src="/images/category/' + category.image + '">' + + '</div>');
        });
    }
 
    // for (var i = 1; i <= 20; i++) {
    //     tags.push('<div class="item"><img src="http://www.pepsico.com/images/album/what-we-believe-redesign/products/products-progress-7up.jpg?sfvrsn=0">' + i + '</div>');
    // }
    $('#listItems').html(tags.join(''));
    $('.owl-carousel').owlCarousel({
        loop: true,
        margin: 10,
        responsiveClass: true,
        responsive: {
            0: {
                items: 1,
                nav: true
            },
            600: {
                items: 3,
                nav: false
            },
            1000: {
                items: 5,
                nav: true,
                loop: false,
                margin: 20
            }
        }
    })
};