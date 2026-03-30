import { useRouter } from "expo-router";
import { View, Text, Pressable, Image, StyleSheet } from "react-native";

export default function HomeScreen() {
  const router = useRouter();

  const handleStart = () => {
    router.push("/today");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Balance Board</Text>
      <Text style={styles.subtitle}>Set your daily balance</Text>

      <Image
        style={styles.startThumbnail}
        source={require("@/assets/images/start-thumbnail.png")}
      />

      {/* <Pressable
        style={styles.startButton}
        onPress={() => router.push("/practice")}
      >
        <Text style={styles.startButtonText}>연습장 가기</Text>
      </Pressable> */}

      <Pressable style={styles.startButton} onPress={handleStart}>
        <Text style={styles.startButtonText}>Start</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
  },

  title: {
    fontSize: 32,
    fontWeight: "700",
  },
  subtitle: {
    fontSize: 16,
    fontWeight: "600",
  },

  startThumbnail: { marginVertical: 30, width: 330, height: 260 },

  startButton: {
    width: "100%",
    marginTop: 50,
    maxWidth: 300,
    backgroundColor: "#222222",
    paddingVertical: 16,
    borderRadius: 14,
    alignItems: "center",
    justifyContent: "center",
    top: 30,
  },
  startButtonText: {
    fontSize: 16,
    fontWeight: "700",
    color: "#FFFFFF",
  },
});
