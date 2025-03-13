import { Text, View, Image, TouchableOpacity } from "react-native";
import { router } from 'expo-router';
import '../global.css'

function Index() {
  return (
    <View className='flex w-full h-full justify-center items-center bg-white'>
      <View>
        <View className='pb-16 items-center gap-y-16'>
          <Image 
            className='w-screen h-[250px]' 
            source={require('../assets/images/welcome-screen.png')}
            resizeMode="contain"
          />
          <View className='flex items-center'>
            <Text className='text-[40px] font-dm-sans-bold'>You'll Find</Text>
            <Text className='text-[40px] font-dm-sans-bold underline text-muteorange'>All you need</Text>
            <Text className='text-[40px] font-dm-sans-bold'>Here!</Text>
          </View>
        </View>
        <View className='flex flex-col items-center gap-y-8'>
          <View>
            <TouchableOpacity 
              className='px-[125] py-[25px] rounded-xl bg-seablue'
              onPress={() => router.push('/signup')}
            >
              <Text 
                className='text-white font-dm-sans-bold text-xl'
              >
                Sign Up
              </Text>
            </TouchableOpacity>
          </View>
          <View>
            <TouchableOpacity
              onPress={() => router.push('/login')}
            >
              <Text 
                className='text-seablue text-xl'
              >
                Log In
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
}

export default Index