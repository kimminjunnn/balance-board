import { View, Text, StyleSheet } from "react-native";
import { type BalanceItem } from "@/types/balance-item";

type BalanceItemListProps = {
  items: BalanceItem[];
};

export default function BalanceItemList({ items }: BalanceItemListProps) {
  return (
    <View style={styles.listContainer}>
      {items.map((item) => (
        <View key={item.id} style={styles.card}>
          <View style={styles.valueRow}>
            <Text style={styles.valueText}>{item.leftValue}</Text>
            <Text style={styles.arrowText}>↔</Text>
            <Text style={styles.valueText}>{item.rightValue}</Text>
          </View>

          <View style={styles.balanceRow}>
            <Text style={styles.balanceLabel}>Balance</Text>
            <Text style={styles.balanceValue}>{item.balance}</Text>
          </View>
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  listContainer: {
    gap: 12,
  },
  card: {
    backgroundColor: "#FFF7ED",
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: "#FED7AA",
  },
  valueRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  valueText: {
    fontSize: 17,
    fontWeight: "700",
    color: "#111827",
  },
  arrowText: {
    fontSize: 16,
    color: "#9CA3AF",
  },
  balanceRow: {
    marginTop: 12,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  balanceLabel: {
    fontSize: 14,
    color: "#6B7280",
  },
  balanceValue: {
    fontSize: 15,
    fontWeight: "700",
    color: "#EA580C",
  },
});
