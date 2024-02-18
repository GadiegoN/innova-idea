import styled from "styled-components/native"

export const Label = styled.Text`
    color: ${({ theme }) => theme.colors.text};
    font-size: 20px;
    font-weight: 500;
    margin-bottom: 10px;
`

export const Input = styled.TextInput`
    border: 1px solid ${({ theme }) => theme.colors.primary};
    padding: 10px;
    border-radius: 8px;
    font-size: 20px;
    color: ${({ theme }) => theme.colors.text};
`