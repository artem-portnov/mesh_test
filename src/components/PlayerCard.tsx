import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import type { SquadMember } from '../types';

interface PlayerCardProps {
    player: SquadMember;
}

export const PlayerCard: React.FC<PlayerCardProps> = ({player}) => {
    return (
        <View style={styles.playerItem}>
            <Text style={styles.playerName}>{player.name}</Text>
            <Text style={styles.playerPosition}>{player.position}</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    playerItem: {
        backgroundColor: '#fff',
        paddingHorizontal: 16,
        paddingVertical: 8,
        borderBottomWidth: 1,
        borderBottomColor: '#eee',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    playerName: {
        fontSize: 16,
        color: '#222',
    },
    playerPosition: {
        fontSize: 14,
        color: '#666',
    },
});
