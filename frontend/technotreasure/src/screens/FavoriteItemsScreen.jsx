import { Text, TouchableOpacity, View, FlatList, Image } from 'react-native';
import React, {useState, useCallback} from "react";
import { SafeAreaView } from 'react-native-safe-area-context';
import {MaterialIcons} from '@expo/vector-icons';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Favorite = () => {
    const [favoriteItems, setFavoriteItems] = useState([]);
    const navigation = useNavigation();

    useFocusEffect(
        useCallback(() => {
            FavoriteItemsList();
        },[])
    )

    const FavoriteItemsList = async () => {
        try {
            const keys = await AsyncStorage.getAllKeys()
            const itemKeys = keys.filter((key) => key.startsWith("ItemInfo-"))
            const items = await AsyncStorage.multiGet(itemKeys)

            setFavoriteItems(items.map((item) => {
                const itemId = item[0].split("-")[1];
                return {id: itemId, ...JSON.parse(item[1])}
            }))
        } catch (error){
            console.log(error);
        }
    }

    const renderItem = ({item}) => {
        return (
            <>
            <View>
                <Image source={{uri:item.image}}

                className='h-20 w-20 rounded-xl'/>
            </View>
            <View className='flex-1 mx-3'>
                <Text className='font-semibold'>{item.name}</Text>
                <Text className= 'text-gray-500'>${item.price}</Text>
            </View>
            </>
        )
    };

    return(
        <SafeAreaView>
            <View className="flex-row items-center my-1 mx-3 border-b border-gray-300 pb-2">
                <TouchableOpacity onPress= {() => navigation.goBack()}>
                    <MaterialIcons name='arrow-back-ios' size={30} color='black' />
                </TouchableOpacity>
                <Text className='flex-1 text-center tracking-widest text-xl font-medium'> 
                    Favorite Items
                </Text>
            </View>
            <View>
                <FlatList
                data={favoriteItems}
                renderItem={renderItem}
                keyExtractor ={(item) => item.id}
                showsVerticalScrollIndicator={false}
                />
            </View>
        </SafeAreaView>
    )
}

export default Favorite;