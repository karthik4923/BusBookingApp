import React, { useEffect, useRef, useState } from 'react'; 
import { View, TextInput,Image, StyleSheet, TouchableOpacity,Text,ScrollView, Alert } from 'react-native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import {locationsdata} from './data';
import cityicon from '../assets/cityicon.png';
import cityicon1 from '../assets/cityicon1.png'
import Feather from 'react-native-vector-icons/Feather';
import AsyncStorage from '@react-native-async-storage/async-storage';
const Location = ({navigation,route}) => {
  const {num}=route.params || {};
  const [enter, setEnter] = useState('');
  const [drop, setDrop] = useState('');
  const [act, setAct] = useState(false);
  const [dropper, setDropper] = useState(false);
  const [search,setsearch]=useState([]);
  const [cities,setcities]=useState([]);
  const [upenter,setupenter]=useState('');
  const [updrop,setupdrop]=useState('');
  
  useEffect(()=>{
    const uni=[...new Set(locationsdata.map(t=>t.city))];
    setcities(uni);
  },[]);
  
  useEffect(()=>{
    const data = act ? enter : drop;
    if(data.trim()===''){
      setsearch([]); 
      return;
    }
    const fill=locationsdata.filter(t=>
        t.point.toLowerCase().includes(data.toLowerCase())
        //.point.toUpperCase().includes(data.toUpperCase())
    );
    setsearch(fill);
  },[enter,drop,act]);
  
  useEffect(()=>{
    const fetchsaver=async()=>{
        const saved = await AsyncStorage.getItem("travel");
        if (saved) {
          const p = JSON.parse(saved);
          if(num===1){
            setEnter(''); 
            setDrop(p.to);
            setupenter('');
            setupdrop(p.to);
          }
          if(num===2){
            setDrop(''); 
            setEnter(p.from);
            setupenter(p.from);
            setupdrop('');
          }
          
          console.log("Loaded:", 'from '+p.from, 'To '+p.to);
        };
    };fetchsaver();
  },[]);
  useEffect(()=>{
  const saveData = async () => {
      if (!upenter && !updrop) return;

      if (upenter === updrop) {
        Alert.alert("Boarding and dropping points cannot be the same");
        return;
      }
      const travelData = { from: upenter, to: updrop };
      await AsyncStorage.setItem('travel', JSON.stringify(travelData));
      navigation.navigate('Dashboard');

  };
  if(updrop && upenter)saveData();
},[updrop,upenter]);
  const handleselect = (item, field) => {
    const value =`${item.point}, ${item.city}`;
    if (field === "enter") {
      setupenter(value);
      setEnter(value);
    } else {
      setupdrop(value);
      setDrop(value);
    }
    setsearch([]);
  };

  const handler=(city)=>{
    if(act){
      setupenter(city);
      setEnter(city)
    }
    else if(dropper){
        setupdrop(city);
        setDrop(city);
    }
  };
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.left}>
            <TouchableOpacity
                onPress={()=>navigation.goBack()}
                >
                <FontAwesome5 name={'arrow-left'} size={20} />
            </TouchableOpacity>
        </View>
        <View style={styles.right}>
          
          <TextInput
            placeholder='Enter Starting point'
         
            value={enter}
            onChangeText={setEnter}
            onFocus={() => {setAct(true); setDropper(false);}}
            style={[styles.inputer, { borderColor: act ? '#696969ff' : '#d6d6d6' }]}
          />
         
          
          <TextInput
            placeholder='Enter Drop Point'
            
            value={drop}
            onChangeText={setDrop}
            onFocus={() => {setDropper(true); setAct(false);}} 
            style={[styles.inputer, { borderColor: dropper ? '#696969ff' : '#d6d6d6' }]}
          />
        </View>
      </View>
      <ScrollView>
        {
          (enter || drop) && search.length>0 && (
          <View>
            {search.map((item, i) => (
              <View key={i}>
                <TouchableOpacity 
                  onPress={() => handleselect(item, act ? 'enter' : 'drop')}>
                    <View style={styles.search}>
                      <View>
                        <Image source={cityicon1} style={{height:40,width:50,}}/>
                      </View>
                      <View>
                        <Text style={{fontSize:17,fontWeight:'bold'}}>{item.point}</Text>
                        <Text>{item.city}</Text>
                      </View>
                      
                    </View>
                  
                </TouchableOpacity>
              </View>
            ))}
          </View>
        )}
        <View style={styles.headingst}>
          <Text style={{fontSize:20,}}>POPULAR CITIES</Text>
        </View>
        {cities.map((cites,i)=>(
          <View key={i}>
            <TouchableOpacity
                onPress={()=>handler(cites)}>
            <View style={styles.citystyle}>
              
                <View style={{flexDirection:'row',justifyContent:'space-between'}}>
                    <Image source={cityicon} style={{height:30,width:50}}/>
                    <Text style={{fontSize:18,paddingLeft:10}}>{cites}</Text>
                </View>
                <Feather name={'arrow-up-right'} size={25} style={{color:'#979797ff'}}/>
              
            </View>
            </TouchableOpacity>
            </View>
            
        ))}
      </ScrollView>

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    backgroundColor:'#fff',
  },
  header: {
    marginTop: 30,
    flexDirection: 'row',
    width: '100%',
    paddingVertical: 10,
    paddingHorizontal: 10,
    gap: 20,
  },
  left: {
    marginTop: 10,
  },
  right: {
    flex: 1,
    gap: 10,
  },
  inputer: {
    borderWidth: 2,
    padding: 10,
    borderRadius: 20,
    paddingLeft: 20,
    fontSize:16,
  },
  citystyle:{
    flexDirection:'row',
    paddingVertical:10,
    paddingHorizontal:10,
    alignItems:'center',
    borderBottomWidth:1,
    borderBottomColor:'#ccc',
    justifyContent:'space-between',
  },
  headingst:{
    backgroundColor:'#ebebebff',
    paddingVertical:10,
    paddingHorizontal:10,
    borderWidth:1,
    borderColor:'#ccc',

  },
  search:{
    borderBottomWidth:1,
    borderBottomColor:'#ccc',
    flexDirection:'row',
    paddingVertical:5,
    paddingHorizontal:10,
    gap:20,
  },
  proceedBtn: {
    backgroundColor: '#696969ff',
    margin: 20,
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  proceedText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },

});

export default Location;
