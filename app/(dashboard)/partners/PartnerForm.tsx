import { getAllTypes } from '@/actions/controller/typeController';
import { CommonButton } from '@/components/button';
import { CommonCard } from '@/components/card';
import CommonCombobox, { type DataType } from '@/components/combobox';
import CommonInput from '@/components/input';
import { PartnerModel } from '@/model/partnerModel';
import { classValidatorResolver } from '@hookform/resolvers/class-validator';
import Image from 'next/image';
import { useEffect, useState, type ChangeEvent } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { FaCloudUploadAlt } from 'react-icons/fa';

export default function PartnerForm({
  type,
  submitHandler,
}: {
  type: 'create' | 'update';
  submitHandler: (value: any) => void;
}) {
  const [typeOptions, setTypeOptions] = useState<DataType[]>([]);
  const [partnerImage, setPartnerImage] = useState('');
  const resolver = classValidatorResolver(PartnerModel);
  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
    watch,
  } = useForm({
    values: {
      avatar: { base64String: '', size: 0, type: '' },
      name: '',
      email: '',
      contact: '',
      address: '',
      type: '',
      description: '',
    },
    resolver,
  });

  const handleChangeImage = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();

      reader.onload = function (event) {
        const base64String = event.target?.result;

        setPartnerImage(base64String?.toString() || '');
        // onChange({ base64String: base64String as string, size: file.size, type: file.type });
        setValue('avatar', { base64String: base64String as string, size: file.size, type: file.type });
      };

      reader.readAsDataURL(file);
    }
  };

  const handleSubmitForm = handleSubmit(async (values: PartnerModel) => {
    console.log({ values });
    submitHandler?.(values);
  });

  useEffect(() => {
    const fetchAllTypes = async () => {
      const allTypes = await getAllTypes();
      const typeOptions: DataType[] | undefined = allTypes.data?.types?.map((type) => {
        return { value: type.id, label: type.name } as DataType;
      });

      setTypeOptions(typeOptions as DataType[]);
    };
    fetchAllTypes();
  }, []);

  return (
    <CommonCard className="p-4 md:p-16 md:pr-20 lg:pr-40 2xl:pr-96 w-full">
      <div className="grid grid-cols-3 gap-4 items-center">
        <p className={'mt-6 mb-2 text-base font-semibold leading-6 '}>Partner Image</p>
        <div className="col-span-2">
          {/* <Controller
            name="avatar"
            control={control}
            render={({ field: { onChange } }) => (
              <CommonInput
                type="file"
                name="avatar"
                accept="image/*"
                className="px-6 py-4 border-[1px] border-solid border-[#D1D1D1] hover h-14 text-base focus-visible:ring-0"
                placeholder="Shopping"
                onChange={(e) => {
                  handleChangeImage(e, onChange);
                }}
                errors={errors}
              />
            )}
          /> */}
          <input
            type="file"
            id="upload-file"
            accept="image/*"
            hidden
            onChange={handleChangeImage}
          />
          {!partnerImage && (
            <label
              htmlFor="upload-file"
              className="inline-block px-4 py-4 bg-blue-500 text-white rounded-2xl text-center cursor-pointer border-2 border-dashed border-blue-500 hover:bg-blue-300 transition-all duration-300"
            >
              <FaCloudUploadAlt />{' '}
            </label>
          )}
          {partnerImage && (
            <label
              htmlFor="upload-file"
              className="relative inline-block w-16 h-16 bg-blue-500 text-white rounded-full overflow-hidden text-center cursor-pointer border-2 border-dashed border-blue-500 hover:bg-blue-300 transition-all duration-300"
            >
              <Image
                src={partnerImage}
                layout="fill"
                alt="partner image"
              />{' '}
            </label>
          )}
        </div>

        <p className={'text-base font-semibold leading-6'}>Name</p>
        <div className="col-span-2">
          <Controller
            name="name"
            control={control}
            render={({ field: { onChange, value } }) => (
              <CommonInput
                name="name"
                className="col-span-2 px-6 py-4 border-[1px] border-solid border-[#D1D1D1] hover h-14 text-base focus-visible:ring-0"
                placeholder="Add name"
                value={value}
                onChange={onChange}
                errors={errors}
              />
            )}
          />
        </div>
        <p className={'text-base font-semibold leading-6'}>Email</p>
        <div className="col-span-2">
          <Controller
            name="email"
            control={control}
            render={({ field: { onChange, value } }) => (
              <CommonInput
                name="email"
                className="col-span-2 px-6 py-4 border-[1px] border-solid border-[#D1D1D1] hover h-14 text-base focus-visible:ring-0"
                placeholder="Add Email"
                value={value}
                onChange={onChange}
                errors={errors}
              />
            )}
          />
        </div>
        <p className={'text-base font-semibold leading-6'}>Contact</p>
        <div className="col-span-2">
          <Controller
            name="contact"
            control={control}
            render={({ field: { onChange, value } }) => (
              <CommonInput
                name="contact"
                className="col-span-2 px-6 py-4 border-[1px] border-solid border-[#D1D1D1] hover h-14 text-base focus-visible:ring-0"
                placeholder="+84"
                value={value}
                onChange={onChange}
                errors={errors}
              />
            )}
          />
        </div>
        <p className={'text-base font-semibold leading-6'}>Address</p>
        <div className="col-span-2">
          <Controller
            name="address"
            control={control}
            render={({ field: { onChange, value } }) => (
              <CommonInput
                name="address"
                className="col-span-2 px-6 py-4 border-[1px] border-solid border-[#D1D1D1] hover h-14 text-base focus-visible:ring-0"
                placeholder="Add Address"
                value={value}
                onChange={onChange}
                errors={errors}
              />
            )}
          />
        </div>
        <p className={'text-base font-semibold leading-6'}>Type</p>
        <Controller
          name="type"
          control={control}
          render={({ field: { onChange, value } }) => (
            <CommonCombobox
              name="type"
              valueProp={value}
              onChange={onChange}
              optionsProp={typeOptions as DataType[]}
              widthSelection={'100%'}
              placeholder={'Select Type...'}
              customInput={'px-6 py-4 border-[1px] border-solid border-[#D1D1D1] hover h-14 text-base'}
              errors={errors}
            />
          )}
        />
      </div>
      <div className="flex justify-end w-full mt-6">
        <CommonButton
          className="w-fit"
          onClick={handleSubmitForm}
        >
          Submit
        </CommonButton>
      </div>
    </CommonCard>
  );
}
