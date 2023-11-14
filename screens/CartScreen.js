import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import React from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import { Ionicons } from "@expo/vector-icons";
import {
  cleanCart,
  decrementQuantity,
  incrementQuantity,
} from "../CartReducer";
import { decrementQty, incrementQty } from "../ProductReducer";
import { doc, setDoc } from "firebase/firestore";
import { auth, db } from "../Firebase";

const CartScreen = () => {
  const cart = useSelector((state) => state.cart.cart);
  console.log("cart", cart);
  const total = cart
    .map((item) => item.quantity * item.price)
    .reduce((curr, prev) => curr + prev, 0);
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const route = useRoute();
  const userUid = auth.currentUser.uid;

  const placeOrder = async () => {
    navigation.navigate("Order");
    dispatch(cleanCart());
    await setDoc(
      doc(db, "users", `${userUid}`),
      {
        orders: { ...cart },
        pickUpDetails: route.params,
      },
      { merge: true }
    );
  };

  return (
    <>
      <ScrollView style={styles.wrapper}>
        {total === 0 ? (
          <View style={styles.emptyItem}>
            <Text style={styles.emptyText}>Your cart is empty </Text>
          </View>
        ) : (
          <>
            <View style={styles.cartWrapper}>
              <Ionicons
                onPress={() => navigation.goBack()}
                name="arrow-back"
                size={24}
                color="black"
              />
              <Text>Your Bucket</Text>
            </View>
            <Pressable style={styles.pressableWrapper}>
              {cart.map((item, index) => (
                <View key={index} style={styles.cartItems}>
                  <Text style={styles.itemName}>{item.name}</Text>

                  {/* "-" ------ "+" button */}
                  <Pressable style={styles.pressable}>
                    {/* decrement  */}
                    <Pressable
                      onPress={() => {
                        console.log("dec", item.quantity); // Check item.quantity value
                        dispatch(decrementQuantity(item));
                        dispatch(decrementQty(item));
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
                        console.log("inc", item.quantity);
                        dispatch(incrementQuantity(item)); //cart
                        dispatch(incrementQty(item)); //product
                      }}
                      style={styles.pressableChangeValue}
                    >
                      <Text style={styles.Value}>+</Text>
                    </Pressable>
                  </Pressable>

                  <Text
                    style={{ fontSize: 17, fontWeight: "500", color: "black" }}
                  >
                    ₹{item.price * item.quantity}
                  </Text>
                </View>
              ))}
            </Pressable>

            {/* BILLING DETAILS ------------------------------->>>>>>>>>>>>>>>>>>>>> */}
            <View style={{ marginHorizontal: 10 }}>
              <View style={{ fontSize: 16, fontWeight: "bold", marginTop: 30 }}>
                <Text>Billing Details</Text>
              </View>

              {/* item total || billing wrapper  */}
              <ScrollView style={styles.BillingWrapper}>
                <View style={styles.itemTotalWrapper}>
                  <Text style={styles.itemTotal}>Item Total</Text>
                  <Text style={([styles.itemTotal], { color: "black" })}>
                    ₹{total}
                  </Text>
                </View>

                {/* Delivery fee  */}
                <View style={styles.deliveryFeeWrapper}>
                  <Text style={styles.deliveryFee}>Delivery Fee | 1.2KM</Text>
                  <Text style={([styles.deliveryFee], { color: "#088f8f" })}>
                    FREE
                  </Text>
                </View>

                {/* free delivery  */}
                <View style={styles.freeDeliveryWrapper}>
                  <Text style={styles.freeDelivery}>
                    Free Delivery on Your Order
                  </Text>
                </View>

                {/* selected date  */}
                <View style={styles.selectDateWrapper} />
                <View style={styles.selectDateView}>
                  <Text style={styles.selectDateText}>Selected Date</Text>
                  <Text
                    style={
                      ([styles.selectDateText],
                      { fontWeight: "400", color: "#088f8f" })
                    }
                  >
                    {route.params.pickUpDate.split("T")[0]}
                  </Text>
                </View>

                {/* days  */}
                <View style={styles.daysWrapper}>
                  <Text style={styles.days}>No Of Days</Text>
                  <Text
                    style={
                      ([styles.selectDateText],
                      { fontWeight: "400", color: "#088f8f" })
                    }
                  >
                    {route.params.no_Of_days}
                  </Text>
                </View>

                {/* selected time  */}
                <View style={styles.selectedTimeWrapper}>
                  <Text style={styles.selectedTime}>Selected Pick-Up-Time</Text>
                  <Text
                    style={
                      ([styles.selectedTime],
                      { fontWeight: "400", color: "#088F8F" })
                    }
                  >
                    {route.params.selectedTime}
                  </Text>
                </View>

                {/* to pay || Total  */}
                <View style={styles.toPayContainer} />
                <View style={styles.ToPayWrapper}>
                  <Text style={{ fontSize: 17, fontWeight: "bold" }}>
                    To Pay
                  </Text>
                  <Text style={{ fontSize: 18, fontWeight: "bold" }}>
                    ₹{total + 80}
                  </Text>
                </View>
              </ScrollView>
            </View>
          </>
        )}
      </ScrollView>
      {total === 0 ? null : (
        <Pressable style={styles.proceedToPickup}>
          <View>
            <Text style={styles.itemsNumber}>
              {cart.length} items | ₹ {total}
            </Text>
            <Text style={styles.extraCharges}>Extra charges might apply </Text>
          </View>
          <Pressable onPress={placeOrder}>
            <Text style={styles.proceedButton}>Place Order</Text>
          </Pressable>
        </Pressable>
      )}
    </>
  );
};

