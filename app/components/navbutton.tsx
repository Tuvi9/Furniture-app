import { View, Text, TouchableOpacity } from 'react-native'
import { router } from 'expo-router'

interface ButtonInfo {
    name: string,
    address: string
}

function NavButton({ name, address }: ButtonInfo) {
    return(
        <View>
            <TouchableOpacity 
                className='w-[300px] h-[74px] rounded-xl bg-seablue flex items-center justify-center'
                onPress={() => router.push(address as any)}
            >
                <Text 
                    className='text-white font-dm-sans-bold text-xl'
                >
                    {name}
                </Text>
            </TouchableOpacity>
        </View>
    )
}

export default NavButton