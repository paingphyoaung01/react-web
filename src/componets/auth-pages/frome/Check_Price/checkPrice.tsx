import * as React from 'react'
import { FormContainer } from '../../../Standard UI/container/Container'
import { CustomizedPaper } from '../../../Standard UI/paper/CustomizedPaper'
import { CustomizedAutoCompleteBox, CustomizedInputs } from '../../../Standard UI/Input/CustomizedInputs'
import { getCity, cityProps, getTownship, townshipProps, getTownshipByCityId } from '../../../../lib/storage/CityAndTownship'
import { Box, FormControlLabel, Radio, Typography } from '@material-ui/core'
import { IconKeys, Icons } from '../../../Standard UI/Icon'
import { CustomizedButton } from '../../../Standard UI/button/CustomizedButton'
import { COLORS, Colors, IconColor } from '../../../res/color'
import { getDeliveryCharges } from '../../../../lib/api'
import authContext from '../../../../context/Api.context'

export function CheckPrice(){
    
    const [state,dispatch] = React.useContext(authContext)
    const [OriginCity, setOriginCity] = React.useState<cityProps|null>(null);
    const [originTownship, setOriginTownship] = React.useState<townshipProps |null>(null);

    const [destinationCity, setDestinationCity] = React.useState<cityProps|undefined|null>(null);
    const [destinationTownship, setDestinationTownship] = React.useState<townshipProps | undefined|null>(null);

    const [weight,setWeight] = React.useState(1)


    const [selectedServiceTypes, setselectedServiceTypes] = React.useState<"Door to Door"|"Door to Point"|"Door to Car Gate"|string>("Door to Door");
    const handleChangeServiceTypes = (event: React.ChangeEvent<HTMLInputElement>) => {
        setselectedServiceTypes(event.target.value);
    };

    const [response,setResponse] = React.useState<any>()

    const onCalculate = async () =>{
        if(!originTownship || !originTownship.id){
            alert("Invalid Original City or Township")
            return
        }
        if(!destinationTownship || !destinationTownship.id){
            alert("Invalid Original City or Township")
            return
        }
        if(!state.user_data || !state.user_data.id || !state.service_type) return

        const getServiceId =() =>{
            if(!state.service_type) return 0
            const service = state.service_type.find(service=>service.name == selectedServiceTypes)
            if(service&&service.id) return service.id
            return 0
        }

        try {
            const response = await getDeliveryCharges({
                origin_twsp_id:originTownship.id,
                service_type_id:  getServiceId(),
                dest_twsp_id:destinationTownship.id,
                uid: state.user_data.id,
                weight: weight
                
            })
            if(!response.success){
                alert("Unsuccessful")
                setResponse({})
                return
            }
            setResponse(response)

        } catch (error) {
            alert(error.message)
        }

    }

    return(
        <FormContainer>
            <CustomizedPaper title="Check Price">
                <Box flexDirection="row" display="flex">
                    <Box flexGrow={1} style={{marginRight: 8}}>
                        <CustomizedAutoCompleteBox 
                            options={getCity()}
                            getOptionLabel={(option:cityProps)=>option.name}
                            label="Origin City"
                            onChange={(e,value)=>setOriginCity(value)}
                        />
                    </Box>
                    <Box flexGrow={1} style={{marginLeft: 8}}>
                    {
                        (OriginCity && OriginCity.id) && 
                        <CustomizedAutoCompleteBox 
                            options={getTownshipByCityId(OriginCity.id)}
                            getOptionLabel={(option:townshipProps)=>option.name.slice(3)}
                            label="Origin Township"
                            onChange={(e,value)=>setOriginTownship(value)}
                        />
                    }
                    </Box>
                </Box>
                <Box flexDirection="row" display="flex">
                    <Box flexGrow={1} style={{marginRight: 8}}>
                        <CustomizedAutoCompleteBox 
                            options={getCity()}
                            getOptionLabel={(option:cityProps)=>option.name}
                            label="Destination City"
                            onChange={(e,value)=>setDestinationCity(value)}
                        />
                    </Box>
                    <Box flexGrow={1} style={{marginLeft: 8}}>
                        {
                            (destinationCity && destinationCity.id) && 
                            <CustomizedAutoCompleteBox 
                                options={getTownshipByCityId(destinationCity.id)}
                                getOptionLabel={(option:townshipProps)=>option.name.slice(3)}
                                label="Destination Township"
                                onChange={(e,value)=>setDestinationTownship(value)}
                            />
                        }
                    </Box>
                </Box>

                <Box display="flex" flexDirection="row" alignItems="center" style={{marginTop:4}}>
                    <Box flexGrow={1}>
                        <FormControlLabel value="parcel" control={
                            <Radio
                                checked={selectedServiceTypes === "Door to Door"}
                                onChange={handleChangeServiceTypes}
                                value="Door to Door"
                                name="radio-button-demo"
                                inputProps={{ 'aria-label': 'Door To Door' }}
                            />
                        } label="Door to Door" />
                    </Box>
                    <Box flexGrow={1}>
                        <FormControlLabel value="Door to Point" control={
                            <Radio
                                checked={selectedServiceTypes === "Door to Point"}
                                onChange={handleChangeServiceTypes}
                                value="Door to Point"
                                name="radio-button-demo"
                                inputProps={{ 'aria-label': 'Door to Point' }}
                            />
                        } label="Door to Point" />
                    </Box>
                    <Box flexGrow={1}>
                        <FormControlLabel value="Door to Car Gate" control={
                            <Radio
                                checked={selectedServiceTypes === "Door to Car Gate"}
                                onChange={handleChangeServiceTypes}
                                value="Door to Car Gate"
                                name="radio-button-demo"
                                inputProps={{ 'aria-label': 'Door to Car Gate' }}
                            />
                        } label="Door to Car Gate" />
                    </Box>
                </Box>


                <CustomizedInputs 
                    value={weight}
                    icon={IconKeys.weight}
                    label="Weight"
                    inputId="CPWeight"
                    type="number"
                    onChange={e=>setWeight(parseFloat(e.target.value))}
                    endAdornment="KG"
                />

                <CustomizedButton 
                    icon={IconKeys.quote}
                    label="Calculate"
                    onClick={()=>onCalculate()}
                    buttonColor={Colors.THEME_PRIMARY}
                    color={IconColor.THEME_SECONDARY}
                />

            </CustomizedPaper>

            <CustomizedPaper title="Delivery Charge">
                <Typography>Regular : <b>{ response && response.priority_charges ? response.priority_charges : 0} MMK </b></Typography>
                <Typography>Priority : <b>{response && response.regular_charges ? response.regular_charges : 0} MMK</b></Typography>
                { response && <Typography style={{marginTop: 12, color: COLORS.THEME_DARK}}><Icons name={IconKeys.about} size={14} style={{color: COLORS.THEME_DARK}}/><b> Pricing Note </b></Typography> }
                { response && <Typography> { response.pricing_note } </Typography> }
            </CustomizedPaper>

        </FormContainer>
    )
}