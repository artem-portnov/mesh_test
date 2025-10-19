import React, { useState, useEffect } from 'react';
import {
    FlatList,
    StyleSheet,
    View,
    Text,
    Image
} from 'react-native';
import { fetchTeams } from '../api/teams.ts';
import { Team } from '../types';

const LIMIT = 10
export default function TeamsScreen() {
    const [teams, setTeams] = useState<Team[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        loadTeams()
    }, []);


    const loadTeams = async () => {
        setLoading(true);
        try {
            const response = await fetchTeams({ limit: LIMIT, offset: 0 });
            setTeams(response.teams);
        } catch (err) {
            console.error('Ошибка загрузки: ', err);
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <View style={styles.center}>
                <Text>Загрузка...</Text>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <FlatList
                data={teams}
                renderItem={({item}) => (
                    <View style={styles.item}>
                        <Image source={{uri: item.crest}} style={styles.logo} resizeMode="contain"/>
                        <Text>{item.name}</Text>
                    </View>
                )}
                keyExtractor={(item) => item.id.toString()}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
    },
    center: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
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
    name: {}
});