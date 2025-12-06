# numbers-browser

A WASM-based UI for browsing the MNIST digit dataset.

## Building

Requires [wasm-pack](https://rustwasm.github.io/wasm-pack/installer/):

```bash
cargo install wasm-pack
```

Build the WASM package:

```bash
wasm-pack build --target web --out-dir www/pkg
```

## Running

Serve the `www` directory with any HTTP server:

```bash
cd www
python3 -m http.server 8080
```

Then open http://localhost:8080

## Usage

- **Scroll** to zoom in/out
- **Drag** to pan
- **Hover** over a digit to see its label
