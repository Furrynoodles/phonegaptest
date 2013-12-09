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
            callbackContext.success( retrieve() );
            return true;
        }
        callbackContext.error("Invalid action");
        return false;
    }

    private String retrieve(){
      
      try{
       /* List<Status> statuses = twitter.getHomeTimeline();
        for( Status status : statuses ){
          methods += ", ";
          methods += status.getText();
        }
        return methods;*/
        return "your face";
      }catch( Exception e ){
        return e.getMessage();
      }
    }
}
