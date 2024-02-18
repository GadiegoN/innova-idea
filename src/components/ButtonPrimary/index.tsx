import { ButtonView, TextButton } from "./styles";

type ButtonProps = {
    onPress: () => void
    title: string
}

export function ButtonPrimary({ onPress, title }: ButtonProps) {
    return (
        <ButtonView onPress={onPress} activeOpacity={0.7}>
            <TextButton>{title}</TextButton>
        </ButtonView>
    )
}