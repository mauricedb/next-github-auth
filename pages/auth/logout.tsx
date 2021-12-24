import { GetServerSideProps, NextPage } from 'next';
import cookie from 'cookie';

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const authCookie = cookie.serialize('auth', '', {
    maxAge: -1,
    httpOnly: true,
    path: '/',
    sameSite: 'strict',
    secure: process.env.NODE_ENV === 'production',
  });

  ctx.res.setHeader('Set-Cookie', authCookie);

  return {
    redirect: {
      destination: '/',
      permanent: false,
    },
  };
};

const Logout: NextPage = () => null;

export default Logout;
