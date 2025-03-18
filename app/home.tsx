import { View, Text } from 'react-native'
import { useEffect, useState } from 'react'
import axios from 'axios'

function Home () {
    const backAdress = process.env.EXPO_PUBLIC_IPADDRESS
    const [greeting, setGreeting] = useState('Loading...')

    useEffect(() => {
        axios.get(`${backAdress}/api/hello`)
            .then(response => setGreeting(response.data))
            .catch(err => console.error(err))
    }, [])

    return(
        <View className='flex w-full h-screen justify-center items-center'>
            <Text className='text-2xl text-seablue'>{greeting}</Text>
        </View>
    )
}

export default Home