import React, {useState} from 'react';
import Icon from 'react-native-vector-icons/dist/FontAwesome';
import {FlatList, StyleSheet, ScrollView, Alert} from 'react-native';
import {
  Cell,
  TableView,
  Section,
  Separator,
} from 'react-native-tableview-simple';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {openDatabase} from 'react-native-sqlite-storage';
import DeleteItem from './DeleteItem';

var db = openDatabase({name: 'user_db.db', createFromLocation: 1});

export default class ProductScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      FlatListItems: [],
      tableHead: ['Sr. No.', 'Product', 'Price', 'Quantity'],
      widthArr: [80, 160, 80, 80],
    };

    db.transaction((tx) => {
      tx.executeSql('SELECT * FROM tbl_user', [], (tx, results) => {
        var temp = [];
        for (let i = 0; i < results.rows.length; ++i) {
          temp.push(results.rows.item(i));
        }
        this.setState({
          FlatListItems: temp,
        });
      });
    });
  }

  render() {
    return (
      <ScrollView style={styles.container}>
        <FlatList
          data={this.state.FlatListItems}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({item, separators}) => (
            <TableView>
              <Section
                header="Product No."
                hideSeparator="false"
                headerTextColor="darkgreen">
                <Cell
                  title={item.product_id}
                  titleTextColor="#007AFF"
                  onHighlightRow={separators.highlight}
                  onUnHighlightRow={separators.unhighlight}
                  // onPress={(inputProductId) => {
                  //   deleteItem(inputProductId);
                  // }}
                />
                <Cell
                  title={item.product_name}
                  titleTextColor="#007AFF"
                  accessory="Detail"
                  cellStyle="RightDetail"
                  detail="Detail"
                  onPressDetailAccessory={() => Alert.alert('This is an item')}
                  onHighlightRow={separators.highlight}
                  onUnHighlightRow={separators.unhighlight}
                />
                <Cell
                  title={item.product_price}
                  titleTextColor="#007AFF"
                  onHighlightRow={separators.highlight}
                  onUnHighlightRow={separators.unhighlight}
                />
                <Cell
                  title={item.product_quantity}
                  titleTextColor="red"
                  onHighlightRow={separators.highlight}
                  onUnHighlightRow={separators.unhighlight}
                />
                {/* <TouchableOpacity>
                  <Icon
                    name="remove"
                    size={20}
                    color="firebrick"
                    onPress={() => deleteItems(item.id)}
                  />
                </TouchableOpacity> */}
              </Section>
            </TableView>
          )}
          ItemSeparatorComponent={({highlighted}) => (
            <Separator isHidden={highlighted} />
          )}
        />
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,

    flexDirection: 'column',
  },
  head: {
    height: 50,
    backgroundColor: '#6F7BD9',
  },
  text: {
    textAlign: 'center',
    fontWeight: '200',
  },
  dataWrapper: {
    marginTop: -1,
  },
  row: {
    height: 40,
    backgroundColor: '#F7F8FA',
  },
});
