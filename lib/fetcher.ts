export const fetcherSWR = (...args: [any]) => fetch(...args).then((res) => res.json());

// dynamic fetch
export const fetcher = (url: string, data = undefined, method = 'GET') =>
  fetch(window.location.origin + url, {
    method: method,
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  }).then((r) => r.json());
