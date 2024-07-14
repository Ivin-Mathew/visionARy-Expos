/* eslint-disable prettier/prettier */

import React, {useRef, useEffect} from 'react';
import {View, Text, StyleSheet, TouchableOpacity, Animated, ImageBackground} from 'react-native';

const FadeInView = props => {
    const fadeAnim = useRef(new Animated.Value(0)).current; // Initial value for opacity: 0

    useEffect(() => {
        Animated.timing(fadeAnim, {
            toValue: 1,
            duration: 1500,
            useNativeDriver: true,
        }).start();
    }, [fadeAnim]);

    return (
        <Animated.View // Special animatable View
            style={{
                ...props.style,
                opacity: fadeAnim, // Bind opacity to animated value
            }}>
            {props.children}
        </Animated.View>
    );
};

const Home = ({navigation}) => {
    return (
        <View style={styles.mainContainer}>
            <ImageBackground source={require('../assets/visionARyBG.jpg')} style={styles.backgroundImage}>
                <View>
                    <FadeInView>
                        <Text style={styles.header}>visionARy expos</Text>
                    </FadeInView>
                    <View style={styles.container}>
                        <TouchableOpacity
                            style={styles.button}
                            onPress={() => navigation.navigate('AR view')}
                        >
                            <Text style={styles.buttonText}>Open AR view</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={styles.container1}>
                    <TouchableOpacity
                        style={styles.button}
                        onPress={() => navigation.navigate('Upload')}
                    >
                        <Text style={styles.buttonText}>Upload your model!</Text>
                    </TouchableOpacity>
                </View>
            </ImageBackground>
        </View>
    );
};

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
    },
    mainContainer1:{
        flex: 1,
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    container: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    container1: {
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
    },
    header: {
        fontSize: 48,
        fontWeight: 'bold',
        color: '#FFFFFF',
        textShadowColor: 'rgba(0, 0, 0, 0.75)',
        textShadowOffset: { width: -1, height: 1 },
        textShadowRadius: 10,
        fontFamily: 'Arial',
        textAlign: 'center',
        padding: 10,
        paddingBottom:20 ,
        borderRadius: 5,
        backgroundColor:'black',
      },
    button: {
        backgroundColor: 'white',
        padding: 15,
        borderRadius: 10,
        width: '80%',
        alignItems: 'center',
        marginBottom: 30,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
    },
    buttonText: {
        color: 'black',
        fontSize: 23,
        fontWeight: '900',
    },
    backgroundImage: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'space-between',
      },
});

export default Home;
