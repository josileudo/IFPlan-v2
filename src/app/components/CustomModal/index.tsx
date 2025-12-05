import { colors, fontFamily } from "@/theme";
import { MaterialIcons } from "@expo/vector-icons";
import { useEffect, useState } from "react";
import {
  ModalProps,
  Modal,
  StyleSheet,
  View,
  Alert,
  Pressable,
  Text,
} from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";

type Props = ModalProps & {
  children?: React.ReactNode;
  title?: string;
  onClose?: () => void;
};

export const CustomModal = ({
  children,
  visible,
  title = "Modal",
  onClose,
}: Props) => {
  const [modalVisible, setModalVisible] = useState(visible);

  useEffect(() => {
    setModalVisible(visible);
  }, [visible]);

  const closeModal = () => {
    onClose?.();
  };

  return (
    <Modal
      animationType={modalVisible ? "fade" : "slide"}
      transparent={true}
      visible={modalVisible}
    >
      <View style={styles.overlay}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <View style={styles.header}>
              <Text style={styles.headerText}>{title}</Text>
              <Pressable
                style={[styles.button, styles.buttonClose]}
                onPress={closeModal}
              >
                <MaterialIcons
                  name="close"
                  size={24}
                  color={colors.textSecondary}
                />
              </Pressable>
            </View>
            <View style={styles.content}>{children}</View>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.4)",
  },
  header: {
    flexDirection: "row",
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 10,
    gap: 12,
  },
  headerText: {
    fontSize: 16,
    fontFamily: fontFamily.medium,
    textAlign: "center",
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 16,
    paddingVertical: 24,
    width: "85%",
    height: "40%",
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  content: {
    flex: 1,
    width: "100%",
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  button: {
    borderRadius: 20,
    padding: 4,
    elevation: 2,
  },
  buttonClose: {
    backgroundColor: colors.background,
    position: "absolute",
    right: 0,
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
  },
});
