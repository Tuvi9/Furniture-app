import { useState } from "react";
import { Text, View, SafeAreaView, TextInput } from "react-native";
import BackButton from "./components/backbutton";
import NavButton from "./components/navbutton";
import Redirect from "./components/redirect";
import Feather from '@expo/vector-icons/Feather';

function LogInScreen() {

  const [showPassword, setShowPassword] = useState(false);

  const toggleShowPassword = () => {
    setShowPassword(!showPassword)
  }

  return (
    <SafeAreaView className='flex-1 bg-white'>
      {/* Navigation */}
      <BackButton name='Log In'/>

      {/* Form */}
      <View className='flex-1'>
        <View className='flex w-full items-center mt-[100px]'>
          <View className="w-[300px] gap-y-10">
            {/* E-mail */}
            <View>
              <Text className="text-2xl font-dm-sans-medium text-seablue mb-1 ml-1">E-mail</Text>
              <TextInput 
                className='w-full text-2xl font-dm-sans-bold border-2 border-lightgray p-5 rounded-2xl'
                placeholder='example@gmail.com'
                placeholderTextColor="#AAAAAA"
                keyboardType="email-address"
                autoCapitalize="none"
              />
            </View>
            {/* Password */}
            <View className="w-[300px]">
              <Text className="text-2xl font-dm-sans-medium text-seablue mb-1 ml-1">Password</Text>
              <View className="flex flex-row border-2 border-lightgray p-5 rounded-2xl">
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
            {/* Submit */}
            <View className='mt-5'>
              <NavButton name='Log In' address='/home'/>
            </View>
          </View>
        </View>
      </View>
      {/* Redirect */}
      <Redirect name='Sign Up' desc="Don’t have an account?" address='/signup'/>
    </SafeAreaView>
  );
}

export default LogInScreen