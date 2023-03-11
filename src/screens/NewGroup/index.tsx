import { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { Alert } from "react-native";

import { groupCreate } from "@storage/group/groupCreate";
import { AppError } from "@utils/AppError";

import { Container, Title, Content,Icon } from "./styles";

import { Button } from "@components/Button";
import { Header } from "@components/Header";
import { Highlight } from "@components/HighLight";
import { Input } from "@components/Input";


export function NewGroup(){
    const [group, setGroup] = useState('');

    const navigation = useNavigation();

    async function handleNew(){
        try{
            if(group.trim().length === 0) {
                return Alert.alert('Nova Turma', 'Informe o Nome Da Turma')
            }

            await groupCreate(group);
            navigation.navigate('players', { group });
        }catch(error){
            if(error instanceof AppError){
                Alert.alert('Nova Turma', error.message);
            }else{
                Alert.alert('Nova Turma', 'Não Foi Possivel Criar Uma Nova Turma');
                console.log(error)
            }
        }
    }

    return(
        <Container>
            <Header showBackButton/>

            <Content>   
                <Icon />
                <Highlight 
                title="Nova Turma" 
                subtitle="Crie a Turma Para Adicionar as Pessoas"
                />
                <Input
                 placeholder="Nome Da Turma"
                 onChangeText={setGroup}
                />
                <Button 
                title="Crias Nova Turma"
                style={{ marginTop: 20}}
                onPress={handleNew}
                />
            </Content>
        </Container>
    )
}