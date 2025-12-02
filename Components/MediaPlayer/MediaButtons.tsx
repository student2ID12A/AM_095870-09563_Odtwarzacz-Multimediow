import React,{JSX, useState} from "react";
import { AudioPlayer} from "expo-audio";
import Foundation from '@expo/vector-icons/Foundation';
import Slider from "@react-native-community/slider";
import {StyleSheet, View,Text, Pressable} from "react-native";
import { VideoPlayer } from "expo-video";
import Entypo from '@expo/vector-icons/Entypo';
import { useNavigation } from "@react-navigation/native";

type filetype={
    type:AudioPlayer|VideoPlayer
}

export default function MediaButtons({type}:filetype):JSX.Element{
    const [paused,Setpaused]=useState(true);
    const fulltime=type.duration.toPrecision(4);
    let currtime=type.currentTime.toPrecision(4)
    function PauseClicked() {  
        Setpaused(prev=>!prev);
        if(paused) type.pause();
        else if(!paused) type.play()
    }

    
    return(
        <View style={styles.ControlsContainer}>
            <View style={{height:100}}>
                <View style={styles.ListofButtons}>
                    <Pressable>
                        <Foundation name="previous" size={40} color="black" />
                    </Pressable>
                    <Pressable onPress={PauseClicked}>
                        <Foundation name={paused?"play":"pause"} size={40} color="black" />
                    </Pressable>
                    <Pressable>
                        <Foundation name="next" size={40} color="black" />
                    </Pressable>
                </View>
                
            </View>
            <View style={styles.SliderSpace}>
                <Text>{currtime}</Text>
                <Slider style={{width:"80%"}}></Slider>
                <Text>{fulltime}</Text>
            </View>
            
        </View>
    );
}

//
//<Foundation name="pause" size={24} color="black" />

const styles=StyleSheet.create({
    ControlsContainer:{
        position:"absolute",
        bottom:"-110%",
        width:"100%",
        height:"auto",
        backgroundColor:"white",
        flexDirection:"column-reverse",
        justifyContent:"center",
        alignItems:"center"
    },
    ListofButtons:{
        flexDirection:"row",
        justifyContent:"space-between",
        height:"auto",
        width:"80%",
    },
    SliderSpace:{
        width:"100%",
        flexDirection:"row",
        height:"auto",
        top:10,
        backgroundColor:"white"
    }
})

