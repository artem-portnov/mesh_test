import React, { useEffect } from 'react';
import {
    FlatList,
    StyleSheet,
    View,
    Text,
    Image,
    TouchableOpacity
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../navigation';
import { AppDispatch, RootState } from '../store';
import { loadTeams } from '../store/slices/teamsSlice.ts';

type TeamsNavigationProp = StackNavigationProp<RootStackParamList, 'Teams'>;

export default function TeamsScreen() {
    const dispatch = useDispatch<AppDispatch>();
    const {items, loading, error, offset, limit, hasNext, hasPrev} = useSelector((state: RootState) => state.teams);
    const navigation = useNavigation<TeamsNavigationProp>();

    useEffect(() => {
        dispatch(loadTeams(offset));
    }, [dispatch, offset]);

    const handleTeamPress = (teamId: number, teamName: string) => {
        navigation.navigate('TeamDetails', {
            teamId,
            teamName
        });
    };
    const handleNext = () => {
        if (hasNext) {
            dispatch(loadTeams(offset + limit));
        }
    };

    const handlePrev = () => {
        if (hasPrev) {
            dispatch(loadTeams(offset - limit));
        }
    };

    if (loading) {
        return (
            <View style={styles.center}>
                <Text>Загрузка...</Text>
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
        <View style={styles.container}>
            <FlatList
                data={items}
                renderItem={({item}) => (
                    <TouchableOpacity
                        style={styles.item}
                        onPress={() => handleTeamPress(item.id, item.name)}
                    >
                        <Image source={{uri: item.crest}} style={styles.logo} resizeMode="contain"/>
                        <Text>{item.name}</Text>
                    </TouchableOpacity>
                )}
                keyExtractor={(item) => item.id.toString()}
            />
            <View style={styles.pagination}>
                <TouchableOpacity
                    style={[styles.paginationButton, !hasPrev && styles.paginationButtonDisabled]}
                    onPress={handlePrev}
                    disabled={!hasPrev}
                >
                    <Text style={styles.paginationButtonText}>Назад</Text>
                </TouchableOpacity>

                <Text style={styles.pageInfo}>
                    Страница {Math.floor(offset / limit) + 1}
                </Text>

                <TouchableOpacity
                    style={[styles.paginationButton, !hasNext && styles.paginationButtonDisabled]}
                    onPress={handleNext}
                    disabled={!hasNext}
                >
                    <Text style={styles.paginationButtonText}>Вперед</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    center: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 48
    },
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