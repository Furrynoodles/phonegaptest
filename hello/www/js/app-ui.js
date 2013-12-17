(function(){

	var detailIScroll = new iScroll( 'detail' );
	var twitterIScroll = new iScroll( 'twitterfeed' );

	var head = $( '#head' );
	var screens = $( '#screens' );
  var doc = $( document );
  var menu = $( '#menu' );
  var menuTrigger = $( '#menu-trigger' );
  var items = $("#menu-items");
  var newsFeed = $( '#newsfeed' );
	var detail = $("#detail .inner");
  var newsDetailTemplate = _.template( $( '#news-detail-template' ).html() );

	var menuOn = false;

  detail
    .on( 'click', 'a', function( event ){
      event.preventDefault();
      var $target = $( event.currentTarget );
      window.open( $target.attr('href'), '_system', 'location=yes' );
    })
    .on( 'ui:contentchange', function( event ){
      detailIScroll.refresh();
    });

  if( !Modernizr.csstransitions ){
    $( '#menu' ).hide();
  }

  $( '.screens, .screen' ).height( doc.height() - head.outerHeight() );

  menuTrigger
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

	function changeScreen( targetScreenId, style ){
    style = style || 'swap';
    if( Modernizr.csstransitions ){
      var onScreen = $( '.screen.on' );
      if( style == 'push' ){
        onScreen.addClass( 'pushed' );
      }
      onScreen.removeClass( 'on' );
		  var targetScreen = $( '#' + targetScreenId );
      targetScreen.removeClass( 'pushed' );
      targetScreen.addClass( 'on' );
      return;
    }

		var screen = $( '#' + targetScreenId );
		screens.append( screen );
		screen.css({
			left: "auto",
			right: -screen.width(),
		});
		screen.animate({ right: 0 });
	}
	var backFunction;

  newsFeed	
		.on('click', 'li', function( event ){
      var rssId = $( event.currentTarget ).attr( 'detail-id' );
      changeScreen( 'detail', 'push' );
	} );


  /*
	function openDetailScreen(target){
		backFunction = closeDetailScreen;
		var id = $(target).attr("detail-id");

	  var detailScreen = $("#detail .inner");
	  rssJson[ id ].description = rssJson[ id ].description.replace(new RegExp("/modules/file/icons/application-pdf.png", 'g'), "img/application-pdf.png");
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

		var oldScreen = newsFeed;
		oldScreen.animate({ left: -oldScreen.width() });

	}
  */

	function closeDetailScreen()
	{
		var screen = newsFeed;
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
