import { router } from "expo-router";
import { View, Text, Image, SafeAreaView, ImageBackground } from "react-native";
import { styles } from "./styles";
import { Button } from "@/app/components/Button";

export const HomeScreen = () => {
  return (
    <SafeAreaView style={styles.container}>
      <View>
        <Text style={styles.title}>IFPlan – Leite à Pasto</Text>
        <Text style={styles.description}>
          O IFPlan ajuda pequenos produtores de leite a realizarem simulações e
          análises sobre produtividade, custos e lucratividade baseados em dados
          reais da propriedade.
        </Text>
      </View>

      <Button
        title="Iniciar"
        onPress={() => {
          router.navigate("/dashboard");
        }}
      />

      <View style={styles.footer}>
        <Image
          source={require("../../../assets/lapis.png")}
          style={styles.logo}
          resizeMode="contain"
          borderRadius={8}
        />

        <Text style={styles.privacyPolicy}>Políticas e privacidade</Text>
      </View>
    </SafeAreaView>
  );
};
