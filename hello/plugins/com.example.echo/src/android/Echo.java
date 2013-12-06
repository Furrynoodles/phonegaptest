package com.example.myplugin;
 
import org.apache.cordova.CallbackContext;
import org.apache.cordova.CordovaPlugin;
import org.json.JSONObject;
import org.json.JSONArray;
import org.json.JSONException;

public class Echo extends CordovaPlugin {
    public static final String ACTION_ECHO = "addEcho";

    @Override
    public boolean execute(String action, JSONArray args, CallbackContext callbackContext)
    throws JSONException
    {
        if( ACTION_ECHO.equals( action ) ){
            callbackContext.success();
            return true;
        }
        callbackContext.error("Invalid action");
        return false;
    }
}