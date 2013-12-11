package com.furrynoodles.rss;

import java.net.URL;
import java.net.MalformedURLException;
import java.io.InputStream;
import java.io.IOException;

import android.sax.Element;
import android.sax.RootElement;
import android.sax.EndElementListener;
import android.sax.EndTextElementListener;
import android.util.Xml;

import org.json.JSONObject;
import org.json.JSONArray;
import org.json.JSONException;

public class RomeRss{

  final URL feedUrl;

  public RomeRss( String feedUrl ){
    try {
      this.feedUrl = new URL( feedUrl );
    } catch (MalformedURLException e) {
      throw new RuntimeException(e);
    }
  }

  protected InputStream getInputStream() {
    try {
      return feedUrl.openConnection().getInputStream();
    } catch (IOException e) {
      throw new RuntimeException(e);
    }
  }

  public  String getRss(){

    try{
      final JSONObject currentMessage = new JSONObject();
      final JSONArray messages= new JSONArray();

      RootElement root = new RootElement("rss");
      Element channel = root.getChild("channel");
      Element item = channel.getChild("item");

      item.setEndElementListener(new EndElementListener(){
          public void end() {
            try{
              messages.put( new JSONObject( currentMessage.toString() ) );
            }catch(JSONException e){
            }
          }
      });
      item.getChild("title").setEndTextElementListener(new EndTextElementListener(){
          public void end(String body) {
            try{
              currentMessage.put( "title", body);
            }catch(JSONException e){
            }
          }
      });
      item.getChild("link").setEndTextElementListener(new EndTextElementListener(){
          public void end(String body) {
            try{
              currentMessage.put( "link", body);
            }catch(JSONException e){
            }
          }
      });
      item.getChild("description").setEndTextElementListener(new EndTextElementListener(){
          public void end(String body) {
            try{
              currentMessage.put( "description", body);
            }catch(JSONException e){
            }
          }
      });
      item.getChild("pubDate").setEndTextElementListener(new EndTextElementListener(){
          public void end(String body) {
            try{
              currentMessage.put( "date", body);
            }catch(JSONException e){
            }
          }
      });

      Xml.parse(this.getInputStream(), Xml.Encoding.UTF_8, root.getContentHandler() );
      return messages.toString();
    }
    catch (Exception e) {
        return "ERROR: "+e.getMessage();
    }
    catch (Error er) {
        return "ERROR: "+er.toString();
    }
  }
}
