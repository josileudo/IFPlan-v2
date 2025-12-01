import { StyleSheet, Text, View } from "react-native";
import { ButtonIcon } from "../ButtonIcon";
import { useRouter } from "expo-router";
import { colors } from "@/theme";

type Props = {
  title: string;
  onNavigate?: () => void;
};

export const Header = ({ title, onNavigate }: Props) => {
  const router = useRouter();

  const handleNavigate = () => {
    if (onNavigate) onNavigate();
    else router.back();
  };

  return (
    <View style={styles.container}>
      <ButtonIcon icon="arrow-left" onPress={handleNavigate} />
      <Text style={styles.title}>{title}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    gap: 12,
    padding: 12,
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    color: colors.textPrimary,
  },
});
