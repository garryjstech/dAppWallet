// import 'react-native-get-random-values';
import { Alert, FlatList, Image, Pressable, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import Colors from '../constents/Colors'
import { moderateScale, scale, verticalScale } from 'react-native-size-matters'
import { useFocusEffect, useNavigation, useRoute } from '@react-navigation/native'
import { ICONS } from '../constents/Images'
import AntDesign from '@expo/vector-icons/AntDesign';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { BottomSheetModal, BottomSheetView, BottomSheetBackdrop } from '@gorhom/bottom-sheet'
import { INFURA_PROJECT_ID } from '../config/config'
import { ethers } from 'ethers';
import * as SecureStore from 'expo-secure-store';
import { useAlert } from '../contexts/ToasterContext'






export default function SendCoin() {
    const navigation = useNavigation();
    const route = useRoute();
    const INFURA_URL = `https://sepolia.infura.io/v3/${INFURA_PROJECT_ID}`;
    const ACCOUNT_ADDRESS = `0xd45f34rgteg6gt4tret34erg54ter34tre43443f`
    const { showError } = useAlert();

    const [isFromAccountAddress, setIsFromAccountAddress] = useState('')
    const [isFromAccountName, setIsFromAccountName] = useState(1)
    const [isFromAccountImage, setIsFromAccountImage] = useState([])

    const [isAccountAddress, setIsAccountAddress] = useState('')
    const [isAccountName, setIsAccountName] = useState('')
    const [isAccountImage, setIsAccountImage] = useState('')


    const [isWallet, setWallet] = useState('');
    const [balance, setBalance] = useState(null);

    const [loading, setLoading] = useState(false);
    const [info, setInfo] = useState('');
    const [isPrivateKey, setPrivateKey] = useState([]);
    const [walletAddresses, setWalletAddresses] = useState([]);

    const [walletData, setWalletData] = useState([]);
    const [tokenDetails, setTokenDetails] = useState();
    const [searchQuery, setSearchQuery] = useState('');
    // console.log({ walletData });



    let resetData = () => {
        setIsAccountAddress(null)
        setIsAccountName(null)
        setIsAccountImage(null)
    }



    //bottomsheet
    const [closeSheet, setCloseSheet] = useState(false);
    const bottomSheetModalRef = useRef(null);
    const snapPoints = ['40%', '40%'];
    const snapPoints1 = ['30%', '30%'];
    const handlePresetModal = useCallback(() => { bottomSheetModalRef.current?.present(); }, []);
    const handleClosePress = useCallback(() => { bottomSheetModalRef.current?.close(); }, []);

    const handleSheetChanges = useCallback((index) => {
        // console.log('handleSheetChanges', index);
    }, []);

    const renderBackdrop = useCallback((props) => <BottomSheetBackdrop appearsOnIndex={0} disappearsOnIndex={-1} {...props} />, []);
    const [bottomTab, setBottomTab] = useState(0)



    //// main functions
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
                setIsFromAccountName('1')
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

    // let deleteWalletAddress = async () => {
    //     await SecureStore.deleteItemAsync('ArrayPrivateKeys')
    //     await SecureStore.deleteItemAsync('ArrayAddress')
    // }

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

    const handleSearch = (text) => {
        setSearchQuery(text);
    };

    const filteredData = walletData.filter((item) =>
        item?.address?.toLowerCase()?.includes(searchQuery.toLowerCase()) ||
        item?.publicKey?.toLowerCase()?.includes(searchQuery.toLowerCase())
    );
    // console.log({ isAccountAddress });
    const handleNextPage = async () => {
        if (isAccountAddress === "" || isAccountAddress === null || isAccountAddress === undefined) {
            showError('Please select account to continue!')
        } else {
            navigation.navigate('SendAmmount', { from: isFromAccountAddress, fromImage: isFromAccountImage, fromName: isFromAccountName, to: isAccountAddress, toImage: isAccountImage, toName: isAccountName })
        }
    }
    return (
        <>
            <SafeAreaView style={styles.root}>

                <View style={styles.header}>
                    <View style={{ width: scale(30) }} />
                    <View style={{ justifyContent: 'center', alignItems: 'center', gap: scale(5) }}>
                        <Text style={styles.text_14_w}>Send to</Text>
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
                                    <Image source={isFromAccountImage ? { uri: isFromAccountImage } : ICONS.jsLogo} style={styles.icon} resizeMode='contain' />
                                </View>
                                <View style={{ width: '80%', gap: scale(1) }}>
                                    <Text style={styles.text_14_w}>{isFromAccountName && 'Account ' + isFromAccountName}</Text>
                                    <TextInput
                                        placeholder='Search public address (0x), or ENS'
                                        placeholderTextColor={Colors.PLACEHOLDER}
                                        style={styles.input_}
                                        editable={false}
                                        value={isFromAccountAddress && (isFromAccountAddress).slice(0, 6) + '...' + (isFromAccountAddress).slice(-6)}
                                    />
                                </View>
                            </View>
                            <TouchableOpacity style={{ padding: scale(8), width: '15%' }} onPress={() => handlePresetModal()}>
                                <AntDesign name="down" size={scale(18)} color={Colors.WHITE} />
                            </TouchableOpacity>
                        </Pressable>
                    </View>

                    <View style={styles.row_}>
                        <View style={styles.left_bar}>
                            <Text style={styles.text_14_w}>To:</Text>
                        </View>
                        <View style={styles.bar_container}>
                            {isAccountAddress ?
                                <View style={styles.bar_inner}>
                                    <View style={styles.icon__}>
                                        <Image source={isAccountImage ? { uri: isAccountImage } : ICONS.jsLogo} style={styles.icon} resizeMode='contain' />
                                    </View>
                                    <View style={{ width: '80%', gap: scale(1) }}>
                                        <Text style={styles.text_14_w}>{isAccountName && isAccountName}</Text>
                                        <TextInput
                                            placeholder=''
                                            placeholderTextColor={Colors.PLACEHOLDER}
                                            style={styles.input_}
                                            value={isAccountAddress && (isAccountAddress).slice(0, 6) + '...' + (isAccountAddress).slice(-6)}

                                        />
                                    </View>
                                </View>
                                :
                                <TextInput
                                    placeholder='Search public address (0x), or ENS'
                                    placeholderTextColor={Colors.PLACEHOLDER}
                                    style={[styles.input_, { width: '85%' }]}
                                    value={searchQuery}
                                    onChangeText={handleSearch}
                                />}
                            {!isAccountAddress ?
                                <TouchableOpacity style={{ padding: scale(8), width: '15%' }}>
                                    <AntDesign name="scan1" size={scale(18)} color={Colors.WHITE} />
                                </TouchableOpacity>
                                :
                                <TouchableOpacity style={{ padding: scale(8), width: '15%' }} onPress={() => { resetData() }}>
                                    <AntDesign name="close" size={scale(18)} color={Colors.WHITE} />
                                </TouchableOpacity>
                            }
                        </View>
                    </View>
                </View>
                <View style={styles.line__} />

                {/* suggestions */}
                {!isAccountAddress &&
                    <View style={styles.content_}>
                        <Text style={styles.text_14_w}>Your Accounts</Text>
                        <FlatList
                            data={filteredData}
                            renderItem={({ item, index }) => {
                                return (
                                    <TouchableOpacity style={styles.account_bar} onPress={() => { setIsAccountAddress(item?.address); setIsAccountName(`Account ${index + 1}`); setIsAccountImage(item?.image) }}>
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
                    </View>
                }

                {/* footer button */}
                <View style={styles.footer}>
                    <TouchableOpacity style={styles.button__} onPress={handleNextPage}>
                        <Text style={styles.button_txt}>Next</Text>
                    </TouchableOpacity>
                </View>
            </SafeAreaView>

            <BottomSheetModal
                ref={bottomSheetModalRef}
                animateOnMount={true}
                index={1}
                snapPoints={bottomTab === 1 ? snapPoints1 : snapPoints}
                onChange={handleSheetChanges}
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
                                            <TouchableOpacity style={styles.account_bar} onPress={() => { setIsFromAccountAddress(item?.address); setIsFromAccountName(index + 1); setIsFromAccountImage(item?.image); handleClosePress() }}>
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
    back_btn: {
        width: scale(50),
        height: scale(50),
        justifyContent: 'center',
        alignItems: 'center',
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

    text_13_pr: {
        fontSize: scale(13),
        fontFamily: 'RalewayBold',
        color: Colors.PRIMARY
    },
    text_12_g: {
        fontSize: scale(12),
        fontFamily: 'LatoBold',
        color: Colors.GRAY_05
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
        justifyContent: 'space-between'
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
    line__: {
        width: '100%',
        backgroundColor: Colors.PLACEHOLDER,
        height: 1
    },
    account_bar: {
        marginBottom: scale(10),
        paddingVertical: verticalScale(10)
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
        fontFamily: 'LatoBold',
        color: Colors.WHITE,
        // width: '80%'

    },
    bt_btn: { paddingVertical: verticalScale(10), },



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

    //bottomsheet
    flatlistcontentContainer: {
        backgroundColor: "white",
    },
    itemContainer: {
        padding: 6,
        margin: 6,
        backgroundColor: "#eee",
    },
});