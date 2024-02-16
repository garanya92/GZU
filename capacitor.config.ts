import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.gzu.uman.app',
  appName: 'gzu',
  webDir: 'dist/gzu',
  plugins:{
       "PushNotifications":{
         "presentationOptions": ["badge", "sound", "alert"]
       }
  },

  server: {
    androidScheme: 'http'
  }
};

export default config;
