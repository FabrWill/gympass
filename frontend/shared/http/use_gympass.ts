import type { UseFetchOptions } from "nuxt/app";

function cleanUrl(url: string) {
  var cleanedUrl = url.replace(/\s+/g, "-").replace(/\/\//g, "/");

  return cleanedUrl.replace("http:/", "http://").replace("https:/", "https://");
}

const useGympass = (url: string, options?: UseFetchOptions<any>) => {
  const baseURL = useRuntimeConfig().public.apiURL;

  const requestURL = cleanUrl(`${baseURL}/${url}`);

  return useFetch(requestURL, {
    onRequest({ request, options }) {
      options.headers = options.headers || {};
    },
    onRequestError({ request, options, error }) {
      const toast = useToast();

      toast.add({ title: "An error has ocurred" });
      console.log(request, error, options);
    },
    onResponse({ request, response, options }) {
      localStorage.setItem("token", response._data.token);
    },
    onResponseError({ request, response, options }) {},
    ...options,
  });
};

export default useGympass;
