import { useNavigation } from "@react-navigation/native"
import { ButtonOutline } from "../../components/ButtonOutline"
import { Container, HeaderView, Title, Content, Linking, SelectView, Label } from "./styles"
import { useEffect, useState } from "react"
import { storageUserGet } from "../../storage/storageUser"
import { Alert, ScrollView, View } from "react-native"
import { Picker } from '@react-native-picker/picker';
import { TextArea } from "../../components/TextArea"
import { storeIdea } from "../../storage/storageIdea"
import uuid from 'react-native-uuid';

interface UserProps {
    email: string
    name: string
    date: string
    password: string
}

const SECTORS = [
    {
        id: 1,
        name: "Financeiro",
        value: "Financeiro"
    },
    {
        id: 2,
        name: "Administrativo",
        value: "Administrativo"
    },
    {
        id: 3,
        name: "Recursos homano",
        value: "Recursos homano"
    },
    {
        id: 4,
        name: "Comercial",
        value: "Comercial"
    },
    {
        id: 5,
        name: "Produção",
        value: "Produção"
    },
    {
        id: 5,
        name: "Tecnologia",
        value: "Tecnologia"
    },
]

export function NewIdea() {
    const navigation = useNavigation()
    const [user, setUser] = useState<UserProps>({
        email: '',
        name: '',
        date: '',
        password: '',
    })

    const [selectedSector, setSelectedSector] = useState('fnc');
    const [generateValue, setGenerateValue] = useState(0)
    const [idea, setIdea] = useState('')

    const getUser = async () => {
        const response = await storageUserGet()

        if (response !== null) {
            setUser(response)
        }
    }

    useEffect(() => { getUser() }, [])

    const createIdea = async () => {
        if (idea === "") {
            alert('Por favor, preencha todos os campos.');
            return;
        }


        const newIdea = {
            id: uuid.v4().toString(),
            email: user.email,
            sector: selectedSector,
            generationValue: generateValue === 0 ? "Sim" : "Não",
            description: idea
        };

        const success = await storeIdea(newIdea);
        if (success) {
            Alert.alert('Sua ideia foi enviada com sucesso!');
            setSelectedSector('fnc');
            setGenerateValue(0);
            setIdea('');
        } else {
            alert('Houve um erro ao enviar sua ideia. Por favor, tente novamente mais tarde.');
        }
    };

    return (
        <Container>
            <ScrollView contentContainerStyle={{ paddingBottom: 50, backgroundColor: '#006263' }}>
                <HeaderView>
                    <Title>Enviar sua idéia!</Title>
                    <Linking onPress={() => navigation.navigate('Home')}>
                        <Title>Voltar</Title>
                    </Linking>
                </HeaderView>

                <Content>
                    <Label>Selecione o setor</Label>
                    <SelectView>
                        <Picker
                            style={{ color: "#FFF4DD" }}
                            selectedValue={selectedSector}
                            onValueChange={(itemValue) =>
                                setSelectedSector(itemValue)
                            }>
                            {SECTORS.map((item) => (
                                <Picker.Item key={item.id} label={item.name} value={item.value} />
                            ))}
                        </Picker>
                    </SelectView>
                    <Label>Pode gerar valor?</Label>
                    <SelectView>
                        <Picker
                            style={{ color: "#FFF4DD" }}
                            selectedValue={generateValue}
                            onValueChange={(itemValue) =>
                                setGenerateValue(itemValue)
                            }>
                            <Picker.Item label="Sim" value={0} />
                            <Picker.Item label="Não" value={1} />
                        </Picker>
                    </SelectView>

                    <TextArea label="Ideia e solução" placeholder="Digite sua ideia e solução" value={idea} onChangeText={setIdea} />

                    <View style={{ height: 30 }} />
                    <ButtonOutline title="Enviar" onPress={createIdea} />
                </Content>
            </ScrollView>
        </Container>
    )
}