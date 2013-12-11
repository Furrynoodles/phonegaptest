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
      try{
        if( ACTION_ECHO.equals( action ) ){
            JSONObject argObj = args.getJSONObject( 0 );
            RomeRss rome = new RomeRss( argObj.getString( "url" ) );
            callbackContext.success( rome.getRss() );
            return true;
        }
        callbackContext.error("Invalid action");
        return false;
      }catch( Exception e ){
        callbackContext.error(e.getMessage());
        return false;
      }
    }
}
