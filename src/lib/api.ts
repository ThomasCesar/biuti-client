/**
 * export base urls used in the app to fetch static stuff
*/
export const BASE_URL_API = `http://localhost:3000/`;
export const BASE_URL_UPLOADS = `${BASE_URL_API}uploads/`;
/**
 * ---------------------------------------------
 * Build a formData from an object
 */
export function buildFormData(theObject: Record<string, string | File | number | string[] | number[]>): FormData {
  const formData = new FormData();
  for (const [key, value] of Object.entries(theObject)) {
    if (Array.isArray(value)) {
      for (const item of value) {
        formData.append(`${key}[]`, String(item));
      }
    }
    else {
      formData.append(key, typeof value === 'number' ? String(value) : value);
    }
  }
  return formData;
}
/**
 * ---------------------------------------------
 * Make a get request
 */
export async function apiGETRequest<T>(uri: string): Promise<T> {
  const response = await fetch(`${BASE_URL_API}${uri}`);
  return await response.json();
}
/**
 * --------------------------------------------
 * make a post request
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
 */
export async function apiDELETERequest(uri: string): Promise<boolean> {
  const response = await fetch(`${BASE_URL_API}${uri}`, { method: 'DELETE' });
  return await response.json();
}
