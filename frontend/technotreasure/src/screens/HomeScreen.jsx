import {StyleSheet, View, Text, TextInput, TouchableOpacity, RefreshControl, FlatList, Image} from "react-native";
import React, {useEffect, useState} from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Feather,  SimpleLineIcons,  MaterialIcons, Entypo  } from '@expo/vector-icons';
import {useFonts, Inter_400Regular} from "@expo-google-fonts/inter"
import ProductsList from "../../ProductsList.json";
import { useNavigation } from "@react-navigation/native";

const HomeScreen = () => {

    const navigation = useNavigation();

    const [searchQuery, setSearchQuery] = useState("");
    const [selected, setSelected] = useState(null);
    const [products,setProducts] = useState([]);
    const [refreshing, setRefreshing] = useState(false);
    const [networkError, setNetworkError] = useState(false); 

      useEffect (() => {
        setSelected("smartphone");
        setProducts(ProductsList);
    }, []);

    let [fontsLoaded, fontError] = useFonts({

        Inter_400Regular,
      });
    
      if (!fontsLoaded && !fontError) {
        return null;
      }

    const renderItem = ({item}) => {
        return(
            <View className="flex-row justify-between mb-5 ml-2 mr-2">
                {item[0] && (
                    <View className ='bg-white shadow-md shadow-red rounded-lg w-[180px]'>
                         <TouchableOpacity onPress={() => navigation.navigate("ProductDetails", {
                            id: item[0].id,
                            name: item[0].name,
                            image: item[0].image,
                            price: item[0].price,
                            description: item[0].description,
                            })}>
                            <Image 
                            source = {{uri:item[0].image}}
                            // className="h-64 w-full rounded-t-2xl"
                            style={{ height: 200, width: '100%', borderTopLeftRadius: 8, borderTopRightRadius: 8 }}
                            resizeMode="cover" 
                            />
                            <View className="items-center my-2">
                                <Text className='text-base'>{item[0].name}</Text>
                                <Text className='text-base text-indigo-500 font-semibold'>${item[0].price}</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                )}
                 {item[1] && (
                    <View className ='bg-white shadow-md shadow-red rounded-lg w-[180px]'>
                        <TouchableOpacity onPress={() => navigation.navigate("ProductDetails", {
                            id: item[1].id,
                            name: item[1].name,
                            image: item[1].image,
                            price: item[1].price,
                            description: item[1].description,
                            })}>
                            <Image 
                            source = {{uri:item[1].image}}
                            // className="h-64 w-full rounded-t-2xl"
                            style={{ height: 200, width: '100%', borderTopLeftRadius: 8, borderTopRightRadius: 8 }}
                            resizeMode="cover" 
                            />
                            <View className="items-center my-2">
                                <Text className='text-base'>{item[1].name}</Text>
                                <Text className='text-base text-indigo-500 font-semibold'>${item[1].price}</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                )}
            </View>
        )

    }
    const handleRefresh = () => {

    }
    
    return(
        <SafeAreaView className="mx-2 flex-1">
            <View>
                <Text
                style={{fontFamily: "Inter_400Regular", fontSize :30, color:"#007AFF",}}
                >TechnoTreasure.</Text>
                <View className="flex-row space-x-5 mx-3 my-3" >
                    <View className="px-3 flex-row border border-x-gray-400 rounded-full flex-1 space-x-5 items-center">
                        <Feather name="search" size={24} color="gray" />
                        <TextInput
                            placeholder="Search"
                            className="py-2 flex-1"
                            autoFocus={false}
                            value = {searchQuery}
                            onChangeText={(text) => setSearchQuery(text)}
                        />
                        <TouchableOpacity>
                            <Feather name="send" size={24} color="#6366f1" />
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
            <View className="flex-row mt-2 justify-evenly my-2 mb-6">
                <TouchableOpacity
                className={`rounded-full h-16 w-16 items-center justify-center ${
                    selected === 'smartphone' ? 'bg-indigo-500' : 'bg-white'
                }`}
                onPress={() => setSelected("smartphone")}
                >
                    <SimpleLineIcons name="screen-smartphone" size={35} color={selected === 'smartphone' ? 'white':'black'}/>
                </TouchableOpacity>
                <TouchableOpacity
                 className={`rounded-full h-16 w-16 items-center justify-center ${
                    selected === 'computer' ? 'bg-indigo-500' : 'bg-white'
                }`}
                onPress={() => setSelected("computer")}
                >
                    <MaterialIcons name="computer" size={35} color={selected === 'computer' ? 'white':'black'}/>
                </TouchableOpacity>
                <TouchableOpacity
                 className={`rounded-full h-16 w-16 items-center justify-center ${
                    selected === 'game-controller' ? 'bg-indigo-500' : 'bg-white'
                }`}
                onPress={() => setSelected("game-controller")}
                >
                    <Entypo name="game-controller" size={35} color={selected === 'game-controller' ? 'white':'black'}/>
                </TouchableOpacity>
                <TouchableOpacity
                 className={`rounded-full h-16 w-16 items-center justify-center ${
                    selected === 'tv' ? 'bg-indigo-500' : 'bg-white'
                }`}
                onPress={() => setSelected("tv")}
                >
                    <Entypo name="tv" size={35} color={selected === 'tv' ? 'white':'black'}/>
                </TouchableOpacity>
            </View>
            <FlatList
            data = {products.filter(
                (item)=> 
                item.category.toLowerCase() === selected && 
                (item.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                item.category.toLowerCase().includes(searchQuery.toLowerCase())))
                .reduce((result, item, index, array)=> {
                    if(index % 2 === 0) {
                        result.push(array.slice(index, index+2))
                    }
                    return result
                },[])
                }
            keyExtractor={(index) => index}
            renderItem={renderItem}
            refreshControl={
                <RefreshControl refreshing={refreshing} onRefresh={handleRefresh}/>
            }
            ListEmptyComponent={
                <View>
                    <Text
                    style={{fontFamily: "Inter_400Regular", fontSize :25, color:"gray", textAlign: "center", padding:"5px"}}
                    > No products found.</Text>
                </View>
            }
            />
        </SafeAreaView>
    )

      // const styles = StyleSheet.create({
  //   container: {
  //     flex: 1,
  //     backgroundColor: '#fff',
  //     alignItems: 'center',
  //     justifyContent: 'center',
  //   },
  //   redText: {
  //     color: 'red',
  //   },
  // });
}

export default HomeScreen;