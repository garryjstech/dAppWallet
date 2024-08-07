import React from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { scale, verticalScale } from 'react-native-size-matters';
import Colors from '../constents/Colors';
import Feather from '@expo/vector-icons/Feather';


const TokenTransaction = () => {
    const transactions = [
        {
            date: 'Jul 26 at 11:01 am',
            type: 'Contract Deployment',
            status: 'Confirmed',
            amount: '0.00568',
            currency: 'SepoliaETH',
            transType: 'Contract'
        },
        {
            date: 'Jul 9 at 12:23 pm',
            type: 'Contract Deployment',
            status: 'Confirmed',
            amount: '0.00518',
            currency: 'SepoliaETH',
            transType: 'Contract'
        },
        {
            date: 'Jun 13 at 1:15 pm',
            type: 'Sent SLT',
            status: 'Confirmed',
            amount: '10',
            currency: 'SLT',
            transType: 'Sent'
        },
        {
            date: 'Jun 13 at 1:11 pm',
            type: 'Receive SepoliaETH',
            status: 'Confirmed',
            amount: '0.01',
            currency: 'SepoliaETH',
            transType: 'Receive'
        },
        {
            date: 'Jun 11 at 2:32 pm',
            type: 'Contract Deployment',
            status: 'Confirmed',
            amount: '0.01084',
            currency: 'SepoliaETH',
            transType: 'Contract'
        },
    ];


    const renderItem = ({ item }) => (
        <View style={styles.transactionItem}>
            <View style={styles.iconContainer}>
                {item?.transType === 'Contract' ?
                    <Feather name="repeat" size={scale(16)} color={Colors.PRIMARY} />
                    : item?.transType === 'Sent' ?
                        <Feather name="arrow-up-right" size={scale(16)} color={Colors.PRIMARY} />
                        : item?.transType === 'Receive' ?
                            <Feather name="arrow-down-right" size={scale(16)} color={Colors.PRIMARY} />
                            : null}
            </View>
            <View style={styles.detailsContainer}>
                <Text style={styles.dateText}>{item.date}</Text>
                <Text style={styles.typeText}>{item.type}</Text>
                <Text style={styles.statusText}>{item.status}</Text>
            </View>
            <View style={styles.amountContainer}>
                <Text style={styles.amountText}>{item.amount}</Text>
                <Text style={styles.currencyText}>{item.currency}</Text>
            </View>
        </View>
    );
    return (
        <FlatList
            data={transactions}
            renderItem={renderItem}
            keyExtractor={(item, index) => index.toString()}
        />
    )
}

export default TokenTransaction

const styles = StyleSheet.create({
    transactionItem: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: verticalScale(10),
    },
    iconContainer: {
        marginRight: scale(10),
        borderWidth: 1,
        borderColor: Colors.PRIMARY,
        width: scale(35),
        height: scale(35),
        borderRadius: scale(35 / 2),
        justifyContent: 'center',
        alignItems: 'center'
    },
    detailsContainer: {
        flex: 1,
        gap: scale(5)
    },
    dateText: {
        fontSize: scale(10),
        fontFamily: 'LatoBold',
        color: Colors.GRAY_05,
    },
    typeText: {
        fontSize: scale(12),
        fontFamily: 'RalewaySemiBold',
        color: Colors.WHITE,
    },
    statusText: {
        fontSize: scale(10),
        fontFamily: 'RalewaySemiBold',
        color: Colors.SUCCESS,
    },
    amountContainer: {
        alignItems: 'flex-end',
        gap: scale(5)
    },
    amountText: {
        fontSize: scale(12),
        fontFamily: 'LatoBold',
        color: Colors.WHITE,
    },
    currencyText: {
        fontSize: scale(10),
        fontFamily: 'LatoBold',
        color: Colors.GRAY,
    },
});