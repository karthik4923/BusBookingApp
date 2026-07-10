import React,{useState} from "react";
import { View ,Text,ScrollView,StyleSheet, TouchableOpacity} from "react-native";
import Icon5 from 'react-native-vector-icons/FontAwesome5';
import Icon6 from 'react-native-vector-icons/FontAwesome6';
import Icon from 'react-native-vector-icons/FontAwesome';
const Bookings=()=>{
    const [act,setact]=useState(0);
    return(
        <View style={styles.container}>
            <View style={styles.head}>
                <Text style={{fontWeight:'bold',fontSize:20,marginTop:45,marginLeft:10,}}>Bookings</Text>
            </View>
            <ScrollView>
                <View style={styles.headcont}>
                    <TouchableOpacity
                        onPress={()=>setact(0)}
                        style={[styles.touch,act===0 && {backgroundColor:'#db5050ff'}]}>
                        <Icon5 name={'bus-alt'} style={[styles.icon,act===0 && {color:'#ffffffff'}]}/>
                        <Text style={[styles.text,act===0 && {color:'#fff',fontWeight:'bold'}]}>Bus</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={()=>setact(1)}
                         style={[styles.touch,act===1 && {backgroundColor:'#db5050ff'}]}>
                        <Icon6 name={'train'}  style={[styles.icon,act===1 && {color:'#ffffffff'}]}/>
                        <Text style={[styles.text,act===1 && {color:'#fff',fontWeight:'bold'}]}>Trains</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                         style={[styles.touch,act===2 && {backgroundColor:'#db5050ff'}]}>
                        <Icon name={'plane'}  style={[styles.icon,act===2 && {color:'#ffffffff'}]}/>
                        <Text style={[styles.text,act===2 && {color:'#fff',fontWeight:'bold'}]}>Flights</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={()=>setact(3)}
                         style={[styles.touch,act===3 && {backgroundColor:'#db5050ff'}]}>
                        <Icon6 name={'hotel'}  style={[styles.icon,act===3 && {color:'#ffffffff'}]}/>
                        <Text style={[styles.text,act===3 && {color:'#fff',fontWeight:'bold'}]}>Hotels</Text>
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
    },
    head:{
        height:'10%',
        width:'100%',
        backgroundColor:'#fff',
        elevation:20,
        shadowColor:'#000000ff',
        shadowOffset:{width:10,height:0},
        shadowOpacity:1,
        zIndex:100,
    },
    headcont:{
        flexDirection:'row',
        justifyContent:'space-between',
        backgroundColor:'#ffdedeff',
        paddingVertical:13,
        paddingHorizontal:5,
    },
    touch:{
        flexDirection:'row',
        gap:10,
        borderWidth:0.5,
        borderRadius:10,
        borderColor:'#c26767ff',
        backgroundColor:'#fff',
        padding:7,
        alignItems:'center',
        elevation:10,
        shadowColor:'#000000ff',
    },
    icon:{
        fontSize:19,
    },
    text:{
        fontSize:18,
    }
})
export default Bookings;