import { View, Text, StyleSheet } from "react-native";

type BalanceCrystalProps = {
  label?: string;
  position: "left" | "center" | "right";
  active?: boolean;
  percent?: number;
  tone: "orange" | "blue" | "neutral";
};

export default function BalanceCrystal({
  label,
  position,
  active = false,
  percent,
  tone,
}: BalanceCrystalProps) {
  const hasLabel = Boolean(label?.trim());

  const resolvedTone =
    tone ??
    (position === "left"
      ? "orange"
      : position === "right"
        ? "blue"
        : "neutral");

  return (
    <View
      style={[
        styles.container,
        position === "center" && styles.center,
        position === "left" && styles.left,
        position === "right" && styles.right,

        resolvedTone === "orange" && styles.orangeCrystal,
        resolvedTone === "blue" && styles.blueCrystal,
        resolvedTone === "neutral" && styles.neutralCrystal,

        active && resolvedTone === "orange" && styles.orangeActive,
        active && resolvedTone === "blue" && styles.blueActive,
        active && resolvedTone === "neutral" && styles.neutralActive,
      ]}
    >
      {hasLabel ? (
        <Text
          numberOfLines={1}
          style={[
            styles.labelText,
            resolvedTone === "orange" && styles.orangeText,
            resolvedTone === "blue" && styles.blueText,
          ]}
        >
          {label}
        </Text>
      ) : null}

      {typeof percent === "number" && hasLabel ? (
        <Text
          style={[
            styles.percentText,
            resolvedTone === "orange" && styles.orangePercentText,
            resolvedTone === "blue" && styles.bluePercentText,
          ]}
        >
          {percent}%
        </Text>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: 112,
    height: 112,
    borderRadius: 999,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 12,
    borderWidth: 1,
  },

  center: {
    alignSelf: "center",
  },

  left: {
    alignSelf: "flex-start",
  },

  right: {
    alignSelf: "flex-end",
  },

  orangeCrystal: {
    backgroundColor: "#FFF7ED",
    borderColor: "#FDBA74",
  },

  blueCrystal: {
    backgroundColor: "#EFF6FF",
    borderColor: "#93C5FD",
  },

  neutralCrystal: {
    backgroundColor: "#F9FAFB",
    borderColor: "#E5E7EB",
  },

  orangeActive: {
    borderWidth: 2,
    borderColor: "#F97316",
    backgroundColor: "#FFEDD5",
  },

  blueActive: {
    borderWidth: 2,
    borderColor: "#3B82F6",
    backgroundColor: "#DBEAFE",
  },

  neutralActive: {
    borderWidth: 2,
    borderColor: "#D1D5DB",
    backgroundColor: "#FFFFFF",
  },

  labelText: {
    fontSize: 15,
    fontWeight: "700",
    textAlign: "center",
    color: "#111827",
  },

  orangeText: {
    color: "#C2410C",
  },

  blueText: {
    color: "#1D4ED8",
  },

  percentText: {
    marginTop: 6,
    fontSize: 13,
    fontWeight: "800",
  },

  orangePercentText: {
    color: "#F97316",
  },

  bluePercentText: {
    color: "#3B82F6",
  },
});
