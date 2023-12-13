import { getAllTransactionByUser } from '@/actions/controller/transactionController';
import { getAllTypes } from '@/actions/controller/typeController';
import TabClient from '@/app/(dashboard)/transactions/TabClient';
import { TableTransactionAll, type TransactionResType } from '@/app/(dashboard)/transactions/TableClient';
import type { ObjectWithDynamicKeys } from '@/helper/type';

type TransactionsProps = {
  page: number;
  pageSize: number;
  tab: string;
};

const valueType: ObjectWithDynamicKeys<string> = {
  revenue: 'Income',
  expenses: 'Outcome',
  loan: 'Loan',
};

const Transactions = async ({ page, pageSize, tab }: TransactionsProps) => {
  const types = await getAllTypes();
  const typeId = types.data?.types.filter((t) => t.name === valueType[tab])[0]?.id;
  const response = typeId
    ? await getAllTransactionByUser(pageSize, page, { typeId })
    : await getAllTransactionByUser(pageSize, page);
  const data: TransactionResType[] = response.data?.transactions || [];
  const totalPages: number = response.data?.totalPages || 1;
  return (
    <TabClient
      defaultValue={typeId ? tab : 'all'}
      tabNames={[
        { value: 'all', label: 'All' },
        { value: 'revenue', label: 'Revenue' },
        { value: 'expenses', label: 'Expenses' },
        { value: 'loan', label: 'Loan' },
      ]}
      tabContents={[
        {
          value: 'all',
          children: (
            <TableTransactionAll
              dataTable={data}
              totalPages={totalPages}
            />
          ),
        },
        {
          value: 'revenue',
          children: (
            <TableTransactionAll
              dataTable={data}
              totalPages={totalPages}
            />
          ),
        },
        {
          value: 'expenses',
          children: (
            <TableTransactionAll
              dataTable={data}
              totalPages={totalPages}
            />
          ),
        },
        {
          value: 'loan',
          children: (
            <TableTransactionAll
              dataTable={data}
              totalPages={totalPages}
            />
          ),
        },
      ]}
    />
  );
};

export default Transactions;
