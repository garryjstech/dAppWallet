import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import Colors from '../constents/Colors'

const Transactions = () => {
    return (
        <SafeAreaView style={styles.container}>
            <Text>Transactions</Text>
        </SafeAreaView>
    )
}

export default Transactions

const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: '100%',
        backgroundColor: Colors.BACKGROUND
    },
})