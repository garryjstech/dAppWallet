import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import Colors from '../constents/Colors'
import { moderateScale, scale } from 'react-native-size-matters'
import { IMAGES } from '../constents/Images'
import { useNavigation } from '@react-navigation/native'

const PhraseVerified = () => {
    const navigation = useNavigation();
    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.content}>
                <View style={styles.contentTop} />


                <View style={styles.contentBottom}>
                    <Image source={IMAGES.check_vector} resizeMode='contain' style={styles.image_} />
                    <Text style={styles.text_14}>Passphrase Verified</Text>
                    <Text style={styles.para_}>You have successfully created and secured your wallet. Please keep your Passphrase safe at all times. </Text>
                </View>

                <View style={styles.footer}>
                    <View style={styles.button_container}>
                        <TouchableOpacity style={[styles.button_, { backgroundColor: Colors.PRIMARY }]} onPress={() => navigation.navigate('BottomTabs')}>
                            <Text style={[styles.text_14,]}>Done</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>


        </SafeAreaView>
    )
}

export default PhraseVerified

const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: '100%',
        backgroundColor: Colors.BACKGROUND
    },
    content: {
        width: '100%',
        height: '100%',
    },
    contentTop: {
        width: '100%',
        height: '20%',
    },
    contentBottom: {
        width: '100%',
        height: '60%',
        alignItems: 'center',
        paddingHorizontal: moderateScale(50),
        gap: scale(20)
    },
    image_: {
        width: '40%',
        height: '40%'
    },
    text_14: {
        fontSize: scale(14),
        color: Colors.WHITE,
        fontFamily: 'RalewayBold'
    },
    para_: {
        fontSize: scale(12),
        color: Colors.WHITE,
        fontFamily: 'LatoRegular',
        lineHeight: scale(16),
        textAlign: 'center'
    },

    footer: {
        height: '26%',
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
    },
})