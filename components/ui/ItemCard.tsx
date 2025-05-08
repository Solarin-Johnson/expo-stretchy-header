import { StyleSheet, View } from "react-native";
import React, { useMemo } from "react";
import { Expense } from "@/constants";
import { ThemedText } from "../ThemedText";

export default function ItemCard({ name, category, amount }: Expense) {
  const formattedAmount = useMemo(() => {
    return amount.toLocaleString("en-US", {
      style: "currency",
      currency: "USD",
    });
  }, [amount]);

  return (
    <View
      style={{
        marginBottom: 10,
        flexDirection: "row",
        paddingHorizontal: 24,
        paddingVertical: 10,
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <View style={{ flexDirection: "column" }}>
        <ThemedText type="defaultSemiBold">{name}</ThemedText>
        <ThemedText style={{ opacity: 0.7, fontSize: 14 }}>
          {category}
        </ThemedText>
      </View>
      <ThemedText type="bold">{formattedAmount}</ThemedText>
    </View>
  );
}

const styles = StyleSheet.create({});
