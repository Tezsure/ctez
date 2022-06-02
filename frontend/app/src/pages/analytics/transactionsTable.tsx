import { Box, Button, ButtonGroup, ButtonProps, Container, Flex, Icon, Table, TableContainer, Tbody, Td, Text, Th, Thead, Tr, useMediaQuery } from "@chakra-ui/react";
import { Next, PageGroup, Paginator, Previous, usePaginator } from "chakra-paginator";
import React, { useEffect, useMemo, useState } from "react";
import * as timeago from 'timeago.js';
import { useOvenTransactionTable } from "../../api/analytics";
import { ReactComponent as leftIcon } from '../../assets/images/icons/left-icon.svg';
import { ReactComponent as rightIcon } from '../../assets/images/icons/right-icon.svg';
import { useTableNumberUtils } from "../../hooks/useTableUtils";
import { useThemeColors } from "../../hooks/utilHooks";
import { OvenTransactionTable } from "../../interfaces/analytics";
import { trimAddress } from "../../utils/addressUtils";
import TableCommon, { ColData } from "./comonTable";




const TransactionTableoven: React.FC = () => {
  const { positiveOrNegative, valueFormat } = useTableNumberUtils();
    const [textcolor] = useThemeColors(['homeTxt']);
    const [textHighlight] = useThemeColors(['sideBarBg']);
    const [largerScreen] = useMediaQuery(['(min-width: 900px)']);
    const [background, imported, text4] = useThemeColors([
        'cardbg',
        'imported',
        'text4',
    ]);
    const { data: ovenTransactionTable = [] } = useOvenTransactionTable();
    const colum:ColData[]=[
        {
            accessor:'Minted',
            datakey:'mintAmount',
            isCtez:true,
        },
        {
            accessor:'Target',
            datakey:'target' 
        },
        {
            accessor:'Oven',
            datakey:'ovenAddress',
            istrimAddress:true,
        },
        {
            accessor:'Account',
            datakey:'address',
            istrimAddress:true,
        },
        {
            accessor:'Time',
            datakey:'timestamp',
            isTimeformat:true
        } 

    ]

    return (<Box
        backgroundColor={background}
        fontSize='14px'
        borderRadius={16}

        paddingY={35}
        paddingX={25}
    >
        <Flex justifyContent='space-between' wrap='wrap'>
            <Text
                color={textcolor}
                fontSize={largerScreen ? '20px' : '16px'}
                lineHeight="29px"
                fontWeight={600}
            >
                Transactions
            </Text>
            <ButtonGroup variant='ghost' textColor={textcolor} spacing='-1'>
                <Button fontSize='12px' textDecoration='underline'>Mint</Button>
                <Button fontSize='12px' textDecoration='underline' >Burn</Button>
                <Button fontSize='12px' textDecoration='underline'>Deposit</Button>
                <Button fontSize='12px' textDecoration='underline'>Withdraw</Button>
            </ButtonGroup>

        </Flex>
         {/* <TableNew/> */}
        {/* <Table columns={columns} data={ovenTransactionTable}/> */}
   
   {/* <TableContainer
      textAlign='center'
   >
       <Table variant='simple'>
           <Thead>
               <Tr>
                   <Th  textAlign='left'>Minted</Th>
                   <Th >Target</Th>
                   <Th >Oven</Th>
                   <Th >Account</Th>
                   <Th isNumeric>Time</Th>
               </Tr>
           </Thead>
           <Tbody>
               {console.log('currentPageOvens',currentPageOvens)}
               { currentPageOvens.map((data,index)=>{

                  return(<Tr key={data.address+index}>
                    <Td  textAlign='left'>{data.mintAmount} CETZ</Td>
                    <Td >{data.target}</Td>
                    <Td >{trimAddress(data.ovenAddress)}</Td>
                    <Td >{trimAddress(data.address)}</Td>
                    <Td isNumeric>{timeago.format(data.timestamp)} </Td>
                </Tr>)
               })}
               
           </Tbody>
       </Table>
   </TableContainer>

    {modals} */}
    
    <TableCommon column={colum} data={ovenTransactionTable}/>

   </Box>)
}
export default TransactionTableoven;
