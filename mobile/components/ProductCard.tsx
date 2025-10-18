import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import type { Product } from '../data/products';

export default function ProductCard({ product, onPress, onAdd }:
  { product: Product; onPress: () => void; onAdd: () => void }){
  return (
    <TouchableOpacity onPress={onPress} className="m-2 w-40">
      <View className="rounded-xl overflow-hidden bg-card shadow-lg">
        <Image source={{ uri: product.images[0] }} style={{ width: '100%', height: 140 }} />
        <View className="p-3">
          <Text className="text-white font-semibold">{product.name}</Text>
          <Text className="text-gray-300 mt-1">{product.price.toLocaleString('ru-RU')} ₽</Text>
          <TouchableOpacity onPress={onAdd} className="mt-3 rounded-md bg-neon py-2">
            <Text className="text-black text-center font-semibold">В корзину</Text>
          </TouchableOpacity>
        </View>
      </View>
    </TouchableOpacity>
  );
}
