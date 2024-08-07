import React, { useState } from 'react';
import { View, Text, FlatList, StyleSheet, Pressable, Image, ScrollView, Alert, TouchableOpacity } from 'react-native';
import PagerView from 'react-native-pager-view';
import Colors from '../constents/Colors';
import { moderateScale, scale, verticalScale } from 'react-native-size-matters';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { ICONS } from '../constents/Images';
import { useNavigation } from '@react-navigation/native';



const WalletSwipeTab = ({ tokens, nfts, balance }) => {
    // console.log('new Balance: ', balance);
    const navigation = useNavigation();
    const [tabIndex, setTabIndex] = useState(0);
    // Calculate total balance of tokens
    const totalBalance = tokens.reduce((acc, item) => acc + (item.usdt_blance || 0), 0);

    return (
        <View style={styles.root}>
            <View style={styles.tab_container}>


                <Pressable style={tabIndex === 0 ? styles.button_Active : styles.button_} onPress={() => setTabIndex(0)}>
                    <Text style={[styles.button_text, tabIndex === 0 && { color: Colors.PRIMARY }]}>Tokens</Text>
                </Pressable>

                <Pressable style={tabIndex === 1 ? styles.button_Active : styles.button_} onPress={() => setTabIndex(1)}>
                    <Text style={[styles.button_text, tabIndex === 1 && { color: Colors.PRIMARY }]}>NFTs</Text>
                </Pressable>
            </View>

            {
                tabIndex === 0 ?
                    <ScrollView style={{ marginBottom: scale(20), }} showsVerticalScrollIndicator={false}>
                        <View style={styles.header}>
                            <Text style={styles.balanceText}>${parseFloat(totalBalance).toFixed(5)}</Text>
                            <Pressable style={styles.portfolio_button} onPress={() => navigation.navigate('Browser')}>
                                <Text style={styles.portfolio_text}>Portfolio</Text>
                                <FontAwesome name="external-link" size={scale(14)} color={Colors.WHITE} />
                            </Pressable>
                        </View>

                        {tokens?.map((item, index) => {
                            return (
                                <TouchableOpacity key={index} style={styles.data_bar_container} onPress={() => navigation.navigate('ChartPage')}>
                                    <View style={styles.row__}>
                                        <Image source={ICONS.jsLogo} style={styles.icon_} resizeMode='contain' />
                                        <View style={{ gap: scale(5) }}>
                                            <Text style={styles.token_name}>{item?.name}</Text>
                                            <Text style={styles.token_blance}>{(item?.balance) ? (parseFloat(item?.balance).toFixed(5)) : 0} {item?.symbol}</Text>
                                        </View>
                                    </View>
                                    <Text style={styles.token_name}>${(item?.usdt_blance) ? (parseFloat(item?.usdt_blance).toFixed(5)) : 0}</Text>
                                </TouchableOpacity>
                            )
                        })}
                        <View style={styles.row}>
                            <Text style={styles.text_12_w}>Don't see your token? </Text>
                            <Text style={styles.text_12_p} onPress={() => Alert.alert('import tokens')}>Import tokens</Text>
                        </View>
                    </ScrollView>
                    :
                    tabIndex === 1 ?
                        <>
                            {
                                nfts?.map((item, index) => {
                                    console.log('getting nfts in tab data: ', item);
                                    return (
                                        <View key={index}>
                                            <Text>{item?.id}</Text>
                                            <Text>{item?.name}</Text>
                                        </View>
                                    )
                                })}</>
                        : null}

        </View>
    )
}

export default WalletSwipeTab

const styles = StyleSheet.create({
    root: {
        flex: 1
    },
    tab_container: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',

    },
    button_contaienr: {
        height: scale(50),
        width: '48%',
        alignItems: 'center',
        justifyContent: 'center'
    },
    button_: {
        height: scale(45),
        width: '48%',
        alignItems: 'center',
        justifyContent: 'center'

    },
    line_: {
        height: scale(1),
        width: scale(100),
        backgroundColor: Colors.PRIMARY
    },
    button_Active: {
        borderBottomWidth: scale(2),
        borderBottomColor: Colors.PRIMARY,
        height: scale(45),
        width: '48%',
        alignItems: 'center',
        justifyContent: 'center'

    },
    button_text: {
        color: Colors.WHITE,
        fontFamily: 'RalewaySemiBold',
        fontSize: scale(14)
    },

    header: {
        paddingVertical: verticalScale(10),
        marginVertical: verticalScale(10),
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    balanceText: {
        fontSize: scale(20),
        fontFamily: 'LatoBold',
        color: Colors.WHITE,
    },
    portfolio_button: {
        borderWidth: 1,
        borderColor: Colors.PRIMARY,
        paddingHorizontal: moderateScale(10),
        borderRadius: scale(20),
        height: scale(35),
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: scale(10)
    },
    portfolio_text: {
        color: Colors.WHITE,
        fontSize: scale(12),
        fontFamily: 'LatoBold'
    },

    data_bar_container: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        height: scale(60),
        width: '100%',
        // backgroundColor: 'cyan',
        marginBottom: scale(10)
    },
    row__: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: scale(10)
    },
    row: {
        justifyContent: 'center',
        flexDirection: 'row',
        alignItems: 'center',
    },
    icon_: {
        width: scale(30),
        height: scale(30),
        borderRadius: scale(30 / 2),
        backgroundColor: Colors.GRAY
    },
    token_name: {
        color: Colors.WHITE,
        fontFamily: 'LatoBold',
        fontSize: scale(14)
    },
    token_blance: {
        color: Colors.PLACEHOLDER,
        fontFamily: 'LatoBold',
        fontSize: scale(13),
        textTransform: 'uppercase'
    },
    text_12_w: {
        color: Colors.WHITE,
        fontFamily: 'RalewaySemiBold',
        fontSize: scale(12)
    },
    text_12_p: {
        color: Colors.PRIMARY,
        fontFamily: 'RalewaySemiBold',
        fontSize: scale(12)
    }


})