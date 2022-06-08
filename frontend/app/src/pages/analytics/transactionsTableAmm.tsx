import { Box, Button, ButtonGroup, Flex, Text, useMediaQuery } from "@chakra-ui/react";
import React, { useState } from "react";
import { useAddLiquidityTransactionTable, useDepositTransactionTable, useMintedTransactionTable, useOvenTransactionTable, useRemoveLiquidityTransactionTable, useSwapTransactionTable, useWithdrawTransactionTable } from "../../api/analytics";
import { useTableNumberUtils } from "../../hooks/useTableUtils";
import { useThemeColors } from "../../hooks/utilHooks";
import TableCommon, { ColData } from "./comonTable";


 enum Transactiontype {
    Swaps='Swaps',
    Adds='Adds',
    Removes='Removes',
}

const TransactionTableAMM: React.FC = () => {
  const { positiveOrNegative, valueFormat } = useTableNumberUtils();
    const [textcolor] = useThemeColors(['homeTxt']);
    const [textHighlight] = useThemeColors(['sideBarBg']);
    const [largerScreen] = useMediaQuery(['(min-width: 900px)']);
    const [background, imported, text4] = useThemeColors([
        'cardbg2',
        'imported',
        'text4',
    ]);
    const { data: swapTranscation = [] } = useSwapTransactionTable();
    const { data: addTranscation = [] } = useAddLiquidityTransactionTable();
    const { data: removeTranscation = [] } = useRemoveLiquidityTransactionTable();

    const [transactionType,setTransactionType]=useState<Transactiontype>(Transactiontype.Swaps);
    const columSwap:ColData[]=[
        {
            accessor:'Description',
            datakey:'description',
            isDecription:true,
        },
        {
            accessor:'Amount',
            datakey:'tezQty',
            isTez:true,
        },
        {
            accessor:'Amount',
            datakey:'tokenQty',
            isCtez2:true,
        },
        {
            accessor:'Account',
            datakey:'trader',
            istrimAddress:true,
        },
        {
            accessor:'Time',
            datakey:'timestamp',
            isTimeformat:true
        } 

    ]
    const columAdds:ColData[]=[
        {
            accessor:'Description',
            datakey:'description',
            isDecriptionAdd:true,
        },
        {
            accessor:'Amount',
            datakey:'quantityTk1',
            isTez:true,
        },
        {
            accessor:'Amount',
            datakey:'quantityTk2',
            isCtez2:true,
        },
        {
            accessor:'Account',
            datakey:'trader',
            istrimAddress:true,
        },
        {
            accessor:'Time',
            datakey:'timestamp',
            isTimeformat:true
        } 

    ]

    const columRemoves:ColData[]=[
        {
            accessor:'Description',
            datakey:'description',
            isDecriptionRemove:true,
        },
        {
            accessor:'Amount',
            datakey:'quantityTk1',
            isTez:true,
        },
        {
            accessor:'Amount',
            datakey:'quantityTk2',
            isCtez2:true,
        },
        {
            accessor:'Account',
            datakey:'trader',
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
                <Button fontSize='12px' textDecoration='underline' onClick={()=>setTransactionType(Transactiontype.Swaps)} className={transactionType===Transactiontype.Swaps?'btnactive':''} >Swaps</Button>
                <Button fontSize='12px' textDecoration='underline' onClick={()=>setTransactionType(Transactiontype.Adds)}  className={transactionType===Transactiontype.Adds?'btnactive':''}>Adds</Button>
                <Button fontSize='12px' textDecoration='underline' onClick={()=>setTransactionType(Transactiontype.Removes)}  className={transactionType===Transactiontype.Removes?'btnactive':''}>Removes</Button>
            </ButtonGroup>

        </Flex>
    {transactionType===Transactiontype.Swaps && <TableCommon column={columSwap} data={swapTranscation}/>}
    {transactionType===Transactiontype.Adds && <TableCommon column={columAdds} data={addTranscation}/>}
    {transactionType===Transactiontype.Removes && <TableCommon column={columRemoves} data={removeTranscation}/>}


   </Box>)
}
export default TransactionTableAMM;
