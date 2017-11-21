// function showQtyAndPriceAddToCart(){
// 	var totalQty = countItemsQty();
// 	$("#basket_qty").text(totalQty);
// 	var totalPrice = countTotalPrice();
// 	$("#basket_price").text(totalPrice);
// }

// function showProductCart() {
// 	var cartItems  = getCartItems();
// 	var $showItemOrder= $(".show-item-order");
// 	var $grandtotalItemOrder = $(".grandtotal-item-order");
// 	if(cartItems){
// 		console.log("Card Item  to View ", cartItems);
// 		$.each(cartItems, function(i,item) {
// 			console.log("ITEM ",item.image);
// 			$showItemOrder.find("#item_order_images").attr('src','/images/product/' + item.image);
// 			$showItemOrder.find("#item_order_name").html(item.name);
// 			$showItemOrder.find(".item-order-total").html(item.price);
// 			$showItemOrder.find(".item-order-quantity").html(item.quantity);
// 			$showItemOrder.find("#btn-remove-item-cart").attr('data-id',item.id);
// 		});
// 		$grandtotalItemOrder.find("#sub-total").html('$' + countTotalPrice());
// 		$grandtotalItemOrder.find("#delivery").html('$' + getDelivery());
// 		$grandtotalItemOrder.find("#total-order").html(getTotalItemOrder());
// 	}else{
// 		$showItemOrder.find("#item_order_images").attr('');
// 		$showItemOrder.find("#item_order_name").html('');
// 		$showItemOrder.find(".item-order-total").html('');
// 		$showItemOrder.find(".item-order-quantity").html('');
// 		$showItemOrder.find("#btn-remove-item-cart").attr('');
// 	}
// }
// $(document).ready(function () {
// 	// SHOW ITEM OR EMPTY CART
// 	$('#shop-cart').on('click', function () {
// 		var cartItem = getCartItems();
// 		var size = Object.keys(cartItem).length;
// 		if(size >= 1){
// 			$('.cart-item').toggle();
// 		}else{
// 			$('.cart-empty').toggle();
// 		}	
// 	});

// 	// ADD TO CART
// 	$(document).on('click', '.btn-add-to-cart', function(){ 
// 		// Add Item to popup order
// 		var order_image = $(this).attr("data-image");
// 		var order_name = $(this).attr("data-name");
// 		var order_price = $(this).attr("data-price");
		
// 		//QTY ITEM from input
// 		var qty = $(this).parents('.product-control-group').find('#pro_input_qty').val();

// 		// DATA FROM CART
// 		var data = $(this).data();
// 		console.log("input data: ", data);
		
// 		var oldQquantity = 0;
// 		var oldPrice = 0;
// 		var cartItems = getCartItems();
		
// 		if (cartItems[data.id] && cartItems[data.id].quantity) {
// 			oldQquantity = Number(cartItems[data.id].quantity);
// 			oldPrice = Number(cartItems[data.id].price);
// 		}
// 		// COUNT + QTY
// 		data.quantity = (Number(qty) + oldQquantity);
// 		//COUNT + PRICE
// 		data.price += oldPrice;
// 		// ASSIGN DATA TO LIST BY PRODYCT ID
// 		cartItems[data.id] = data;
// 		// SET TO LOCAL STORAGE
// 		setCartItems(cartItems);
// 		showQtyAndPriceAddToCart();
// 		showProductCart();
		
// 		//add image to order popup
// 		// $("#order_image").attr('src', order_image);
// 		// $("#order_name").html(order_name);
// 		// $("#order_price").html(order_price);

// 		//show loading
// 		$('.dropdown-toggle').css({"background-color":"#B2DFDB", "color":"#B2DFDB"});
// 		$('#loading').fadeIn();
// 		// timeout
// 		 setTimeout(function() { 
		 	
// 		  	$('.dropdown-toggle').css({"background-color":"#FFFFFF", "color": "#16a085"});
// 		  	$('#loading').fadeOut();
// 		 }, 500); 	

// 		//show popup order
// 		$('.your-order-popup').animate({"margin-left":"10px", "opacity":"1"}, 500);
// 		  // timeout 
// 		  setTimeout(function() { 
//         		$('.your-order-popup').animate({"margin-left":"-50%", "opacity":"0"}, 500); 
 			
// 				//total price in basket
// 				var Qty = Number($("#pro_input_qty").val());
// 				var Pro_price = Number($('#pro_price').val());
// 				var total =0;
// 				total = (Pro_price * Qty)+'.00';

// 				$("#basket_price").each(function() { 
// 					$('#basket_price').html(total);
// 				});
// 			 }, 1500);
// 	});
	


// 	//REMOVE PRODUCT ITEM THAT ADD TO CARD ALREADY
// 	$(document).on('click', '#btn-remove-item-cart', function(){ 
// 		var itemId = $(this).data('id');
// 		var cartItems = getCartItems();
// 		if(cartItems){
// 			console.log("cartItems ",cartItems);
// 			$.each(cartItems, function(i,item) {
// 				console.log("item id",item.id);
// 				if (item) {
// 					if(item.id == itemId){
// 						delete cartItems[itemId];
// 						setCartItems(cartItems);
// 						showQtyAndPriceAddToCart();
// 						showProductCart();
// 					}
// 				}
// 			});
// 		}
// 	});
	
// 	function init(){
// 		showQtyAndPriceAddToCart();
// 		// showProductCart();

// 	}
// 	init();
// });
