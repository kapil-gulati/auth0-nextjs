import ShortUniqueId from 'short-unique-id'
import { v4 as uuidv4 } from 'uuid'
import { getAccessToken, withApiAuthRequired } from '@auth0/nextjs-auth0';

export function generateCustomerNumber(locale, env) {
  let customerNumber
  const uid = new ShortUniqueId({ dictionary: 'alphanum_upper' })
  if (locale === 'en-GB') {
    if (env === 'dev') {
      customerNumber = uid.randomUUID(8)
      customerNumber = `91${customerNumber}`
      return customerNumber
    }
    if (env === 'qa') {
      customerNumber = uid.randomUUID(8)
      customerNumber = `92${customerNumber}`
      return customerNumber
    }
    if (env === 'stage') {
      customerNumber = uid.randomUUID(8)
      customerNumber = `93${customerNumber}`
      return customerNumber
    }
    const firstDigit = Math.floor(Math.random() * 9)
    customerNumber = uid.randomUUID(8)
    customerNumber = `${firstDigit}${customerNumber}`
  }
  return customerNumber
}

export default withApiAuthRequired(async function shows(req, res) {
  try {
    const { accessToken } = await getAccessToken(req, res, {
      scopes: ['read:shows']
    });
    const apiPort = process.env.API_PORT || 3101;
    const response = await fetch(`http://localhost:${apiPort}/api/shows`, {
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    });
    const shows = await response.json();
    const userId = uuidv4()

    console.log(generateCustomerNumber('en-GB', 'prod'))
    console.log(userId)

    // const response4 = await fetch(`http://localhost:4000/api/private`, {
    //   headers: {
    //     Authorization: `Bearer ${accessToken}`
    //   }
    // });
    //console.log(response4)

    res.status(200).json(shows);
  } catch (error) {
    res.status(error.status || 500).json({ error: error.message });
  }
});
