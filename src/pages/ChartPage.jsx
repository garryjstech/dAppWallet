import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, FlatList, StyleSheet, Dimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LineChart } from 'react-native-gifted-charts';
import Ionicons from '@expo/vector-icons/Ionicons';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { useNavigation } from '@react-navigation/native';
import Colors from '../constents/Colors';
import { moderateScale, scale, verticalScale } from 'react-native-size-matters';
import TokenTransaction from '../components/TokenTransaction';

const ChartPage = () => {
    const navigation = useNavigation();
    const { width } = Dimensions.get('window');
    const [timeFrame, setTimeFrame] = useState('1d');
    const [filteredData, setFilteredData] = useState([]);

    const data = [
        { value: 3300 },
        { value: 3400 },
        { value: 350 },
        { value: 800 },
        { value: 3100 },
        { value: 3000 },
        { value: 5200 },
        { value: 3200 },
    ];

    const filterData = (timeFrame) => {
        let newData = [];
        switch (timeFrame) {
            case '1d':
                newData = data.slice(0, 2);
                break;
            case '1w':
                newData = data.slice(0, 3);
                break;
            case '1m':
                newData = data.slice(0, 4);
                break;
            case '3m':
                newData = data.slice(0, 5);
                break;
            case '1y':
                newData = data.slice(0, 6);
                break;
            case '3y':
                newData = data.slice(0, 7);
                break;
            default:
                newData = data;
        }
        setFilteredData(newData);
    };

    useEffect(() => {
        filterData(timeFrame);
    }, [timeFrame]);

    const [tokenDetails, setTokenDetails] = useState();
    const getCoinBalance = async () => {
        let URL = `https://api.binance.com/api/v3/ticker/price?symbol=ETHUSDT`
        fetch(URL).then(response => response.json())
            .then(data => {
                setTokenDetails(data)
            });
    }
    useEffect(() => {
        getCoinBalance()
    }, [])
    console.log('tokenDetails', tokenDetails);






    // render components
    const renderHeader = () => (
        <View>


            <View style={styles.top_container}>
                <Text style={styles.text_13_w}>ETH</Text>
                <Text style={styles.text_16_w}>Ethereum</Text>
                <Text style={styles.text_30_w}>${tokenDetails && parseFloat(tokenDetails.price)}</Text>
                <View style={styles.row_}>
                    <Text style={styles.text_12_loss}>$-30.89 (-0.93%) </Text>
                    <Text style={styles.text_12_w}>Today</Text>
                </View>
            </View>

            <View style={styles.container}>
                {/* {filteredData &&
                    <LineChart
                        data={filteredData}
                        thickness={2}
                        color={Colors.SUCCESS}
                        shadowColor={Colors.SUCCESS}
                        shadowWidth={3}
                        shadowOpacity={1}
                        hideDataPoints
                        yAxisColor="transparent"
                        xAxisColor="transparent"
                        yAxisTextStyle={styles.text_12_num}
                        width={width - 60}
                        height={260}
                        hideRules
                        initialSpacing={0}
                        pointerConfig={{
                            pointerColor: Colors.PRIMARY,
                            pointerBorderWidth: 1,
                            pointerRadius: scale(4),
                            pointerBorderColor: Colors.WHITE,
                            pointerStripWidth: scale(1),
                            pointerStripColor: Colors.WHITE,
                            pointerSize: scale(8),
                        }}
                    />
                } */}

                <View style={styles.buttonContainer}>
                    {['1D', '1W', '1M', '3M', '1Y', '3Y'].map((tf) => (
                        <TouchableOpacity key={tf} onPress={() => setTimeFrame(tf.toLowerCase())} style={[styles.time_btn, timeFrame === tf.toLowerCase() && { backgroundColor: Colors.PRIMARY, }]}>
                            <Text style={[styles.button, timeFrame === tf.toLowerCase() && styles.activeButton]}>{tf}</Text>
                        </TouchableOpacity>
                    ))}
                </View>
            </View>
        </View>
    );

    const renderFooter = () => (
        <View style={styles.bottom_container}>
            <View style={{ gap: scale(5), marginVertical: verticalScale(20) }}>
                <Text style={styles.para_10_w}>Your balance</Text>
                <Text style={[styles.text_16_w, { fontFamily: 'LatoBlack' }]}>$0.00</Text>
                <Text style={styles.text_12_num}>0 ETH</Text>
            </View>
            <View style={styles.row_between}>
                <TouchableOpacity style={styles.footer_btn}>
                    <Text style={styles.footer_btn_txt}>Receive</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.footer_btn} onPress={() => navigation.navigate('SendCoin')}>
                    <Text style={styles.footer_btn_txt}>Send</Text>
                </TouchableOpacity>
            </View>
            <View style={{ marginVertical: verticalScale(20) }}>
                <Text style={styles.text_14_w}>Ethereum activity</Text>
                <TokenTransaction />
            </View>
        </View>
    );

    return (
        <SafeAreaView style={styles.root}>
            <View style={styles.header}>
                <TouchableOpacity style={styles.back_btn} onPress={() => navigation.goBack()}>
                    <Ionicons name="arrow-back-outline" size={scale(24)} color={Colors.WHITE} />
                </TouchableOpacity>
                <View style={{ justifyContent: 'center', alignItems: 'center', gap: scale(5) }}>
                    <Text style={styles.text_14_w}>ETH</Text>
                    <Text style={styles.text_12_g}>Ethereum Mainnet</Text>
                </View>
                <TouchableOpacity>
                    <MaterialCommunityIcons name="dots-vertical" size={scale(24)} color={Colors.WHITE} />
                </TouchableOpacity>
            </View>
            <FlatList
                data={filteredData}
                // renderItem={({ item }) => <TokenTransaction />}
                ListHeaderComponent={renderHeader}
                ListFooterComponent={renderFooter}
                keyExtractor={(item, index) => index.toString()}
            />
            <View style={styles.footer}>
                <TouchableOpacity style={styles.footer_btn}>
                    <Text style={styles.footer_btn_txt}>Buy</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.footer_btn, { backgroundColor: Colors.PRIMARY }]}>
                    <Text style={[styles.footer_btn_txt, { color: Colors.BLACK }]}>Swap</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
}

