import * as React from 'react'
import { IconType } from 'react-icons/lib/cjs';
// import * as IconObj from "react-icons/all" 
import {
    FaPhone ,
    FaPen ,
    FaChrome ,
    FaCalendar ,
    FaAddressBook ,
    FaWallet ,
    FaUser ,
    FaTag ,
    FaSearch ,
    FaReceipt ,
    FaQrcode ,
    FaHome ,
    FaHistory ,
    FaCoins ,
    FaBullhorn ,
    FaArrowAltCircleUp ,
    FaArrowAltCircleDown ,
    FaFacebookSquare,
    FaListAlt,
    FaRegFileExcel,
    FaDownload,
    FaList,
    FaAddressCard,
    FaFilter,
    FaSignInAlt,
    FaSignOutAlt,
    FaPhoneAlt
} from 'react-icons/fa'
import {
    AiOutlineLogout ,
    AiOutlineLogin ,
    AiOutlineFileAdd ,
    AiFillCalculator ,
    AiFillCheckCircle
} from 'react-icons/ai'

import {
    MdTrackChanges ,
    MdNotifications ,
    MdMenu ,
    MdDashboard ,
    MdSend ,
    MdEmail ,
    MdAddCircle,
    MdAttachment,
    MdMoveToInbox,
    MdSentimentDissatisfied,
} from 'react-icons/md'

import {
    BsPencilSquare ,
    BsLockFill ,
    BsFillInfoCircleFill ,
    BsCircleFill ,
    BsListCheck,
    BsBook,
    BsTrash,
    BsXSquareFill
} from 'react-icons/bs'

import {
    GiWeight ,
    GiPayMoney ,
    GiNothingToSay ,
} from 'react-icons/gi'

import { IconColor } from '../res/color';

const IconObj = {
    FaPhone,
    FaPhoneAlt,
    FaPen,
    FaChrome ,
    FaCalendar ,
    FaAddressBook ,
    FaWallet ,
    FaUser ,
    FaTag ,
    FaSearch ,
    FaReceipt ,
    FaQrcode ,
    FaHome ,
    FaHistory ,
    FaCoins ,
    FaBullhorn ,
    FaListAlt,
    FaArrowAltCircleUp ,
    FaArrowAltCircleDown ,
    MdTrackChanges ,
    MdNotifications ,
    MdMenu ,
    MdDashboard ,
    MdSend ,
    MdEmail ,
    BsBook,
    BsTrash,
    BsXSquareFill,
    FaFacebookSquare,
    GiWeight ,
    GiPayMoney ,
    GiNothingToSay ,
    MdAddCircle,
    BsListCheck,
    BsPencilSquare ,
    BsLockFill ,
    BsFillInfoCircleFill ,
    BsCircleFill ,
    AiOutlineLogout ,
    AiOutlineLogin ,
    AiOutlineFileAdd ,
    AiFillCalculator ,
    AiFillCheckCircle,
    MdAttachment,
    FaRegFileExcel,
    FaDownload,
    MdMoveToInbox,
    MdSentimentDissatisfied,
    FaList,
    FaAddressCard,
    FaFilter,
    FaSignInAlt,
    FaSignOutAlt
}
export enum IconKeys {
    FaAddressCard = "FaAddressCard",
    username = "FaUser",
    home = "FaHome",
    toMe = "FaArrowAltCircleDown",
    fromMe = "FaArrowAltCircleUp",
    history = "FaHistory",
    desktop = "MdDashboard",
    quote = "AiFillCalculator",
    // add = "IoMdAddCircle",
    add="MdAddCircle",
    pickup= "FaBullhorn",
    deliveryNotification = "MdNotifications",
    qrcode = "FaQrcode",
    tracking = "MdTrackChanges",
    // proofOfDelivery= "GoChecklist",
    proofOfDelivery="BsListCheck",
    wallet = "FaWallet",
    shipment = "BsPencilSquare",
    myPoints = "FaCoins",
    circle = "BsCircleFill",
    password = "BsLockFill",
    awb = "AiOutlineFileAdd",
    logout = "FaSignInAlt",
    login = "FaSignOutAlt",
    CheckCircle="AiFillCheckCircle",
    search = "FaSearch",
    about = "BsFillInfoCircleFill",
    terms = "FaReceipt",
    menu = "MdMenu",
    tag = "FaTag",
    calender ="FaCalendar",
    send="MdSend",
    phone="FaPhoneAlt",
    reference="BsBook",
    trash="BsTrash",
    cancel="BsXSquareFill",
    weight="GiWeight",
    description="GiNothingToSay",
    nominal="GiPayMoney",
    remark="FaPen",
    email="MdEmail",
    address="FaAddressBook",
    web="FaChrome",
    // facebook="GrFacebook"
    facebook="FaFacebookSquare",
    statement="FaListAlt",
    attachment = "MdAttachment",
    excel="FaRegFileExcel",
    download="FaDownload",
    awbList = "MdMoveToInbox",
    emptyIcon = "MdSentimentDissatisfied",
    orderList = "FaList",
    filter = "FaFilter"
}

type params = {
    name: IconKeys,
    size?: number,
    color?: IconColor,
    style?: React.CSSProperties,
    className?:string
}

export const Icons = (params:params):JSX.Element => {
    const size = params.size || 20
    const color = params.color || IconColor.DEAFULT
    const Icon:IconType = IconObj[params.name]
    return <Icon className={params.className} size={size} color={color} style={params.style} />
}


