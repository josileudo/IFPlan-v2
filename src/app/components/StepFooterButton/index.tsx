import { Button } from "../Button";
import { StyleSheet, View } from "react-native";

type Props = {
  onNext?: () => void;
  onPrev?: () => void;
  onFinish?: () => void;
};

export const StepFooterButton = ({ onNext, onPrev, onFinish }: Props) => {
  return (
    <View style={styles.container}>
      <View style={styles.buttonContainer}>
        {onPrev && (
          <Button
            style={styles.button}
            type="secondary"
            title="Voltar"
            onPress={onPrev}
          />
        )}
        {onNext && (
          <Button style={styles.button} title="Próximo" onPress={onNext} />
        )}
        {onFinish && (
          <Button style={styles.button} title="Finalizar" onPress={onFinish} />
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    alignItems: "center",
  },
  buttonContainer: {
    marginBottom: 16,
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 16,
  },
  button: {
    flex: 1,
    width: "45%",
  },
});
