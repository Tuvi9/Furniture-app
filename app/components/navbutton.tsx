import { View, Text, TouchableOpacity } from 'react-native'
import { router } from 'expo-router'

type ValidRoutes = "/" | "/login" | "/signup" | "/home"

interface ButtonInfo {
    name: string,
    address: ValidRoutes
}

function NavButton({ name, address }: ButtonInfo) {
    return(
        <View>
            <TouchableOpacity 
                className='px-[125px] py-[25px] rounded-xl bg-seablue'
                onPress={() => router.push(address)}
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