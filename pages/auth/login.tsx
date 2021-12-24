import { GetServerSideProps, NextPage } from 'next';
import crypto from 'crypto';
import cookie from 'cookie';

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const state = crypto.randomUUID();

  const authCookie = cookie.serialize('authState', state, {
    maxAge: 60 * 15,
    httpOnly: true,
    path: '/auth/',
    sameSite: 'strict',
    secure: process.env.NODE_ENV === 'production',
  });

  ctx.res.setHeader('Set-Cookie', authCookie);

  return {
    redirect: {
      destination: `https://github.com/login/oauth/authorize?client_id=${process.env.CLIENT_ID}&scope=read:user&state=${state}`,
      permanent: false,
    },
  };
};

const Login: NextPage = () => null;

export default Login;
