import { View, Text, Pressable, StyleSheet } from "react-native";

type Props = {
  onPress: () => void;
};

export default function SettingBottomSheetHeader({ onPress }: Props) {
  return (
    <View style={styles.header}>
      <View>
        <Text style={styles.title}>Set my Balance</Text>
        <Text style={styles.description}>What matters to me today?</Text>
      </View>

      <Pressable
        onPress={onPress}
        style={({ pressed }) => [
          styles.confirmButton,
          pressed && styles.confirmButtonPressed,
        ]}
      >
        <Text style={styles.confirmText}>Confirm</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 12,
  },

  title: {
    fontSize: 20,
    fontWeight: "700",
    color: "#222222",
    marginBottom: 8,
  },
  description: {
    fontSize: 15,
    color: "#666666",
    marginBottom: 24,
  },

  confirmButton: {
    backgroundColor: "#222222",
    minWidth: 78,
    height: 36,
    borderRadius: 999,
    justifyContent: "center",
    alignItems: "center",
  },
  confirmButtonPressed: {
    opacity: 0.75,
  },

  confirmText: {
    fontSize: 14,
    fontWeight: "700",
    color: "#FFFFFF",
  },
});
