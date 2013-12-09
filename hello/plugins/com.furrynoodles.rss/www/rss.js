var rss = {
    createEvent: function(successCallback, errorCallback, message) {
        cordova.exec(
            successCallback, // success callback function
            errorCallback, // error callback function
            'Rss', // mapped to our native Java class called "CalendarPlugin"
            'getRss', // with this action name
            [{                  // and this array of custom arguments to create our entry
                "message": message
            }]
        ); 
    }
}
module.exports = rss;
