import React,{JSX} from "react";
import {StyleSheet, Text, TouchableOpacity } from "react-native";
import {Dimensions} from "react-native";
import Foundation from '@expo/vector-icons/Foundation';
import {useNavigation} from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import { Asset } from "expo-asset";

const icontype={
    "mp3":"musical-notes",
    "mp4":"videocam",
    "png":"image",
    "jpg":"image",
    "gif":"image"
}

type fileprop={
    inf:Asset;
    ref:any;
}

export default function FileScheme({inf,ref}:fileprop):JSX.Element{   
    const navigation=useNavigation()
    return(
        <TouchableOpacity 
        onPress={()=>navigation.navigate('Odtwarzacz',{I_inf:inf,I_ref:ref})} 
        style={styles.container}>
            <Ionicons name={icontype[inf.type]} size={28} color="#007AFF" style={styles.icon}></Ionicons>
            <Text style={styles.text}>{inf.name}</Text>
        </TouchableOpacity>
    );
}

const styles=StyleSheet.create({
    container:{
        flexDirection:"row",
        justifyContent:"flex-start",
        alignItems:"center",
        width:"100%",
        height:60,
        borderColor:"Black",
        borderWidth:0.01,
        borderRadius:20,
        borderStyle:"solid",
        backgroundColor:"white",
        marginBottom:3,
        marginTop:3,
        position:"relative"
    },
    text:{
        fontSize:20,paddingLeft:10,color:"black"
    },
    icon: {
    margin: 12,
  }
})