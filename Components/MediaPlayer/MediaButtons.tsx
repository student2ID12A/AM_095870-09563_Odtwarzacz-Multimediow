import React,{JSX, useState} from "react";
import { AudioPlayer,useAudioPlayerStatus} from "expo-audio";
import Foundation from '@expo/vector-icons/Foundation';
import Slider from "@react-native-community/slider";
import {StyleSheet, View,Text, Pressable, Dimensions} from "react-native";
import { useDarkMode } from "../FileLoader/DarkModeContext";

type filetype={
    type:AudioPlayer
}

export default function MediaButtons({type}:filetype):JSX.Element{
    
    const { darkMode } = useDarkMode();
    var [paused,Setpaused]=useState(true);
    var status=useAudioPlayerStatus(type);
    const fulltime=status.duration.toPrecision(3)
    let currtime=status.currentTime.toPrecision(3)


    function PauseClicked() {  
        Setpaused(prev=>!prev);
        if(status.playing) type.pause();
        else type.play()
    }
    const onsliderhold=async(value:number)=>{
        type.pause();
        type.seekTo(value);
    }
    const onsliderrelease=async()=>{
        if(paused) type.play()
    }
    if(status.didJustFinish){
        type.seekTo(0)
        paused=false
    }

    //(
    return(
        <View style={styles.maincontainer}>
            <View style={styles.ListofButtons}>
                <Pressable>
                    <Foundation name="previous" size={40} color={darkMode?"white":"black"} />
                </Pressable>
                <Pressable onPress={PauseClicked}>
                    <Foundation name={paused?"pause":"play"} size={40} color={darkMode?"white":"black"} />
                </Pressable>
                <Pressable>
                    <Foundation name="next" size={40} color={darkMode?"white":"black"} />
                </Pressable>
            </View>
            <View style={styles.SliderSpace}>
                 <Text style={{color:darkMode?"white":"black"}}>{currtime}</Text>
                 <Slider style={{width:"75%",marginHorizontal:5}}
                    maximumValue={parseFloat(fulltime)}
                    value={parseFloat(currtime)} 
                    onValueChange={(value)=>onsliderhold(value)}
                    onSlidingComplete={onsliderrelease}></Slider>
                 <Text style={{color:darkMode?"white":"black"}}>{fulltime}</Text>
             </View>
        </View>
    );
}

const styles=StyleSheet.create({
    maincontainer:{
        position:"absolute",
        flexDirection:"column-reverse",
        width:Dimensions.get("screen").width,
        height:"auto",
        justifyContent:"center",
        alignItems:"center",
        alignSelf:"center",
        bottom:"-120%"
        
    },
    ListofButtons:{
         flexDirection:"row",
         justifyContent:"space-between",
         height:"auto",
         width:"60%",
         bottom:40
     },
     SliderSpace:{
         width:Dimensions.get("screen").width,
         flexDirection:"row",
         justifyContent:"center",
         height:"auto",
         top:10,
         
     } 
})

