import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useTheme } from "../hooks";
import { getNavigationTheme, screen } from "../utils";
import { TabNavigation } from "./TabNavigation";
import {
  FollowersScreen,
  FollowedsScreen,
  UserScreen,
  VideoScreen,
  VideosPublishedScreen,
  VideosFavoritesScreen,
} from "../screens/Shared";

const Stack = createNativeStackNavigator();

export function AppNavigation() {
  const { theme } = useTheme();
  const MyTheme = getNavigationTheme(theme);

  return (
    <NavigationContainer theme={MyTheme}>
      <Stack.Navigator>
        <Stack.Screen
          name={screen.app.tab}
          component={TabNavigation}
          options={{ headerShown: false }}
        />

        <Stack.Screen
          name={screen.app.user}
          component={UserScreen}
          options={{ title: "" }}
        />
        <Stack.Screen
          name={screen.app.video}
          component={VideoScreen}
          options={{ title: "", headerTransparent: true }}
        />
        <Stack.Screen
          name={screen.app.videosPublished}
          component={VideosPublishedScreen}
          options={{ title: "", headerTransparent: true }}
        />
        <Stack.Screen
          name={screen.app.videosFavorites}
          component={VideosFavoritesScreen}
          options={{ title: "", headerTransparent: true }}
        />

        <Stack.Group screenOptions={{ presentation: "modal" }}>
          <Stack.Screen
            name={screen.app.followers}
            component={FollowersScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name={screen.app.followeds}
            component={FollowedsScreen}
            options={{ headerShown: false }}
          />
        </Stack.Group>
      </Stack.Navigator>
    </NavigationContainer>
  );
}
