import { View, Text, TouchableOpacity, Image, ScrollView, StatusBar } from 'react-native'
import { useLocalSearchParams, useRouter } from 'expo-router'
import { Feather, MaterialCommunityIcons } from '@expo/vector-icons'
import { useState } from 'react'

interface ListingDetails {
    id: string,
    name: string,
    price: number,
    image_url: string,
    description: string,
    category: string
}

function DetailedListing() {
    const router = useRouter()
    const params = useLocalSearchParams<{ listing: string }>()
    const listing: ListingDetails = JSON.parse(params.listing)
    const [isBookmarked, setIsBookmarked] = useState(false)

    return (
        <View className='flex-1 bg-white'>
            <StatusBar barStyle="dark-content" />
            {/* Image Section */}
            <View className='relative'>
                <Image 
                    source={{ uri: listing.image_url }} 
                    className="w-full h-[450px]"
                    resizeMode="cover"
                />
                {/* Back Button Overlay */}
                <TouchableOpacity 
                    className='absolute mt-[50px] left-5 bg-seablue p-3 rounded-full'
                    onPress={() => router.back()}
                >
                    <Feather name='arrow-left' color={'white'} size={24}/>
                </TouchableOpacity>
            </View>

            {/* Content Section */}
            <View className='flex-1 -mt-10'>
                <ScrollView className='flex-1 bg-white rounded-t-3xl'>
                    {/* Content */}
                    <View className='p-5'>
                        <Text className="text-3xl italic mt-5">{listing.name}</Text>
                        <Text className="text-4xl font-dm-sans-bold mt-3">$ {listing.price.toFixed(2)}</Text>

                        <View className='mt-5'>
                            <Text className="text-lg text-lightgray font-dm-sans mt-1">{listing.description}</Text>
                        </View>
                    </View>
                </ScrollView>
            </View>

            {/* Favourite/Contact */}
            <View className='bg-white p-5 flex-row justify-center items-center mb-5'>
                <TouchableOpacity
                    className='bg-gray-100 p-4 rounded-xl'
                    onPress={() => setIsBookmarked(!isBookmarked)}
                >
                    <MaterialCommunityIcons 
                        name={isBookmarked ? 'bookmark' : 'bookmark-outline'}
                        color={'#4F63AC'} 
                        size={36}
                    />
                </TouchableOpacity>
                <TouchableOpacity 
                    style={{ width: 250 }}
                    className='h-[74px] rounded-xl bg-seablue flex items-center justify-center'
                    onPress={() => router.push('/home')}
                >
                    <Text className='text-white font-dm-sans-bold text-xl'>Contact Seller</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default DetailedListing;