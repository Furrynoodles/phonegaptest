package com.furrynoodles.twitter;

import twitter4j.*;
import twitter4j.conf.*;
import java.util.*;
import java.lang.reflect.*;
 

public class TwitterStandalone {

  public static void main(String[] args)
  {
      TwitterStandalone standalone = new TwitterStandalone();
      System.out.print(standalone.run());
  }

    public String run(){
      twitter4j.Twitter twitter = TwitterFactory.getSingleton();
      String methods = "methods";
      Method[] m = twitter.getClass().getMethods();
      try{
        List<Status> statuses = twitter.getHomeTimeline();

        String statusJson = "ballsack";
        
        /*for( Status status : statuses ){
          //methods += ", ";
         // methods += status.getText();
          statusJson = twitter4j.json.DataObjectFactory.getRawJSON(status);
        }*/
        return statusJson;
        //return methods;
      }catch( Exception e ){
        return e.getMessage();
      }
    }
}
