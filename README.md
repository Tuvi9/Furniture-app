# Furniture marketplace

## Get started

1. Install dependencies

   ```bash
   npm install
   ```

2. Start the app

   ```bash
    npx expo start
   ```

3. A .env file that connects to a supabase PostgreSQL database

   ```bash
   EXPO_PUBLIC_IPADDRESS,
   EXPO_PUBLIC_SUPABASE_URL
   EXPO_PUBLIC_SUPABASE_ANON_KEY
   ```  

## Current problems

With expos newest SDK 53 the react libray NativeWind currently doesn't support it so until this gets
fixed the project is not runnable on Expo Go Ios since it always requires the latest SDK

## Possible fixes

It is possible to build a custom dev client which runs a older version SDK like 52.

# My experience coding this project

This was my firs expierience with React Native and using the framework Expo. The way I ended up coding this app was only using the figma prototype given to me. This was significantly slower then following the documentation but I believe a more open approach allowed be to deepen my learning as I had to use more of my own brain to read the documentation, look up youtube tutorials and felt more control over my project.

The one sorta fatal flaw I made was not using React Natives default styling components and looking for an alternative I was more comfortable with which was NativeWind which is a React Native library that bring TailWinds CSS classes over to React Native but with the newest SDK 53 since the team behind NativeWind is pretty small they haven't updated it yet to support the newest SDK which breaks my project currently.

Overall I'm happy with this project I am really bummed out what happened at the end and that I can't present a complete project but that blame is on me for choosing this stack.


