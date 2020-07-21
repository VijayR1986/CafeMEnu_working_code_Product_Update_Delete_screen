import React, {useState} from 'react';
import {View, Text, SafeAreaView, Button} from 'react-native';
import {openDatabase} from 'react-native-sqlite-storage';
import {TextInput} from 'react-native-gesture-handler';

var db = openDatabase({name: 'user_db.db', createFromLocation: 1});

const DeleteItem = ({navigation}) => {
  let [inputProductId, setInputProductId] = useState('');

  let deleteItem = () => {
    var that = this;
    db.transaction((tx) => {
      tx.executeSql(
        'DELETE FROM tbl_user where product_id=?',
        [inputProductId],
        (tx, results) => {
          console.log('Results', results.rowsAffected);
          if (results.rowsAffected > 0) {
            Alert.alert(
              'Success',
              'Item deleted successfully',
              [
                {
                  text: 'Ok',
                  onPress: () => that.props.navigation.navigate('HomeScreen'),
                },
              ],
              {cancelable: false},
            );
          } else {
            alert('Please insert a valid Item Id');
          }
        },
      );
    });
  };

  return (
    <SafeAreaView style={{flex: 1}}>
      <View style={{flex: 1, backgroundColor: 'white'}}>
        <View style={{flex: 1}}>
          <TextInput
            placeholder="Enter Product Id"
            onChangeText={(inputProductId) => setInputProductId(inputProductId)}
            style={{padding: 10}}
          />
          <Button
            title="Delete Product"
            onPress={(inputProductId) => {
              deleteItem(inputProductId);
            }}
          />
        </View>
        <Text style={{fontSize: 18, textAlign: 'center', color: 'grey'}}>
          Delete Product Screen
        </Text>
      </View>
    </SafeAreaView>
  );
};
export default DeleteItem;
