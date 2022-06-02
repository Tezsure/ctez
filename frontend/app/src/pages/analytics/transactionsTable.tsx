import { Box, Button, ButtonGroup, ButtonProps, Container, Flex, Icon, IconButton, Table, TableContainer, Tbody, Td, Text, Th, Thead, Tr, useMediaQuery } from "@chakra-ui/react";
import { Next, PageGroup, Paginator, Previous, usePaginator } from "chakra-paginator";
import React, { useEffect, useMemo, useState } from "react";
import { GiPreviousButton } from "react-icons/gi";
import { Column } from "react-table";
import * as timeago from 'timeago.js';
import { useOvenTransactionTable } from "../../api/analytics";
import { useTableNumberUtils } from "../../hooks/useTableUtils";
import { useSortedOvensList, useThemeColors } from "../../hooks/utilHooks";
import { OvenTransactionTable } from "../../interfaces/analytics";
import { trimAddress } from "../../utils/addressUtils";
import { ReactComponent as leftIcon } from '../../assets/images/icons/left-icon.svg';
import { ReactComponent as rightIcon } from '../../assets/images/icons/right-icon.svg';




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
    const baseStyles: ButtonProps = {
        w: 7,
        fontSize: 'sm',
      };
      const activeStyles: ButtonProps = {
        ...baseStyles,
        _hover: {
          bg: 'light.text4',
        },
        bg: 'light.text4',
      };
    const outerLimit = 2;
    const innerLimit = 2;
    // graph options
    const { data: ovenTransactionTable = [] } = useOvenTransactionTable();
//    const sortedOvens = useSortedOvensList(ovenTransactionTable);
    const [currentPageOvens, setCurrentPageOvens] = useState<OvenTransactionTable[]>([]);
    const { pagesQuantity, offset, currentPage, setCurrentPage, isDisabled, pageSize } = usePaginator(
        {
          total: ovenTransactionTable?.length,
          initialState: {
            pageSize: 5,
            isDisabled: false,
            currentPage: 1,
          },
        },
      );
      
      useEffect(() => {
        const indexOfLastOven = currentPage * pageSize;
        const indexOfFirstOven = indexOfLastOven - pageSize;
        const currentTodos = ovenTransactionTable && ovenTransactionTable.slice(indexOfFirstOven, indexOfLastOven);
        setCurrentPageOvens(currentTodos);
      }, [currentPage, pageSize,ovenTransactionTable.length]);
      const handlePageChange = (nextPage: number) => {
        setCurrentPage(nextPage);
      };
      const modals = useMemo(() => {
        return (
          <>
            <Paginator
              isDisabled={isDisabled}
              innerLimit={innerLimit}
              currentPage={currentPage}
              outerLimit={outerLimit}
              pagesQuantity={pagesQuantity}
              activeStyles={activeStyles}
              normalStyles={baseStyles}
              onPageChange={handlePageChange}
            >
              <Container align="center" display='flex' justifyContent='center' gridGap={5} w="full" pt={4}>
                <Previous className="pagignationIcon">
                   <Icon
                   color="light.tradebg"
                   _hover={{ cursor: 'pointer' }}
                   as={leftIcon}
                   />
                </Previous>
                <PageGroup className="pageNavigation-center-btn" isInline align="center" />
                <Next className="pagignationIcon">

                <Icon
                   color="light.tradebg"
                   _hover={{ cursor: 'pointer' }}
                   as={rightIcon}
                   />
                </Next>
              </Container>
            </Paginator>
          </>
        );
      }, [ovenTransactionTable]);
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
   
   <TableContainer
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

    {modals}

   </Box>)
}
export default TransactionTableoven;
