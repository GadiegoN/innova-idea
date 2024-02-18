import AsyncStorage from "@react-native-async-storage/async-storage";

const USER = '@innovaIdea:user'

interface UserProps {
    email: string
    name: string
    date: string
    password: string
}

export async function StorageUserSave(user: UserProps) {
    await AsyncStorage.setItem(USER, JSON.stringify(user))
}

export async function storageUserGet() {
    const storage = await AsyncStorage.getItem(USER)
    const user: UserProps = storage ? JSON.parse(storage) : {}

    return user
}

export async function storageUserRemove() {
    await AsyncStorage.removeItem(USER)
}