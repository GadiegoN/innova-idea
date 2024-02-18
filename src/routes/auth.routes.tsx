import { createNativeStackNavigator } from "@react-navigation/native-stack"
import { Login } from "../auth/Login"
import { Register } from "../auth/Register"

type AuthRoutes = {
    Login: undefined
    Register: undefined
}

export function AuthRoutes() {
    const { Navigator, Screen } = createNativeStackNavigator<AuthRoutes>()

    return (
        <Navigator screenOptions={{ headerShown: false }}>
            <Screen name="Login" component={Login} />
            <Screen name="Register" component={Register} />
        </Navigator>
    )
}