import { SafeAreaView } from "react-native-safe-area-context";
import styled from "styled-components/native";

export const Container = styled(SafeAreaView)`
    background-color: ${({ theme }) => theme.colors.background};
    flex: 1;
    align-items: center;
    padding: 10px;
`

export const HeaderView = styled.View`
    flex-direction: row;
    width: 100%;
    align-items: center;
    justify-content: space-between;
`

export const Title = styled.Text`
    color: ${({ theme }) => theme.colors.text};
    font-size: 16px;
    font-weight: 600;
`

export const Linking = styled.TouchableOpacity`
    padding: 10px;
    border-radius: 6px;
    border: 1px solid ${({ theme }) => theme.colors.text};
`

export const Content = styled.View`
    width: 100%;
    padding: 40px 0;
    gap: 30px;
`