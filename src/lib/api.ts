/**
 * export base urls used in the app to fetch static stuff
*/
export const BASE_URL_API = `http://localhost:3000/`;
export const BASE_URL_UPLOADS = `${BASE_URL_API}uploads/`;
/**
 * ---------------------------------------------
 * Make a get request
 * 
 * @param uri 
 * @returns 
 */
export async function apiGETRequest<T>(uri: string): Promise<T> {
  const response = await fetch(`${BASE_URL_API}${uri}`);
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
export async function apiPOSTRequest<T>(uri: string, body: FormData): Promise<T> {
  const response = await fetch(
    `${BASE_URL_API}${uri}`,
    {
      method: 'POST',
      body: body
    }
  );
  return await response.json();

}
/**
 * ---------------------------------------------
 * make a patch request
 * 
 * @param uri 
 * @param body 
 * @returns 
 */
export async function apiPATCHRequest<T>(uri: string, body: FormData): Promise<T> {
  const response = await fetch(
    `${BASE_URL_API}${uri}`,
    {
      method: 'PATCH',
      body: body
    }
  );
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
  const response = await fetch(`${BASE_URL_API}${uri}`, { method: 'DELETE' });
  return await response.json();
}
