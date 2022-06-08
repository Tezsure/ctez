import { Box, Button, ButtonGroup, Flex, Text, useMediaQuery } from "@chakra-ui/react";
import React, { useState } from "react";
import { useDepositTransactionTable, useMintedTransactionTable, useOvenTransactionTable, useWithdrawTransactionTable } from "../../api/analytics";
import { useTableNumberUtils } from "../../hooks/useTableUtils";
import { useThemeColors } from "../../hooks/utilHooks";
import TableCommon, { ColData } from "./comonTable";


 enum Transactiontype {
    Mint='Mint',
    Burn='Burn',
    Deposit='Deposit',
    Withdraw='Withdraw'
}

const TransactionTableoven: React.FC = () => {
  const { positiveOrNegative, valueFormat } = useTableNumberUtils();
    const [textcolor] = useThemeColors(['homeTxt']);
    const [textHighlight] = useThemeColors(['sideBarBg']);
    const [largerScreen] = useMediaQuery(['(min-width: 900px)']);
    const [background,inputbg] = useThemeColors([
        'cardbg2',
        'inputbg',
    ]);
    const { data: mintedTransactionTable = [] } = useOvenTransactionTable();
    const { data: burnTransactionTable = [] } = useMintedTransactionTable();
    const { data: depositTransactionTable = [] } = useDepositTransactionTable();
    const { data: withdrawTransactionTable = [] } = useWithdrawTransactionTable();

    const [transactionType,setTransactionType]=useState<Transactiontype>(Transactiontype.Mint);
    const columBurn:ColData[]=[
        {
            accessor:'Burned',
            datakey:'burnAmount',
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

    const columDeposit:ColData[]=[
        {
            accessor:'Deposit',
            datakey:'amount',
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
    const columWithdraw:ColData[]=[
        {
            accessor:'Withdraw',
            datakey:'amount',
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
    const columMinted:ColData[]=[
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
        paddingY={27}
        paddingX={35}
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
            <ButtonGroup variant='ghost' textColor={textcolor} spacing='-1' gridGap={2}>
                <Button fontSize='12px' textDecoration='underline' onClick={()=>setTransactionType(Transactiontype.Mint)} className={transactionType===Transactiontype.Mint?'btnactive':''} >Mint</Button>
                <Button fontSize='12px' textDecoration='underline' onClick={()=>setTransactionType(Transactiontype.Burn)}  className={transactionType===Transactiontype.Burn?'btnactive':''}>Burn</Button>
                <Button fontSize='12px' textDecoration='underline' onClick={()=>setTransactionType(Transactiontype.Deposit)}  className={transactionType===Transactiontype.Deposit?'btnactive':''}>Deposit</Button>
                <Button fontSize='12px' textDecoration='underline' onClick={()=>setTransactionType(Transactiontype.Withdraw)}  className={transactionType===Transactiontype.Withdraw?'btnactive':''}>Withdraw</Button>
            </ButtonGroup>

        </Flex>
    {transactionType===Transactiontype.Mint && <TableCommon column={columMinted} data={mintedTransactionTable}/>}
    {transactionType===Transactiontype.Burn && <TableCommon column={columBurn} data={burnTransactionTable}/>}
    {transactionType===Transactiontype.Deposit && <TableCommon column={columDeposit} data={depositTransactionTable}/>}
    {transactionType===Transactiontype.Withdraw && <TableCommon column={columWithdraw} data={withdrawTransactionTable}/>}



   </Box>)
}
export default TransactionTableoven;
