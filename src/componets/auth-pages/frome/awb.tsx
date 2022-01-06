import * as React from 'react'
import { Typography, Box, Chip, Avatar, LinearProgress, Button } from "@material-ui/core"
import { Icons, IconKeys } from '../../Standard UI/Icon'
import { FromMeItem } from './fromMe.ui'
import { fromMe, fromMeFilter } from '../../../lib/api'
import { FromMeList, SearchResponse } from '../../../lib/types/fromme.types'
import history from '../../history'
import frommeContext from '../../../context/awb.context'
import { getCity, cityProps, getTownship, townshipProps, getTownshipByCityId } from '../../../lib/storage/CityAndTownship'
import { ScrollListener } from '../../listener/ScrollListen'
import * as moment from 'moment';
import { AwbsFilter, AwbsFilterBar } from '../../Standard UI/filter/AwbFilter';
import { API_TIMEOUT, FILTER_PAGINATION_COUNT } from '../../../lib/config'
import { ChipObject, FilterFromMeObject } from '../../../lib/types/filter.types'

const data = {
    "date_from": moment().startOf('month').format('YYYY-MM-DD'),
    "date_to": moment().format('YYYY-MM-DD'),
    "receiver_name": "",
    "receiver_phone": "",
    "awb_no": "",
    "city_id":  "",
    "city": {},
    "township_id": "",
    "township": {},
    "receiver": false,
    "status": false,
    "cod": false,
    "delivered": false,
    "received": false
}