export default ChartPage;

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
        width: scale(35),
        height: scale(35),
        borderRadius: scale(35 / 2),
        justifyContent: 'center',
        alignItems: 'center'
    },
    para_10_w: {
        fontSize: scale(10),
        color: Colors.WHITE,
        fontFamily: 'LatoRegular'
    },
    text_13_w: {
        fontSize: scale(13),
        fontFamily: 'RalewayBold',
        color: Colors.WHITE
    },
    text_14_w: {
        fontSize: scale(14),
        fontFamily: 'RalewayBold',
        color: Colors.WHITE
    },
    text_16_w: {
        fontSize: scale(16),
        fontFamily: 'RalewayBold',
        color: Colors.WHITE
    },
    text_30_w: {
        fontSize: scale(30),
        fontFamily: 'LatoBlack',
        color: Colors.WHITE
    },
    text_12_num: {
        fontSize: scale(12),
        fontFamily: 'LatoBlack',
        color: Colors.WHITE
    },
    text_12_w: {
        fontSize: scale(12),
        fontFamily: 'RalewaySemiBold',
        color: Colors.WHITE
    },
    text_12_g: {
        fontSize: scale(12),
        fontFamily: 'RalewaySemiBold',
        color: Colors.GRAY_05
    },
    text_12_profit: {
        fontSize: scale(12),
        fontFamily: 'LatoBold',
        color: Colors.SUCCESS
    },
    text_12_loss: {
        fontSize: scale(12),
        fontFamily: 'LatoBold',
        color: Colors.DANGER
    },
    content_: {
        // paddingHorizontal: moderateScale(15)
    },
    row_: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    row_between: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    top_container: {
        gap: scale(3),
        paddingHorizontal: moderateScale(15),
        marginVertical: verticalScale(10)
    },
    footer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: moderateScale(15),
        width: '100%',
        height: scale(80),
        borderTopColor: Colors.PLACEHOLDER,
        borderTopWidth: scale(0.3),

    },
    footer_btn: {
        height: scale(45),
        width: '48%',
        borderWidth: 1,
        borderColor: Colors.PRIMARY,
        borderRadius: scale(45 / 2),
        justifyContent: 'center',
        alignItems: 'center'
    },
    footer_btn_txt: {
        fontSize: scale(14),
        fontFamily: 'RalewaySemiBold',
        color: Colors.PRIMARY
    },
    bottom_container: {
        paddingHorizontal: moderateScale(15)
    },
    // chart
    container: {
        flex: 1,
        paddingHorizontal: 20,
    },
    chart: {
        marginVertical: 20,
    },
    time_btn: {
        width: scale(35),
        height: scale(35),
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: scale(40)
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginVertical: 10,
    },
    button: {
        color: 'white',
        fontSize: 16,
    },
    activeButton: {
        fontFamily: 'LatoBold',
        color: Colors.WHITE,
        fontSize: scale(13)
        // borderBottomWidth: 2,
    },
})