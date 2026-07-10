import React, { useState } from 'react';
import {View,Text,StyleSheet, TouchableOpacity,FlatList} from 'react-native';
import { Calendar } from 'react-native-calendars';
const Datecal=({setdate,closeCalender})=>{
    const [selectedyear,setselectedyear]=useState(new Date().getFullYear());
    const [curmon,setcurmon]=useState(new Date().toISOString().slice(0, 7));
    const [visibleyear,setvisibleyear]=useState(false);
    const [calendarshow,setcalendershow]=useState(true);
    const getYearList=()=>{
        const years=[];
        const cyear=new Date().getFullYear();
        for(let i=cyear;i>=cyear-120;i--){
            years.push(i);
        }
        return years;
    }
    const handleYearSelect=(year)=>{
        setselectedyear(year);
        setvisibleyear(false);
        setcalendershow(true);
        setcurmon(`${year}-01`)
    }
    const handledate=(day)=>{
        const formattedDate = formatDate(day.dateString); 
        setdate(formattedDate); 
        closeCalender();

    }
     const formatDate = (dateString) => {
        const date = new Date(dateString);
        const day = String(date.getDate()).padStart(2, '0'); // Add leading zero if day is less than 10
        const month = String(date.getMonth() + 1).padStart(2, '0'); // Add leading zero if month is less than 10
        const year = date.getFullYear();

        return `${day}-${month}-${year}`; // Return the formatted date
    };
    return(
        <View style={styles.container}>

            <View style={styles.innercontainer}>
                <View style={styles.header}>
                    <TouchableOpacity
                        onPress={()=>{setvisibleyear(true),setcalendershow(false)}}>
                        <Text style={styles.yearText}>{selectedyear}</Text>
                    </TouchableOpacity>
                    <Text style={styles.monthText}>
                         {new Date(curmon).toLocaleString("default", { month: "long" })} {new Date(curmon).getFullYear()}                               
                    </Text>

                </View>
                <View style={{width:'100%',
                    backgroundColor:'#fff',
                    justifyContent:'center',
                    height:400,elevation:10,
                    shadowColor:'#000000ff',
                    }}>
                    {
                        calendarshow && (
                        <Calendar
                        current={curmon}
                        onDayPress={handledate}
                        monthFormat={'yyyy MMMM'}
                        hideExtraDays={true}
                        style={{height:'100%'}}
                        theme={{
                            arrowColor:'#832d2dff',
                            arrowStyle:{height:20,width:20},
                            textDayFontSize:16,
                            textMonthFontSize:20,
                            textDayHeaderFontSize:15,
                            textDayHeaderFontWeight: 'bold', 
                        }}
                    />
                    )}
                    {
                    

                        visibleyear && (
                        <FlatList
                            data={getYearList()}
                            renderItem={({item})=>(
                                <TouchableOpacity 
                                onPress={()=>handleYearSelect(item)}>
                                    <Text style={styles.yearItem}>{item}</Text>
                                </TouchableOpacity>
                            )}
                            keyExtractor={(item)=>item.toString()}
                            style={styles.yearList}/>
                    )}
                </View>
            </View>
        </View>
    );
};
const styles=StyleSheet.create({
    container:{
        justifyContent:'center',
        alignItems:'center',
    },
    innercontainer:{
        width:'100%',
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 20,
        paddingHorizontal:20,
    },
    yearText: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#db3434ff',
    },
    monthText: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#333',
    },
    yearList: {
        marginTop: 20,
        backgroundColor: '#fff',
        paddingHorizontal: 10,
    },
    yearItem: {
        fontSize: 24,
        textAlign:'center',
        paddingVertical: 10,
        color: '#582c2cff',
  },

});
export default Datecal;