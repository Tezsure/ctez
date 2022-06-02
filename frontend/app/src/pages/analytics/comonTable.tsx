import { Box, Button, ButtonGroup, ButtonProps, Container, Flex, Icon, Table, TableContainer, Tbody, Td, Text, Th, Thead, Tr, useMediaQuery } from "@chakra-ui/react";
import { Next, PageGroup, Paginator, Previous, usePaginator } from "chakra-paginator";
import React, { useEffect, useMemo, useState } from "react";
import * as timeago from 'timeago.js';
import { useOvenTransactionTable } from "../../api/analytics";
import { ReactComponent as leftIcon } from '../../assets/images/icons/left-icon.svg';
import { ReactComponent as rightIcon } from '../../assets/images/icons/right-icon.svg';
import { ReactComponent as linkLight } from '../../assets/images/icons/link-light.svg';
import { useTableNumberUtils } from "../../hooks/useTableUtils";
import { useThemeColors } from "../../hooks/utilHooks";
import { OvenTransactionTable } from "../../interfaces/analytics";
import { trimAddress } from "../../utils/addressUtils";

interface CommonTable {
  column:ColData[]
  data:Array<any>
}
export interface ColData{
  datakey:string,
  istrimAddress?:boolean,
  isTimeformat?:boolean,
  isCtez?:boolean,
  accessor:string,
}

const TableCommon: React.FC<CommonTable> = ({column,data=[]}) => {
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
    const ovenTransactionTable  = data;
    const [currentPageOvens, setCurrentPageOvens] = useState<any>([]);
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
    return (
    <Box>
   <TableContainer
      textAlign='center'
   >
       <Table variant='simple'>
           <Thead>
               <Tr>
               {column.map((coldata,mainkey)=>{
                 if(mainkey===0)
                   return <Th key={`coldataaccessor${mainkey}`} textAlign='left' >{coldata.accessor}</Th>;
                 return <Th key={`coldataaccessor${mainkey}`}   >{coldata.accessor}</Th>;  
               })}
               </Tr>
           </Thead>
           <Tbody>
               {console.log('currentPageOvens',currentPageOvens)}
               { currentPageOvens.map((pagedata:any,index:number)=>{

                  return(
                    <Tr key={pagedata.address+index}>
                    {column.map((coldata,mainkey)=>{
                       const {datakey,istrimAddress,isTimeformat,isCtez}= coldata;
                       if(isTimeformat)
                         return <Td key={pagedata.address+index+mainkey}>{timeago.format(pagedata[datakey])}</Td>;
                       if(isCtez)
                         return <Td key={pagedata.address+index+mainkey} textAlign='left'>{pagedata[datakey]} CETZ</Td>;
                       if(istrimAddress)
                         return (<Td  key={pagedata.address+index+mainkey} >
                          <div className="addresslinktd">
                          {
                          trimAddress(pagedata[datakey])
                          }<a 
                          href={`https://better-call.dev/mainnet/${pagedata[datakey]}`}
                          rel="noreferrer"
                          target="_blank">
                           <Icon
                            color="light.tradebg"
                            _hover={{ cursor: 'pointer' }}
                            className="addresslinktdIcon"
                            as={linkLight}
                            
                            />
                            </a>
                          </div>
                         
                          </Td>);
                       return <Td key={pagedata.address+index+mainkey} >{pagedata[datakey]}</Td>;  
                    })}
                </Tr>)
               })}
               
           </Tbody>
       </Table>
   </TableContainer>

    {modals}

   </Box>)
}
export default TableCommon;
