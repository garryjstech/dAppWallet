import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import NetInfo from '@react-native-community/netinfo';


const NoInternet = () => {

    const [isConnected, setIsConnected] = useState(true);

    useEffect(() => {
        const unsubscribe = NetInfo.addEventListener(state => {
            setIsConnected(state.isConnected);
        });

        return () => {
            unsubscribe();
        };
    }, []);

    return (
        <View style={styles.container}>
            {isConnected ? (
                <Text style={styles.text}>You are connected to the internet.</Text>
            ) : (
                <Text style={styles.text}>No internet connection. Please check your connection.</Text>
            )}
        </View>
    )
}

export default NoInternet

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
    },
    text: {
        fontSize: 18,
        color: '#333',
    },
});
