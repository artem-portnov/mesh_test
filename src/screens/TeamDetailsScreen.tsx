import React, { useCallback, useEffect } from 'react';
import {
    StyleSheet,
    View,
    Text,
    FlatList
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import type { RouteProp } from '@react-navigation/native';
import { EmptyState, ErrorDisplay, LoadingSpinner, MatchCard, PlayerCard, TeamHeader } from '../components';
import { AppDispatch, RootState } from '../store';
import { loadTeamDetails } from '../store/slices/teamDetailsSlice';
import { Match, SquadMember } from '../types';

type Props = {
    route: RouteProp<{ TeamDetails: { teamId: number; teamName: string } }, 'TeamDetails'>;
};

export default function TeamDetailsScreen({ route }: Props) {
    const { teamId } = route.params;
    const dispatch = useDispatch<AppDispatch>();
    const { detail, matches, loading, error } = useSelector((state: RootState) => state.teamDetails);

    useEffect(() => {
        dispatch(loadTeamDetails(teamId));
    }, [dispatch, teamId]);

    const handleRetry = useCallback(() => {
        dispatch(loadTeamDetails(teamId));
    }, [dispatch, teamId]);

    const renderSquadMember = useCallback(({item}: { item: SquadMember }) => (
        <PlayerCard player={item} />
    ), []);

    const renderMatch = useCallback(({item}: { item: Match }) => (
        <MatchCard match={item}/>
    ), []);

    if (loading) {
        return <LoadingSpinner text='Загрузка информации о команде...' />
    }

    if (error) {
        return <ErrorDisplay error={error} onRetry={handleRetry}/>
    }

    return (
        <View style={styles.container}>
            {detail && <TeamHeader team={detail}/>}

            <View style={styles.section}>
                <Text style={styles.sectionTitle}>Состав команды</Text>
                <FlatList
                    data={detail?.squad}
                    keyExtractor={(item) => item.id.toString()}
                    renderItem={renderSquadMember}
                    style={styles.flex}
                    ListEmptyComponent={
                        <EmptyState title={'Состав игроков отсутствует'}/>
                    }
                />
            </View>

            <View style={[styles.section, styles.matchSection]}>
                <Text style={styles.sectionTitle}>Ближайшие матчи</Text>
                <FlatList
                    data={matches}
                    keyExtractor={(item) => String(item.id)}
                    renderItem={renderMatch}
                    style={styles.flex}
                    ListEmptyComponent={
                        <EmptyState title={'Нет запланированных матчей'}/>
                    }
                />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f2f2f2',
    },
    section: {
        backgroundColor: '#fff',
        marginBottom: 8,
        flex: 1,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: '600',
        color: '#1a1a1a',
        paddingHorizontal: 16,
        paddingVertical: 8,
    },
    flex: {
        flex: 1,
    },
    matchSection: {
        height: 300,
    },
});