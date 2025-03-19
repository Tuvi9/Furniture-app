import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Image } from 'react-native';

const images = {
  popular: require('../../assets/images/categories/star.png'),
  chair: require('../../assets/images/categories/chair.png'),
  table: require('../../assets/images/categories/table.png'),
  armchair: require('../../assets/images/categories/armchair.png'),
  bed: require('../../assets/images/categories/bed.png'),
  lamp: require('../../assets/images/categories/lightbulb.png')
};

const categories = [
  { id: 1, title: 'Popular', icon: images.popular },
  { id: 2, title: 'Chair', icon: images.chair },
  { id: 3, title: 'Table', icon: images.table },
  { id: 4, title: 'Armchair', icon: images.armchair },
  { id: 5, title: 'Bed', icon: images.bed },
  { id: 6, title: 'Lamp', icon: images.lamp }
];

type CategorySelectorProps = {
  selectedCategory: number;
  onSelectCategory: (id: number) => void;
};

const CategorySelector = ({ selectedCategory, onSelectCategory }: CategorySelectorProps) => {
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={{ paddingHorizontal: 10 }}
    >
      {categories.map((category) => {
        const isSelected = category.id === selectedCategory;
        
        return (
          <View key={category.id} className="items-center mx-5">
            {/* Icon Box */}
            <TouchableOpacity
              onPress={() => onSelectCategory(category.id)}
              className={`items-center justify-center p-3 rounded-[20px] ${
                isSelected ? 'bg-darkgray' : 'bg-white'
              }`}
              style={{ 
                width: 60, 
                height: 60,
                shadowColor: '#000',
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.1,
                shadowRadius: 4,
                elevation: 2
              }}
            >
              <Image 
                source={category.icon}
                style={{ 
                  width: 36, 
                  height: 36,
                  tintColor: isSelected ? '#FFFFFF' : '#8D9BB5'
                }}
                resizeMode="contain"
              />
            </TouchableOpacity>
            
            {/* Text below the box */}
            <Text
              className={`text-lg mt-2 ${
                isSelected ? 'text-seablue font-dm-sans-medium' : 'text-lightgray font-dm-sans-medium'
              }`}
            >
              {category.title}
            </Text>
          </View>
        );
      })}
    </ScrollView>
  );
};

export default CategorySelector; 