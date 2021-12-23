import React from 'react'
import { View, Text } from 'react-native'

export default function Heading({title}) {
    return (
        <View>
            <Text style={{fontSize:25,textAlign:'center',fontWeight:'bold',marginVertical:20 , textTransform:'uppercase'}}>{title}</Text>
        </View>
    )
}
