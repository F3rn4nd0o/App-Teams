import AsyncStorage from "@react-native-async-storage/async-storage";

import { PLAYER_COLLECTION } from "@storage/storageconfig";
import { playersGetByGroup } from "./playersGetByGroup";

export async function playerRemoveByGroup(playerName: string, group: string){
    try {
        const storage = await playersGetByGroup(group)

        const filltered = storage.filter(player => player.name !== playerName)
        const players = JSON.stringify(filltered);
        
        await AsyncStorage.setItem(`${PLAYER_COLLECTION} - ${group}`, players);
    } catch (error) {
       throw error
    }
}