import { useRef, useState } from "react";
import { View, Text, Image, StyleSheet, Pressable } from "react-native";
import BottomSheet from "@gorhom/bottom-sheet";
import SettingBottomSheet from "@/components/SettingBottomSheet";

type ScreenState = "idle" | "setting" | "done" | "locked";

export default function TodayScreen() {
  const [screenState, setScreenState] = useState<ScreenState>("idle");
  const bottomSheetRef = useRef<BottomSheet>(null);

  const handlePressSetting = () => {
    setScreenState("setting");
    bottomSheetRef.current?.snapToIndex(3);
  };

  const handleCloseBottomSheet = () => {
    setScreenState("idle");
  };

  const getToday = () => {
    const today = new Date();
    return `${today.getFullYear()}.${String(today.getMonth() + 1).padStart(
      2,
      "0",
    )}.${String(today.getDate()).padStart(2, "0")}`;
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.todayText}>{getToday()}</Text>

        {/* <Pressable style={styles.menuButton}>
          <Text style={styles.menuText}>☰</Text>
        </Pressable> */}
      </View>

      <View style={styles.main}>
        <Image
          style={styles.beforeSet}
          source={require("@/assets/images/before-set.png")}
          resizeMode="contain"
        />
      </View>

      <View style={styles.bottom}>
        <Pressable style={styles.setButton} onPress={handlePressSetting}>
          <Text style={styles.setButtonText}>Set Up Today</Text>
        </Pressable>
      </View>

      <SettingBottomSheet
        ref={bottomSheetRef}
        onClose={handleCloseBottomSheet}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F4F0",
    paddingHorizontal: 24,
    paddingTop: 70,
    paddingBottom: 40,
  },

  header: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 24,
  },

  todayText: {
    fontSize: 20,
    fontWeight: "700",
    color: "#222222",
  },

  menuButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
  },

  menuText: {
    fontSize: 24,
    fontWeight: "600",
    color: "#222222",
  },

  main: {
    flex: 1,
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
  },

  beforeSet: {
    width: 315,
    height: 120,
  },

  bottom: {
    width: "100%",
    alignItems: "center",
  },

  setButton: {
    width: "100%",
    backgroundColor: "#222222",
    paddingVertical: 16,
    borderRadius: 16,
    justifyContent: "center",
    alignItems: "center",
  },

  setButtonText: {
    fontSize: 18,
    fontWeight: "700",
    color: "#FFFFFF",
  },
});
