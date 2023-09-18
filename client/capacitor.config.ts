import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.example.app',
  appName: 'client',
  webDir: 'build',
  server: {
    androidScheme: 'https',
    url: 'http://192.168.0.47:3000',
    cleartext: true
  }
};

export default config;
