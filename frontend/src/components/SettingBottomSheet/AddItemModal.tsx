import { useEffect, useState } from "react";
import {
  Modal,
  View,
  Text,
  TextInput,
  StyleSheet,
  Pressable,
} from "react-native";

import BalanceCrystal from "@/components/BalanceCrystal";
import BalanceBar from "@/components/BalanceBar";

type AddItemModalProps = {
  visible: boolean;
  onClose: () => void;
  onSubmit: (item: {
    leftValue: string;
    rightValue: string;
    balancePercent: number;
  }) => void;
};

type Step = 1 | 2 | 3;

export default function AddItemModal({
  visible,
  onClose,
  onSubmit,
}: AddItemModalProps) {
  const [step, setStep] = useState<Step>(1);
  const [firstValue, setFirstValue] = useState("");
  const [secondValue, setSecondValue] = useState("");
  const [inputValue, setInputValue] = useState("");

  // 핵심 상태 (0 ~ 10)
  const [balanceStartIndex, setBalanceStartIndex] = useState(5);

  useEffect(() => {
    if (visible) {
      setStep(1);
      setFirstValue("");
      setSecondValue("");
      setInputValue("");
      setBalanceStartIndex(5);
    }
  }, [visible]);

  const trimmedInputValue = inputValue.trim();
  const isStepOneValid = step === 1 && trimmedInputValue.length > 0;
  const isStepTwoValid = step === 2 && trimmedInputValue.length > 0;

  const leftPercent = 100 - balanceStartIndex * 10;
  const rightPercent = balanceStartIndex * 10;

  const handleNext = () => {
    const trimmed = inputValue.trim();
    if (!trimmed) return;

    if (step === 1) {
      setFirstValue(trimmed);
      setInputValue("");
      setStep(2);
      return;
    }

    if (step === 2) {
      setSecondValue(trimmed);
      setInputValue("");
      setStep(3);
    }
  };

  const handleComplete = () => {
    if (!firstValue || !secondValue) return;

    onSubmit({
      leftValue: firstValue,
      rightValue: secondValue,
      balancePercent: leftPercent,
    });
  };

  const renderStepTitle = () => {
    if (step === 1) return "Enter your first value";
    if (step === 2) return "Enter your second value";
    return "Adjust the balance";
  };

  const renderStepSubtitle = () => {
    if (step === 1) return "Choose one value for today";
    if (step === 2) return "Choose the opposite value";
    return "Drag to adjust the ratio";
  };

  const renderStepContent = () => {
    if (step === 1) {
      return (
        <>
          <View style={styles.centerArea}>
            <BalanceCrystal
              position="center"
              active
              tone="orange"
              label={inputValue.trim() || "value"}
            />
          </View>

          <TextInput
            value={inputValue}
            onChangeText={setInputValue}
            placeholder="e.g. growth"
            placeholderTextColor="#9CA3AF"
            style={styles.input}
          />

          <Pressable
            style={[styles.button, !isStepOneValid && styles.disabledButton]}
            onPress={handleNext}
            disabled={!isStepOneValid}
          >
            <Text style={styles.buttonText}>Confirm</Text>
          </Pressable>
        </>
      );
    }

    if (step === 2) {
      return (
        <>
          <View style={styles.row}>
            <BalanceCrystal label={firstValue} position="left" tone="orange" />
            <BalanceCrystal
              position="center"
              active
              tone="blue"
              label={inputValue.trim() || "value"}
            />
          </View>

          <TextInput
            value={inputValue}
            onChangeText={setInputValue}
            placeholder="e.g. peace"
            placeholderTextColor="#9CA3AF"
            style={styles.input}
          />

          <Pressable
            style={[styles.button, !isStepTwoValid && styles.disabledButton]}
            onPress={handleNext}
            disabled={!isStepTwoValid}
          >
            <Text style={styles.buttonText}>Confirm</Text>
          </Pressable>
        </>
      );
    }

    return (
      <>
        {/* 크리스탈 + 퍼센트 */}
        <View style={styles.row}>
          <BalanceCrystal
            label={firstValue}
            tone="orange"
            position="left"
            percent={leftPercent}
          />
          <BalanceCrystal
            label={secondValue}
            tone="blue"
            position="right"
            percent={rightPercent}
          />
        </View>

        {/* BalanceBar */}
        <View style={styles.balanceSection}>
          <BalanceBar
            value={balanceStartIndex}
            onChange={setBalanceStartIndex}
          />
        </View>

        <Pressable style={styles.button} onPress={handleComplete}>
          <Text style={styles.buttonText}>Add</Text>
        </Pressable>
      </>
    );
  };

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onClose}
    >
      <View style={styles.backdrop}>
        <View style={styles.card}>
          <View style={styles.header}>
            <View style={{ flex: 1 }}>
              <Text style={styles.title}>{renderStepTitle()}</Text>
              <Text style={styles.subtitle}>{renderStepSubtitle()}</Text>
            </View>

            <Pressable style={styles.closeButton} onPress={onClose}>
              <Text style={styles.closeButtonText}>✕</Text>
            </Pressable>
          </View>

          {/* step indicator */}
          <View style={styles.stepRow}>
            {[1, 2, 3].map((v) => (
              <View
                key={v}
                style={[
                  styles.step,
                  v === step && styles.stepActive,
                  v < step && styles.stepDone,
                ]}
              />
            ))}
          </View>

          {renderStepContent()}
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
  card: {
    backgroundColor: "#fff",
    borderRadius: 24,
    padding: 20,
  },
  header: {
    flexDirection: "row",
    gap: 12,
  },
  title: {
    fontSize: 22,
    fontWeight: "800",
  },
  subtitle: {
    marginTop: 6,
    fontSize: 14,
    color: "#6B7280",
  },
  closeButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: "#F3F4F6",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "#E5E7EB",
  },

  closeButtonText: {
    fontSize: 16,
    fontWeight: "700",
    color: "#374151",
  },
  stepRow: {
    flexDirection: "row",
    gap: 8,
    marginVertical: 20,
  },
  step: {
    flex: 1,
    height: 6,
    backgroundColor: "#E5E7EB",
    borderRadius: 999,
  },
  stepActive: {
    backgroundColor: "#FDBA74",
  },
  stepDone: {
    backgroundColor: "#F97316",
  },
  centerArea: {
    alignItems: "center",
    marginBottom: 20,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: "#E5E7EB",
    borderRadius: 14,
    padding: 14,
    marginBottom: 14,
  },
  button: {
    backgroundColor: "#F97316",
    padding: 14,
    borderRadius: 14,
    alignItems: "center",
  },
  disabledButton: {
    backgroundColor: "#FDBA74",
  },
  buttonText: {
    color: "#fff",
    fontWeight: "800",
  },
  balanceSection: {
    marginBottom: 20,
  },
});
