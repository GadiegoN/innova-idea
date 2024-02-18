import { createNativeStackNavigator } from "@react-navigation/native-stack"
import { Home } from "../app/Home"
import { Profile } from "../app/Profile"
import { Login } from "../auth/Login"
import { Register } from "../auth/Register"
import { NewIdea } from "../app/NewIdea"
import { Ideas } from "../app/Ideas"
import { Ranking } from "../app/Ranking"


type AppRoutes = {
    Home: undefined
    Profile: undefined
    Login: undefined
    Register: undefined
    NewIdea: undefined
    Ideas: undefined
    Ranking: undefined
}

export function AppRoutes() {
    const { Navigator, Screen } = createNativeStackNavigator<AppRoutes>()

    return (
        <Navigator screenOptions={{ headerShown: false }}>
            <Screen name="Login" component={Login} />
            <Screen name="Register" component={Register} />
            <Screen name="Home" component={Home} />
            <Screen name="Profile" component={Profile} />
            <Screen name="NewIdea" component={NewIdea} />
            <Screen name="Ideas" component={Ideas} />
            <Screen name="Ranking" component={Ranking} />
        </Navigator>
    )
}