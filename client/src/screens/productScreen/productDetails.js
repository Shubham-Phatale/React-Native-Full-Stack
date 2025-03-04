import React from 'react';
import {View, Text, StyleSheet, FlatList} from 'react-native';

const ProductDetails = ({details}) => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Product Details</Text>
      </View>
      <FlatList
        data={details}
        keyExtractor={item => item._id}
        scrollEnabled={false}
        renderItem={({item}) => (
          <View style={styles.row}>
            <Text style={styles.cell}>{item.key}</Text>
            <Text style={styles.cell}>{item.value}</Text>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  header: {
    flexDirection: 'row',
    borderBottomWidth: 2,
    borderBottomColor: '#ccc',
    paddingBottom: 8,
    marginBottom: 8,
  },
  headerText: {
    flex: 1,
    fontWeight: 'bold',
    fontSize: 16,
  },
  row: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    paddingVertical: 8,
  },
  cell: {
    flex: 1,
    fontSize: 14,
  },
});

export default ProductDetails;
