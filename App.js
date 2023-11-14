import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import HomeScreen from "./screens/HomeScreen";
import { Provider } from "react-redux";
import Store from "./Store";
import StackNavigator from "./StackNavigator";

export default function App() {
  return (
    <Provider store={Store}>
      <StackNavigator />
    </Provider>
  );
}

const styles = StyleSheet.create({});
