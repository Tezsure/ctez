import { SkeletonText, Table, TableContainer, Tbody, Td, Th, Thead, Tr, useMediaQuery } from "@chakra-ui/react";
import React from "react";
import { useCtezOven } from "../../api/analytics";
import { useThemeColors } from "../../hooks/utilHooks";
import { numberToMillionOrBillionFormate } from "../../utils/numberFormate";

const OvenTable: React.FC = () => {
    const [textcolor] = useThemeColors(['homeTxt']);
    const [textHighlight] = useThemeColors(['sideBarBg']);
    const [largerScreen] = useMediaQuery(['(min-width: 900px)']);
    const [background, imported, text4] = useThemeColors([
        'cardbg2',
        'imported',
        'text4',
    ]);
    // graph options
    const {data:overData=false}=useCtezOven()
    
    return (<TableContainer
        backgroundColor={background}
        fontSize='14px'
        borderRadius={16}
        textAlign='right'
        padding='12px'
    >
        <Table variant='simple'  >
            <Thead>
                <Tr>
                    <Th borderBottom={0} isNumeric  textAlign='left'>Total</Th>
                    <Th isNumeric borderBottom={0} textAlign='right'>Created</Th>
                    <Th isNumeric borderBottom={0} textAlign='right'>Liquidated</Th>
                    <Th isNumeric borderBottom={0} textAlign='right'>Collateral Locked</Th>
                    <Th isNumeric borderBottom={0} textAlign='right'>Total Debt</Th>
                    <Th isNumeric borderBottom={0} textAlign='right'>Collateral Ratio</Th>
                </Tr>
            </Thead>
            <Tbody >
                {overData?<Tr>
                <Td isNumeric borderBottom={0} textAlign='left'>{numberToMillionOrBillionFormate(overData.total_ovens)}</Td>
                <Td isNumeric borderBottom={0} textAlign='right'>{numberToMillionOrBillionFormate(overData.created_ovens)}</Td>
                <Td isNumeric borderBottom={0} textAlign='right'>{numberToMillionOrBillionFormate(overData.liquidated_ovens)}</Td>
                <Td isNumeric borderBottom={0} textAlign='right'>{numberToMillionOrBillionFormate(overData.collateral_locked)} tez</Td>
                <Td isNumeric borderBottom={0} textAlign='right'>{numberToMillionOrBillionFormate(overData.total_debt)} ctez</Td>
                <Td isNumeric borderBottom={0} textAlign='right'>{numberToMillionOrBillionFormate(overData.collateral_ratio)} %</Td>
                </Tr>:<Tr>
                    <Td isNumeric><SkeletonText pr={6} noOfLines={1} spacing="1" /></Td>
                    <Td isNumeric><SkeletonText pr={6} noOfLines={1} spacing="1" /></Td>
                    <Td isNumeric><SkeletonText pr={6} noOfLines={1} spacing="1" /></Td>
                    <Td isNumeric><SkeletonText pr={6} noOfLines={1} spacing="1" /></Td>
                    <Td isNumeric><SkeletonText pr={6} noOfLines={1} spacing="1" /></Td>
                    <Td isNumeric><SkeletonText pr={6} noOfLines={1} spacing="1" /></Td>
                </Tr>}
            </Tbody>
        </Table>
    </TableContainer>)
}
export default OvenTable;
