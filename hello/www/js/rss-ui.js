(function( ui ){

  window.ui = window.ui || {};

  var newsItemTemplate = _.template( $( '#news-item-template' ).html() );
  var newsDetailTemplate = _.template( $( '#news-detail-template' ).html() );
	var dataDefaults = {'title':'', 'link':'', 'pubDate':'', 'description':''};
  var newItemTemplate = _.template( '<li><h2><%= title %></h2></li>' );

  var Feed = Backbone.Model.extend({
    defaults:{
      title: '',
      link: '',
      description: '',
      pubDate: ''
    }
  });

  var Feeds = Backbone.Collection.extend({
    model: Feed
  });

  var FeedView = Backbone.View.extend({
    initialize: function(){
      //FeedView.template = FeedView.template  || _.template( '<li><h2><%= title %></h2></li>' );
      this.render();
    },
    events: {
    },
    render: function(){
      this.$el.html( newItemTemplate( { "title": "test" } ) );
    }
  });

  var FeedsView = Backbone.View.extend({
    initialize: function(){
      this.$display = $('<ul/>');
      this.$el.append(this.$display);
      this.render();
      this.listenTo( this.collection, 'add', this.addFeedItem );
    },
    events: {
      'click li': function( event ){ this.renderDetails( event ) }
    },
    render: function(){
    },
    renderDetails: function( event ){
      var rssId = $( event.currentTarget ).attr("detail-id");
      var rssData = rssJson[ rssId ];
      rssData.description = rssData.description.replace(new RegExp("/modules/file/icons/application-pdf.png", 'g'), "img/application-pdf.png");
      rssData = $.extend( dataDefaults, rssData );

      var detailScreen = $( '#detail .inner' );
      detailScreen.html( newsDetailTemplate( rssData ) );

      var img = detailScreen.find('img').on( 'load', function(){
        detailIScroll.refresh();
      } ).load();
      detailScreen.trigger( 'ui:contentchange' );
    },
    addFeedItem: function( item ){
      var $item = $(newsItemTemplate( {
        id: item.get( 'id' ),
        title: item.get( 'title' )
      }));
      this.$display.append( $item );
      var itemHeight = $item.outerHeight();
      $item.find( '.image' ).height( itemHeight );
      var $chevron = $item.find( '.chevron' );
      $chevron.css( 'top', ( itemHeight - $chevron.height() ) / 2 );
    }
  });

  var feeds = new Feeds();
  var feedsView = new FeedsView({
    el: $( '#newsfeed' ),
    collection: feeds
  });

  ui.rss = {};

  ui.rss.render = function( data ){
    _.each( data, function( item ){
      feeds.create(item);
    });
  }

})( ui );
