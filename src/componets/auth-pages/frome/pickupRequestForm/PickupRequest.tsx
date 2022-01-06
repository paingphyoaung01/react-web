import * as React from 'react'
import { AppContainer, LeftContainer, RightContainer, FormContainer } from '../../../Standard UI/container/Container'
import { CustomizedPaper } from '../../../Standard UI/paper/CustomizedPaper'
import { CustomizedInputs, CustomizedAutoCompleteBox } from '../../../Standard UI/Input/CustomizedInputs'
import { IconKeys } from '../../../Standard UI/Icon'
import { getCity, cityProps, getCityById, getTownshipByTownshipId, townshipProps, getTownship, getTownshipByCityId } from '../../../../lib/storage/CityAndTownship'
import { TextareaAutosize, Box } from '@material-ui/core'
import { MuiPickersUtilsProvider, DatePicker, TimePicker } from '@material-ui/pickers'
import * as moment from 'moment'
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';
import MomentUtils from '@date-io/moment'
import { CustomizedButton } from '../../../Standard UI/button/CustomizedButton'
import { Colors } from '../../../res/color'
import { getNameByPhone, createPickUp, createPickUpProps, checkDuplicatePickup } from '../../../../lib/api'
import authContext from '../../../../context/Api.context'
import auth from '../../../../auth/auth'
import history from '../../../history'
import { Text } from '../../../Standard UI/Text/Text'
const myanmarPhoneNumber = require('myanmar-phonenumber')

