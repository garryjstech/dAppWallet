import { ActivityIndicator, Alert, StyleSheet, Switch, Text, TextInput, TouchableOpacity, View } from 'react-native';
import React, { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { moderateScale, scale, verticalScale } from 'react-native-size-matters';
import Colors from '../constents/Colors';
import { useNavigation } from '@react-navigation/native';
import { ethers } from 'ethers';
import * as SecureStore from 'expo-secure-store';
import { useAlert } from '../contexts/ToasterContext';

const ImportPharse = () => {
    const navigation = useNavigation();
    const [isEnabled, setIsEnabled] = useState(false);
    const toggleSwitch = () => setIsEnabled(previousState => !previousState);
    const [showPhrase, setShowPhrase] = useState(true);
    const [showPass, setShowPass] = useState(true);
    const [showConfirmPass, setShowConfirmPass] = useState(true);

    const [isPhrase, setIsPhrase] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const [error, setError] = useState('');
    const [errorPass, setPassError] = useState('');
    const [matchError, setMatchError] = useState('');

    const [walletData, setWalletData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [isPrivateKey, setPrivateKey] = useState([]);
    const [isPublicKey, setPublicKey] = useState([]);
    const [walletAddresses, setWalletAddresses] = useState([]);

    const { showError, showSuccess, showInfo } = useAlert();
    const handleSubmit = async () => {
        setError('');
        setPassError('');
        setMatchError('');

        if (!isPhrase) {
            setError('Secret Phrase is required.');
            return;
        }

        if (password.length === 0) {
            setPassError('Password is required.');
            return;
        }

        if (password !== confirmPassword) {
            setMatchError('Passwords do not match.');
            return;
        }

        try {
            const walletDetails = await importWallet(isPhrase);
            setWalletData(walletDetails);
            await SecureStore.setItemAsync('apppassword', password);
            console.log('Wallet Data:', walletDetails);
            showSuccess('Account recover successfully!')
            navigation.navigate('BottomTabs')
        } catch (error) {
            showError(error.message)
            console.log('Error importing wallet:', error.message);
        }
    };

    const importWallet = async (phrase) => {
        try {
            setLoading(true);
            const wallet = ethers.Wallet.fromMnemonic(phrase);
            const walletData = {
                address: wallet.address,
                privateKey: wallet.privateKey,
                mnemonic: wallet.mnemonic.phrase,
                publicKey: wallet.publicKey,
            };
            setPrivateKey(prevKeys => {
                const updatedPrivateKeys = [...prevKeys, walletData.privateKey];
                SecureStore.setItemAsync("ArrayPrivateKeys", JSON.stringify(updatedPrivateKeys));
                return updatedPrivateKeys;
            });
            setPublicKey(prevKeys => {
                const updatedPublicKeys = [...prevKeys, walletData.publicKey];
                SecureStore.setItemAsync("ArrayPublicKeys", JSON.stringify(updatedPublicKeys));
                return updatedPublicKeys;
            });
            setWalletAddresses(prevAddresses => {
                const updatedAddresses = [...prevAddresses, walletData.address];
                SecureStore.setItemAsync("ArrayAddress", JSON.stringify(updatedAddresses));
                return updatedAddresses;
            });
            setLoading(false);
            return walletData;
        } catch (error) {
            setLoading(false);
            throw error;
        }
    };

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header_}>
                <Text style={styles.header_text_}>Import from Secret Recovery Phrase</Text>
            </View>

            <View style={styles.input_fields}>
                <View style={styles.input_box}>
                    <View style={styles.row_between}>
                        <Text style={styles.lebel_}>Secret Recovery Phrase</Text>
                    </View>
                    <View style={styles.input_container}>
                        <TextInput
                            style={styles.input_}
                            placeholder='Secret Phrase'
                            placeholderTextColor={Colors.PLACEHOLDER}
                            onChangeText={(val) => setIsPhrase(val)}
                            value={isPhrase}
                        />
                    </View>
                    <Text style={styles.danger_text}>{error && error}</Text>
                </View>

                <View style={styles.input_box}>
                    <View style={styles.row_between}>
                        <Text style={styles.lebel_}>New Password</Text>
                        <Text style={styles.lebel_} onPress={() => setShowPass(!showPass)}>{!showPass ? 'hide' : 'Show'}</Text>
                    </View>
                    <View style={styles.input_container}>
                        <TextInput
                            style={styles.input_}
                            placeholder='Password'
                            placeholderTextColor={Colors.PLACEHOLDER}
                            value={password}
                            onChangeText={(val) => setPassword(val)}
                            secureTextEntry={showPass}
                        />
                    </View>
                    <Text style={styles.danger_text}>{errorPass && errorPass}</Text>
                </View>

                <View style={styles.input_box}>
                    <View style={styles.row_between}>
                        <Text style={styles.lebel_}>Confirm Password</Text>
                        <Text style={styles.lebel_} onPress={() => setShowConfirmPass(!showConfirmPass)}>{!showConfirmPass ? 'hide' : 'Show'}</Text>
                    </View>
                    <View style={styles.input_container}>
                        <TextInput
                            style={styles.input_}
                            placeholder='Confirm Password'
                            placeholderTextColor={Colors.PLACEHOLDER}
                            value={confirmPassword}
                            onChangeText={(val) => setConfirmPassword(val)}
                            secureTextEntry={showConfirmPass}
                        />
                    </View>
                    <Text style={styles.danger_text}>{matchError && matchError}</Text>
                </View>

                <View style={styles.row_between}>
                    <Text style={styles.lebel_}>Unlock with Fingerprint?</Text>
                    <Switch
                        trackColor={{ false: Colors.GRAY, true: Colors.GRAY }}
                        thumbColor={isEnabled ? Colors.PRIMARY : '#f4f3f4'}
                        ios_backgroundColor={Colors.GRAY}
                        onValueChange={toggleSwitch}
                        value={isEnabled}
                    />
                </View>
            </View>

            <View style={styles.footer}>
                <View style={styles.button_container}>
                    <TouchableOpacity style={[styles.button_, { backgroundColor: Colors.PRIMARY }]} disabled={loading} onPress={handleSubmit} >
                        {loading ? (
                            <ActivityIndicator size={'small'} color={Colors.WHITE} />
                        ) : (
                            <Text style={styles.text_14}>Import</Text>
                        )}
                    </TouchableOpacity>
                </View>
            </View>
        </SafeAreaView>
    );
};

export default ImportPharse

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
        paddingHorizontal: moderateScale(20),
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
        color: Colors.WHITE,
        // backgroundColor: 'red'
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
    input_: {
        color: Colors.WHITE,
        fontFamily: 'LatoBold',
        fontSize: scale(13)
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