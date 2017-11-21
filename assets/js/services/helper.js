
// function loadRowTableItemCartTemplate(items, listSelector, templateSelector) {
//     templateSelector = templateSelector || '#cartTableTemplate';
//     $(templateSelector).tmpl(items).appendTo(listSelector);
// }
// function getCartItems() {
// 	var items = localStorage.getItem('products');
// 	if (items) {
// 		return JSON.parse(items);
// 	}
// 	return {};
// }

// function setCartItems(value) {
// 	console.log("setCartItems value: ", value);
// 	localStorage.setItem('products', JSON.stringify(value));
	
// }

// function countItemsQty() {
// 	var cart_items = getCartItems();
// 	var count = 0;
	
// 	$.each(cart_items, function(i,item) {
// 		if (item) {
// 			count += Number(item.quantity);
// 		}
// 	});
// 	return count;
// }

// function countTotalPrice(){
// 	var cartItems = getCartItems();
// 	var count = 0;
	
// 	$.each(cartItems, function(i,item) {
// 		if (item) {
// 			count += Number(item.price);
// 		}
// 	});
// 	return count;
// }

// function getDelivery(){
// 	var delivery = 0;
// 	return delivery;
// }

// function getTotalItemOrder(){
// 	return  countTotalPrice() +  getDelivery();
// }

// function renderRowTableTemplate(items, listSelector, templateSelector) {
//     $(listSelector).html('');
//     $(templateSelector).tmpl(items).appendTo(listSelector);
// }