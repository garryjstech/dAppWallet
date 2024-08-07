import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { moderateScale, scale, verticalScale } from 'react-native-size-matters'
import { ICONS } from '../constents/Images'
import Colors from '../constents/Colors'
import AntDesign from '@expo/vector-icons/AntDesign';





const WalletHeader = () => {
    return (
        <View style={styles.root}>

            <View style={styles.left_}>
                <Image source={ICONS.jsLogo} style={[styles.logo_style]} resizeMode='contain' />
            </View>

            <TouchableOpacity style={styles.center_content}>
                <View style={styles.dropdown_}>
                    <Image source={ICONS.logo_} style={{ width: scale(20), height: scale(20), borderRadius: scale(20 / 2) }} resizeMode='contain' />
                    <Text style={styles.network_text}>Ethereum Mainnet</Text>
                    <AntDesign name="down" size={scale(14)} color={Colors.WHITE} />
                </View>
            </TouchableOpacity>

            <TouchableOpacity style={styles.right_}>
                <Image source={ICONS.scanner_} style={styles.logo_style} resizeMode='contain' />
            </TouchableOpacity>

        </View>
    )
}

export default WalletHeader

const styles = StyleSheet.create({
    root: {
        paddingHorizontal: moderateScale(18),
        height: scale(50),
        // backgroundColor: 'gray',
        flexDirection: 'row',
        alignItems: 'center',
        width: '100%'
    },
    left_: {
        width: '10%',
    },
    logo_style: {
        width: scale(30),
        height: scale(30)
    },
    center_content: {
        width: '80%',
        justifyContent: 'center',
        alignItems: 'center'
    },
    right_: {
        width: '10%',
    },
    dropdown_: {
        borderWidth: 1,
        borderColor: Colors.PLACEHOLDER,
        paddingVertical: verticalScale(10),
        paddingHorizontal: moderateScale(15),
        borderRadius: scale(20),
        flexDirection: 'row',
        alignItems: 'center',
        gap: scale(10)
    },
    network_text: {
        color: Colors.WHITE,
        fontFamily: 'RalewaySemiBold',
        fontSize: scale(12)
    }
})