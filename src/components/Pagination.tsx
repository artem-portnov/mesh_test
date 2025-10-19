import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Button } from './ui';

interface PaginationProps {
    currentPage: number;
    hasNext: boolean;
    hasPrev: boolean;
    handlePrev: () => void;
    handleNext: () => void;
}

export const Pagination: React.FC<PaginationProps> = ({
                                                          currentPage,
                                                          hasNext,
                                                          hasPrev,
                                                          handlePrev,
                                                          handleNext
                                                      }) => {
    return (
        <View style={styles.pagination}>
            <Button
                title={'Назад'}
                style={[styles.paginationButton, !hasNext && styles.paginationButtonDisabled]}
                onPress={handlePrev}
                disabled={!hasPrev}
            />

            <Text style={styles.pageInfo}>
                Страница {currentPage}
            </Text>

            <Button
                title={'Вперед'}
                style={[styles.paginationButton, !hasNext && styles.paginationButtonDisabled]}
                onPress={handleNext}
                disabled={!hasNext}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    pagination: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 16,
        backgroundColor: '#fff',
    },
    paginationButton: {
        paddingHorizontal: 16,
        paddingVertical: 8,
        backgroundColor: '#1f7aec',
        borderRadius: 6,
    },
    paginationButtonDisabled: {
        backgroundColor: '#ccc',
    },
    paginationButtonText: {
        color: '#fff',
    },
    pageInfo: {
        fontSize: 14,
        color: '#666',
    },
});
