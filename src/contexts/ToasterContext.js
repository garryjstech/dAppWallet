import React, { createContext, useState, useContext, useCallback } from 'react';
import CustomAlert from '../config/CustomAlert';


const AlertContext = createContext();

export const useAlert = () => useContext(AlertContext);

export const ToasterProvider = ({ children }) => {
    const [alertVisible, setAlertVisible] = useState(false);
    const [alertMessage, setAlertMessage] = useState('');
    const [alertType, setAlertType] = useState('info');

    const showInfo = useCallback((message, type = 'info') => {
        setAlertMessage(message);
        setAlertType(type);
        setAlertVisible(true);

        setTimeout(() => {
            setAlertVisible(false);
        }, 3000);
    }, []);

    const showSuccess = useCallback((message, type = 'success') => {
        setAlertMessage(message);
        setAlertType(type);
        setAlertVisible(true);

        setTimeout(() => {
            setAlertVisible(false);
        }, 3000);
    }, []);
    const showError = useCallback((message, type = 'error') => {
        setAlertMessage(message);
        setAlertType(type);
        setAlertVisible(true);

        setTimeout(() => {
            setAlertVisible(false);
        }, 3000);
    }, []);

    return (
        <AlertContext.Provider value={{ showInfo, showSuccess, showError }}>
            {children}
            <CustomAlert
                message={alertMessage}
                type={alertType}
                visible={alertVisible}
                onDismiss={() => setAlertVisible(false)}
            />
        </AlertContext.Provider>
    );
};