var ui = {};

Backbone.sync = function(){};

(function( ui ){

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
      this.render();
      this.listenTo( this.collection, 'add', this.addFeedItem );
    },
    events: {
    },
    render: function(){
    },
    addFeedItem: function( item ){
      this.$el.append( '<li>' + item.get( 'title' ) + '</li>' );
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
