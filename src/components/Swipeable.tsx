import React, { useRef } from "react";
import
{
    Animated,
    PanResponder,
    Dimensions,
    StyleSheet,
    StyleProp,
    ViewStyle,
} from "react-native";

enum Direction
{
    Left,
    Right
}
const SCREEN_WIDTH = Dimensions.get("window").width;
const SWIPE_THRESHOLD = 0.25 * SCREEN_WIDTH;

const Swipeable = ({
    onSwipeRight = () => { },
    onSwipeLeft = () => { },
    style,
    children
}: {
    onSwipeRight(): void,
    onSwipeLeft(): void,
    style:  StyleProp<ViewStyle>,
    children: React.ReactNode

}) =>
{
    const postion = useRef(new Animated.ValueXY()).current;
    const panResponder = React.useRef(
        PanResponder.create({
            onStartShouldSetPanResponder: () => true,

            onPanResponderMove: (_event: any, gesture: { dx: number; dy: number; }) =>
            {
                postion.setValue({ x: gesture.dx, y: 0 });
            },
            onPanResponderRelease: (_event: any, gesture: { dx: number; }) =>
            {
                if (gesture.dx > SWIPE_THRESHOLD)
                {
                    forceSwipe(Direction.Right);
                } else if (gesture.dx < -SWIPE_THRESHOLD)
                {
                    forceSwipe(Direction.Left);
                } else
                {
                    resetPosition();
                }
            },
        })
    ).current;

    const forceSwipe = (direction: Direction) =>
    {
        const x = direction === Direction.Right ? SCREEN_WIDTH : -SCREEN_WIDTH;
        Animated.timing(postion, {
            toValue: { x: x, y: 0 },
            duration: 500,
            useNativeDriver: false
        }).start(() => onSwipeComplete(direction));
    };

    const onSwipeComplete = (direction: Direction) =>
    {
        direction === Direction.Right ? onSwipeRight() : onSwipeLeft();
        postion.setValue({ x: 0, y: 0 });
    };

    const resetPosition = () =>
    {
        Animated.spring(postion, {
            toValue: { x: 0, y: 0 },
            useNativeDriver: false
        }).start();
    };

    return (
        <Animated.View
            style={[{ ...postion.getLayout() }, styles.container, style]}
            {...panResponder.panHandlers}
        >
            {children}
        </Animated.View>
    )

};

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        width: '100%',
        backgroundColor: 'black',
        height: '100%',
        borderRadius: 1,
        flexWrap: 'wrap'
    },
})


export default Swipeable;