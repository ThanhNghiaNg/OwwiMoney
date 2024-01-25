'use client';

// import Swiper core and required modules
import { Swiper, SwiperSlide } from 'swiper/react';
// Import Swiper styles
import { useRef } from 'react';
import 'swiper/css';
import 'swiper/css/navigation';
// import 'swiper/css/pagination';
import WalletCard from '@/components/cardslider/WalletCard';
import type { WalletStatisticType } from '@/types/component';
import 'swiper/css/scrollbar';
import { Navigation, Pagination } from 'swiper/modules';

const CardSlider = ({
  items,
  onNextWallet,
  onPrevWallet,
}: {
  items: WalletStatisticType[];
  onNextWallet: () => void;
  onPrevWallet: () => void;
}) => {
  const navigationPrevRef = useRef(null);
  const navigationNextRef = useRef(null);

  return (
    <Swiper
      // install Swiper modules
      modules={[Navigation, Pagination]}
      onInit={(swiper) => {
        if (swiper.params.navigation) {
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          // eslint-disable-next-line no-param-reassign
          swiper.params.navigation.prevEl = navigationPrevRef.current;
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          // eslint-disable-next-line no-param-reassign
          swiper.params.navigation.nextEl = navigationNextRef.current;
        }
        swiper.navigation.init();
        swiper.navigation.update();
      }}
      navigation={{
        prevEl: navigationPrevRef.current!, // Assert non-null
        nextEl: navigationNextRef.current!, // Assert non-null
      }}
      spaceBetween={0}
      slidesPerView={1}
      onSwiper={(swiper) => {
        //pass
      }}
      onSlideChange={() => console.log('slide change')}
      className="!w-full !h-[230px]"
    >
      {items.map((item, idx) => {
        return (
          <SwiperSlide
            key={`card-wallet-${idx}`}
            className="!mr-0 !w-full"
          >
            <WalletCard item={item} />
          </SwiperSlide>
        );
      })}

      <button
        className="swiper-button-prev after:!text-2xl"
        ref={navigationPrevRef}
        onClick={onPrevWallet}
      />
      <button
        className="swiper-button-next after:!text-2xl"
        ref={navigationNextRef}
        onClick={onNextWallet}
      />
    </Swiper>
  );
};

export default CardSlider;
