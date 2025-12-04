import { Input } from "@/app/components/Input";
import { Controller, useForm } from "react-hook-form";
import { styles } from "./styles";
import {
  Alert,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  TextInput,
  View,
} from "react-native";
import { useEffect, useRef } from "react";
import { useFormViewModel } from "@/app/ViewModels/formViewModel";
import { zodResolver } from "@hookform/resolvers/zod";
import { AnimalSchema, animalSchema, formFieldsAnimal } from "./schema";
import { StepFooterButton } from "../../StepFooterButton";
import { router, useLocalSearchParams } from "expo-router";
import { verticalOffset } from "@/utils/formatNumber";

export const Animal = () => {
  const formRef = useRef<Array<TextInput | null>>([]);
  const { navigate } = router;
  const params = useLocalSearchParams<{ id?: string }>();
  const { onSubmitForm, handlePrev, animal } = useFormViewModel("animal");

  const { control, handleSubmit } = useForm<AnimalSchema>({
    resolver: zodResolver(animalSchema),
    defaultValues: animal,
  });

  const handleFinish = async () => {
    try {
      await handleSubmit(onSubmitForm)?.();
      // TODO: Deve pegar o id da simulação salva
      if (params.id && params.id !== "new" && params.id !== "unsaved") {
        navigate(`/result/${params.id}?edited=true`);
      } else {
        navigate(`/result/unsaved`);
      }
    } catch (error) {
      Alert.alert("Erro", "Erro ao salvar dados!");
    }
  };
  1;

  return (
    <View style={styles.container}>
      <KeyboardAvoidingView
        keyboardVerticalOffset={verticalOffset}
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <ScrollView style={styles.content}>
          {formFieldsAnimal.map((fieldItem, index) => (
            <Controller
              key={index}
              control={control}
              name={fieldItem.name as keyof AnimalSchema}
              render={({ field, fieldState }) => (
                <Input
                  ref={(e: any) => (formRef.current[index] = e)}
                  label={fieldItem.label}
                  placeholder={fieldItem.placeholder}
                  keyboardType="numeric"
                  value={field.value ? String(field.value) : ""}
                  errorMessage={fieldState.error?.message}
                  mask="999999.99"
                  blurOnSubmit={false}
                  onChangeText={(text) => {
                    const number = Number(text);
                    if (!isNaN(number)) {
                      field.onChange(number);
                    }
                  }}
                  enterKeyHint={
                    index === formFieldsAnimal.length - 1 ? "done" : "next"
                  }
                  onSubmitEditing={() => {
                    if (index < formFieldsAnimal.length - 1) {
                      formRef?.current[index + 1]?.focus();
                    } else {
                      Keyboard.dismiss();
                    }
                  }}
                />
              )}
            />
          ))}
        </ScrollView>
      </KeyboardAvoidingView>

      <StepFooterButton onPrev={handlePrev} onFinish={handleFinish} />
    </View>
  );
};
