// var cartItems = getCartItems();

// function showItemAddToCart() {
// 	var cartItems  = getCartItems();
// 	var $showItemOrder= $(".show-item-order");
// 	var $grandtotalItemOrder = $(".grandtotal-item-order");
// 	if(cartItems){
// 		$("#list-product-add-cart").html("");
// 		$.each(cartItems, function(i,item) {
//             if(item){
// 				loadRowTableItemCartTemplate(item,"#list-product-add-cart");
//             }
// 		});
// 		$grandtotalItemOrder.find("#sub-total").html('$' + countTotalPrice());
// 		$grandtotalItemOrder.find("#delivery").html('$' + getDelivery());
// 		$grandtotalItemOrder.find("#total-order").html(getTotalItemOrder());
// 	}
// }

// $(document).ready(function () {
//     function init(){
//         showItemAddToCart();
//     }
//     init();
// });