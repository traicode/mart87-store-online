
// function getParameterByName(name, url) {
//     if (!url) url = window.location.href;
//     name = name.replace(/[\[\]]/g, "\\$&");
//     var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
//         results = regex.exec(url);
//     if (!results) return null;
//     if (!results[2]) return '';
//     return decodeURIComponent(results[2].replace(/\+/g, " "));
// }

// var categoryId =  getParameterByName('category');

// function itemClickPagination(page){
//     return window.location.href = '/category?category='+categoryId +'&page='+page;
// }

// function loadItemsWithPagination(link, page, limit, callback) {
//     link += "?page=" + (page || 1) + "&limit=" + (limit || 8);
//     return $.get(link, callback);
// }

// function loadItemsWithPagination(link,categoryId, page, limit, callback) {
//     link += "?category="+ categoryId + "&page=" + (page || 1) + "&limit=" + (limit || 8);
//     return $.get(link, callback);
// }

// function makeTemplate(templateId, elementSelector, items) {
//     $(elementSelector).html('');
//     $(templateId).tmpl(items).appendTo(elementSelector);
// }

// function loadProductByCategory(categoryId,page, limit) {

//     loadItemsWithPagination(API_END_POINT + "/products/category",categoryId, page, limit, function(res) {

//         // "meta": {
//         //     "page": 1,
//         //     "perPage": 10,
//         //     "previousPage": false,
//         //     "nextPage": false,
//         //     "pageCount": 1,
//         //     "total": 3
//         // }

//         var totalPages = res.meta.pageCount;
//         var pageItems = res.data;
        
//         alert(1);
//         console.log("Category Data : ",  pageItems);
//         console.log("Total Page : ",  totalPages);


//         makeTemplate('#productTemplate', '#listProduct', pageItems);

//         if (totalPages) {
//             var links = [];
//             for (var i=1; i<=totalPages; i++) {
//                 links.push('<a href="javascript:location.href/category?category="+ categoryId +"&page=(' + i +'); onClick="itemClickPagination('+ i +')">' + i + '</a>');
//             }
//             $('#listPagination').html(links.join(''));
//         }
//     });
// }



// $(document).ready(function () {
//     function init(){
//         var page =  getParameterByName('page');
//         loadProductByCategory(categoryId,page,8);
//     }
//     init();
// });