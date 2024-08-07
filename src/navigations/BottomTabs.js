import { Platform, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Browser, Settings, Transactions, Wallet } from '../screens';
import Icon from 'react-native-vector-icons/Ionicons';
import Colors from '../constents/Colors';
import { scale } from 'react-native-size-matters';

const Tab = createBottomTabNavigator();

const BottomTabs = () => {
    return (
        <Tab.Navigator
            initialRouteName="Wallet"
            screenOptions={({ route }) => ({
                headerShown: false,
                unmountOnBlur: true,
                tabBarShowLabel: false,
                tabBarStyle: styles.tabBar,
                tabBarHideOnKeyboard: true,
                tabBarIcon: ({ focused, color, size }) => {
                    let iconName;

                    if (route.name === 'Wallet') {
                        iconName = focused ? 'wallet' : 'wallet-outline';
                    } else if (route.name === 'Transactions') {
                        iconName = focused ? 'list' : 'list-outline';
                    } else if (route.name === 'Browser') {
                        iconName = focused ? 'globe' : 'globe-outline';
                    } else if (route.name === 'Settings') {
                        iconName = focused ? 'settings' : 'settings-outline';
                    }

                    // Return the Icon component with customized size
                    return <Icon name={iconName} size={scale(20)} color={color} />;
                },
                tabBarActiveTintColor: Colors.PRIMARY,
                tabBarInactiveTintColor: Colors.GRAY,
                tabBarShowLabel: false,
            })}
        >
            <Tab.Screen name="Wallet" component={Wallet} />
            <Tab.Screen name="Transactions" component={Transactions} />
            <Tab.Screen name="Browser" component={Browser} />
            <Tab.Screen name="Settings" component={Settings} />
        </Tab.Navigator>
    );
};

export default BottomTabs;

const styles = StyleSheet.create({
    tabBar: {
        backgroundColor: Colors.BACKGROUND,
        height: Platform.OS === 'android' ? scale(50) : scale(60),
        // borderTopLeftRadius: scale(30),
        // borderTopRightRadius: scale(30),
        // paddingBottom: scale(20),
        paddingTop: Platform.OS === 'android' ? scale(0) : scale(10),
    },
});