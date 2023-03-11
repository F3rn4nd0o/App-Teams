import AsyncStorage from "@react-native-async-storage/async-storage";
import { AppError } from "@utils/AppError";

import { GROUP_COLLECTION } from "@storage/storageconfig";
import { groupsGetAll } from "./groupsGetAll";

export async function groupCreate(newGroup: string){
    try{
        const storedGroups = await groupsGetAll();

        const groupAlreadyExists = storedGroups.includes(newGroup);

        if(groupAlreadyExists){
            throw new AppError('Ja Existe Uma Turma Cadastrada Com Esse Nome')
        }

        const storage = JSON.stringify([...storedGroups, newGroup]);
        await AsyncStorage.setItem(GROUP_COLLECTION, storage); 
    }catch(error){
        throw error;
    }
}   