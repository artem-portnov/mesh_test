import React, { useState, useEffect } from 'react';
import {
    FlatList,
    StyleSheet,
    View,
    Text,
    Image
} from 'react-native';

type Team = {
    id: number;
    name: string;
    crest: string
};

export default function TeamsScreen() {
    const [teams, setTeams] = useState<Team[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const mockTeams: Team[] = [
            {
                id: 1,
                name: 'VfL Wolfsburg',
                crest: 'https://crests.football-data.org/11.png',
            },
            {
                id: 2,
                name: 'SV Werder Bremen',
                crest: 'https://crests.football-data.org/12.png',
            },
            {
                id: 3,
                name: '1. FC Kaiserslautern',
                crest: 'https://crests.football-data.org/13.png',
            }
        ];

        setTimeout(() => {
            setTeams(mockTeams);
            setLoading(false);
        }, 1000);
    }, []);

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