import type { UseFetchOptions } from "nuxt/app";

function cleanUrl(url: string) {
  var cleanedUrl = url.replaceAll(/\s+/g, "-").replaceAll(/(\/+|\\+)/g, "/");

  return cleanedUrl.replace("http:/", "http://").replace("https:/", "https://");
}

const useGympass = async (url: string, reqOptions?: any) => {
  const baseURL = useRuntimeConfig().public.apiURL;

  const requestURL = cleanUrl(`${baseURL}/${url}`);

  return await $fetch(requestURL, {
    ...reqOptions,
  });
};

export default useGympass;
