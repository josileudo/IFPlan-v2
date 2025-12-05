import { Input } from "@/app/components/Input";
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
import { useEffect, useRef } from "react";
import { useFormViewModel } from "@/app/ViewModels/formViewModel";
import { zodResolver } from "@hookform/resolvers/zod";
import { AreaSchema, areaSchema, formFieldsArea } from "./schema";
import { StepFooterButton } from "../../StepFooterButton";

export const Area = () => {
  const formRef = useRef<Array<TextInput | null>>([]);
  const { onSubmitForm, handlePrev, area } = useFormViewModel("area");

  const { control, handleSubmit, reset } = useForm<AreaSchema>({
    resolver: zodResolver(areaSchema),
    defaultValues: area,
  });

  const verticalOffset = Platform.OS === "ios" ? 150 : 100;

  // useEffect(() => {
  //   reset(area);
  // }, [area]);

  return (
    <View style={styles.container}>
      <KeyboardAvoidingView
        keyboardVerticalOffset={verticalOffset}
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <ScrollView style={styles.content}>
          {formFieldsArea.map((fieldItem, index) => (
            <Controller
              key={index}
              control={control}
              name={fieldItem.name as keyof AreaSchema}
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
                    index === formFieldsArea.length - 1 ? "done" : "next"
                  }
                  onSubmitEditing={() => {
                    if (index < formFieldsArea.length - 1) {
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

      <StepFooterButton
        onNext={handleSubmit(onSubmitForm)}
        onPrev={handlePrev}
      />
    </View>
  );
};
