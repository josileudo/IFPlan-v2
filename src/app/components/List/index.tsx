import {Separator} from "@/app/components/Separator";
import {colors} from "@/theme";
import {JSX} from "react";
import {View, FlatList, FlatListProps, StyleProp, Text, ViewStyle} from "react-native";
import {styles} from "./styles";

type Props<T> = FlatListProps<T> & {
    title: string;
    emptyMessage?: string;
    containerStyle?: StyleProp<ViewStyle>
}

export const List: <T>(props: Props<T>) => JSX.Element = ({
    title,
    emptyMessage,
    containerStyle,
    data,
    renderItem,
   ...rest
}) => {
    return (
        <View style={[styles.container, containerStyle]}>
            <Text style={styles.title}>{title}</Text>

            <FlatList
                data={data}
                renderItem={renderItem}
                ItemSeparatorComponent={ () => <Separator color={colors.gray["200"]}/> }
                showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.listContent}
                ListEmptyComponent={() => (
                    <Text style={styles.empty}>{emptyMessage}</Text>)
                }
                {...rest}
            />
        </View>
    )
}
