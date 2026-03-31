import { useEffect, useRef, useState } from "react";
import {
  Modal,
  View,
  Text,
  TextInput,
  StyleSheet,
  Pressable,
  Animated,
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

  const [balanceStartIndex, setBalanceStartIndex] = useState(5);

  const fadeAnim = useRef(new Animated.Value(1)).current;
  const translateYAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (visible) {
      setStep(1);
      setFirstValue("");
      setSecondValue("");
      setInputValue("");
      setBalanceStartIndex(5);
      fadeAnim.setValue(1);
      translateYAnim.setValue(0);
    }
  }, [visible, fadeAnim, translateYAnim]);

  const trimmedInputValue = inputValue.trim();
  const isStepOneValid = step === 1 && trimmedInputValue.length > 0;
  const isStepTwoValid = step === 2 && trimmedInputValue.length > 0;

  const leftPercent = 100 - balanceStartIndex * 10;
  const rightPercent = balanceStartIndex * 10;

  const animateStepChange = (nextStep: Step, afterChange?: () => void) => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 180,
        useNativeDriver: true,
      }),
      Animated.timing(translateYAnim, {
        toValue: 8,
        duration: 180,
        useNativeDriver: true,
      }),
    ]).start(() => {
      setStep(nextStep);
      afterChange?.();

      fadeAnim.setValue(0);
      translateYAnim.setValue(8);

      Animated.parallel([
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 220,
          useNativeDriver: true,
        }),
        Animated.timing(translateYAnim, {
          toValue: 0,
          duration: 220,
          useNativeDriver: true,
        }),
      ]).start();
    });
  };

  const handleNext = () => {
    const trimmed = inputValue.trim();
    if (!trimmed) return;

    if (step === 1) {
      setFirstValue(trimmed);
      animateStepChange(2, () => {
        setInputValue("");
      });
      return;
    }

    if (step === 2) {
      setSecondValue(trimmed);
      animateStepChange(3, () => {
        setInputValue("");
      });
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
            <Text style={styles.buttonText}>Done</Text>
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
            <Text style={styles.buttonText}>Done</Text>
          </Pressable>
        </>
      );
    }

    return (
      <>
        <View style={styles.row}>
          <BalanceCrystal
            label={firstValue}
            position="left"
            percent={leftPercent}
            tone="orange"
          />
          <BalanceCrystal
            label={secondValue}
            position="right"
            percent={rightPercent}
            tone="blue"
          />
        </View>

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

          <Animated.View
            style={{
              opacity: fadeAnim,
              transform: [{ translateY: translateYAnim }],
            }}
          >
            {renderStepContent()}
          </Animated.View>
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
    fontSize: 15,
    color: "#111827",
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
    fontSize: 15,
  },
  balanceSection: {
    marginBottom: 20,
  },
});
