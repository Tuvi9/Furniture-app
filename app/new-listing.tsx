import { View, Text, SafeAreaView, TouchableOpacity, TextInput, ScrollView, Alert, Image, Modal } from 'react-native'
import { useRouter } from 'expo-router'
import { useState } from "react";
import Feather from '@expo/vector-icons/Feather';
import * as ImagePicker from 'expo-image-picker';
import { supabase } from '@/utils/supabase';

function NewListing() {

    const [title, setTitle] = useState('')
    const [category, setCategory] = useState('')
    const [price, setPrice] = useState('')
    const [description, setDescription] = useState('')
    // Accepting multiple images
    const [images, setImages] = useState<string[]>([]);
    // State for category dropdown
    const [dropdownVisible, setDropdownVisible] = useState(false);
    const backAdress = process.env.EXPO_PUBLIC_IPADDRESS

    const router = useRouter()

    const categories = [
        { label: "Chair", value: "chair" },
        { label: "Table", value: "table" },
        { label: "Sofa", value: "sofa" },
        { label: "Bed", value: "bed" },
        { label: "Lighting", value: "lighting" },
        { label: "Decor", value: "decor" },
        { label: "Storage", value: "storage" }
    ];

    const submitListing = async () => {
        // Are all required fields filled
        if (!title || !category || !price) {
            Alert.alert("Error", "Please fill in all required fields");
            return;
        }

        if (images.length === 0) {
            Alert.alert("Error", "Please upload at least one image");
            return;
        }

        try {

            const imageUri = images[0];
            const fileName = `${Date.now()}-${imageUri.split('/').pop()}`

            const response = await fetch(imageUri);
            const blob = await response.blob();

            // User images get store in supabase
            const { data: imageUpload, error: imageUploadError } = await supabase.storage
                .from('furniture')
                .upload(fileName, blob)

            if (imageUploadError) {
                console.error('Error uploading image:', imageUploadError);
                Alert.alert("Error", "Failed to upload image");
                return;
            }

            // Get the created furnitures imageUrl
            const { data: { publicUrl } } = supabase.storage
                .from('furniture')
                .getPublicUrl(fileName)

            // fetch for HTTP post request
            const backendResponse = await fetch(`${backAdress}/api/products/create-furniture`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    title: title,
                    category: category,
                    price: price,
                    description: description || "",
                    // Insert the imageUrl we got from supabase storage into furnitures
                    imageUrl: publicUrl
                }),
            });

            const data = await backendResponse.json();
            console.log("Response from server:", data);

            if (data.success) {
                Alert.alert("Success", "Furniture listing created successfully!");
                router.push('/');
            } else {
                Alert.alert("Error", data.message || "Failed to create listing");
            }
        } catch (error) {
            console.error('Error:', error);
            Alert.alert("Connection Error", "Could not connect to server");
        }
    };

    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            allowsEditing: true,
        })

        console.log(result);

        // Add image to the end of the array
        if(!result.canceled) {
            setImages([...images, result.assets[0].uri])
        }
    };

    const removeImage = (index: number) => {
        const newImages = [...images];
        newImages.splice(index, 1)
        setImages(newImages)
    }

    // Function to get category label from value
    const getCategoryLabel = () => {
        const selectedCategory = categories.find(c => c.value === category);
        return selectedCategory ? selectedCategory.label : "Select a category";
    }

    return (
        <SafeAreaView className='flex-1 bg-white'>
            <ScrollView
                contentContainerStyle={{ paddingBottom: 90 }}
            >
                <View className='flex w-full flex-row justify-center mt-5'>
                    <TouchableOpacity className='flex left-10' onPress={() => router.push('/')}>
                        <Feather name='arrow-left' color={'#4F63AC'} size={24}/>
                    </TouchableOpacity>
                    <View className='flex w-full right-5 justify-center items-center'>
                        <Text className='text-xl font-dm-sans-extrabold'>Create a new listing</Text>
                    </View>
                </View>
                <View className='flex flex-col left-10 mt-10 gap-y-5'>
                    <Text className='text-seablue text-xl'>Upload photos</Text>
                        <View className='flex flex-row flex-wrap mr-10 gap-x-4 gap-y-4'>
                            <TouchableOpacity 
                                className='flex w-[100px] h-[100px] border-[1px] border-dotted border-lightgray rounded-xl justify-center items-center'
                                onPress={pickImage}
                            >
                                <View className='opacity-20'>
                                    <Feather name='plus-circle' color={'#8D9BB5'} size={36}/>
                                </View>
                            </TouchableOpacity>
                            {images.map((uri, index) => (
                                // Gives each image an index
                                <View key={index} className='relative'>
                                    <Image
                                        // uri: uri
                                        source={{uri}}
                                        className='w-[100px] h-[100px] rounded-xl'
                                    />
                                    <TouchableOpacity
                                        className='absolute top-[-8px] right-[-8px] bg-seablue w-6 h-6 rounded-full flex items-center justify-center'
                                        onPress={() => removeImage(index)}
                                    >
                                        <Feather name='x' color='white' size={14} />
                                    </TouchableOpacity>
                                </View>
                            ))}
                        </View>
                    </View>
                {/* Form */}
                <View className='flex w-full items-center mt-10 gap-y-10'>
                    {/* Title */}
                    <View className="w-[300px]">
                        <Text className="text-2xl font-dm-sans-medium text-seablue mb-1 ml-1">Title</Text>
                        <TextInput
                        className='w-full text-2xl font-dm-sans-bold border-2 border-lightgray p-5 rounded-2xl'
                        placeholder='Listing title'
                        placeholderTextColor="#AAAAAA"
                        value={title}
                        onChangeText={setTitle}
                        />
                    </View>
                    {/* Category dropdown */}
                    <View className="w-[300px]">
                        <Text className="text-2xl font-dm-sans-medium text-seablue mb-1 ml-1">Category</Text>
                        <TouchableOpacity
                            className='w-full border-2 border-lightgray p-5 rounded-2xl flex-row justify-between items-center'
                            onPress={() => setDropdownVisible(true)}
                        >
                            <Text
                                className={`text-2xl ${category ? 'font-dm-sans-bold text-black' : 'text-gray-400'}`}
                            >
                                {getCategoryLabel()}
                            </Text>
                            <Feather name="chevron-down" size={24} color="#8D9BB5" />
                        </TouchableOpacity>

                        {/* Dropdown Modal */}
                        <Modal
                            visible={dropdownVisible}
                            transparent={true}
                            animationType="slide"
                            onRequestClose={() => setDropdownVisible(false)}
                        >
                            <TouchableOpacity 
                                style={{ flex: 1 }}
                                activeOpacity={1}
                                onPress={() => setDropdownVisible(false)}
                            >
                                <View className="bg-white rounded-t-3xl absolute bottom-0 w-full p-5 border-2 border-seablue">
                                    <View className="w-16 h-1 bg-gray-300 rounded-full self-center mb-5" />
                                    <Text className="text-xl font-dm-sans-bold text-center mb-4">Select a category</Text>

                                    {categories.map((item, index) => (
                                        <TouchableOpacity 
                                            key={index}
                                            className={`p-4 border-b border-gray-100 ${category === item.value ? 'bg-gray-50' : ''}`}
                                            onPress={() => {
                                                setCategory(item.value);
                                                setDropdownVisible(false);
                                            }}
                                        >
                                            <Text 
                                                className={`text-lg ${category === item.value ? 'font-dm-sans-bold text-seablue' : 'font-dm-sans'}`}
                                            >
                                                {item.label}
                                            </Text>
                                        </TouchableOpacity>
                                    ))}

                                    <TouchableOpacity 
                                        className="h-[74px] bg-seablue py-4 rounded-xl justify-center mt-4 mb-4"
                                        onPress={() => setDropdownVisible(false)}
                                    >
                                        <Text className="text-white text-center font-dm-sans-bold">Close</Text>
                                    </TouchableOpacity>
                                </View>
                            </TouchableOpacity>
                        </Modal>
                    </View>
                    {/* Price*/}
                    <View className="w-[300px]">
                        <Text className="text-2xl font-dm-sans-medium text-seablue mb-1 ml-1">Price</Text>
                        <View className='flex flex-row border-2 border-lightgray p-5 rounded-2xl'>
                            <TextInput 
                                className='w-full text-2xl font-dm-sans-bold'
                                placeholder='Enter price in USD'
                                placeholderTextColor="#AAAAAA"
                                value={price}
                                onChangeText={setPrice}
                            />
                        </View>
                    </View>
                    <View className="w-[300px]">
                        <Text className="text-2xl font-dm-sans-medium text-seablue mb-1 ml-1">Description</Text>
                        <View className='flex flex-row border-2 border-lightgray p-5 rounded-2xl'>
                            <TextInput 
                                className='w-full h-[100px] text-2xl font-dm-sans-bold'
                                placeholder='Tell us more...'
                                placeholderTextColor="#AAAAAA"
                                textAlignVertical='top'
                                multiline={true}
                                numberOfLines={4}
                                value={description}
                                onChangeText={setDescription}
                            />
                        </View>
                    </View>
                </View>
                <View className='flex w-full justify-center items-center mt-10'>
                    <TouchableOpacity 
                    className='w-[300px] h-[74px] rounded-xl bg-seablue flex items-center justify-center'
                    onPress={submitListing}
                    >
                    <Text className='text-white font-dm-sans-bold text-xl'>Submit</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}

export default NewListing