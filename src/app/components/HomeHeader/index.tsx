import { styles } from "./styles";
import { colors } from "@/theme/colors";
import { LinearGradient } from "expo-linear-gradient";
import { Text, View } from "react-native";
import { Separator } from "../Separator";
import { Summary, SummaryProps } from "../Summary";

export type HomeHeaderProps = {
  total: string;
  input: SummaryProps;
  output: SummaryProps;
};

type Props = {
  data: HomeHeaderProps;
};

export const HomeHeader = ({ data }: Props) => {
  return (
    <LinearGradient
      style={styles.container}
      colors={[colors.blue[500], colors.blue[800]]}
    >
      <View>
        <Text style={styles.label}>Total que você possui</Text>
        <Text style={styles.total}>{data.total}</Text>
      </View>

      <Separator color={colors.blue[400]} />

      <View style={styles.summary}>
        <Summary
          data={data.input}
          icon={{ color: colors.green[500], name: "arrow-upward" }}
        />

        <Summary
          isLeft
          data={data.output}
          icon={{ color: colors.red[400], name: "arrow-downward" }}
        />
      </View>
    </LinearGradient>
  );
};
