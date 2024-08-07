import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import Colors from '../constents/Colors'
import { moderateScale, scale, verticalScale } from 'react-native-size-matters'
import { useNavigation } from '@react-navigation/native'


const SecureWallet = () => {
    const navigation = useNavigation();
    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header_}>
                <Text style={styles.header_text_}>WEB3 WALLET</Text>
                <Text style={styles.text_14}>Secure your wallet</Text>
            </View>

            <ScrollView style={styles.content}>
                {
                /* videos section */}
                <View style={{ width: '100%', height: scale(200), backgroundColor: 'gray', borderRadius: scale(5), justifyContent: 'center', alignItems: 'center' }}>
                    <Text style={{ color: Colors.WHITE, fontFamily: 'RalewayExtraBold', fontSize: scale(16) }}>Video Tutorial</Text>
                </View>

                <View style={{ marginVertical: verticalScale(20), }}>
                    <Text style={styles.paragraph}>
                        don't risk losing your funds. Protect your wallet by saving
                        <Text style={{ color: Colors.PRIMARY }}> Secret Recovery Phrase </Text>
                        in a place you trust It's the only way to recover your wallet
                        if you get locked out of the app or get a new device
                    </Text>
                </View>



            </ScrollView>
            <View style={styles.text_box}>
                <Text style={styles.text_14}>Remind me later</Text>
                <Text style={styles.para_}>(Not recommended)</Text>
            </View>
            <View style={styles.footer}>
                <View style={styles.button_container}>
                    <TouchableOpacity style={[styles.button_, { backgroundColor: Colors.PRIMARY }]} onPress={() => navigation.navigate('SecureWalletAgree')}>
                        <Text style={[styles.text_14, { color: Colors.WHITE }]}>Start</Text>
                    </TouchableOpacity>
                </View>
            </View>

        </SafeAreaView>
    )
}

export default SecureWallet

const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: '100%',
        backgroundColor: Colors.BACKGROUND
    },
    header_: {
        marginTop: scale(18),
        paddingHorizontal: moderateScale(20),
        height: scale(60),
        justifyContent: 'space-between',
        alignItems: 'center',
        // backgroundColor: 'cyan'
    },
    header_text_: {
        fontSize: scale(14),
        fontFamily: 'RalewayBold',
        textAlign: 'center',
        color: Colors.WHITE
    },
    logo_: {
        width: scale(30),
        height: scale(30),
        borderRadius: scale(40 / 2)
    },
    content: {
        paddingHorizontal: moderateScale(20),
        paddingVertical: verticalScale(10),
        // backgroundColor: 'cyan'
    },
    text_14: {
        fontSize: scale(14),
        color: Colors.PRIMARY,
        fontFamily: 'RalewayBold'
    },
    text_13: {
        fontSize: scale(13),
        color: Colors.WHITE,
        fontFamily: 'LatoRegular',
        lineHeight: 20
    },
    icons_: {
        width: scale(25),
        height: scale(25)
    },
    text_bold: {
        fontSize: scale(12),
        color: Colors.WHITE,
        fontFamily: 'LatoBold'
    },
    text_box: {
        marginVertical: verticalScale(10),
        justifyContent: 'center',
        alignItems: 'center'
    },
    para_: {
        fontSize: scale(11),
        color: Colors.WHITE,
        fontFamily: 'LatoRegular',
        lineHeight: scale(16)
    },
    paragraph: {
        color: Colors.WHITE,
        fontFamily: 'RalewaySemiBold',
        fontSize: scale(14),
        lineHeight: scale(18)
    },
    footer: {
        height: '14%',
        justifyContent: 'center',

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