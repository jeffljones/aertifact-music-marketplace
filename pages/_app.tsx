import React from 'react'
import type { AppProps } from 'next/app'
import { RainbowKitProvider, getDefaultWallets } from '@rainbow-me/rainbowkit'
import { configureChains, createConfig, WagmiConfig } from 'wagmi'
import { mainnet, polygon, optimism, arbitrum } from 'wagmi/chains'
import { publicProvider } from 'wagmi/providers/public'
import '@rainbow-me/rainbowkit/styles.css'
import Navbar from '../components/Navbar'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { Web3Provider } from '../context/Web3Context'

// Create a client
const queryClient = new QueryClient()

// Configure chains and providers
const { chains, publicClient } = configureChains(
  [mainnet, polygon, optimism, arbitrum],
  [publicProvider()]
)

// Set up wallets
const { connectors } = getDefaultWallets({
  appName: 'Aertifact Music Marketplace',
  projectId: process.env.NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID || '',
  chains
})

// Create wagmi config
const wagmiConfig = createConfig({
  autoConnect: true,
  connectors,
  publicClient
})

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <WagmiConfig config={wagmiConfig}>
        <RainbowKitProvider chains={chains}>
          <Web3Provider>
            <Navbar />
            <Component {...pageProps} />
          </Web3Provider>
        </RainbowKitProvider>
      </WagmiConfig>
    </QueryClientProvider>
  )
}

export default MyApp 