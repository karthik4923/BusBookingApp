import React,{ useEffect, useState} from "react";
import {View,Text,StyleSheet,TouchableOpacity,TextInput,Image, Alert,Modal} from 'react-native';
import AntDesign from 'react-native-vector-icons/Feather';
import Line from 'react-native-vector-icons/SimpleLineIcons';
import Icon6 from 'react-native-vector-icons/FontAwesome6';
import Icon from 'react-native-vector-icons/FontAwesome';
import Entypo from 'react-native-vector-icons/Entypo';
import Feather from 'react-native-vector-icons/Feather';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Material from 'react-native-vector-icons/MaterialIcons';
import AsyncStorage from "@react-native-async-storage/async-storage";
import Datecal from "./Calenderpage";
import upi from '../assets/upi.png';
import { BlurView } from "@react-native-community/blur";
const Profile=({navigation})=>{
    const [name,setname]=useState('');
    const [email,setemail]=useState('');
    const [phone,setphone]=useState('');
    const [date,setdate]=useState('');
    const [gender,setgender]=useState(0);
    const [active,setactive]=useState(false);
    const [opencalender,setopencalender]=useState(false);
    useEffect(()=>{
        const load=async()=>{
            const found=await AsyncStorage.getItem('data');
            if(found){
                const d=JSON.parse(found);
                setname(d.name);
                setemail(d.email);
                setphone(d.phone);
                setgender(d.gender);
                setdate(d.date)
            }
        };load();
    },[])
    
    const save = async () => {
    if (!name.trim()) {
        setname('')
        Alert.alert('Validation Error', 'Name cannot be empty');
        return;
    }

   
    if (!/^\d{10}$/.test(phone)) {
        setphone('')
        Alert.alert('Validation Error', 'Phone number must be 10 digits');
        return;
    }

   
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        setemail('')
        Alert.alert('Validation Error', 'Please enter a valid email');
        return;
    }

    
    const a = { name, email, phone, gender,date };
    await AsyncStorage.setItem('data', JSON.stringify(a));
    Alert.alert('Saved Successfully');
};

    return(
        <View>
            <View style={styles.header}>
                <View style={{flexDirection:'row',gap:20,alignItems:'center',}}>
                    <TouchableOpacity
                        onPress={()=>{
                            if(active) save();
                            navigation.goBack()}}>
                        <AntDesign name={'arrow-left'} size={30}/>
                    </TouchableOpacity>
                    
                    <Text style={{fontSize:18}}>My Account</Text>
                </View>
                <TouchableOpacity
                    style={{height:50,width:60,alignItems:'center',justifyContent:'center',}}
                    onPress={()=>{
                        if(active){save()};
                        setactive(!active)}}>
                    <Text style={{fontSize:19}}>
                        {active===true?'Save':'Edit'}
                    </Text>
                </TouchableOpacity>
            </View>
            <View style={styles.middler}>
                <TouchableOpacity
                    style={styles.toucher}>
                    <Icon6 name={'user'} style={styles.icon}/>
                    <View style={styles.insidetouch}>
                        <Text style={styles.text}>Full Name</Text>
                       <TextInput
                            value={name}
                            editable={active}
                            onChangeText={setname}
                            style={styles.inputer}
                            placeholder="Enter name"/> 
                    </View>
                </TouchableOpacity>
                <View style={[styles.toucher,{justifyContent:'space-between'}]}>
                    <TouchableOpacity 
                    onPress={()=>{
                        if(active){
                            setopencalender(true);
                        }
                    }}
                    style={{flexDirection:'row',width:'70%'}}>
                    <Icon name={'calendar'} style={[styles.icon,]}/>
                    <View style={[styles.insidetouch]}>
                        <Text style={[styles.text,{top:0}]}>Date of Birth</Text>
                        <Text style={[styles.inputer, { top: 18, left: 1 }]}>{date || "Select Date"}</Text>
                    </View>
                </TouchableOpacity>
                <View style={{
                    width:'30%',
                    flexDirection:'row',
                    gap:20,
                    alignItems:'center',
                    justifyContent:'center',}}>
                    <TouchableOpacity 
                        onPress={()=>{
                            if(active){
                                setgender(0)
                            }
                        }}
                        style={{alignItems:'center'}}>
                        <Line name={'user'} size={30} style={{color:gender===0?'red':'black'}} />
                        <Text style={{color:gender===0?'red':'black'}}>Male</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={()=>{
                            if(active){
                                setgender(1)
                            }
                        }}
                        style={{alignItems:'center'}}>
                        <Line name={'user-female'} size={30} style={{color:gender===1?'red':'black'}}/>
                        <Text style={{color:gender===1?'red':'black'}}>Female</Text>
                    </TouchableOpacity>
                </View>
                </View>
                
                <TouchableOpacity
                     style={styles.toucher}>
                    <Icon6 name={'mobile-screen-button'} style={styles.icon}/>
                    <View style={styles.insidetouch}>
                        <Text style={styles.text}>Mobile</Text>
                        <TextInput
                            value={phone}
                            keyboardType="number-pad"
                            maxLength={10}
                            editable={active}
                            onChangeText={setphone}
                            placeholder="Enter Number"
                            style={styles.inputer}
                            />
                    </View>
                </TouchableOpacity>
                <TouchableOpacity
                     style={styles.toucher}>
                    <AntDesign name={'mail'} style={styles.icon}/>
                    <View style={styles.insidetouch}>
                        <Text style={styles.text}>Email</Text>
                        <TextInput
                            value={email}
                            onChangeText={setemail}
                            placeholder="Email"
                            editable={active}
                            style={styles.inputer}
                            autoCapitalize="none"
                            keyboardType="email-address"
                        />
                    </View>
                </TouchableOpacity>
            </View>
            <View style={styles.middler}>
                <TouchableOpacity
                    style={[styles.toucher,{justifyContent:'space-between'}]}>
                    <View style={{flexDirection:'row',alignItems:'center',}}>
                        <Icon6 name={'person-walking-luggage'} style={styles.icon}/>
                        <Text style={{fontSize:18}}>Traveller Details</Text>
                    </View>
                    <Entypo name={'chevron-thin-right'} style={{color:'#da4343ff',fontSize:30}}/>

                </TouchableOpacity>
                <TouchableOpacity
                    style={[styles.toucher,{justifyContent:'space-between'}]}>
                    <View style={{flexDirection:'row',alignItems:'center',}}>
                        <Icon name={'credit-card'} style={styles.icon}/>
                        <Text style={{fontSize:18}}>Manage Payment Methods</Text>
                    </View>
                    <Entypo name={'chevron-thin-right'} style={{color:'#da4343ff',fontSize:30}}/>

                </TouchableOpacity>
                <TouchableOpacity
                    style={[styles.toucher,{justifyContent:'space-between'}]}>
                    <View style={{flexDirection:'row',alignItems:'center',}}>
                        <Ionicons name={'location-outline'} style={styles.icon}/>
                        <Text style={{fontSize:18}}>Billing Address</Text>
                    </View>
                    <Feather name={'plus-circle'} style={{color:'#da4343ff',fontSize:30}}/>

                </TouchableOpacity>
                <TouchableOpacity
                    style={[styles.toucher,{justifyContent:'space-between'}]}>
                    <View style={{flexDirection:'row',alignItems:'center',}}>
                        <Image source={upi} style={[styles.icon,{height:50,width:50,}]}/>
                        <Text style={{fontSize:18}}>UPI Payment/Instant Refund</Text>
                    </View>
                    <Entypo name={'chevron-thin-right'} style={{color:'#da4343ff',fontSize:30}}/>

                </TouchableOpacity>
            </View>
            <View style={styles.middler}>
                <TouchableOpacity
                    style={[styles.toucher,{justifyContent:'space-between'}]}>
                    <View style={{flexDirection:'row',alignItems:'center',}}>
                        <Material name={'logout'} style={styles.icon}/>
                        <Text style={{fontSize:18}}>Sign Out</Text>
                    </View>
                    <Entypo name={'chevron-thin-right'} style={{color:'#da4343ff',fontSize:30}}/>

                </TouchableOpacity>

            </View>
           <Modal
    transparent={true}
    visible={opencalender}
    animationType="fade"
    onRequestClose={() => setopencalender(false)}
>
    <View style={styles.modalContainer}>
        
        <TouchableOpacity
            style={styles.blurContainer} 
            onPress={() => setopencalender(false)} 
        >
            <BlurView
                style={styles.blurView}
                blurAmount={1}
            />
        </TouchableOpacity>
        
        <View style={styles.modalContent}>
            <Datecal
                setdate={setdate}
                closeCalender={() => setopencalender(false)}
            />
        </View>
    </View>
    </Modal>

    </View>
        

    );
};
const styles=StyleSheet.create({
    container:{
        height:'100%',
        width:'100%',
        backgroundColor:'#eeeeeeff',
    },
    middler:{
        marginTop:30,
        backgroundColor:'#fff',
        elevation:10,
        shadowColor:'#000000ff',

    },
    header:{
        width:'100%',
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center',
        backgroundColor:'#fff',
        paddingTop:50,
        paddingHorizontal:10,
        elevation:10,
        shadowColor:'#000000ff',
    },
    toucher:{
        paddingHorizontal:10,
        paddingVertical:10,
        flexDirection:'row',
        alignItems:'center',
        borderBottomColor:'#ccc',
        borderBottomWidth:1,
        height:70,
    },
    icon:{
        color:'#da4343ff',
        fontSize:33,
        width:50,
    },
    insidetouch:{
       position:'relative',
       width:'100%',

    },
    text:{
        fontSize:15,
        color:'#797979ff',
        position:'absolute',
        top:-20,
    },
    inputer:{
        position:'absolute',
        top:-10,
        left:-4,
        width:'100%',
        fontSize:18,
        color:'black',
    },
    inputer1:{
        position:'absolute',
        width:'100%',
        fontSize:18,
    },
   modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    blurContainer: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,  
        zIndex: 1, 
    },
    blurView: {
        flex: 1, 
    },
    modalContent: {
        backgroundColor: 'white',
        borderRadius: 10,
        padding: 20,
        width: '95%',
        zIndex: 2, 
    },
});
export default Profile;