/* tslint:disable */
/* eslint-disable */

export class LMMetrics {
  free(): void;
  [Symbol.dispose](): void;
  /**
   * Get training loss
   */
  train_loss(): number;
  /**
   * Update validation metrics
   */
  update_val(loss: number): void;
  /**
   * Set training start time
   */
  start_timer(time_ms: number): void;
  /**
   * Format FLOPS with appropriate unit suffix
   */
  static format_flops(flops: number): string;
  /**
   * Update metrics from a training step
   */
  update_train(step: number, loss: number, learning_rate: number, tokens: number): void;
  /**
   * Get learning rate
   */
  learning_rate(): number;
  /**
   * Get progress in current epoch (0.0 - 1.0)
   */
  epoch_progress(): number;
  /**
   * Get validation perplexity
   */
  val_perplexity(): number;
  /**
   * Get FLOPs per second (compute throughput)
   */
  flops_per_second(current_time_ms: number): number;
  /**
   * Get tokens processed
   */
  tokens_processed(): number;
  /**
   * Get training perplexity
   */
  train_perplexity(): number;
  /**
   * Get loss history as JSON for JavaScript charting
   */
  loss_history_json(): string;
  /**
   * Get tokens per second (throughput)
   */
  tokens_per_second(current_time_ms: number): number;
  /**
   * Set FLOPs per training step
   */
  set_flops_per_step(flops: number): void;
  /**
   * Get validation loss history as JSON
   */
  val_loss_history_json(): string;
  /**
   * Create new metrics instance
   */
  constructor();
  /**
   * Get current step
   */
  step(): number;
  /**
   * Get current epoch
   */
  epoch(): number;
  /**
   * Reset metrics
   */
  reset(): void;
  /**
   * Get validation loss
   */
  val_loss(): number;
  /**
   * Update epoch information
   */
  set_epoch(epoch: number, steps_per_epoch: number): void;
}

export class TokenProb {
  private constructor();
  free(): void;
  [Symbol.dispose](): void;
  /**
   * Get token ID
   */
  id(): number;
  /**
   * Get probability
   */
  prob(): number;
  /**
   * Get token text
   */
  text(): string;
}

/**
 * Initialize the visualization app
 */
export function start(): void;

export type InitInput = RequestInfo | URL | Response | BufferSource | WebAssembly.Module;

export interface InitOutput {
  readonly memory: WebAssembly.Memory;
  readonly __wbg_lmmetrics_free: (a: number, b: number) => void;
  readonly lmmetrics_epoch: (a: number) => number;
  readonly lmmetrics_epoch_progress: (a: number) => number;
  readonly lmmetrics_flops_per_second: (a: number, b: number) => number;
  readonly lmmetrics_format_flops: (a: number) => [number, number];
  readonly lmmetrics_learning_rate: (a: number) => number;
  readonly lmmetrics_loss_history_json: (a: number) => [number, number];
  readonly lmmetrics_new: () => number;
  readonly lmmetrics_reset: (a: number) => void;
  readonly lmmetrics_set_epoch: (a: number, b: number, c: number) => void;
  readonly lmmetrics_set_flops_per_step: (a: number, b: number) => void;
  readonly lmmetrics_start_timer: (a: number, b: number) => void;
  readonly lmmetrics_step: (a: number) => number;
  readonly lmmetrics_tokens_per_second: (a: number, b: number) => number;
  readonly lmmetrics_tokens_processed: (a: number) => number;
  readonly lmmetrics_train_loss: (a: number) => number;
  readonly lmmetrics_train_perplexity: (a: number) => number;
  readonly lmmetrics_update_train: (a: number, b: number, c: number, d: number, e: number) => void;
  readonly lmmetrics_update_val: (a: number, b: number) => void;
  readonly lmmetrics_val_loss: (a: number) => number;
  readonly lmmetrics_val_loss_history_json: (a: number) => [number, number];
  readonly lmmetrics_val_perplexity: (a: number) => number;
  readonly start: () => void;
  readonly __wbg_tokenprob_free: (a: number, b: number) => void;
  readonly tokenprob_id: (a: number) => number;
  readonly tokenprob_prob: (a: number) => number;
  readonly tokenprob_text: (a: number) => [number, number];
  readonly wasm_bindgen__convert__closures_____invoke__h1fc26d4bc1559e26: (a: number, b: number) => void;
  readonly wasm_bindgen__closure__destroy__h4ca2343935473c97: (a: number, b: number) => void;
  readonly wasm_bindgen__convert__closures_____invoke__h36e18218b8010af8: (a: number, b: number, c: any) => void;
  readonly wasm_bindgen__convert__closures_____invoke__h6704984b19d5933d: (a: number, b: number, c: any) => void;
  readonly wasm_bindgen__convert__closures_____invoke__h9efbcc4b940797ad: (a: number, b: number, c: any) => void;
  readonly wasm_bindgen__closure__destroy__h7d0fb7af338d42f6: (a: number, b: number) => void;
  readonly wasm_bindgen__convert__closures_____invoke__hd8f361f0f2db1dc8: (a: number, b: number) => void;
  readonly __wbindgen_malloc: (a: number, b: number) => number;
  readonly __wbindgen_realloc: (a: number, b: number, c: number, d: number) => number;
  readonly __wbindgen_exn_store: (a: number) => void;
  readonly __externref_table_alloc: () => number;
  readonly __wbindgen_externrefs: WebAssembly.Table;
  readonly __wbindgen_free: (a: number, b: number, c: number) => void;
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
