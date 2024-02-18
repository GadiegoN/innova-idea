import AsyncStorage from "@react-native-async-storage/async-storage";

const IDEA_LIST_KEY = '@innovaIdea:ideaList';

interface IdeaProps {
    id: string;
    email: string;
    sector: string;
    generationValue: string;
    description: string;
}

export async function storeIdea(idea: IdeaProps) {
    try {
        const existingIdeas = await AsyncStorage.getItem(IDEA_LIST_KEY);
        let ideas: IdeaProps[] = [];
        if (existingIdeas) {
            ideas = JSON.parse(existingIdeas);
        }
        ideas.push(idea);
        await AsyncStorage.setItem(IDEA_LIST_KEY, JSON.stringify(ideas));
        return true;
    } catch (error) {
        console.error('Error storing idea:', error);
        return false;
    }
}

export async function getIdeas(): Promise<IdeaProps[]> {
    try {
        const ideas = await AsyncStorage.getItem(IDEA_LIST_KEY);
        return ideas ? JSON.parse(ideas) : [];
    } catch (error) {
        console.error('Error getting ideas:', error);
        return [];
    }
}

export async function removeIdeas() {
    try {
        await AsyncStorage.removeItem(IDEA_LIST_KEY);
        return true;
    } catch (error) {
        console.error('Error removing ideas:', error);
        return false;
    }
}