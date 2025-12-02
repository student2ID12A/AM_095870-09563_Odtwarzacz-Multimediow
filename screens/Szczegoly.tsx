import React,{JSX} from "react";
import { StyleSheet, View,Text } from "react-native";
import { darkmodeflag } from "../Components/FileLoader/data";
import { useRoute } from "@react-navigation/native";



export default function DetailScreen():JSX.Element{
    const route=useRoute();
    var name=route.params["nameD"];
    var uri=route.params["uriD"];
    var size=route.params["sizeD"];
    var LastMod=route.params["lastModD"];
    
    return(
        <View style={styles.container}>
            <View style={{height:"auto",width:"70%",justifyContent:"flex-start",alignItems:"center"}}>
                <Text>Nazwa: {name}</Text>
                <Text>Sciezka: {uri}</Text>
                <Text>Rozmiar: {size}</Text>
                <Text>Ostatnia Modyfikacja:{LastMod}</Text>
            </View>
        </View>
    );
}

const styles=StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:darkmodeflag?"#555151ff":"white",
        justifyContent:"center",
        alignItems:"center"
    }
})