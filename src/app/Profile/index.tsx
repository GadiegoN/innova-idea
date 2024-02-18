import { useEffect, useState } from "react";
import { storageUserGet, storageUserRemove } from "../../storage/storageUser";
import { Container, HeaderView, Title, Content, Linking } from "./styles";
import { useNavigation } from "@react-navigation/native";
import { InputPrimary } from "../../components/Input";
import { ButtonOutline } from "../../components/ButtonOutline";

interface UserProps {
    email: string
    name: string
    date: string
    password: string
}

export function Profile() {
    const navigation = useNavigation()
    const [user, setUser] = useState<UserProps>({
        email: '',
        name: '',
        date: '',
        password: '',
    })

    const getUser = async () => {
        const response = await storageUserGet()

        if (response !== null) {
            setUser(response)
        }
    }

    useEffect(() => { getUser() }, [])

    const handleLogout = async () => {
        try {
            await storageUserRemove();
            navigation.navigate("Login");

            console.log(user)
        } catch (error) {
            console.error("Erro ao fazer logout:", error);
        }
    };

    return (
        <Container>
            <HeaderView>
                <Title>Olá, {user?.name}</Title>
                <Linking onPress={() => navigation.navigate('Home')}>
                    <Title>Voltar</Title>
                </Linking>
            </HeaderView>

            <Content>
                <InputPrimary label="Email" placeholder="Digite seu email" value={user?.email} onChangeText={() => { '' }} />
                <InputPrimary label="Nome" placeholder="Digite seu nome completo" value={user?.name} onChangeText={() => { '' }} />
                <InputPrimary label="Data de nascimento" placeholder="Digite sua data de nascimento" value={user?.date} onChangeText={() => { '' }} />

                <ButtonOutline title="Excluir conta" onPress={handleLogout} />
            </Content>

        </Container>
    )
}