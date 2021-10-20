import React, { useEffect } from "react";
import { View, StyleSheet, KeyboardAvoidingView, Text } from "react-native";
import { Button } from "react-native-elements";
import { StatusBar } from "expo-status-bar";
import { ResponseType, useAuthRequest } from "expo-auth-session";
import { SPOTIFY_CLIENT_ID, SPOTIFY_REDIRECT_URL } from '@env';

const discovery = {
    authorizationEndpoint:
        "https://accounts.spotify.com/authorize",
    tokenEndpoint:
        "https://accounts.spotify.com/api/token",
};

const LoginScreen: React.FC = () => {

    const [request, response, promptAsync] = useAuthRequest(
        {
            responseType: ResponseType.Token,
            clientId: SPOTIFY_CLIENT_ID,
            scopes: [
                "user-read-currently-playing",
                "user-read-recently-played",
                "user-read-playback-state",
                "user-top-read",
                "user-modify-playback-state",
                "streaming",
                "user-read-email",
                "user-read-private",
            ],
            usePKCE: false,
            redirectUri: SPOTIFY_REDIRECT_URL,
        },
        discovery
    );

    useEffect(() => {
        if (response?.type === "success") {
          const { access_token } = response.params;
          console.log('access_token: ', access_token);
        //   setToken(access_token);
        }
      }, [response]);

    return (
        <KeyboardAvoidingView behavior="padding" style={styles.container}>
            <StatusBar style="light" />
            <Text
                style={{
                    fontSize: 30,
                    fontWeight: "bold",
                    color: "white",
                    marginBottom: "20%",
                }}
            >
                Spotify Song List
            </Text>
            <Button
                title="Login with Spotify"
                style={styles.button}
                onPress={() => {
                    promptAsync();
                }}
            />
            <View style={{ height: 100 }} />
        </KeyboardAvoidingView>
    );
}

export default LoginScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "black",
    },

    button: {
        width: 200,
        marginTop: 50,
    },
});