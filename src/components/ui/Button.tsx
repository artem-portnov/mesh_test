import React from 'react';
import { TouchableOpacity, Text, StyleSheet, ViewStyle, StyleProp } from 'react-native';

interface ButtonProps {
    title: string;
    onPress: () => void;
    disabled?: boolean;
    style?: StyleProp<ViewStyle>;
}

export const Button: React.FC<ButtonProps> = ({
                                                  title,
                                                  onPress,
                                                  disabled = false,
                                                  style,
                                              }) => {
    return (
        <TouchableOpacity
            style={[styles.button, disabled && styles.disabled, style]}
            onPress={onPress}
            disabled={disabled}
        >
            <Text style={[styles.text, disabled && styles.disabledText]}>
                {title}
            </Text>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    button: {
        backgroundColor: '#1f7aec',
        paddingHorizontal: 16,
        paddingVertical: 10,
        borderRadius: 8,
        alignItems: 'center',
        justifyContent: 'center',
    },
    disabled: {
        backgroundColor: '#eee',
    },
    text: {
        color: '#fff',
        fontWeight: '600',
        fontSize: 14,
    },
    disabledText: {
        color: '#777',
    },
});
