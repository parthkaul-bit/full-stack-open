import { View, StyleSheet, Pressable, Text } from "react-native";
import Constants from "expo-constants";
import theme from "../theme";
import { Link, useNavigate } from "react-router-native";
import { ScrollView } from "react-native";
import { useApolloClient, useQuery } from "@apollo/client";
import { GET_USER } from "../graphql/queries";
import useAuthStorage from "../hooks/useAuthStorage";
import { useEffect, useState } from "react";

const styles = StyleSheet.create({
  container: {
    height: 70,
    width: "100%",
    backgroundColor: "#24292e",
    color: "#fff",
    display: "flex",
    justifyContent: "center",
    justifyItem: "space-around",
    paddingLeft: 20,
    paddingTop: Constants.statusBarHeight,
  },
});

const AppBar = () => {
  const authStorage = useAuthStorage();
  const client = useApolloClient();
  const [accessToken, setAccessToken] = useState(null);
  const navigate = useNavigate();

  async function handleSignOut() {
    await authStorage.removeAccessToken();
    setAccessToken(null);
    await client.resetStore();
    navigate("/");
  }

  useEffect(() => {
    const fetchToken = async () => {
      const token = await authStorage.getAccessToken();
      console.log(token);

      setAccessToken(token);
    };

    fetchToken();
  }, []);

  const { data, loading, error } = useQuery(GET_USER, {
    context: {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    },
  });

  console.log(accessToken, "in appbar");
  console.log(data);

  return (
    <View style={styles.container}>
      <ScrollView horizontal>
        <Pressable>
          <Text
            style={{
              color: "white",
              fontFamily: theme.fonts.main,
              fontSize: theme.fontSizes.body,
              fontWeight: theme.fontWeights.bold,
            }}
          >
            Repositories
          </Text>
        </Pressable>
        {accessToken ? (
          <Pressable onPress={handleSignOut}>
            <Text
              style={{
                color: "white",
                fontFamily: theme.fonts.main,
                fontSize: theme.fontSizes.body,
                fontWeight: theme.fontWeights.bold,
                paddingLeft: 20,
              }}
            >
              Signout
            </Text>
          </Pressable>
        ) : (
          <Pressable>
            <Link to="/signin">
              <Text
                style={{
                  color: "white",
                  fontFamily: theme.fonts.main,
                  fontSize: theme.fontSizes.body,
                  fontWeight: theme.fontWeights.bold,
                  paddingLeft: 20,
                }}
              >
                Sign In
              </Text>
            </Link>
          </Pressable>
        )}
      </ScrollView>
    </View>
  );
};

export default AppBar;
