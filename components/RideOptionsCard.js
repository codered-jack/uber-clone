import React,{useState} from 'react'
import { Text, View ,TouchableOpacity, Image} from 'react-native'
import { Icon } from 'react-native-elements'
import tw from 'tailwind-react-native-classnames'
import { useNavigation } from "@react-navigation/native"
import { FlatList } from 'react-native-gesture-handler'
import { useSelector } from 'react-redux'
import { selectTravelTimeInformation } from '../slices/navSlice'
import { SafeAreaView } from 'react-native-safe-area-context';

const data = [
    {
        id:'Uber-X-123',
        title:'Uber X',
        multiplier:1,
        image:"https://links.papareact.com/3pn",
    },
    {
        id:'Uber-XL-456',
        title:'Uber XL',
        multiplier:1.2,
        image:"https://links.papareact.com/5w8",
    },
    {
        id:'Uber-LUX-789',
        title:'Uber LUX',
        multiplier:1.75,
        image:"https://links.papareact.com/7pf",
    }
]

const SURCHARGE_CHARGE_RATE = 1.5;
const RideOptionsCard = () => {
    const navigation = useNavigation();
    const [selected,setSelected] = useState(null);
    const travelTimeInformation = useSelector(selectTravelTimeInformation)
    return (
        <SafeAreaView style={tw`bg-white flex-grow`}>
            <View>
                <TouchableOpacity 
                onPress={() => navigation.navigate("NavigateCard")} 
                style={tw`absolute top-3 left-5 p-3 rounded-full`}
                >
                    <Icon name="chevron-left" type="fontawesome"/>
                </TouchableOpacity>
                <Text style={tw`text-center py-5 text-xl`}>Select a Ride - {travelTimeInformation?.distance?.text || '1km'}</Text>
            </View>

            <FlatList
                data={data}
                keyExtractor={item =>item.id}
                renderItem = {({item:{id,title,multiplier,image},item})=>(
                    <TouchableOpacity onPress={()=>setSelected(item)} style={tw`flex-row items-center justify-between px-10 ${id === selected?.id && 'bg-gray-200'}`}>
                        <Image style={{width:100,height:100 ,resizeMode:'contain'}} source={{
                            uri:image
                        }}/>
                        <View style={tw`-ml-6`}>
                            <Text style={tw`text-xl font-semibold`}>{title}</Text>
                            <Text>{travelTimeInformation?.duration?.text|| '10 min'} Travel time</Text>
                        </View>
                        <Text style={tw`text-xl`}>{new Intl.NumberFormat('en-in',{
                            style:'currency',
                            currency:'INR'
                        }).format(
                            (travelTimeInformation?.duration.value || 1000 * SURCHARGE_CHARGE_RATE * multiplier) / 100
                        )}</Text>
                    </TouchableOpacity>
                )}
                style={{flex:1}}
            />
            <View style={tw`mt-auto border-t border-gray-200`}>
                <TouchableOpacity disabled={!selected} style={tw`bg-black py-3 mb-3 mx-4 rounded-md ${!selected && 'bg-gray-300'}`}>
                    <Text style={tw`text-center text-white text-xl`}>Choose {selected?.title}</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    )
}

export default RideOptionsCard

