import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import Colors from '../constents/Colors'
import { ICONS } from '../constents/Images'
import { moderateScale, scale, verticalScale } from 'react-native-size-matters'
import Checkbox from 'expo-checkbox';
import { useNavigation } from '@react-navigation/native'



const Agreement = () => {
    const navigation = useNavigation();
    const [isChecked, setChecked] = useState(false);
    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header_}>
                <Image source={ICONS.jsLogo} style={styles.logo_} />
                <Text style={styles.header_text_}>WEB3 WALLET</Text>
            </View>

            <ScrollView style={styles.content}>
                <View style={{ paddingVertical: verticalScale(10), gap: scale(10) }}>
                    <Text style={styles.text_14}>Help us improve Web3 Wallet</Text>
                    <Text style={styles.text_13}>We'd like to gather basic usage data toimprove Web3 Wallet. Know that we never sellthe data you provide here.</Text>
                </View>


                <View style={{ paddingVertical: verticalScale(10) }}>
                    <Text style={styles.text_14}>When we gather metrics, it will always</Text>

                    <View style={styles.points_}>
                        <Image source={ICONS.check_} style={styles.icons_} resizeMode='contain' />
                        <Text style={styles.para_}><Text style={styles.text_bold}>Private: </Text>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quasi ad, laboriosam recusandae ratione enim pariatur.</Text>
                    </View>

                    <View style={styles.points_}>
                        <Image source={ICONS.check_} style={styles.icons_} resizeMode='contain' />
                        <Text style={styles.para_}><Text style={styles.text_bold}>General: </Text>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Suscipit iusto sint, recusandae odio voluptatem sed.</Text>
                    </View>

                    <View style={styles.points_}>
                        <Image source={ICONS.check_} style={styles.icons_} resizeMode='contain' />
                        <Text style={styles.para_}><Text style={styles.text_bold}>Optional: </Text>Lorem ipsum dolor sit amet consectetur adipisicing elit. Nemo id, praesentium incidunt sed accusantium laudantium!</Text>
                    </View>
                </View>

                <View style={styles.points_}>
                    <Checkbox
                        style={styles.checkbox}
                        value={isChecked}
                        onValueChange={setChecked}
                        color={isChecked ? Colors.PRIMARY : undefined}
                    />
                    <Text style={styles.text_13}>We’ll use this data to learn how you interact with our marketing communications. we may share relavent news (like product features).</Text>

                </View>
            </ScrollView>
            <View style={styles.footer_}>
                <View style={styles.row_}>

                    <TouchableOpacity style={styles.button_}>
                        <Text style={styles.text_14}>No Thanks</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={[styles.button_, { backgroundColor: Colors.PRIMARY }]} onPress={() => navigation.navigate('NewWallet')}>
                        <Text style={[styles.text_14, { color: Colors.WHITE }]}>I agree</Text>
                    </TouchableOpacity>
                </View>
            </View>

        </SafeAreaView>
    )
}

export default Agreement

const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: '100%',
        backgroundColor: Colors.BACKGROUND
    },
    header_: {
        paddingHorizontal: moderateScale(20),
        height: scale(50),
        flexDirection: 'row',
        alignItems: 'center',
        gap: scale(15),
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
    para_: {
        fontSize: scale(11),
        color: Colors.WHITE,
        fontFamily: 'LatoRegular',
        lineHeight: scale(16)
    },
    points_: {
        paddingVertical: verticalScale(10),
        flexDirection: 'row',
        gap: scale(8)
    },
    footer_: {
        height: scale(100),
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: scale(20)
    },
    row_: {
        flexDirection: 'row',
        alignItems: 'center',
        width: '100%',
        justifyContent: 'space-between'
    },
    button_: {
        width: '48%',
        height: scale(45),
        borderColor: Colors.PRIMARY,
        borderWidth: 1,
        borderRadius: scale(5),
        justifyContent: 'center',
        alignItems: 'center'
    }
})