import { ref, Ref } from "vue";
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function useRequest<T>(service: (...rest: any[]) => Promise<T>): {
  data: Ref<T>;
  loading: Ref<boolean>;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  error: Ref<any>;
};
function useRequest<T, U>(
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  service: (...rest: any[]) => Promise<T>,
  options: {
    formateResult: (data: T) => U;
  }
): {
  data: Ref<T>;
  loading: Ref<boolean>;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  error: Ref<any>;
};
function useRequest<T, U>(
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  service: (...rest: any[]) => Promise<T>,
  options?: {
    formateResult: (data: T) => U;
  }
) {
  const data = ref<T | U>();
  const loading = ref(true);
  const error = ref<unknown>();
  service()
    .then((response) => {
      if (options?.formateResult) {
        data.value = options.formateResult?.(response);
      } else {
        data.value = response;
      }
    })
    .catch((error) => console.log(error))
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    .finally(() => {});
  return { data, loading, error };
}
export default useRequest;

const { data } = useRequest(
  () =>
    Promise.resolve({
      config: {},
      data: {
        code: 200,
        result: [1, 2, 3],
      },
    }),
  {
    formateResult(data) {
      return data.data.result;
    },
  }
);
//() => axios.get()
