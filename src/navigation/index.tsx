import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import TeamsScreen from '../screens/TeamsScreen';
import TeamDetailsScreen from '../screens/TeamDetailsScreen';

export type RootStackParamList = {
    Teams: undefined;
    TeamDetails: { teamId: number; teamName: string };
};

const Stack = createStackNavigator<RootStackParamList>();

export default function RootNavigator() {
    return (
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen
                    name="Teams"
                    component={TeamsScreen}
                    options={{
                        title: 'Команды',
                        headerTitleAlign: 'center'
                    }}
                />
                <Stack.Screen
                    name="TeamDetails"
                    component={TeamDetailsScreen}
                    options={({route}) => ({
                        title: route.params.teamName,
                        headerBackTitle: 'Назад',
                        headerTitleAlign: 'center'
                    })}
                />
            </Stack.Navigator>
        </NavigationContainer>
    );
}
