import * as React from 'react'
import BottomScrollListener from 'react-bottom-scroll-listener';
import { SpiralSpinner, CubeSpinner, MagicSpinner, PongSpinner, TraceSpinner, RotateSpinner, FlapperSpinner } from "react-spinners-kit";
import { Box, Typography } from '@material-ui/core';
import { Colors, IconColor } from '../res/color';
import { Icons, IconKeys } from '../Standard UI/Icon';

type actinProps = {
    cb: (page: number) => Promise<number>,
    children?: JSX.Element[]
}

function ListingLoader({ status, cb }: { status: boolean, cb: (id: number) => any }) {
    const [text, setText] = React.useState("")
    const staticText = "Loading ..."
    let textController = 0

    if (!status) clearTimeout(textController)
    React.useEffect(() => {
        textController = setTimeout(() => {

            let record = text.length
            if (record >= staticText.length) {
                record = 0
            } else {
                record += 1
            }
            setText(staticText.substring(0, record))

        }, 250)
    }, [text])

    if (!status) return <div />

    return (
        <Box display="flex" flexDirection="row">
            <Box flexGrow={1}></Box>
            <Box display="flex" flexDirection="row">
                <RotateSpinner size={25} color={Colors.THEME_SECONDARY} loading={true} />
                <Typography component="h3" variant="h6" color="secondary" style={{marginLeft : 12}}>{text}</Typography>
            </Box>
            <Box flexGrow={1}></Box>
        </Box>
    )
}

function getErrorObject() {
    try { throw Error('') } catch (err) { return err; }
}


export function ScrollListener(props: actinProps) {

    var err = getErrorObject();
    var caller_line = err.stack.split("\n")[4];
    var index = caller_line.indexOf("at ");
    var clean = caller_line.slice(index + 2, caller_line.length);
    let [page, setPage] = React.useState(1)
    let [loadingStatus, setLoadingStatus] = React.useState(false)
    let [stop, setStop] = React.useState(false)
    let [loaderId, setLoaderId] = React.useState(0)

    const onBottom = () => {
        if (stop || loadingStatus) return
        setLoadingStatus(true)
        props.cb(page)
            .then(itemCounts => {
                if (itemCounts == 0) setStop(true)
                if (itemCounts > 0) setPage(page + 1)
            })
            .catch()
            .finally(() => setLoadingStatus(false))

    }


    if (!props.children) {
        return (
            <Box display="flex" justifyContent="center" alignItems="center" height="500px">
                {/* <MagicSpinner size={60} color={Colors.THEME_SECONDARY} loading={true} /> */}
                <RotateSpinner size={40} color={IconColor.THEME_PRIMARY} loading={true} />
            </Box>
        )
    }
    
    if (props.children.length == 1) {
        if (props.children[0].type == "span") {
            return (
                <Box display="flex" flexDirection="row" justifyContent="center" alignItems="center" height="500px">
                    <Icons name={IconKeys.emptyIcon} color={IconColor.THEME_SECONDARY} size={30} />
                    {/* <TraceSpinner size={50} loading={true} frontColor={IconColor.THEME_PRIMARY} /> */}
                    <Typography color="secondary" style={{ marginLeft: 20 }} variant="h6">No record found</Typography>
                </Box>
            )
        }
        // return (
        //     <Box display="flex" justifyContent="center" alignItems="center" height="500px">
        //         <MagicSpinner  size={100} color={Colors.THEME_SECONDARY} loading={true} />
        //     </Box>
        // )
    }

    if (props.children.length == 0) {
        return (
            <Box display="flex" justifyContent="center" alignItems="center" height="500px">
                <RotateSpinner size={40} color={IconColor.THEME_PRIMARY} loading={true} />
            </Box>
        )
    }

    return (
        <div>
            <BottomScrollListener onBottom={onBottom} />
            {props.children}
            {loadingStatus && <ListingLoader cb={id => setLoaderId(id)} status={loadingStatus} />}
        </div>
    )

}