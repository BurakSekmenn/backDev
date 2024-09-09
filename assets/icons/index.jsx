import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import ArrowLeft from './ArrowLeft'
import Call from './Call'
import Camera from './Camera'
import Comment from './Comment'
import Delete from './Delete'
import Edit from './Edit'
import Heart from './Heart'
import Home from './Home'
import Image from './Image'
import Location from './Location'
import Lock from './Lock'
import Mail from './Mail'
import Plus from './Plus'
import Search from './Search'
import Send from './Send'
import Share from './Share'
import ThreeDotsCircle from './ThreeDotsCircle'
import ThreeDotsHorizontal from './ThreeDotsHorizontal'
import User from './User'
import Video from './Video'
import logout from './logout'
import { theme } from '../../constants/theme'

const icons ={
    home: Home,
    arrowleft: ArrowLeft,
    call: Call,
    camera: Camera,
    comment: Comment,
    delete: Delete,
    edit: Edit,
    heart: Heart,
    image: Image,
    location: Location,
    lock: Lock,
    mail: Mail,
    plus: Plus,
    search: Search,
    send: Send,
    share: Share,
    threedotscircle: ThreeDotsCircle,
    threedotshorizontal: ThreeDotsHorizontal,
    user: User,
    video: Video,    
    logout: logout,
}

const Icon = ({name, ...props}) => {
    const IconComponent = icons[name];
    return (
        <IconComponent
            height={props.size || 24}
            width={props.size || 24}
            strokeWidth={props.strokeWidth || 1.9}
            color={theme.colors.textLight}
            {...props}
        />
    );
}

export default Icon;

