import React, { useCallback, useEffect, useState } from "react";
import { View ,Text,ScrollView,StyleSheet, TouchableOpacity,Image} from "react-native";
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Icon from 'react-native-vector-icons/FontAwesome';
import cityicon from '../assets/cityicon.png';
//import Lucide from 'react-native-vector-icons/Lucide';
import Icon6 from 'react-native-vector-icons/FontAwesome6';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialDesignIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect } from "@react-navigation/native";
const Account=({navigation})=>{
    const [user,setuser]=useState('');
    useFocusEffect(
    useCallback(()=>{
        const load=async()=>{
            const found= await AsyncStorage.getItem('data');
            if(found){
                const d=JSON.parse(found);
                setuser(d.name);
            }
        };load();
    },[])
    );
    return(
        <View style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity
                   onPress={()=>navigation.navigate('Profile')}
                   style={styles.headtoucher}>
                    <View style={styles.left}>
                        <FontAwesome5 name={'user-tie'} size={50} />
                    </View>
                    <View style={styles.right}>
                        <View>
                            <Text style={styles.text}>{user}</Text>
                            <Text style={{color:'#adadadff',fontSize:15}}>Edit Profile</Text>
                        </View>
                        <Icon name={'angle-right'} style={styles.iconer}/>
                    </View>
                </TouchableOpacity>
            </View>
            
            <ScrollView
                showsVerticalScrollIndicator={false}>
                <View style={styles.touchercontainer}>
                    <TouchableOpacity>
                        <View style={styles.toucher1}>
                            <MaterialDesignIcons name={'home-city-outline'} style={styles.icons}/>
                            <View>
                                <Text style={{fontWeight:'bold',fontSize:18}}>Current City</Text>
                                <Text style={{color:'#38b8dfff'}}>Select your city</Text>
                            </View>
                        </View>
                    </TouchableOpacity>
                </View>
                <View style={styles.touchercontainer}>
                    <TouchableOpacity
                        style={styles.touch}>
                        <View style={styles.toucher1}>
                            <Ionicons name={'ticket-sharp'} style={styles.icons}/>
                            <Text style={styles.text}>Cancel Booking</Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.touch}>
                        <View style={styles.toucher1}>
                            <Icon6 name={'people-group'} style={styles.icons}/>
                            <Text style={styles.text}>Cancel Booking</Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity>
                        <View style={styles.toucher1}>
                            <Ionicons name={'notifications-outline'} style={styles.icons}/>
                            <Text style={styles.text}>Notifications</Text>
                        </View>
                    </TouchableOpacity>
                </View>
                <View style={styles.touchercontainer}>
                    <TouchableOpacity
                        style={styles.touch}>
                        <View style={styles.toucher1}>
                            <Ionicons name={'newspaper-outline'} style={styles.icons}/>
                            <Text style={styles.text}>News & Blogs</Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity
                        >
                        <View style={styles.toucher1}>
                            <Icon6 name={'trophy'} style={styles.icons}/>
                            <Text style={styles.text}>Contests</Text>
                        </View>
                    </TouchableOpacity>
                </View>
                <View style={styles.touchercontainer}>
                    <TouchableOpacity
                        style={styles.touch}>
                        <View style={styles.toucher1}>
                            <Icon6 name={'pen-to-square'} style={styles.icons}/>
                            <Text style={styles.text}>Write Feedback</Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.touch}>
                        <View style={styles.toucher1}>
                            <Icon name={'question-circle-o'} style={styles.icons}/>
                            <Text style={styles.text}>FAQs</Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.touch}>
                        <View style={styles.toucher1}>
                            <Icon6 name={'people-group'} style={styles.icons}/>
                            <Text style={styles.text}>Terms & Conditions</Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.touch}>
                        <View style={styles.toucher1}>
                            <Icon name={'file-text-o'} style={styles.icons}/>
                            <Text style={styles.text}>Privacy Policy</Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.touch}>
                        <View style={styles.toucher1}>
                            <Ionicons name={'information-circle-outline'} style={styles.icons}/>
                            <Text style={styles.text}>About Us</Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity>
                        <View style={styles.toucher1}>
                            <Icon6 name={'phone'} style={styles.icons}/>
                            <Text style={styles.text}>Contact Us</Text>
                        </View>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </View>
    );
};
const styles=StyleSheet.create({
    container:{
        width:'100%',
        height:'100%',
        backgroundColor:'#eeeeeeff',
    },
    header:{
        paddingVertical:12,
        paddingHorizontal:10,
        backgroundColor:'#fff',
        marginBottom:10,
        elevation:10,
        shadowColor:'#000000ff',
        shadowOpacity:0.3,
        shadowOffset:{width:10,height:0},
    },
    headtoucher:{
        flexDirection:'row',
        paddingVertical:10,
        paddingHorizontal:10,
        gap:20,
    },
    left:{
        width:'20%',
        alignItems:'center',
        borderWidth:1,
        borderColor:'#ccc',
        borderRadius:50,
        padding:10,
    },
    right:{
        width:'80%',
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center',
        paddingRight:10,
    },
    iconer:{
        fontSize:50,
        color:'#adadadff',
    },
    touchercontainer:{
        backgroundColor:'#fff',
        marginHorizontal:13,
        marginVertical:10,
        borderRadius:30,
        borderWidth:1,
        borderColor:'#e6e6e6ff',
    },
    touch:{
        borderBottomWidth:2,
        borderBottomColor:'#e6e6e6ff',
        
    },
    toucher1:{
        flexDirection:'row',
        gap:20,
        paddingVertical:10,
        paddingHorizontal:20,
        alignItems:'center',
    },
    icons:{
        color:'#d34848ff',
        fontSize:35,
        height:40,
        width:50,
    },
    text:{
        fontSize:18,
    }
})
export default Account;