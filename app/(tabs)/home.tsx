import { View, Text, SafeAreaView, TouchableOpacity, Image, FlatList } from 'react-native'
import { useEffect, useState } from 'react'
import { Feather } from '@expo/vector-icons'
import CategorySelector from '../components/CategorySelector'
import { supabase } from '@/utils/supabase'

interface Furniture {
    id: string,
    name: string,
    price: number,
    image_url: string
}

function Home () {

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

    const [selectedCategory, setSelectedCategory] = useState(1)
    const [listings, setListings] = useState<Furniture[]>([])
    const [loading, setLoading] = useState(true)

    const handleCategorySelect = (categoryId: number) => {
        setSelectedCategory(categoryId)
        // Here you would fetch products for the selected category
        console.log(`Selected category: ${categoryId}`)
    }

    // Fetch all available listings
    const fetchData = async() => {
        try {
            const { data, error } = await supabase
                .from('furniture')
                .select('*')

            if (error) {
                console.error("Error fetching listings", error)
                return
            }
            setListings(data || [])

        } catch (error) {
            console.error("Error", error)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchData()
    }, [])

    // listing styling
    const renderItem = ({ item }: { item: Furniture }) => (
        <TouchableOpacity 
            style={{ 
                width: '45%',
                ...cardShadow
            }}
            className='m-2'
        >
            <View className='bg-white rounded-xl overflow-hidden'>
                <Image 
                    source={{ uri: item.image_url }} 
                    className="w-full h-64 rounded-lg"
                    resizeMode="cover"
                />
                <View className="flex-col justify-between items-start p-2">
                    <Text className="text-base font-dm-sans-bold text-lightgray">{item.name}</Text>
                    <Text className="text-base font-dm-sans-bold mt-1">$ {item.price.toFixed(2)}</Text>
                </View>
            </View>
        </TouchableOpacity>
    )

    return(
        <SafeAreaView className='flex-1 bg-white'>
            {/* Search */}
            <View className='flex w-full flex-row justify-center mt-5'>
                <TouchableOpacity className='flex left-10'>
                    <Feather name='search' color={'#4F63AC'} size={32}/>
                </TouchableOpacity>
                <View className='flex w-full right-5 justify-center items-center'>
                    <Text className='text-xl font-dm-sans-extrabold'>Find All You Need</Text>
                </View>
            </View>

            {/* Categories */}
            <View className='mt-10'>
                <CategorySelector 
                    selectedCategory={selectedCategory}
                    onSelectCategory={handleCategorySelect}
                />
            {/* Loading screen */}
            </View>
            {loading ? (
                <View className="flex-1 justify-center items-center">
                    <Text className="text-xl">Loading...</Text>
                </View>
            ) : (
                <FlatList
                    data={listings}
                    renderItem={renderItem}
                    keyExtractor={(item) => item.id}
                    numColumns={2}
                    columnWrapperStyle={{ justifyContent: 'space-between' }}
                    contentContainerStyle={{ padding: 8 }}
                    showsVerticalScrollIndicator={false}
                />
            )}
        </SafeAreaView>
    )
}

export default Home