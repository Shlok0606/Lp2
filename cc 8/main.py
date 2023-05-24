import webapp2
import os
import urllib
import json

from google.appengine.ext.webapp import template

class MainPage(webapp2.RequestHandler):
 def get(self):
  template_val={}
  path=os.path.join( os.path.dirname(__file__) , 'templates/index.html')
  self.response.out.write(template.render(path,template_val)); 
  
class Weather(webapp2.RequestHandler):
 def post(self):
  latitude=self.request.get('latitude')
  longitude=self.request.get('longitude')
  monthly=self.request.get('monthly')
  daily=self.request.get('daily')
  
  url= "https://api.open-meteo.com/v1/forecast?timezone=GMT"+"&latitude="+latitude + "&longitude=" + longitude 
  
  data=urllib.urlopen(url).read()
  data=json.loads(data)
  
  template_val={
  'data':data
  }
  
  path=os.path.join( os.path.dirname(__file__) , 'templates/results.html')
  self.response.out.write(template.render(path,template_val)); 
  
app=webapp2.WSGIApplication(
[("/result" , Weather) , ("/" , MainPage)] , 
debug=True
)  
  
     
