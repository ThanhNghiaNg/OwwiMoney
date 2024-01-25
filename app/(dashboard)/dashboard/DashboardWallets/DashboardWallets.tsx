import { getWalletStatistics } from '@/actions/controller/statisticController';
import { getAllWallet } from '@/actions/controller/walletController';
import { CommonCard } from '@/components/card';
import CardSlider from '@/components/cardslider/CardSlider';
import type { WalletModel } from '@/model/walletModel';
import type { WalletStatisticType } from '@/types/component';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { FaChevronRight } from 'react-icons/fa';

export default function DashboardWallets() {
  const [walletList, setWalletList] = useState<WalletStatisticType[]>([]);
  const [selectedWallet, setSelectedWallet] = useState<number>(0);

  const onNextWallet = () => {
    setSelectedWallet((prev) => (prev + 1 >= walletList.length ? prev : prev + 1));
  };

  const onPrevWallet = () => {
    setSelectedWallet((prev) => (prev - 1 < 0 ? prev : prev - 1));
  };

  useEffect(() => {
    (async () => {
      const statistic = await getWalletStatistics();
      console.log({ statistic });
      setWalletList(statistic.data?.statistic || []);
    })();
  }, []);

  return (
    <CommonCard className="xl:col-span-2 h-full w-full">
      <div className="flex justify-between py-4 px-6">
        <h1 className="text-xl font-semibold">Wallets</h1>
        <Link
          href={'#'}
          className="flex items-center gap-2"
        >
          <Link
            href={'/wallet'}
            className="flex items-center gap-2"
          >
            <p className="text-sm hover:underline">View all</p> <FaChevronRight size={12} />
          </Link>
        </Link>
      </div>

      <div className="flex  justify-center">
        <div className="w-auto max-w-[400px] h-[250px]">
          <CardSlider
            items={walletList || []}
            onNextWallet={onNextWallet}
            onPrevWallet={onPrevWallet}
          />
        </div>
      </div>

      <div className="flex mt-[4px] justify-between items-end border-t-[1px] px-4 py-2">
        <div className="flex flex-col text-right">
          <span className="text-lg text-blue-500 font-bold">
            {Number(walletList[selectedWallet]?.totalBalance || '').toLocaleString()}
          </span>
          <span className="text-sm text-[#AEAEAE]">Current balance</span>
        </div>

        <div className="flex flex-col text-right">
          <span className="text-lg text-color-success font-bold">
            {Number(walletList[selectedWallet]?.income || '').toLocaleString()}
          </span>
          <span className="text-sm text-[#AEAEAE]">Income</span>
        </div>

        <div className="flex flex-col text-right">
          <span className="text-lg text-color-error font-bold">
            {Number(walletList[selectedWallet]?.outcome || '').toLocaleString()}
          </span>
          <span className="text-sm text-[#AEAEAE]">Outcome</span>
        </div>
      </div>
    </CommonCard>
  );
}
