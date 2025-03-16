import { useState } from "react";
import { Text, View, SafeAreaView, TextInput } from "react-native";
import BackButton from "./components/backbutton";
import Feather from '@expo/vector-icons/Feather';

function SignUpScreen() {

  const [showPassword, setShowPassword] = useState(false);

  const toggleShowPassword = () => {
    setShowPassword(!showPassword)
  }

  return (
    <SafeAreaView className='flex-1 bg-white'>
      {/* Navigation */}
      <BackButton name='Sign Up'/>

      {/* Form */}
      <View className='flex w-full h-screen items-center mt-[100px] gap-y-10'>
        <View className="w-[300px]">
          <Text className="text-2xl font-dm-sans-medium text-seablue mb-1 ml-1">Name</Text>
          <TextInput 
            className='w-full text-2xl font-dm-sans-bold border-2 border-lightgray p-5 rounded-2xl'
            placeholder='John Doe'
            placeholderTextColor="#AAAAAA"
          />
        </View>
        <View className="w-[300px]">
          <Text className="text-2xl font-dm-sans-medium text-seablue mb-1 ml-1">E-mail</Text>
          <TextInput 
            className='w-full text-2xl font-dm-sans-bold border-2 border-lightgray p-5 rounded-2xl'
            placeholder='example@gmail.com'
            placeholderTextColor="#AAAAAA"
            keyboardType="email-address"
            autoCapitalize="none"
          />
        </View>
        <View className="w-[300px]">
          <Text className="text-2xl font-dm-sans-medium text-seablue mb-1 ml-1">Password</Text>
          <View className='flex flex-row border-2 border-lightgray p-5 rounded-2xl'>
            <TextInput 
              secureTextEntry={!showPassword}
              className='w-full text-2xl font-dm-sans-bold'
              placeholder='**********'
              placeholderTextColor="#AAAAAA"
            />
            <View className='right-5'>
              <Feather 
                name={showPassword ? 'eye' : 'eye-off'} 
                size={24} 
                color="#AAAAAA"
                onPress={toggleShowPassword}
              />
            </View>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}

export default SignUpScreen