export default CartScreen;

const styles = StyleSheet.create({
  wrapper: { marginTop: 50 },
  cartItems: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginVertical: 10,
  },
  itemName: {
    fontSize: 17,
    fontWeight: "500",
    color: "black",
    width: 100,
  },
  emptyItem: { justifyContent: "center", alignItems: "center" },
  emptyText: { marginTop: 40 },
  cartWrapper: {
    padding: 10,
    flexDirection: "row",
    alignItems: "center",
  },
  pressableWrapper: {
    backgroundColor: "white",
    borderRadius: 12,
    marginLeft: 10,
    marginRight: 10,
    padding: 14,
  },
  pressable: {
    flexDirection: "row",
    paddingHorizontal: 10,
    paddingVertical: 5,
    alignItems: "center",
    borderColor: "#BEBEBE",
    borderWidth: 0.5,
    borderRadius: 10,
  },
  pressableChangeValue: {},
  Value: {
    fontSize: 20,
    color: "#088f8f",
    paddingHorizontal: 6,
    fontWeight: "600",
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
  BillingWrapper: {
    backgroundColor: "white",
    borderRadius: 7,
    padding: 10,
    marginTop: 15,
  },
  itemTotalWrapper: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  itemTotal: {
    fontSize: 18,
    fontWeight: "400",
    color: "gray",
  },
  deliveryFeeWrapper: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginVertical: 8,
  },
  deliveryFee: {
    fontSize: 17,
    fontWeight: "400",
    color: "gray",
  },
  freeDeliveryWrapper: { flexDirection: "row", alignItems: "center" },
  freeDelivery: { fontSize: 16, fontWeight: "500", color: "gray" },
  selectDateWrapper: {
    borderColor: "gray",
    height: 1,
    borderWidth: 0.5,
    marginTop: 10,
  },
  selectDateView: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginVertical: 10,
  },
  selectDateText: {
    fontSize: 17,
    fontWeight: "500",
    color: "gray",
  },
  daysWrapper: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  days: {
    fontSize: 17,
    fontWeight: "500",
    color: "gray",
  },
  selectedTimeWrapper: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginVertical: 10,
  },
  selectedTime: {
    fontSize: 17,
    fontWeight: "500",
    color: "gray",
  },
  toPayContainer: {
    borderColor: "gray",
    height: 1,
    borderWidth: 0.5,
    marginTop: 10,
  },
  ToPayWrapper: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginVertical: 8,
  },
  proceedToPickup: {
    backgroundColor: "#088f8f",
    marginTop: "auto",
    padding: 10,
    marginBottom: 40,
    margin: 15,
    borderRadius: 7,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  itemsNumber: {
    fontSize: 17,
    fontWeight: "600",
    color: "white",
  },
  extraCharges: {
    fontSize: 15,
    fontWeight: "400",
    color: "white",
    marginVertical: 6,
  },
  proceedButton: {
    fontSize: 15,
    fontWeight: "600",
    color: "black",
    backgroundColor: "#FCD200",
    padding: 10,
    borderRadius: 10,
    borderColor: "gray",
    borderWidth: 1,
  },
});
