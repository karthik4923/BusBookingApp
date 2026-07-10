import React from 'react';
import { StyleSheet, View } from 'react-native';
import Dashboard from './src/components/Dashboard';
import Location from './src/components/Location';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import Profile from './src/components/Profile';
import Buspage from './src/components/Buspages';
import Payment from './src/components/Payment';
import Selectionpage from './src/components/selectionpage';
const Stack=createStackNavigator();
function App() {
  return (

    <NavigationContainer>
      <Stack.Navigator initialRouteName='Dashboard'>
        <Stack.Screen name='Dashboard' component={Dashboard} options={{headerShown:false,}}/>
        <Stack.Screen name='Location' component={Location} options={{headerShown:false}}/>
        <Stack.Screen name='Profile' component={Profile} options={{headerShown:false}}/>
        <Stack.Screen name='Buspage' component={Buspage} options={{headerShown:false}}/>
        <Stack.Screen name='Payment' component={Payment} options={{headerShown:false}}/>
        <Stack.Screen name='Selectionpage' component={Selectionpage} options={{headerShown:false}}/>
      </Stack.Navigator>
    </NavigationContainer>

  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default App;
