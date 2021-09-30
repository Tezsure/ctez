import {
  Box,
  BoxProps,
  Flex,
  FormControl,
  FormHelperText,
  FormLabel,
  IconButton,
  Input,
  SlideFade,
  Text,
  Wrap,
  WrapItem,
} from '@chakra-ui/react';
import { useState } from 'react';
import { IoMdCloseCircle } from 'react-icons/io';
import { trimAddress } from '../../utils/addressUtils';

interface IDepositorItem {
  value: string;
  label: string;
  noDelete?: boolean;
}

interface IDepositorsInputProps {
  outerBoxProps?: BoxProps;
  depositors: IDepositorItem[];
  onChange: (depositors: IDepositorItem[]) => void;
}

const DepositorsInput: React.FC<IDepositorsInputProps> = (props) => {
  const [depositorInput, setDepositorInput] = useState('');

  const handleDepositorInput = (ev: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = ev.target;
    const depositors = value.split(' ');
    if (depositors.length > 1 && !props.depositors.some((x) => x.value === depositors[0])) {
      props.onChange([
        ...props.depositors,
        { label: trimAddress(depositors[0]), value: depositors[0] },
      ]);
      setDepositorInput(depositors[1]);
    } else {
      setDepositorInput(depositors[0]);
    }
  };

  const removeDepositor = (index: number) => {
    props.onChange([...props.depositors.slice(0, index), ...props.depositors.slice(index + 1)]);
  };

  const handleDepositorClick = (depositor: IDepositorItem, index: number) => {
    setDepositorInput(depositor.value);
    props.onChange([...props.depositors.slice(0, index), ...props.depositors.slice(index + 1)]);
  };

  return (
    <Box {...props.outerBoxProps}>
      <FormControl>
        <FormLabel fontSize="xs" fontWeight="500">
          Authorised Deposters
        </FormLabel>

        <Wrap mb={2}>
          {props.depositors.map((dep, idx) => (
            <WrapItem key={dep.value}>
              <SlideFade in reverse>
                <Flex border="1px" borderColor="gray.100" borderRadius={16}>
                  <Text
                    px={2}
                    onClick={dep.noDelete ? undefined : () => handleDepositorClick(dep, idx)}
                    cursor={dep.noDelete ? '' : 'pointer'}
                  >
                    {dep.label}
                  </Text>
                  {!dep.noDelete && (
                    <IconButton
                      aria-label="remove depositor"
                      variant="ghost"
                      isRound
                      size="xs"
                      onClick={() => removeDepositor(idx)}
                      icon={<IoMdCloseCircle />}
                    />
                  )}
                </Flex>
              </SlideFade>
            </WrapItem>
          ))}
        </Wrap>

        <Input
          name="depositorInput"
          id="depositorInput"
          value={depositorInput}
          onChange={handleDepositorInput}
        />
      </FormControl>
    </Box>
  );
};

export default DepositorsInput;