export function PickupRequestForm() {
    const [state, dispatch] = React.useContext(authContext)
    const [loading, setLoading] = React.useState(false)
    const currentDate = new Date()
    const [selectedDate, setDate] = React.useState<string | Date>(currentDate);
    const [openDialog, setOpenDialog] = React.useState(false);
    const handleDateAndTime = (date: Date | string | null | any) => {
        setDate(moment(date).toDate())
    };

    const [phone, setPhone] = React.useState<string | undefined>();
    const [address, setAddress] = React.useState<string | undefined>();
    const [city, setCity] = React.useState<cityProps | undefined | null>(auth.getUserCityObj());
    const [township, setTownship] = React.useState<townshipProps | undefined | null>(auth.getUserTownshipObj());
    const [userName, setUsername] = React.useState<string | undefined>();
    const [userId, setUserId] = React.useState<number | undefined>(0);
    const [items, setItems] = React.useState<number>(0);
    const [note, setNote] = React.useState<string | undefined>();
    const [requestData, setRequestData] = React.useState<createPickUpProps>({
        customer_phone_no: "",
        customer_name: "",
        note: "",
        address: "",
        city_id: 0,
        township_id: 0,
        time_to_pick: "",
        items: 0
    });

    const handleReceiverPhone = (phonenumber: string) => {
        setPhone(phonenumber)
        if (!state.user_data || !state.user_data.id) return
        const isValid = myanmarPhoneNumber.isValidMMPhoneNumber(phonenumber)
        if (isValid) getReceiver(state.user_data.id, phonenumber)
    }

    const getReceiver = async (uid: number, receiverMobile: string) => {
        const receiver = await getNameByPhone(uid, receiverMobile)
        if (receiver.name) setUsername(receiver.name)
        if (receiver.city_id) setCity(getCityById(receiver.city_id))
        if (receiver.township_id) setTownship(getTownshipByTownshipId(receiver.township_id))
    }

    React.useEffect(() => {
        if (!state.contact_data || !state.contact_data.mobile) return
        if (phone != state.contact_data.mobile) {
            setPhone(state.contact_data.mobile)
            setUsername(state.contact_data.name)
            setAddress(state.contact_data.full_address)
        }
        if (state.contact_data) {
            setUserId(state.contact_data?.id)
        }
    })

    const onCheckData = () => {
        if (!state.user_data || !state.user_data.id || !state.contact_data || !state.contact_data.id) return

        if (!address) {
            alert("Invalid Address")
            return
        }
        if (!userName) {
            alert("Invalid Customer Name")
            return
        }
        if (!phone) {
            alert("Invalid Customer Bumber")
            return
        }
        if (!phone) {
            alert("Invalid Customer Bumber")
            return
        }
        if (!city || !township) {
            alert("Invalid City or township")
            return
        }
        // if(items == 0){
        //     alert("Items must be greater than 0")
        //     return
        // }

        const date = moment(selectedDate).subtract(6.5, 'hours').format('YYYY-MM-DD HH:mm:ss')

        const data = {
            address,
            customer_name: state.contact_data.id,
            note,
            items,
            customer_phone_no: phone,
            time_to_pick: date,
            city_id: city?.id,
            township_id: township?.id
        }

        setRequestData(data)
        onCheckDuplicate(date, data)

    }

    const onCheckDuplicate = async (date: any, data: createPickUpProps) => {
        const response = await checkDuplicatePickup({
            customer_id: userId,
            time_to_pick: date
        })

        if (response) {
            if (response.error) alert(response.error)
            else if (response.duplicate) onShowDialog()
            else onSubmit(data)
        }

    }

    const onShowDialog = () => {
        setOpenDialog(true)
    }

    const handleConfirm = () => {
        setOpenDialog(false)
        onSubmit(requestData)
    }

    const handleClose = () => {
        setOpenDialog(false)
        setLoading(false)
    }

    const onSubmit = async (data: createPickUpProps) => {
        try {
            setLoading(true)
            const response = await createPickUp(data)
            alert("Pickup Request Create Successful")
            history.push("/home/fromme")
        } catch (error) {
            alert(error)
        } finally {
            setLoading(false)
        }
    }

    return (
        <FormContainer>
            <div>
                {/* <Button variant="outlined" color="primary" onClick={handleClickOpen}>
                    Open form dialog
                </Button> */}
                <Dialog open={openDialog} aria-labelledby="form-dialog-title">
                    <DialogTitle id="form-dialog-title">Pickup Duplicated</DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            Are you sure you want to book pickup order again in the same day ?
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleClose} color="primary">
                            No
                        </Button>
                        <Button onClick={handleConfirm} color="primary">
                            Yes
                        </Button>
                    </DialogActions>
                </Dialog>
            </div>
            <CustomizedPaper title="Pickup Location">
                <CustomizedInputs
                    value={phone}
                    icon={IconKeys.phone}
                    label="Phone"
                    inputId="PRF_PHONE"
                    type="text"
                    onChange={e => setPhone(e.target.value)}
                    containerStyle={{ width: "75%" }}
                />
                <CustomizedInputs
                    value={userName}
                    icon={IconKeys.username}
                    label="Username"
                    inputId="PRF_USER"
                    type="text"
                    onChange={e => setUsername(e.target.value)}
                    containerStyle={{ width: "75%" }}
                />
                <CustomizedAutoCompleteBox
                    options={getCity()}
                    label="City"
                    value={city}
                    getOptionLabel={(option: cityProps) => option.name}
                    onChange={(e, value) => { setCity(value) }}
                    style={{ width: "70%" }}
                />
                <CustomizedAutoCompleteBox
                    options={getTownshipByCityId(city?.id)}
                    label="Township"
                    value={township}
                    getOptionLabel={(option: townshipProps) => option.name.slice(3)}
                    onChange={(e, value) => { setTownship(value) }}
                    style={{ width: "70%" }}
                />
                <TextareaAutosize
                    style={{ width: "70%", fontSize: 14 }}
                    aria-label="minimum height"
                    rowsMin={3}
                    value={address}
                    placeholder="Address"
                    onChange={e => setAddress(e.target.value)}
                />
                <CustomizedInputs
                    icon={IconKeys.tag}
                    label="Items"
                    value={items}
                    inputId="PRF_USER"
                    type="number"
                    onChange={e => setItems(parseInt(e.target.value))}
                    containerStyle={{ width: "75%" }}
                />
                <TextareaAutosize
                    style={{ width: "70%", fontSize: 14 }}
                    aria-label="minimum height"
                    rowsMin={3}
                    value={note}
                    placeholder="Note"
                    onChange={e => setNote(e.target.value)}
                />
            </CustomizedPaper>

            <CustomizedPaper title="Pickup Time">
                <Text style={{ margin: 4, color: Colors.THEME_SECONDARY, fontSize: 14 }}>The Pickup time is considered to our courier activity.</Text>
                <MuiPickersUtilsProvider utils={MomentUtils}>
                    <Box display="flex" flexDirection="row" alignItems="center" style={{ marginTop: 10 }}>
                        <Box flexGrow={1} flexDirection="row">
                            <DatePicker value={selectedDate} onChange={date => handleDateAndTime(date ? date : moment())} />
                        </Box>
                        <Box flexGrow={1}>
                            <TimePicker value={selectedDate} onChange={date => handleDateAndTime(date ? date : moment())} />
                        </Box>
                    </Box>
                </MuiPickersUtilsProvider>
            </CustomizedPaper>

            <CustomizedButton
                label="Submit"
                icon={IconKeys.send}
                containerStyle={{ width: "40%", marginTop: 20 }}
                onClick={() => onCheckData()}
                buttonColor={Colors.THEME_PRIMARY}
                loading={loading}
            />
        </FormContainer>
    )
}