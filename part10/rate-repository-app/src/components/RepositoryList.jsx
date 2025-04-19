// const repositories = [
//   {
//     id: "jaredpalmer.formik",
//     fullName: "jaredpalmer/formik",
//     description: "Build forms in React, without the tears",
//     language: "TypeScript",
//     forksCount: 1589,
//     stargazersCount: 21553,
//     ratingAverage: 88,
//     reviewCount: 4,
//     ownerAvatarUrl: "https://avatars2.githubusercontent.com/u/4060187?v=4",
//   },
//   {
//     id: "rails.rails",
//     fullName: "rails/rails",
//     description: "Ruby on Rails",
//     language: "Ruby",
//     forksCount: 18349,
//     stargazersCount: 45377,
//     ratingAverage: 100,
//     reviewCount: 2,
//     ownerAvatarUrl: "https://avatars1.githubusercontent.com/u/4223?v=4",
//   },
//   {
//     id: "django.django",
//     fullName: "django/django",
//     description: "The Web framework for perfectionists with deadlines.",
//     language: "Python",
//     forksCount: 21015,
//     stargazersCount: 48496,
//     ratingAverage: 73,
//     reviewCount: 5,
//     ownerAvatarUrl: "https://avatars2.githubusercontent.com/u/27804?v=4",
//   },
//   {
//     id: "reduxjs.redux",
//     fullName: "reduxjs/redux",
//     description: "Predictable state container for JavaScript apps",
//     language: "TypeScript",
//     forksCount: 13902,
//     stargazersCount: 52869,
//     ratingAverage: 0,
//     reviewCount: 0,
//     ownerAvatarUrl: "https://avatars3.githubusercontent.com/u/13142323?v=4",
//   },
// ];

import { useState, useEffect } from "react";

import {
  FlatList,
  View,
  StyleSheet,
  TouchableHighlight,
  Text,
  Image,
} from "react-native";
import useRepositories from "../hooks/useRepositories";

const styles = StyleSheet.create({
  separator: {
    height: 10,
  },
  container: {
    padding: 20,
    backgroundColor: "white",
    width: "100%",
    alignSelf: "flex-start",
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  headerContainer: {
    flexDirection: "row",
    marginBottom: 15,
  },
  contentContainer: {
    marginLeft: 20,
    flex: 1,
    display: "flex",
  },
  language: {
    backgroundColor: "#0366d6",
    color: "white",
    padding: 5,
    borderRadius: 4,
    alignSelf: "flex-start",
    marginTop: 5,
  },
  statsContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 15,
  },
  statItem: {
    alignItems: "center",
  },
});

const formatCount = (count) => {
  if (count >= 1000) {
    return `${(count / 1000).toFixed(1)}k`;
  }
  return count;
};

const RepositoryItem = ({ item }) => (
  <View style={styles.container}>
    <View style={styles.headerContainer}>
      <Image style={styles.avatar} source={{ uri: item.ownerAvatarUrl }} />
      <View style={styles.contentContainer}>
        <Text style={{ fontWeight: "bold" }}>{item.fullName}</Text>
        <Text>{item.description}</Text>
        <Text style={styles.language}>{item.language}</Text>
      </View>
    </View>
    <View style={styles.statsContainer}>
      <View style={styles.statItem}>
        <Text style={{ fontWeight: "bold" }}>
          {formatCount(item.stargazersCount)}
        </Text>
        <Text>Stars</Text>
      </View>
      <View style={styles.statItem}>
        <Text style={{ fontWeight: "bold" }}>
          {formatCount(item.forksCount)}
        </Text>
        <Text>Forks</Text>
      </View>
      <View style={styles.statItem}>
        <Text style={{ fontWeight: "bold" }}>{item.reviewCount}</Text>
        <Text>Reviews</Text>
      </View>
      <View style={styles.statItem}>
        <Text style={{ fontWeight: "bold" }}>{item.ratingAverage}</Text>
        <Text>Rating</Text>
      </View>
    </View>
  </View>
);

const ItemSeparator = () => <View style={styles.separator} />;

const RepositoryList = () => {
  const { repositories } = useRepositories();

  // Get the nodes from the edges array
  const repositoryNodes = repositories
    ? repositories.edges.map((edge) => edge.node)
    : [];

  return (
    <FlatList
      data={repositoryNodes}
      ItemSeparatorComponent={ItemSeparator}
      renderItem={({ item }) => <RepositoryItem item={item} />}
      keyExtractor={(item) => item.id}
    />
  );
};

export default RepositoryList;
