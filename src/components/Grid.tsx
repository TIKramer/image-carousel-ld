import React, { useState, useRef, useMemo } from "react";
import
{
  FlatList,
  Modal,
  View,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import { Portal, TouchableRipple, Text } from 'react-native-paper';
import { Image } from "./Image";
import { ImageViewer } from "./ImageViewer";
import * as ScreenOrientation from 'expo-screen-orientation';
import { COLUMNS_HORIZONTAL, COLUMNS_VERTICAL, THUMB_SPACING, GRID_H_PADDING,DEFAULT_PAGE, NO_IMAGE} from "../constants/grid";
import { MaterialIcons } from '@expo/vector-icons';
import { DefaultListEmpty } from "./DefaultListEmpty";

/**
 * Grid
 *
 * Handles display of images
 */
export const Grid = ({
  orientation,
  images,
  loading,
  handleUpdateImages,
  currentPage
}: {
  orientation: ScreenOrientation.Orientation,
  images: I_API_Image[],
  loading: boolean,
  handleUpdateImages: any,
  currentPage?: number

}) =>
{

  //constants
  const ICON_SIZE = 30;

  const vertical = orientation === ScreenOrientation.Orientation.PORTRAIT_UP || orientation === ScreenOrientation.Orientation.PORTRAIT_DOWN ? true : false;
  const THUMB_PER_ROW = vertical ? COLUMNS_VERTICAL : COLUMNS_HORIZONTAL;
  // local state
  const [selectedImgIdx, setSelectedImgIdx] = useState<number>(NO_IMAGE);
  const pageNumber = useRef(currentPage || DEFAULT_PAGE)

  
  const _handleUpdateImage = () =>
  {
    if (!loading)
    {
      pageNumber.current = pageNumber.current + 1;
      handleUpdateImages(pageNumber.current)
    }
  }

  const _handleCloseModal = () =>
  {
    setSelectedImgIdx(NO_IMAGE)
  }
  const _handleOnChangeImage = (change: number) =>
  {
    const newValue = (selectedImgIdx + change)
    if (newValue >= NO_IMAGE)
    {
      setSelectedImgIdx((value) => value + change)
    }
  }

  const calculateThumbWidth = () =>
  {
    console.log('Ran!')
    const { width: windowWidth } = Dimensions.get("window");
    const galleryWidth = windowWidth - 2 * GRID_H_PADDING;
    const totalSpacing = (THUMB_PER_ROW - 1) * THUMB_SPACING;
    const thumbWidth = Math.floor((galleryWidth - totalSpacing) / THUMB_PER_ROW);
    return thumbWidth;
  };

  // looks more like the the spec sheet - but i prefer the smaller look in horizontal //used  to change size of horizontal view
  /*const calculateThumbHeight = () =>
  {
    const { height: windowHeight } = Dimensions.get("window");
    const galleryWidth = windowHeight;
    const totalSpacing = 1 * THUMB_SPACING;
    const thumbWidth = Math.floor((galleryWidth - totalSpacing) / 2);
    return thumbWidth;
  }; */

  const thumbWidth = useMemo(() => calculateThumbWidth(), [vertical]);
  const thumbHeight = thumbWidth;
  //  const thumbHeight = vertical ? thumbWidth : useMemo(() => calculateThumbHeight(), [vertical]);


  return (
    <View style={{ flex: 1, paddingHorizontal: GRID_H_PADDING }}>
      <FlatList style={{ flex: 1, }}
        key={THUMB_PER_ROW}
        data={images}
        columnWrapperStyle={styles.row}  // space them out evenly
        contentContainerStyle={{ flexGrow: 1, justifyContent: 'center' }}
        numColumns={THUMB_PER_ROW}
        keyExtractor={(item, index) => item.id + index}
        onEndReached={() => _handleUpdateImage()}
        onEndReachedThreshold={0.5}
        ListEmptyComponent={<DefaultListEmpty text={'No Images..'}/> }
        renderItem={({ item, index }) =>
          <TouchableRipple style={{ padding: THUMB_SPACING / 2 }} onPress={() => setSelectedImgIdx(index)}>
            <Image uri={item.urls.thumb}
              styleWidth={thumbWidth}
              styleHeight={thumbHeight}
            />
          </TouchableRipple>
        }
      >
      </FlatList>
      {selectedImgIdx != NO_IMAGE ? (
        <Portal >
          <Modal
          style={{flex: 1}}
            animationType="none"
            onDismiss={() => _handleCloseModal()}
            onRequestClose={() => _handleCloseModal()}>
              <View style={{flex:1 , backgroundColor:'black'}}>
              <ImageViewer image={images[selectedImgIdx]} onChangeImage={(value: number) => _handleOnChangeImage(value)} />
              <TouchableOpacity style={styles.closeBtn} onPress={() => _handleCloseModal()}>
              <MaterialIcons
                name={
                  'close'
                }
                size={ICON_SIZE}
                color="white"
              />
            </TouchableOpacity>
                </View>
          </Modal>
        </Portal>
      ) : null}
    </View >
  );
};
const styles = StyleSheet.create({
  row: {
    flex: 1,
    justifyContent: "flex-start",
  },
  column: {
    flex: 1,
  },
  imageViewerContainer: {
    flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: 'black'
  },
  closeBtn:{
    right: 0, top: 0, alignSelf: 'flex-end', margin: 20, position: 'absolute', backgroundColor: '#00000070'
  }
});