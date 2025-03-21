import { useState } from "react";
import { Text, View, SafeAreaView, TextInput, Alert, TouchableOpacity } from "react-native";
import { supabase } from '@/utils/supabase';
import BackButton from "./components/backbutton";
import NavButton from "./components/navbutton";
import Redirect from "./components/redirect";
import Checkbox from "expo-checkbox";
import Feather from '@expo/vector-icons/Feather';
import { useRouter } from "expo-router";

function SignUpScreen() {

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false);
  const [isChecked, setChecked] = useState(false)
  const router = useRouter();

  async function signUpWithEmail() {
    // Alert user that they are being signed up
    setLoading(true)
    const {
      data: { session },
      error,
    } = await supabase.auth.signUp({
      email: email,
      password: password,
      options: {
        data: { display_name: name }
      }
    })

    if (error) {
      Alert.alert("Error", error.message)
      setLoading(false)
      return
    }
    
    if (session) {
      // User is signed in, redirect to home
      router.push('/home')
    } else {
      // Email confirmation required
      Alert.alert("Success", "Please check your inbox for email verification!")
    }
    // Once account created
    setLoading(false)
  }

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
            value={name}
            onChangeText={setName}
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
            value={email}
            onChangeText={setEmail}
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
              value={password}
              onChangeText={setPassword}
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
        <TouchableOpacity 
          className='px-[125px] py-[25px] rounded-xl bg-seablue'
          onPress={() => {
            // Checks if all fields are filled
            if (!name || !email || !password) {
              Alert.alert("Error", "Please fill in all fields")
              return
            }
            // User must agree to terms of service before signing up
            if (!isChecked) {
              Alert.alert("Error", "Please agree to the terms and conditions")
              return
            }
            signUpWithEmail()
          }}
          disabled={loading}
        >
          <Text className='text-white font-dm-sans-bold text-xl'>
            {loading ? 'Loading...' : 'Sign Up'}
          </Text>
        </TouchableOpacity>
      </View>
      {/* Redirect */}
      <View className='flex-1' />
      <Redirect name='Log In' desc='Already have an account?' address='/login'/>
    </SafeAreaView>
  );
}

export default SignUpScreen