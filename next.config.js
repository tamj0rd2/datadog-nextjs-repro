const ENV_VARS = [
  'RUM_APP_ID',
  'RUM_CLIENT_TOKEN'
]

module.exports = {
  env: ENV_VARS.reduce(
    (accum, name) => {
      const val = process.env[name]
      if (!val || val === 'null') throw new Error(`Environment variable '${name}' is missing`)
      return { ...accum, [name]: val }
    },
    {}
  ),
  productionBrowserSourceMaps: true,
}