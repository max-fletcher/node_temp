import ShortUniqueId from 'short-unique-id';

const generateId = () => {
  const uId = new ShortUniqueId({ length: 10 });
  const id = uId.rnd();
  return id;
};

export function createUserId() {
  return `usr_${generateId()}`;
}

export function createAdminUserId() {
  return `adm_${generateId()}`;
}

export function createTiersId() {
  return `tier_${generateId()}`;
}

export function createUserBalanceId() {
  return `usrb_${generateId()}`;
}

export function generateOtp() {
  return Math.floor(100000 + Math.random() * 900000).toString();
}