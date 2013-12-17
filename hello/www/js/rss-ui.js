var ui = {};

Backbone.sync = function(){};

(function( ui ){

  var newsItemTemplate = _.template( $( '#news-item-template' ).html() );

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
      FeedView.template = FeedView.template  || _.template( '<li><h2><%= title %></h2></li>' );
      this.render();
    },
    events: {
    },
    render: function(){
      this.$el.html( FeedView.template( { "title": "test" } ) );
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
    },
    render: function(){
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
    var out = '';
    for( var prop in data[0] ){
      out += ', '+prop;
      out += ':'+data[0][prop];
    }
    //alert( out );
    _.each( data, function( item ){
      feeds.create(item);
    });
  }

})( ui );
