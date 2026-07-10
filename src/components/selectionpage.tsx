import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import AsyncStorage from "@react-native-async-storage/async-storage";
import Feather from 'react-native-vector-icons/Feather';
import Icon from 'react-native-vector-icons/FontAwesome';
import Material from 'react-native-vector-icons/MaterialCommunityIcons';

const Selectionpage = ({ navigation }) => {
  const [dataar, setdataar] = useState({});
  const [lowerSelectSeat, setLowerSelectSeat] = useState({});
  const [upperSelectSeat, setUpperSelectSeat] = useState({});
  
  useEffect(() => {
    const load = async () => {
      const found = await AsyncStorage.getItem('busbook');
      if (found) {
        setdataar(JSON.parse(found));
      }
    };
    load();
  }, []);
  
  const [lowerseats, setLowerSeats] = useState([
    [1, 0, 5, 5],
    [5, 0, 3, 5],
    [1, 0, 2, 4],
    [1, 0, 1, 1],
    [5, 0, 4, 4],
    [5, 0, 3, 5],
  ]);

  const [upperseats, setUpperSeats] = useState([
    [5, 0, 1, 1],
    [5, 0, 4, 1],
    [1, 0, 3, 5],
    [5, 0, 5, 5],
    [1, 0, 1, 1],
    [1, 0, 5, 3],
  ]);

  const handleSeatSelection = (rowIdx, colIdx, seatType, isLower) => {
    if (seatType === 1 || seatType === 2 || seatType === 3) {
      const newSelectSeat = isLower ? { ...lowerSelectSeat } : { ...upperSelectSeat };
      const seatKey = `${rowIdx}-${colIdx}`;

      if (newSelectSeat[seatKey]) {
        delete newSelectSeat[seatKey];  
      } else {
        newSelectSeat[seatKey] = rowIdx*4+colIdx;  
      }

      if (isLower) {
        setLowerSelectSeat(newSelectSeat);
      } else {
        setUpperSelectSeat(newSelectSeat);
      }
    }
  };
   console.log(lowerSelectSeat,upperSelectSeat);

  const getSeatBorderColor = (rowIdx, colIdx, seatType, isLower) => {
    const seatKey = `${rowIdx}-${colIdx}`;
    const selectSeat = isLower ? lowerSelectSeat : upperSelectSeat;

    if (selectSeat[seatKey]) {
      return '#1ac500ff'; 
    }
    if (seatType === 1) return '#a3a3a3ff';  
    if (seatType === 2) return '#fa64e1ff'; 
    if (seatType === 3) return '#3fcefaff'; 
    return 'transparent';
  };

  const getSeatBackgroundColor = (rowIdx, colIdx, seatType, isLower) => {
    const seatKey = `${rowIdx}-${colIdx}`;
    const selectSeat = isLower ? lowerSelectSeat : upperSelectSeat;

    if (selectSeat[seatKey]) {
      return '#c4ffbbff';  
    }
    if (seatType === 4) return '#c035a9ff';  
    if (seatType === 5) return '#a3a3a3ff';  
    return 'transparent'; 
  };

  return (
    <View>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.left}>
          <Feather name={'arrow-left'} size={30} />
        </TouchableOpacity>
        <View style={styles.right}>
          <View style={styles.head1}>
            <Text style={styles.txt}>{dataar.from}</Text>
            <Icon name={'long-arrow-right'} style={styles.txt} />
            <Text style={styles.txt}>{dataar.to}</Text>
          </View>
          <View style={styles.head2}>
            <Text style={styles.headtxt}>{dataar.week}</Text>
            <Text style={styles.headtxt}>{dataar.day}</Text>
            <Text style={styles.headtxt}>{dataar.month}</Text>
            <Text style={styles.headtxt}>{dataar.year} |</Text>
            <Text style={styles.headtxt}>{dataar.starttime}</Text>
          </View>
        </View>
      </View>

      <ScrollView>
        <View style={styles.header2}>
          <View style={styles.info}>
            <Material name={'seat-outline'} size={30} />
            <Text style={{ fontSize: 10 }}>Available</Text>
          </View>
          <View style={styles.info}>
            <Material name={'seat-outline'} size={30} style={{ color: '#fa64e1ff' }} />
            <Text style={{ fontSize: 10 }}>For Female</Text>
          </View>
          <View style={styles.info}>
            <Material name={'seat-outline'} size={30} style={{ color: '#3fcefaff' }} />
            <Text style={{ fontSize: 10 }}>For Male</Text>
          </View>
          <View style={styles.info}>
            <Material name={'seat'} size={30} style={{ color: '#fa64e1ff' }} />
            <Text style={{ fontSize: 11 }}>Female Booked</Text>
          </View>
          <View style={styles.info}>
            <Material name={'seat'} size={30} />
            <Text style={{ fontSize: 10 }}>Booked</Text>
          </View>
        </View>

        <View style={styles.middler}>
          <View style={styles.left1}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingBottom: 10 }}>
              <Text style={{ fontSize: 15, fontWeight: 'bold' }}>Lower</Text>
              <Material name={'steering'} style={{ fontSize: 30, color: '#adadadff' }} />
            </View>
            {lowerseats.map((row, rowIdx) => (
              <View key={rowIdx} style={{ flexDirection: 'row', paddingBottom: 15, alignItems: 'center',justifyContent:'space-between' }}>
                {row.map((seat, colIdx) => {
                  const istouchable = seat === 1 || seat === 2 || seat === 3;
                  return (
                    <TouchableOpacity
                      key={colIdx}
                      disabled={!istouchable}
                      onPress={() => handleSeatSelection(rowIdx, colIdx, seat, true)}  
                      style={[
                        styles.box,
                        {
                          borderColor: getSeatBorderColor(rowIdx, colIdx, seat, true),
                          backgroundColor: getSeatBackgroundColor(rowIdx, colIdx, seat, true),
                          borderWidth: 2,
                          borderRadius: 10,
                        }
                      ]}
                    />
                  );
                })}
              </View>
            ))}
          </View>

          <View style={styles.right1}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingBottom: 10 }}>
              <Text style={{ fontSize: 15, fontWeight: 'bold' }}>Upper</Text>
              <Material name={'steering'} style={{ fontSize: 30, color: '#ffffffff' }} />
            </View>
            {upperseats.map((row, rowIdx) => (
              <View key={rowIdx} style={{ flexDirection: 'row', paddingBottom: 15, alignItems: 'center', justifyContent:'space-between' }}>
                {row.map((seat, colIdx) => {
                  const istouchable = seat === 1 || seat === 2 || seat === 3;
                  return (
                    <TouchableOpacity
                      key={colIdx}
                      disabled={!istouchable}
                      onPress={() => handleSeatSelection(rowIdx, colIdx, seat, false)}  
                      style={[
                        styles.box,
                        {
                          borderColor: getSeatBorderColor(rowIdx, colIdx, seat, false),
                          backgroundColor: getSeatBackgroundColor(rowIdx, colIdx, seat, false),
                          borderWidth: 2,
                          borderRadius: 10,
                        }
                      ]}
                    />
                  );
                })}
              </View>
            ))}
          </View>
        </View>
        <View>
            <Text>Selected Seats:</Text>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    gap: 20,
    alignItems: 'center',
    paddingTop: 40,
    paddingBottom: 10,
    paddingHorizontal: 10,
  },
  head1: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  head2: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
  },
  txt: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  headtxt: {
    fontSize: 15,
    color: '#8a8a8aff',
  },
  header2: {
    backgroundColor: '#fff',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    paddingVertical: 10,
  },
  info: {
    width: 80,
    alignItems: 'center',
  },
  middler: {
    padding: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  left1: {
    width: '48%',
    backgroundColor: '#fff',
    borderRadius: 15,
    padding: 10,
    elevation:5,
    shadowColor:'#494949ff',
  },
  right1: {
    width: '48%',
    backgroundColor: '#fff',
    borderRadius: 15,
    padding: 10,
    elevation:5,
    shadowColor:'#494949ff',
  },
  box: {
    height: 70,
    width: 35,
    borderRadius: 5,
  },
});

export default Selectionpage;
