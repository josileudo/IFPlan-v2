import { StyleSheet, Text, View } from "react-native";
import { ButtonIcon } from "../ButtonIcon";
import { useRouter } from "expo-router";
import { colors } from "@/theme";
import { MaterialIcons } from "@expo/vector-icons";

type Props = {
  title: string;
  iconLeft?: keyof typeof MaterialIcons.glyphMap & string;
  iconRight?: keyof typeof MaterialIcons.glyphMap & string;
  onActionLeft?: () => void;
  onActionRight?: () => void;
};

export const Header = ({
  title,
  iconLeft,
  iconRight,
  onActionLeft,
  onActionRight,
}: Props) => {
  const router = useRouter();

  const handleNavigate = () => {
    if (onActionLeft) onActionLeft();
    else router.back();
  };

  const handleActionRight = () => {
    if (onActionRight) onActionRight();
  };

  return (
    <View style={styles.container}>
      <View>
        {onActionLeft ? (
          <ButtonIcon
            icon={iconLeft ?? "arrow-left"}
            onPress={handleNavigate}
          />
        ) : (
          <ButtonIcon
            icon={iconLeft ?? "arrow-left"}
            onPress={handleNavigate}
          />
        )}
      </View>
      <Text style={styles.title}>{title}</Text>
      <View>
        {onActionRight && (
          <ButtonIcon
            icon={iconRight ?? "arrow-right"}
            onPress={handleActionRight}
          />
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 12,
    padding: 12,
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    color: colors.textPrimary,
  },
});
