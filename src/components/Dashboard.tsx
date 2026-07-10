import React, { useEffect, useState } from "react";
import { Text, TouchableOpacity, View, StyleSheet, Animated } from "react-native";
import Icon from 'react-native-vector-icons/FontAwesome';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Entypo from 'react-native-vector-icons/Entypo';
import Home from './Home';
import Account from "./Account";
import Help from "./Help";
import Bookings from "./Bookings";
import Wallet from "./Wallet";


const Dashboard = ({navigation}) => {
    const [page, setPage] = useState('Home');
    const [linePosition] = useState(new Animated.Value(0));  
    const handlePress = (index, pageName) => {
        setPage(pageName);
        Animated.timing(linePosition, {
            toValue: index * 80, 
            duration:300,
            useNativeDriver: true,
        }).start();
    };

    const render = () => {
        switch(page){
            case 'Home':
                return <Home navigation={navigation} />;
            case 'Wallet':
                return <Wallet />;
            case 'Bookings':
                return <Bookings />;
            case 'Help':
                return <Help />;
            case 'Account':
                return <Account navigation={navigation} />;
            default:
                return <Home navigation={navigation}/>;
        }
    };

    return (
        <View style={styles.container}>
            <View style={styles.middle}>{render()}</View>
            <View style={styles.footer1}>
            <View style={styles.footer}>
                <TouchableOpacity
                    onPress={() => handlePress(0, 'Home')}
                    style={styles.outicon}>
                    <Ionicons name={page === 'Home' ? 'home' : 'home-outline'} style={[styles.iconer, page === 'Home' && { color: '#ca6464ff' }]} />
                    <Text style={[styles.Text, page === 'Home' && styles.acttext]}>Home</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() => handlePress(1, 'Wallet')}
                    style={styles.outicon}>
                    <Ionicons name={page === 'Wallet' ? 'wallet' : 'wallet-outline'} style={[styles.iconer, page === 'Wallet' && { color: '#ca6464ff' }]} />
                    <Text style={[styles.Text, page === 'Wallet' && styles.acttext]}>Wallet</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() => handlePress(2, 'Bookings')}
                    style={styles.outicon}>
                    <FontAwesome6 name={'box-archive'} style={[styles.iconer, page === 'Bookings' && { color: '#ca6464ff' }]} />
                    <Text style={[styles.Text, page === 'Bookings' && styles.acttext]}>Bookings</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() => handlePress(3, 'Help')}
                    style={styles.outicon}>
                    <Entypo name={'chat'} style={[styles.iconer, page === 'Help' && { color: '#ca6464ff' }]} />
                    <Text style={[styles.Text, page === 'Help' && styles.acttext]}>Help</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() => handlePress(4, 'Account')}
                    style={styles.outicon}>
                    <Icon name={'user-circle-o'} style={[styles.iconer, page === 'Account' && { color: '#ca6464ff' }]} />
                    <Text style={[styles.Text, page === 'Account' && styles.acttext]}>Account</Text>
                </TouchableOpacity>
            </View>

            
            <Animated.View
                style={[styles.activeLine, { transform: [{ translateX: linePosition }] }]}
            />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: '100%',
    },
    middle: {
        width: '100%',
        height: '100%',
        paddingBottom:'25%',
    },
    footer1:{
        position:'absolute',
        paddingVertical: 15,
        bottom:0,
        elevation: 100,
        backgroundColor: '#f7f7f7ff',
        shadowColor: '#000000ff',
        shadowOffset: { width: 10, height: -20 },
        shadowRadius: 20,
        shadowOpacity: 0.2,
        borderTopColor:'#ccc',
        borderTopWidth:1,

    },
    footer: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingBottom:5,
    },
    outicon: {
        width: 80,
        justifyContent: 'center',
        alignItems: 'center',
    },
    iconer: {
        fontSize: 35,
        color: '#979797ff',
    },
    Text: {
        fontWeight: 'bold',
        fontSize: 15,
        color: '#979797ff',
    },
    acttext: {
        color: '#ca6464ff',
    },
    activeLine: {
        height: 4,
        width: 90, 
        backgroundColor: '#ca6464ff',
        borderRadius: 20,
        zIndex:1000,
    },
});

export default Dashboard;
