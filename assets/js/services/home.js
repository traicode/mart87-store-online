
// function loadTemplate(items, listSelector, templateSelector) {
//     templateSelector = templateSelector || '#productTemplate';
//     console.info('list data to ', listSelector, ' with template id: ', templateSelector);
//     $(listSelector).html('');
//     $(templateSelector).tmpl(items).appendTo(listSelector);
// }

// function loadAndRenderProduct(link, listSelector) {
//     $.get(link, function (res) {
//         loadTemplate(res.products, listSelector);
//     });
// }

// function loadNewProduct(page, limit) {
//     page = page || 1;
//     limit = limit || 8;
//     var url = API_END_POINT + "/products/new";
//     $.get(url, function (res) {
//         console.log("res.products : ", res.products);
//         loadTemplate(res.products, '#newProductList');

        

//         // $("#newProductList").html('');
//         // $("#newProductTemplate").tmpl(res.products).appendTo("#newProductList");
//     });
// }

// function loadRecommendProduct(page, limit) {
//     page = page || 1;
//     limit = limit || 8;
//     var url = API_END_POINT + "/products/recommend";
//     $.get(url, function (res) {
//         loadTemplate(res.products, '#recommendProductList');
//         // $("#recommendProductList").html('');
//         // $("#recommendProductTemplate").tmpl(res.products).appendTo("#recommendProductList");
//     });
// }

// function loadPopularProduct(page, limit) {
//     page = page || 1;
//     limit = limit || 8;
//     var url = API_END_POINT + "/products/popular";
//     $.get(url, function (res) {
//         loadTemplate(res.products, '#popularProductList');
//     });
// }

// function loadPartner() {
//     var url = API_END_POINT + "/partners";
//     $.get(url, function (res) {
//         $("#partnerList").html('');
//         $("#partnerTemplate").tmpl(res.partners).appendTo("#partnerList");
//     });
// }

// function loadSlide() {
//     var url = API_END_POINT + "/slides";
//     $.get(url, function (res) {
//         $("#slideList").html('');
//         $("#slideTemplate").tmpl(res.slides).appendTo("#slideList");
//     });
// }

// $(document).ready(function () {
//     function init() {
//         loadSlide();
//         loadNewProduct(1, 8);
//         loadRecommendProduct(1, 8);
//         loadPopularProduct(1, 8);
//         loadPartner();
//     }

//     init();
// });
