import request from '@/utils/request';

export async function postQuery(resource, params) {

  console.log(resource)
  return request(
    `/api/${resource}`,
    {
      method: 'POST',
      data: params,
      headers: {
        Authorization: ``
      }
    },
  );
}