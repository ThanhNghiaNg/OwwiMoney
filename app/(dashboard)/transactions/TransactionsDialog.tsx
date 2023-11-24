'use Client';
import { CommonButton } from '@/components/button';
import CommonCombobox from '@/components/combobox';
import DialogForm from '@/components/dialog/formDialog';
import CommonInput from '@/components/input';
import { classValidatorResolver } from '@hookform/resolvers/class-validator';
import { Box } from '@radix-ui/themes';
import { IsNotEmpty } from 'class-validator';
import { Controller, useForm } from 'react-hook-form';
import { FaPlus } from 'react-icons/fa';

const frameworks = [
  {
    value: 'next.js',
    label: 'Next.js',
  },
  {
    value: 'sveltekit',
    label: 'SvelteKit',
  },
  {
    value: 'nuxt.js',
    label: 'Nuxt.js',
  },
  {
    value: 'remix',
    label: 'Remix',
  },
  {
    value: 'astro',
    label: 'Astro',
  },
  {
    value: 'js',
    label: 'Javascript',
  },
  {
    value: 'html',
    label: 'HTML',
  },
  {
    value: 'css',
    label: 'CSS',
  },
];

export class newTransactionsModel {
  @IsNotEmpty({ message: 'Type is required' })
  type: string | undefined;

  @IsNotEmpty({ message: 'Wallet is required' })
  wallet: string | undefined;

  @IsNotEmpty({ message: 'Amounts is required' })
  amounts: number | undefined;
}

const resolver = classValidatorResolver(newTransactionsModel);

const TransactionsDialog = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    values: {
      type: '',
      wallet: '',
      amounts: 0,
    },
    resolver,
  });

  const handleSubmitForm = handleSubmit(async (values: newTransactionsModel) => {
    console.log({ values });
    reset();
  });
  return (
    <Box>
      <DialogForm
        useCustomTrigger={
          <CommonButton className="w-[208px] duration-300 transition-all bg-theme-component flex gap-2 hover:duration-300 hover:transition-all hover:bg-theme-component hover:opacity-80 hover:ring-0">
            <FaPlus />
            Add Transactions
          </CommonButton>
        }
        titleDialog="New Transactions"
        customStyleHeader="text-2xl"
        handleSubmit={handleSubmitForm}
        handleClose={() => {
          reset();
        }}
      >
        <Controller
          name="type"
          control={control}
          render={({ field: { onChange, value } }) => (
            <CommonCombobox
              name="type"
              valueProp={value}
              onChange={onChange}
              optionsProp={frameworks}
              widthSelection={'100%'}
              label="Type"
              customLabel="text-base font-semibold leading-6"
              placeholder={'Select framework...'}
              customInput={'px-6 py-4 border-[1px] border-solid border-[#D1D1D1] hover h-14 text-base'}
              errors={errors}
            />
          )}
        />

        <Controller
          name="wallet"
          control={control}
          render={({ field: { onChange, value } }) => (
            <CommonInput
              name={'wallet'}
              label="Wallet"
              customLabel="text-base font-semibold leading-6"
              className="px-6 py-4 border-[1px] border-solid border-[#D1D1D1] hover h-14 text-base focus-visible:ring-0"
              placeholder="Shopping"
              value={value}
              onChange={onChange}
              errors={errors}
            />
          )}
        />

        <Controller
          name="amounts"
          control={control}
          render={({ field: { onChange, value } }) => (
            <CommonInput
              name={'wallet'}
              label="Amounts"
              type="number"
              customLabel="text-base font-semibold leading-6"
              className="px-6 py-4 border-[1px] border-solid border-[#D1D1D1] hover h-14 text-base focus-visible:ring-0"
              placeholder="Shopping"
              value={String(value)}
              onChange={onChange}
              errors={errors}
            />
          )}
        />
      </DialogForm>
    </Box>
  );
};

export default TransactionsDialog;
