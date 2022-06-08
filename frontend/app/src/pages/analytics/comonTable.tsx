import { Box, Button, ButtonGroup, ButtonProps, Container, Flex, Icon, SkeletonText, Table, TableContainer, Tbody, Td, Text, Th, Thead, Tr, useMediaQuery } from "@chakra-ui/react";
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
import SkeletonLayout from "../../components/skeleton";

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
  isDecription?:boolean,
  isDecriptionAdd?:boolean,
  isDecriptionRemove?:boolean,
  isTez?:boolean,
  isCtez2?:boolean,

}

const TableCommon: React.FC<CommonTable> = ({column,data=[]}) => {
  const { positiveOrNegative, valueFormat } = useTableNumberUtils();
    const [textcolor] = useThemeColors(['homeTxt']);
    const [textHighlight] = useThemeColors(['sideBarBg']);
    const [largerScreen] = useMediaQuery(['(min-width: 900px)']);
    const [background,inputbg] = useThemeColors([
        'cardbg2',
        'inputbg',
    ]);
    const baseStyles: ButtonProps = {
        w: 7,
        fontSize: 'sm',
        backgroundColor:'transparent'
      };
      const activeStyles: ButtonProps = {
        ...baseStyles,
        backgroundColor:inputbg,
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
    if(!ovenTransactionTable.length){
        return (<Table variant='simple'>
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
          {Array(pageSize).fill(0).map((_,i)=>(<Tr key={`loaderSreen${i}`}>
            
          {column.map((coldata,mainkey)=>(<Td key={`loaderSreenIndividual${mainkey}`} >
          <SkeletonText noOfLines={1}  />
          </Td>))}
            
          </Tr>))}
          </Tbody>
        </Table>);
      }
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
                 return <Th key={`coldataaccessor${mainkey}`}  textAlign='right'  >{coldata.accessor}</Th>;  
               })}
               </Tr>
           </Thead>
           <Tbody>
               {console.log('currentPageOvens',currentPageOvens)}
               { currentPageOvens.map((pagedata:any,index:number)=>{

                  return(
                    <Tr key={pagedata.address+index}>
                    {column.map((coldata,mainkey)=>{
                       const {datakey,istrimAddress,isTimeformat,isCtez,isDecription,isDecriptionAdd,isDecriptionRemove,isTez,isCtez2}= coldata;
                       if(isTimeformat)
                         return <Td key={pagedata.address+index+mainkey} textAlign={mainkey===0?'left':'right'}>{timeago.format(pagedata[datakey])}</Td>;
                       if(isCtez)
                         return <Td key={pagedata.address+index+mainkey} textAlign={mainkey===0?'left':'right'}>{pagedata[datakey]} CTEZ</Td>;
                       if(istrimAddress)
                         return (<Td  key={pagedata.address+index+mainkey} textAlign={mainkey===0?'left':'right'}>
                          <div className="addresslinktd2">
                          {
                          trimAddress(pagedata[datakey])
                          }<a 
                          href={`https://tzkt.io/${pagedata[datakey]}`}
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
                        if(isDecription)
                            return (<Td  key={pagedata.address+index+mainkey} textAlign={mainkey===0?'left':'right'} >
                              <div className="addresslinktd">
                              {pagedata.sideTrade===1?<p>Swap {pagedata.tezQty} tez for {pagedata.tokenQty} ctez</p>:<p>Swap {pagedata.tokenQty} ctez for {pagedata.tezQty} tez</p>}            
                              {/* <a 
                              href={`https://tzkt.io/${pagedata.trader}`}
                              rel="noreferrer"
                              target="_blank">
                                <Icon
                                color="light.tradebg"
                                _hover={{ cursor: 'pointer' }}
                                className="addresslinktdIcon"
                                as={linkLight}
                                
                                />
                                </a> */}
                              </div>
                              
                              </Td>);
                        if(isDecriptionAdd)
                        return (<Td  key={pagedata.address+index+mainkey} textAlign={mainkey===0?'left':'right'} >
                          <div className="addresslinktd">
                          Add {pagedata.quantityTk1} ctez and {pagedata.quantityTk2} tez
                          {/* <a 
                          href={`https://tzkt.io/${pagedata.trader}`}
                          rel="noreferrer"
                          target="_blank">
                            <Icon
                            color="light.tradebg"
                            _hover={{ cursor: 'pointer' }}
                            className="addresslinktdIcon"
                            as={linkLight}
                            
                            />
                            </a> */}
                          </div>
                          
                          </Td>);
                          if(isDecriptionRemove)
                          return (<Td  key={pagedata.address+index+mainkey} textAlign={mainkey===0?'left':'right'} >
                            <div className="addresslinktd">
                            Remove {pagedata.quantityTk1} ctez and {pagedata.quantityTk2} tez
                            {/* <a 
                            href={`https://tzkt.io/${pagedata.trader}`}
                            rel="noreferrer"
                            target="_blank">
                              <Icon
                              color="light.tradebg"
                              _hover={{ cursor: 'pointer' }}
                              className="addresslinktdIcon"
                              as={linkLight}
                              
                              />
                              </a> */}
                            </div>
                            
                            </Td>);         
                            if(isTez)
                             return <Td key={pagedata.address+index+mainkey} textAlign={mainkey===0?'left':'right'}>{pagedata[datakey]} tez</Td>;
                             if(isCtez2)
                             return <Td key={pagedata.address+index+mainkey} textAlign={mainkey===0?'left':'right'}>{pagedata[datakey]} ctez</Td>;

                       return <Td key={pagedata.address+index+mainkey} textAlign={mainkey===0?'left':'right'} >{pagedata[datakey]}</Td>;  
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
