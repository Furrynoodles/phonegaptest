var rss = {
    createEvent: function(successCallback, errorCallback, url) {
        cordova.exec(
            successCallback, // success callback function
            errorCallback, // error callback function
            'Rss', // mapped to our native Java class called "CalendarPlugin"
            'getRss', // with this action name
            [{                  // and this array of custom arguments to create our entry
                "url": url
            }]
        ); 
    }
}
module.exports = rss;
