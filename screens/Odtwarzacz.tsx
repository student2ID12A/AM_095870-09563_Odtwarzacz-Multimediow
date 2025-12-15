import { useNavigation, useRoute } from "@react-navigation/native";
import React,{JSX} from "react";
import { Text, StyleSheet, View, Pressable } from "react-native";
import {SafeAreaView } from "react-native-safe-area-context";
import {ImagePlayer, MusicPlayer,VidPlayer} from "../Components/MediaPlayer/MPLayout";
import { useDarkMode } from "../Components/FileLoader/DarkModeContext";
import { Asset } from "expo-asset";
import { Dimensions } from "react-native";
import AntDesign from '@expo/vector-icons/AntDesign';


export default function PlayerScreen():JSX.Element{
    const nav=useNavigation();
    const { darkMode } = useDarkMode();
    const route=useRoute();
    
    let asset:Asset=route.params["I_inf"];
    var path=route.params["I_ref"];
    var type=asset.type;
    var name=asset.name;
    console.log("pobrane wartosci: \ntyp: ",type,"\npath: ",path,"\nname: ",name)
    var width=Dimensions.get("window").width;
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
            <View style={[styles.header,darkMode&&styles.darkheader]}>
                <Pressable onPress={()=>nav.goBack()} style={styles.backicon}>
                    <AntDesign name="arrow-left" size={width/15} color={darkMode?"white":"black"} />
                </Pressable>
                <Text style={{fontSize:width/17, color:darkMode?"white":"black"}}>{name}</Text>
                <View style={styles.backicon}></View>
            </View>
            {container}
            
        </SafeAreaView>
    );
}

const styles=StyleSheet.create({
    container:{
        backgroundColor:"white",
        flex:1,
        justifyContent:"flex-start",
        alignItems:"center"
    },
    darkcontainer:{
        backgroundColor:"#252424ff",
        flex:1,
        justifyContent:"flex-start",
        alignItems:"center"
    },
    header:{
        height:"auto",
        width:Dimensions.get('screen').width,
        position:"static",
        backgroundColor:"white",
        flexDirection:"row",
        justifyContent:"space-between",
        alignItems:"center"
    },
    darkheader:{
        height:"auto",
        width:Dimensions.get('screen').width,
        position:"static",
        backgroundColor:"#252424ff",
        flexDirection:"row"
    },
    backicon:{
        width:"10%",
        height:"auto",
        padding:10
    }


    
    
})

/*
<Text>{route.params["filename"]}</Text>
            <Image source={filest.ExampleFiles[route.params["filename"]] }></Image>*/