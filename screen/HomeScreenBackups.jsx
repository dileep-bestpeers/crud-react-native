import React, { useEffect, useState } from 'react'
import { Text, View } from 'react-native'
import { Button, DataTable, IconButton, TextInput, Colors } from 'react-native-paper'
import { ScrollView } from 'react-native-web';
import Heading from '../components/Heading';
import allTD from './db.json'

export default function HomeScreen() {
    const [text, setText] = useState('')
    const [allTodos, setAllTodos] = useState(allTD.todos)
    const [edit, setEdit] = useState(false)
    const [textId ,setTextId] = useState(0)
    
    const addtodos = () => {
        const values = { title: text, id: new Date().getTime() }
        allTodos.push(values)
        setText("")
    }
    const showTodos = () => {
        setAllTodos(allTodos)
    }
    const deleteTodos = (id) =>{
        let allItems = allTodos.filter((item)=>item.id !== id)
        setAllTodos(allItems)
        setEdit(false)
        setText('')
    }

    const updateTodo = () =>{
        const newArray = []
        allTodos.map((item)=>{
            if (item.id === textId ){
                newArray.push({title : text , id : item.id})
            }
            else{
                newArray.push(item)
            }
        })
        setAllTodos(newArray)
        setText("")
        setEdit(false)
    }

    const editTodos = (id) =>{
        setEdit(true)
        let allItems = allTodos.filter((item)=>item.id === id)
        setText(allItems[0].title)
        setTextId(id);
    }
    useEffect(() => {
        showTodos()
    }, [text])

    return (
        <ScrollView>
            <Heading title="Welcome to Todos" />
            <View style={{ width: '60%', marginHorizontal: 'auto', }}>
                <TextInput
                    label={`${edit ? "update todo": "add todos"}`}
                    value={text}
                    onChangeText={text => setText(text)}
                />
               { edit ? 
                <Button style={{ marginVertical: 15 }} mode="contained" onPress={updateTodo}>
                   Update Todos
                </Button>
                :
                <Button style={{ marginVertical: 15 }} mode="contained" onPress={addtodos}>
                Add Todos
            </Button>
                }
            </View>

            <DataTable>
                <DataTable.Header>
                    <DataTable.Title>S.N.</DataTable.Title>
                    <DataTable.Title >Title</DataTable.Title>
                    <DataTable.Title >Actions</DataTable.Title>
                </DataTable.Header>

                {
                    allTodos.length > 0 ? allTodos.map((item, index) => {
                        return (
                            <DataTable.Row key={index}>
                                <DataTable.Cell>{index+1    }</DataTable.Cell>
                                <DataTable.Cell >{item.title}</DataTable.Cell>
                                <DataTable.Cell >
                                    <Button
                                        size={12}
                                        onPress={() => editTodos(item.id)}
                                    >edit </Button>
                                    <IconButton
                                        icon="delete"
                                        color={Colors.red500}
                                        size={20}
                                        onPress={() => deleteTodos(item.id)}
                                    />
                                     
                                </DataTable.Cell>
                            </DataTable.Row>
                        )
                    })
                        :
                        <Text style={{ fontSize: 22, textAlign: 'center', marginTop: 60 }}> Nothing to show </Text>
                }

            </DataTable>
        </ScrollView>
    )
}
