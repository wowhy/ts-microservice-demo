import { fetchUtils } from 'react-admin'
export async function request(
  method: 'GET' | 'POST' | 'PUT' | 'DELETE',
  url: string,
  data?: any
): Promise<any> {
  try {
    const { json } = await fetchUtils.fetchJson(url, {
      method,
      body: JSON.stringify(data)
    })
    return json
  } catch (ex) {
    if (ex.status === 400) {
      if (ex.body && Array.isArray(ex.body.message)) {
        const message = ex.body.message[0]
        if (message && message.constraints) {
          throw new Error(message.constraints[Object.keys(message.constraints)[0]])
        } else {
          throw new Error(message || ex.error)
        }
      }
    }

    throw ex
  }
}
