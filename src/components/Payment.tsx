import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useEffect, useState } from 'react';
import {View,Text,Image,StyleSheet,Alert,TextInput,TouchableOpacity} from 'react-native';
import Entypo from 'react-native-vector-icons/Entypo';
import Feather from 'react-native-vector-icons/Feather';
import Icon6 from 'react-native-vector-icons/FontAwesome6';
import Icon5 from 'react-native-vector-icons/Fontisto';
import Line from 'react-native-vector-icons/SimpleLineIcons';
import Material from 'react-native-vector-icons/MaterialCommunityIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import abhi from '../assets/abhi.png'
import { BlurView } from '@react-native-community/blur';
import { ScrollView } from 'react-native-gesture-handler';
const Payment=({navigation})=>{
    const [data,setdata]=useState({});
    const [show,setshow]=useState(false);
    const [name,setname]=useState('');
    const [age,setage]=useState('');
    const [Aadhaarnumber,setAadhaarnumber]=useState('');
    const [f1,setf1]=useState(false);
    const [f2,setf2]=useState(false);
    const [f3,setf3]=useState(false);
    const [arrdata,setarrdata]=useState([]);
    const [gender,setgender]=useState(0);
    useEffect(()=>{
        console.log("upadeted:",arrdata);
    },[arrdata]);
    useEffect(()=>{
        const load=async()=>{
            const found=await AsyncStorage.getItem('busbook');
            if(found){
                setdata(JSON.parse(found));
            }
        };load();
    },[]);
    const colchanger=(data:number)=>{
        if(data>15) return '#27b93aff';
        else return '#ff711eff';
    };
     const duration=(start,end)=>{
          if (!start || !end) return "0:00"; 
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
    const move=()=>{
        Alert.alert('Booked Successfully!')
        navigation.navigate('Dashboard');
    }
    const remove=(id)=>{
        const arrdata1=[...arrdata];
        arrdata1.splice(id,1);
        setarrdata([...arrdata1]);
    }
    const savedata=()=>{
        const nameverify=(d)=>{
            if(!d.trim() || !/^[A-za-z ]+$/.test(d)){
                Alert.alert('name error!')
                return false;
            }else return true;
        }
        const aadharverify=(d)=>{
            if(!/^\d{12}$/.test(d)){
                Alert.alert('Aadhaar error!')
                return false;
            }else return true;
        }
        const ageverify=(d)=>{
            if(!/^\d{2}$/.test(d)){
                Alert.alert('Age error!')
                return false;
            }else return true;
        }
        const gendv=(num)=>{
            if(num===0) return 'Male';
            else return 'Female'
        }
        if(nameverify(name) && ageverify(age) && aadharverify(Aadhaarnumber)){
            const a={
                name:name,
                aadhar:Aadhaarnumber,
                age:age,
                gender:gendv(gender)
            }   
            console.log(a);
            setAadhaarnumber('');
            setage('');
            setname('');
            setgender(0);
            setarrdata([...arrdata,a]);
        }
        
    }
    return(
        <View style={styles.container}>
            <View style={{
                paddingHorizontal:10,
                backgroundColor:'#ffffffff',
                height:100,
                
                elevation:10,
                shadowColor:'#2e2e2eff',}}>
                <Text style={{
                    position:'absolute',
                    bottom:10,left:10,
                    paddingTop:50,
                    fontWeight:'bold',
                    fontSize:20,
                    }}>Booking</Text>
            </View>
        
            <View style={styles.buscontainer}>
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
                    <Text style={{color:colchanger(data.available),}}>{data.available-arrdata.length}</Text>
                    <Text style={{color:colchanger(data.available),}}>Seats</Text>
                </View>
                <View style={styles.desc}>
                    <View style={{
                        flexDirection:'row',
                        justifyContent:'space-between',
                        width:'100%',
                        alignItems:'center',
                
                    }}>
                        <Text style={{fontWeight:'bold',fontSize:16,}}>Enter Passenger Details: </Text>
                        <TouchableOpacity
                            onPress={()=>setshow(true)}
                            style={{backgroundColor:'#27b93aff',
                            borderRadius:10,
                            alignItems:'center',
                            padding:7,
                            gap:5,
                            justifyContent:'center',
                            flexDirection:'row'}}>
                                <Icon6 name={'user-plus'} size={18} style={{color:'#caffdbff'}}/>
                            <Text style={{color:'#fff',
                                          fontWeight:'bold',
                                          fontSize:18,}}>Add</Text>
                        </TouchableOpacity>

                    </View>
                    {
                        arrdata.length>0 &&
                        (<ScrollView
                            showsVerticalScrollIndicator={true}
                            style={{maxHeight:300,marginTop: 10,width: "100%",}}>
                            {arrdata.map((arr,index)=>(
                                
                                <View key={index} style={styles.passenger}>
                                    <View style={{width:'85%'}}>
                                       <View style={{flexDirection:'row',gap:10,alignItems:'center'}}>
                                            <Text style={{fontWeight:'bold',fontSize:16,}}>Name:</Text>
                                            <Text>{arr.name}</Text>
                                        </View>
                                        <View style={{flexDirection:'row',gap:10,alignItems:'center'}}>
                                            <Text style={{color:'#4d4d4dff',fontWeight:'bold',fontSize:16,}}>Aadhaar Number:</Text>
                                            <Text style={{color:'#747474ff'}}>{arr.aadhar}</Text>
                                        </View>
                                        <View style={{flexDirection:'row',gap:20,alignItems:'center'}}>
                                            
                                            <View style={{flexDirection:'row',gap:10,alignItems:'center'}}>
                                                <Text style={{fontWeight:'bold',fontSize:16,}}>Age:</Text>
                                                <Text>{arr.age}</Text>
                                            </View>
                                            <View style={{flexDirection:'row',gap:10,alignItems:'center'}}>
                                                <Text style={{fontWeight:'bold',fontSize:16,}}>Gender:</Text>
                                                <Text>{arr.gender}</Text>
                                            </View>
                                        </View>
                                   
                                        
                                        
                                    </View>
                                    <TouchableOpacity style={{width:'15%'}}
                                        onPress={()=>remove(index)}>
                                        <Ionicons name={'remove-circle'} size={36} style={{color:'#ca2323ff'}}/>
                                    </TouchableOpacity>
                                    
                                </View>
                            ))}
                        </ScrollView>
                        )
                    }
                                      
                </View>
                <View style={{paddingVertical:10,}}>
                    <View style={{flexDirection:'row'}}>
                        <Text style={{fontSize:17,fontWeight:'bold'}}>Total Passengers: </Text>
                        <Text style={{fontSize:18,}}>{arrdata.length}</Text>
            
                    </View>
                    <View style={{flexDirection:'row'}}> 
                        <Text style={{fontSize:17,fontWeight:'bold'}}>Price: </Text>
                        <Text style={{fontSize:18,}}>{'\u20B9'}{arrdata.length*data.price}</Text>
                    </View>
                   
                </View>
            </View>
            {show &&
            <View style={styles.details}>
                <TouchableOpacity
                    style={styles.blurContainer}
                    onPress={()=>setshow(false)}
                    ><BlurView
                        style={styles.blurView}
                        blurType='light'
                        blurAmount={10}
                    />
                </TouchableOpacity>
                
                <View style={styles.passcont}>
                    <Text style={{fontWeight:'bold',fontSize:16,}}>Passenger name:</Text>
                    <TextInput 
                    value={name}
                    onChangeText={setname}
                    placeholder='Enter Name'
                    style={[styles.input,f1 && {borderColor:'#470505ff'}]}
                    onFocus={()=>setf1(true)}
                    onBlur={()=>setf1(false)}
                    />
                    <Text style={{fontWeight:'bold',fontSize:16,}}>Aadhaar Number:</Text>
                    <TextInput 
                    value={Aadhaarnumber.toString()}
                    onChangeText={(v)=>setAadhaarnumber(v)}
                    placeholder='Aadhaar Number'
                    keyboardType="numeric"
                    style={[styles.input,f2 && {borderColor:'#470505ff'}]}
                    onFocus={()=>setf2(true)}
                    onBlur={()=>setf2(false)}
                    maxLength={12}
                    />
                    <Text style={{fontWeight:'bold',fontSize:16,}}>Age:</Text>
                    <TextInput 
                    value={age.toString()}
                    onChangeText={(v)=>setage(v)}
                    placeholder='Age'
                    keyboardType="numeric"
                    style={[styles.input,f3 && {borderColor:'#470505ff'}]}
                    onFocus={()=>setf3(true)}
                    onBlur={()=>setf3(false)}
                    maxLength={2}
                    />
                    <View style={{flexDirection:'row',alignItems:'center',gap:10,}}>
                    <Text style={{fontWeight:'bold',fontSize:16,}}>Gender:</Text>
                    <View style={{flexDirection:'row',gap:10,alignItems:'center'}}>
                        <TouchableOpacity
                            onPress={()=>setgender(0)}
                            style={{alignItems:'center'}}
                            >
        
                            <Icon5 name={'male'} size={20} style={[gender===0 && {color:'#e61010ff'}]}/>
                            <Text style={[{fontSize:17},gender===0 && {color:'#e61010ff'}]}>Male</Text>
                        </TouchableOpacity>
                         <TouchableOpacity
                            onPress={()=>setgender(1)}
                            style={{alignItems:'center'}}>
                            <Icon5 name={'female'} size={20} style={[gender===1 && {color:'#e61010ff'}]}/>
                            <Text style={[{fontSize:17},gender===1 && {color:'#e61010ff'}]}>Female</Text>
                        </TouchableOpacity>
                    </View>
                    </View>
                    <TouchableOpacity
                    style={styles.btn}
                    onPress={()=>{savedata();setshow(false);}}>
                    <Text style={{color:'#fff',fontSize:18,fontWeight:'bold'}}>Add Passenger</Text>
                    </TouchableOpacity>
                </View>
                
             </View>
            }
            <View style={{
                flexDirection:'row',
                justifyContent:'space-between',
                padding:15,
            }}>
                <TouchableOpacity
                    onPress={()=>move}
                    style={[styles.button,{backgroundColor:'#27b93aff'}]}>
                    <Text  style={{color:'#fff',fontWeight:'bold',fontSize:17,}}>Procced Booking</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={()=>navigation.goBack()}
                    style={[styles.button,{backgroundColor:'#ca2323ff'}]}>
                    <Text style={{color:'#fff',fontWeight:'bold',fontSize:17,}}>Cancel Booking</Text>
                </TouchableOpacity>
            </View>
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
        marginVertical:15,
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
        borderRadius:10,
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
        borderRadius:10,
        backgroundColor:'#f0f5ffff',
        flexDirection:'column',
        gap:5,
        marginTop:10,
        padding:7,
        alignItems:'center',
        borderWidth:1,
        borderColor:'#e6e6e6ff',
        paddingHorizontal:15,
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
    },
    details:{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 10,
    },
    blurContainer: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,  
        zIndex: 1, 
    },
    input: {
        borderWidth: 1,
        borderColor: '#acacacff',
        borderRadius: 10,
        padding: 10,
        marginBottom: 10,
        marginTop: 5,
        fontSize:16,
    },
    blurView: {
       position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,  
        
    },
    passcont:{
        width: '85%',
        backgroundColor: '#fff',
        borderRadius: 15,
        padding: 20,
        zIndex: 2,
        elevation: 10,
    },
    btn: {
        backgroundColor: '#27b93aff',
        borderRadius: 10,
        padding: 12,
        alignItems: 'center',
        marginTop: 15,
    },
    passenger:{
        backgroundColor: "#fff",
        padding: 10,
        marginBottom: 10,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: "#dcdcdc",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        elevation: 4,
        shadowColor:'#0e0e0eff',
    },
    button:{
        paddingHorizontal:10,
        paddingVertical:10,
        borderRadius:10,
        elevation:10,
        width:'45%',
        shadowColor:'#0c0c0cff',
        alignItems:'center',
    }
});
export default Payment;
