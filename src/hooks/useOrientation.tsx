
import { useEffect, useState } from 'react';
import * as ScreenOrientation from 'expo-screen-orientation';
import { useWindowDimensions } from 'react-native';

export default function useOrientation() {
    const [orientation, setOrientation] = useState(ScreenOrientation.Orientation.PORTRAIT_UP);
    const { width, height } = useWindowDimensions();
    
    const handleSetOrientation = (orientation: ScreenOrientation.Orientation) => {

        if(orientation !== ScreenOrientation.Orientation.UNKNOWN)
        {
                setOrientation(orientation)
        }
        //An unknown screen orientation. For example, the device is flat, perhaps on a table.
        else
        {
                if(width < height)
                {
                    setOrientation(ScreenOrientation.Orientation.PORTRAIT_UP)

                }
                else
                {
                    setOrientation(ScreenOrientation.Orientation.LANDSCAPE_RIGHT)
                }
        }

    }
    useEffect(() =>
    {
      // set initial orientation  
      ScreenOrientation.getOrientationAsync()
        .then((info) =>
        {
            handleSetOrientation(info);
        });
  
      // subscribe to future changes
      const subscription = ScreenOrientation.addOrientationChangeListener((evt) =>
      {
        handleSetOrientation(evt.orientationInfo.orientation);
      });
  
      // return a clean up function to unsubscribe from notifications
      return () =>
      {
        ScreenOrientation.removeOrientationChangeListener(subscription);
      }
    }, []);
  
  return orientation;
}
