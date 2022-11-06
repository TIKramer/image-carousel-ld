import { StyleSheet, SafeAreaView, Platform, StatusBar } from 'react-native';
import { useEffect, useState } from 'react';
import { Grid } from './src/components/Grid';
import { imagesAPI } from './src/api';
import { Provider as PaperProvider } from 'react-native-paper';
import { theme } from './src/theme';
import useOrientation from './src/hooks/useOrientation';


const FIRST_PAGE = 1;

export default function App()
{
  const [images, setImages] = useState<I_API_Image[]>([])
  const [loadingImages, setLoadingImages] = useState<boolean>(false)
  const orientation = useOrientation();

  //fetch first page on mount
  useEffect(() =>
  {
    if (images.length === 0)
    {
      fetchImages(FIRST_PAGE);
    }
  }, []);


  const fetchImages = async (pageNumber: number) =>
  {
    setLoadingImages(true)
    const data = await imagesAPI.getImages(pageNumber);
    if (data)
    {
      setImages(prevState => [
        ...prevState.concat(data)])
    }
    setLoadingImages(false)
  };

  return (
    <PaperProvider theme={theme}>
      <SafeAreaView style={styles.container}>
        <Grid orientation={orientation} loading={loadingImages} images={images} currentPage={FIRST_PAGE} handleUpdateImages={(page: number) => fetchImages(page)} />
      </SafeAreaView>
    </PaperProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,

  },
});
