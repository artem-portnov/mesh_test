import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import type { Match } from '../types';

interface MatchCardProps {
    match: Match;
}

export const MatchCard: React.FC<MatchCardProps> = ({match}) => {
    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.opponent}>{match.homeTeam.name} — {match.awayTeam.name}</Text>
                <Text style={styles.date}>{new Date(match.utcDate).toLocaleString()}</Text>
            </View>
            <Text style={styles.competition}>{match.competition?.name}</Text>
        </View>
    );
};


const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        paddingHorizontal: 16,
        paddingVertical: 12,
        borderBottomWidth: 1,
        borderBottomColor: '#f0f0f0',
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 4,
    },
    opponent: {
        fontSize: 16,
        fontWeight: '700',
        color: '#1a1a1a',
        flex: 1,
    },
    date: {
        fontSize: 14,
        color: '#6c757d',
        fontWeight: '500',
    },
    competition: {
        fontSize: 14,
        color: '#1f7aec',
        fontWeight: '600',
    },
});
