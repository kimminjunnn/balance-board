import { useEffect, useState } from "react";
import {
  Modal,
  View,
  Text,
  TextInput,
  StyleSheet,
  Pressable,
} from "react-native";

type AddItemModalProps = {
  visible: boolean;
  onClose: () => void;
  onSubmit: (item: {
    leftValue: string;
    rightValue: string;
    balance: number;
  }) => void;
};

const clampBalance = (value: number) => Math.max(1, Math.min(9, value));

export default function AddItemModal({
  visible,
  onClose,
  onSubmit,
}: AddItemModalProps) {
  const [leftValue, setLeftValue] = useState("");
  const [rightValue, setRightValue] = useState("");
  const [balanceText, setBalanceText] = useState("5");

  useEffect(() => {
    if (visible) {
      setLeftValue("");
      setRightValue("");
      setBalanceText("5");
    }
  }, [visible]);

  const handleSubmit = () => {
    const trimmedLeftValue = leftValue.trim();
    const trimmedRightValue = rightValue.trim();
    const parsedBalance = clampBalance(Number(balanceText) || 5);

    if (!trimmedLeftValue || !trimmedRightValue) return;

    onSubmit({
      leftValue: trimmedLeftValue,
      rightValue: trimmedRightValue,
      balance: parsedBalance,
    });
  };

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onClose}
    >
      <View style={styles.backdrop}>
        <View style={styles.modalCard}>
          <Text style={styles.title}>Add Balance</Text>
          <Text style={styles.subtitle}>좌우 가치를 입력해줘</Text>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Left Value</Text>
            <TextInput
              value={leftValue}
              onChangeText={setLeftValue}
              placeholder="예: growth"
              placeholderTextColor="#9CA3AF"
              style={styles.input}
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Right Value</Text>
            <TextInput
              value={rightValue}
              onChangeText={setRightValue}
              placeholder="예: peace"
              placeholderTextColor="#9CA3AF"
              style={styles.input}
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Balance (1~9)</Text>
            <TextInput
              value={balanceText}
              onChangeText={setBalanceText}
              keyboardType="number-pad"
              placeholder="5"
              placeholderTextColor="#9CA3AF"
              style={styles.input}
              maxLength={1}
            />
          </View>

          <View style={styles.buttonRow}>
            <Pressable style={styles.cancelButton} onPress={onClose}>
              <Text style={styles.cancelButtonText}>취소</Text>
            </Pressable>

            <Pressable style={styles.confirmButton} onPress={handleSubmit}>
              <Text style={styles.confirmButtonText}>추가</Text>
            </Pressable>
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  backdrop: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.35)",
    justifyContent: "center",
    paddingHorizontal: 20,
  },
  modalCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 20,
    padding: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: "800",
    color: "#111827",
  },
  subtitle: {
    marginTop: 6,
    marginBottom: 18,
    fontSize: 14,
    color: "#6B7280",
  },
  inputGroup: {
    marginBottom: 14,
  },
  label: {
    marginBottom: 8,
    fontSize: 14,
    fontWeight: "600",
    color: "#374151",
  },
  input: {
    borderWidth: 1,
    borderColor: "#E5E7EB",
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingVertical: 12,
    fontSize: 15,
    color: "#111827",
    backgroundColor: "#F9FAFB",
  },
  buttonRow: {
    flexDirection: "row",
    gap: 10,
    marginTop: 10,
  },
  cancelButton: {
    flex: 1,
    borderRadius: 12,
    paddingVertical: 14,
    alignItems: "center",
    backgroundColor: "#F3F4F6",
  },
  confirmButton: {
    flex: 1,
    borderRadius: 12,
    paddingVertical: 14,
    alignItems: "center",
    backgroundColor: "#F97316",
  },
  cancelButtonText: {
    fontSize: 15,
    fontWeight: "700",
    color: "#374151",
  },
  confirmButtonText: {
    fontSize: 15,
    fontWeight: "700",
    color: "#FFFFFF",
  },
});
