import { ButtonIcon } from "@/app/components/ButtonIcon";
import { Separator } from "@/app/components/Separator";
import { colors } from "@/theme";
import { JSX } from "react";
import {
  View,
  FlatList,
  FlatListProps,
  StyleProp,
  Text,
  ViewStyle,
} from "react-native";
import { styles } from "./styles";

type Props<T> = FlatListProps<T> & {
  title: string;
  emptyMessage?: string;
  showButton?: boolean;
  containerStyle?: StyleProp<ViewStyle>;
};

export const List: <T>(props: Props<T>) => JSX.Element = ({
  title,
  emptyMessage,
  containerStyle,
  data,
  showButton = false,
  renderItem,
  ...rest
}) => {
  return (
    <View style={[styles.container, containerStyle]}>
      <View style={styles.header}>
        <Text style={styles.title}>{title}</Text>
        {showButton && <ButtonIcon icon="add" onPress={() => {}} />}
      </View>

      <FlatList
        data={data}
        renderItem={renderItem}
        ItemSeparatorComponent={() => <Separator color={colors.border} />}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.listContent}
        ListEmptyComponent={() => (
          <Text style={styles.empty}>{emptyMessage}</Text>
        )}
        {...rest}
      />
    </View>
  );
};
