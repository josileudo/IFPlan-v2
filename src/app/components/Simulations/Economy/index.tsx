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
import { Button } from "../../Button";
import { zodResolver } from "@hookform/resolvers/zod";
import { economySchema, EconomySchema, formFieldsEconomy } from "./schema";
import { StepFooterButton } from "../../StepFooterButton";

export const Economy = () => {
  const formRef = useRef<Array<TextInput | null>>([]);
  const { onSubmitForm, handlePrev, economy } = useFormViewModel("economy");

  const { control, handleSubmit, reset } = useForm<EconomySchema>({
    resolver: zodResolver(economySchema),
    defaultValues: economy,
  });

  const verticalOffset = Platform.OS === "ios" ? 150 : 100;

  // useEffect(() => {
  //   reset(economy);
  // }, [economy]);

  return (
    <View style={styles.container}>
      <KeyboardAvoidingView
        keyboardVerticalOffset={verticalOffset}
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <ScrollView style={styles.content}>
          {formFieldsEconomy.map((fieldItem, index) => (
            <Controller
              key={index}
              control={control}
              name={fieldItem.name as keyof EconomySchema}
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
                    index === formFieldsEconomy.length - 1 ? "done" : "next"
                  }
                  onSubmitEditing={() => {
                    if (index < formFieldsEconomy.length - 1) {
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
        onPrev={handlePrev}
        onNext={handleSubmit(onSubmitForm)}
      />
    </View>
  );
};
