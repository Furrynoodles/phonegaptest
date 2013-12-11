package com.furrynoodles.rss;

import java.util.*;
 
import org.apache.cordova.CallbackContext;
import org.apache.cordova.CordovaPlugin;

import org.json.JSONObject;
import org.json.JSONArray;
import org.json.JSONException;

public class Rss extends CordovaPlugin {
    public static final String ACTION_ECHO = "getRss";

    @Override
    public boolean execute(String action, JSONArray args, CallbackContext callbackContext)
    throws JSONException
    {
        if( ACTION_ECHO.equals( action ) ){
            RomeRss rome = new RomeRss( "http://www.thetimes.co.uk/tto/news/rss" );
            callbackContext.success( rome.getRss() );
            return true;
        }
        callbackContext.error("Invalid action");
        return false;
    }
}
