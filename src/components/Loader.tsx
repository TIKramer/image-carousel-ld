

import { StyleSheet, ActivityIndicator } from 'react-native';
import { useTheme } from 'react-native-paper';

/* loader that is centered on the screen */
export const Loader = ({
    size,
    isLoading
}: {
    size: 'small' | 'large' | number,
    isLoading: boolean
}
) =>
{
    const { colors } = useTheme();
    return (
        <ActivityIndicator animating={isLoading} size={size} style={styles.indicator} color={colors.primary} />

    )
}


const styles = StyleSheet.create({
    indicator: { position: 'absolute', top: 0, right: 0, left: 0, bottom: 0 },
})