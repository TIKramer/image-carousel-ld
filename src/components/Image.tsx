import React, { useState } from "react";
import
{
  Image as RNImage,
  ImageProps,
  StyleProp,
  Text,
  View,
  ViewStyle,
} from "react-native";
import { MaterialCommunityIcons } from '@expo/vector-icons';

export enum LOADING
{
  IS_LOADING = 'IS_LOADING',
  COMPLETED = 'COMPLETED',
  FAILED = 'FAILED',
}

type Props = Omit<ImageProps, "source"> & {
  uri: string;
  styleWidth?: number | string;
  styleHeight?: number | string;
};

/**
 * Image
 *
 * RN Image with wrapper to fetch, display or show image error
 */
export const Image = ({
  uri,
  styleWidth = '100%',
  styleHeight = '100%',
  ...rest
}: Props) =>
{
  // local state
  const [loaded, setLoaded] = useState<LOADING>(LOADING.COMPLETED)

  const thumbStyle: StyleProp<ViewStyle> = {
    width: styleWidth,
    height: styleHeight,
    borderRadius: 1,
  };

  return (

    <View style={thumbStyle}>
      <RNImage
        onError={() => setLoaded(LOADING.FAILED)}
        resizeMode={'contain'}
        source={{ uri: uri }}
        style={{ width: styleWidth, height: styleHeight, display: loaded === LOADING.COMPLETED ? "flex" : "none" }}
        {...rest}
      />
      {loaded === LOADING.FAILED ?

        <View style={{ justifyContent: 'center', alignItems: 'center' }}>
          <MaterialCommunityIcons
            name="alert-circle-outline"
            size={20}
          />
          <Text style={{ color: 'black' }}>Error!</Text>
        </View> : null}

    </View>
  )



};
