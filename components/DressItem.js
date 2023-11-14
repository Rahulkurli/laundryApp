import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addToCart,
  decrementQuantity,
  incrementQuantity,
} from "../CartReducer";
import { decrementQty, incrementQty } from "../ProductReducer";

const DressItem = ({ item }) => {
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart.cart);

  const addItemToCart = () => {
    dispatch(addToCart(item)); //cart
    dispatch(incrementQty(item)); //product
  };

  return (
    <View>
      <Pressable onPress={addItemToCart} style={styles.itemDetails}>
        <View>
          <Image source={{ uri: item.image }} style={styles.itemImage} />
        </View>

        <View>
          <Text style={styles.itemName}>{item.name}</Text>
          <Text style={styles.price}>₹{item.price}</Text>
        </View>

        {cart.some((c) => c.id === item.id) ? (
          <Pressable style={styles.pressable}>
            {/* decrement  */}
            <Pressable
              onPress={() => {
                dispatch(decrementQuantity(item)); //cart
                dispatch(decrementQty(item)); //product
              }}
              style={styles.pressableChangeValue}
            >
              <Text style={styles.Value}>-</Text>
            </Pressable>
            {/* quantity  */}
            <Pressable style={styles.pressableQuantity}>
              <Text style={styles.quantity}>{item.quantity}</Text>
            </Pressable>
            {/* increment  */}
            <Pressable
              onPress={() => {
                dispatch(incrementQuantity(item)); //cart
                dispatch(incrementQty(item)); //product
              }}
              style={styles.pressableChangeValue}
            >
              <Text style={styles.Value}>+</Text>
            </Pressable>
          </Pressable>
        ) : (
          <Pressable onPress={addItemToCart} style={{ width: 80 }}>
            <Text style={styles.addButton}>Add</Text>
          </Pressable>
        )}
      </Pressable>
    </View>
  );
};

export default DressItem;

const styles = StyleSheet.create({
  itemDetails: {
    backgroundColor: "#f8f8f8",
    borderRadius: 8,
    padding: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    margin: 14,
  },

  itemImage: {
    width: 70,
    height: 70,
  },

  itemName: {
    width: 83,
    fontSize: 17,
    fontWeight: "500",
    marginBottom: 7,
  },

  price: {
    width: 60,
    color: "gray",
    fontSize: 15,
  },

  pressable: {
    flexDirection: "row",
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  pressableChangeValue: {
    width: 26,
    height: 26,
    borderRadius: 13,
    borderColor: "#BEBEBE",
    backgroundColor: "#E0E0E0",
    justifyContent: "center",
    alignContent: "center",
  },
  Value: {
    fontSize: 20,
    color: "#088f8f",
    paddingHorizontal: 6,
    fontWeight: "600",
    textAlign: "center",
  },
  pressableQuantity: {},
  quantity: {
    fontSize: 19,
    color: "#088f8f",
    paddingHorizontal: 8,
    fontWeight: "600",
  },
  addButton: {
    borderColor: "gray",
    borderWidth: 0.8,
    marginVertical: 10,
    color: "#088f8f",
    textAlign: "center",
    padding: 5,
    borderRadius: 4,
    fontSize: 17,
    fontWeight: "bold",
  },
});
