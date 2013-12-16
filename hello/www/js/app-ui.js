(function(){


  var head = $( '#head' );

	var screens = $( '#screens' );

  var window = $( document );
  $( '.screen' ).height( window.height() - head.outerHeight() );

  var menu = $( '#menu' );
  $( '#menu' ).hide();


	var menuOn = false;
	$('#menu-trigger')
		.on('click', function( event ){
			toggleMenu();
		} );

	document.addEventListener("menubutton", function( event ){
		toggleMenu();
	},false );

		$( '#menu li' )
			.on( 'click', function( event ){
				var menuItem = $(event.target);
				var targetScreenId = menuItem.attr('target-screen');
				changeScreen( targetScreenId );
				toggleMenu();
			} )

	function toggleMenu(){
    var menu = $("#menu");
    var items = $("#menu-items");
		if( menuOn= !menuOn ){
      menu.show();
			items.animate({ left: 0 });
		}else{
			items.animate({ left: items.outerWidth() }, function(){ menu.hide() });
    }
	}

	function changeScreen( targetScreenId ){

		var screen = $( '#' + targetScreenId );
		screens.append( screen );
		screen.css({
			left: "auto",
			right: -screen.width(),
		});
		screen.animate({ right: 0 });
	}

	$('#newsfeed')
		.on('click', 'li', function( event ){
			//alert($(event.target).attr("article-id"));
			openDetailScreen(event.target);
	} );
	var history = [];
	function openDetailScreen(target){
		var id = $(target).attr("detail-id");

		var detailHtml = "";
		detailHtml += "<h1>"+rssJson[id].title+"</h1>";
		detailHtml += "<p>"+rssJson[id].description+"</p>";
		detailHtml += "<p>"+rssJson[id].pubDate+"</p>";
		detailHtml += "<p>"+rssJson[id].link+"</p>";
		detailHtml += "";
		$("#detail").html(detailHtml);
		//changeScreen("detail");
		var screen = $( '#detail' );
		screens.append( screen );
		screen.css({
			right: -screen.width(),
		});
		screen.animate({ right: 0 });

		var oldScreen = $( '#newsfeed' );
		oldScreen.animate({ left: -oldScreen.width() });
	}
	function closeDetailScreen()
	{
		var screen = $( '#newsfeed' );
		screens.append( screen );
		screen.animate({ left: 0 });

		var oldScreen = $( '#detail' );
		oldScreen.animate({ right: -screen.width() });
	}

	if( window.chrome ){
		$( '#head span' )
			.on( 'click', function( event ){
				back();
		} )
	}

	function back()
	{
		closeDetailScreen();
	}

}) ();
