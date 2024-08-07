import { Image, Modal, Pressable, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, TouchableWithoutFeedback, View } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useNavigation, useRoute } from '@react-navigation/native';
import Colors from '../constents/Colors';
import { moderateScale, scale, verticalScale } from 'react-native-size-matters';
import { ICONS } from '../constents/Images';
import AntDesign from '@expo/vector-icons/AntDesign';
import * as Progress from 'react-native-progress';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import * as SecureStore from 'expo-secure-store';
import { ethers } from 'ethers';
import { INFURA_PROJECT_ID } from '../config/config';



const SendAmountConfirm = () => {
    const navigation = useNavigation();
    let route = useRoute();
    let data = route.params



    const [isFromAccountAddress, setIsFromAccountAddress] = useState('')
    const [isFromAccountName, setIsFromAccountName] = useState('')
    const [isFromAccountImage, setIsFromAccountImage] = useState('')

    const [isAccountAddress, setIsAccountAddress] = useState('')
    const [isAccountName, setIsAccountName] = useState('')
    const [isAccountImage, setIsAccountImage] = useState('')

    let accountOneAddress = `0xd45f34rgteg6gt4tret34erg54ter34tre43443f`

    let arrayData = [
        {
            accountName: 'Account 1',
            accountAddress: '0xqe134e324fgd56sdgf56hfg80dfgjfxnfe5y6r56',
            acoountImage: ''
        },
        {
            accountName: 'Account 2',
            accountAddress: '0xq346r45gd43fdgyegdy4ftr6tfu6rfh6rur4etre',
            acoountImage: ''
        }, {
            accountName: 'Account 3',
            accountAddress: '0xqe134e324fgd56sdgf56hfg80dfgjfxnfe5y6r56',
            acoountImage: ''
        },
        {
            accountName: 'Account 4',
            accountAddress: '0xq346r45gd43fdgyegdy4ftr6tfu6rfh6rur4etre',
            acoountImage: ''
        },

    ]

    let resetData = () => {
        setIsAccountAddress(null)
        setIsAccountName(null)
        setIsAccountImage(null)
    }

    const setFromWallet = async () => {
        // console.log(arrayData);
        setIsFromAccountAddress(data?.addresses?.from)
        setIsFromAccountName(arrayData[0]?.accountName)
        setIsFromAccountImage()
    }
    useEffect(() => {
        setFromWallet()
        fetchAddresses()
        gasEstimate()
    }, [])

    const [isPRivateKey, setPrivateKey] = useState('')
    const fetchAddresses = async () => {
        let result = await SecureStore.getItemAsync('ArrayPrivateKeys');
        if (result) {
            const keys = JSON.parse(result);
            setPrivateKey(keys)
        }
    };

    ////////////////////////////////////////////

    const TransactionModal = ({ visible, onClose }) => {
        const [progress, setProgress] = useState(0);
        useEffect(() => {
            HandleTimeLap()
            if (visible) {
                let interval;
                let start = Date.now();
                interval = setInterval(() => {
                    let elapsed = Date.now() - start;
                    let newProgress = Math.min(elapsed / 100000, 1); // Progress over 10 seconds
                    setProgress(newProgress);

                    if (newProgress === 1) {
                        clearInterval(interval);
                        onClose();
                    }
                }, 100);

                return () => clearInterval(interval);
            }

        }, [visible, onClose]);

        const [timer, setTimer] = useState("00:00");

        const HandleTimeLap = async () => {
            if (timer === "00:00") {
                var seconds = "100";
                var intervalId = window.setInterval(function () {
                    seconds--;

                    let minutes = Math.floor(seconds / 60);
                    let extraSeconds = seconds % 60;
                    minutes = minutes < 10 ? "0" + minutes : minutes;
                    extraSeconds = extraSeconds < 10 ? "0" + extraSeconds : extraSeconds;
                    var leftData = minutes + ":" + extraSeconds;
                    setTimer(leftData);

                    if (seconds == 0) {
                        stop();
                    }
                }, 1000);
            }
            let stop = () => clearInterval(intervalId);

        };


        return (
            <Modal
                transparent={true}
                animationType="slide"
                visible={visible}
                onRequestClose={onClose}
            >
                <TouchableWithoutFeedback onPress={onClose}>
                    <View style={styles.modalContainer}>
                        <TouchableWithoutFeedback>
                            <View style={styles.modalContent}>
                                <TouchableOpacity style={{ alignItems: 'flex-end' }} onPress={() => { onClose(); }}>
                                    <AntDesign name="close" size={scale(16)} color={Colors.WHITE} />
                                </TouchableOpacity>
                                <View style={{ alignItems: 'center', gap: scale(5) }}>
                                    <MaterialIcons name="timer" size={scale(30)} color={Colors.PRIMARY} />
                                    <Text style={styles.h3}>Submitting your transaction</Text>
                                    <View style={{ marginVertical: verticalScale(5) }}>
                                        <Progress.Bar progress={progress} width={scale(200)} />
                                    </View>
                                    <Text style={[styles.text_12_g, { fontFamily: 'LatoBold' }]}>Estimated completion {timer ? timer : '0:00'}</Text>
                                    <Text style={styles.text_13_pr}>View transaction</Text>
                                </View>
                            </View>
                        </TouchableWithoutFeedback>
                    </View>
                </TouchableWithoutFeedback >
            </Modal >
        );
    };

    const [modalVisible, setModalVisible] = useState(false);
    ///////////////////////////////////////////
    const INFURA_URL = `https://sepolia.infura.io/v3/${INFURA_PROJECT_ID}`;
    async function sendNativeCurrency() {

        const provider = new ethers.providers.JsonRpcProvider(INFURA_URL);
        const wallet = new ethers.Wallet(isPRivateKey[0]);
        const tx = {
            to: data?.addresses?.to,
            value: ethers.utils.hexlify(ethers.utils.parseEther(data?.isAmount))
        };
        const gasLimit = await provider.estimateGas({
            ...tx,
            from: wallet.address
        });




        // Get current gas price
        const gasPrice = await provider.getGasPrice();

        // Complete the transaction object
        tx.gasLimit = ethers.utils.hexlify(gasLimit);
        tx.gasPrice = ethers.utils.hexlify(gasPrice);
        tx.nonce = await provider.getTransactionCount(wallet.address);

        // Sign and send the transaction
        const signedTx = await wallet.signTransaction(tx, isPRivateKey);
        const sentTx = await provider.sendTransaction(signedTx);

        await sentTx.wait();
        console.log(`Transaction hash: ${sentTx.hash}`);
    }

    const [estimateGas, setEstimateGas] = useState(0)
    const gasEstimate = async () => {
        const provider = new ethers.providers.JsonRpcProvider(INFURA_URL);

        const wallet = new ethers.Wallet(isPRivateKey[0]);
        const tx = {
            to: data?.addresses?.to,
            value: ethers.utils.hexlify(ethers.utils.parseEther(data?.isAmount))
        };
        const gasLimit = await provider.estimateGas({
            ...tx,
            from: wallet.address
        });
        const gasPrice = await provider.getGasPrice();

        let gas = ethers.utils.formatUnits((gasLimit).toString()) * gasPrice;
        setEstimateGas(gas)

    }



    return (
        <SafeAreaView style={styles.root}>
            {/* header */}
            <View style={styles.header}>
                <View style={{ width: scale(40) }} />
                <View style={styles.content_center}>
                    <Text style={styles.text_14_w}>Confirm</Text>
                    <Text style={styles.text_12_g}>Ethereum Mainnet</Text>
                </View>
                <TouchableOpacity onPress={() => navigation.goBack()} style={styles.back_btn}>
                    <Text style={styles.text_13_pr}>Cancel</Text>
                </TouchableOpacity>
            </View>

            <View style={styles.content_}>
                <View style={styles.row_}>
                    <View style={styles.left_bar}>
                        <Text style={styles.text_14_w}>From:</Text>
                    </View>
                    <Pressable style={styles.bar_container}>
                        <View style={styles.bar_inner}>
                            <View style={styles.icon__}>
                                <Image source={ICONS.jsLogo} style={styles.icon} resizeMode='contain' />
                            </View>
                            <View style={{ width: '80%', gap: scale(1) }}>
                                <Text style={styles.text_14_w}>{isFromAccountName && isFromAccountName}</Text>
                                <TextInput
                                    placeholder='Search public address (0x), or ENS'
                                    placeholderTextColor={Colors.PLACEHOLDER}
                                    style={styles.input_}
                                    editable={false}
                                    value={data?.addresses?.from && (data?.addresses?.from).slice(0, 8) + '...' + (data?.addresses?.from).slice(-8)}
                                />
                            </View>
                        </View>
                        {/* <TouchableOpacity style={{ padding: scale(8), width: '15%' }} onPress={() => handlePresetModal()}>
                            <AntDesign name="down" size={scale(18)} color={Colors.WHITE} />
                        </TouchableOpacity> */}
                    </Pressable>
                </View>

                <View style={styles.row_}>
                    <View style={styles.left_bar}>
                        <Text style={styles.text_14_w}>To:</Text>
                    </View>
                    <View style={styles.bar_container}>
                        <View style={styles.bar_inner}>
                            <View style={styles.icon__}>
                                <Image source={ICONS.jsLogo} style={styles.icon} resizeMode='contain' />
                            </View>
                            <View style={{ width: '80%', gap: scale(1) }}>
                                <Text style={styles.text_14_w}>{'Account 2'}</Text>
                                <TextInput
                                    placeholder='Search public address (0x), or ENS'
                                    placeholderTextColor={Colors.PLACEHOLDER}
                                    style={styles.input_}
                                    value={data?.addresses?.to && (data?.addresses?.to).slice(0, 8) + '...' + (data?.addresses?.to).slice(-8)}
                                />
                            </View>
                        </View>


                    </View>
                </View>
            </View>
            <View style={styles.line__} />
            <ScrollView style={[styles.content_, { height: '70%', }]}>

                <View style={styles.info_bar__}>
                    <AntDesign name="infocirlce" size={scale(14)} color={Colors.WHITE} />
                    <Text style={[styles.text_12_g, { maxWidth: '80%' }]}>Not alerts received. Always do your own due diligencce before approving requests.</Text>
                    <TouchableOpacity style={styles.cancel_btn}>
                        <AntDesign name="close" size={scale(14)} color={Colors.WHITE} />
                    </TouchableOpacity>
                </View>

                <View style={styles.input_container}>
                    <Text style={styles.text_12_g}>AMOUNT</Text>
                    <Text style={styles.input__} >{(data?.isAmount) && (data?.isAmount)} ETH</Text>
                </View>
                <View style={[styles.bar_two_]}>
                    <View style={styles.row_}>
                        <Text style={styles.text_12_g}>Estimated changes</Text>
                        <AntDesign name="infocirlce" size={scale(12)} color={Colors.GRAY} />
                    </View>
                    <View style={styles.row_between}>
                        <View style={[styles.row_, { width: '53%' }]}>

                            <Text style={styles.text_12_g}>You send</Text>

                            <View style={styles.amount_reduce_bar}>
                                <Text style={styles.text_12_num}>{(data?.isAmount) && -(data?.isAmount)}</Text>
                            </View>

                        </View>

                        <View style={styles.contract_bar}>
                            <Text style={styles.text_12_num}>{isFromAccountAddress && (isFromAccountAddress).slice(0, 7) + '...' + (isFromAccountAddress).slice(-7)}</Text>
                        </View>
                    </View>

                </View>

                <View style={styles.gas_box}>
                    <View style={styles.row_between}>
                        <View style={styles.row_}>
                            <Text style={styles.text_12_g}>Estimated gas fee</Text>
                            <AntDesign name="infocirlce" size={scale(12)} color={Colors.GRAY} />
                        </View>
                        <Text style={[styles.text_13_pr, { fontFamily: 'LatoBold' }]}>{estimateGas && parseFloat(estimateGas).toFixed(5)} ETH</Text>
                    </View>

                    <View style={styles.row_between}>
                        <View style={{ width: '49%' }}>
                            <Text style={styles.text_success_12}>{`Likly in < 1 minute`}</Text>
                        </View>
                        <View style={{ width: '49%', alignItems: 'flex-end' }}>
                            <Text style={styles.text_12_w}>Max fee: <Text style={{ fontFamily: 'LatoRegular' }}>{estimateGas && parseFloat(estimateGas).toFixed(7)} ETH</Text></Text>
                        </View>
                    </View>

                    <View style={styles.line__} />
                    <View style={styles.row_between}>
                        <Text style={styles.text_12_g}>Total</Text>
                        <Text style={[styles.text_13_num_bold, { fontSize: scale(14) },]}>{parseFloat((data && data?.isAmount) + (estimateGas && estimateGas)).toFixed(7)} ETH</Text>
                    </View>
                    <Text style={[styles.text_13_num_bold, { alignSelf: 'flex-end', }]}>Max amount: <Text style={[styles.text_12_g, { fontFamily: 'LatoRegular' }]}> {parseFloat((data && data?.isAmount) + (estimateGas && estimateGas)).toFixed(7)} ETH</Text></Text>
                </View>

            </ScrollView>
            {/* footer button */}
            <View style={styles.footer}>
                <TouchableOpacity style={styles.button__}
                    onPress={() => {
                        sendNativeCurrency()
                        // setModalVisible(true);
                    }}>
                    <Text style={styles.button_txt}>Send</Text>
                </TouchableOpacity>
            </View>

            <TransactionModal visible={modalVisible} onClose={() => setModalVisible(false)} />
        </SafeAreaView>
    )
}

