import { ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import Colors from '../constents/Colors'
import { moderateScale, scale, verticalScale } from 'react-native-size-matters'
import { useNavigation, useRoute } from '@react-navigation/native'
import AntDesign from '@expo/vector-icons/AntDesign';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { INFURA_PROJECT_ID } from '../config/config'
import { ethers } from 'ethers';
import { useAlert } from '../contexts/ToasterContext'




const SendAmmount = () => {
    // wallet -> '0x87daB07Ec49e2eBdC126747FfA39488411b0d620' (ojha)
    // newWallet from -> '0xD8cF8aB0f60DBe5F1EdB9F27f98e54281D7933Bc'
    // newWallet to -> '0x4724D331c92620A110980642ba4B5EA695bdE298'

    const navigation = useNavigation();
    let route = useRoute();
    let addresses = route.params;
    const { showError } = useAlert();

    const [isAmount, setIsAmount] = useState(0);
    const [isWallet, setWallet] = useState('');
    const [balance, setBalance] = useState(0);
    const [tokenDetails, setTokenDetails] = useState();

    const INFURA_URL = `https://sepolia.infura.io/v3/${INFURA_PROJECT_ID}`;

    useEffect(() => {
        setWallet(addresses.from);
        fetchBalance(addresses.from);
        getCoinBalance();
    }, [addresses]);

    const getCoinBalance = async () => {
        let URL = `https://api.binance.com/api/v3/ticker/price?symbol=ETHUSDT`;
        try {
            let response = await fetch(URL);
            let data = await response.json();
            setTokenDetails(data);
        } catch (error) {
            console.error("Error fetching token details:", error);
        }
    };

    const fetchBalance = async (walletAddress) => {
        try {
            let infuraProvider = new ethers.providers.JsonRpcProvider(INFURA_URL);
            const balance = await infuraProvider.getBalance(walletAddress);
            setBalance(ethers.utils.formatEther(balance));
        } catch (error) {
            console.error('Error fetching balance:', error);
        }
    };

    // console.log({ addresses });
    const handleNextPage = async () => {
        // console.log("isAmount==>", isAmount);

        if (addresses === "" || addresses === null || addresses === undefined || (isAmount === 0)) {
            showError('Amount should be greater then 0')
        } else {
            navigation.navigate('SendAmountConfirm', { addresses, isAmount })
        }
    }


    return (
        <>
            <SafeAreaView style={styles.root}>

                {/* header */}
                <View style={styles.header}>
                    <View style={{ width: scale(40) }} />
                    <View style={styles.content_center}>
                        <Text style={styles.text_14_w}>Amount</Text>
                        <Text style={styles.text_12_g}>Ethereum Mainnet</Text>
                    </View>
                    <TouchableOpacity onPress={() => navigation.goBack()} style={styles.back_btn}>
                        <Text style={styles.text_13_pr}>Cancel</Text>
                    </TouchableOpacity>
                </View>

                <ScrollView style={styles.content_}>

                    <View style={styles.top_bar}>
                        <View style={{ width: '33%' }}></View>

                        <TouchableOpacity style={{ width: '33%', alignItems: 'center' }}>
                            <View style={styles.select_box}>
                                <Text style={[styles.text_13_w, { textTransform: 'uppercase' }]}>ETH</Text>
                                <AntDesign name="down" size={scale(14)} color={Colors.BLACK} />
                            </View>
                        </TouchableOpacity>

                        <TouchableOpacity style={{ width: '33%', alignItems: 'flex-end' }} onPress={() => setIsAmount(balance)}>
                            <Text style={styles.text_13_pr}>USE MAX</Text>
                        </TouchableOpacity>
                    </View>

                    <View style={styles.input_container}>
                        <TextInput
                            placeholder='0'
                            placeholderTextColor={Colors.PLACEHOLDER}
                            style={styles.input__}
                            onChangeText={(val) => setIsAmount(val)}

                        >{isAmount && parseFloat(isAmount).toFixed(3)}</TextInput>
                    </View>

                    <View style={{ justifyContent: 'center', alignItems: 'center', gap: scale(10) }}>

                        <TouchableOpacity style={styles.input_bar}>
                            <TextInput placeholder='$0.00' placeholderTextColor={Colors.PLACEHOLDER} style={styles.currency_amount} value={tokenDetails && `$` + parseFloat((tokenDetails?.price) * isAmount).toFixed(3)} />
                            <MaterialIcons name="swap-vert" size={scale(14)} color={Colors.PRIMARY} />
                        </TouchableOpacity>


                        <Text style={styles.text_12_gLato}>Balance: {balance && parseFloat(balance).toFixed(5)} ETH</Text>

                    </View>

                    {/* warrninig message */}
                    {balance == 0 &&
                        <TouchableOpacity style={styles.warrning_contianer}>
                            <Text style={styles.text_10_w}>insufficient funds</Text>
                            <Text style={styles.text_12_bold}>Buy more</Text>
                        </TouchableOpacity>
                    }



                </ScrollView>

                {/* footer button */}
                <View style={styles.footer}>
                    <TouchableOpacity style={styles.button__} onPress={handleNextPage}>
                        <Text style={styles.button_txt}>Next</Text>
                    </TouchableOpacity>
                </View>
            </SafeAreaView>
        </>
    )
}

export default SendAmmount

const styles = StyleSheet.create({
    root: {
        width: '100%',
        height: '100%',
        backgroundColor: Colors.BACKGROUND
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: moderateScale(16),
        height: scale(50)
    },
    content_center: {
        justifyContent: 'center',
        alignItems: 'center',
        gap: scale(5)
    },
    back_btn: {
        width: scale(50),
        height: scale(50),
        justifyContent: 'center',
        alignItems: 'center',
    },
    text_10_w: {
        fontSize: scale(10),
        color: Colors.WHITE,
        fontFamily: "RalewaySemiBold"
    },
    text_12_g: {
        fontSize: scale(12),
        fontFamily: 'RalewaySemiBold',
        color: Colors.GRAY_05
    },
    text_12_bold: {
        fontSize: scale(12),
        color: Colors.WHITE,
        fontFamily: "RalewayExtraBold",
        textDecorationLine: 'underline'
    },
    text_12_gLato: {
        fontSize: scale(12),
        fontFamily: 'LatoRegular',
        color: Colors.GRAY_05
    },
    text_13_pr: {
        fontSize: scale(13),
        fontFamily: 'RalewayBold',
        color: Colors.PRIMARY
    },
    text_13_w: {
        fontSize: scale(12),
        fontFamily: 'LatoBold',
        color: Colors.BLACK,
    },
    text_14_w: {
        fontSize: scale(14),
        fontFamily: 'RalewayBold',
        color: Colors.WHITE
    },
    text_14_num: {
        fontSize: scale(14),
        fontFamily: 'LatoBlack',
        color: Colors.WHITE
    },
    text_16_w: {
        fontSize: scale(16),
        fontFamily: 'RalewayBold',
        color: Colors.WHITE
    },
    content_: {
        paddingHorizontal: moderateScale(16),
        paddingVertical: verticalScale(10),
        gap: scale(10)
    },
    row_: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: scale(10)
    },
    select_box: {
        backgroundColor: Colors.PRIMARY,
        height: scale(25),
        paddingHorizontal: moderateScale(10),
        borderRadius: scale(25 / 2),
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row', gap: scale(8)
    },
    top_bar: {
        width: '100%',
        height: scale(20),
        flexDirection: 'row',
        alignItems: 'center', marginTop: scale(10)
    },
    input_container: {
        marginVertical: verticalScale(20),
    },
    input__: {
        fontSize: scale(30),
        fontFamily: 'LatoBold',
        color: Colors.WHITE,
        textAlign: 'center',
    },

    input_bar: {
        borderWidth: 1,
        borderColor: Colors.GRAY,
        paddingVertical: verticalScale(2),
        paddingHorizontal: moderateScale(10),
        borderRadius: scale(8),
        flexDirection: 'row',
        alignItems: 'center'

    },
    currency_amount: {
        fontSize: scale(12),
        fontFamily: 'LatoBold',
        color: Colors.WHITE,
        textAlign: 'center',

    },
    warrning_contianer: {
        borderWidth: 1,
        borderColor: Colors.DANGER,
        backgroundColor: Colors.DANGER_TRANS,
        marginHorizontal: moderateScale(30),
        padding: scale(5),
        borderRadius: scale(10),
        alignItems: 'center',
        justifyContent: 'center',
        marginVertical: verticalScale(30)
    },



    footer: {
        paddingHorizontal: moderateScale(16),
        position: 'absolute',
        bottom: scale(20),
        left: 0,
        right: 0
    },
    button__: {
        borderRadius: scale(50 / 2),
        backgroundColor: Colors.PRIMARY,
        height: scale(40),
        justifyContent: 'center',
        alignItems: 'center'
    },
    button_txt: {
        color: Colors.BLACK,
        fontSize: scale(14),
        fontFamily: 'RalewaySemiBold'
    },
})