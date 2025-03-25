import { useState } from "react";
import { Text, View, SafeAreaView, TextInput, Alert, TouchableOpacity } from "react-native";
import BackButton from "./components/backbutton";
import Redirect from "./components/redirect";
import Feather from '@expo/vector-icons/Feather';
import { supabase } from "@/utils/supabase";
import { useRouter } from 'expo-router';

function LogInScreen() {

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter()

  async function signInWithEmail() {
    // Alert user that they are being signed up
    setLoading(true)
    try {
      const {
        data: { session },
        error,
      } = await supabase.auth.signInWithPassword({
        email: email,
        password: password
      })

      if (error) {
        console.error('Login error:', error);
        Alert.alert("Error", error.message);
        return;
      }

      if (!session) {
        console.error('No session created');
        Alert.alert("Error", "Failed to create session");
        return;
      }
      
      // User is signed in, redirect to home
      router.push('/home')
    } catch (error) {
      console.error('Unexpected error during login:', error);
      Alert.alert("Error", "An unexpected error occurred");
    } finally {
      setLoading(false)
    }
  }

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
                value={email}
                onChangeText={setEmail}
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
            {/* Submit */}
            <View className='flex w-full justify-center items-center mt-5'>
              <TouchableOpacity 
                className='w-[300px] h-[74px] rounded-xl bg-seablue flex items-center justify-center'
                onPress={() => {
                  // Checks if all fields are filled
                  if (!email || !password) {
                    Alert.alert("Error", "Please fill in all fields")
                    return
                  }
                  // User must agree to terms of service before signing up
                  signInWithEmail()
                }}
                disabled={loading}
              >
                <Text 
                  className='text-white font-dm-sans-bold text-xl'
                >
                  {loading ? 'Loading...' : 'Log In'}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
      {/* Redirect */}
      <Redirect name='Sign Up' desc="Don't have an account?" address='/signup'/>
    </SafeAreaView>
  );
}

export default LogInScreen