/** @type {import("snowpack").SnowpackUserConfig } */
export default {
  mount: {
    public: { url: '/', static: true },
    src: { url: '/dist' }
  },
  plugins: [
    '@snowpack/plugin-react-refresh',
    '@snowpack/plugin-sass',
    '@snowpack/plugin-babel',
    // ['@snowpack/plugin-dotenv', { dir: '../' }],
    [
      '@snowpack/plugin-typescript',
      {
        ...(process.versions.pnp ? { tsc: 'yarn pnpify tsc' } : {})
      }
    ]
  ],
  packageOptions: {
    knownEntrypoints: ['react/jsx-runtime']
  },
  routes: [
    { match: 'all', src: '/api/.*', dest: (req, res) => proxy.web(req, res) },
    { match: 'routes', src: '.*', dest: '/index.html' }
  ],
  optimize: {
    bundle: true,
    minify: true,
    treeshake: true,
    target: 'es2020'
  },
  presets: [
    '@babel/preset-typescript',
    ['@babel/preset-react', { runtime: 'automatic' }], // 👈 this is important
    [
      '@babel/preset-env',
      { targets: { esmodules: true }, bugfixes: true, modules: false }
    ]
  ],
  buildOptions: {
    clean: true
  }
};
