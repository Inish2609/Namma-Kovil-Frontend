import { Alert } from 'react-native';

export const showAlert = (
    title: string,
    message: string,
    onPress?: () => void
) => {
    Alert.alert(
        title,
        message,
        [
            {
                text: 'OK',
                onPress,
                style: 'default',
            },
        ],
        { cancelable: true }
    );
};

export const showApiError = (err: any, title = '') => {
    const message =
        err?.response?.data?.message ||
        err?.response?.data?.error ||
        err?.message ||
        'Something went wrong';

    Alert.alert(
        title,
        message,
        [{ text: 'OK', style: 'default' }],
        { cancelable: true }
    );
};