import { useState } from "react";
import { Alert, ScrollView } from "react-native";
import { InputPrimary } from "../../components/Input";
import { useNavigation } from "@react-navigation/native";
import { ButtonPrimary } from "../../components/ButtonPrimary";
import { ButtonOutline } from "../../components/ButtonOutline";
import { Container, Content, DescriptionText, LogoText } from "./style";
import { StorageUserSave } from "../../storage/storageUser";

interface UserProps {
    email: string
    name: string
    date: string
    password: string
}


export function Register() {
    const navigation = useNavigation()

    const [userData, setUserData] = useState<UserProps>({
        email: '',
        name: '',
        date: '',
        password: '',
    });
    const [repeatpassword, setRepeatPassword] = useState('')

    const handleRegister = async () => {
        try {
            await StorageUserSave(userData);
            Alert.alert('Sucesso', 'Conta criada com sucesso!');
        } catch (error) {
            Alert.alert('Erro', 'Ocorreu um erro ao criar a conta.');
        }
    }

    const navigationLogin = () => {
        navigation.navigate('Login')
    }

    return (
        <Container>
            <ScrollView contentContainerStyle={{ paddingBottom: 50, backgroundColor: '#006263' }}>
                <LogoText>.InnovaIdea</LogoText>
                <DescriptionText>Descreva suas ideias inovadoras!</DescriptionText>

                <Content>
                    <InputPrimary label="Email" placeholder="Digite seu email" value={userData.email} onChangeText={(text) => setUserData({ ...userData, email: text })} />
                    <InputPrimary label="Nome" placeholder="Digite seu nome completo" value={userData.name} onChangeText={(text) => setUserData({ ...userData, name: text })} />
                    <InputPrimary label="Data de nascimento" placeholder="Digite sua data de nascimento" value={userData.date} onChangeText={(text) => setUserData({ ...userData, date: text })} />

                    <InputPrimary label="Senha" placeholder="Digite sua senha" value={userData.password} onChangeText={(text) => setUserData({ ...userData, password: text })} secureTextEntry={true} />
                    <InputPrimary label="Repetir senha" placeholder="Digite sua senha novamente" value={repeatpassword} onChangeText={setRepeatPassword} secureTextEntry={true} />

                    <ButtonPrimary onPress={handleRegister} title="Cadastrar conta" />
                    <ButtonOutline onPress={navigationLogin} title="Já tenho conta" />
                </Content>
            </ScrollView>
        </Container>
    )
}