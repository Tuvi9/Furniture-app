import { Stack } from "expo-router";

function RootLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name='index' />
      <Stack.Screen name='signup' />
      <Stack.Screen name='login' />
    </Stack>
  );
}

export default RootLayout