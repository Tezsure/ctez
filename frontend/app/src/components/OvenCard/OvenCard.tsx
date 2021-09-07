import { Box, Grid, Text } from '@chakra-ui/react';
import { useCallback } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { OvenSerializable } from '../../interfaces';
import ProgressPill from './ProgressPill';

const truncateText = (text: string | null) => {
  if (text == null) {
    return '';
  }

  const len = text.length;
  return `${text.substr(0, 5)}...${text.substr(len - 5)}`;
};

const OvenCard: React.FC<{ oven: OvenSerializable; isMyOven: boolean }> = ({ oven, isMyOven }) => {
  const history = useHistory();
  const renderItems = () => {
    const items = [
      { label: 'Oven address', value: truncateText(oven.address) },
      { label: 'Baker', value: truncateText(oven.baker) },
      { label: 'Oven Balance', value: `${oven.tez_balance} XTZ` },
      { label: 'Outstanding ', value: `${oven.ctez_outstanding} cTEZ` },
      { label: 'Mintable ', value: `500.41 cTEZ` },
    ];

    return items.map((item) => (
      <Box key={item.label}>
        <Text>{item.value}</Text>
        <Text fontSize="xs">{item.label}</Text>
      </Box>
    ));
  };

  const handleOnClick = useCallback(() => {
    if (isMyOven) {
      history.push(`${oven.ovenId}`);
    }
  }, [history, oven.ovenId, isMyOven]);

  return (
    <Grid
      gridTemplateColumns="repeat(5, 3fr) 4fr"
      my={6}
      py={4}
      px={10}
      borderRadius={16}
      backgroundColor="white"
      transition="0.4s"
      _hover={
        isMyOven
          ? { boxShadow: '0 23px 66px 4px rgba(176, 183, 195, 0.25)', cursor: 'pointer' }
          : {}
      }
      as={isMyOven ? Link : undefined}
      to={`${oven.ovenId}`}
    >
      {renderItems()}

      <Box>
        <ProgressPill value={75} />
        <Text fontSize="xs">Collateral Utilization</Text>
      </Box>
    </Grid>
  );
};

export default OvenCard;
