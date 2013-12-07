#NOTES
<br/>
1. Splashscreen configs in Phonegap's generated www/config.xml is misleading.
   The tags `<gap:splash ... />` are made for the Phonegap Build server, not the CLI
   When compiling with the CLI these tags/settings are silently ignored


   Instead, use:<br/>
   `<preference name="SplashScreen" value="splash"/>`

   and:<br/>
   `<preference name="SplashScreenDelay" value="2000"/>`

  Also note that files in the folder www/res/drawable/ are not copied into the android build automatically.
  You'll need to manual copy them into platforms/android/res/drawable/
