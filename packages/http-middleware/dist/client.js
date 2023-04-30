import axios from 'axios'
import qs from 'qs'

export async function getResponse(url, headers) {
  const response = await axios.get(url, { headers })
  const result = response.data
  return result || ''
}

// Use only if you need query parsing with qs otherwise use postData method below
export async function postResponse(url, body, headerOptions, authOptions) {
  let config = {
    headers: headerOptions,
  }
  if (authOptions) {
    config = { ...config, auth: authOptions }
  }
  try {
    const data = qs.stringify(body)
    const response = await axios.post(url, data, config)
    const result = response.data
    return result || ''
  } catch (e) {
    return e
  }
}

export async function postData(config) {
  try {
    let response = await axios(config)
    response = JSON.stringify(response.data)
    return response
  } catch (e) {
    return e
  }
}
