package com.furrynoodles.twitter;

import twitter4j.*;
import twitter4j.conf.*;
import java.util.*;
import java.lang.reflect.*;
 
import org.apache.cordova.CallbackContext;
import org.apache.cordova.CordovaPlugin;
import org.json.JSONObject;
import org.json.JSONArray;
import org.json.JSONException;

public class Twitter extends CordovaPlugin {
    public static final String ACTION_GET_TWITTER = "getTwitter";

    @Override
    public boolean execute(String action, JSONArray args, CallbackContext callbackContext)
    throws JSONException
    {
        if( ACTION_GET_TWITTER.equals( action ) ){
            callbackContext.success( twit() );
            return true;
        }
        callbackContext.error("Invalid action");
        return false;
    }

    private String twit(){
      twitter4j.Twitter twitter = TwitterFactory.getSingleton();
      String methods = "methods";
      Method[] m = twitter.getClass().getMethods();
      try{
        List<Status> statuses = twitter.getHomeTimeline();

        String statusJson = "Twitter";

        statusJson = twitter4j.json.DataObjectFactory.getRawJSON(statuses);
        
        /*for( Status status : statuses ){
          //methods += ", ";
         // methods += status.getText();
          return twitter4j.json.DataObjectFactory.getRawJSON(status);
        }*/
        return statusJson;
        //return methods;
      }catch( Exception e ){
        return e.getMessage(); 
      }
    }
}
