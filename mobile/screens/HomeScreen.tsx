import React from 'react';
import { View, Text, FlatList, ScrollView } from 'react-native';
import { catalog, productsByCategory, categories } from '../data/products';
import ProductCard from '../components/ProductCard';
import { useCart } from '../context/CartContext';

export default function HomeScreen({ navigation }: any){
  const { add } = useCart();

  return (
    <ScrollView className="bg-background flex-1">
      <View className="p-4">
        <Text className="text-2xl font-extrabold text-white">Ночная доставка</Text>
        <Text className="text-gray-300 mt-1">Алкоголь, снеки, секс-товары и товары для питомцев — круглосуточно</Text>
      </View>

      {Object.keys(productsByCategory).map((k: any) => {
        const key = k as keyof typeof productsByCategory;
        const list = productsByCategory[key];
        return (
          <View key={k} className="mt-4">
            <View className="px-4">
              <Text className="text-lg font-semibold text-white">{categories[key].title}</Text>
              <Text className="text-gray-400 text-sm">{categories[key].description}</Text>
            </View>
            <FlatList
              horizontal
              data={list}
              keyExtractor={(item) => item.id}
              contentContainerStyle={{ paddingHorizontal: 12 }}
              renderItem={({item}) => (
                <ProductCard
                  product={item}
                  onPress={() => navigation.navigate('Product', { id: item.id })}
                  onAdd={() => add(item,1)}
                />
              )}
            />
          </View>
        );
      })}

    </ScrollView>
  );
}
