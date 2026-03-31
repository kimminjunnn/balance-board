import { useMemo, useRef } from "react";
import {
  View,
  Pressable,
  StyleSheet,
  PanResponder,
  type LayoutChangeEvent,
} from "react-native";

type BalanceBarProps = {
  value: number; // startIndex: 0 ~ 10
  onChange: (value: number) => void;
};

const TOTAL_BLOCKS = 21;
const ACTIVE_BLOCKS = 11;
const MAX_START_INDEX = TOTAL_BLOCKS - ACTIVE_BLOCKS; // 10
const HALF_ACTIVE = Math.floor(ACTIVE_BLOCKS / 2); // 5
const CENTER_INDEX = Math.floor(TOTAL_BLOCKS / 2); // 10

const clamp = (value: number, min: number, max: number) =>
  Math.max(min, Math.min(max, value));

export default function BalanceBar({ value, onChange }: BalanceBarProps) {
  const containerWidthRef = useRef(0);

  const startIndex = useMemo(() => clamp(value, 0, MAX_START_INDEX), [value]);

  const isAllLeft = startIndex === 0;
  const isAllRight = startIndex === MAX_START_INDEX;

  const handleLayout = (event: LayoutChangeEvent) => {
    containerWidthRef.current = event.nativeEvent.layout.width;
  };

  const handleTouchAt = (x: number) => {
    const containerWidth = containerWidthRef.current;
    if (containerWidth <= 0) return;

    const blockWidth = containerWidth / TOTAL_BLOCKS;

    const centerIndex = clamp(
      Math.round(x / blockWidth - 0.5),
      0,
      TOTAL_BLOCKS - 1,
    );

    const nextStartIndex = clamp(centerIndex - HALF_ACTIVE, 0, MAX_START_INDEX);

    onChange(nextStartIndex);
  };

  const panResponder = useMemo(
    () =>
      PanResponder.create({
        onStartShouldSetPanResponder: () => true,
        onMoveShouldSetPanResponder: () => true,

        onPanResponderGrant: (event) => {
          handleTouchAt(event.nativeEvent.locationX);
        },

        onPanResponderMove: (event) => {
          handleTouchAt(event.nativeEvent.locationX);
        },

        onPanResponderRelease: (event) => {
          handleTouchAt(event.nativeEvent.locationX);
        },
      }),
    [onChange],
  );

  return (
    <View
      style={styles.wrapper}
      onLayout={handleLayout}
      {...panResponder.panHandlers}
    >
      <View style={styles.row}>
        {Array.from({ length: TOTAL_BLOCKS }, (_, index) => {
          const isActive =
            index >= startIndex && index < startIndex + ACTIVE_BLOCKS;
          const isCenter = index === CENTER_INDEX;
          const isChunkStart = index === startIndex;
          const isChunkEnd = index === startIndex + ACTIVE_BLOCKS - 1;

          const isLeftSide = index < CENTER_INDEX;
          const isRightSide = index > CENTER_INDEX;

          return (
            <Pressable
              key={index}
              style={[
                styles.block,
                isActive && isLeftSide && styles.leftActiveBlock,
                isActive && isRightSide && styles.rightActiveBlock,
                isActive &&
                  isCenter &&
                  !isAllLeft &&
                  !isAllRight &&
                  styles.centerActiveBlock,
                isActive && isCenter && isAllLeft && styles.leftActiveBlock,
                isActive && isCenter && isAllRight && styles.rightActiveBlock,
                isChunkStart && styles.chunkStartBlock,
                isChunkEnd && styles.chunkEndBlock,
              ]}
              onPress={() => {
                const containerWidth = containerWidthRef.current;
                if (containerWidth <= 0) return;

                const blockWidth = containerWidth / TOTAL_BLOCKS;
                const tappedCenterX = (index + 0.5) * blockWidth;
                handleTouchAt(tappedCenterX);
              }}
            />
          );
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    width: "100%",
  },
  row: {
    flexDirection: "row",
    gap: 4,
  },
  block: {
    flex: 1,
    height: 34,
    borderRadius: 6,
    backgroundColor: "#E5E7EB",
  },
  leftActiveBlock: {
    backgroundColor: "#F97316",
  },
  rightActiveBlock: {
    backgroundColor: "#3B82F6",
  },
  centerActiveBlock: {
    backgroundColor: "#C084FC",
  },

  chunkStartBlock: {
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10,
  },
  chunkEndBlock: {
    borderTopRightRadius: 10,
    borderBottomRightRadius: 10,
  },
});
