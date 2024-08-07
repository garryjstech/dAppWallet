import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Wallet } from '../screens';
import BottomTabs from './BottomTabs';
import { Agreement, ChartPage, ConfirmPassword, EnterPhrase, ImportAccount, ImportPharse, NewWallet, NoInternet, OnBoarding, PhraseVerified, SecureWallet, SecureWalletAgree, SendAmmount, SendAmountConfirm, SendCoin, ShowPhrase, WalletSetup } from '../pages';




const Stack = createNativeStackNavigator();


const Roots = () => {



    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName="BottomTabs" screenOptions={{ headerShown: false, unmountOnBlur: true }}>

                <Stack.Group screenOptions={{ headerShown: false, animation: "slide_from_right", animationDuration: 1500, unmountOnBlur: true, }}>

                    <Stack.Screen name="OnBoarding" component={OnBoarding} />
                    <Stack.Screen name="BottomTabs" component={BottomTabs} />
                    <Stack.Screen name="WalletSetup" component={WalletSetup} />
                    <Stack.Screen name="NewWallet" component={NewWallet} />
                    <Stack.Screen name="Agreement" component={Agreement} />
                    <Stack.Screen name="ImportPharse" component={ImportPharse} />
                    <Stack.Screen name="SecureWallet" component={SecureWallet} />
                    <Stack.Screen name="SecureWalletAgree" component={SecureWalletAgree} />
                    <Stack.Screen name="ShowPhrase" component={ShowPhrase} />
                    <Stack.Screen name="EnterPhrase" component={EnterPhrase} />
                    <Stack.Screen name="PhraseVerified" component={PhraseVerified} />
                    <Stack.Screen name="ChartPage" component={ChartPage} />
                    <Stack.Screen name="SendCoin" component={SendCoin} />
                    <Stack.Screen name="SendAmmount" component={SendAmmount} />
                    <Stack.Screen name="SendAmountConfirm" component={SendAmountConfirm} />
                    <Stack.Screen name="ImportAccount" component={ImportAccount} />
                </Stack.Group>

                <Stack.Group screenOptions={{ headerShown: false, animation: "slide_from_right", animationDuration: 1500, unmountOnBlur: true, }}>
                    <Stack.Screen name="ConfirmPassword" component={ConfirmPassword} />
                    <Stack.Screen name="Wallet" component={Wallet} />
                </Stack.Group>


            </Stack.Navigator>
        </NavigationContainer>
    )
}

export default Roots

const styles = StyleSheet.create({})