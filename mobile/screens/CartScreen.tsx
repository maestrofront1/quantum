import React from 'react';
import { View, Text, FlatList, Image, TouchableOpacity } from 'react-native';
import { useCart } from '../context/CartContext';

export default function CartScreen(){
  const { items, increase, decrease, remove, total, clear } = useCart() as any;

  return (
    <View className="bg-background flex-1 p-4">
      <Text className="text-2xl text-white font-semibold">Корзина</Text>
      {items.length === 0 ? (
        <Text className="text-gray-300 mt-4">В корзине пока пусто</Text>
      ) : (
        <FlatList
          data={items}
          keyExtractor={i => i.id}
          renderItem={({item}) => (
            <View className="flex-row items-center gap-3 rounded-md bg-card p-3 my-2">
              <Image source={{ uri: item.product.images[0] }} style={{ width: 64, height: 64 }} />
              <View className="flex-1">
                <Text className="text-white font-medium">{item.product.name}</Text>
                <Text className="text-gray-300">{item.product.price.toLocaleString('ru-RU')} ₽</Text>
                <View className="flex-row gap-2 mt-2">
                  <TouchableOpacity onPress={() => decrease(item.id)} className="rounded-md bg-gray-700 px-3 py-1"><Text className="text-white">−</Text></TouchableOpacity>
                  <Text className="text-white">{item.quantity}</Text>
                  <TouchableOpacity onPress={() => increase(item.id)} className="rounded-md bg-gray-700 px-3 py-1"><Text className="text-white">+</Text></TouchableOpacity>
                </View>
              </View>
              <TouchableOpacity onPress={() => remove(item.id)} className="px-2 py-1"><Text className="text-gray-300">Удалить</Text></TouchableOpacity>
            </View>
          )}
        />
      )}

      <View className="mt-4 border-t pt-4">
        <View className="flex-row justify-between"><Text className="text-gray-300">Итого</Text><Text className="text-white font-semibold">{total.toLocaleString('ru-RU')} ₽</Text></View>
        <TouchableOpacity onPress={() => {}} className="mt-3 rounded-md bg-neon py-3"><Text className="text-black text-center font-semibold">Оформить заказ</Text></TouchableOpacity>
        <TouchableOpacity onPress={clear} className="mt-2 rounded-md border border-gray-600 py-3"><Text className="text-gray-300 text-center">Очистить</Text></TouchableOpacity>
      </View>
    </View>
  );
}
