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
import { numberToMillionOrBillionFormate } from "../../utils/numberFormate";

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
  isShowAdderessSend?:boolean,
  isConsiderLogicChange?:boolean,
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
                   return <Th key={`coldataaccessor${mainkey}`} className="tableFirstCell" textAlign='left' >{coldata.accessor}</Th>;
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
                       const {datakey,istrimAddress,isTimeformat,isCtez,isDecription,isDecriptionAdd,isDecriptionRemove,isTez,isCtez2,isShowAdderessSend,isConsiderLogicChange}= coldata;
                       if(isTimeformat)
                         return <Td key={pagedata.address+index+mainkey} className={mainkey===0?"tableFirstCell":''} textAlign={mainkey===0?'left':'right'}>{timeago.format(pagedata[datakey])}</Td>;
                       if(isCtez && isShowAdderessSend)
                         return <Td key={pagedata.address+index+mainkey} className={mainkey===0?"tableFirstCell":''} textAlign={mainkey===0?'left':'right'}>
                           <div >
                          <a className="addresslinktd"
                          href={`https://tzkt.io/${pagedata.operationHash}`}
                          rel="noreferrer"
                          target="_blank">
                          {`${numberToMillionOrBillionFormate(pagedata[datakey])}`}
                          
                          <Icon
                            color="light.tradebg"
                            _hover={{ cursor: 'pointer' }}
                            className="addresslinktdIcon"
                            as={linkLight}
                            
                            />
                          </a>
                          </div>
                          </Td>;
                       if(isCtez)
                         return <Td key={pagedata.address+index+mainkey} className={mainkey===0?"tableFirstCell":''} textAlign={mainkey===0?'left':'right'}>{numberToMillionOrBillionFormate(pagedata[datakey],6)} ctez</Td>;
                       
                         if(istrimAddress)
                         return (<Td  key={pagedata.address+index+mainkey} className={mainkey===0?"tableFirstCell":''}  textAlign={mainkey===0?'left':'right'}>
                          <div >
                          <a 
                          className="addresslinktd2"
                          href={`https://tzkt.io/${pagedata[datakey]}`}
                          rel="noreferrer"
                          target="_blank">
                          {
                          trimAddress(pagedata[datakey])
                          }
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
                            return (<Td  key={pagedata.address+index+mainkey} className={mainkey===0?"tableFirstCell":''} textAlign={mainkey===0?'left':'right'} >
                              <div>
                              <a className="addresslinktd"
                              href={`https://tzkt.io/${pagedata.operationHash}`}
                              rel="noreferrer"
                              target="_blank">
                              {pagedata.sideTrade===1?<p>Swap {numberToMillionOrBillionFormate(pagedata.tezQty,6)} tez for {numberToMillionOrBillionFormate(pagedata.tokenQty,6)} ctez</p>:<p>Swap {numberToMillionOrBillionFormate(pagedata.tokenQty,6)} ctez for {numberToMillionOrBillionFormate(pagedata.tezQty,6)} tez</p>}            
                             
                              
                                <Icon
                                color="light.tradebg"
                                _hover={{ cursor: 'pointer' }}
                                className="addresslinktdIcon"
                                as={linkLight}
                                
                                />
                                </a>
                              </div>
                              
                              </Td>);
                        if(isDecriptionAdd)
                        return (<Td  key={pagedata.address+index+mainkey} className={mainkey===0?"tableFirstCell":''} textAlign={mainkey===0?'left':'right'} >
                          <div> 
                          <a className="addresslinktd"
                          href={`https://tzkt.io/${pagedata.operationHash}`}
                          rel="noreferrer"
                          target="_blank">
                          Add {numberToMillionOrBillionFormate(pagedata.quantityTk1,6)} tez and {numberToMillionOrBillionFormate(pagedata.quantityTk2,6)} ctez                          
                            <Icon
                            color="light.tradebg"
                            _hover={{ cursor: 'pointer' }}
                            className="addresslinktdIcon"
                            as={linkLight}
                            
                            />
                            </a> 
                          </div>
                          
                          </Td>);
                          if(isDecriptionRemove)
                          return (<Td  key={pagedata.address+index+mainkey} className={mainkey===0?"tableFirstCell":''} textAlign={mainkey===0?'left':'right'} >
                            <div>
                            <a  className="addresslinktd"
                            href={`https://tzkt.io/${pagedata.operationHash}`}
                            rel="noreferrer"
                            target="_blank">
                            Remove {numberToMillionOrBillionFormate(pagedata.quantityTk1,6)} tez and {numberToMillionOrBillionFormate(pagedata.quantityTk2,6)} ctez
                              <Icon
                              color="light.tradebg"
                              _hover={{ cursor: 'pointer' }}
                              className="addresslinktdIcon"
                              as={linkLight}
                              
                              />
                              </a>
                            </div>
                            
                            </Td>);
                            if(isTez && isShowAdderessSend)
                            return <Td key={pagedata.address+index+mainkey} className={mainkey===0?"tableFirstCell":''} textAlign={mainkey===0?'left':'right'}>
                              <div >
                             <a className="addresslinktd"
                             href={`https://tzkt.io/${pagedata.operationHash}`}
                             rel="noreferrer"
                             target="_blank">
                             {`${numberToMillionOrBillionFormate(pagedata[datakey],6)}`}
                             <Icon
                               color="light.tradebg"
                               _hover={{ cursor: 'pointer' }}
                               className="addresslinktdIcon"
                               as={linkLight}
                               
                               />
                             </a>
                             </div>
                             </Td>;
                             if(isTez && isConsiderLogicChange)
                             return <Td key={pagedata.address+index+mainkey} className={mainkey===0?"tableFirstCell":''} textAlign={mainkey===0?'left':'right'}>{
                              pagedata.sideTrade===1?`${numberToMillionOrBillionFormate(pagedata.tezQty,6)} tez`:`${numberToMillionOrBillionFormate(pagedata.tokenQty,6)} ctez`
                              } 
                              </Td>;
                             if(isCtez2 && isConsiderLogicChange)
                             return <Td key={pagedata.address+index+mainkey} className={mainkey===0?"tableFirstCell":''} textAlign={mainkey===0?'left':'right'}>
                               { pagedata.sideTrade===0?`${numberToMillionOrBillionFormate(pagedata.tezQty,6)} tez`:`${numberToMillionOrBillionFormate(pagedata.tokenQty,6)} ctez`}
                              </Td>;
         
                            if(isTez)
                             return <Td key={pagedata.address+index+mainkey} className={mainkey===0?"tableFirstCell":''} textAlign={mainkey===0?'left':'right'}>{numberToMillionOrBillionFormate(pagedata[datakey],6)} tez</Td>;
                             if(isCtez2)
                             return <Td key={pagedata.address+index+mainkey} className={mainkey===0?"tableFirstCell":''} textAlign={mainkey===0?'left':'right'}>{numberToMillionOrBillionFormate(pagedata[datakey],6)} ctez</Td>;

                       return <Td key={pagedata.address+index+mainkey} className={mainkey===0?"tableFirstCell":''} textAlign={mainkey===0?'left':'right'} >{numberToMillionOrBillionFormate(pagedata[datakey],6)}</Td>;  
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
