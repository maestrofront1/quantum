import React, { useState } from 'react';
import { View, Text, Image, ScrollView, FlatList, TouchableOpacity } from 'react-native';
import { catalog } from '../data/products';
import { useCart } from '../context/CartContext';

export default function ProductScreen({ route }: any){
  const { id } = route.params;
  const product = catalog.find(p => p.id === id);
  const { add } = useCart();
  const [index, setIndex] = useState(0);
  if (!product) return null;

  return (
    <ScrollView className="bg-background flex-1">
      <View className="p-4">
        <FlatList
          horizontal
          pagingEnabled
          data={product.images}
          keyExtractor={(i, idx) => String(idx)}
          renderItem={({item}) => (
            <Image source={{ uri: item }} style={{ width: 360, height: 360 }} />
          )}
        />
        <Text className="text-2xl font-semibold text-white mt-4">{product.name}</Text>
        <Text className="text-gray-300 mt-2">{product.description}</Text>
        <Text className="text-white text-xl font-bold mt-4">{product.price.toLocaleString('ru-RU')} ₽</Text>
        <TouchableOpacity onPress={() => add(product,1)} className="mt-4 rounded-md bg-neon py-3">
          <Text className="text-black text-center font-semibold">Добавить в корзину</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}
