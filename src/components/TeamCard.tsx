import React from 'react';
import { TouchableOpacity, Image, Text, StyleSheet } from 'react-native';
import type { Team } from '../types';

interface TeamCardProps {
    team: Team;
    onPress: (team: Team) => void;
}

export const TeamCard: React.FC<TeamCardProps> = ({team, onPress}) => {
    return (
        <TouchableOpacity
            style={styles.item}
            onPress={() => onPress(team)}
        >
            <Image source={{uri: team.crest}} style={styles.logo} resizeMode='contain'/>
            <Text>{team.name}</Text>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    item: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 16,
        backgroundColor: '#fff',
        marginHorizontal: 16,
        marginVertical: 4,
        borderRadius: 12,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.1,
        shadowRadius: 2,
        elevation: 2,
    },
    logo: {
        width: 48,
        height: 48,
        marginRight: 16,
        borderRadius: 24,
    },
});
