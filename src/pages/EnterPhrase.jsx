import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { moderateScale, scale, verticalScale } from 'react-native-size-matters';
import { useNavigation } from '@react-navigation/native';
import Colors from '../constents/Colors';
import { ICONS } from '../constents/Images';

const EnterPhrase = () => {
    const navigation = useNavigation();
    const [selectedWords, setSelectedWords] = useState(Array(12).fill(''));
    const [availableWords, setAvailableWords] = useState([
        'Dart', 'Done', 'Favor', 'House', 'Gone', 'After', 'Good', 'Said', 'Alchemy', 'Dove', 'Memo', 'Caves'
    ]);
    const [isComplete, setIsComplete] = useState(false);

    console.log({ isComplete });
    useEffect(() => {
        // Check if all words are selected
        setIsComplete(selectedWords.every(word => word !== ''));
    }, [selectedWords]);

    const selectWord = (word, index) => {
        const newSelectedWords = [...selectedWords];
        const firstEmptyIndex = newSelectedWords.indexOf('');
        if (firstEmptyIndex !== -1) {
            newSelectedWords[firstEmptyIndex] = word;
            setSelectedWords(newSelectedWords);

            // Remove the word from available words
            const newAvailableWords = availableWords.filter((_, i) => i !== index);
            setAvailableWords(newAvailableWords);
        }
    };

    const renderSelectableWords = () => {
        return availableWords.map((word, index) => (
            <TouchableOpacity
                key={index}
                style={styles.wordButton}
                onPress={() => selectWord(word, index)}
            >
                <Text style={styles.wordText}>{word}</Text>
            </TouchableOpacity>
        ));
    };

    const renderSelectedWords = () => {
        return selectedWords.map((word, index) => (
            <View key={index} style={styles.numberBox}>
                <Text style={styles.numberText}>{index + 1}.</Text>
                <Text style={styles.selectedWordText}>{word}</Text>
            </View>
        ));
    };

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header_}>
                <Text style={styles.header_text_}>WEB3 WALLET</Text>
                <Text style={styles.text_14}>Confirm Secret Recovery Phrase</Text>
            </View>

            <ScrollView contentContainerStyle={styles.content}>
                <Text style={[styles.paragraph, { textAlign: 'center' }]}>
                    Select the words in the order at which you wrote them down to confirm your backup
                </Text>

                <View style={[styles.selectedWordsContainer, isComplete && { borderColor: Colors.SUCCESS }]}>
                    {renderSelectedWords()}
                </View>

                {!isComplete ?
                    <View style={styles.wordsContainer}>{renderSelectableWords()}</View>
                    :
                    <View style={{ marginTop: scale(40) }}>

                        <Image source={ICONS.checkmark} style={styles.icon__} resizeMode='contain' />
                    </View>
                }

            </ScrollView>

            <View style={styles.footer}>
                <View style={styles.button_container}>
                    <TouchableOpacity
                        style={[styles.button_, { backgroundColor: Colors.PRIMARY }]}
                        onPress={() => navigation.navigate('PhraseVerified')}
                        disabled={!isComplete}
                    >
                        <Text style={[styles.text_14, { color: Colors.WHITE }]}>Complete Backup</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </SafeAreaView>
    );
};

export default EnterPhrase;

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        width: '100%',
        height: '100%',
        backgroundColor: Colors.BACKGROUND,
    },
    header_: {
        marginTop: scale(18),
        paddingHorizontal: moderateScale(20),
        height: scale(60),
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    header_text_: {
        fontSize: scale(14),
        fontFamily: 'RalewayBold',
        textAlign: 'center',
        color: Colors.WHITE,
    },
    content: {
        paddingHorizontal: moderateScale(20),
        paddingVertical: verticalScale(10),
    },
    text_14: {
        fontSize: scale(14),
        color: Colors.PRIMARY,
        fontFamily: 'RalewayBold',
    },
    paragraph: {
        color: Colors.WHITE,
        fontFamily: 'RalewaySemiBold',
        fontSize: scale(14),
        lineHeight: scale(18),
    },
    selectedWordsContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        marginVertical: verticalScale(20),
        borderWidth: scale(2),
        borderColor: Colors.PRIMARY,
        borderRadius: scale(5),
        paddingHorizontal: moderateScale(5),
        paddingVertical: verticalScale(20),
    },
    numberBox: {
        width: '33%',
        padding: scale(8),
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 5,
        gap: scale(5),
        borderBottomWidth: 1,
        borderRadius: scale(4),
        borderColor: Colors.PRIMARY,
    },
    numberText: {
        fontSize: scale(14),
        color: Colors.PRIMARY,
        fontFamily: 'RalewayBold',
    },
    selectedWordText: {
        fontSize: scale(14),
        color: Colors.WHITE,
        fontFamily: 'RalewayBold',
    },
    wordsContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center',
    },
    wordButton: {
        borderWidth: 1,
        borderColor: Colors.PRIMARY,
        borderRadius: scale(5),
        padding: scale(8),
        margin: scale(4),
        alignItems: 'center',
    },
    wordText: {
        fontSize: scale(14),
        color: Colors.WHITE,
        fontFamily: 'RalewayBold',
    },
    footer: {
        height: '14%',
        justifyContent: 'center',
    },
    button_container: {
        justifyContent: 'center',
        alignContent: 'center',
        gap: scale(10),
        paddingHorizontal: moderateScale(20),
    },
    button_: {
        width: '100%',
        height: scale(45),
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: Colors.PRIMARY,
        borderRadius: scale(5),
    },
    icon__: {
        width: scale(50),
        height: scale(50),
        alignSelf: 'center'
    }
});