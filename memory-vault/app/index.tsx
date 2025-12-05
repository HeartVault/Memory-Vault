import { View, Text, StyleSheet } from 'react-native';

export default function Index() {
  return (
    <View className='flex-1 items-center justify-center bg-red-400'>
      <Text style={styles.text}>Hello</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
  text: {
    fontSize: 32,
    fontWeight: 'bold',
  },
});
