import React, { useEffect } from 'react';
import {
    FlatList,
    StyleSheet,
    View,
    Text,
    Image
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../store';
import { loadTeams } from '../store/slices/teamsSlice.ts';

export default function TeamsScreen() {
    const dispatch = useDispatch<AppDispatch>();
    const { items, loading, error } = useSelector((state: RootState) => state.teams);

    useEffect(() => {
        dispatch(loadTeams())
    }, [dispatch]);

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