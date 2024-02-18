import { useEffect, useState } from "react";
import { FlatList, Text, View } from "react-native";
import { getIdeas } from "../../storage/storageIdea";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Container, HeaderView, Title, Linking, CardItem, Content, HeaderCard, TextCard, BodyCardItem, TextCreator, DeletedButton } from "./styles";
import { useNavigation } from "@react-navigation/native";
import { storageUserGet } from "../../storage/storageUser";

const IDEA_LIST_KEY = '@innovaIdea:ideaList';

interface IdeaProps {
    id: string;
    email: string;
    sector: string;
    generationValue: string;
    description: string;
}

export function Ideas() {
    const navigation = useNavigation()
    const [ideas, setIdeas] = useState<IdeaProps[]>()
    const [email, setEmail] = useState<string>()

    const getIdea = async () => {
        const response = await getIdeas()

        setIdeas(response)
    }

    const getUser = async () => {
        const response = await storageUserGet()

        if (response !== null) {
            setEmail(response.email)
        }
    }

    useEffect(() => { getUser() }, [])

    const loadingStorage = () => {
        getIdea()
    }

    const countItemsWithEmail = () => {
        if (ideas?.length !== undefined) {
            const itemsWithEmail = ideas.filter(item => item.email === email);
            return itemsWithEmail.length;
        }

        if (ideas?.length === undefined) {
            const itemsWithEmail = 0;
            return itemsWithEmail;
        }

    };

    const itemCount = countItemsWithEmail();

    const removeIdea = async (ideaIdToRemove: string) => {
        try {
            const existingIdeas = await AsyncStorage.getItem(IDEA_LIST_KEY);
            if (!existingIdeas) {
                return;
            }

            let ideas = JSON.parse(existingIdeas);
            ideas = ideas.filter((idea: any) => idea.id !== ideaIdToRemove);

            await AsyncStorage.setItem(IDEA_LIST_KEY, JSON.stringify(ideas));

        } catch (error) {
            console.error('Error removing idea:', error);
        } finally {
            loadingStorage()
        }
    };

    useEffect(() => {
        getIdea()
    }, [])

    return (
        <Container>

            <HeaderView>
                <Title>Idéias Registradas: {itemCount}</Title>
                <Linking onPress={() => navigation.navigate('Home')}>
                    <Title>Voltar</Title>
                </Linking>
            </HeaderView>

            <Content>
                <FlatList
                    data={ideas}
                    contentContainerStyle={{ paddingBottom: 50, gap: 30 }}
                    renderItem={({ item }) => (
                        <CardItem>
                            <HeaderCard>
                                <Title>Setor: {item.sector}</Title>
                                {item.email === email && (
                                    <DeletedButton onPress={() => removeIdea(item.id)}>
                                        <Text>❌</Text>
                                    </DeletedButton>
                                )}
                            </HeaderCard>
                            <BodyCardItem>
                                <TextCard>{item.description}</TextCard>
                                <TextCard>{item.generationValue} gera valor</TextCard>
                                <TextCreator>Criado por: {item.email.slice(0, 5)}*******</TextCreator>
                            </BodyCardItem>
                        </CardItem>
                    )}
                    keyExtractor={item => item.id}
                />
            </Content>
        </Container>
    )
}