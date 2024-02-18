import styled from "styled-components/native"

export const ButtonView = styled.TouchableOpacity`
    border-radius: 8px;
    background-color: ${({ theme }) => theme.colors.primary};
    justify-content: center;
    align-items: center;
    padding: 10px;
`

export const TextButton = styled.Text`
    color: ${({ theme }) => theme.colors.textForegroung};
    font-size: 20px;
    font-weight: 500;
`