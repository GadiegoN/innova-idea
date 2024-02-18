import { useEffect, useState } from "react";
import { getIdeas } from "../../storage/storageIdea";
import { CardItem, Container, Content, HeaderView, Linking, TextCreator, Title } from "./styles";
import { useNavigation } from "@react-navigation/native";

interface IdeaProps {
    id: string;
    email: string;
    sector: string;
    generationValue: string;
    description: string;
}

export function Ranking() {
    const navigation = useNavigation()
    const [ideas, setIdeas] = useState<IdeaProps[]>()
    const [emailCounts, setEmailCounts] = useState<{ email: string; count: number }[]>([]);

    const getIdea = async () => {
        const response = await getIdeas()

        setIdeas(response)
    }

    useEffect(() => {
        getIdea()
    }, [])

    useEffect(() => {
        if (ideas?.length !== undefined) {
            const emailCountsMap: { [email: string]: number } = {};

            ideas.forEach(idea => {
                if (idea.email in emailCountsMap) {
                    emailCountsMap[idea.email]++;
                } else {
                    emailCountsMap[idea.email] = 1;
                }
            });

            const emailCountsArray = Object.entries(emailCountsMap).map(([email, count]) => ({
                email,
                count
            }));

            setEmailCounts(emailCountsArray);
        }
    }, [ideas]);

    return (
        <Container>
            <HeaderView>
                <Title>Ranking</Title>
                <Linking onPress={() => navigation.navigate('Home')}>
                    <Title>Voltar</Title>
                </Linking>
            </HeaderView>
            <Content>
                {emailCounts.map((item, index) => (
                    <CardItem key={index}>
                        <TextCreator>{index + 1}º</TextCreator>
                        <TextCreator>{item.email}</TextCreator>
                        <TextCreator>{item.count}</TextCreator>
                    </CardItem>
                ))}
            </Content>
        </Container>
    )
}