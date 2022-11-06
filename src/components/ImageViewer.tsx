import React, { useState } from "react";
import
{
    Image as RNImage,
    ImageProps,
    StyleProp,
    View,
    StyleSheet,
    ViewStyle,

} from "react-native";
import { Text } from "react-native-paper";
import { MaterialCommunityIcons } from '@expo/vector-icons';
import Swipeable from "./Swipeable";
import { Loader } from "./Loader";

export enum LOADING
{
    IS_LOADING = 'IS_LOADING',
    COMPLETED = 'COMPLETED',
    FAILED = 'FAILED',
}

type Props = Omit<ImageProps, "source"> & {
    image: I_API_Image;
    styleWidth?: number | string;
    styleHeight?: number | string;
    onChangeImage: any;
};

/**
 * ImageViwer
 *
 * Wrapper on RN Image to fetch and handle image loading.
 * Wrapper Swipeable Compoent I made to handle swipes
 */

const INCREMENT_VALUE = 1
export const ImageViewer = ({
    image,
    styleWidth = '100%',
    styleHeight = '100%',
    onChangeImage,
    ...rest
}: Props) =>
{
    // local state
    const [loaded, setLoaded] = useState<LOADING>(LOADING.COMPLETED)

    const imageStyle: StyleProp<ViewStyle> = {
        width: styleWidth,
        height: styleHeight,
        borderRadius: 1,
        flexWrap: 'wrap',
    };

    const showImage = loaded === LOADING.COMPLETED;
    return (
        <Swipeable style={imageStyle} onSwipeLeft={() => onChangeImage(INCREMENT_VALUE)} onSwipeRight={() => onChangeImage(-INCREMENT_VALUE)}>

            <Loader isLoading={loaded === LOADING.IS_LOADING} size={30} />
            {loaded === LOADING.FAILED &&
                <View style={{ position: 'absolute', left: 0, right: 0, top: 0, bottom: 0, justifyContent: 'center', alignItems: 'center' }}>
                    <MaterialCommunityIcons
                        name="alert-circle-outline"
                        size={40}
                        color={'white'}
                    />
                    <Text>Image could not be loaded</Text>
                </View>}
            <RNImage
                onLoadStart={() => setLoaded(LOADING.IS_LOADING)}
                onLoadEnd={() => setLoaded(LOADING.COMPLETED)}
                onError={() => setLoaded(LOADING.FAILED)}
                resizeMode={'contain'}
                source={{ uri: image.urls.full }}
                style={{ flex: 0.9, width: styleWidth, height: styleHeight, display: showImage ? "flex" : "none" }}
                {...rest}
            />
            <View style={[{ flex: 0.1 }, styles.surfaceContainer]}>
                <View style={styles.surface}>
                    <Text>
                        Id: {image.id}
                    </Text>
                    <Text>
                        Likes: {image.likes}
                    </Text>
                    <Text>
                        User: {image.user.name}
                    </Text>
                </View>
            </View>



        </Swipeable>
    )



};

const styles = StyleSheet.create({

    surfaceContainer: {
        position: 'absolute', width: '100%', bottom: 20, alignItems: 'center'
    },
    surface: {
        alignItems: 'flex-start', backgroundColor: 'rgba(52, 52, 52, 0.6)', borderRadius: 10,
        borderWidth: 0.1, padding: 5
    },


})
