import { useEffect, useState } from "react";
import { AuthRoutes } from "./auth.routes";
import { NavigationContainer } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import { storageUserGet, storageUserRemove } from "../storage/storageUser";
import { AppRoutes } from "./app.routes";

export function Routes() {
    const [loading, setLoading] = useState(false)
    const [isLoggedIn, setIsLoggedIn] = useState(false)

    useEffect(() => {
        checkLoginStatus()
    })

    const checkLoginStatus = async () => {
        try {
            const userData = await storageUserGet()


            if (userData) {
                setIsLoggedIn(true)

                console.log(!userData)
            }

        } catch (error) {
            console.error("Erro ao verificar login")
        } finally {
            setLoading(false)
        }
    }

    if (loading) {
        return null
    }

    return (
        <NavigationContainer independent>
            <AppRoutes />
            <StatusBar backgroundColor="transparent" translucent style="light" />
        </NavigationContainer>
    )
}
