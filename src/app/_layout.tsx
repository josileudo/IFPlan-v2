import Loading from "@/app/components/Loading";
import { colors } from "@/theme/colors";
import {
  useFonts,
  Inter_700Bold,
  Inter_500Medium,
  Inter_400Regular,
} from "@expo-google-fonts/inter";
import { Stack } from "expo-router";
import { MMKVLoader } from "react-native-mmkv-storage";

export default function Layout() {
  const storage = new MMKVLoader().initialize();
  const [fontsLoaded] = useFonts({
    Inter_700Bold,
    Inter_500Medium,
    Inter_400Regular,
  });

  if (!fontsLoaded) {
    return <Loading />;
  }

  return (
    <Stack
      screenOptions={{
        headerShown: false,
        contentStyle: { backgroundColor: colors.background },
      }}
    />
  );
}
