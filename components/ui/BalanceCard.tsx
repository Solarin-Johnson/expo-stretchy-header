import { StyleSheet, Text, useWindowDimensions, View } from "react-native";
import React, { useMemo } from "react";
import Animated, {
  Extrapolation,
  interpolate,
  SharedValue,
  useAnimatedStyle,
} from "react-native-reanimated";
import { balance, Balance, FACTOR } from "@/constants";
import { ThemedText } from "../ThemedText";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const PAD = 10 + FACTOR;
const HEIGHT = 120 + FACTOR * 2;

interface BalanceCardProps {
  scrollY: SharedValue<number>;
  setData: (data: any) => void;
}

export default function BalanceCard({ scrollY, setData }: BalanceCardProps) {
  const { width } = useWindowDimensions();
  const { top } = useSafeAreaInsets();
  const SNAP_HEIGHT = top + 78;

  const animatedStyle = useAnimatedStyle(() => {
    const height = interpolate(
      scrollY.value,
      [0, SNAP_HEIGHT],
      [HEIGHT, HEIGHT + 48],
      Extrapolation.CLAMP
    );

    const paddingTop = interpolate(
      scrollY.value,
      [0, HEIGHT + 62],
      [0, 10],
      Extrapolation.CLAMP
    );

    return {
      height,
      //   transform: [{ translateY }],
      //   paddingTop,
    };
  });

  return (
    <Animated.ScrollView
      style={[
        {
          height: HEIGHT,
        },
        animatedStyle,
      ]}
      horizontal
      snapToInterval={width}
      showsHorizontalScrollIndicator={false}
      decelerationRate={"fast"}
    >
      {balance.map((item, index) => (
        <Card key={index} {...item} scrollY={scrollY} />
      ))}
    </Animated.ScrollView>
  );
}

const Card = ({
  name,
  amount,
  color,
  scrollY,
}: Balance & { scrollY: SharedValue<number> }) => {
  const { width } = useWindowDimensions();
  const { top } = useSafeAreaInsets();
  const SNAP_HEIGHT = top + 78;

  const formattedAmount = useMemo(() => {
    return amount.toLocaleString("en-US", {
      style: "currency",
      currency: "USD",
    });
  }, [amount]);

  const animatedStyle = useAnimatedStyle(() => {
    const scaleX = interpolate(
      scrollY.value,
      [0, SNAP_HEIGHT],
      [1, 1.4],
      Extrapolation.CLAMP
    );
    return {
      transform: [{ scaleX }],
    };
  });

  return (
    <Animated.View
      style={[
        {
          width: width,
          paddingHorizontal: PAD,
          justifyContent: "center",
          overflow: "hidden",
        },
        // cardAnimatedStyle,
      ]}
    >
      <Animated.View
        style={[
          {
            position: "absolute",
            top: 0,
            bottom: 0,
            backgroundColor: color,
            borderRadius: 18 + FACTOR,
            width: width - PAD * 2,
            alignSelf: "center",
          },
          animatedStyle,
        ]}
      />
      <View
        style={{
          height: HEIGHT,
          justifyContent: "flex-end",
          //   backgroundColor: "red",
          padding: 16,
        }}
      >
        <ThemedText style={{ color: "#fff" }} type="regular">
          {name}
        </ThemedText>
        <ThemedText
          style={{ color: "#fff", fontSize: 28 }}
          type="defaultSemiBold"
        >
          {formattedAmount}
        </ThemedText>
      </View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({});
