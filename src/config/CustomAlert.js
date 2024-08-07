// CustomAlert.js

import React, { useEffect } from 'react';
import { View, Text, StyleSheet, Animated } from 'react-native';
import { moderateScale, scale } from 'react-native-size-matters';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Colors from '../constents/Colors';


const iconMapping = {
    info: 'info-outline',
    success: 'check-circle-outline',
    error: 'error-outline',
};

const CustomAlert = ({ message, type, visible, onDismiss }) => {
    const translateY = new Animated.Value(-100);

    useEffect(() => {
        if (visible) {
            Animated.timing(translateY, {
                toValue: 0,
                duration: 250,
                useNativeDriver: true,
            }).start();

            const timer = setTimeout(onDismiss, 2500);
            return () => clearTimeout(timer);
        }
    }, [visible, translateY, onDismiss]);

    if (!visible) return null;

    return (
        <Animated.View style={[styles.container, { transform: [{ translateY }] }, styles[type]]}>
            <Icon name={iconMapping[type]} size={scale(20)} color={Colors.WHITE} style={styles.icon} />
            <Text style={styles.message}>{message}</Text>
        </Animated.View>
    );
};

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        top: scale(40),
        left: 0,
        right: 0,
        marginHorizontal: moderateScale(20),
        padding: scale(15),
        borderRadius: scale(5),
        flexDirection: 'row',
        alignItems: 'center',
        zIndex: 1000,
    },
    message: {
        color: Colors.WHITE,
        textAlign: 'left',
        fontSize: scale(13),
        marginLeft: scale(10),
    },
    icon: {
        // marginRight: scale(5),
    },
    info: {
        backgroundColor: Colors.INFO,
    },
    success: {
        backgroundColor: Colors.SUCCESS,
    },
    error: {
        backgroundColor: Colors.DANGER,
    },
});

export default CustomAlert;