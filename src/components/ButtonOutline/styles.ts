import styled from "styled-components/native"

export const ButtonView = styled.TouchableOpacity`
    border-radius: 8px;
    border: 1px solid ${({ theme }) => theme.colors.primary};
    justify-content: center;
    align-items: center;
    padding: 10px;
`

export const TextButton = styled.Text`
    color: ${({ theme }) => theme.colors.text};
    font-size: 20px;
    font-weight: 500;
`