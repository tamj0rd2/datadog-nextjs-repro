import { datadogRum, RumErrorEvent } from "@datadog/browser-rum"
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
  beforeSend: (e) => {
    // we don't send console errors to datadog because they don't get source mapped correctly
    const isConsoleErrorEvent = e.type === 'error' && (e as RumErrorEvent).error.source === 'console'
    if (isConsoleErrorEvent) return false
  }
})

class ErrorBoundary extends React.Component<{}, { hasError: boolean }> {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    // Update state so the next render will show the fallback UI.
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    datadogRum.addError(error, errorInfo, 'custom')
  }

  render() {
    if (this.state.hasError) {
      return (
        <main>
          <h1>Something went wrong.</h1>
          <a href="/">Back to home</a>
        </main>
      )
    }

    return this.props.children; 
  }
}


const CustomApp = ({ Component, pageProps}: AppProps): JSX.Element => {
  return <ErrorBoundary><Component {...pageProps} /></ErrorBoundary>
}

export default CustomApp
