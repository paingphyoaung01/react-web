import * as React from 'react'
import { AppContainer, LeftContainer, RightContainer } from '../../Standard UI/container/Container'
import { Typography, Box, Divider } from '@material-ui/core'
import { CustomizedPaper } from '../../Standard UI/paper/CustomizedPaper'
import { Icons, IconKeys } from '../../Standard UI/Icon'
import { PrintContainer } from './fromMe.ui'
import history from '../../history'
import frommeContext from '../../../context/awb.context'
import Button from '@material-ui/core/Button';
import logo from '../../res/images/ic_beexprss.jpeg'
import * as moment from 'moment'
import { Page, Text, View, Document, StyleSheet, PDFDownloadLink, Image } from '@react-pdf/renderer';

var QRCode = require('qrcode')

export function PrintOrder(props: any) {
    const [state, dispatch] = React.useContext(frommeContext)

    React.useEffect(() => {
        if (!state || !state.OrderList) history.push("/home/fromme")
    }, [])

    if (!state || !state.OrderList) return <div />
    const { OrderList } = state

    const DraftAwb = () => (
        <Document>
            {
                OrderList.map(row =>
                    <Page size="A5" style={styles.page}>
                        <View style={{ marginBottom: 8 }}>
                            <Text style={styles.fontBold}> Created Date : {moment(row.create_date).add(6.5, "hours").format('DD-MM-YYYY hh:mm:ss')}</Text>
                        </View>
                        <View style={{ flexDirection: 'row' }}>
                            <View style={{ width: "50%", alignContent: 'center', justifyContent: 'center', alignItems: 'center' }}>
                                <Image
                                    style={{ width: 120, height: 120, alignContent: 'center', justifyContent: 'center' }}
                                    src={logo}
                                />
                                <Text style={styles.fontBold}>www.beexprss.com</Text>
                                <Text style={styles.fontBold}>09 977 835553</Text>
                            </View>

                            <View style={{ width: "50%", alignContent: 'center', justifyContent: 'center', alignItems: 'center' }}>
                                <Image
                                    style={{ width: 120, height: 120, alignContent: 'center', justifyContent: 'center', alignItems: 'center' }}
                                    source={QRCode.toDataURL(row.display_name, { type: "png" })}
                                />
                                <Text style={styles.fontBold}>{row.display_name}</Text>
                            </View>
                        </View>

                        <View style={{ marginTop: 12, marginBottom: 12 }}>
                            <Text style={styles.fontNormal}> Customer Reference : {row.customer_reference}</Text>
                        </View>

                        <View style={{ flexDirection: 'row' }}>
                            <View style={{ width: "50%" }}>
                                <Text style={[styles.fontBold, { marginBottom: 4 }]}> Receiver : {row.receiver_name}</Text>
                                <Text style={[styles.fontNormal, { marginBottom: 4 }]}> {row.receiver_full_address} </Text>
                                <Text style={styles.fontNormal}> Phone : {row.receiver_mobile}</Text>
                            </View>

                            <View style={{ width: "50%" }}>
                                <Text style={[styles.fontBold, { marginBottom: 4 }]}> Sender : {row.sender_id.name}</Text>
                                <Text style={[styles.fontNormal, { marginBottom: 4 }]}>{row.sender_full_address}</Text>
                                <Text style={styles.fontNormal}>Phone : {row.sender_mobile}</Text>
                            </View>
                        </View>

                        <View style={{ backgroundColor: "grey", height: 1, marginTop: 16, marginBottom: 8 }}></View>
                        <View style={{ flexDirection: 'row' }}>
                            <View style={{ width: "33%", textAlign: 'center', alignContent: 'center', justifyContent: 'center' }}>
                                <Text style={styles.fontNormal}> Origin </Text>
                                <Text style={styles.fontBold}> {row.origin_twsp_id.name} </Text>
                            </View>

                            <View style={{ width: "33%", textAlign: 'center' }}>
                                <Text style={styles.fontNormal}> Transit </Text>
                                <Text style={styles.fontBold}> - </Text>
                            </View>

                            <View style={{ width: "33%", textAlign: 'center', alignContent: 'center', justifyContent: 'center' }}>
                                <Text style={styles.fontNormal}> Destination </Text>
                                <Text style={styles.fontBold}> {row.dest_twsp_id.name} </Text>
                            </View>
                        </View>
                        <View style={{ backgroundColor: "grey", height: 1, marginTop: 8, marginBottom: 16 }}></View>

                        <View style={{ marginTop: 8, marginBottom: 8 }}>
                            <Text style={styles.fontNormal}> Consignment : {row.weight} kg</Text>
                            <Text style={styles.fontNormal}> Service & Payment : {row.service_type_id.name} & {row.payment_type_id.name}</Text>
                            <Text style={styles.fontNormal}> Description : {row.description} </Text>
                            <Text style={styles.fontNormal}> Remark : {row.remark} </Text>
                        </View>

                        <View style={{ flexDirection: 'row' }}>
                            <View style={{ width: "50%", textAlign: 'center', alignContent: 'center', justifyContent: 'center' }}>
                                <Text style={styles.fontNormal}> COD Amount </Text>
                                <Text style={styles.fontBold}> {row.cod_amount} </Text>
                            </View>

                            <View style={{ width: "50%", textAlign: 'center' }}>
                                <Text style={styles.fontNormal}> Delivery Charge </Text>
                                <Text style={styles.fontBold}> {row.delivery_charges} </Text>
                            </View>

                            {/* <View style={{ width: "25%", textAlign: 'center', alignContent: 'center', justifyContent: 'center' }}>
                                <Text style={styles.fontNormal}> Other Cost </Text>
                                <Text style={styles.fontBold}> {row.delivery_charges} </Text>
                            </View>

                            <View style={{ width: "25%", textAlign: 'center', alignContent: 'center', justifyContent: 'center' }}>
                                <Text style={styles.fontNormal}> Cash Collect </Text>
                                <Text style={styles.fontBold}> {row.delivery_charges} </Text>
                            </View> */}
                        </View>

                        <View style={{ marginTop: 12 }}>
                            <Text style={styles.fontSmall}> *This document is created automatically by "BeeXprssonline system". For checking consignment status, please visit www.beexprss.com</Text>
                            <Text style={styles.fontSmall}> *Term and condition please check www.beexprss.com. </Text>
                        </View>
                    </Page>
                )
            }
        </Document>
    )

    const RenderItemList = () => {
        let list: Array<JSX.Element> = []
        OrderList.map((row, index) => {
            list.push(
                <PrintContainer order={row}></PrintContainer>
            )
        })
        return list
    }

    return (
        <AppContainer>
            <LeftContainer>
                <PDFDownloadLink document={<DraftAwb />} fileName={"DraftAwb" + moment().format('-DD/MM/YYYY') + ".pdf"}>
                    {({ blob, url, loading, error }) => (loading ? 'Loading document ...' : 'Download pdf')}
                </PDFDownloadLink>
                {/* <PrintContainer order={OrderList[0]}></PrintContainer> */}
                {RenderItemList()}
            </LeftContainer>
            <RightContainer />
        </AppContainer>
    )
}

const styles = StyleSheet.create({
    page: {
        padding: 32,
        justifyContent: "center",
        alignContent: "center"
    },
    section: {
        margin: 10,
        padding: 10,
        flexGrow: 1
    },
    fontBold: {
        fontSize: 11,
        fontWeight: 'bold'
    },
    fontNormal: {
        fontSize: 10,
        color: '#363636'
    },
    fontSmall: {
        fontSize: 10,
        color: 'grey'
    }
});