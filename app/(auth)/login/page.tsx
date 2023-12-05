import TransitionEffect from '@/components/TransitionEffect';
import Image from 'next/image';
import Container from '../../../components/login/Container';
import FormWrap from '../../../components/login/FormWrap';
import OwwiFigure from '../../../public/img/Owwi_figure.png';
import LoginForm from './LoginForm';

const Page = async ({ searchParams }: { searchParams: Record<string, string> }) => {
  const animated = Buffer.from(Object.keys(searchParams)[0] || '', 'hex').toString('utf-8') === 'animation=true';

  console.log({ searchParams });
  return (
    <>
      {animated && <TransitionEffect />}
      <div className="min-h-screen bg-owwi-pattern bg-cover bg-no-repeat flex-grow flex items-center p-2 md:p-6">
        {}
        <Container custom="w-[1426px] h-[749px]">
          <div className="grid xl:grid-cols-2 gap-2 h-full relative">
            <FormWrap custom="px-6 md:px-12">
              <LoginForm />
            </FormWrap>

            <div className="xl:grid grid-cols-3 relative hidden">
              <div className="">
                <Image
                  src={OwwiFigure}
                  alt="owwi"
                  width={700}
                  height={700}
                  className="absolute left-[-100px] xl:top-12"
                />
              </div>
              <div className="bg-light-blue rounded-[40px] col-span-2 " />
            </div>
          </div>
        </Container>
      </div>
    </>
  );
};

export default Page;
