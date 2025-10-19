import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Button } from './Button';

interface EmptyStateProps {
    title: string;
    actionText?: string;
    onAction?: () => void;
}

export const EmptyState: React.FC<EmptyStateProps> = ({
                                                          title,
                                                          actionText,
                                                          onAction,
                                                      }) => {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>{title}</Text>
            {actionText && onAction && (
                <Button
                    title={actionText}
                    onPress={onAction}
                    style={styles.button}
                />
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        justifyContent: 'center',
        padding: 40,
    },
    title: {
        fontSize: 18,
        fontWeight: '600',
        color: '#222',
        textAlign: 'center',
        marginBottom: 8,
    },
    button: {
        marginTop: 16,
    },
});
