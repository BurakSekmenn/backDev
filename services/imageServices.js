
export const getUserImageSrc = imagePath =>{
    if(imagePath){
       return {uri: `http://192.168.0.5:5125${imagePath}`}
    }else{
        return require('../assets/images/defaultUser.png')
    }
}

