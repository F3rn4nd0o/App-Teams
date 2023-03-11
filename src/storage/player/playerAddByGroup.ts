import AsyncStorage from "@react-native-async-storage/async-storage";
import { AppError } from "@utils/AppError";

import { PLAYER_COLLECTION } from "@storage/storageconfig";

import { playersGetByGroup } from "./playersGetByGroup";
import { PlayerStorageDTO } from "./PlayerStorageDTO";

export async function playerAddByGroup(newPlayer: PlayerStorageDTO, group: string){
    try{
        const storagePlayer = await playersGetByGroup(group);

        const playerAlreadyExists = storagePlayer.filter(player => player.name === newPlayer.name);

        if(playerAlreadyExists.length > 0){
            throw new AppError('Esta Pessoa Ja Esta Adicionada Em Um Time Aqui!');
        }

        const storage = JSON.stringify([...storagePlayer, newPlayer]);

        await AsyncStorage.setItem(`${PLAYER_COLLECTION} - ${group}`, storage); 
    }catch(error){
        throw (error);
    }
}