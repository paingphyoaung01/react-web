import * as React from 'react'
import { FormContainer } from '../../Standard UI/container/Container'
import { CustomizedPaper } from '../../Standard UI/paper/CustomizedPaper'
import { Box, Typography } from '@material-ui/core'
import { IconKeys, Icons } from '../../Standard UI/Icon'
import authContext from '../../../context/Api.context'
import {Text} from '../../Standard UI/Text/Text'

const style = {
    context:{
        margin:8
    },
    title:{
        marginTop:50,
        padding: 4, 
        fontWeight: 'bold' as 'bold',
        fontSize: 16
    }

}

export function TermsAndConditions(){

    const [state] = React.useContext(authContext)
    return(
        <FormContainer>
            <CustomizedPaper>
                {/* <Text style={{margin: 4,fontWeight: "bold", textAlign: "center", fontSize: 16}}>Shipping Terms and Conditions - BeeXprss</Text>
                <Text style={{margin: 4}}>When shipper handed over his/her goods or documents in which to be delivered by BeeXprss (as defined below), every Shipper assumed to be agrees this Shipping Terms and Condition below:</Text>
                <Text style={style.title}>1. BeeXprss including all BeeXprss agents which has been placed and registered based on their agreement with BeeXprss.</Text>
                <Text style={style.title}>2. General Condition</Text>
                <Text style={style.context}>a. Every transaction which is done by BeeXprss is based on terms and conditions which is stated on this shipping terms and conditions.</Text>
                <Text style={style.context}>b. Shipping Terms and Condition is a basic requirement which bind all parties and become part of any other written agreement.</Text>
                <Text style={style.context}> c. BeeXprss cannot being bonded by other agreement which is written in this Shipping Terms and Condition except agreed by signed by the BeeXprss authorized person who act on behalf of BeeXprss.</Text>
                <Text style={style.title}>3. Shipment Procedure</Text>
                <Text style={style.context}>a. BeeXprss is not a public transportation and will only deliver goods and documents as per this terms and condition. BeeXprss has right to reject for delivery any goods or documents based on BeeXprss’s policy.</Text>
                <Text style={style.context}>b. BeeXprss has right to deliver Shipper’s goods or documents using any transportation mode or any transportation company and using handling process, warehousing, and transportation mode which are proper and fit based on BeeXprss’s policy.</Text>
                <Text style={style.context}>c. Goods and document’s packaging for delivery is responsibility of Shipper including arrangement goods and documents inside a container which may supplied by BeeXprss.</Text>
                <Text style={style.context}>d. BeeXprss has no responsibility of damage or missing of the goods or document of part of it which is caused by improper packaging by Shipper. </Text>
                <Text style={style.context}>e. Shipper has responsibility to give detail address of destination, declare type of goods or and documents so it can be delivered in right way.</Text>
                <Text style={style.context}>f. BeeXprss has no responsibility for the delay, damage, missing, or other cost needed that caused negligence or failure of Shipper. </Text>
                <Text style={style.title}>4. Shipment Checking</Text>
                <Text style={style.context}>a. BeeXprss have right but not obligate to check goods or documents which is shipped to make sure that the goods and documents is proper to be transported to destination city as per operational standard, Customs process, and delivery method of BeeXprss.</Text>
                <Text style={style.context}>b. BeeXprss in doing the delivery process is not guarantee and declare that all shipments is proper for transportation process without violating law which is valid in all origin, destination or be passed cities.</Text>
                <Text style={style.context}>c. BeeXprss has no responsibility to the shipment which is wrong declared or unclear declared by Shipper.</Text>
                <Text style={style.context}>d. BeeXprss about fines, damage, or loss as goods or documents in Custom or other authorized unit. Shipper agree to release BeeXprss from the responsibility of those fines or loss or damage.</Text>
                <Text style={style.title}>5. Prohibited items</Text>
                <Text style={style.context}>a. BeeXprss does not receive dangerous goods which is easy to explode or fired, prohibited drugs, gold and silver, dash, notes, coins, cyanide, platinum, and precious stone or metals, stamps, stolen goods, money order, traveler’s check, securities, antique goods, painting, live plant or animal.</Text>
                <Text style={style.context}>b. If the Shipper send the goods without inform to BeeXprss, Shipper agree to release BeeXprss about the responsibility impact of claim or damage, or cost that may be expense or sue from other parties for impact of this condition including right which is ruled in clause 4.a.</Text>
                <Text style={style.context}>c. BeeXprss has right to do actions which is needed after BeeXprss knowledgeable about the violence of this rule including to do right which is ruled in clause 4.a</Text>
                <Text style={style.title}>6. Shipment Ownership Guarantee </Text>
                <Text style={style.context}>a. Shipper agree to guarantee that shipper is the legal owner and has right for the goods and documents which is handed over to BeeXprss and Shipper agree to be bonded with this Shipping Terms and Condition.</Text>
                <Text style={style.context}>b. Shipper agree to release BeeXprss from sue from any parties and from all damage and/or other cost if any violences.</Text>
                <Text style={style.title}>7. Tariff</Text>
                <Text style={style.context}>a. BeeXprss will charge based on the listed tariff which is informed to Shipper from time to time to deliver Shipper’s goods and documents which is approved between BeeXprss and respective Shipper</Text>
                <Text style={style.context}>b. Tariff provided is include tax, airport tax, but exclude duty, import retribution or deposit related to goods and documents.</Text>
                <Text style={style.title}>8. Indemnity</Text>
                <Text style={style.context}>a. BeeXprss only has responsibility to replace Shipper’s costs impact of damage or loss of the delivery process by BeeXprss as long as the costs is happen when the goods and documents is in BeeXprss handling, with notes that the damage or loss is happen because of negligence of employee or BeeXprss’s agents.</Text>
                <Text style={style.context}>b. BeeXprss has no responsibility for Consequences or indirect losses which is happen as per above rule, which is costs including and not limited to commercial loss, finance of other indirect loss, including loss which is happen out of BeeXprss control or loss caused by natural disaster or force majeure.</Text>
                <Text style={style.context}>c. The Highest reliability as per clause 8.a above is not more than 10 times of delivery charge or equivalent. The amount of the liability is determined as per value of goods and documents at the time of delivery process without counting on commercial values of consequences loss as per stated on clause 8.b.</Text>
                <Text style={style.title}>9. Claim Procedure </Text>
                <Text style={style.context}>a. Every claim from Shipper related to BeeXprss’s responsibility should be stated in written and receiver by BeeXprss office maximum 14 days after goods and documents should be received in destination.</Text>
                <Text style={style.context}>b. Claim cannot be deducted from BeeXprss’s invoice.</Text>
                <Text style={style.title}>10. Others</Text>
                <Text style={style.context}>BeeXprss is not a transportation company which is subjected to Warsaw Conference 1929. On behalf of Shipper, without reducing the Shipper’s right, BeeXprss can claim any compensation from transportation company.</Text> */}

                <Text style={{fontWeight: "bold", textAlign: "center", fontSize: 16, marginBottom: 16}}>Shipping Terms and Conditions</Text>
                <Text style={{margin: 4}}>When shipper handed over his/her goods or documents in which to be delivered by BeeXprss (as defined below), every Shipper assumed to be agrees this Shipping Terms and Condition below:  </Text>
                <Text style={style.title}>1. BeeXprss including all BeeXprss agents which has been placed and registered based on their agreement with BeeXprss.</Text>
                <Text style={style.title}>2. General Condition</Text>
                <Text style={style.context}>a. Every transaction which is done by BeeXprss is based on terms and conditions which is stated on this shipping terms and conditions.</Text>
                <Text style={style.context}>b. Shipping Terms and Condition is a basic requirement which bind all parties and become part of any other written agreement.</Text>
                <Text style={style.context}>c. BeeXprss cannot being bonded by other agreement which is written in this Shipping Terms and Condition except agreed by signed by the BeeXprss authorized person who act on behalf of BeeXprss.</Text>
                <Text style={style.context}>d. BeeXprss will define as you understand the following conditions very well since the product launch.</Text>
                <Text style={style.title}>3. Shipment Procedure</Text>
                <Text style={style.context}>a. BeeXprss is not a public transportation and will only deliver goods and documents as per this terms and condition. BeeXprss has right to reject for delivery any goods or documents based on BeeXprss’s policy.</Text>
                <Text style={style.context}>b. BeeXprss has right to deliver Shipper’s goods or documents using any transportation mode or any transportation company and using handling process,  warehousing, and transportation mode which are proper and fit based on BeeXprss’s policy.</Text>
                <Text style={style.context}>c. Goods and document’s packaging for delivery is responsibility of Shipper including arrangement goods and documents inside a container which may supplied by BeeXprss.</Text>
                <Text style={style.context}>d. BeeXprss has no responsibility of damage or missing of the goods or document of part of it which is caused by improper packaging by Shipper.</Text>
                <Text style={style.context}>e. Shipper has responsibility to give detail address of destination, declare type of goods or and documents so it can be delivered in right way.</Text>
                <Text style={style.context}>f. BeeXprss has no responsibility for the delay, damage, missing, or other cost needed that caused negligence or failure of Shipper.</Text>
                <Text style={style.context}>g. If the receiver is not at home or may have other reasons then BeeXprss will give delivery service at least 3 times. If BeeXprss need to send the parcel extra 3 times then the sender have to give delivery charges again.</Text>
                <Text style={style.context}>h. BeeXprss will calculate for a very light parcel (or) under weight of 3 kg at 1 volume by the volume matrix. (Volume=Length × Width × High)</Text>
                <Text style={style.context}>i. If shipper want to track the condition of parcel then you can visit and search in our website <a href="http://beexprss.com/">(www.beexprss.com)</a> by using the AWB number.</Text>
                <Text style={style.context}>j. The receiver should sign only after took and checked the parcel. So BeeXprss will define as receiver received the parcel smoothly.</Text>
                <Text style={style.title}>4. Shipment Checking</Text>
                <Text style={style.context}>a. BeeXprss have right but not obligate to check goods or documents which is shipped to make sure that the goods and documents is proper to be transported to  destination city as per operational standard, Customs process, and delivery method of BeeXprss.</Text>
                <Text style={style.context}>b. BeeXprss in doing the delivery process is not guarantee and declare that all shipments is proper for transportation process without violating law which is valid in  all origin, destination or be passed cities.</Text>
                <Text style={style.context}>c. BeeXprss has no responsibility to the shipment which is wrong declared or unclear declared by Shipper.</Text>
                <Text style={style.context}>d. BeeXprss about fines, damage, or loss as goods or documents in Custom or other authorized unit. Shipper agree to release BeeXprss from the responsibility of those fines or loss or damage.</Text>
                <Text style={style.title}>5. Prohibited items</Text>
                <Text style={style.context}>a. BeeXprss does not receive dangerous goods which is easy to explode or fired, prohibited drugs, gold and silver, dash, notes, coins, cyanide, platinum, and precious stone or metals, stamps, stolen goods, money order, traveler’s check, securities, antique goods, painting, live plant or animal.</Text>
                <Text style={style.context}>b. If the Shipper send the goods without inform to BeeXprss, Shipper agree to release BeeXprss about the responsibility impact of claim or damage, or cost that  may be expense or sue from other parties for impact of this condition including right which is ruled in clause 4.a.</Text>
                <Text style={style.context}>c. BeeXprss has right to do actions which is needed after BeeXprss knowledgeable about the violence of this rule including to do right which is ruled in clause 4.a</Text>
                <Text style={style.title}>6. Shipment Ownership Guarantee</Text>
                <Text style={style.context}>a. Shipper agree to guarantee that shipper is the legal owner and has right for the goods and documents which is handed over to BeeXprss and Shipper agree to be  bonded with this Shipping Terms and Condition.</Text>
                <Text style={style.context}>b. Shipper agree to release BeeXprss from sue from any parties and from all damage and/or other cost if any violences.</Text>
                <Text style={style.title}>7. Tariff</Text>
                <Text style={style.context}>a. BeeXprss will charge based on the listed tariff which is informed to Shipper from time to time to deliver Shipper’s goods and documents which is approved between BeeXprss and respective Shipper.</Text>
                <Text style={style.context}>b. Tariff provided is include tax, airport tax, but exclude duty, import retribution or deposit related to goods and documents.</Text>
                <Text style={style.title}>8. Indemnity</Text>
                <Text style={style.context}>a. BeeXprss only has responsibility to replace Shipper’s costs impact of damage or loss of the delivery process by BeeXprss as long as the costs is happen when the  goods and documents is in BeeXprss handling, with notes that the damage or loss is happen because of negligence of employee or BeeXprss’s agents.</Text>
                <Text style={style.context}>b. BeeXprss has no responsibility for Consequences or indirect losses which is happen as per above rule, which is costs including and not limited to commercial loss,  finance of other indirect loss, including loss which is happen out of BeeXprss control or loss caused by natural disaster or force majeure.</Text>
                <Text style={style.context}>c. The Highest reliability as per clause 8.a above is not more than 10 times of delivery charge or equivalent. The amount of the liability is determined as per value of goods and documents at the time of delivery process without counting on commercial values of consequences loss as per stated on clause 8.b.</Text>
                <Text style={style.title}>9. Claim Procedure</Text>
                <Text style={style.context}>a. Every claim from Shipper related to BeeXprss’s responsibility should be stated in written and receiver by BeeXprss office maximum 14 days after goods and documents should be received in destination.</Text>
                <Text style={style.context}>b. Claim cannot be deducted from BeeXprss’s invoice.</Text>
                <Text style={style.title}>10. COD (Cash on Delivery)</Text>
                <Text style={style.context}>a. For Yangon Area 1 &amp; 2, if the cash is under 200,000 MMK then BeeXprss will give service free. If the cash is above 200,000 MMK for one parcel then we will collect money 0.5% as the service charges.</Text>
                <Text style={style.context}>b. When BeeXprss transfer the COD (cash on delivery), sender have to pay the bank charges.</Text>
                <Text style={style.context}>c. For Myanmar Post &amp; Agent (out of Yangon), BeeXprss will collect 500 MMK (service charges)+Bank charges for the parcel of under 200,000 MMK.</Text>
                <Text style={style.context}>d. For Myanmar Post &amp; Agent (out of Yangon), BeeXprss will collect 0.5% (service charges)+Bank charges for the parcel of above 200,000 MMK.</Text>
                <Text style={style.title}>11. Others</Text>
                <Text style={style.context}>a. BeeXprss is not a transportation company which is subjected to Warsaw Conference 1929. On behalf of Shipper, without reducing the Shipper’s right, BeeXprss can claim any compensation from transportation company.</Text>
                <Text style={{margin: 4, textAlign: "center"}}>----------------------------------------------------------------------------------------</Text>
                <Text style={style.title}>Software Terms of Service</Text>
                <Text style={style.context}>•	Devices and Software: You must provide certain devices, software, and data connections to use our services. For as long as you use our services, you consent to retrieve updated information about your activities or from us.</Text>
                <Text style={style.context}>•	Registration: You must register for our services using accurate data including address, provide your mobile phone number, and if you want to change it, contact us to update. You agree to receive text messages or phone calls from us with codes to register for our services.</Text>
                <Text style={style.context}>•	Data Policy: Your mobile phone number and information will be recorded in our system after you registered the app. Your receiver mobile phone number and others information will also be recorded in our system based on your using app function. You must access counting your data information and activities to make changes updated information from us, or for rewards, rating or other discount features.</Text>
                <Text style={style.context}>•	Acceptable Use: You must access and use our services only for legal, authorized, and acceptable purposes. You will not use or assist others in using our services in ways that: violate, misappropriate, or infringe the rights of BeeXprss. You must not use or assist others to access, use, copy, adapt, modify, prepare derivative works based upon distribute, transfer, display, perform, or otherwise exploit our services in impermissible or unauthorized manners, or in ways that impair, or harm us our services, systems, our users, or others, including that you must not directly or through automated means: (1) reverse engineer, modify, create derivative works from, decompile, or extract code from our services; (2) send, store, or transmit viruses or other harmful computer code through or onto our services; (3) gain or attempt to gain unauthorized access to our services or systems; (4) create accounts for our services through unauthorized or automated means; (5) collect the information of or about our users in any impermissible or unauthorized manner; (6) sell resell, rent, or charge for our services.</Text>
                <Text style={style.context}>•	Rights: We own all copyrights, trademarks, domains, logos, and other intellectual property rights associated with our services. You may not use our copyrights, trademarks, domains, logos, and other intellectual property rights unless you have our permission and except in accordance.</Text>
                <Text style={style.title}>How it works</Text>
                <Text style={style.context}>•	First, register with your mobile phone number and fill the requested information including address.  Then, you can start use ours app. Our app is working based on your mobile phone number to show all of the delivery transactions and activities. If you want to change your mobile phone number, please contact us.</Text>
                <Text style={style.context}>•	If you are our customer since beginning, we have your mobile phone number already recorded in our system. You can start register with this existing number, and then all of your activities will be shown.</Text>
                <Text style={style.context}> For more info:<a href="http://beexprss.com/#ContactUs">http://beexprss.com/#ContactUs</a></Text>
                <Text style={style.title}>Features</Text>
                <Text style={style.context}>•	Home screen shows total number of outgoing and incoming shipment, number of pickup order.</Text>
                <Text style={style.context}>•	To Me screen shows list of shipment (called AWB) list that are delivery to us with shipment information and real time status. In here, you can track the delivery status if you have our AWB number. And also you can modify new received date and address.</Text>
                <Text style={style.context}>•	From Me screen shows list of AWB that are delivery from us with shipment information and real time status. In here, you can check price of delivery and order to pick-up by filling in the requested pick-up form with details address. You can also make draft shipment order to send to your receivers. After you made draft shipment order (draft AWB), you also need to make pick-up order, then our courier will come and pick-up your shipment.</Text>
                <Text style={style.context}>•	History screen shows list of outgoing and incoming AWB with the status of cash on delivery (COD) and Delivery charges to get or to pay based on the payment type of shipments.</Text>
                <Text style={style.title}>Notice</Text>
                <Text style={style.context}>•	Your mobile phone number and information will be recorded in our system after you registered the app.</Text>
                <Text style={style.context}>•	Your receiver mobile phone number and information will also be recorded in our system after you made the draft shipment order (draft AWB).</Text>
                <Text style={style.context}>•	You can learn our terms and condition about delivery operation at: <a href="http://beexprss.com/#TandC">http://beexprss.com/#TandC</a></Text>
                
            </CustomizedPaper>
        </FormContainer>
    )
} 