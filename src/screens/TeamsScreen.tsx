import React, { useCallback, useEffect } from 'react';
import {
    FlatList,
    StyleSheet,
    View,
    ListRenderItem,
    RefreshControl
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../navigation';
import { EmptyState, ErrorDisplay, LoadingSpinner, Pagination, TeamCard } from '../components';
import { AppDispatch, RootState } from '../store';
import { loadTeams } from '../store/slices/teamsSlice.ts';
import { Team } from '../types';

type TeamsNavigationProp = StackNavigationProp<RootStackParamList, 'Teams'>;

export default function TeamsScreen() {
    const dispatch = useDispatch<AppDispatch>();
    const {items, loading, error, offset, limit, hasNext, hasPrev} = useSelector((state: RootState) => state.teams);
    const navigation = useNavigation<TeamsNavigationProp>();

    useEffect(() => {
        dispatch(loadTeams(offset));
    }, [dispatch, offset]);

    const handleRetry = useCallback(() => {
        dispatch(loadTeams(offset));
    }, [dispatch, offset]);

    const handleRefresh = useCallback(() => {
        dispatch(loadTeams(offset));
    }, [dispatch, offset]);

    const handleTeamPress = useCallback((team: Team) => {
        navigation.navigate('TeamDetails', {
            teamId: team.id,
            teamName: team.name
        });
    }, [navigation]);

    const handleNext = useCallback(() => {
        if (hasNext) {
            dispatch(loadTeams(offset + limit));
        }
    }, [dispatch, hasNext, offset, limit]);

    const handlePrev = useCallback(() => {
        if (hasPrev) {
            dispatch(loadTeams(offset - limit));
        }
    }, [dispatch, hasPrev, offset, limit]);

    const renderItem: ListRenderItem<Team> = ({item}) => (
        <TeamCard
            team={item}
            onPress={handleTeamPress}
        />
    );

    if (loading) {
        return <LoadingSpinner text='Загрузка списка команд...'/>
    }

    if (error) {
        return <ErrorDisplay error={error} onRetry={handleRetry}/>
    }

    return (
        <View style={styles.container}>
            <FlatList
                data={items}
                renderItem={renderItem}
                keyExtractor={(item) => item.id.toString()}
                refreshControl={
                    <RefreshControl
                        refreshing={loading && items.length > 0}
                        onRefresh={handleRefresh}
                        colors={['#1f7aec']}
                        tintColor='#1f7aec'
                    />
                }
                ListEmptyComponent={
                    <EmptyState
                        title='Список команд пуст'
                        actionText='Обновить'
                        onAction={handleRefresh}
                    />
                }
            />
            <Pagination
                currentPage={Math.floor(offset / limit) + 1}
                hasNext={hasNext}
                hasPrev={hasPrev}
                handlePrev={handlePrev}
                handleNext={handleNext}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    }
});