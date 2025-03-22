import { View, Text, TouchableOpacity, SafeAreaView, StyleSheet } from 'react-native'
import Feather from '@expo/vector-icons/Feather';
import { useRouter } from 'expo-router';
import { AntDesign } from '@expo/vector-icons'
import NavButton from '../components/NavButton';

function Profile () {

    {/* Profile button shadow */}
    const router = useRouter();
    const cardShadow = {
        shadowColor: "#8D9BB5",
        shadowOffset: {
            width: 0,
            height: 3,
        },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    };

    return(
        <SafeAreaView className='flex-1 bg-white'>
            <View className='gap-y-10'>
                {/* Log out */}
                <View className='flex w-full flex-row justify-center mt-5'>
                    <View className='flex w-full left-5 justify-center items-center'>
                        <Text className='text-xl font-dm-sans-extrabold'>Profile</Text>
                    </View>
                    <TouchableOpacity className='flex right-10' onPress={() => router.push('/')}>
                        <Feather name='log-out' color={'#4F63AC'} size={24}/>
                    </TouchableOpacity>
                </View>
                <View className='flex w-full flex-col justify-start left-10'>
                    <Text className='text-[30px]'>Kaspar Pavel</Text>
                    <Text className='mt-3 text-lightgray text-lg'>kaspupavel@gmail.com</Text>
                </View>
                {/* User listings */}
                <TouchableOpacity className='flex flex-row w-[80%] bg-white p-5 mx-10 justify-between items-center rounded-xl'
                style={cardShadow}>
                    <View className='flex flex-col'>
                        <Text className='text-2xl text-seablue'>My listing</Text>
                        <Text className='text-lightgray'>Already have 10 listing</Text>
                    </View>
                    <AntDesign name="arrowright" size={36} color="#4F63AC" />
                </TouchableOpacity>
                {/* Settings */}
                <TouchableOpacity className='flex flex-row w-[80%] bg-white p-5 mx-10 justify-between items-center rounded-xl'
                style={cardShadow}>
                    <View className='flex flex-col'>
                        <Text className='text-2xl text-seablue'>Settings</Text>
                        <Text className='text-lightgray'>Account, FAQ, Contact</Text>
                    </View>
                    <AntDesign name="arrowright" size={36} color="#4F63AC" />
                </TouchableOpacity>
            </View>
            <View className='flex-1'/>
            {/* New listing */}
            <View className='flex w-full justify-center items-center mb-5'>
                <NavButton name='Add a new listing' address='/new-listing'/>
            </View>
        </SafeAreaView>
    )
}

export default Profile