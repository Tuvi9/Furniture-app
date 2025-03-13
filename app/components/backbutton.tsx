import { View, Text, TouchableOpacity, SafeAreaView } from 'react-native'
import { router } from 'expo-router'
import { AntDesign } from '@expo/vector-icons'

interface ButtonName {
    name: string
}

function BackButton({ name }: ButtonName) {
    return (
        <SafeAreaView className='absolute left-5 z-10'>
            <TouchableOpacity 
                onPress={() => router.back()}
                className='flex flex-row items-center'
            >
                <AntDesign name="arrowleft" size={36} color="#4F63AC" />
                <Text className='text-[30px] font-dm-sans-bold text-seablue ml-3'>{name}</Text>
            </TouchableOpacity>
        </SafeAreaView>
    )
}

export default BackButton;