export function AWBList() {

    const [items, setItems] = React.useState<Array<FromMeList>>([])
    const [filterItems, setFilterItems] = React.useState<Array<FromMeList>>([])
    const [printItems, setPrintItems] = React.useState<Array<FromMeList>>([])
    const [state, dispatch] = React.useContext(frommeContext)
    const [oneTimeCall, setOneTimeCall] = React.useState(false)
    const [filterOneTimeCall, setFilterOneTimeCall] = React.useState(false)
    const [loading, setLoading] = React.useState(false)
    const [openFilter, setOpenFilter] = React.useState(false)
    const [type, setType] = React.useState("name")
    const [valueType, setValueType] = React.useState("")
    const [chipList, setChipList] = React.useState<Array<ChipObject>>([])
    const [filterMood, setFilterMood] = React.useState<boolean>(false)
    const [filterItemTotalCount, setFilterItemTotalCount] = React.useState<number>(0)
    const [progress, setProgress] = React.useState(false)
    const [progressPercent, setProgressPercent] = React.useState(0)
    const [filterObject, setFilterObject] = React.useState<FilterFromMeObject>(data as FilterFromMeObject)

    window.onbeforeunload = function () {
        window.scrollTo(0, 0);
    }

    React.useEffect( () => {
        let data = window.sessionStorage.getItem("@filterFromMe")
        if (history.action === "POP" && data) {
            let filtered = JSON.parse(data)
            setFilterObject(filtered)
            window.sessionStorage.removeItem("@filterFromMe")
            setBackFilter(filtered)
        }else {
            apiCall()
        }  
    }, [])   

    const setBackFilter = async (data : any) => {
        _onFilter(data)
    }

    const apiCall = async (page = 0) => {
        try {
            const results = await fromMe(page)

            if (results) setItems([...items, ...results])
            return Promise.resolve(results.length)
        } catch (error) {
            alert(error.messge)
            return Promise.reject()
        } finally {
            setOneTimeCall(true)
        }
    }

    const apiFilterCall = async (data : FilterFromMeObject, page = 0) => {
        try {
            const results = await fromMeFilter(getRequestData(data, page))
            if (results.awb_data.length > 0 ) {
                setFilterItems( prev => ([...prev, ...results.awb_data]))
                setFilterItemTotalCount(results.total_item)
            }
            return Promise.resolve(results.awb_data.length)
        } catch (error) {
            if(error == "Error: timeout of "+ API_TIMEOUT +"ms exceeded"){
                alert("Exceeded timeout, Please try agian.")
            }
            return Promise.reject()
        } finally {
            setFilterOneTimeCall(true)
        }
    }

    const apiGetAllFilter = async (page: number) => {
        setProgress(true)
        try {
            const results: SearchResponse = await fromMeFilter(getRequestData(filterObject, page))

            if (results.awb_data.length > 0) {
                setPrintItems(prev => ([...prev, ...results.awb_data]));
                setProgressPercent(((results.awb_data.length + (FILTER_PAGINATION_COUNT * page )) / results.total_item) * 100)
            }

            let count = 0
            if(results.total_item % FILTER_PAGINATION_COUNT == 0){
                count = results.total_item / FILTER_PAGINATION_COUNT
            }else {
                count = Math.floor(results.total_item / FILTER_PAGINATION_COUNT)
            }

            if (count == page) {
                setTimeout(() => {
                    setProgressPercent(100)
                    setProgress(false)
                }, 1000)
            } else {
                apiGetAllFilter(page + 1)
            }

        } catch (error) {
            return Promise.reject()
        }
    }

    const onClick = (param: FromMeList) => {
        if(filterMood){
            window.sessionStorage.setItem("@filterFromMe", JSON.stringify(filterObject))
        }
        dispatch({ FromMeList: param })
        history.push("/home/fromme/AWBDetails")
    }

    const RenderItemList = () => {
        let list: Array<JSX.Element> = []
        let data = filterMood ? filterItems : items
        let firstTime = filterMood ? filterOneTimeCall : oneTimeCall
        data.map((row, index) => {
            list.push(
                <FromMeItem
                    key={`fromme+ ${index}`}
                    id={row.name}
                    amount={row.delivery_charges}
                    create={row.awb_created_date}
                    to={row.receiver_id.name}
                    no={index + 1}
                    status={row.current_status.name.split("]")[1]}
                    onCLick={() => onClick(row)}
                    colorCode={row.current_status.name.split("]")[0].replace("[", "").trim()}
                />
            )
        })
        if (data.length == 0 && firstTime) {
            return [<span />]
        }
        return list
    }

    const _onCloseDialog = () => {
        setOpenFilter(false)
    }

    const _onFilter = async (filterObject : FilterFromMeObject) => {
        setFilterMood(true)

        await setChipList([])
        await setFilterItems( prev => ([]) )
        await setPrintItems( prev => ([]) )
        await setOpenFilter(false)
        await setProgressPercent(0)

        var list : ChipObject[] = []
        if (filterObject?.date_from != "" && filterObject?.date_to != "") list.push({ key: "date", value: filterObject?.date_from + " to " + filterObject?.date_to })

        if (filterObject?.receiver && type == "name" && filterObject?.receiver_name != "") list.push({ key: "type", value: filterObject?.receiver_name })
        else if (filterObject?.receiver && type == "awb" && filterObject?.awb_no != "") list.push({ key: "type", value: filterObject?.awb_no })
        else if (filterObject?.receiver && type == "phone" && filterObject?.receiver_phone != "") list.push({ key: "type", value: filterObject?.receiver_phone })
        else if (filterObject?.receiver && type == "city" && filterObject?.city.name != "") list.push({ key: "type", value: filterObject?.city.name || ""})
        else if (filterObject?.receiver && type == "township" && filterObject?.township.name != "") list.push({ key: "type", value: filterObject?.township.name || ""})

        if (filterObject?.status) list.push({ key: "delivered", value: filterObject?.delivered ? "Delivered" : "Not Delivered" })
        if (filterObject?.cod) list.push({ key: "cod", value: filterObject?.received ?  "Received" : "Not Received" })

        setChipList(list)
        apiFilterCall(filterObject)
    }

    const _onOpenDialog = () => {
        //if (items.length == 0) return
        setOpenFilter(true)
    }

    const onChangeType = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setType(e.target.value)
        setFilterObject( prev => ({ ...prev, ...{ sender_name : "", awb_no : "", sender_phone: "", city_id : 0, township_id : 0, city : {} as cityProps, township : {} as townshipProps}}))
    }
    
    const onChangeTypeValue = (event: React.ChangeEvent<HTMLInputElement|HTMLTextAreaElement>) => {
        setValueType(event.target.value)
        let data = event.target.value
        switch (type) {
            case "name": {
                setFilterObject( prev => ({...prev, receiver_name : data}))
                break
            }
            case "awb": {
                setFilterObject(prev => ({...prev, awb_no : data}))
                break
            }
            case "phone": {
                setFilterObject(prev => ({...prev, receiver_phone : data}))
                break
            }
        }
    }

    const renderChipList = () => {
        let list: Array<JSX.Element> = []
        chipList.map((row, index) => {
            list.push(
                <Chip label={row.value}
                    color="primary"
                    style={{ paddingRight: 8, margin: 4 }}
                    avatar={<Avatar> <Icons name={IconKeys.CheckCircle} size={30} /> </Avatar>}
                />
            )
        })
        // if(chipList == 0 && oneTimeCall){
        //     return [<span />]
        // }
        return list
    }

    const getRequestData = (data : FilterFromMeObject, page : number) => {
        return {
            ...data, 
            ...{
                "receiver": data.receiver ? "True" : "False",
                "status": data.status ? "True" : "False",
                "cod": data.cod ? "True" : "False",
                "delivered": data.delivered ? "True" : "False",
                "received": data.received ? "True" : "False",
                "page": page
            }
        }
    }

    const clearFilter = () => {
        setFilterMood(false)
        setChipList([])
        setFilterItems([])
        window.location.reload();
    }

    const excelFormator = () => {
        if (printItems.length == 0) return
        const excelDataSet: Array<{}> = []
        printItems.map(row => {
            excelDataSet.push({
                "AWB No.": row.name,
                "Sender Name": row.sender_id.name,
                "Sender Phone": row.sender_mobile,
                "Receiver Name": row.receiver_id.name,
                "Receiver Phone": row.receiver_mobile,
                "Origin City": row.origin_city[1],
                "Origin Township": row.origin_twsp_id.name,
                "Destination City": row.dest_city[1],
                "Destination Township": row.dest_twsp_id.name,
                "Service Type": row.service_type_id.name,
                "Payment Type": row.payment_type_id.name,
                "COD Amount": row.cod_amount,
                "Delivery Charges": row.delivery_charges,
                "Other Cost": row.other_cost,
                "To Receive": row.payment_type_id.name == "Special Service" ? row.cod_amount - (row.delivery_charges + row.other_cost) : row.cod_amount,
                "Goods Weight(kg)": row.weight,
                "Remark": row.remark,
                "Description": row.description,
                "Created Date": row.awb_created_date,
                "Deliverd Date": row.delivered_date,
                "Status": row.current_status.name.split("]")[1],
            })
        })

        return excelDataSet
    }

    return (

        <div>
            <AwbsFilter 
                searchType="fromme"
                openFilter={openFilter}
                title="Filter From Me"
                information="Receiver Information"
                filterFromDate = {filterObject?.date_from}
                onChangeFromDate = { (e) => {
                        let data = e.target.value
                        setFilterObject( prev => ({...prev, date_from : data}))
                    }
                }
                filterToDate = {filterObject?.date_to}
                onChangeToDate = { (e) => {
                        let data = e.target.value
                        setFilterObject( prev => ({...prev, date_to : data}))
                    }
                }
                filterReceiver = {filterObject?.receiver}
                onChangefilterReceiver = { () => setFilterObject( prev => ({...prev, receiver : !prev.receiver}) ) }
                type = {type}
                onChangeType = { e => onChangeType(e)}
                onChangeTypeValue = { e => onChangeTypeValue(e)}
                valueType = {valueType}
                onChangeCity = {(e, value) => setFilterObject( prev => ({...prev, ...{city : value, city_id : value.id}})) }
                onChangeTownship = { (e, value) => setFilterObject( prev => ({...prev, ...{township : value, township_id : value.id}})) }
                filterStatus = {filterObject?.status}
                onChangefilterStatus = { () => setFilterObject( prev => ({...prev, status : !prev.status}) )}
                filterDelivered = {filterObject?.delivered}
                onChangefilterDelivered = { () => setFilterObject( prev => ({...prev, delivered : !prev.delivered}) )}
                filterCod = {filterObject?.cod}
                onChangefilterCod = { () => setFilterObject( prev => ({...prev, cod : !prev.cod}) )}
                filterCash = {filterObject?.received}
                onChangefilterCash = { () => setFilterObject( prev => ({...prev, received : !prev.received}) )}
                onCloseDialog = { () => _onCloseDialog()}
                onFilter = { () => _onFilter(filterObject)}/>


            <AwbsFilterBar
                sheetName={"FromMe"}
                renderChipList={() => renderChipList()}
                filterMood={filterMood}
                count={printItems.length}
                progress={progress}
                progressPercent={progressPercent}
                totalCount={filterItemTotalCount}
                excelFormator={excelFormator}
                getAllItems={() => apiGetAllFilter(0)}
                clearFilter={() => clearFilter()}
                onOpenDialog={() => _onOpenDialog()}
                loading={loading} />

            {progress && <Box display="flex" alignItems="center">
                <Box width="100%" mr={1}>
                    <LinearProgress color="secondary" variant="buffer" valueBuffer={progressPercent} value={progressPercent} />
                </Box>
                <Box minWidth={35}>
                    <Typography variant="body2" color="textSecondary">{`${Math.round(
                        progressPercent
                    )}%`}</Typography>
                </Box>
            </Box>}

            {!filterMood && <ScrollListener cb={page => apiCall(page)}>
                {RenderItemList()}
            </ScrollListener>}

            {filterMood && <ScrollListener cb={page => apiFilterCall(filterObject ,page)}>
                {RenderItemList()}
            </ScrollListener>}

        </div>
    )
}
