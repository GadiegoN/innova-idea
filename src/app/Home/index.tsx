import { storageUserGet } from "../../storage/storageUser";
import { useEffect, useState } from "react";
import { Card, Container, Content, HeaderView, Linking, Title } from "./styles";
import { useNavigation } from "@react-navigation/native";

interface UserProps {
    email: string
    name: string
    date: string
    password: string
}

export function Home() {
    const navigation = useNavigation()
    const [user, setUser] = useState<UserProps | null>(null)

    const getUser = async () => {
        const response = await storageUserGet()

        if (response !== null) {
            setUser(response)
        }
    }

    useEffect(() => { getUser() }, [])

    const goNewIdeia = () => {
        navigation.navigate('NewIdea')
    }

    const goIdeias = () => {
        navigation.navigate('Ideas')
    }

    const goRaking = () => {
        navigation.navigate('Ranking')
    }

    return (
        <Container>
            <HeaderView>
                <Title>Olá, {user?.name}</Title>
                <Linking onPress={() => navigation.navigate('Profile')}>
                    <Title>Ver perfil</Title>
                </Linking>
            </HeaderView>

            <Content>
                <Card activeOpacity={0.7} onPress={goNewIdeia}>
                    <Title>➕ Nova ideia</Title>
                </Card>
                <Card activeOpacity={0.7} onPress={goIdeias}>
                    <Title>📝 Ideias Registradas</Title>
                </Card>
                <Card activeOpacity={0.7} onPress={goRaking}>
                    <Title>📈 Ranking</Title>
                </Card>
            </Content>

        </Container>
    )
}