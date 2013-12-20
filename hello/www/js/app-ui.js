(function(){

  window.ui = window.ui || {};
  ui.app = {};

  window.ui.app.changeScreen = changeScreen;

	var detailIScroll = new iScroll( 'detail' );
	var twitterIScroll = new iScroll( 'twitterfeed' );

	var splash      = $( '#head' );
	var head        = $( '#head' );
	var screens     = $( '#screens' );
	var doc         = $( document );
	var menu        = $( '#menu' );
	var menuTrigger = $( '#menu-trigger' );
	var items       = $( '#menu-items');
	var newsFeed    = $( '#newsfeed' );
	var detail      = $( '#detail' );
	var newsDetailTemplate = _.template( $( '#news-detail-template' ).html() );

  setTimeout( function(){ $("#splash").addClass( 'off' ); }, 1 );
  setTimeout( function(){ $("#splash").remove(); }, 1500 );

	document.addEventListener("menubutton", function( event ){
		toggleMenu();
	},false );

	document.addEventListener("backbutton", function( event ){
		back();
	},false );


  detail
    .on( 'click', 'a', function( event ){
      event.preventDefault();
      var $target = $( event.currentTarget );
      window.open( $target.attr('href'), '_system', 'location=yes' );
    })
    .on( 'ui:contentchange', function( event ){
      detailIScroll.refresh();
    });

  $( '#screens, .screen' ).height( doc.height() - head.outerHeight() );

  menuTrigger
		.on('click', function( event ){
			toggleMenu();
		} );

  newsFeed	
		.on('click', 'li', function( event ){
      var rssId = $( event.currentTarget ).attr( 'detail-id' );
      changeScreen( 'detail', 'push' );
	} );

	$( '#head span' ).on( 'click', function( event ){
			back();
	} );

	$( '#menu li' )
		.on( 'click', function( event ){
			var menuItem = $(event.target);
			var targetScreenId = menuItem.attr('target-screen');
			changeScreen( targetScreenId );
			toggleMenu();
		} );

	function toggleMenu(){
    menu.toggleClass( 'on' );
	}

	function changeScreen( targetScreenId, style ){
    style = style || 'swap';
		var onScreen = $( '.screen.on' );
		if( style == 'push' ){
			onScreen.addClass( 'pushed' );
		}
		onScreen.removeClass( 'on' );
		var targetScreen = $( '#' + targetScreenId );
		targetScreen.removeClass( 'pushed' );
		targetScreen.addClass( 'on' );
	}

	function back()
	{
		if( detail.hasClass( 'on' ) )
		{
      detail.removeClass( 'on' );
      $( '.pushed' ).removeClass( 'pushed' ).addClass( 'on' );
		}
		else
		{
			navigator.app.exitApp();
		}
		backFunction = null;
	}

})();
