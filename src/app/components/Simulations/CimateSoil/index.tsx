import { Button } from "@/app/components/Button";
import { Input } from "@/app/components/Input";
import {
  climateSoilSchema,
  ClimateSoilSchema,
  formFields,
} from "@/app/components/Simulations/CimateSoil/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { styles } from "./styles";
import { ScrollView, TextInput, View } from "react-native";
import { useRef } from "react";
import { fi } from "zod/locales";

type Props = {
  onNext?: () => void;
  onBack?: () => void;
};

export const ClimateSoil = ({ onNext }: Props) => {
  const formRef = useRef<Array<TextInput | null>>([]);
  const { control, handleSubmit } = useForm<ClimateSoilSchema>({
    resolver: zodResolver(climateSoilSchema),
  });

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        {formFields.map((fieldItem, index) => (
          <Controller
            key={index}
            control={control}
            name={fieldItem.name}
            render={({ field, fieldState }) => (
              <Input
                ref={(e: any) => (formRef.current[index] = e)}
                label={fieldItem.label}
                placeholder={fieldItem.placeholder}
                keyboardType="numeric"
                value={String(field.value ?? "")}
                errorMessage={fieldState.error?.message}
                mask="999.999,99"
                blurOnSubmit={false}
                onChangeText={(text) => field.onChange(Number(text))}
                enterKeyHint={formFields.length - 1 === index ? "done" : "next"}
                onSubmitEditing={() => {
                  if (index < formFields.length - 1) {
                    formRef?.current[index + 1]?.focus();
                  }
                }}
              />
            )}
          />
        ))}
      </ScrollView>
    </View>
  );
};
