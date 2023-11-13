import Image from 'next/image';
import Container from '../ui/components/Container';
import FormWrap from '../ui/components/FormWrap';
import RegisterForm from './register/RegisterForm';
import OwwiFigure from '../public/img/Owwi_figure.png';

export default function Home() {
  return (
    <div className="bg-owwi-pattern bg-cover bg-no-repeat flex-grow flex items-center p-12">
      <Container>
        <div className="grid xl:grid-cols-2 gap-2 h-full relative">
          <FormWrap>
            <RegisterForm />
          </FormWrap>
          <Image
            src={OwwiFigure}
            alt="owwi"
            width={70}
            height={70}
            className="absolute right-0 xl:hidden"
          />
          <div className="xl:grid grid-cols-3 relative hidden">
            <div className="">
              <Image
                src={OwwiFigure}
                alt="owwi"
                width={800}
                height={800}
                className="absolute left-[-100px] xl:top-12"
              />
            </div>
            <div className="bg-light-blue rounded-[40px] col-span-2 " />
          </div>
        </div>
      </Container>
    </div>
  );
}
