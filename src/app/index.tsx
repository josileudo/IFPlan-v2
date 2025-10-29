import { colors } from "@/theme";
import { LinearGradient } from "expo-linear-gradient";
import {
  ImageBackground,
  SafeAreaView,
  StatusBar,
  Text,
  View,
} from "react-native";
import { router } from "expo-router";
import { HomeScreen } from "./screens/Home";
import { Button } from "./components/Button";

export default function Index() {
  const { navigate } = router;
  const image = require("../assets/background.png");
  return (
    <ImageBackground
      source={image}
      resizeMode="cover"
      imageStyle={{ opacity: 0.2 }}
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <LinearGradient
        colors={[colors.background, colors.transparency]}
        start={{ x: 0, y: -0.6 }}
        style={{ flex: 1, width: "100%", paddingHorizontal: 12 }}
      >
        <StatusBar barStyle="light-content" />
        <HomeScreen />
      </LinearGradient>
    </ImageBackground>
  );
}
