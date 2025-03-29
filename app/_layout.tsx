import React from "react";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";

function RootLayout() {
  return (
    <>
      <StatusBar style='dark'/>
      <Stack
        screenOptions={{
          headerShown: false,
        }}
      >
        
        <Stack.Screen name='index' />
        <Stack.Screen name='signup' />
        <Stack.Screen name='login' />
        <Stack.Screen name='new-listing'/>
        <Stack.Screen name='detailed-listing' />
        <Stack.Screen name='(tabs)' options={{ headerShown: false }} />
      </Stack>
    </>
  );
}

export default RootLayout