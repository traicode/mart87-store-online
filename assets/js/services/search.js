// function search(){
//     var url = API_END_POINT + "/product/name";
//     var options = {
//           url: function(phrase) {
//             return url;
//           },
        
//           getValue: function(element) {
//             return element.name;
//           },
        
//           template: {
//                 type: "description",
//                 fields: {
//                     description: "type"
//                 }
//         },
//           ajaxSettings: {
//             dataType: "json",
//             method: "GET",
//             data: {
//               dataType: "json"
//             }
//           },
        
//           preparePostData: function(data) {
//             data.phrase = $("#example-ajax-post").val();
//             return data;
//           },
        
//           requestDelay: 400
//         };
        
//         $("#example-ajax-post").easyAutocomplete(options);
// }

// $(document).ready(function () {
//     function init(){
//         search();
//     }
//     init();
// });