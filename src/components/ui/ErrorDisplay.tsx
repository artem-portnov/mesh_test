import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Button } from './Button';

interface ErrorDisplayProps {
    error: string;
    onRetry: () => void;
}

export const ErrorDisplay: React.FC<ErrorDisplayProps> = ({
                                                              error,
                                                              onRetry,
                                                          }) => {
    return (
        <View style={styles.container}>
            <Text style={styles.errorText}>{error}</Text>
            <Button
                title={'Повторить'}
                onPress={onRetry}
                style={styles.retryButton}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        justifyContent: 'center',
        padding: 20,
    },
    errorText: {
        color: '#dc3545',
        fontSize: 16,
        marginBottom: 16,
        textAlign: 'center',
    },
    retryButton: {
        marginTop: 8,
    },
});
