import { StyleSheet, View } from "react-native";
import React from "react";
import { ThemedText } from "../ThemedText";
import { Image } from "expo-image";
import { FACTOR } from "@/constants";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function Header() {
  const { top } = useSafeAreaInsets();

  return (
    <View
      style={{
        paddingHorizontal: 10 + FACTOR,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        height: 62,
        paddingBottom: 16 - FACTOR,
        marginTop: top + 16,
        position: "absolute",
        width: "100%",
      }}
    >
      <ThemedText type="bold" style={styles.text} numberOfLines={1}>
        Hi Solarin
      </ThemedText>
      <Image
        source={require("../../assets/images/dp.png")}
        style={styles.image}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  text: {
    fontSize: 28,
  },
  image: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 6,
  },
});
