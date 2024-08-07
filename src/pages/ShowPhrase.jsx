import { FlatList, Image, Pressable, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import Colors from '../constents/Colors'
import { moderateScale, scale, verticalScale } from 'react-native-size-matters'
import { useNavigation } from '@react-navigation/native'
import { ICONS } from '../constents/Images'

const ShowPhrase = () => {
    const navigation = useNavigation();
    const [showPhrases, setShowPhrases] = useState(false)
    let phraseArray = [{ id: 1, value: 'this' }, { id: 2, value: 'is' }, { id: 3, value: 'the' }, { id: 4, value: 'demo' }, { id: 5, value: 'project' }, { id: 6, value: 'testing' }, { id: 7, value: 'of' }, { id: 8, value: 'web' }, { id: 9, value: 'three' }, { id: 10, value: 'wallet' }, { id: 11, value: 'mobile' }, { id: 12, value: 'app' },]





    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header_}>
                <Text style={styles.header_text_}>WEB3 WALLET</Text>
                <Text style={styles.text_14}>Write down your Secret Recovery Phrase</Text>
            </View>
            <ScrollView style={styles.content}>
                <Text style={[styles.paragraph, { textAlign: 'center' }]}>This is your Secret Recovery Phrase. Write it down on paper and keep it in a safe place. You’ll be asked to re-enter this Phrase (in order) on the next step.</Text>


                <View style={styles.content_box}>

                    {
                        !showPhrases ?
                            <>
                                <View style={{ alignItems: 'center', gap: scale(20) }}>
                                    <Image source={ICONS.hide_} resizeMode='contain' style={styles.icons_} />
                                    <Text style={styles.text_bold}>Tap to reveal your Secret Recovery Phrase</Text>
                                    <Text style={styles.text_12}>Make sure no one is watching your screen</Text>
                                    <Pressable style={styles.btn_} onPress={() => setShowPhrases(!showPhrases)}>
                                        <Text style={styles.text_14}>View</Text>
                                    </Pressable>
                                </View>
                            </>
                            :
                            <>
                                <View>
                                    <View style={styles.row}>
                                        {phraseArray.map((phrase) => (
                                            <View key={phrase.id} style={styles.box}>
                                                <Text style={styles.idText}>{phrase.id}.</Text>
                                                <Text style={styles.valueText}>{phrase.value}</Text>
                                            </View>
                                        ))}
                                    </View>
                                </View>

                                <View style={{ marginTop: scale(20) }}>
                                    <TouchableOpacity style={styles.button_}>
                                        <Text style={styles.text_bold}>Copy to Clipboard</Text>
                                    </TouchableOpacity>
                                </View>
                            </>
                    }

                </View>
                <View>
                    <Text style={{ color: Colors.DANGER, fontSize: scale(12), fontFamily: 'LatoRegular' }}>
                        * Do not store your phrase in your email or phone note app. Keep them safe and never share wih anybody.
                    </Text>
                </View>


            </ScrollView>
            <View style={styles.footer}>
                <View style={styles.button_container}>
                    <TouchableOpacity style={[styles.button_, { backgroundColor: Colors.PRIMARY }]} onPress={() => navigation.navigate('EnterPhrase')}>
                        <Text style={[styles.text_14, { color: Colors.WHITE }]}>Continue</Text>
                    </TouchableOpacity>
                </View>
            </View>

        </SafeAreaView>
    )
}

export default ShowPhrase

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
        width: scale(45),
        height: scale(45)
    },
    text_12: {
        fontSize: scale(12),
        color: Colors.WHITE,
        fontFamily: 'LatoBold'
    },
    text_bold: {
        fontSize: scale(14),
        color: Colors.WHITE,
        fontFamily: 'RalewayBold'
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
    btn_: {
        width: scale(100),
        height: scale(45),
        borderRadius: scale(5),
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: Colors.PRIMARY
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
    },


    row: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        alignItems: 'center',
    },
    box: {
        borderWidth: 1,
        borderColor: Colors.PRIMARY,
        padding: scale(5),
        borderRadius: scale(4),
        margin: scale(4),
        backgroundColor: 'transparent',
        flexDirection: 'row',
        alignItems: 'center'
    },
    idText: {
        fontSize: scale(14),
        color: Colors.WHITE,
        marginRight: scale(8),
        fontFamily: 'RalewaySemiBold'
    },
    valueText: {
        fontSize: scale(16),
        color: Colors.WHITE,
        fontFamily: 'RalewaySemiBold'
    },
})