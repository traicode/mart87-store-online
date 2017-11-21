$(document).ready(function () {
	
	//hide and show sidebar menu
	$('#btn-show-sidebar').on('click', function(){
		
		showMenu();
		changeBtnshow();
		return false;
	});

	//hide and show sidebar menu
	$('#btn-hide-sidebar').on('click', function(){
		hideMenu();
		changeBtnhide();
		overlayHide();
		
	});




	function showMenu(){

		var icon = $('#icon');

		//to show sideabr
		$('#overlay').fadeIn();

		$('#sidebar').animate({
            marginLeft: "0px",
        });

	}

	function hideMenu(){

		var icon = $('#icon');

		//to show sideabr
		$('#overlay').fadeOut();

		$('#sidebar').animate({
            marginLeft: "-100%",
        });

		
		}


		function changeBtnshow(){
			$('#btn-show-sidebar').addClass('hidden');
			$('#btn-hide-sidebar').removeClass('hidden');
		}
		
		function changeBtnhide(){
			$('#btn-hide-sidebar').addClass('hidden');
			$('#btn-show-sidebar').removeClass('hidden');

		}
});