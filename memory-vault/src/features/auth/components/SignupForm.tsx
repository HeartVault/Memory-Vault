import { View, TouchableOpacity, ActivityIndicator, Text } from 'react-native';
import { useState } from 'react';
import { router } from 'expo-router';
import { MaterialIcons } from '@expo/vector-icons';
import { Input } from '@/src/components/ui';

export function SignupForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [agreeToTerms, setAgreeToTerms] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit =  () => {

    console.log('Signup:', formData);
    router.replace('/(tabs)/explore');

  };

  const isFormValid =
    formData.name &&
    formData.email &&
    formData.password &&
    formData.confirmPassword &&
    formData.password === formData.confirmPassword &&
    formData.password.length >= 8 &&
    agreeToTerms;

  const passwordError =
    formData.confirmPassword && formData.password !== formData.confirmPassword
      ? 'Passwords do not match'
      : undefined;

  return (
    <View className="gap-4">
      {/* Name field */}
      <Input
        label="Full Name"
        placeholder="John Doe"
        value={formData.name}
        onChangeText={(text) => setFormData({ ...formData, name: text })}
        icon="person"
        type="text"
        autoCapitalize="words"
        autoComplete="name"
        required
      />

      {/* Email field */}
      <Input
        label="Email"
        placeholder="you@example.com"
        value={formData.email}
        onChangeText={(text) => setFormData({ ...formData, email: text })}
        icon="email"
        type="email"
        autoComplete="email"
        required
      />

      {/* Password field */}
      <Input
        label="Password"
        placeholder="Create a password"
        value={formData.password}
        onChangeText={(text) => setFormData({ ...formData, password: text })}
        icon="lock"
        type="password"
        autoComplete="password-new"
        helperText="Must be at least 8 characters"
        required
      />

      {/* Confirm Password field */}
      <Input
        label="Confirm Password"
        placeholder="Confirm your password"
        value={formData.confirmPassword}
        onChangeText={(text) => setFormData({ ...formData, confirmPassword: text })}
        icon="lock"
        type="password"
        autoComplete="password-new"
        error={passwordError}
        required
      />

      {/* Terms and conditions */}
      <TouchableOpacity
        onPress={() => setAgreeToTerms(!agreeToTerms)}
        className="flex-row items-center gap-2"
        activeOpacity={0.7}
      >
        <View
          className={`w-5 h-5 rounded border-2 items-center justify-center mt-0.5 ${agreeToTerms ? 'bg-emerald-500 border-emerald-500' : 'border-white/20 bg-white/5'
            }`}
        >
          {agreeToTerms && <MaterialIcons name="check" size={14} color="#ffffff" />}
        </View>
        <View className="flex-1">
          <Text className="text-sm text-gray-400">
            I agree to the{' '}
            <Text className="text-emerald-400">Terms of Service</Text> and{' '}
            <Text className="text-emerald-400">Privacy Policy</Text>
          </Text>
        </View>
      </TouchableOpacity>

      {/* Submit button */}
      <TouchableOpacity
        onPress={handleSubmit}
        disabled={false}
        className="w-full mt-1"
        activeOpacity={0.8}
      >
        <View
          className="w-full py-4 rounded-2xl items-center justify-center"
          style={{
            backgroundColor: isLoading || !isFormValid ? '#374151' : '#10b981',
          }}
        >
          {isLoading ? (
            <ActivityIndicator color="#ffffff" />
          ) : (
            <Text className="text-white text-lg font-semibold">Create Account</Text>
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
