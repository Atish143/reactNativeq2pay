import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  FastImage,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
import {SliderBox} from 'react-native-image-slider-box';
import {useNavigation} from '@react-navigation/native';

export default function ProductDetails({route}) {
  const navigation = useNavigation();

  const {productId} = route.params;

  const [products, setProducts] = useState({limit: 0, products: []});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProductData();
  }, []);

  const fetchProductData = async () => {
    try {
      const response = await fetch(
        `https://dummyjson.com/products/${productId}`,
      );
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

  const discountedPrice =
    products.price - products.price * (products.discountPercentage / 100);

  return (
    <View>
      {loading ? (
        <View style={styles.loaderstyle}>
          <ActivityIndicator size="large" color="#7e42f5" />
        </View>
      ) : (
        <View style={styles.mainContainer}>
           {/* App Bar  */}
          <View style={styles.flexboxbackbtn}>
            <TouchableOpacity onPress={() => navigation.goBack(-1)}>
              <Text style={styles.appbarText}>Go Back</Text>
            </TouchableOpacity>
            <Text style={styles.productTitle}>Product Details</Text>
          </View>
           {/* card of image slider and product details   */}
          <View style={styles.imageslideandproductdetailscontainer}>
           {/* Image slider */}
            <SliderBox
              images={products?.images}
              ImageComponent={FastImage}
              dotColor="#FFEE58"
              inactiveDotColor="#90A4AE"
              resizeMode={'contain'}
              dotStyle={{
                width: 10,
                height: 10,
                borderRadius: 5,
                marginHorizontal: 0,
                padding: 0,
                margin: 0,
                backgroundColor: 'rgba(128, 128, 128, 0.92)',
              }}
              ImageComponentStyle={{
                borderRadius: 15,
                width: '90%',
                margin: 5,
                marginLeft: -35,
              }}
              imageLoadingColor="#2196F3"
            />
            {/* description text */}
            <Text style={styles.productDescp}>{products.description}</Text>
            {/* discounted percentage amount and product brand title category text */}
            <View style={styles.discountamtflexbox}>
              <View style={styles.discountPercentage}>
                <Text style={styles.discountPercentageText}>
                  {Math.round(products.discountPercentage)}% Off
                </Text>
              </View>
              <View style={styles.productDiscountedPriceView}>
                <Text style={styles.productPricetag}>Rs</Text>
                <Text style={styles.productPrice}>{products.price}</Text>
                <Text style={styles.productDiscountedPrice}>
                  {Math.round(discountedPrice)}/-
                </Text>
              </View>
              <View style={styles.productDetailtext}>
                <Text style={styles.productBrand}>{products.brand}</Text>
                <Text style={styles.productName}>{products.title} </Text>
                <Text style={styles.productCat}> {products.category} </Text>
              </View>
            </View>
             {/* ratings and units availability  */}
            <View style={styles.ratingContainer}>
              <Text style={styles.productRatingtext}>Ratings :</Text>
              <Text style={styles.productRatingrateText}>
                ({products.rating})
              </Text>
            </View>
            <View style={styles.stockandunitflexbox}>
              <Text style={styles.unitText}>Units Avaliable :</Text>
              <Text style={styles.unitavalText}>({products.stock})</Text>
            </View>
           {/* add to cart and buy btn  */}
            <View style={styles.btnsflexbox}>
              <TouchableOpacity style={styles.addtoWishlistbtn}>
                <Text style={styles.addtoWishlistbtnText}>Add to Wishlist</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.buyBtn}>
                <Text style={styles.addtoWishlistbtnText}>Buy</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    width: '100%',
    height: '100%',
    backgroundColor: '#766bb6',
  },
  imageslideandproductdetailscontainer: {
    margin: 10,
    padding: 10,
    borderWidth: 1,
    borderRadius: 10,
    borderColor: '#ccc',
    backgroundColor: '#fff',
    marginTop: 30,
  },
  loaderstyle: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ffff',
  },
  productName: {
    fontSize: 14,
    color: 'black',
  },
  productRatingtext: {
    fontSize: 18,
    color: 'black',
  },
  unitText: {
    fontSize: 18,
    color: 'black',
  },
  unitavalText: {
    fontSize: 18,
    color: 'green',
  },
  productRatingrateText: {
    fontSize: 18,
    color: 'green',
  },
  productCat: {
    fontSize: 14,
    color: 'black',
    marginLeft:-5,
  },
  productDescp: {
    fontSize: 16,
    color: 'black',
    margin: 10,
    fontWeight: 'bold',
  },
  ratingandstockflexbox: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  productDetailtext: {
    width: '60%',
  },
  appbarText: {
    fontSize: 14,
    color: 'black',
    margin: 10,
    borderWidth: 2,
    borderColor: 'black',
    padding: 5,
    borderRadius: 10,
  },
  addtoWishlistbtn: {
    backgroundColor: 'blue',
    padding: 10,
    borderRadius: 5,
  },
  addtoWishlistbtnText: {
    color: '#ffff',
    textAlign: 'center',
  },
  buyBtn: {
    backgroundColor: 'green',
    padding: 10,
    borderRadius: 5,
    width: 80,
  },
  btnsflexbox: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 15,
  },
  flexboxbackbtn: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    width: '100%',
  },
  discountPercentage: {
    backgroundColor: 'red',
    height: 40,
    width: 60,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 5,
    margin: 10,
  },
  discountPercentageText: {
    color: '#ffff',
  },
  productDiscountedPriceView: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'baseline',
    marginBottom: 5,
    marginRight: 10,
  },
  productDiscountedPrice: {
    fontSize: 22,
    color: 'green',
    margin: 2,
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
  discountamtflexbox: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  productBrand: {
    fontSize: 20,
    color: 'black',
    fontWeight: 'bold',
  },
  ratingContainer: {
    display: 'flex',
    flexDirection: 'row',
    width: '40%',
    justifyContent: 'space-between',
  },
  stockandunitflexbox: {
    display: 'flex',
    flexDirection: 'row',
    width: '52%',
    justifyContent: 'space-between',
  },
  productTitle: {
    marginLeft: 10,
    fontSize: 24,
    color: 'black',
    fontWeight: 'bold',
  },
});
