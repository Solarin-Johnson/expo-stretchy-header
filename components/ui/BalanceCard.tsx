import { StyleSheet, useWindowDimensions, View } from "react-native";
import React, { useMemo } from "react";
import Animated, {
  Extrapolation,
  interpolate,
  SharedValue,
  useAnimatedStyle,
} from "react-native-reanimated";
import { balance, Balance, FACTOR, getShuffledExpenses } from "@/constants";
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
  const SNAP_HEIGHT = useMemo(() => top + 78, [top]);

  const animatedStyle = useAnimatedStyle(() => {
    const height = interpolate(
      scrollY.value,
      [0, SNAP_HEIGHT],
      [HEIGHT, HEIGHT + 48],
      Extrapolation.CLAMP
    );

    return {
      height,
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
      onMomentumScrollEnd={(e) => {
        const x = e.nativeEvent.contentOffset.x;
        const index = Math.round(x / width);
        setData(getShuffledExpenses(index));
      }}
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
      [1, 1.2],
      Extrapolation.CLAMP
    );
    return {
      transform: [{ scaleX }],
    };
  });

  const animatedCardStyle = useAnimatedStyle(() => {
    const scale = interpolate(
      scrollY.value,
      [0, SNAP_HEIGHT],
      [1, 1.15],
      Extrapolation.CLAMP
    );

    const translateX = interpolate(
      scrollY.value,
      [0, SNAP_HEIGHT],
      [0, 16],
      Extrapolation.CLAMP
    );

    const translateY = interpolate(
      scrollY.value,
      [0, SNAP_HEIGHT],
      [0, 6],
      Extrapolation.CLAMP
    );

    return {
      transform: [{ scale }, { translateX }, { translateY }],
    };
  });

  return (
    <View
      style={[
        {
          width: width,
          paddingHorizontal: PAD,
          justifyContent: "center",
          overflow: "hidden",
        },
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
      >
        <View
          style={{
            overflow: "hidden",
            borderRadius: 18 + FACTOR,
            height: "100%",
          }}
        >
          <View
            style={{
              width: 500,
              aspectRatio: 1,
              borderRadius: 250,
              bottom: 160,
              left: -300,
              backgroundColor: "#ffffff30",
            }}
          />
        </View>
      </Animated.View>
      <Animated.View
        style={[
          {
            height: HEIGHT,
            justifyContent: "flex-end",
            overflow: "hidden",
            padding: 16,
          },
          animatedCardStyle,
        ]}
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
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({});
