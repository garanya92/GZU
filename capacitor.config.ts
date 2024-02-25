import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.gzu.uman.app',
  appName: 'gzu',
  webDir: 'dist/gzu',
  plugins:{
       PushNotifications:{
         "presentationOptions": ["badge", "sound", "alert"]
       },
       BackgroundRunner: {
        label: 'com.gzu.uman.app.check',
        src: 'runners/runner.js',
        event: 'myCustomEvent',
        repeat: true,
        interval: 30,
        autoStart: true,
      },

      LocalNotifications: {
        smallIcon: "ic_stat_icon_config_sample",
        iconColor: "#488AFF",
        sound: "beep.wav",
      },
  },

  server: {
    androidScheme: 'http'
  }
};

export default config;
