cordova.define('cordova/plugin_list', function(require, exports, module) {
module.exports = [
    {
        "file": "plugins/com.example.echo/www/echo.js",
        "id": "com.example.echo.Echo",
        "clobbers": [
            "window.echo"
        ]
    }
]
});