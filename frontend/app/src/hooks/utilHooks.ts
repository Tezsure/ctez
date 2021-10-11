import { useMemo } from 'react';
import BigNumber from 'bignumber.js';
import { useParams } from 'react-router-dom';
import { getOvenMaxCtez } from '../utils/ovenUtils';
import { useAppSelector } from '../redux/store';
import { formatNumber } from '../utils/numbers';

// TODO: Refactor usage
const useOvenStats = () => {
  const { ovenId } = useParams<{ ovenId: string }>();
  const oven = useAppSelector((state) =>
    state.oven.ovens.find((x) => {
      const ovenIdFromStore = new BigNumber(x.ovenId);
      return ovenId === ovenIdFromStore.toString();
    }),
  );

  const currentTarget = useAppSelector((state) => state.stats.baseStats?.originalTarget);

  const stats = useMemo(() => {
    if (oven == null) {
      return null;
    }

    const { tez_balance, ctez_outstanding } = oven;
    const { max, remaining } = currentTarget
      ? getOvenMaxCtez(
          formatNumber(tez_balance, 0),
          formatNumber(ctez_outstanding, 0),
          currentTarget,
        )
      : { max: 0, remaining: 0 };

    const tezBalance = formatNumber(tez_balance, -6) ?? 0;
    const outStandingCtez = formatNumber(ctez_outstanding, -6) ?? 0;
    const maxMintableCtez = formatNumber(max < 0 ? 0 : max, 0);
    const remainingMintableCtez = remaining < 0 ? 0 : remaining;

    let collateralUtilization = formatNumber(
      (formatNumber(ctez_outstanding, 0) / maxMintableCtez) * 100,
    ).toFixed(1);

    if (collateralUtilization === 'NaN') {
      collateralUtilization = '0';
    }

    const collateralRatio = (100 * (100 / Number(collateralUtilization))).toFixed(1);

    const reqTezBalance = (() => {
      if (currentTarget) {
        return tezBalance * currentTarget > outStandingCtez
          ? 0
          : outStandingCtez / currentTarget - tezBalance;
      }
      return 0;
    })();

    const withdrawableTez = (() => {
      if (currentTarget) {
        return tezBalance * currentTarget <= outStandingCtez
          ? 0
          : outStandingCtez / currentTarget - tezBalance;
      }
      return 0;
    })();

    return {
      tezBalance,
      outStandingCtez,
      maxMintableCtez,
      remainingMintableCtez,
      collateralUtilization,
      collateralRatio,
      reqTezBalance,
      withdrawableTez,
    };
  }, [currentTarget, oven]);

  return { stats, oven, ovenId };
};

export { useOvenStats };
