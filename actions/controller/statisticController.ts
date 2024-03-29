'use server';
import StatisticRepository from '@/actions/repositories/statisticRepository';
import WalletRepository from '@/actions/repositories/walletRepository';
import StatisticService from '@/actions/services/statisticService';
import { HttpStatusCodes } from '@/helper/type';

const statisticRepository = new StatisticRepository();
const walletRepository = new WalletRepository();
const statisticService = new StatisticService(statisticRepository, walletRepository);

export const getStatisticWeekly = async () => {
  try {
    return await statisticService.getStatisticWeekly();
  } catch (error) {
    return { message: 'Internal Server Error', status: HttpStatusCodes[500] };
  }
};

export const getStatisticMonthly = async () => {
  try {
    return await statisticService.getStatisticMonthly();
  } catch (error) {
    return { message: 'Internal Server Error', status: HttpStatusCodes[500] };
  }
};

export const getStatisticYearly = async () => {
  try {
    return await statisticService.getStatisticYearly();
  } catch (error) {
    return { message: 'Internal Server Error', status: HttpStatusCodes[500] };
  }
};

export const getWalletStatistics = async () => {
  try {
    return await statisticService.getWalletStatistics();
  } catch (error) {
    return { message: 'Internal Server Error', status: HttpStatusCodes[500] };
  }
};

export const getAmountByMonth = async (type: string, month: string) => {
  try {
    return await statisticService.getAmountByMonth(type, month);
  } catch (error) {
    return { message: 'Internal Server Error', status: HttpStatusCodes[500] };
  }
};

export const getNewTransactionByUser = async () => {
  try {
    return await statisticService.getNewTransactionByUser();
  } catch (error) {
    return { message: 'Internal Server Error', status: HttpStatusCodes[500] };
  }
};

export const getTransactionByType = async (type: string) => {
  try {
    return await statisticService.getTransactionByType(type);
  } catch (error) {
    return { message: 'Internal Server Error', status: HttpStatusCodes[500] };
  }
};

export const getBorrowerByFilter = async (query?: string) => {
  try {
    return await statisticService.getBorrowerByFilter(query);
  } catch (error) {
    return { message: 'Internal Server Error', status: HttpStatusCodes[500] };
  }
};
