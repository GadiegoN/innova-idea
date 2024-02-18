import styled from 'styled-components/native'
import { SafeAreaView } from 'react-native-safe-area-context';

export const Container = styled(SafeAreaView)`
    background-color: ${({ theme }) => theme.colors.background};
    flex: 1;
    padding: 10px;
    align-items: center;
`

export const LogoText = styled.Text`
    font-size: 40px;
    font-weight: bold;
    color: ${({ theme }) => theme.colors.primary};
`

export const DescriptionText = styled.Text`
    font-size: 20px;
    font-weight: 500;
    color: ${({ theme }) => theme.colors.text};
`

export const Content = styled.View`
    width: 100%;
    margin-top: 60px;
    padding: 0 40px;
    gap: 20px;
`

export const CheckView = styled.View`
    flex-direction: row;
    justify-content: center;
    align-items: center;
    margin-bottom: 10px;
    gap: 20px;
`