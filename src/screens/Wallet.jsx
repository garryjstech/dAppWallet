
import React, { useState, useRef, useEffect, useCallback } from 'react';
import { View, Text, Modal, TouchableOpacity, StyleSheet, Animated, Image, FlatList, ScrollView, Dimensions, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context'
import Colors from '../constents/Colors'
import { WalletHeader } from '../components'
import { moderateScale, scale, verticalScale } from 'react-native-size-matters'
import { ICONS } from '../constents/Images'
import AntDesign from '@expo/vector-icons/AntDesign';
import Ionicons from '@expo/vector-icons/Ionicons';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { ethers, formatEther } from 'ethers';
import { WalletSwipeTab } from '../pages';
import { INFURA_PROJECT_ID } from '../config/config';
import { BottomSheetModal, BottomSheetView, BottomSheetBackdrop } from '@gorhom/bottom-sheet'
import * as SecureStore from 'expo-secure-store';
import { useFocusEffect, useNavigation, useRoute } from '@react-navigation/native';



const Wallet = () => {
    const navigation = useNavigation();
    const route = useRoute();
    const [isFromAccountAddress, setIsFromAccountAddress] = useState('')
    const [isFromAccountName, setIsFromAccountName] = useState(1)

    const [isWallet, setWallet] = useState('');
    const [balance, setBalance] = useState(null);

    const [loading, setLoading] = useState(false);
    const [info, setInfo] = useState('');
    const [isPrivateKey, setPrivateKey] = useState([]);
    const [walletAddresses, setWalletAddresses] = useState([]);
    const [isFromAccountImage, setIsFromAccountImage] = useState([])

    const [walletData, setWalletData] = useState([]);
    const [tokenDetails, setTokenDetails] = useState();


    useFocusEffect(
        useCallback(() => {
            getCoinBalance()
            fetchBalance();
            fetchAddresses()
                .then(() => {
                    if (isFromAccountAddress) {
                        fetchBalance();
                    }
                });
        }, [route, loading])
    );


    useEffect(() => {
        const fetchData = async () => {
            const walletDataArray = await createDataArray();
            setWalletData(walletDataArray);
        };
        fetchData();
    }, [bottomTab, loading, route]);



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


    // const address = '0x87daB07Ec49e2eBdC126747FfA39488411b0d620';
    const INFURA_URL = `https://sepolia.infura.io/v3/${INFURA_PROJECT_ID}`;

    const fetchBalance = async () => {
        try {
            if (isFromAccountAddress) {
                let infuraProvider = new ethers.providers.JsonRpcProvider(INFURA_URL);
                const balance = await infuraProvider?.getBalance(isFromAccountAddress);
                setBalance(ethers?.utils?.formatEther(balance));
            }
        } catch (error) {
            console.log(error?.message);
        }
    };

    const getCoinBalance = async () => {
        let URL = `https://api.binance.com/api/v3/ticker/price?symbol=ETHUSDT`
        fetch(URL).then(response => response.json())
            .then(data => { setTokenDetails(data) });
    }

    const fetchAddresses = async () => {
        let ArrayAddress = await SecureStore.getItemAsync('ArrayAddress');
        let ArrayImage = await SecureStore.getItemAsync('ArrayImage');
        if (ArrayAddress) {
            const addresses = JSON.parse(ArrayAddress);
            setWalletAddresses(addresses);
            if (addresses.length > 0) {
                setIsFromAccountAddress(addresses[0]);
            }
        }
        if (ArrayImage) {
            const img = JSON.parse(ArrayImage);
            if (img.length > 0) {
                setIsFromAccountImage(img[0]);
            }
        }
    };

    const generateWallet = async () => {
        setLoading(true);

        // Create a new wallet
        const newWallet = ethers.Wallet.createRandom();
        const newAddress = newWallet.address;
        const newPrivateKey = newWallet.privateKey;
        const accountImage = refreshImage(); // Assume refreshImage() returns a valid image URL

        try {
            // Retrieve current data from SecureStore
            const currentAddresses = JSON.parse(await SecureStore.getItemAsync("ArrayAddress")) || [];
            const currentPrivateKeys = JSON.parse(await SecureStore.getItemAsync("ArrayPrivateKeys")) || [];
            const currentImages = JSON.parse(await SecureStore.getItemAsync("ArrayImage")) || [];

            // Update state and SecureStore
            const updatedAddresses = [...currentAddresses, newAddress];
            const updatedPrivateKeys = [...currentPrivateKeys, newPrivateKey];
            const updatedImages = [...currentImages, accountImage];

            // Update SecureStore
            await SecureStore.setItemAsync("ArrayAddress", JSON.stringify(updatedAddresses));
            await SecureStore.setItemAsync("ArrayPrivateKeys", JSON.stringify(updatedPrivateKeys));
            await SecureStore.setItemAsync("ArrayImage", JSON.stringify(updatedImages));

            // Update state
            setWallet(newAddress);
            setInfo(newWallet.mnemonic);
            setPrivateKey(updatedPrivateKeys);
            setWalletAddresses(updatedAddresses);
            setIsFromAccountImage(updatedImages);

            setBottomTab(0);
        } catch (error) {
            console.log(error.message);
        } finally {
            setLoading(false);
        }
    };

    const fetchSecureStoreData = async () => {
        try {

            const rawAddresses = await SecureStore.getItemAsync('ArrayAddress');
            const rawImages = await SecureStore.getItemAsync('ArrayImage');
            const rawPrivateKeys = await SecureStore.getItemAsync('ArrayPrivateKeys');

            const addresses = rawAddresses ? JSON.parse(rawAddresses) : [];
            const images = rawImages ? JSON.parse(rawImages) : [];
            const privateKeys = rawPrivateKeys ? JSON.parse(rawPrivateKeys) : [];

            const publicKeys = privateKeys.map(key => {
                const wallet = new ethers.Wallet(key);
                return wallet.publicKey;
            });

            return { addresses, images, publicKeys, privateKeys };
        } catch (error) {
            console.log('Error fetching or parsing SecureStore data:', error.message);
            return { addresses: [], images: [], publicKeys: [], privateKeys: [] };
        }
    };

    const createDataArray = async () => {
        const { addresses, images, publicKeys, privateKeys } = await fetchSecureStoreData();

        const dataArray = addresses.map((address, index) => ({
            address,
            image: images[index] || '',
            publicKey: publicKeys[index] || '',
            privateKey: privateKeys[index] || '',
        }));

        return dataArray;
    };



    const TokensData = [
        { id: '1', name: 'Ethereum', balance: balance, usdt_blance: (tokenDetails?.price * balance), symbol: 'ETH', logo: isFromAccountImage },
    ];

    const NFTsData = [
        { id: '1', name: 'NFT 1' },
    ];


    // modal

    // let isWallet = `0x87dbdshjkbrgkjbggbdfgfbdgbkgjfdbgdkg`;
    const [modalVisible, setModalVisible] = useState(false);
    const fadeAnim = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        let timer;
        if (modalVisible) {
            timer = setTimeout(closeModal, 1000);
        }
        return () => clearTimeout(timer);
    }, [modalVisible]);

    const openModal = () => {
        setModalVisible(true);
        Animated.timing(fadeAnim, { toValue: 1, duration: 300, useNativeDriver: true, }).start();
    };
    const closeModal = () => { Animated.timing(fadeAnim, { toValue: 0, duration: 300, useNativeDriver: true, }).start(() => setModalVisible(false)); };


    //bottomsheet
    const [bottomTab, setBottomTab] = useState(0)
    const [closeSheet, setCloseSheet] = useState(false);
    const bottomSheetModalRef = useRef(null);
    const snapPoints = ['40%', '40%']; // variables
    const snapPoints1 = ['30%', '30%']; // variables
    const handlePresetModal = useCallback(() => { bottomSheetModalRef.current?.present(); }, []);
    const handleClosePress = useCallback(() => { bottomSheetModalRef.current?.close(); }, []);
    const renderBackdrop = useCallback((props) => <BottomSheetBackdrop appearsOnIndex={0} disappearsOnIndex={-1} {...props} />, []);

    ////////////////////////

    // let deleteWalletAddress = async () => {
    //     await SecureStore.deleteItemAsync('ArrayPrivateKeys')
    //     await SecureStore.deleteItemAsync('ArrayAddress')
    //     await SecureStore.deleteItemAsync('ArrayImage')
    // }
    // deleteWalletAddress()

    // console.log({ walletData });


    return (
        <>
            <SafeAreaView style={styles.container}>
                <WalletHeader />

                <View style={styles.content___}>
                    <View style={styles.account_card_}>
                        <TouchableOpacity style={[styles.row_between_bar,]} onPress={handlePresetModal}>
                            <View style={[styles.row_,]}>
                                <Image source={isFromAccountImage ? { uri: isFromAccountImage } : ICONS.jsLogo} style={styles.account_avatar} resizeMode='contain' />
                                <Text style={styles.text_13_w}>Account {isFromAccountName && isFromAccountName}</Text>
                            </View>
                            <AntDesign name="down" size={scale(16)} color={Colors.WHITE} />
                        </TouchableOpacity>

                        <View style={styles.line__} />

                        <View style={styles.row_between_bar}>
                            <View style={styles.row_}>
                                <Text style={styles.account_text}>Address:</Text>
                                <TouchableOpacity style={styles.address_tab} onPress={openModal}>
                                    <Text style={styles.walletAddress_}>{isFromAccountAddress.slice(0, 5)}{'...'}{isFromAccountAddress.slice(-5)}</Text>
                                    <Ionicons name="copy" size={scale(14)} color={Colors.PRIMARY} />
                                </TouchableOpacity>
                            </View>
                            <MaterialCommunityIcons name="dots-horizontal" size={scale(16)} color={Colors.WHITE} />
                        </View>
                    </View>

                    <View style={{ height: Dimensions.get('window').height / 1.5, }}>
                        <WalletSwipeTab tokens={TokensData} balance={balance ? balance : 0} nfts={NFTsData} />
                    </View>




                </View>


                {/* copy modal */}
                {modalVisible && (
                    <Modal
                        transparent={true}
                        animationType="none"
                        visible={modalVisible}
                        onRequestClose={closeModal}
                    >
                        <View style={styles.modalBackground}>
                            <Animated.View style={[styles.modalContainer, { opacity: fadeAnim }]}>
                                <Ionicons name="checkmark-done-circle" size={scale(34)} color={Colors.WHITE} />
                                <Text style={styles.modalText}>Public address Copied to Clipboard!</Text>
                            </Animated.View>
                        </View>
                    </Modal>
                )}

            </SafeAreaView>

            <BottomSheetModal
                ref={bottomSheetModalRef}
                animateOnMount={true}
                index={1}
                snapPoints={bottomTab === 1 ? snapPoints1 : snapPoints}
                // onChange={handleSheetChanges}
                enableContentPanningGesture={false}
                enableHandlePanningGesture={false}
                backdropComponent={renderBackdrop}
                enableDismissOnClose={setCloseSheet}
                // handleIndicatorStyle={{ backgroundColor: Colors.GRAY, width: scale(25) }}
                backgroundStyle={{ backgroundColor: Colors.BACKGROUND, opacity: 1, }}
            >
                <BottomSheetView style={styles.contentContainer}>
                    {bottomTab === 0 ?
                        <>
                            <Text style={[styles.text_16_w, { textAlign: 'center', marginVertical: verticalScale(10) }]}>Accounts</Text>

                            <View style={[styles.content_, { height: scale(210) }]}>
                                <FlatList
                                    data={walletData}
                                    // ListFooterComponent={FotterList}
                                    style={{}}
                                    showsVerticalScrollIndicator={false}
                                    renderItem={({ item, index }) => {
                                        return (
                                            <TouchableOpacity style={styles.account_bar}
                                                onPress={() => {
                                                    setIsFromAccountAddress(item?.address);
                                                    setIsFromAccountName(index + 1);
                                                    setIsFromAccountImage(item?.image);
                                                    handleClosePress();
                                                }}>
                                                <View style={styles.row_}>
                                                    <View style={styles.icon__}>
                                                        <Image source={item?.image ? { uri: item?.image } : ICONS.jsLogo} style={styles.icon} resizeMode='contain' />
                                                    </View>
                                                    <View style={{ gap: scale(5) }}>
                                                        <Text style={styles.text_14_num}>{`Account ${index + 1}`}</Text>
                                                        <Text style={styles.text_12_g}>{(item?.address).slice(0, 8) + '...' + (item?.address).slice(-8)}</Text>
                                                    </View>
                                                </View>
                                            </TouchableOpacity>
                                        )
                                    }} />
                                <TouchableOpacity style={styles.button__} onPress={() => setBottomTab(1)}>
                                    <Text style={styles.button_txt}>Add account or hardwere wallet</Text>
                                </TouchableOpacity>
                            </View>
                        </>
                        :
                        bottomTab === 1 ?
                            <>
                                <View style={[styles.row_between, { marginHorizontal: moderateScale(15) }]}>
                                    <Text style={styles.text_13_pr} onPress={() => { setBottomTab(0) }} >Back</Text>
                                    <Text style={[styles.text_16_w, { marginVertical: verticalScale(10) }]}>Add account</Text>
                                    <Text style={[styles.text_16_w,]} />
                                </View>

                                <View style={[styles.content_, { gap: scale(10) }]}>
                                    <TouchableOpacity style={[styles.row_, styles.bt_btn]} onPress={generateWallet} >
                                        <AntDesign name="plus" size={scale(18)} color={Colors.WHITE} />
                                        <Text style={styles.text_14_w}>Add new account</Text>
                                    </TouchableOpacity>

                                    <TouchableOpacity style={[styles.row_, styles.bt_btn]} onPress={() => { navigation.navigate('ImportAccount'); handleClosePress(); setBottomTab(0) }}>
                                        <AntDesign name="clouddownloado" size={scale(18)} color={Colors.WHITE} />
                                        <Text style={styles.text_14_w}>Import account</Text>
                                    </TouchableOpacity>

                                    {/* <TouchableOpacity style={[styles.row_, styles.bt_btn]} >
                                        <MaterialCommunityIcons name="wallet-plus-outline" size={scale(18)} color={Colors.WHITE} />
                                        <Text style={styles.text_14_w}>Add hardware Wallet</Text>
                                    </TouchableOpacity> */}
                                </View>
                            </>
                            : null}
                </BottomSheetView>


            </BottomSheetModal>
        </>

    )
}

