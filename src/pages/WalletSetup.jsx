import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import Colors from '../constents/Colors'
import { IMAGES } from '../constents/Images'
import { moderateScale, scale, verticalScale } from 'react-native-size-matters'
import { useNavigation } from '@react-navigation/native'

const WalletSetup = () => {
    const navigation = useNavigation();
    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.container_one} />

            <View style={styles.container_two}>
                <View style={styles.image_contianer}>
                    <Image source={IMAGES.illus_three} style={styles.image_} resizeMode='contain' />
                </View>
                <View style={styles.text_container}>
                    <Text style={styles.text_18}>Wallet Setup</Text>
                    <View>
                        <Text style={styles.text_14}>Import an existing wallet or</Text>
                        <Text style={styles.text_14}>Create a new one</Text>
                    </View>
                </View>
            </View>

            <View style={styles.container_three}>
                <View style={styles.button_container}>
                    <TouchableOpacity style={[styles.button_, { backgroundColor: Colors.PRIMARY }]} onPress={() => navigation.navigate('ImportPharse')}>
                        <Text style={styles.text_14}>Import Using Seed Pharse</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.button_} onPress={() => navigation.navigate('Agreement')}>
                        <Text style={styles.text_14}>Create A New Wallet</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </SafeAreaView>
    )
}

export default WalletSetup

const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: '100%',
        backgroundColor: Colors.BACKGROUND
    },
    container_one: {
        height: '10%',
    },
    container_two: {
        width: '100%',
        height: '60%',
    },
    image_contianer: {
        justifyContent: 'center',
        alignItems: 'center'
    },
    container_three: {
        width: '100%',
        height: '30%',
        justifyContent: 'center',
    },
    image_: {
        width: '80%',
        height: '80%',
    },
    text_container: {
        paddingHorizontal: moderateScale(20),
        gap: scale(10)
    },
    text_18: {
        fontSize: scale(20),
        color: Colors.PRIMARY,
        fontFamily: 'RalewayExtraBold',
    },
    text_14: {
        fontSize: scale(14),
        color: Colors.WHITE,
        fontFamily: 'RalewaySemiBold',
    },
    button_container: {
        justifyContent: 'center',
        alignContent: 'center',
        gap: scale(10),
        paddingHorizontal: moderateScale(20)
    },
    button_: {
        width: '100%',
        height: scale(45),
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: Colors.PRIMARY,
        borderRadius: scale(5)
    }
})