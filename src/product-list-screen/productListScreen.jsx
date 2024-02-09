import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  FlatList,
  Image,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import SelectDropdown from 'react-native-select-dropdown';
import {useNavigation} from '@react-navigation/native';

export default function ProductList() {
  const navigation = useNavigation();

  const [products, setProducts] = useState({limit: 0, products: []});
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState(null);

  useEffect(() => {
    fetchProductData();
  }, []);

  const fetchProductData = async () => {
    try {
      const response = await fetch('https://dummyjson.com/products');
      if (!response.ok) {
        throw new Error('Failed to fetch product data');
      }
      const data = await response.json();
      setProducts(data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching product data:', error);
      setLoading(false);
    }
  };

  const renderProductItem = ({item}) => {
    const discountedPrice =
      item.price - item.price * (item.discountPercentage / 100);

    let availabilityText = item.stock > 0 ? ' ' : 'Sold Out';

    return (
      <View>
           {/*  discount percentage top left  */}
        <View style={styles.discountPercentage}>
          <Text style={styles.discountPercentageText}>
            {Math.round(item.discountPercentage)}% Off
          </Text>
        </View>
       {/* iof stocks get 0 then there will a ui rendered for sold out     */}
        <View style={styles.productCard}>
          {availabilityText === 'Sold Out' ? (
            <View style={styles.availabilityView}>
              <Text style={styles.availabilityViewText}>
                {availabilityText}
              </Text>
            </View>
          ) : null}
           {/* image is flexed in row by details */}
          <Image source={{uri: item.thumbnail}} style={styles.productImage} />
        {/* details of products */}
          <View style={styles.productCardDetails}>
            <Text style={styles.productName}>{item.brand}</Text>
            <Text style={styles.productTiltle}>{item.title}</Text>
            <View style={styles.productDiscountedPriceView}>
              <Text style={styles.productPricetag}>Rs</Text>
              <Text style={styles.productPrice}>{item.price}</Text>
              <Text style={styles.productDiscountedPrice}>
                {Math.round(discountedPrice)}/-
              </Text>
            </View>
         {/* button of viewing product details  */}
            <TouchableOpacity
              style={styles.detailedViewbtn}
              onPress={() => {
                navigation.navigate('ProductDetailsScreen', {
                  productId: item.id,
                });
              }}>
              <Text style={styles.detailedViewText}>View Product Details</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  };

  const getUniqueCategories = () => {
    const categories = products?.products.map(product => product.category);
    return ['All', ...new Set(categories)];
  };

  const dropdownItems = getUniqueCategories();

  const filteredProducts = selectedCategory
    ? products.products.filter(product => {
        return selectedCategory === 'All'
          ? true
          : product.category === selectedCategory;
      })
    : products.products;

  return (
    <View>
      {loading ? (
        <View style={styles.loaderstyle}>
          <ActivityIndicator size="large" color="#7e42f5" />
        </View>
      ) : (
        <View style={styles.mainContainer}>
        {/* App Bar and dropdown for filter by category */}
          <View style={styles.appbarContainer}>
            <TouchableOpacity
              onPress={() => {
                navigation.goBack();
              }}>
              <Text style={styles.appbarText}>Go Back</Text>
            </TouchableOpacity>
            <SelectDropdown
              data={dropdownItems}
              onSelect={(selectedItem, index) => {
                setSelectedCategory(selectedItem);
              }}
              defaultButtonText="Filter by categories"
              buttonStyle={styles.dropdownButton}
              buttonTextStyle={styles.dropdownButtonText}
              rowStyle={styles.dropdownRow}
            />
          </View>
           {/* list of products */}
          <FlatList
            data={filteredProducts}
            renderItem={renderProductItem}
            keyExtractor={item => item.id.toString()}
          />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    paddingBottom: 150,
    backgroundColor: '#766bb6',
  },
  appbarContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: 'white',
    width: '100%',
  },
  appbarText: {
    fontSize: 18,
    color: 'black',
    margin: 10,
    borderWidth: 2,
    borderColor: 'black',
    padding: 5,
    borderRadius: 10,
  },
  loaderstyle: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ffff',
  },
  productCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    margin: 10,
    padding: 10,
    borderWidth: 1,
    borderRadius: 10,
    borderColor: '#ccc',
    backgroundColor: '#fff',
  },
  productCardDetails: {
    width: '55%',
  },
  productDiscountedPriceView: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'baseline',
    marginBottom: 5,
  },
  productImage: {
    width: 120,
    height: 120,
    marginBottom: 10,
    borderRadius: 70,
  },
  productName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  productTiltle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  productPrice: {
    fontSize: 16,
    color: 'black',
    textDecorationLine: 'line-through',
    textDecorationStyle: 'solid',
    margin: 2,
  },
  productPricetag: {
    fontSize: 16,
    color: 'black',
    margin: 2,
  },
  productDiscountedPrice: {
    fontSize: 20,
    color: 'green',
    margin: 2,
  },
  discountPercentage: {
    position: 'absolute',
    backgroundColor: 'red',
    height: 30,
    width: 60,
    top: 0,
    right: 10,
    alignItems: 'center',
    zIndex: 2,
    justifyContent: 'center',
    borderRadius: 5,
  },
  discountPercentageText: {
    color: '#ffff',
  },
  detailedViewText: {
    fontSize: 16,
    color: '#ffff',
    margin: 2,
  },
  detailedViewbtn: {
    backgroundColor: '#ac6696',
    alignItems: 'center',
    padding: 2,
    borderRadius: 7,
  },
  availabilityView: {
    position: 'absolute',
    zIndex: 3,
    color: 'red',
    left: 0,
    top: 60,
    width: 200,
    height: 20,
    alignItems: 'center',
    backgroundColor: 'red',
  },
  availabilityViewText: {
    color: '#ffff',
  },
  dropdownButton: {
    borderWidth: 1,
    borderRadius: 5,
    borderColor: '#ccc',
    backgroundColor: 'lightgrey',
    margin: 10,
  },
  dropdownButtonText: {
    fontSize: 14,
    color: 'black',
    fontWeight: 'bold',
  },
  dropdownRow: {
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
});
