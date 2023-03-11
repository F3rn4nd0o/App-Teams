import { useState, useCallback } from 'react';
import { FlatList } from 'react-native';

import { useNavigation, useFocusEffect } from  '@react-navigation/native'
import { groupsGetAll } from '@storage/group/groupsGetAll';

import { Loading } from '@components/Loading';
import { Header } from '@components/Header';
import { Highlight } from '@components/HighLight';
import { GroupCard } from '@components/GroupCard/Index';
import { ListEmpty } from '@components/ListEmpty';
import { Button } from '@components/Button';

import { Container,  } from './styles';


export function Groups() {
  const [isLoading, setIsLoading] = useState(true);
  const [groups, setGroups] = useState<string[]>([]);

  const navigation = useNavigation();

  function handleNewGroup(){
    navigation.navigate('new');
  }

  async function fetchGroups(){
    try{
        setIsLoading(true);
        const data = await groupsGetAll();
        setGroups(data);
    }catch(error){
      console.log(error);
    } finally { 
      setIsLoading(false);
    }
  }

  function HandleOpenGroup(group: string){
    navigation.navigate('players', { group });
  }

  useFocusEffect(useCallback(() =>{
    fetchGroups();
  },[])); 

  return (
    <Container>
      <Header/>
      <Highlight
        title="Turmas"
        subtitle="Jogue Com a Sua Turma" 
      />

      { isLoading ? <Loading /> : 
      <FlatList
        data={groups}
        keyExtractor={item => item}   
        renderItem={({ item }) => (
          <GroupCard 
          title={item}
          onPress={() => HandleOpenGroup(item)}  
          />
        )} 
        showsVerticalScrollIndicator={false}
        contentContainerStyle={groups.length === 0 && {flex: 1}}
        ListEmptyComponent={() => (
          <ListEmpty 
          message="Que Tal Criar a Primeira Turma?"
          />
        )}
      />
      }

      <Button
        title="Criar Nova Turma"
        onPress={handleNewGroup}
      />
    </Container>
  );
}
