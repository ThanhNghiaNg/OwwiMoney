// const { prisma } = require('../../helper/lib/prismadbserver');
import { PrismaClient } from '@prisma/client';
import { MongoClient, ObjectId } from 'mongodb';
import { data } from './data.mjs';

export const sendMessage = async (socket, data) => {
  const prisma = new PrismaClient();

  const partners = await prisma.partner.updateMany({ data: { deleted: false } });

  prisma.$disconnect();
};

export const seedTransactions = async () => {
  // const prisma = new PrismaClient();
  const client = new MongoClient(
    'mongodb+srv://conculonton:conculonton@maindatabase.o9k6pig.mongodb.net/MainDatabase?retryWrites=true&w=majority',
  );
  await client.connect();
  const db = client.db('MainDatabase');

  const dataSample = data.map((item) => {
    return {
      createdDate: new Date(item.date['$date']),
      userId: new ObjectId(item.user['$oid']),
      partnerId: new ObjectId(item.partner['$oid']),
      categoryId: new ObjectId(item.category['$oid']),
      typeId: new ObjectId(item.type['$oid']),
      walletId: new ObjectId('65af67ee6fd3a11ae2fcdb57'),
      amount: item.amount,
      description: item.description,
      invoiceImageUrl: '',
      deleted: false,
      status: 'PAID',
      createdAt: new Date(item.date['$date']),
      updatedAt: new Date(item.date['$date']),
    };
  });
  const result = await db.collection('Transaction').insertMany(dataSample);
  console.log({ result });
  // client.$disconnect();
  // const partners = await prisma.partner.updateMany({ data: { deleted: false } });

  // console.log({ dataSample });
  // prisma.$disconnect();
};

seedTransactions();
