// import 'node-libs-react-native/globals';
// import '@walletconnect/react-native-compat';
import 'react-native-get-random-values';

import { GestureHandlerRootView } from 'react-native-gesture-handler';
import React, { useCallback } from 'react';
import Roots from './src/navigations/Roots';
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { SafeAreaProvider } from "react-native-safe-area-context";
import Colors from './src/constents/Colors';
import { StatusBar } from 'expo-status-bar';
import { BottomSheetModalProvider } from '@gorhom/bottom-sheet';
import { ToasterProvider } from './src/contexts/ToasterContext';



SplashScreen.preventAutoHideAsync();


export default function App() {




  const [fontsLoaded, fontError] = useFonts({
    LatoRegular: require("./src/assets/fonts/Lato-Regular.ttf"),
    LatoBold: require("./src/assets/fonts/Lato-Bold.ttf"),
    LatoBlack: require("./src/assets/fonts/Lato-Black.ttf"),

    RalewaySemiBold: require("./src/assets/fonts/Raleway-SemiBold.ttf"),
    RalewayBold: require("./src/assets/fonts/Raleway-Bold.ttf"),
    RalewayExtraBold: require("./src/assets/fonts/Raleway-ExtraBold.ttf"),

  });

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded || fontError) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded, fontError]);

  if (!fontsLoaded && !fontError) {
    return null;
  }



  return (
    <ToasterProvider>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <SafeAreaProvider style={{ flex: 1, backgroundColor: Colors.WHITE }} onLayout={onLayoutRootView} >
          <BottomSheetModalProvider>

            <StatusBar style='dark' animated={true} />
            <Roots />

          </BottomSheetModalProvider>
        </SafeAreaProvider>
      </GestureHandlerRootView>
    </ToasterProvider>
  );
}


// import 'react-native-get-random-values';
// import React, { useState, useEffect } from 'react';
// import { StyleSheet, Text, View } from 'react-native';
// import { ethers, formatEther } from 'ethers';
// import { StatusBar } from 'expo-status-bar';

// export default function App() {
//   const [balance, setBalance] = useState(null);
//   const INFURA_PROJECT_ID = '16e09b9be084413caa40e6e72130c7db';
//   const INFURA_URL = `https://sepolia.infura.io/v3/${INFURA_PROJECT_ID}`;

//   useEffect(() => {
//     const fetchBalance = async () => {
//       try {
//         let infuraProvider = new ethers.JsonRpcProvider(INFURA_URL);
//         const address = '0x87daB07Ec49e2eBdC126747FfA39488411b0d620';
//         const balance = await infuraProvider.getBalance(address);
//         console.log({ balance: formatEther(balance) });
//         setBalance(formatEther(balance));
//       } catch (error) {
//         console.error('Error fetching balance:', error);
//       }
//     };

//     fetchBalance();
//   }, []);

//   return (
//     <View style={styles.container}>
//       <Text>Balance: {balance !== null ? `${balance} ETH` : 'Loading...'}</Text>
//       <StatusBar style="auto" />
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
// });