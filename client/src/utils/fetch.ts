type Method = "GET" | "POST" | "PUT" | "DELETE";

export async function fetchApi<T = any>({
  path,
  body,
  mockData,
  method,
}: {
  path: string;
  method?: Method;
  body?: any;
  mockData?: T;
}): Promise<{data: T, resp: Response}> {
  const options = {
    method: method || "POST",
    headers: {
      "Content-Type": "application/json; charset=UTF-8",
    },
    body: JSON.stringify(body),
  };

  //   if (isEnvBrowser() && mockData) return mockData;

  const resp = await fetch(`${path}`, options);

  const data = await resp.json();

  return {data, resp};
}