export default Wallet

const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: '100%',
        backgroundColor: Colors.BACKGROUND
    },
    content___: {
        paddingHorizontal: moderateScale(20),
        paddingVertical: verticalScale(15)
    },
    account_card_: {
        borderWidth: scale(1),
        borderColor: Colors.PLACEHOLDER,
        borderRadius: scale(5),
        width: '100%',
        height: scale(140),
        justifyContent: 'space-between',
        padding: scale(10)
    },
    line__: {
        width: '100%',
        height: scale(1),
        backgroundColor: Colors.PLACEHOLDER,
        alignSelf: 'center'
    },
    row_: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: scale(10)
    },
    row_between_bar: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        height: scale(45),
        width: '100%',
        paddingHorizontal: moderateScale(10),
        // backgroundColor: 'gray',
        // marginVertical: verticalScale(10)
    },
    row_between: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    account_avatar: {
        width: scale(30),
        height: scale(30),
        borderRadius: scale(30 / 2),
        borderWidth: 1,
        borderColor: Colors.GRAY
    },
    account_text: {
        color: Colors.WHITE,
        fontFamily: 'RalewaySemiBold',
        fontSize: scale(12)
    },
    walletAddress_: {
        color: Colors.PRIMARY,
        fontFamily: 'LatoRegular',
        fontSize: scale(12)
    },
    address_tab: {
        paddingHorizontal: moderateScale(10),
        paddingVertical: verticalScale(3),
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: Colors.LIGHT_BTN,
        borderRadius: scale(20),
        maxWidth: scale(150),
        gap: scale(10)
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
    text_12_g: {
        fontSize: scale(12),
        fontFamily: 'RalewaySemiBold',
        color: Colors.GRAY_05
    },
    text_13_pr: {
        fontSize: scale(13),
        fontFamily: 'RalewayBold',
        color: Colors.PRIMARY
    },
    text_13_w: {
        fontSize: scale(13),
        fontFamily: 'LatoBlack',
        color: Colors.WHITE
    },
    text_12_g: {
        fontSize: scale(12),
        fontFamily: 'RalewaySemiBold',
        color: Colors.GRAY_05
    },
    text_16_w: {
        fontSize: scale(16),
        fontFamily: 'RalewayBold',
        color: Colors.WHITE
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

    // modal

    modalBackground: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.2)', // Black transparent background
        // borderRadius: scale(10)
    },
    modalContainer: {
        width: scale(140),
        padding: scale(10),
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        gap: scale(10),
        borderRadius: scale(10)
    },
    modalText: {
        fontSize: scale(12),
        marginBottom: scale(20),
        color: Colors.WHITE,
        fontFamily: 'RalewaySemiBold',
        textAlign: 'center'
    },
    //

    item: {
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#ddd',
    },

    // bottomsheet

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

    account_bar: {
        marginBottom: scale(10),
        paddingVertical: verticalScale(10)
    },
    icon__: {
        width: scale(30),
        height: scale(30),
        borderRadius: scale(30 / 2),
        borderWidth: 1,
        borderColor: Colors.GRAY,
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
        // width: '80%'

    },
    bt_btn: {
        paddingVertical: verticalScale(10),
    },

})