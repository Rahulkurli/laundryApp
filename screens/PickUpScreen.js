import {
  Alert,
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import React, { useState } from "react";
import HorizontalDatepicker from "@awrminkhodaei/react-native-horizontal-datepicker";
import { useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/native";

const PickUpScreen = () => {
  // state
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTime, setSelectedTime] = useState([]);
  const [delivery, setDelivery] = useState([]);

  // cart and total and navigation
  const cart = useSelector((state) => state.cart.cart);
  const total = cart
    .map((item) => item.quantity * item.price)
    .reduce((curr, prev) => curr + prev, 0);
  const navigation = useNavigation();

  // delivery time static data
  const deliveryTime = [
    {
      id: "0",
      name: "2-3 Days",
    },
    {
      id: "1",
      name: "3-4 Days",
    },
    {
      id: "2",
      name: "4-5 Days",
    },
    {
      id: "3",
      name: "5-6 Days",
    },
    {
      id: "4",
      name: "Tomorrow",
    },
  ];

  // delivery time static data
  const times = [
    {
      id: "0",
      time: "11:00 AM",
    },
    {
      id: "1",
      time: "12:00 PM",
    },
    {
      id: "2",
      time: "01:00 PM",
    },
    {
      id: "3",
      time: "02:00 PM",
    },
    {
      id: "4",
      time: "03:00 PM",
    },
    {
      id: "5",
      time: "04:00 PM",
    },
  ];

  const proceedToCart = () => {
    if (!selectedDate || !selectedTime || !delivery) {
      Alert.alert(
        "Empty or Invalid",
        "Please Select all Filed",
        [
          {
            text: "Cancel",
            onPress: () => console.log("Cancel Pressed"),
            style: "cancel",
          },
          { text: "OK", onPress: () => console.log("OK Pressed") },
        ],
        { cancelable: false }
      );
    }

    if (selectedDate && selectedTime && delivery) {
      navigation.replace("Cart", {
        pickUpDate: selectedDate.toISOString(),
        selectedTime: selectedTime,
        no_Of_days: delivery,
      });
    }
  };

  // dates
  const currentDate = new Date();
  const endDate = new Date(currentDate);
  endDate.setDate(currentDate.getDate() + 7);
  return (
    <>
      <SafeAreaView style={styles.container}>
        <ScrollView>
          <Text style={styles.enterValue}>Enter Address</Text>
          <TextInput style={styles.inputText} />
          {/* Select  date  */}
          <Text style={styles.enterValue}>Pick Up Date</Text>
          <HorizontalDatepicker
            mode="gregorian"
            startDate={currentDate}
            endDate={endDate}
            onSelectedDateChange={(date) => setSelectedDate(date)}
            selectedItemWidth={170}
            unselectedItemWidth={38}
            itemHeight={38}
            itemRadius={10}
            selectedItemTextStyle={styles.selectedItemTextStyle}
            unselectedItemTextStyle={styles.selectedItemTextStyle}
            selectedItemBackgroundColor="#222831"
            unselectedItemBackgroundColor="#ececec"
            flatListContainerStyle={styles.flatListContainerStyle}
          />
          {/* select time  */}
          <Text style={styles.enterValue}>Select time</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {times.map((item, index) => (
              <Pressable
                key={index}
                style={
                  selectedTime.includes(item.time)
                    ? [styles.timeWrapper, { borderColor: "red" }]
                    : styles.timeWrapper
                }
                onPress={() => setSelectedTime(item.time)}
              >
                <Text>{item.time} </Text>
              </Pressable>
            ))}
          </ScrollView>

          {/* delivery date  */}
          <Text style={styles.enterValue}>Delivery Date</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {deliveryTime.map((item, i) => (
              <Pressable
                key={i}
                onPress={() => setDelivery(item.name)}
                style={
                  delivery.includes(item.name)
                    ? [styles.timeWrapper, { borderColor: "red" }]
                    : styles.timeWrapper
                }
              >
                <Text>{item.name}</Text>
              </Pressable>
            ))}
          </ScrollView>
        </ScrollView>
      </SafeAreaView>
      {total === 0 ? null : (
        <Pressable style={styles.proceedToPickup}>
          <View>
            <Text style={styles.itemsNumber}>
              {cart.length} items | ₹ {total}
            </Text>
            <Text style={styles.extraCharges}>Extra charges might apply </Text>
          </View>
          <Pressable onPress={proceedToCart}>
            <Text style={styles.proceedButton}>Proceed to Cart</Text>
          </Pressable>
        </Pressable>
      )}
    </>
  );
};

export default PickUpScreen;

const styles = StyleSheet.create({
  container: {
    paddingTop: 25,
  },
  enterValue: {
    fontSize: 16,
    fontWeight: "500",
    marginHorizontal: 10,
  },
  inputText: {
    padding: 40,
    borderColor: "gray",
    borderWidth: 0.7,
    paddingVertical: 80,
    borderRadius: 9,
    margin: 10,
  },
  timeWrapper: {
    margin: 10,
    borderRadius: 7,
    padding: 15,
    borderColor: "gray",
    borderWidth: 1,
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
    fontSize: 14,
    fontWeight: "600",
    color: "black",
    backgroundColor: "#FCD200",
    padding: 10,
    borderRadius: 10,
    borderColor: "gray",
    borderWidth: 1,
  },
});
