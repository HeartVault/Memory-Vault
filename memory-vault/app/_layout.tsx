import '../global.css'
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';

export default function RootLayout() {
  return (
    <>
      <Stack>
        <Stack.Screen name="index" options={{ headerShown: false }} />
        <Stack.Screen name="auth/sign-in" options={{headerShown: false}} />
        <Stack.Screen name="auth/sign-up" options={{headerShown: false}} />
      </Stack>
      <StatusBar style="auto" />
    </>
  );
}
