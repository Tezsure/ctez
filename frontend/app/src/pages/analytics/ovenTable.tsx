import { SkeletonText, Table, TableContainer, Tbody, Td, Th, Thead, Tr, useMediaQuery } from "@chakra-ui/react";
import React from "react";
import { useCtezOven } from "../../api/analytics";
import { useThemeColors } from "../../hooks/utilHooks";

const OvenTable: React.FC = () => {
    const [textcolor] = useThemeColors(['homeTxt']);
    const [textHighlight] = useThemeColors(['sideBarBg']);
    const [largerScreen] = useMediaQuery(['(min-width: 900px)']);
    const [background, imported, text4] = useThemeColors([
        'cardbg',
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
    >
        <Table variant='simple'>
            <Thead>
                <Tr>
                    <Th isNumeric>Total</Th>
                    <Th isNumeric>Created</Th>
                    <Th isNumeric>Liquidated</Th>
                    <Th isNumeric>TVL</Th>
                    <Th isNumeric>Total Supply</Th>
                    <Th isNumeric>Collateral Supply</Th>
                </Tr>
            </Thead>
            <Tbody>
                {overData?<Tr>
                    <Td isNumeric>{overData.total_ovens}</Td>
                    <Td isNumeric>{overData.created_ovens}</Td>
                    <Td isNumeric>{overData.liquidated_ovens}</Td>
                    <Td isNumeric>{overData.TVL}</Td>
                    <Td isNumeric>{overData.total_supply}</Td>
                    <Td isNumeric>{overData.collateral_supply}</Td>
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
