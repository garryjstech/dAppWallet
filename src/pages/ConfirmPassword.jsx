import { StyleSheet, Switch, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import Colors from '../constents/Colors'
import { moderateScale, scale, verticalScale } from 'react-native-size-matters'
import Checkbox from 'expo-checkbox';
import { useNavigation } from '@react-navigation/native'

const ConfirmPassword = () => {
    const navigation = useNavigation();
    return (
        <SafeAreaView style={styles.container}>

            <View style={styles.header_}>
                <Text style={styles.header_text_}>Confirm your password</Text>
                <Text style={styles.text_13}>Before continuing we need you to confirm your password</Text>
            </View>

            <View style={styles.input_fields}>
                <View style={styles.input_box}>
                    <View style={styles.row_between}>
                        <Text style={styles.lebel_}>Password</Text>
                        {/* <Text style={styles.lebel_}>Show</Text> */}
                    </View>
                    <View style={styles.input_container}>
                        <TextInput placeholder='Password' placeholderTextColor={Colors.PLACEHOLDER} />
                    </View>
                    <Text style={styles.danger_text}>Must be at least 8 charactors.</Text>
                </View>

            </View>

            <View style={styles.footer}>
                <View style={styles.button_container}>
                    <TouchableOpacity style={[styles.button_, { backgroundColor: Colors.PRIMARY }]} onPress={() => navigation.navigate('ShowPhrase')}>
                        <Text style={styles.text_14}>Submit</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </SafeAreaView>
    )
}

export default ConfirmPassword

const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: '100%',
        backgroundColor: Colors.BACKGROUND
    },
    header_: {
        marginTop: scale(15),
        justifyContent: 'space-between',
        alignItems: 'center',
        height: '12%',
        paddingHorizontal: moderateScale(60),
    },
    header_text_: {
        fontSize: scale(14),
        fontFamily: 'RalewayBold',
        textAlign: 'center',
        color: Colors.WHITE
    },
    text_13: {
        fontSize: scale(12),
        fontFamily: 'RalewaySemiBold',
        textAlign: 'center',
        color: Colors.WHITE
    },
    text_14: {
        fontSize: scale(14),
        color: Colors.WHITE,
        fontFamily: 'RalewaySemiBold',
    },
    lebel_: {
        fontSize: scale(13),
        fontFamily: 'RalewaySemiBold',
        color: Colors.WHITE
    },

    input_fields: {
        height: '70%',
        paddingHorizontal: moderateScale(20),
        paddingVertical: verticalScale(15),
        gap: scale(10)
        // backgroundColor: 'cyan',
    },
    input_box: {
        // backgroundColor: 'cyan',
        marginVertical: verticalScale(10),
        gap: scale(5)
    },
    row_between: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: scale(10),
        // backgroundColor: 'cyan'
    },
    input_container: {
        borderWidth: 1,
        borderColor: Colors.PRIMARY,
        height: scale(45),
        borderRadius: scale(5),
        justifyContent: 'center',
        paddingHorizontal: moderateScale(10)
    },
    danger_text: {
        color: Colors.DANGER,
        fontSize: scale(11),
        fontStyle: 'italic',
        fontFamily: 'RalewaySemiBold',
    },
    checkbox: {
        marginRight: scale(10),
        marginTop: scale(5),
        borderColor: Colors.PRIMARY
    },
    para_: {
        fontSize: scale(12),
        fontFamily: 'RalewaySemiBold',
        color: Colors.WHITE,
        marginRight: scale(30),
        lineHeight: scale(18)
    },




    footer: {
        height: '18%',
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