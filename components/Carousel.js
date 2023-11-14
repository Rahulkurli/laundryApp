import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { SliderBox } from "react-native-image-slider-box";

const Carousel = () => {
  const images = [
    "https://heresajoke.com/wp-content/uploads/2022/11/Puns-about-laundry.jpg",
    "https://img.freepik.com/premium-vector/washing-machine-laundry-cartoon-collection_188898-239.jpg",
  ];
  return (
    <View>
      <SliderBox
        images={images}
        autoPlay
        circleLoop
        dotColor={"#13274f"}
        inactiveDotColor={"#90a4ae"}
        ImageComponentStyle={{
          borderRadius: 6,
          width: "94%",
        }}
      />
    </View>
  );
};

export default Carousel;

const styles = StyleSheet.create({});
