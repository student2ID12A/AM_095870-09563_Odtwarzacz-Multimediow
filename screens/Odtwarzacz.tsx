import { useNavigation, useRoute } from "@react-navigation/native";
import React,{JSX, useState} from "react";
import { Text, StyleSheet, View } from "react-native";
import {SafeAreaView } from "react-native-safe-area-context";
import {ImagePlayer, MusicPlayer,VidPlayer} from "../Components/MediaPlayer/MPLayout";
import { useDarkMode } from "../Components/FileLoader/DarkModeContext";
import { Asset } from "expo-asset";
import { Dimensions } from "react-native";
import AntDesign from '@expo/vector-icons/AntDesign';


export default function PlayerScreen():JSX.Element{
    const { darkMode } = useDarkMode();
    const route=useRoute();
    const nav=useNavigation();
    let asset:Asset=route.params["I_inf"];
    var path=route.params["I_ref"];
    var type=asset.type;
    var name=asset.name;
    console.log("pobrane wartosci: \ntyp: ",type,"\npath: ",path,"\nname: ",name)
    
    function initComponent() {
        if(type=="png"||type=="jpg"||type=="gif"){
            return <ImagePlayer ref={path}></ImagePlayer>
        }
        else if(type=="mp3")
        {
            return <MusicPlayer ref={path}></MusicPlayer>
        }
        else if(type=="mp4")
        {
            return <VidPlayer ref={path}></VidPlayer>
        }
    }

    var container=initComponent();

    return(
        <SafeAreaView style={[styles.container,darkMode&&styles.darkcontainer]}>
            <View style={styles.header}>
                <AntDesign name="arrow-left" size={24} color="black" />
            </View>
            {container}
            
        </SafeAreaView>
    );
}

const styles=StyleSheet.create({
    container:{
        backgroundColor:"white",
        width:Dimensions.get('screen').width,
        justifyContent:"flex-start",
        alignItems:"center"
    },
    darkcontainer:{
        backgroundColor:"#413e3eff",
        flex:1,
        justifyContent:"flex-start",
        alignItems:"center"
    },
    header:{
        height:"auto",
        width:"100%",
        position:"relative",
        backgroundColor:"red",
        flexDirection:"row"
    }
    
})

/*
<Text>{route.params["filename"]}</Text>
            <Image source={filest.ExampleFiles[route.params["filename"]] }></Image>*/