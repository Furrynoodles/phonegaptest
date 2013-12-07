package com.example.myplugin;

import twitter4j.*;
import twitter4j.conf.*;
import java.util.*;
import java.lang.reflect.*;
 
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
            callbackContext.success( twitter() );
            return true;
        }
        callbackContext.error("Invalid action");
        return false;
    }

    private String twitter(){
      Twitter twitter = TwitterFactory.getSingleton();
      String methods = "methods";
      Method[] m = twitter.getClass().getMethods();
      try{
        List<Status> statuses = twitter.getHomeTimeline();
        for( Status status : statuses ){
          methods += ", ";
          methods += status.getText();
        }
        return methods;
      }catch( Exception e ){
        return e.getMessage();
      }
    }
}
