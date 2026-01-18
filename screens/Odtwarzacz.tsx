import { useNavigation, useRoute } from "@react-navigation/native";
import React, { JSX, useEffect, useState } from "react";
import { Text, StyleSheet, View, TouchableOpacity, Dimensions } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { ImagePlayer, MusicPlayer, VidPlayer } from "../Components/MediaPlayer/MPLayout";
import { useDarkMode } from "../Components/FileLoader/DarkModeContext";
import { Asset } from "expo-asset";
import AntDesign from '@expo/vector-icons/AntDesign';

import { Accelerometer } from "expo-sensors";
import * as ScreenOrientation from "expo-screen-orientation";

export default function PlayerScreen(): JSX.Element {
    const { darkMode } = useDarkMode();
    const route = useRoute<any>();
    const nav = useNavigation();

    const [isFullscreen, setIsFullscreen] = useState(false);

    let asset: Asset = route.params["I_inf"];
    let path = route.params["I_ref"];
    let type = asset.type;
    let name = asset.name;

  // akcelerometr do pelnego ekranu
    useEffect(() => {
        Accelerometer.setUpdateInterval(300);

        const subscription = Accelerometer.addListener(({ x, y }) => {
            const landscape = Math.abs(x) > Math.abs(y);

            if (landscape && !isFullscreen) {
                setIsFullscreen(true);
                ScreenOrientation.lockAsync(
                    ScreenOrientation.OrientationLock.LANDSCAPE
                );
            }

            if (!landscape && isFullscreen) {
                setIsFullscreen(false);
                ScreenOrientation.lockAsync(
                    ScreenOrientation.OrientationLock.PORTRAIT
                );
            }
        });

        return () => {
            subscription.remove();
            ScreenOrientation.unlockAsync();
        };
    }, [isFullscreen]);

    function initComponent() {
        if (type === "png" || type === "jpg" || type === "gif") {
            return <ImagePlayer ref={path} />;
        } else if (type === "mp3") {
            return <MusicPlayer ref={path} />;
        } else if (type === "mp4") {
            return <VidPlayer ref={path} />;
        }
        return <Text>Nieobsługiwany format</Text>;
    }

    return (
        <SafeAreaView
            style={[
                styles.container,
                darkMode && styles.darkcontainer,
                isFullscreen && styles.fullscreen
            ]}
        >
            {}
            {!isFullscreen && (
                <View style={styles.header}>
                    <TouchableOpacity onPress={() => nav.goBack()}>
                        <AntDesign
                            name="arrow-left"
                            size={24}
                            color={darkMode ? "white" : "black"}
                        />
                    </TouchableOpacity>
                    <Text style={[styles.title,darkMode&&styles.darktitle]}>{name}</Text>
                    <View style={{width:"5%"}}></View>
                </View>
            )}

            {initComponent()}
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: "white",
        width: Dimensions.get("screen").width,
        flex: 1,
        alignItems: "center",
    },
    darkcontainer: {
        backgroundColor: "#413e3eff",
    },
    fullscreen: {
        backgroundColor: "black",
    },
    header: {
        width: "100%",
        padding: 12,
        flexDirection: "row",
        justifyContent:"space-between"
    },
    title:{
        color:"black",
        fontSize:25
    },
    darktitle:{
        color:"white",
        fontSize:25
    }
});
