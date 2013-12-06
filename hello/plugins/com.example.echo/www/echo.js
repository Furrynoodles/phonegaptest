var echo = {
    createEvent: function(successCallback, errorCallback, message) {
        cordova.exec(
            successCallback, // success callback function
            errorCallback, // error callback function
            'Echo', // mapped to our native Java class called "CalendarPlugin"
            'addEcho', // with this action name
            [{                  // and this array of custom arguments to create our entry
                "message": message
            }]
        ); 
    }
}
module.exports = echo;