import React from 'react';
import { View, ActivityIndicator, Text, StyleSheet } from 'react-native';

interface LoadingSpinnerProps {
    text: string;
}

export const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({text}) => {
    return (
        <View style={styles.container}>
            <ActivityIndicator size={'large'} color='#1f7aec'/>
            <Text style={styles.text}>{text}</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 20,
    },
    text: {
        marginTop: 12,
        fontSize: 16,
        color: '#666',
        textAlign: 'center',
    },
});
