#NOTES
<br/>
1. Splashscreen configs in Phonegap's generated www/config.xml is misleading.
   The tags `<gap:splash ... />` are made for the Phonegap Build server, not the CLI
   When compiling with the CLI these tags/settings are silently ignored


   Instead, use:<br/>
   `<preference name="SplashScreen" value="splash"/>`

   and:<br/>
   `<preference name="SplashScreenDelay" value="2000"/>`
