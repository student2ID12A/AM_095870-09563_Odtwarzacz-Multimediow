import React,{JSX} from "react";
import { Dimensions, Image, StyleSheet, View} from "react-native";
import {useAudioPlayer } from "expo-audio";
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { useVideoPlayer,VideoView } from "expo-video";
import MediaButtons from "./MediaButtons";


type necessfiles={
    ref:any;
}

export function ImagePlayer({ref}:necessfiles):JSX.Element{
    return(
        <View style={styles.ImagePlayer}>
            <Image resizeMode="center" resizeMethod="resize" style={{maxWidth:Dimensions.get("window").width}} source={ref}></Image>
        </View>
    );
}

export function MusicPlayer({ref}:necessfiles):JSX.Element{
    
    const musicfile=useAudioPlayer(ref)
    musicfile.seekTo(0);
    musicfile.play()
    return(
        <View style={styles.ImagePlayer}>
            <MaterialCommunityIcons name="music-circle" size={300} color="black" />
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
       
    }
})
