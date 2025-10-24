import {colors} from "@/theme";
import {MaterialIcons} from "@expo/vector-icons";
import {router} from "expo-router";
import {Text, TouchableOpacity, View} from "react-native";
import {styles} from "./styles";

type Props = {
    title: string;
    subtitle?: string;
    rightButton?: {
        onPress?: () => void;
        icon?: keyof typeof MaterialIcons.glyphMap;
    }
}

export const PageHeader = ({ title, subtitle, rightButton }: Props) =>  {
    const { back } = router;
    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity activeOpacity={0.8} onPress={() => back()} >
                    <MaterialIcons name="arrow-back" color={colors.black} size={32} />
                </TouchableOpacity>

                {
                    rightButton && (
                        <TouchableOpacity onPress={rightButton.onPress}>
                            <MaterialIcons
                                name={rightButton.icon}
                                color={colors.gray["500"]}
                                size={24}
                            />
                        </TouchableOpacity>
                    )
                }
            </View>

            <Text style={styles.title}>{title}</Text>

            {subtitle && <Text style={styles.subtitle}>{subtitle}</Text>}
        </View>
    )
}
