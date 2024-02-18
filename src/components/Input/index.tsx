import { View } from "react-native";
import { Label, Input } from "./styles";
import theme from './../../global/styles'

type InputProps = {
    label: string
    placeholder: string
    value: string
    onChangeText: ((text: string) => void)
    secureTextEntry?: boolean
}

export function InputPrimary({ label, onChangeText, placeholder, value, secureTextEntry = false }: InputProps) {
    return (
        <View>
            <Label>{label}</Label>
            <Input
                value={value}
                placeholder={placeholder}
                onChangeText={onChangeText}
                secureTextEntry={secureTextEntry}
                placeholderTextColor={theme.colors.text}
            />
        </View>
    )
}