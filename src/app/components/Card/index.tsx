import { formatDate } from "@/utils/formatDate";
import { styles } from "./styles";
import { Text, TouchableOpacity, View } from "react-native";

export interface SimulationDataProps {
  id?: string;
  title: string;
  description: string;
  createdAt: string | number;
  updatedAt: string | number;
  isFavorite: boolean;
}

type Props = {
  data: SimulationDataProps;
  onPress?: () => void;
};

export const Card = ({ data, onPress }: Props) => {
  return (
    <TouchableOpacity
      style={styles.container}
      activeOpacity={0.8}
      onPress={onPress}
    >
      <View>
        <Text style={styles.title}>{data.title}</Text>
        <Text style={styles.description} numberOfLines={2}>
          {data.description}
        </Text>
      </View>

      <View>
        <Text style={styles.date}>{formatDate(data.createdAt, true)}</Text>
      </View>
    </TouchableOpacity>
  );
};
