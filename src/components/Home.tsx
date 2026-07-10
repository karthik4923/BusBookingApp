import React, { useEffect, useState,useRef, useCallback } from 'react';
import {View,ScrollView,StyleSheet,Text,TouchableOpacity,TouchableWithoutFeedback,Image, Alert} from 'react-native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Icon6 from 'react-native-vector-icons/FontAwesome6';
import Icon from 'react-native-vector-icons/FontAwesome';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Entypo from 'react-native-vector-icons/Entypo';
import { Calendar } from 'react-native-calendars';
import { BlurView } from '@react-native-community/blur';
import AsyncStorage from '@react-native-async-storage/async-storage';
import img0 from '../assets/img0.jpg';
import img1 from '../assets/img1.jpg';
import img2 from '../assets/img2.jpg';
import img3 from '../assets/img3.jpg';
import img4 from '../assets/img4.jpg';
import img5 from '../assets/img5.jpg';
import img6 from '../assets/img6.jpg';
import updown from '../assets/up-down.png'
import { useFocusEffect } from '@react-navigation/native';


const Home=({navigation})=>{
    const [From,setFrom]=useState('From');
    const [To,setTo]=useState('To');
    const [selectedDate,setSelectedDate]=useState('');
    const [Month,setMonth]=useState('');
    const [year,setyear]=useState('');
    const [week,setweek]=useState('');
    const [date,setdate]=useState(0);
    const [show,setshow]=useState(false);
    const [dateslist,setdateslist]=useState([]);
    const offersdata=[img0,img1,img2,img3,img4,img5,img6]
    const scrollRef=React.useRef();

    useEffect(()=>{
        const today=new Date();
        const monthname=today.toLocaleString('default',{month:'short'}).toUpperCase();
        const yearname=today.getFullYear();
        setMonth(monthname);
        setyear(yearname);
        
    },[]);
    
    useFocusEffect(
    useCallback(()=>{
        const load=async()=>{
        const found=await AsyncStorage.getItem('travel');
        if(found){
            const data=JSON.parse(found);
            setFrom(data.from || 'From');
            setTo(data.to || 'To');
        };
    };load();
    },[])
    );
    const scrollToDate=(datestr)=>{
        const idx=dateslist.findIndex(d=>d.full===datestr);
        if(idx!==-1){
            scrollRef.current?.scrollTo({ x: idx * 60, animated: true });
        }
    }
    useEffect(()=>{
        const temp=[];
        let cur=new Date();
        let end=new Date();
        end.setMonth(end.getMonth()+2);
        while(cur<=end){
            temp.push({
                full:cur.toISOString().split("T")[0],
                date:cur.getDate(),
                week:cur.toLocaleString("default",{weekday:"short"}),
            });
            cur.setDate(cur.getDate()+1);
        }
        setdateslist(temp);
        setTimeout(()=>{
            scrollToDate(todayStr);
        },100);
    },[]);
    const today=new Date();
    const twomonths=new Date();
    twomonths.setMonth(today.getMonth()+2);
    const todayStr=today.toISOString().split('T')[0];
    const maxDatestr=twomonths.toISOString().split('T')[0];
    const disablebeforetoday=todayStr;
    const disableafter2months=maxDatestr;
    const markedDates={
        [selectedDate]:{selected:'true',selectedColor:'#ff6767ff'},
    };
    const handleDay=(day)=>{
        const date=new Date(day.dateString);
        //setSelectedDate(datestring);
        const monthname=date.toLocaleString('default',{month:'short'}).toUpperCase();
        const yearname=date.getFullYear();
        setMonth(monthname);
        setyear(yearname);
        setshow(false);
        setSelectedDate(day.dateString);
        scrollToDate(day.dateString);
    };
    const handleRightbox=(datestring)=>{
        const date=new Date(datestring);
        setSelectedDate(datestring);
        const monthname=date.toLocaleString('default',{month:'short'}).toUpperCase();
        const yearname=date.getFullYear();
        setMonth(monthname);
        setyear(yearname);
        setshow(false);
    };
    const changer=async()=>{
        const found=await AsyncStorage.getItem('travel');
        let updatedData={};
        if(found){
            const a=JSON.parse(found);
            updatedData={
                from:a.to||'',
                to:a.from||'',
            }
            await AsyncStorage.setItem('travel', JSON.stringify(updatedData));
            setFrom(updatedData.from);
            setTo(updatedData.to);
        };
    };
    const move = (num) => {
     try {
         //const found = await AsyncStorage.getItem('travel');
         navigation.navigate('Location',{num:num});
     } catch (error) {
         console.error('Error updating AsyncStorage:', error);
     }
   };
   const toselectbus=async()=>{
    const day=parseInt(selectedDate.split('-')[2]);
    const d=day%10;
    console.log(d);
    const a={
        from:From,
        to:To,
        week:week,
        selectedDate:selectedDate,
    }
    await AsyncStorage.setItem('travel1',JSON.stringify(a));
    if(selectedDate!=='' && From!=='From' && To!=="To") navigation.navigate('Buspage',{num:d});
    else Alert.alert('Error! ensure all are selected')
   };
    return(
        <View style={styles.container}>
            <ScrollView
               style={styles.outercontainer}
               showsVerticalScrollIndicator={false}>
                <View style={styles.innercontainer}>
                    <TouchableOpacity
                        style={styles.icons}>
                        <FontAwesome5 name={'bus-alt'} style={styles.iconer}/>
                        <Text style={styles.texter}>Bus</Text>
                        <View style={styles.line}></View>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.icons}>
                        <FontAwesome5 name={'train'} style={styles.iconer}/>
                        <Text style={styles.texter}>Train</Text>
                       
                    </TouchableOpacity>
                    <TouchableOpacity
                         style={styles.icons}>
                        <Ionicons name={'airplane-sharp'} style={styles.iconer}/>
                        <Text style={styles.texter}>Flights</Text>
                        
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.icons}>
                        <Icon6 name={'hotel'} style={styles.iconer}/>
                        <Text style={styles.texter}>Hotels</Text>
                       
                    </TouchableOpacity>
                </View>
                <View style={styles.middler}>
                    <View style={styles.box}>
                        <TouchableOpacity
                            onPress={()=>move(1)}
                            style={[styles.touch,{borderBottomColor:'#ccc',borderBottomWidth:0.7,}]}>
                            <FontAwesome5 name={'road'} style={styles.bicon}/>
                            <Text style={styles.text}>{From}</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={changer}>
                            <View style={styles.circle}>
                                <Image source={updown} style={styles.img}/>
                            </View>
                            
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={()=>move(2)}
                            style={[styles.touch,{borderBottomColor:'#ccc',borderBottomWidth:0.7,}]}>
                            <Ionicons name={'location-sharp'} style={styles.bicon}/>
                            <Text style={styles.text}>{To}</Text>
                        </TouchableOpacity>
                        <View style={{flexDirection:'row',paddingHorizontal:10,paddingVertical:10,justifyContent:'space-between'}}>
                            <Text style={{fontSize:15,}}>Journey Date</Text>
                        <Text style={{fontWeight:'bold',fontSize:17}}>{selectedDate}</Text>

                        </View>
                        
                        <View style={{paddingVertical:10,flexDirection:'row',}}>
                            <View style={styles.left}>
                                <TouchableOpacity
                                onPress={()=>setshow(!show)}>
                                    <Icon name={'calendar'} size={30}/>
                                </TouchableOpacity>
                                
                                <View 
                                style={{borderWidth:1,
                                    borderColor:'#ccc',
                                    paddingVertical:10,
                                    paddingHorizontal:10,
                                    borderRadius:10,

                                }}>
                                    <Text style={{fontWeight:'bold'}}>{Month}</Text>
                                    <Text style={{fontWeight:'bold'}}>{year}</Text>
                                </View>
                            </View>
                            <View style={styles.right}>
                                <ScrollView
                                    ref={scrollRef}
                                    horizontal
                                    showsHorizontalScrollIndicator={false}
                                    style={{gap:100}}
                                    >
                                        {dateslist.map((item,index)=>{
                                            const isselected=item.full===selectedDate;
                                            const istoday=item.full===todayStr;
                                            return (
                                                <TouchableOpacity
                                                key={index}
                                                onPress={() => {handleRightbox(item.full),setweek(item.week),setdate(item.date)}}
                                                    style={[
                                                    styles.datebox,
                                                    isselected && styles.selectedDateBox,
                                                    istoday && selectedDate === "" && styles.todayBox,{marginRight:10}
                                                ]}
                                                >
                                                <Text style={(isselected) && { fontWeight: "bold" ,color:'white'}}>{item.week}</Text>
                                                <Text style={[(isselected) && { fontWeight: "bold" ,color:'white'},{fontSize:18}]}>
                                                {item.date}
                                                </Text>
                                                </TouchableOpacity>
                                            );

                                        })}
                                </ScrollView>
                                
                            </View>
                            
                        </View>
                        
                        <TouchableOpacity
                            onPress={toselectbus}
                            style={styles.button}>
                            <Text style={{color:'white',fontSize:23,fontWeight:'bold',textAlign:'center',}}>Search Bus</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={styles.middle1}>
                    <View style={styles.mcont}>
                        <Ionicons name={'shield-checkmark-sharp'} style={styles.icon}/>
                        <Text style={{fontSize:16,}}>Abhi Assured</Text>
                    </View>
                    <View style={styles.mcont}>
                        <FontAwesome5 name={'user-friends'} style={styles.icon}/>
                        <Text style={{fontSize:16,}}>Refer & Earn</Text>
                    </View>
                    <View style={styles.mcont}>
                        <MaterialIcons name={'next-plan'} style={styles.icon}/>
                        <Text style={{fontSize:16,}}>Plan Trip</Text>
                    </View>
                </View>
                <View style={styles.footer}>
                    <View style={{flexDirection:'row',
                        justifyContent:'space-between',
                        paddingVertical:10,
                        alignItems:'center',

                        }}>
                        <Text style={{fontSize:25,fontWeight:'bold'}}>Offers For You</Text>
                        <View style={{flexDirection:'row',alignItems:'center'}}>
                            <Text style={{fontSize:18,color:'#d35f5fff'}}>View all</Text>
                            <Entypo name={'chevron-thin-right'} size={30} style={{color:'#d35f5fff'}}/>
                        </View>
                        
                    </View>
                   
                    <ScrollView
                        horizontal
                        showsHorizontalScrollIndicator={false}>
                        {offersdata.map((img,i)=>(
                            <Image key={i} resizeMode='cover' source={img} style={styles.image} />
                        
                        ))}
                    </ScrollView>
                </View>
                    
                    
            </ScrollView>
            {show && 
    <View style={styles.calenderContainer}>
        <TouchableWithoutFeedback
            onPress={()=>setshow(false)}>
                <BlurView
                style={styles.absolute}
                blurType="light"
                blurAmount={10}
                reducedTransparencyFallbackColor="white"
            />

        </TouchableWithoutFeedback>
        
        <View style={styles.calender}>
            <Calendar
                minDate={disablebeforetoday}
                maxDate={disableafter2months}
                markedDates={markedDates}
                onDayPress={handleDay}
                theme={{
                    backgroundColor: '#e7e7e7ff',   // Calendar background
                    calendarBackground: '#f1f1f1ff', // Inner calendar background
                    textSectionTitleColor: '#00aeffff', // Month/day title
                    todayTextColor: '#fc0000ff',        // Today's date color
                    dayTextColor: '#2d4150',          // Default day text
                    textDisabledColor: '#c2c2c2ff',     // Disabled dates
                    // Selected day
                    selectedDayBackgroundColor: '#ff6767',
                    selectedDayTextColor: '#ffffff',
                    // Arrows
                    arrowColor: '#ff4141ff',
                    // Month text
                    monthTextColor: '#333333',
                    textDayFontSize: 18,
                    textMonthFontSize: 19,
                    textDayHeaderFontSize: 15,
                }}
            />
        </View>
    </View>
}

        </View>
    );
};
const styles=StyleSheet.create({
    container:{
        height:'100%',
        width:'100%',
        backgroundColor:'#fff',
    },
    outercontainer:{
        height:'100%',
        width:'100%',
    },
    innercontainer:{
        flexDirection:'row',
        justifyContent:'space-between',
        marginTop:20,
        paddingHorizontal:10,
    },
    middler:{
        width:'100%',
        marginBottom:25,

    },
    icons:{
        gap:10,
        width:100,
        height:100,
        alignItems:'center',
    },
    iconer:{
        fontSize:35,
        color:'#da4343ff',
    },
    texter:{
        fontSize:20,
        fontWeight:'bold',

    },
    box:{
        marginHorizontal:20,
        borderWidth:2,
        borderColor:'#ccc',
        borderRadius:20,
        
    },
    touch:{
        flexDirection:'row',
        paddingVertical:12,
        alignItems:'center',
    },
    bicon:{
        fontSize:32,
        color:'#646464ff',
        paddingLeft:10,
    },
    text:{
        fontSize:20,
        fontWeight:'bold',
        paddingHorizontal:20,
    },
    line:{
        width:'100%',
        height:3,
        borderRadius:20,
        backgroundColor:'#da4343ff',
        margin:0,
    },
    button:{
        backgroundColor:'#da4343ff',
        borderBottomEndRadius:20,
        borderBottomLeftRadius:20,
        padding:15,
    },
    left:{
        flexDirection:'row',
        paddingHorizontal:10,
        width:'30%',
        justifyContent:'space-between',
        alignItems:'center',
        borderRightWidth:0.7,
        borderRightColor:'#ccc',
    },
    right:{
        flexDirection:'row',
        justifyContent:'space-between',
        width:'70%',
        paddingHorizontal:10,

    },
    datebox:{
        borderWidth:1,
        borderColor:'#ccc',
        backgroundColor:'#eeeeeeff',
        width:50,
        height:50,
        borderRadius:10,
        textAlign:'center',
        alignItems:'center',
        justifyContent:'center',
    },
    calenderContainer:{
        position:'absolute',
        width:'100%',
        height:'100%',
        justifyContent:'center',
        alignItems:'center',
        zIndex:1000,
    },
    absolute: {
        position: "absolute",
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
    },
    calender:{
        width:'100%',
        height:'45%',
        borderWidth:1,
        borderRadius:20,
        overflow:'hidden',
        backgroundColor:'#f1f1f1ff',
    },
    selectedDateBox: {
        backgroundColor: "#da4343ff",
        borderColor: "#ff0000",
    },
    todayBox: {
        backgroundColor: "#da4343ff",
        borderColor: "#ff0000",
        color:'white',
    },
    middle1:{
        flexDirection:'row',
        justifyContent:'space-between',
        borderWidth:1,
        marginHorizontal:20,
        borderRadius:20,
        paddingVertical:10,
        paddingHorizontal:10,

    },
    mcont:{
        width:100,
        alignItems:'center',

    },
    icon:{
        fontSize:40,
        color:"#e97070ff",
    },
    footer:{
        marginTop:20,
        marginHorizontal:20,
    },
    image:{
        width:250,
        //height:200,
        marginRight:10,
        borderRadius:20,
        borderWidth:1,
        borderColor:'#ccc',
        aspectRatio: 2,
    },
    img:{
       
        height:25,
        width:25,
    },
    circle:{
        borderWidth:1,
        borderColor:'#bbbbbbff',
        position:'absolute',
        padding:5,
        borderRadius:20,
        right:15,
        top:-20,
        zIndex:1000,
        backgroundColor:'#fff'

    }

})
export default Home; 