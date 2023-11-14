import {
  Alert,
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import * as Location from "expo-location";
import { MaterialIcons } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";
import Carousel from "../components/Carousel";
import Services from "../components/Services";
import DressItem from "../components/DressItem";
import { useDispatch, useSelector } from "react-redux";
import { getProducts } from "../ProductReducer";
import { useNavigation } from "@react-navigation/native";
import { collection, getDoc, getDocs } from "firebase/firestore";
import { db } from "../Firebase";

const HomeScreen = () => {
  const cart = useSelector((state) => state.cart.cart);
  const total = cart
    .map((item) => item.quantity * item.price)
    .reduce((curr, prev) => curr + prev, 0);
  const [items, setItems] = useState([]);
  const navigation = useNavigation();

  const [displayCurrentAddress, setDisplayCurrentAddress] = useState(
    "We are loading your location! "
  );
  const [locationServicesEnabled, setLocationServicesEnabled] = useState(false);

  useEffect(() => {
    checkIfLocationEnabled();
    getCurrentLocation();
  }, []);

  const checkIfLocationEnabled = async () => {
    let enabled = await Location.hasServicesEnabledAsync();
    if (!enabled) {
      Alert.alert(
        "Location Services Not Enabled",
        "Please enable the location services",
        [
          {
            text: "Ask me later",
            onPress: () => console.log("Ask me later pressed"),
          },
          {
            text: "Cancel",
            onPress: () => console.log("Cancel Pressed"),
            style: "cancel",
          },
          { text: "OK", onPress: () => console.log("OK Pressed") },
        ]
      );
    } else {
      setLocationServicesEnabled(enabled);
    }
  };

  const getCurrentLocation = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status != "granted") {
      Alert.alert(
        "Permission Denied",
        "Allow the app to use the location services",
        [
          {
            text: "Ask me later",
            onPress: () => console.log("Ask me later pressed"),
          },
          {
            text: "Cancel",
            onPress: () => console.log("Cancel Pressed"),
            style: "cancel",
          },
          { text: "OK", onPress: () => console.log("OK Pressed") },
        ]
      );
    }
    const { coords } = await Location.getCurrentPositionAsync();
    if (coords) {
      const { latitude, longitude } = coords;

      let response = await Location.reverseGeocodeAsync({
        latitude,
        longitude,
      });

      for (let item of response) {
        let address = `${item.name}${item.city}${item.postalCode}`;
        setDisplayCurrentAddress(address);
      }
    }
  };

  // services products

  const product = useSelector((state) => state.product.product);
  const dispatch = useDispatch();
  useEffect(() => {
    if (product.length > 0) return;

    const fetchProducts = async () => {
      const colRef = collection(db, "types");
      const docsSnap = await getDocs(colRef);
      docsSnap.forEach((doc) => {
        items.push(doc.data());
      });
      items?.map((service) => dispatch(getProducts(service)));
    };

    fetchProducts();
  }, []);

  return (
    <>
      <ScrollView style={styles.container}>
        {/* Location And Profile   */}
        <View
          style={{ flexDirection: "row", alignItems: "center", padding: 10 }}
        >
          <MaterialIcons name="location-on" size={24} color="#fd5c63" />
          <View>
            <Text style={{ fontSize: 18, fontWeight: "600" }}>Home</Text>
            <Text>{displayCurrentAddress}</Text>
          </View>
          <Pressable
            onPress={() => navigation.navigate("Profile")}
            style={{ marginLeft: "auto", marginRight: 7 }}
          >
            <Image
              style={styles.profileImage}
              source={{
                uri: "https://yt3.ggpht.com/1Alu7CBO8xBN3B7SY00SOiZvaagtPF7A28gL_Ia67B60Xde2oz06M1L9PWgr2TOKbgyZDNDjOA=s88-c-k-c0x00ffffff-no-rj",
              }}
            />
          </Pressable>
        </View>

        {/* Search Bar  */}
        <View style={styles.searchBar}>
          <TextInput placeholder="Search For items or more" />
          <Feather name="search" size={24} color="#fd5c63" />
        </View>

        {/* Image Crousel  */}
        <Carousel />

        {/* service  */}
        <Services />

        {/* render all products  */}
        {product.map((item, index) => (
          <DressItem item={item} key={index} />
        ))}
      </ScrollView>

      {total === 0 ? null : (
        <Pressable style={styles.proceedToPickup}>
          <View>
            <Text style={styles.itemsNumber}>
              {cart.length} items | ₹ {total}
            </Text>
            <Text style={styles.extraCharges}>Extra charges might apply </Text>
          </View>
          <Pressable onPress={() => navigation.navigate("PickUp")}>
            <Text style={styles.proceedButton}>Proceed To Pickup</Text>
          </Pressable>
        </Pressable>
      )}
    </>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#f0f0f0",
    flex: 1,
    paddingVertical: 25,
  },
  profileImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  searchBar: {
    padding: 10,
    margin: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderWidth: 0.8,
    borderColor: "#c0c0c0",
    borderRadius: 7,
  },
  proceedToPickup: {
    backgroundColor: "#088f8f",
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