export default SendAmountConfirm

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
    text_12_w: {
        fontSize: scale(12),
        fontFamily: 'RalewayBold',
        color: Colors.WHITE
    },
    text_12_w: {
        fontSize: scale(12),
        fontFamily: 'LatoBold',
        color: Colors.WHITE,
    },
    text_13_pr: {
        fontSize: scale(13),
        fontFamily: 'RalewayBold',
        color: Colors.PRIMARY
    },
    text_13_b: {
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
    text_12_num: {
        fontSize: scale(12),
        fontFamily: 'LatoRegular',
        color: Colors.WHITE
    },
    text_13_num_bold: {
        fontSize: scale(13),
        fontFamily: 'LatoBold',
        color: Colors.WHITE
    },
    text_success_12: {
        color: Colors.SUCCESS,
        fontSize: scale(12),
        fontFamily: 'LatoRegular'
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
    row_between: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: '100%'
    },
    left_bar: {
        height: scale(55),
        width: '15%',
        justifyContent: 'center',
    },
    bar_container: {
        height: scale(55),
        width: '80%',
        borderWidth: 1,
        borderColor: Colors.GRAY,
        borderRadius: scale(5),
        paddingHorizontal: moderateScale(10),
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    amount_reduce_bar: {
        backgroundColor: Colors.DANGER_TRANS,
        paddingVertical: verticalScale(3),
        paddingHorizontal: moderateScale(10),
        borderRadius: scale(12),
        maxWidth: '60%'
    },
    contract_bar: {
        backgroundColor: Colors.TRANSPARENT,
        paddingVertical: verticalScale(5),
        paddingHorizontal: moderateScale(10),
        borderRadius: scale(12),
        width: '45%',
        alignItems: 'flex-end'
    },
    icon__: {
        width: scale(30),
        height: scale(30),
        borderRadius: scale(30 / 2),
        backgroundColor: Colors.GRAY,
        justifyContent: 'center',
        alignItems: 'center',
        overflow: 'hidden'
    },
    icon: {
        width: '100%',
        height: '100%',
    },
    bar_inner: {
        width: '83%',
        height: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        gap: scale(5)
    },
    input_: {
        fontSize: scale(12),
        fontFamily: 'RalewayBold',
        color: Colors.WHITE,
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
        alignItems: 'center'
    },
    input_container: {
        marginVertical: verticalScale(40),
        justifyContent: 'center',
        alignItems: 'center',
        gap: scale(10)
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
    line__: {
        width: '100%',
        backgroundColor: Colors.PLACEHOLDER,
        height: 1
    },
    info_bar__: {
        borderWidth: 1,
        borderColor: Colors.GRAY,
        borderRadius: scale(4),
        flexDirection: 'row',
        alignItems: 'center',
        width: '100%',
        gap: scale(10),
        paddingVertical: verticalScale(10),
        paddingHorizontal: moderateScale(10)
    },
    bar_two_: {
        borderWidth: 1,
        borderColor: Colors.GRAY,
        borderRadius: scale(4),
        width: '100%',
        gap: scale(10),
        paddingVertical: verticalScale(10),
        paddingHorizontal: moderateScale(10)
    },

    gas_box: {
        borderWidth: 1,
        borderColor: Colors.PLACEHOLDER,
        borderRadius: scale(4),
        width: '100%',
        gap: scale(10),
        paddingVertical: verticalScale(10),
        paddingHorizontal: moderateScale(10),
        marginVertical: verticalScale(10)
    },
    cancel_btn: {
        width: '10%',
        height: scale(30),
        borderRadius: scale(50),
        alignItems: 'center',
        justifyContent: 'center',
        // backgroundColor: 'red'
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

    ///
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContent: {
        width: scale(300),
        padding: scale(20),
        backgroundColor: Colors.BACKGROUND,
        borderRadius: scale(5),
    },
    h3: {
        fontFamily: 'RalewaySemiBold',
        fontSize: scale(14),
        color: Colors.WHITE
    },


})