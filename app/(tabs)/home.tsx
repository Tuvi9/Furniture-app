import { View, Text, SafeAreaView, TouchableOpacity } from 'react-native'
import { useState } from 'react'
import { Feather } from '@expo/vector-icons'
import CategorySelector from '../components/CategorySelector'

function Home () {
    const [selectedCategory, setSelectedCategory] = useState(1)

    const handleCategorySelect = (categoryId: number) => {
        setSelectedCategory(categoryId)
        // Here you would fetch products for the selected category
        console.log(`Selected category: ${categoryId}`)
    }

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
            </View>
        </SafeAreaView>
    )
}

export default Home