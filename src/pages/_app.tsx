import { datadogRum } from "@datadog/browser-rum"
import { AppProps } from "next/app"
import React from "react";

datadogRum.init({
  site: 'datadoghq.com',
  applicationId: process.env.RUM_APP_ID,
  clientToken: process.env.RUM_CLIENT_TOKEN,
  service: 'rum-test',
  // Specify a version number to\ identify the deployed version of your application in Datadog
  version: '1.0.0',
  sampleRate: 100,
  trackInteractions: true,
})

const CustomApp = ({ Component, pageProps}: AppProps): JSX.Element => {
  return <Component {...pageProps} />
}

export default CustomApp
