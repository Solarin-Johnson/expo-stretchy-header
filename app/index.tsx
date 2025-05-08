import React, { useRef, useState } from "react";
import { StyleSheet, Text, useWindowDimensions, View } from "react-native";
import { ThemedView } from "@/components/ThemedView";
import Animated, {
  runOnJS,
  scrollTo,
  useAnimatedRef,
} from "react-native-reanimated";
import Header from "@/components/ui/Header";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import {
  useAnimatedScrollHandler,
  useSharedValue,
} from "react-native-reanimated";
import BalanceCard from "@/components/ui/BalanceCard";

export default function Index() {
  const [data, setData] = useState([0, 1, 2, 3, 4]);
  const { top, bottom } = useSafeAreaInsets();
  const hasSnapped = useSharedValue(false);
  const scrollY = useSharedValue(0);
  const scrollRef = useAnimatedRef<Animated.ScrollView>();
  const SNAP_HEIGHT = top + 78;

  const scrollHandler = useAnimatedScrollHandler({
    onScroll: (event) => {
      const y = event.contentOffset.y;
      scrollY.value = y;
    },
    onEndDrag: (event) => {
      const y = event.contentOffset.y;

      if (y <= 1) {
        hasSnapped.value = false;
      }

      if (y < SNAP_HEIGHT / 2) {
        scrollTo(scrollRef, 0, 0, true);
        hasSnapped.value = false;
      } else if (y >= SNAP_HEIGHT / 2 && y < SNAP_HEIGHT) {
        scrollTo(scrollRef, 0, SNAP_HEIGHT, true);
        hasSnapped.value = true;
      }
    },
  });

  return (
    <ThemedView style={styles.container}>
      <Animated.ScrollView
        ref={scrollRef}
        contentContainerStyle={{
          paddingTop: top + 78,
          paddingBottom: bottom + 16,
        }}
        showsVerticalScrollIndicator={false}
        stickyHeaderIndices={[1]}
        onScroll={scrollHandler}
        // scrollEventThrottle={16}
        // snapToInterval={snapInterval}
        decelerationRate={"fast"}
      >
        <Header />
        <BalanceCard scrollY={scrollY} setData={setData} />
        <View style={{ paddingTop: 12 }}>
          {data.map((item, index) => (
            <View key={index.toString()} style={{ height: 280 }}>
              <Text>Item</Text>
            </View>
          ))}
        </View>
      </Animated.ScrollView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  text: {
    fontSize: 28,
  },
});
