import React, { useEffect } from 'react';
import {
    StyleSheet,
    View,
    Text,
    Image,
    ScrollView
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import type { RouteProp } from '@react-navigation/native';
import { AppDispatch, RootState } from '../store';
import { loadTeamDetails } from '../store/slices/teamDetailsSlice';

type Props = {
    route: RouteProp<{ TeamDetails: { teamId: number; teamName: string } }, 'TeamDetails'>;
};

export default function TeamDetailsScreen({ route }: Props) {
    const { teamId, teamName } = route.params;
    const dispatch = useDispatch<AppDispatch>();
    const { detail, matches, loading, error } = useSelector((state: RootState) => state.teamDetails);

    useEffect(() => {
        dispatch(loadTeamDetails(teamId));
    }, [dispatch, teamId]);

    if (loading) {
        return (
            <View style={styles.center}>
                <Text>Загрузка информации о команде...</Text>
            </View>
        );
    }

    if (error) {
        return (
            <View style={styles.center}>
                <Text>Ошибка: {error}</Text>
            </View>
        );
    }

    return (
        <ScrollView style={styles.container}>
            <View style={styles.header}>
                <Image source={{ uri: detail?.crest }} style={styles.crest} />
                <Text style={styles.teamName}>{detail?.name || teamName}</Text>
            </View>

            <View style={styles.section}>
                <Text style={styles.sectionTitle}>Состав команды</Text>
                {detail?.squad?.map(player => (
                    <View key={player.id} style={styles.playerItem}>
                        <Text style={styles.playerName}>{player.name}</Text>
                        <Text style={styles.playerPosition}>{player.position}</Text>
                    </View>
                ))}
            </View>

            <View style={styles.section}>
                <Text style={styles.sectionTitle}>Ближайшие матчи</Text>
                {matches?.map(match => (
                    <View key={match.id} style={styles.matchItem}>
                        <Text style={styles.matchTeams}>
                            {match.homeTeam.name} vs {match.awayTeam.name}
                        </Text>
                        <Text style={styles.matchDate}>
                            {new Date(match.utcDate).toLocaleString()}
                        </Text>
                        <Text style={styles.matchCompetition}>
                            {match.competition.name}
                        </Text>
                    </View>
                ))}
                {!matches?.length && (
                    <Text style={styles.noMatches}>Нет запланированных матчей</Text>
                )}
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f8f9fa',
    },
    center: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 48,
    },
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
    section: {
        backgroundColor: '#fff',
        padding: 16,
        marginBottom: 8,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: '600',
        color: '#1a1a1a',
        marginBottom: 12,
    },
    playerItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 8,
        borderBottomWidth: 1,
        borderBottomColor: '#eee',
    },
    playerName: {
        fontSize: 16,
        color: '#222',
    },
    playerPosition: {
        fontSize: 14,
        color: '#666',
    },
    matchItem: {
        padding: 12,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
    },
    matchTeams: {
        fontSize: 16,
        fontWeight: '500',
        color: '#222',
    },
    matchCompetition: {
        fontSize: 14,
        color: '#1f7aec',
        marginTop: 4,
    },
    matchDate: {
        fontSize: 14,
        color: '#666',
        marginTop: 2,
    },
    noMatches: {
        textAlign: 'center',
        color: '#666',
        fontStyle: 'italic',
    },
});