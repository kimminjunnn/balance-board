import { forwardRef, useState } from "react";
import { Text, View, StyleSheet, Pressable } from "react-native";
import BottomSheet, {
  BottomSheetView,
  BottomSheetScrollView,
} from "@gorhom/bottom-sheet";
import ConfirmModal from "./common/ConfirmModal";

type SettingBottomSheetProps = {
  onClose: () => void;
};

const SettingBottomSheet = forwardRef<BottomSheet, SettingBottomSheetProps>(
  ({ onClose }, ref) => {
    const snapPoints = ["20%", "40%", "60%", "85%"];
    const [isConfirmModalVisible, setIsConfirmModalVisible] =
      useState<boolean>(false);

    const handleConfirmBtn = () => {
      setIsConfirmModalVisible(true);
    };

    const handleCloseConfirmModal = () => {
      setIsConfirmModalVisible(false);
    };

    const handleConfirmModal = () => {
      setIsConfirmModalVisible(false);
    };

    return (
      <BottomSheet
        ref={ref}
        index={-1}
        snapPoints={snapPoints}
        enablePanDownToClose
        enableDynamicSizing={false}
        onClose={onClose}
      >
        <BottomSheetScrollView style={styles.contentContainer}>
          <View style={styles.header}>
            <View>
              <Text style={styles.title}>Set my Balance</Text>
              <Text style={styles.description}>What matters to me today?</Text>
            </View>

            <View>
              <Pressable
                onPress={handleConfirmBtn}
                style={({ pressed }) => [
                  styles.confirmButton,
                  pressed && styles.confirmButtonPressed,
                ]}
              >
                <Text style={styles.confirmText}>Confirm</Text>
              </Pressable>
            </View>
          </View>

          <View style={styles.body}>
            <Text>Body</Text>
          </View>
        </BottomSheetScrollView>

        <ConfirmModal
          visible={isConfirmModalVisible}
          title="Confirm"
          message="Are you sure you want to apply these settings?"
          onClose={handleCloseConfirmModal}
          onConfirm={handleConfirmModal}
        />
      </BottomSheet>
    );
  },
);

export default SettingBottomSheet;

const styles = StyleSheet.create({
  contentContainer: {
    paddingHorizontal: 20,
    paddingTop: 8,
    paddingBottom: 24,
  },
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

  body: {
    minHeight: 300,
    backgroundColor: "orange", // 임시 - 바디 영역 확인용
  },
});
