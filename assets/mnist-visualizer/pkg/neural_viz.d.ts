/* tslint:disable */
/* eslint-disable */

export function start(): void;

export type InitInput = RequestInfo | URL | Response | BufferSource | WebAssembly.Module;

export interface InitOutput {
  readonly memory: WebAssembly.Memory;
  readonly start: () => void;
  readonly wasm_bindgen__convert__closures_____invoke__he283893dc3e947b3: (a: number, b: number) => void;
  readonly wasm_bindgen__closure__destroy__h211c6d7f2eb15592: (a: number, b: number) => void;
  readonly wasm_bindgen__convert__closures_____invoke__h5e94c8df083a12e4: (a: number, b: number, c: any) => void;
  readonly wasm_bindgen__convert__closures_____invoke__h9efbcc4b940797ad: (a: number, b: number, c: any) => void;
  readonly wasm_bindgen__closure__destroy__h7d0fb7af338d42f6: (a: number, b: number) => void;
  readonly wasm_bindgen__convert__closures_____invoke__h7c26951e702f6a7c: (a: number, b: number, c: any) => void;
  readonly wasm_bindgen__closure__destroy__h681f1504d3292b54: (a: number, b: number) => void;
  readonly __wbindgen_malloc: (a: number, b: number) => number;
  readonly __wbindgen_realloc: (a: number, b: number, c: number, d: number) => number;
  readonly __wbindgen_exn_store: (a: number) => void;
  readonly __externref_table_alloc: () => number;
  readonly __wbindgen_externrefs: WebAssembly.Table;
  readonly __wbindgen_start: () => void;
}

export type SyncInitInput = BufferSource | WebAssembly.Module;

/**
* Instantiates the given `module`, which can either be bytes or
* a precompiled `WebAssembly.Module`.
*
* @param {{ module: SyncInitInput }} module - Passing `SyncInitInput` directly is deprecated.
*
* @returns {InitOutput}
*/
export function initSync(module: { module: SyncInitInput } | SyncInitInput): InitOutput;

/**
* If `module_or_path` is {RequestInfo} or {URL}, makes a request and
* for everything else, calls `WebAssembly.instantiate` directly.
*
* @param {{ module_or_path: InitInput | Promise<InitInput> }} module_or_path - Passing `InitInput` directly is deprecated.
*
* @returns {Promise<InitOutput>}
*/
export default function __wbg_init (module_or_path?: { module_or_path: InitInput | Promise<InitInput> } | InitInput | Promise<InitInput>): Promise<InitOutput>;
