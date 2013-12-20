(function(){

  window.ui = window.ui || {};
  ui.contact = {};
  ui.contact.createContactView = createContactView;

  var ContactView = Backbone.View.extend({
    initialize: function(){},
    events:{}
  });

  function createContactView( containerSelector, templateSelector ){
    var container = $( containerSelector );
    container.append( $( templateSelector ).html() );
    return new ContactView({ el: $( '#contact' ) });
  }

  createContactView( '#contact', '#contact-template' );

})();
