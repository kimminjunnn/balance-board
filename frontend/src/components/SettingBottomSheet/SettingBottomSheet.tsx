import { forwardRef, useState } from "react";
import { StyleSheet } from "react-native";
import BottomSheet, { BottomSheetScrollView } from "@gorhom/bottom-sheet";
import ConfirmModal from "../common/ConfirmModal";

import SettingBottomSheetHeader from "./SettingBottomSheetHeader";
import SettingBottomSheetBody from "./SettingBottomSheetBody";

type SettingBottomSheetProps = {
  onClose: () => void;
  onConfirm: () => void;
};

const SettingBottomSheet = forwardRef<BottomSheet, SettingBottomSheetProps>(
  ({ onClose, onConfirm }, ref) => {
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
      onConfirm();
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
          <SettingBottomSheetHeader onPress={handleConfirmBtn} />
          <ConfirmModal
            visible={isConfirmModalVisible}
            title="Are you sure?"
            message="Do you really want to apply these settings?"
            onClose={handleCloseConfirmModal}
            onConfirm={handleConfirmModal}
          />

          <SettingBottomSheetBody />
        </BottomSheetScrollView>
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

  body: {
    minHeight: 300,
    backgroundColor: "orange", // 임시 - 바디 영역 확인용
  },
});
