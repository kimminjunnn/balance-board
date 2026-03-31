import { View, Text, StyleSheet } from "react-native";
import { type BalanceItem } from "@/types/balance-item";

type BalanceItemListProps = {
  items: BalanceItem[];
};

const clampPercent = (value: number) => Math.max(0, Math.min(100, value));

export default function BalanceItemList({ items }: BalanceItemListProps) {
  return (
    <View style={styles.listContainer}>
      {items.map((item) => {
        const leftPercent = clampPercent(item.balancePercent);
        const rightPercent = 100 - leftPercent;

        return (
          <View key={item.id} style={styles.card}>
            <View style={styles.topRow}>
              <View style={styles.sideBlock}>
                <Text style={styles.valueText}>{item.leftValue}</Text>
                <Text style={styles.leftPercentText}>{leftPercent}%</Text>
              </View>

              <View style={[styles.sideBlock, styles.rightBlock]}>
                <Text style={styles.valueText}>{item.rightValue}</Text>
                <Text style={styles.rightPercentText}>{rightPercent}%</Text>
              </View>
            </View>

            <View style={styles.barTrack}>
              <View style={[styles.leftBar, { width: `${leftPercent}%` }]} />
              <View style={[styles.rightBar, { width: `${rightPercent}%` }]} />
            </View>
          </View>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  listContainer: {
    gap: 12,
  },
  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 14,
    padding: 14,
    borderWidth: 1,
    borderColor: "#E5E7EB",
    gap: 12,
  },
  topRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  sideBlock: {
    flex: 1,
  },
  rightBlock: {
    alignItems: "flex-end",
  },
  valueText: {
    fontSize: 16,
    fontWeight: "700",
    color: "#111827",
  },
  leftPercentText: {
    marginTop: 4,
    fontSize: 14,
    fontWeight: "700",
    color: "#F97316",
  },
  rightPercentText: {
    marginTop: 4,
    fontSize: 14,
    fontWeight: "700",
    color: "#3B82F6",
  },
  barTrack: {
    flexDirection: "row",
    height: 10,
    borderRadius: 999,
    backgroundColor: "#E5E7EB",
    overflow: "hidden",
  },
  leftBar: {
    height: "100%",
    backgroundColor: "#F97316",
  },
  rightBar: {
    height: "100%",
    backgroundColor: "#3B82F6",
  },
});
