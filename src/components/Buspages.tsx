import React, { useEffect, useState } from 'react';
import {View,Text,StyleSheet,Image, TouchableOpacity} from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import {busdata} from './data';
import Entypo from 'react-native-vector-icons/Entypo';
import Feather from 'react-native-vector-icons/Feather';
import Icon5 from 'react-native-vector-icons/FontAwesome5';
import Icon from 'react-native-vector-icons/FontAwesome';
import Material from 'react-native-vector-icons/MaterialCommunityIcons';
import abhi from '../assets/abhi.png';
import dollar from '../assets/dollar.mp4';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Video from 'react-native-video';
const Buspage=({route,navigation})=>{
    const {num}=route.params || {};
    const [from,setfrom]=useState('');
    const [to,setto]=useState('');
    const [year,setyear]=useState('');
    const [week,setweek]=useState('');
    const [day,setday]=useState('');
    const [month,setmonth]=useState('');
    const [date,setdate]=useState('');
   
    const buses=busdata[num][num];
    useEffect(()=>{
        const load=async()=>{
            const found=await AsyncStorage.getItem('travel1');
            if(found){
                const a=JSON.parse(found);
                setfrom(a.from);
                setto(a.to);
                setdate(a.selectedDate);
                setweek(a.week);
            }
        };load();
    },[]);
    useEffect(()=>{
        const arr=date.split('-');
        setyear([arr[0]]);
        setday([arr[2]]);
        const da=new Date(date);
        const mo=da.toLocaleString('en-US', {month: 'short'});
        setmonth(mo);
        console.log(arr);
    },[date]);
    const colchanger=(data:number)=>{
        if(data>15) return '#27b93aff';
        else return '#ff711eff';
    }
    const duration=(start,end)=>{
        const parsetime=(time)=>{
            const [hours,min]=time.split(':').map(Number);
            return hours*60+min;
        }
        const starttime=parsetime(start);
        let endtime=parsetime(end);
        if(endtime<starttime){
            endtime+=24*60;
        }
        const duration=endtime-starttime;
        const hr=Math.floor(duration/60);
        const min=duration%60;
        
       return `${hr}:${min.toString().padStart(2, '0')}`;

    };
    const booking=async(data)=>{
        const a={
            ...data,
            from:from,
            to:to,
            week:week,
            day:day,
            month:month,
            year:year,
        }
        await AsyncStorage.setItem('busbook',JSON.stringify(a));
        navigation.navigate('Selectionpage');
        //navigation.navigate('Payment');
    }
    return(
        <View style={styles.container}>
            <View style={styles.mainhead}>
                <TouchableOpacity
                    onPress={()=>navigation.goBack()}>
                    <Feather name={'arrow-left'} size={30}/>
                </TouchableOpacity>
                <View style={styles.navtop}>
                    <View style={{flexDirection:'column',}}>
                         <View style={{flexDirection:'row',gap:6,}}>
                            <Text>{from}</Text>
                            <Icon name={'long-arrow-right'} size={20}/>
                            <Text>{to}</Text>
                        </View>
                        <View style={{flexDirection:'row',gap:5,}}>
                            <Text style={styles.shower}>{week}</Text>
                            <Text style={styles.shower}>{day}</Text>
                            <Text style={styles.shower}>{month}</Text>
                            <Text style={styles.shower}>{year}</Text>
                            
                        </View>
                    </View>
                   
                    <Icon5 name={'pencil-alt'} size={20}/>
                    
                </View>
                
                <Video source={dollar} repeat={true}
                controls={false} style={{height:50,width:50,}} />
                
            </View>
            <ScrollView
                showsVerticalScrollIndicator={false}>
                {buses?.map((data,index)=>(
                    <TouchableOpacity
                    onPress={()=>booking(data)}
                     key={index} style={styles.buscontainer}>
                        <Image source={abhi} style={{height:50,width:150,}}/>
                        <View style={styles.header}>
                            <View>
                                <View style={{flexDirection:'row',gap:10,}}>
                                    <Text style={{fontSize:17.5,fontWeight:'bold'}}>{data.name}</Text>
                                    <Feather name={'map-pin'} size={20}/>
                                </View>
                                <Text style={{color:'#6e6e6eff',}}>{data.type}</Text>
                            </View>
                            <View style={styles.rater}>
                                <Entypo name={'star'}  style={{color:'#fff',fontSize:16,fontWeight:'bold'}} />
                                <Text style={{color:'#fff',fontSize:16,fontWeight:'bold',}}>{data.rating}</Text>
                            </View>
                            
                        </View>
                        <View style={styles.middle}>
                            <View style={styles.left}>
                            <View style={styles.mid1}>
                                <Text style={{fontSize:16,fontWeight:'bold'}}>Start: </Text>
                                <Text>{data.starttime}</Text>

                            </View>
                            <View style={styles.mid1}>
                                <Text  style={{fontSize:16,fontWeight:'bold'}}>End: </Text>
                                <Text>{data.endtime}</Text>
                            </View>
                            <View style={styles.mid1}>
                                <Material name={'timer-outline'} size={20}/>
                                <Text style={{fontWeight:'bold',fontSize:16}}>{duration(data.starttime,data.endtime)} hr</Text>
                            </View>
                            </View>
                            <View style={styles.right}>
                                <Text style={{fontWeight:'bold',fontSize:18,}}>{'\u20B9'}{data.price}</Text>
                            </View>

                        </View>
                        <View style={styles.bottom}>
                            <Material name={'seat-recline-extra'} 
                            style={{color:colchanger(data.available),fontSize:20,fontWeight:'bold',}}/>
                            <Text style={{color:colchanger(data.available),}}>{data.available}</Text>
                            <Text style={{color:colchanger(data.available),}}>Seats</Text>
                        </View>
                        <View style={styles.desc}>
                            <Icon5 name={'bus'} style={{fontSize:20,color:'#457ffcff'}}/>
                            <Text style={{color:'#457ffcff'}}>Brand new Bus</Text>
                        </View>
                    </TouchableOpacity>
                ))}

            </ScrollView>
        </View>

    );
};
const styles=StyleSheet.create({
    container:{
        width:'100%',
        height:'100%',
    },
    buscontainer:{
        borderColor:'#ccc',
        borderWidth:1,
        backgroundColor:'#fff',
        marginHorizontal:10,
        marginVertical:5,
        borderRadius:20,
        paddingHorizontal:12,
        paddingVertical:12,
        elevation:10,
        shadowColor:'#2e2e2eff',
    },
    mainhead:{
        backgroundColor:'#fff',
        elevation:10,
        shadowColor:'#3d3d3dff',
        marginBottom:5,
        flexDirection:'row',
        gap:10,
        paddingTop:40,
        paddingHorizontal:10,
        paddingBottom:20,
        alignItems:'center',
        justifyContent:'space-between',
    },
    navtop:{
        backgroundColor:'#f3f3f3ff',
        borderRadius:20,
        flexDirection:'row',
        padding:5,
        gap:30,
        width:'75%',
        justifyContent:'space-between',
        paddingHorizontal:20,
        alignItems:'center',
        borderWidth:0.2,
        borderColor:'#ccc',
    },
    header:{
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center',
        
    },
    rater:{
        flexDirection:'row',
        backgroundColor:'#27b93aff',
        width:50,
        paddingVertical:5,
        paddingHorizontal:5,
        height:30,
        borderRadius:10,
        alignItems:'center',
    },
    bottom:{
        borderBottomColor:'#ccc',
        borderBottomWidth:1,
        paddingVertical:10,
        flexDirection:'row',
        gap:5,
    },
    desc:{
        borderRadius:20,
        backgroundColor:'#f0f5ffff',
        flexDirection:'row',
        gap:5,
        marginTop:10,
        padding:7,
        width:140,
        alignItems:'center',
        borderWidth:1,
        borderColor:'#e6e6e6ff',
    },
    middle:{
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'space-between',
    },
    mid1:{
        flexDirection:'row',
        marginRight:10,
        alignItems:'center',
    },
    left:{
        flexDirection:'row',
        gap:10,
    },
    shower:{
        fontWeight:'bold',
        color:'#b1b1b1ff',
    }
});
export default Buspage