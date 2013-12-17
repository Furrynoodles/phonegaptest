(function(){

	var detailIScroll = new iScroll( 'detail' );
	var twitterIScroll = new iScroll( 'twitterfeed' );

  var head = $( '#head' );

	var screens = $( '#screens' );

  var doc = $( document );
  $( '.screen' ).height( doc.height() - head.outerHeight() );

  var menu = $( '#menu' );
  $( '#menu' ).hide();

  var newsDetailTemplate = _.template( $( '#news-detail-template' ).html() );

	var menuOn = false;
	$('#menu-trigger')
		.on('click', function( event ){
			toggleMenu();
		} );

	document.addEventListener("menubutton", function( event ){
		toggleMenu();
	},false );

	document.addEventListener("backbutton", function( event ){
		back();
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
			openDetailScreen(event.currentTarget);
	} );

	var backFunction;
	var dataDefaults = {'title':'', 'link':'', 'pubDate':'', 'description':''};
	function openDetailScreen(target){
		backFunction = closeDetailScreen;
		var id = $(target).attr("detail-id");

	    var detailScreen = $("#detail .inner");
		rssJson[ id ].description = rssJson[ id ].description.replace("/modules/file/icons/application-pdf.png", "img/application-pdf.png");
		detailScreen.html( newsDetailTemplate( $.extend( dataDefaults, rssJson[ id ] ) ) );

		detailScreen.on('click', 'a', function( event ){
			event.preventDefault();
			var $target = $(event.currentTarget);
			var ref = window.open( $target.attr('href'), '_system', 'location=yes' );
		});

		detailIScroll.refresh();
		var img = detailScreen.find('img').on( 'load', function(){
			detailIScroll.refresh();
		} ).load();
	    //test

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
		if (backFunction)
		{
			backFunction();
		}
		else
		{
			navigator.app.exitApp();
		}
		backFunction = null;
	}

}) ();
