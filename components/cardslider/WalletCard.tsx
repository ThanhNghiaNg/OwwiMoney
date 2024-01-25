import { CommonCard } from '@/components/card';
import type { WalletStatisticType } from '@/types/component';
import { getLightness, tailwindMerge } from '@/utils/helper';

const WalletCard = ({ item }: { item: WalletStatisticType }) => {
  const lightness = getLightness(item.color || '#FFF');
  return (
    <CommonCard
      className={tailwindMerge(
        'rounded-3xl p-5 w-[300px] h-[210px] bg-orange-300 m-auto shadow-cardShadow',
        `bg-[${item.color}]`,
        lightness >= 0.7 ? 'text-dark-mode' : 'text-light-mode',
        // 'invert',
      )}
    >
      <div className={'font-bold'}>{item.name} wallet</div>
      <div className="flex items-center h-[60%]">
        <span className={'tracking-[5px] font-bold text-2xl'}>{item.accountNumber}</span>
      </div>
    </CommonCard>
  );
};

export default WalletCard;
