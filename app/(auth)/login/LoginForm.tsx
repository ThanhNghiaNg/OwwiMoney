'use client';

import { CommonButton } from '@/components/button';
import CommonInput from '@/components/input';
import Heading from '@/components/login/Heading';
import { LoginModel } from '@/model/authModel';
import FaceBookIcon from '@/public/icons/facebook.svg';
import GitHubIcon from '@/public/icons/github.svg';
import GoogleIcon from '@/public/icons/google.svg';
import { classValidatorResolver } from '@hookform/resolvers/class-validator';
import { Text } from '@radix-ui/themes';
import { signIn } from 'next-auth/react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { toast } from 'react-toastify';

const resolver = classValidatorResolver(LoginModel);

const LoginForm = () => {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    values: {
      email: '',
      password: '',
    },
    resolver: resolver,
  });

  const handleSubmitForm = handleSubmit(async (values: LoginModel) => {
    setIsLoading(true);
    await signIn('credentials', { ...values, redirect: false }).then(async (callback) => {
      setIsLoading(false);
      if (callback?.ok) {
        router.push('/dashboard');
        router.refresh();
        toast.success('Login Successfully !');
      }
      if (callback?.error) {
        console.log(callback);
        toast.error('Invalid email or password !');
      }
    });
  });

  useEffect(() => {
    const callbackError = searchParams?.get('error');

    if (callbackError === 'OAuthAccountNotLinked') {
      toast.error('whoops, there may already be an account with that email');
    }
  }, [searchParams]);

  return (
    <>
      <Heading
        title="OwwiMoney"
        custom="md:text-7xl text-6xl text-center xl:text-start text-dark-blue"
      />
      <Heading
        title="Login"
        custom="mt-2 text-4xl text-center xl:text-start"
      />
      <Text
        as="label"
        size="1"
      >
        Email
      </Text>
      <Controller
        name="email"
        control={control}
        render={({ field: { onChange, value } }) => (
          <CommonInput
            name="email"
            value={value}
            onChange={onChange}
            placeholder="Username@gmail.com"
            className="rounded-full border-gray-200 py-6 focus-visible:ring-none text-base "
            errors={errors}
          />
        )}
      />
      <Text
        as="label"
        size="1"
      >
        Password
      </Text>
      <Controller
        name="password"
        control={control}
        render={({ field: { onChange, value } }) => (
          <CommonInput
            name="password"
            type="password"
            value={value}
            onChange={onChange}
            placeholder="Password"
            className="rounded-full border-gray-200 py-6 focus-visible:ring-none text-base"
            errors={errors}
          />
        )}
      />
      <p className="text-sm">
        <Link
          className="text-dark-blue font-medium hover:text-blue-500"
          href="/forgotpassword"
        >
          Forget Password?
        </Link>
      </p>
      <CommonButton
        intent={'secondary'}
        onClick={handleSubmitForm}
        disabled={isLoading}
      >
        {isLoading ? 'Loading...' : 'Sign In'}
      </CommonButton>
      <div className="mt-1">
        <p className="text-sm text-gray-400 text-center">or continue with</p>
      </div>
      <div className="grid grid-cols-3 gap-2">
        <CommonButton
          intent={'outline'}
          onClick={async () => {
            await signIn('google', { callbackUrl: '/dashboard' });
          }}
        >
          <Image
            src={GoogleIcon}
            alt=""
          />
        </CommonButton>
        <CommonButton
          intent={'outline'}
          onClick={async () => {
            await signIn('github', { callbackUrl: '/dashboard' });
          }}
        >
          <Image
            src={GitHubIcon}
            alt=""
          />
        </CommonButton>
        <CommonButton
          intent={'outline'}
          onClick={() => ''}
        >
          <Image
            src={FaceBookIcon}
            alt=""
          />
        </CommonButton>
      </div>
      <div>
        <p className="text-sm text-gray-400 text-center">
          Don&apos;t have an account yet?
          <Link
            href="/register"
            className="ml-1 text-dark-blue hover:text-blue-500"
          >
            Register for free
          </Link>
        </p>
      </div>
    </>
  );
};

export default LoginForm;
