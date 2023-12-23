type HTTPMethod = "GET" | "PUT" | "POST" | "PATCH" | "DELETE";

type ApiRequest<Data, Method extends HTTPMethod = "GET"> = {
  data: Data;
  method: Method;
};

type TSConfig<Config = { strict: true }> = Config;

// Tests

// type test_ApiRequest_explicitPost = Expect<
//   Equal<ApiRequest<string, "POST">, { data: string; method: "POST" }>
// >;

// type test_ApiRequest_implicitGet = Expect<
//   Equal<ApiRequest<number>, { data: number; method: "GET" }>
// >;

// type test_TSConfig_default = Expect<Equal<TSConfig, { strict: true }>>;

// type test_TSConfig_true = Expect<
//   Equal<TSConfig<{ strict: true }>, { strict: true }>
// >;

// type test_TSConfig_false = Expect<
//   Equal<TSConfig<{ strict: false }>, { strict: false }>
// >;

// type test_TSConfig_boolean = Expect<
//   Equal<TSConfig<{ strict: boolean }>, { strict: boolean }>
// >;
