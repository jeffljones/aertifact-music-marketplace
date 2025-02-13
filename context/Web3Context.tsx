import React, { createContext, useContext, useState, useEffect } from 'react'
import { useAccount } from 'wagmi'

interface Web3ContextType {
  address: string | undefined
  isConnected: boolean
}

const Web3Context = createContext<Web3ContextType>({
  address: undefined,
  isConnected: false
})

export function Web3Provider({ children }: { children: React.ReactNode }) {
  const { address, isConnected } = useAccount()
  const [walletAddress, setWalletAddress] = useState<string | undefined>(undefined)

  useEffect(() => {
    setWalletAddress(address)
  }, [address, isConnected])

  return (
    <Web3Context.Provider value={{ address: walletAddress, isConnected }}>
      {children}
    </Web3Context.Provider>
  )
}

export function useWeb3() {
  return useContext(Web3Context)
} 