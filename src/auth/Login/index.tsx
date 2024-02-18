import { Alert } from "react-native";
import { CheckView, Container, Content, DescriptionText, LogoText } from "./style";
import { useState } from "react";
import Checkbox from 'expo-checkbox';
import { ButtonPrimary } from "../../components/ButtonPrimary";
import { InputPrimary } from "../../components/Input";
import { useNavigation } from "@react-navigation/native";
import { ButtonOutline } from "../../components/ButtonOutline";
import { storageUserGet } from "../../storage/storageUser";

interface UserProps {
    email: string
    name: string
    date: string
    password: string
}

export function Login() {
    const navigation = useNavigation()

    const [email, setEmail] = useState('')
    const [accessCode, setAccessCode] = useState('')
    const [password, setPassword] = useState('')
    const [isChecked, setIsChecked] = useState(false)

    const handleLogin = async () => {

        if (isChecked) {
            console.log("Codigo de acesso: ", accessCode)
            console.log("Senha: ", password)

            if (accessCode === '') {
                Alert.alert('Falha no login', 'Email ou senha incorreta')

                return
            }
        }

        if (!isChecked) {
            try {
                // Buscar os dados salvos no AsyncStorage
                const userData: UserProps = await storageUserGet();
                if (!userData) {
                    throw new Error('Nenhum usuário encontrado.');
                }

                if (userData.email === email && userData.password === password) {
                    navigation.navigate('Home')
                } else {
                    throw new Error('Email ou senha incorretos.');
                }
            } catch (error) {
                Alert.alert('Erro', 'Email ou senha incorretos.');
            }
        }

    }


    const navigationRegister = () => {
        navigation.navigate('Register')
    }

    return (
        <Container>
            <LogoText>.InnovaIdea</LogoText>
            <DescriptionText>Descreva suas ideias inovadoras!</DescriptionText>

            <Content>
                {!isChecked ? (
                    <InputPrimary label="Email" placeholder="Digite seu email" value={email} onChangeText={setEmail} />
                ) : (
                    <InputPrimary label="Código de acesso" placeholder="Digite seu Código de acesso" value={accessCode} onChangeText={setAccessCode} />
                )}
                <InputPrimary label="senha" placeholder="Digite sua senha" value={password} onChangeText={setPassword} secureTextEntry={true} />

                <CheckView>
                    <Checkbox value={isChecked} onValueChange={setIsChecked} />
                    <DescriptionText onPress={() => setIsChecked(!isChecked)}>Entrar como administrador</DescriptionText>
                </CheckView>

                <ButtonPrimary onPress={handleLogin} title="Entrar" />
                <ButtonOutline onPress={navigationRegister} title="Criar conta" />
            </Content>
        </Container>
    )
}