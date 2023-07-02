import { useState, useEffect } from "react";
import { StyleSheet, SafeAreaView, FlatList } from "react-native";
import { ListItem } from "../components/ListItem";
// import dummyArticles from "./dummies/articles";
import axios from "axios";
import Constants from "expo-constants"; //app.jsonに追記〜 "extra": {"newsApiKey": "(ApiKey)"

const URL = `https://newsapi.org/v2/top-headlines?country=jp&category=business&apiKey=${Constants.manifest.extra.newsApiKey}`;

// export default function App() {
export const HomeScreen = ({ navigation }) => {
  const [articles, setArticles] = useState([]);
  const fetchArticles = async () => {
    try {
      const response = await axios.get(URL);
      console.log(response.data.articles);
      setArticles(response.data.articles);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchArticles();
  }, []);

  // const items = articles.map((article, index) => {
  //   return (
  //     <ListItem
  //       imageUrl={article.urlToImage}
  //       title={article.title}
  //       author={article.author}
  //       key={index.toString()} // 警告対応
  //     />
  //   );
  // });

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={articles}
        renderItem={({ item }) => {
          return (
            <ListItem
              imageUrl={item.urlToImage}
              title={item.title}
              author={item.author}
              onPress={() => navigation.navigate("Article", { article: item })}
            />
          );
        }}
        keyExtactor={(item, index) => index.toString()} // 警告対応
      />
    </SafeAreaView>
    // ScrollView は少ないときに使う
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "lightgray",
    // alignItems: "center", //frexDIrection の垂直方向：flex-Start, flexEnd,
    // justifyContent: "center", //frexDIrection の方向：flex-start, flex-end, space-between, space-around, space-evently
  },
  // text: {
  //   fontSize: 16,
  // },
  // subText: {
  //   fontSize: 12,
  //   color: "gray",
  // },
});

// データはこちら　https://github.com/takahi5/news-app-v2
