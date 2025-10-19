import React from 'react';
import { View, Image, Text, StyleSheet } from 'react-native';
import type { TeamDetail } from '../types';

interface TeamHeaderProps {
    team: TeamDetail;
}

export const TeamHeader: React.FC<TeamHeaderProps> = ({team}) => {
    return (
        <View style={styles.header}>
            <Image source={{ uri: team.crest }} style={styles.crest} />
            <Text style={styles.teamName}>{team.name}</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    header: {
        alignItems: 'center',
        padding: 24,
        backgroundColor: '#fff',
        marginBottom: 8,
    },
    crest: {
        width: 100,
        height: 100,
        marginBottom: 16,
    },
    teamName: {
        fontSize: 24,
        fontWeight: '700',
        color: '#1a1a1a',
        textAlign: 'center',
    },
});
