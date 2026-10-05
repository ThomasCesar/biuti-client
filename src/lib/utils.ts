export { cn } from "cn"

const BASE_URL = 'http://localhost:3000';

/**
 * ---------------------------------------------
 * Make a get request
 * 
 * @param uri 
 * @returns 
 */
export async function apiGETRequest<T>(uri: string): Promise<T> {
  const response = await fetch(`${BASE_URL}/${uri}`);
  return await response.json();
}
/**
 * ---------------------------------------------
 * Make a delete request
 * 
 * @param uri 
 * @returns 
 */
export async function apiDELETERequest(uri: string): Promise<boolean> {
  const response = await fetch(`${BASE_URL}/${uri}`, { method: 'DELETE' });
  return await response.json();
}
/**
 * --------------------------------------------
 * make a post request
 * 
 * @param uri 
 * @param body 
 * @returns 
 */
export async function apiPOSTRequest<T>(uri: string, body: Object): Promise<T> {
  const response = await fetch(
    `${BASE_URL}/${uri}`,
    {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(body)
    }
  );
  return await response.json();
}