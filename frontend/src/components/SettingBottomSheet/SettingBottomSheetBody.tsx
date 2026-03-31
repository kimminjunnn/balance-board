import { useState } from "react";
import { Text, View, StyleSheet, Pressable } from "react-native";
import { type BalanceItem } from "@/types/balance-item";
import BalanceItemList from "../BalanceItemList";
import AddItemModal from "./AddItemModal";

const initialItems: BalanceItem[] = [
  {
    id: "1",
    leftValue: "love",
    rightValue: "peace",
    balance: 3,
  },
  {
    id: "2",
    leftValue: "growth",
    rightValue: "rest",
    balance: 5,
  },
  {
    id: "3",
    leftValue: "focus",
    rightValue: "freedom",
    balance: 7,
  },
];

export default function SettingBottomSheetBody() {
  const [draftItems, setDraftItems] = useState<BalanceItem[]>(initialItems);
  const [isAddModalVisible, setIsAddModalVisible] = useState(false);

  const handleOpenAddModal = () => {
    setIsAddModalVisible(true);
  };

  const handleCloseAddModal = () => {
    setIsAddModalVisible(false);
  };

  const handleSubmitNewItem = (item: Omit<BalanceItem, "id">) => {
    const newItem: BalanceItem = {
      id: String(Date.now()),
      ...item,
    };

    setDraftItems((prev) => [...prev, newItem]);
    setIsAddModalVisible(false);
  };

  return (
    <View style={styles.container}>
      <BalanceItemList items={draftItems} />

      <Pressable style={styles.addButton} onPress={handleOpenAddModal}>
        <Text style={styles.addButtonText}>+ Add Item</Text>
      </Pressable>

      <AddItemModal
        visible={isAddModalVisible}
        onClose={handleCloseAddModal}
        onSubmit={handleSubmitNewItem}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    minHeight: 500,
  },
  addButton: {
    marginTop: 16,
    paddingVertical: 16,
    borderRadius: 14,
    backgroundColor: "#F97316",
    alignItems: "center",
    justifyContent: "center",
  },
  addButtonText: {
    fontSize: 16,
    fontWeight: "700",
    color: "#FFFFFF",
  },
});
