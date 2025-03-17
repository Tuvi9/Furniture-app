import { View, Text, Pressable } from 'react-native'
import { router } from 'expo-router'

type ValidRoutes = "/" | "/login" | "/signup" | "/home"

interface Redirect {
    name: string
    desc: string
    address: ValidRoutes
}

function Redirect ({ name, desc, address }: Redirect) {
    return(
        <View className='flex flex-row justify-center items-center bottom-0 left-0 right-0 py-4'>
            <Text className='text-center text-seablue font-dm-sans'>{desc}</Text>
            <Pressable 
                onPress={() => router.push(address)}
            >
                <Text className='text-seablue font-dm-sans-extrabold ml-1 underline'>{name}</Text>
            </Pressable>
        </View>
    )
}

export default Redirect