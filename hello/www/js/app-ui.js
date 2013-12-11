(function(){
	alert('app');
	$('#menu').on('touchend, click', function( event ){
		alert( 'end' );
	} );
})();