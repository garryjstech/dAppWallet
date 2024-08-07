import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import Colors from '../constents/Colors'
import { moderateScale, scale, verticalScale } from 'react-native-size-matters'
import { useNavigation } from '@react-navigation/native'

const SecureWalletAgree = () => {
    const navigation = useNavigation();
    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header_}>
                <Text style={styles.header_text_}>WEB3 WALLET</Text>
                <Text style={styles.text_14}>Secure your wallet</Text>
            </View>
            <ScrollView style={styles.content}>
                <Text style={[styles.paragraph, { textAlign: 'center' }]}>Secure your wallet's Secret Recovery Phrase</Text>

                <Text style={{ textAlign: 'center', fontSize: scale(14), color: Colors.PRIMARY, fontFamily: 'LatoRegular', marginVertical: verticalScale(10) }}>Why is it important?</Text>


                <View style={styles.content_box}>

                    <Text style={styles.text_14}>Manual</Text>


                    <Text style={styles.paragraph}>Write down your
                        <Text style={{ color: Colors.PRIMARY }}> Secret Recovery Phrase </Text>
                        on a piece of paper and in a safe place.
                    </Text>

                    <View>
                        <Text style={styles.text_13}><Text style={{ fontFamily: 'RalewayBold' }}>Security level:</Text> Very strong</Text>
                        <View style={styles.line_contaienr}>
                            <View style={styles.line_} />
                            <View style={styles.line_} />
                            <View style={styles.line_} />
                        </View>
                    </View>

                    <View>
                        <Text style={[styles.text_13, { fontFamily: 'RalewayBold' }]}>Risks are:</Text>
                        <Text style={styles.text_13}>1 You lose it</Text>
                        <Text style={styles.text_13}>2 You forget where you put it </Text>
                        <Text style={styles.text_13}>3 Someone else finds it</Text>
                    </View>
                    <Text style={[styles.text_13,]}><Text style={[{ fontFamily: 'RalewayBold' }]}>Other options:</Text> Doesn’t have to be paper </Text>
                    <View>
                        <Text style={[styles.text_13, { fontFamily: 'RalewayBold' }]}>Tips:</Text>
                        <Text style={styles.text_13}>1 Store in bank vault</Text>
                        <Text style={styles.text_13}>2 Store in a safe</Text>
                        <Text style={styles.text_13}>3 Store in multiple secret places</Text>
                    </View>
                </View>


            </ScrollView>
            <View style={styles.footer}>
                <View style={styles.button_container}>
                    <TouchableOpacity style={[styles.button_, { backgroundColor: Colors.PRIMARY }]} onPress={() => navigation.navigate('ShowPhrase')}>
                        <Text style={[styles.text_14, { color: Colors.WHITE }]}>Start</Text>
                    </TouchableOpacity>
                </View>
            </View>

        </SafeAreaView>
    )
}

export default SecureWalletAgree

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
    line_contaienr: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: scale(5),
        marginVertical: verticalScale(5)
    },
    line_: {
        backgroundColor: Colors.SUCCESS,
        height: scale(3),
        width: scale(30)
    },
    content_box: {
        marginVertical: verticalScale(20),
        borderWidth: 1,
        borderRadius: scale(10),
        borderColor: Colors.PRIMARY,
        paddingVertical: verticalScale(15),
        paddingHorizontal: moderateScale(10),
        gap: scale(10)
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