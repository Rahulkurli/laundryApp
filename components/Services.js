import {
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React from "react";

const Services = () => {
  const services = [
    {
      id: "0",
      image: "https://cdn-icons-png.flaticon.com/128/3003/3003984.png",
      name: "Washing",
    },
    {
      id: "1",
      image: "https://cdn-icons-png.flaticon.com/128/2975/2975175.png",
      name: "Laundry",
    },
    {
      id: "2",
      image: "https://cdn-icons-png.flaticon.com/128/6981/6981022.png",
      name: "Wash & Iron",
    },
    {
      id: "3",
      image: "https://cdn-icons-png.flaticon.com/128/995/995016.png",
      name: "Cleaning",
    },
  ];
  return (
    <View style={styles.container}>
      <Text style={styles.servicesAvailable}>Services Available</Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {services.map((service, index) => {
          return (
            <Pressable key={index} style={styles.pressableButton}>
              <Image
                source={{ uri: service.image }}
                style={styles.iconsImage}
              />
              <Text style={styles.servicesName}>{service.name}</Text>
            </Pressable>
          );
        })}
      </ScrollView>
    </View>
  );
};

export default Services;

const styles = StyleSheet.create({
  container: { padding: 10 },

  iconsImage: {
    width: 70,
    height: 70,
  },

  servicesAvailable: {
    fontSize: 16,
    fontWeight: "500",
    marginBottom: 7,
  },

  pressableButton: {
    margin: 10,
    backgroundColor: "white",
    padding: 20,
    borderRadius: 7,
  },
  servicesName: {
    textAlign: "center",
    marginTop: 10,
  },
});
