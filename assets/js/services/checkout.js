// var cartItems = getCartItems();


// function showItemCartCheckout() {
// 	var cartItems  = getCartItems();
// 	var $showItemOrderCheckout = $(".show-item-order-checkout");
// 	var $grandTotalCheckout = $(".grand-total-checkout");
// 	console.log("Cart Item",  cartItems);
// 	if(cartItems){
// 		$("#productItemCartCheckoutList").html("");
// 		$.each(cartItems, function(i,item) {
// 			console.log("item ",item);
// 			if(item){
// 				loadRowTableItemCartTemplate(item,"#productItemCartCheckoutList");
// 			}
			
// 		});
// 		$grandTotalCheckout.find(".sub-total-price-checkout").html('$' + countTotalPrice());
// 		$grandTotalCheckout.find(".delivery-checkout").html('$' + getDelivery());
// 		$grandTotalCheckout.find(".total-price-checkout").html(getTotalItemOrder());
// 	}
// }
// $(document).ready(function () {
//     function init(){
//         showItemCartCheckout();
//     }
//     init();
// });