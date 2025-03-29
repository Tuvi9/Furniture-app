import { View, Text, SafeAreaView, TouchableOpacity, Image, FlatList } from 'react-native'
import { useEffect, useState } from 'react'
import { Feather } from '@expo/vector-icons'
import CategorySelector from '../components/CategorySelector'
import { supabase } from '@/utils/supabase'
import { useRouter } from 'expo-router'

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
    const router = useRouter()

    // the five possible categories
    const getCategoryName = (id: number): string => {
        switch(id) {
            case 1: return 'Chair';
            case 2: return 'Table';
            case 3: return 'Armchair';
            case 4: return 'Bed';
            case 5: return 'Lamp';
            default: return "";
        }
    }

    const handleCategorySelect = async (categoryId: number) => {
        // currently selected category
        setSelectedCategory(categoryId)
        setLoading(true)
        try {
            // mathces the current id to its respective category name
            const categoryName = getCategoryName(categoryId);

            const { data, error } = await supabase
                .from('furniture')
                .select('*')
                // returns only those listings in the current category
                .eq('category', categoryName.toLowerCase())
            
            if (error) {
                console.log('Error fetching listing', error)
                return
            }
            setListings(data || [])
        } catch (error) {
            console.log('Error', error)
        } finally {
            setLoading(false)
        }
    }

    // Fetch all available listings
    const fetchData = async() => {
        setLoading(true)
        try {
            // on opening category id
            const categoryName = getCategoryName(selectedCategory)

            const { data, error } = await supabase
                .from('furniture')
                .select('*')
                // mathces the current id to its respective category name
                .eq('category', categoryName.toLowerCase())

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
            onPress={() => router.push({
                pathname: '/detailed-listing',
                params: { listing: JSON.stringify(item) }
            })}
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