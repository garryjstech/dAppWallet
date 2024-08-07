
// import '@walletconnect/react-native-compat';
// import 'react-native-get-random-values';
import { SafeAreaView } from 'react-native-safe-area-context'
import Colors from '../constents/Colors'
import React, { useState, useRef, useContext, useEffect } from 'react';
import { Platform, StyleSheet, View, TextInput, Text, TouchableOpacity, Image } from 'react-native';
import { moderateScale, scale, verticalScale } from 'react-native-size-matters';
import { useNavigation, useScrollToTop } from '@react-navigation/native';
import { WebView } from 'react-native-webview';
import { Ionicons } from '@expo/vector-icons';
import Constants from 'expo-constants';
import { LinearGradient } from 'expo-linear-gradient';
import { IMAGES } from '../constents/Images';
// import { initializeWalletConnect, injectWeb3Provider } from '../utils/initializeWalletConnect';

// import { ethers } from 'ethers';

const Browser = () => {

    const navigation = useNavigation();
    const ref = useRef(null);
    useScrollToTop(ref);
    // const theme = useContext(themeContext);
    let defaultUrl = `https://www.alphawin.io`;
    const [url, setUrl] = useState(defaultUrl);
    const [inputUrl, setInputUrl] = useState(url);
    const [error, setError] = useState(null);
    const [canGoBack, setCanGoBack] = useState(false);
    const [canGoForward, setCanGoForward] = useState(false);
    const [progress, setProgress] = useState(0);
    const [walletAddress, setWalletAddress] = useState(null);
    const webViewRef = useRef(null);

    const handleGoPress = () => {
        setUrl(inputUrl);
        setError(null); // Reset error state
    };

    const handleError = (syntheticEvent) => {
        const { nativeEvent } = syntheticEvent;
        setError(nativeEvent.description);
    };

    const handleNavigationStateChange = (navState) => {
        setCanGoBack(navState.canGoBack);
        setCanGoForward(navState.canGoForward);
    };

    const handleGoBackPress = () => {
        if (webViewRef.current && canGoBack) {
            webViewRef.current.goBack();
        }
    };

    const handleGoForwardPress = () => {
        if (webViewRef.current && canGoForward) {
            webViewRef.current.goForward();
        }
    };

    const handleRefreshPress = () => {
        if (webViewRef.current) {
            webViewRef.current.reload();
        }
    };
    ///////////////////////// WEB3 codes

    const [connector, setConnector] = useState(null);
    const [injectedJS, setInjectedJS] = useState('');

    // useEffect(() => {
    //     const setupWalletConnect = async () => {
    //         const connectorInstance = await initializeWalletConnect();
    //         setConnector(connectorInstance);
    //         if (connectorInstance.connected) {
    //             const injectionScript = injectWeb3Provider(connectorInstance);
    //             setInjectedJS(injectionScript);
    //         }
    //     };
    //     setupWalletConnect();
    // }, []);



    return (
        <SafeAreaView style={styles.container}>



            <View style={{ flex: 1, marginTop: Constants.statusBarHeight / 2 }}>
                <View style={styles.urlContainer}>
                    <TextInput
                        style={styles.input}
                        value={inputUrl}
                        onChangeText={setInputUrl}
                        placeholder="Enter URL"
                        placeholderTextColor={Colors.WHITE}
                        autoCapitalize="none"
                        autoCorrect={false}
                        keyboardType="url"
                    />
                    <TouchableOpacity onPress={handleGoPress} style={styles.goButton}>
                        <Text style={styles.goButtonText}>Go</Text>
                    </TouchableOpacity>
                </View>


                <LinearGradient
                    colors={Colors.GRADIENTCOLOR}
                    style={[styles.progressBar, { width: `${progress * 100}%` }]}>
                </LinearGradient>



                {error ? (
                    <View style={styles.errorContainer}>
                        <Image source={IMAGES.warning_} style={styles.errorImage} />
                        <Text style={styles.errorText}>Error: {error}</Text>
                        <TouchableOpacity onPress={handleGoPress} style={styles.retryButton}>
                            <Text style={styles.retryButtonText}>Retry</Text>
                        </TouchableOpacity>
                    </View>
                ) : (
                    <>

                        <WebView
                            ref={webViewRef}
                            source={{ uri: url }}
                            style={styles.webview}
                            onError={handleError}
                            onHttpError={handleError}
                            onNavigationStateChange={handleNavigationStateChange}
                            onLoadProgress={({ nativeEvent }) => setProgress(nativeEvent.progress)}

                            injectedJavaScript={injectedJS}
                            onMessage={(event) => console.log(event.nativeEvent.data)}
                        />
                        {/* {connector && (
                            <Text>Connected Account: {connector.accounts[0]}</Text>
                        )} */}

                    </>
                )}


                <View style={styles.toolbar}>
                    <TouchableOpacity onPress={handleGoBackPress} disabled={!canGoBack}>
                        <Ionicons name="arrow-back" size={scale(20)} color={canGoBack ? Colors.WHITE : Colors.GRAY} />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={handleGoForwardPress} disabled={!canGoForward}>
                        <Ionicons name="arrow-forward" size={scale(20)} color={canGoForward ? Colors.WHITE : Colors.GRAY} />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={handleRefreshPress}>
                        <Ionicons name="refresh" size={scale(20)} color={Colors.WHITE} />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => setUrl(defaultUrl)}>
                        <Ionicons name="home" size={scale(20)} color={Colors.WHITE} />
                    </TouchableOpacity>
                </View>

            </View>
        </SafeAreaView>
    )
}

export default Browser

const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: '100%',
        backgroundColor: Colors.BACKGROUND
    },
    urlContainer: {
        flexDirection: 'row',
        paddingBottom: scale(10),
        paddingHorizontal: scale(10),
    },
    goButton: {
        width: scale(50),
        backgroundColor: Colors.PRIMARY,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: scale(20),
    },
    goButtonText: {
        color: Colors.BLACK,
    },
    input: {
        flex: 1,
        borderColor: Colors.LIGHT_GRAY,
        borderWidth: 1,
        height: scale(35),
        marginRight: scale(10),
        paddingHorizontal: scale(10),
        borderRadius: scale(20),
        color: Colors.WHITE,
        fontSize: scale(13),
    },
    webview: {
        flex: 1,
        backgroundColor: Colors.BACKGROUND,
    },
    errorContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    errorImage: {
        width: scale(100),
        height: scale(100),
        marginBottom: scale(10),
    },
    errorText: {
        color: Colors.DANGER,
        marginBottom: scale(10),
    },
    retryButton: {
        backgroundColor: Colors.PRIMARY,
        padding: scale(10),
        borderRadius: scale(20),
    },
    retryButtonText: {
        color: Colors.BLACK,
        fontSize: scale(14),
    },
    toolbar: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        padding: scale(10),
        borderTopWidth: 1,
        borderTopColor: Colors.GRAY,
    },
    progressBar: {
        height: scale(3),
    },
    walletContainer: {
        padding: scale(10),
        backgroundColor: Colors.BACKGROUND,
    },
    walletAddress: {
        color: Colors.WHITE,
        fontSize: scale(14),
        textAlign: 'center',
    },
    connectButton: {
        backgroundColor: Colors.PRIMARY,
        padding: scale(10),
        borderRadius: scale(20),
        alignItems: 'center',
        justifyContent: 'center',
        marginVertical: scale(10),
    },
    connectButtonText: {
        color: Colors.BLACK,
        fontSize: scale(14),
    },
})