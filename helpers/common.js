import {Dimensions} from 'react-native';
const {width : deviceWith, height: deviceHeight} = Dimensions.get('window');

export const hp = pertence =>{
    return (deviceHeight * pertence) / 100;
}
export const wp = pertence =>{
    return (deviceWith * pertence) / 100;
}