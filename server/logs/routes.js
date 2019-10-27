const root = '/opim-api/v1';

const route = {
  signup: `${root}/auth/signup`,
  signin: `${root}/auth/signin`,
  emailverification: `${root}/auth/email-verification/?token=`

};

export default route;
