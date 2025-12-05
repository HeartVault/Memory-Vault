import { View, TouchableOpacity, ActivityIndicator, Text } from 'react-native';
import { useState } from 'react';
import { router } from 'expo-router';
import { MaterialIcons } from '@expo/vector-icons';
import { Input } from '@/src/components/ui';

export function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async () => {
    if (!email || !password) return;

    setIsLoading(true);

    // TODO: Implement actual login logic
    console.log('Login:', { email, password, rememberMe });

    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      // TODO: Navigate to home after successful login
      // router.replace('/(tabs)/');
    }, 1000);
  };

  return (
    <View className="gap-4">
      {/* Email field */}
      <Input
        label="Email"
        placeholder="you@example.com"
        value={email}
        onChangeText={setEmail}
        icon="email"
        type="email"
        autoComplete="email"
        required
      />

      {/* Password field */}
      <View className="gap-1">
        <View className="flex-row items-center justify-between">
          <Text className="text-white text-sm font-medium">Password</Text>
          <TouchableOpacity
            onPress={() => router.push('/auth/forgot-password' as any)}
            activeOpacity={0.7}
          >
            <Text className="text-emerald-400 text-sm">Forgot password?</Text>
          </TouchableOpacity>
        </View>
        <Input
          placeholder="Enter your password"
          value={password}
          onChangeText={setPassword}
          icon="lock"
          type="password"
          autoComplete="password"
          required
        />
      </View>

      {/* Remember me */}
      <TouchableOpacity
        onPress={() => setRememberMe(!rememberMe)}
        className="flex-row items-center gap-2"
        activeOpacity={0.7}
      >
        <View
          className={`w-5 h-5 rounded border-2 items-center justify-center ${
            rememberMe ? 'bg-emerald-500 border-emerald-500' : 'border-white/20 bg-white/5'
          }`}
        >
          {rememberMe && <MaterialIcons name="check" size={14} color="#ffffff" />}
        </View>
        <Text className="text-sm text-gray-400">Remember me</Text>
      </TouchableOpacity>

      {/* Submit button */}
      <TouchableOpacity
        onPress={handleSubmit}
        disabled={isLoading || !email || !password}
        className="w-full mt-2"
        activeOpacity={0.8}
      >
        <View
          className="w-full py-4 rounded-2xl items-center justify-center"
          style={{
            backgroundColor: isLoading || !email || !password ? '#374151' : '#10b981',
          }}
        >
          {isLoading ? (
            <ActivityIndicator color="#ffffff" />
          ) : (
            <Text className="text-white text-lg font-semibold">Sign In</Text>
          )}
        </View>
      </TouchableOpacity>

      {/* Divider */}
      <View className="relative my-2">
        <View className="absolute inset-0 justify-center">
          <View className="w-full border-t border-white/10" />
        </View>
        <View className="relative items-center">
          <Text className="px-4 bg-white/5 text-gray-400 text-sm">Or continue with</Text>
        </View>
      </View>

      {/* Social login buttons */}
      <View className="flex-row gap-4">
        <TouchableOpacity
          className="flex-1 bg-white/5 border border-white/20 rounded-full py-4 items-center justify-center"
          activeOpacity={0.7}
        >
          <Text className="text-white font-medium">Google</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
