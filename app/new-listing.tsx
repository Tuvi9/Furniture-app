import { View, Text, SafeAreaView, TouchableOpacity } from 'react-native'
import { useRouter } from 'expo-router'
import Feather from '@expo/vector-icons/Feather';

function NewListing() {

    const router = useRouter()

    return (
        <SafeAreaView className='flex-1 bg-white'>
            <View className='flex w-full flex-row justify-center mt-5'>
                <TouchableOpacity className='flex left-10' onPress={() => router.push('/')}>
                    <Feather name='arrow-left' color={'#4F63AC'} size={24}/>
                </TouchableOpacity>
                <View className='flex w-full right-5 justify-center items-center'>
                    <Text className='text-xl font-dm-sans-extrabold'>Create a new listing</Text>
                </View>
            </View>
            <View className='flex flex-col left-10 mt-10 gap-y-5'>
                <Text className='text-seablue text-xl'>Upload photos</Text>
                <TouchableOpacity className='flex w-[100px] h-[100px] border-[1px] border-dotted border-lightgray rounded-xl justify-center items-center'>
                    <View className='opacity-20'>
                        <Feather name='plus-circle' color={'#8D9BB5'} size={36}/>
                    </View>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    )
}

export default NewListing