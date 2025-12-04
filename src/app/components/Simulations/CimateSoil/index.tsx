import { Input } from "@/app/components/Input";
import {
  climateSoilSchema,
  ClimateSoilSchema,
  formFields,
} from "@/app/components/Simulations/CimateSoil/schema";
import { Controller, useForm } from "react-hook-form";
import { styles } from "./styles";
import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  TextInput,
  View,
} from "react-native";
import { useRef } from "react";
import { useFormViewModel } from "@/app/ViewModels/formViewModel";
import { zodResolver } from "@hookform/resolvers/zod";
import { StepFooterButton } from "../../StepFooterButton";
import { verticalOffset } from "@/utils/formatNumber";

export const ClimateSoil = () => {
  const formRef = useRef<Array<TextInput | null>>([]);
  const { onSubmitForm, climateSoil } = useFormViewModel("climateSoil");

  const { control, handleSubmit } = useForm<ClimateSoilSchema>({
    resolver: zodResolver(climateSoilSchema),
    defaultValues: climateSoil,
  });

  return (
    <View style={styles.container}>
      <KeyboardAvoidingView
        keyboardVerticalOffset={verticalOffset}
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <ScrollView style={styles.content}>
          {formFields.map((fieldItem, index) => (
            <Controller
              key={index}
              control={control}
              name={fieldItem.name as keyof ClimateSoilSchema}
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
                    index === formFields.length - 1 ? "done" : "next"
                  }
                  onSubmitEditing={() => {
                    if (index < formFields.length - 1) {
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

      <StepFooterButton onNext={handleSubmit(onSubmitForm)} />
    </View>
  );
};
