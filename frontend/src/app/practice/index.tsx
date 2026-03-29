import { View, Text, StyleSheet, Pressable } from "react-native";
import { useState } from "react";

export default function PracticeScreen() {
  const [number, setNumber] = useState(0);

  const plusOne = (prev: number) => {
    return prev + 1;
  };

  const handleIncreasement = () => {
    setNumber(plusOne);
    setNumber((prev) => prev + 1);
  };

  const handleDecreasement = () => {
    setNumber((prev) => prev - 1);
  };

  return (
    <View style={styles.container}>
      <Text>Practice Screen</Text>
      <Text>{number}</Text>
      <Pressable onPress={handleIncreasement}>
        <Text>증가 버튼</Text>
      </Pressable>

      <Pressable onPress={handleDecreasement}>
        <Text>감소 버튼</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
