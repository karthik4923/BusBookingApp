import React from "react";
import { View ,Text,ScrollView,StyleSheet,Image} from "react-native";
import Video from "react-native-video";
import LinearGradient from "react-native-linear-gradient";
import money from '../assets/money.mp4';
import coin from '../assets/coin.png';
import Icon from 'react-native-vector-icons/FontAwesome';
const Wallet=()=>{
    return(
        <View style={styles.container}>
            <View style={{
                paddingVertical:10,
                paddingHorizontal:10,
                height:80,
                backgroundColor:'#fff',
            }}>
                <Text style={{
                    position:'absolute',
                    bottom:10,
                    left:10,
                    fontSize:20,
                    fontWeight:'bold',
                }}>Wallet</Text>
            </View>
            <ScrollView
             showsVerticalScrollIndicator={false}
             style={{padding:0,backgroundColor:'#fff'}}>
            <Video
                source={money}
                repeat={true}
                controls={false}
                resizeMode="cover"
                style={styles.video}
            />
            <View style={styles.linearg}>
                <LinearGradient
                    colors={['#ffe5fdff','#b5c2fcff',]}
                    style={styles.linearg}
                    start={{x:0,y:0}}
                    end={{x:1,y:1}}>
                    <View style={styles.innerc}>
                        <View style={styles.left}>
                             <Image source={coin} style={{width:50,height:50}}
                             />
                        </View>
                        <View style={styles.right}>
                            <View style={{flexDirection:'row',gap:10}}>
                                <Icon name={'rupee'} size={20}/>
                                <Text style={{fontSize:17}}>0.0</Text>
                            </View>
                            <Text style={{color:"#838383ff"}}>Current balance</Text>

                        </View>
                    </View>
                    <View style={styles.sep}>
                        <Text style={{color:'#178800ff',
                            fontSize:15,

                            bottom:-20,
                            textAlign:'center',}}>
                                Book now to start earning AbhiCredits!</Text>
                    </View>
                </LinearGradient>
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
    video:{
        height:'100%',
        width:'100%',
    },
    linearg:{
        paddingHorizontal:10,
        paddingVertical:10,
        borderRadius:20,
        backgroundColor:'#fff',
    },
    innerc:{
        backgroundColor:'white',
        borderRadius:20,
        paddingHorizontal:10,
        flexDirection:'row',
        paddingVertical:10,
        gap:10,
        alignItems:'center',
        borderWidth:1,
        borderColor:'#bbbbbbff',
        zIndex:100,
        
    },
    sep:{
        borderRadius:20,
        width:'100%',
        backgroundColor:'#eaffe9ff',
        justifyContent:'center',
        borderWidth:1,
        borderColor:'#178800ff',
        height:80,
        top:-35,
    }

})
export default Wallet;