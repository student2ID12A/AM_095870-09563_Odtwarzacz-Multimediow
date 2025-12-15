import React,{JSX, useEffect} from "react";
import { Dimensions, Image, StyleSheet, View} from "react-native";
import {useAudioPlayer } from "expo-audio";
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { useVideoPlayer,VideoView } from "expo-video";
import MediaButtons from "./MediaButtons";
import { useNavigation } from "@react-navigation/native";
import { useDarkMode } from "../FileLoader/DarkModeContext";



type necessfiles={
    ref:any;
}

export function ImagePlayer({ref}:necessfiles):JSX.Element{
    return(
        <View style={styles.ImagePlayer}>
            <Image resizeMode="center" resizeMethod="scale" style={{maxWidth:Dimensions.get("window").width-20,height:300,position:"relative"}} source={ref}></Image>
        </View>
    );
}

export function MusicPlayer({ref}:necessfiles):JSX.Element{
    const { darkMode } = useDarkMode();
    const musicfile=useAudioPlayer(ref)
    musicfile.seekTo(0);
    musicfile.play();

    const nav=useNavigation();
    useEffect(()=>{
        const leave=nav.addListener("beforeRemove",(e)=>{
            musicfile.pause();
        });
        return leave;
    },[nav]);
    return(
        <View style={styles.ImagePlayer}>
            <MaterialCommunityIcons name="music-circle" size={Dimensions.get("window").width/2} color={darkMode?"white":"black"} />
            <MediaButtons type={musicfile}></MediaButtons>
        </View>
    );
}

export function VidPlayer({ref}:necessfiles):JSX.Element{
    const vidfile=useVideoPlayer(ref)
    vidfile.seekBy(0);
    vidfile.play();
    console.log("dotarlo do filmu")
    return(
        <View style={styles.ImagePlayer}>
            <VideoView player={vidfile} style={{height:300,width:"100%"}}></VideoView>
        </View>
    );
}


const styles=StyleSheet.create({
    ImagePlayer:{
       position:"relative",
       top:"20%",
       justifyContent:"center",
       alignItems:"center"
    }
})
