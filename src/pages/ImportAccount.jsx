import { ActivityIndicator, Animated, Modal, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import Colors from '../constents/Colors'
import { moderateScale, scale, verticalScale } from 'react-native-size-matters'
import AntDesign from '@expo/vector-icons/AntDesign';
import { useNavigation } from '@react-navigation/native'
import { AppName } from '../config/config'
import { ethers } from 'ethers'
import { useAlert } from '../contexts/ToasterContext'
import * as SecureStore from 'expo-secure-store';


const ImportAccount = () => {
    let navigation = useNavigation();
    const [isKey, setIsKey] = useState('');
    const [loading, setLoading] = useState(false);
    const [modalVisible, setModalVisible] = useState(false);
    const fadeAnim = useRef(new Animated.Value(0)).current;
    const { showError } = useAlert();
    const openModal = () => {
        setModalVisible(true);
        Animated.timing(fadeAnim, { toValue: 1, duration: 300, useNativeDriver: true }).start();
    };
    const closeModal = () => {
        Animated.timing(fadeAnim, { toValue: 0, duration: 300, useNativeDriver: true }).start(() => setModalVisible(false));
    };

    useEffect(() => {
        let timer;
        if (modalVisible) {
            timer = setTimeout(closeModal, 2400);
        }
        return () => clearTimeout(timer);
    }, [modalVisible]);

    // generate random images
    const generateRandomString = () => {
        return Math.random().toString(36).substring(7);
    };
    const refreshImage = () => {
        const imageUrl = `https://robohash.org/${generateRandomString()}.png`;
        console.log({ imageUrl });
        // setRandomString(generateRandomString());
        return imageUrl
    };

    // Function to store the new address in SecureStore
    const storeAddress = async (address) => {
        const accountImage = refreshImage();
        const storedAddresses = JSON.parse(await SecureStore.getItemAsync('ArrayAddress')) || [];
        const currentImages = JSON.parse(await SecureStore.getItemAsync("ArrayImage")) || [];

        const updatedAddresses = [...storedAddresses, address];
        const updatedImages = [...currentImages, accountImage];

        await SecureStore.setItemAsync('ArrayAddress', JSON.stringify(updatedAddresses));
        await SecureStore.setItemAsync("ArrayImage", JSON.stringify(updatedImages));
    };

    // Main function to import the wallet
    const getWallet = async () => {
        if (isKey) {
            setLoading(true);
            try {
                const wallet = new ethers.Wallet(isKey);
                console.log("wallet.........", wallet);

                // Store the address in SecureStore
                await storeAddress(wallet.address);

                // Open success modal
                openModal();
                navigation.goBack()
            } catch (error) {
                console.error('Error importing wallet:', error.message);
            } finally {
                setLoading(false);
            }
        } else {
            showError("Please provide private key.")
        }
    };

    return (
        <SafeAreaView style={styles.root}>

            <View style={styles.section_1}>
                <View style={styles.header}>
                    <TouchableOpacity style={styles.back_btn} onPress={() => navigation.goBack()}>
                        <AntDesign name="close" size={scale(20)} color={Colors.WHITE} />
                    </TouchableOpacity>
                </View>

                <View style={styles.content_}>
                    <View style={{ gap: scale(20) }}>
                        <AntDesign name="download" size={scale(32)} color={Colors.GRAY} />
                        <Text style={styles.text_24}>Import Account</Text>
                        <View style={{ paddingRight: scale(40) }}>
                            <Text style={styles.text_13}>Imorted accounts are viewable in your wallet but are not recoverable with your {`AppName`} Secret Recovery Phrase.</Text>
                        </View>
                        <Text style={styles.text_13}>Learn more about imported accounts here.</Text>
                    </View>
                </View>
            </View>

            <View style={styles.section_2}>
                <Text style={styles.text_16_bold}>Paste your private key string</Text>
                <View style={styles.input_container}>
                    <TextInput
                        style={styles.textarea}
                        multiline
                        numberOfLines={4}
                        value={isKey}
                        onChangeText={setIsKey}
                        placeholder="e.g. 3a104....fe4fy"
                        placeholderTextColor={Colors.PLACEHOLDER}
                    />
                </View>
                <TouchableOpacity style={styles.scan_btn}>
                    <Text style={styles.text_14}>or Scan a QR code</Text>
                </TouchableOpacity>
            </View>

            {modalVisible && (
                <Modal
                    transparent={true}
                    animationType="none"
                    visible={modalVisible}
                    onRequestClose={closeModal}
                >
                    <View style={styles.modalBackground}>
                        <Animated.View style={[styles.modalContainer, { opacity: fadeAnim }]}>
                            <AntDesign name="checkcircleo" size={scale(44)} color={Colors.SUCCESS} />
                            <View>
                                <Text style={styles.modalText}>Account </Text>
                                <Text style={styles.modalText}>successfully </Text>
                                <Text style={styles.modalText}>imported!</Text>
                            </View>
                            <Text style={styles.text_11}>You'll now be able to view your account in {AppName}. </Text>
                        </Animated.View>
                    </View>
                </Modal>
            )}


            <View style={styles.footer}>
                <TouchableOpacity style={styles.button__} disabled={loading} onPress={getWallet}>
                    {loading ?
                        <ActivityIndicator size={'small'} color={Colors.BLACK} />
                        : <Text style={styles.button_txt}>Import</Text>}
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    )
}

export default ImportAccount

const styles = StyleSheet.create({
    root: {
        width: '100%',
        height: '100%',
        backgroundColor: Colors.BACKGROUND
    },
    header: {
        alignItems: 'flex-end',
        marginVertical: verticalScale(20),
        paddingHorizontal: moderateScale(16)
    },
    back_btn: {
        width: scale(35),
        height: scale(35),
        borderRadius: scale(30),
        backgroundColor: Colors.TRANSPARENT,
        justifyContent: 'center',
        alignItems: 'center'
    },
    content_: {
        paddingHorizontal: moderateScale(16)
    },
    section_1: {
        height: '50%',
        backgroundColor: Colors.SECONDRY
    },
    section_2: {
        height: '50%',
        paddingVertical: verticalScale(20),
        paddingHorizontal: moderateScale(16)
    },
    text_24: {
        fontSize: scale(24),
        fontFamily: 'RalewaySemiBold',
        color: Colors.WHITE,
        letterSpacing: 1.4
    },
    text_11: {
        fontSize: scale(11),
        color: Colors.GRAY_05,
        fontFamily: 'RalewaySemiBold',
        letterSpacing: 1,
        lineHeight: scale(14)
    }, text_13: {
        fontSize: scale(12),
        color: Colors.GRAY_05,
        fontFamily: 'RalewaySemiBold',
        letterSpacing: 1.1,
        lineHeight: scale(14)
    },
    text_14: {
        fontSize: scale(13),
        color: Colors.PRIMARY,
        fontFamily: 'RalewaySemiBold',
    },
    text_16_bold: {
        fontSize: scale(16),
        color: Colors.WHITE,
        fontFamily: 'RalewayBold',
    },
    input_container: {
        height: scale(100),
        borderColor: Colors.PLACEHOLDER,
        borderWidth: 1,
        borderRadius: scale(4),
        marginVertical: verticalScale(15),
        justifyContent: 'center',
    },
    textarea: {
        padding: scale(10),
        fontSize: scale(12),
        fontFamily: 'LatoBold',
        color: Colors.WHITE,
        letterSpacing: 1,
    },
    scan_btn: {
        justifyContent: 'center',
        alignItems: 'center',
        marginVertical: verticalScale(10),
        paddingVertical: verticalScale(5)
    },
    //
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

    //
    modalBackground: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.2)', // Black transparent background
        // borderRadius: scale(10)
    },
    modalContainer: {
        width: '90%',
        padding: scale(20),
        marginHorizontal: moderateScale(20),
        justifyContent: 'center',
        alignItems: 'flex-start',
        backgroundColor: Colors.BLACK,
        gap: scale(10),
        borderRadius: scale(10)
    },
    modalText: {
        fontSize: scale(20),
        color: Colors.WHITE,
        fontFamily: 'RalewaySemiBold',
        textAlign: 'left'
    },
})