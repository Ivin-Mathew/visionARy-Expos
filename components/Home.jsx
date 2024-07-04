/* eslint-disable prettier/prettier */
/* eslint-disable react-native/no-inline-styles */
import React, {useRef, useEffect} from 'react';
import {View, Text, StyleSheet, TouchableOpacity, Animated} from 'react-native';

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
            <View>
                <FadeInView>
                    <Text style={styles.text1}>visionARy expos</Text>
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
        </View>
    );
};

const styles = StyleSheet.create({
    mainContainer: {
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
    text1: {
        color: 'blue',
        fontSize: 45,
        fontWeight: 'bold',
        paddingBottom: 20,
        padding: 10,
        textAlign: 'center',
    },
    button: {
        backgroundColor: 'black',
        padding: 15,
        borderRadius: 10,
        width: '80%',
        alignItems: 'center',
        marginBottom:30,
    },
    buttonText: {
        color: 'white',
        fontSize: 20,
        fontWeight: 'bold',
    },
});

export default Home;
