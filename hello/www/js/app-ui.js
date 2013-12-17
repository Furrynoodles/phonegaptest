(function(){

  var head = $( '#head' );

	var screens = $( '#screens' );

  var window = $( document );
  $( '.screen' ).height( window.height() - head.outerHeight() );

  var menu = $( '#menu' );
  //$( '#menu' ).hide();

  var items = $("#menu-items");

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
			} );

	function toggleMenu(){
    if( Modernizr.csstransitions ){
      menu.toggleClass( 'on' );
      return;
    }

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
	function openDetailScreen(target){
		backFunction = closeDetailScreen;
		var id = $(target).attr("detail-id");

	    var detailScreen = $("#detail");
			detailScreen.html( newsDetailTemplate( rssJson[ id ] ) );
	    //test
	    var img = new Image();
	    img.onload = function(){
	      var $img = $( '<img src="'+img.src+'" />' );
	      $img.css({ left: 0 });
	      $img.animate({ left: (img.width - detailScreen.outerWidth() ) / -2 });
	      detailScreen
	        .find( '.image' )
	          .addClass( 'with-image' )
	          .append('<div class="image-backing"></div>')
	          .append( $img )
	          .animate({ height: img.height }, 500 );
	    };
	    //img.src = "http://www.bykercommunitytrust.org/sites/default/files/styles/large/public/field/image/Welfare%20Reform%20Video.jpg";
	    img.src = "http://www.bykercommunitytrust.org/sites/default/files/styles/large/public/field/image/Oscar-statuette%5B1%5D.jpg";

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
