import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useState } from 'react';

interface InputProps {
  label?: string;
  placeholder?: string;
  value: string;
  onChangeText: (text: string) => void;
  icon?: keyof typeof MaterialIcons.glyphMap;
  type?: 'text' | 'email' | 'password';
  autoCapitalize?: 'none' | 'sentences' | 'words' | 'characters';
  autoComplete?: 'email' | 'password' | 'password-new' | 'name' | 'off';
  error?: string;
  helperText?: string;
  required?: boolean;
}

export function Input({
  label,
  placeholder,
  value,
  onChangeText,
  icon,
  type = 'text',
  autoCapitalize = 'none',
  autoComplete = 'off',
  error,
  helperText,
  required,
}: InputProps) {
  const [showPassword, setShowPassword] = useState(false);
  const isPassword = type === 'password';
  const showPasswordToggle = isPassword;

  const getKeyboardType = () => {
    if (type === 'email') return 'email-address';
    return 'default';
  };

  const getAutoComplete = () => {
    if (autoComplete !== 'off') return autoComplete;
    if (type === 'email') return 'email';
    if (type === 'password') return 'password';
    return 'off';
  };

  return (
    <View className="gap-1">
      {label && (
        <Text className="text-white text-sm font-medium">
          {label}
          {required && <Text className="text-red-400"> *</Text>}
        </Text>
      )}
      <View className="relative">
        {icon && (
          <MaterialIcons
            name={icon}
            size={20}
            color="#9ca3af"
            style={{ position: 'absolute', left: 12, top: 14, zIndex: 1 }}
          />
        )}
        <TextInput
          className={`bg-white/5 border rounded-xl px-4 py-4 text-white text-base ${
            icon ? 'pl-11' : 'pl-4'
          } ${showPasswordToggle ? 'pr-11' : 'pr-4'} ${
            error ? 'border-red-400' : 'border-white/20'
          }`}
          placeholder={placeholder}
          placeholderTextColor="#6b7280"
          value={value}
          onChangeText={onChangeText}
          keyboardType={getKeyboardType()}
          autoCapitalize={autoCapitalize}
          autoComplete={getAutoComplete()}
          secureTextEntry={isPassword && !showPassword}
        />
        {showPasswordToggle && (
          <TouchableOpacity
            onPress={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-4"
            activeOpacity={0.7}
          >
            <MaterialIcons
              name={showPassword ? 'visibility-off' : 'visibility'}
              size={20}
              color="#9ca3af"
            />
          </TouchableOpacity>
        )}
      </View>
      {error && <Text className="text-xs text-red-400">{error}</Text>}
      {helperText && !error && <Text className="text-xs text-gray-500">{helperText}</Text>}
    </View>
  );
}

