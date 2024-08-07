
import { Dimensions, Image, Pressable, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import AppIntroSlider from 'react-native-app-intro-slider';
import { Ionicons } from '@expo/vector-icons'
import { SafeAreaView } from 'react-native-safe-area-context';
import { scale, verticalScale, moderateScale } from 'react-native-size-matters';
import { useNavigation } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import Colors from '../constents/Colors'
import { AppName } from '../config/config';


const OnBoarding = () => {

    const navigation = useNavigation();
    const slides = [
        {
            key: 1,
            text1: `WEB3 WALLET`,
            text2: `Manage your digital assets`,
            text3: 'Store and spend digital assets like token, ethereum, unique collectible!',
            image: require('../assets/images/illus_one.png'),
        },
        {
            key: 2,
            text1: `WEB3 WALLET`,
            text2: `Your geteway to web3`,
            text3: `Login with ${AppName} and make transactions to invest, earn, play games, buy sell and more!`,
            image: require('../assets/images/illus_two.png'),
        },

    ];

    const _renderItem = ({ item }) => {
        return (
            <View style={styles.slide}>
                <View style={styles.text_contaienr}>
                    <Text style={styles.text_14}>{item?.text1}</Text>
                    <Text style={styles.text_16}>{item?.text2}</Text>
                </View>

                <View style={styles.image_contianer}>
                    <Image source={item.image} style={styles.image_} resizeMode='contain' />
                </View>

                <View style={styles.text_box_}>
                    <Text style={styles.text}>{item.text3}</Text>
                </View>

            </View>
        );
    }


    _renderNextButton = () => {
        return (
            <View style={styles.buttonCircle}>
                <Ionicons name="arrow-forward" color={Colors.WHITE} size={scale(24)} />
            </View>
        );
    };
    _renderDoneButton = () => {
        return (
            <Pressable style={styles.buttonCircle} onPress={() => navigation.navigate('WalletSetup')}>
                <Ionicons name="checkmark-sharp" color={Colors.WHITE} size={scale(24)} />
            </Pressable>
        );
    };
    _onDone = ({ }) => {
        console.log('slider done');
    };
    return (
        <SafeAreaView style={styles.container}>
            <StatusBar backgroundColor={'transparent'} style="dark" />
            <AppIntroSlider
                renderItem={_renderItem}
                data={slides}
                onDone={_onDone}
                dotClickEnabled={true}
                dotStyle={{ backgroundColor: Colors.GRAY }}
                activeDotStyle={{ backgroundColor: Colors.WHITE }}
                renderDoneButton={_renderDoneButton}
                renderNextButton={_renderNextButton}
            />
        </SafeAreaView>
    )
}

export default OnBoarding

const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: '100%',
        backgroundColor: Colors.BACKGROUND
    },
    slide: {
        width: '100%',
        height: '100%',
        backgroundColor: Colors.BACKGROUND
    },
    text_contaienr: {
        justifyContent: 'space-evenly',
        alignItems: 'center',
        height: '20%',
        paddingTop: scale(20),
    },
    text_14: {
        fontFamily: 'RalewayBold',
        fontSize: scale(14),
        color: Colors.WHITE
    },
    text_16: {
        fontFamily: 'RalewayBold',
        fontSize: scale(16),
        color: Colors.WHITE
    },
    image_contianer: {
        width: '100%',
        height: '50%',
        justifyContent: 'center',
        alignItems: 'center'
    },
    image_: {
        width: '70%',
        height: '70%',
    },
    text_box_: {
        paddingVertical: verticalScale(20),
        height: '10%',
        width: '100%',
    },
    text: {
        fontSize: scale(13),
        color: Colors.WHITE,
        textAlign: 'center',
        fontFamily: 'LatoRegular',
        paddingHorizontal: moderateScale(25),
    },
    buttonCircle: {
        width: scale(40),
        height: scale(40),
        backgroundColor: Colors.PRIMARY,
        borderRadius: scale(20),
        justifyContent: 'center',
        alignItems: 'center',
    },
});