/**
 * export base urls used in the app to fetch static stuff
*/
export const BASE_URL_API = `http://localhost:3000/`;
export const BASE_URL_UPLOADS = `${BASE_URL_API}uploads/`;
/**
 * the type returned by an API call
 */
type ApiResponse<T> = { success: true, result: T } | { success: false, error: string }
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
export async function apiGETRequest<T>(uri: string): Promise<ApiResponse<T>> {
  const response = await fetch(
    `${BASE_URL_API}${uri}`,
    { credentials: 'include' }
  );
  return await response.json();
}
/**
 * --------------------------------------------
 * make a post request
 */
export async function apiPOSTRequest<T>(uri: string, body: FormData): Promise<ApiResponse<T>> {
  const response = await fetch(
    `${BASE_URL_API}${uri}`,
    {
      method: 'POST',
      body: body,
      credentials: "include"
    }
  );
  return await response.json();

}
/**
 * ---------------------------------------------
 * make a patch request
 */
export async function apiPATCHRequest<T>(uri: string, body: FormData): Promise<ApiResponse<T>> {
  const response = await fetch(
    `${BASE_URL_API}${uri}`,
    {
      method: 'PATCH',
      body: body,
      credentials: "include"
    }
  );
  return await response.json();
}
/**
 * ---------------------------------------------
 * Make a delete request
 */
export async function apiDELETERequest(uri: string): Promise<ApiResponse<boolean>> {
  const response = await fetch(
    `${BASE_URL_API}${uri}`,
    { method: 'DELETE', credentials: "include" }
  );
  return await response.json();
}
