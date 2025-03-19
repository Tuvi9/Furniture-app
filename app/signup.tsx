import { useState } from "react";
import { Text, View, SafeAreaView, TextInput } from "react-native";
import BackButton from "./components/backbutton";
import NavButton from "./components/navbutton";
import Redirect from "./components/redirect";
import Checkbox from "expo-checkbox";
import Feather from '@expo/vector-icons/Feather';

function SignUpScreen() {

  const [showPassword, setShowPassword] = useState(false);
  const [isChecked, setChecked] = useState(false)

  const toggleShowPassword = () => {
    setShowPassword(!showPassword)
  }

  return (
    <SafeAreaView className='flex-1 bg-white'>
      {/* Navigation */}
      <BackButton name='Sign Up'/>

      {/* Form */}
      <View className='flex w-full items-center mt-[100px] gap-y-10'>
        {/* Name */}
        <View className="w-[300px]">
          <Text className="text-2xl font-dm-sans-medium text-seablue mb-1 ml-1">Name</Text>
          <TextInput 
            className='w-full text-2xl font-dm-sans-bold border-2 border-lightgray p-5 rounded-2xl'
            placeholder='John Doe'
            placeholderTextColor="#AAAAAA"
          />
        </View>
        {/* E-mail */}
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
        {/* Password */}
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
      {/* Checkbox */}
      <View className='flex flex-row justify-start items-center mt-10 ml-[50px]'>
        <Checkbox 
          className='mr-5 p-3'
          value={isChecked}
          onValueChange={setChecked}
          color={isChecked ? '#8D9BB5' : undefined}
        />
        <Text className='font-dm-sans text-seablue text-lg'>I agree with <Text className='font-dm-sans-extrabold'>Terms</Text> & <Text className='font-dm-sans-extrabold'>Privacy</Text></Text>
      </View>
      {/* Submit */}
      <View className='flex w-full justify-center items-center mt-10'>
        <NavButton name='Sign Up' address='/home'/>
      </View>
      {/* Redirect */}
      <View className='flex-1' />
      <Redirect name='Log In' desc='Already have an account?' address='/login'/>
    </SafeAreaView>
  );
}

export default SignUpScreen