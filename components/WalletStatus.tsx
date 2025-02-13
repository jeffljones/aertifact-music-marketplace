import React from 'react'
import { useWeb3 } from '../context/Web3Context'
import { useDisconnect } from 'wagmi'

const WalletStatus = () => {
  const { address, isConnected } = useWeb3()
  const { disconnect } = useDisconnect()

  return (
    <div className="p-4 m-4 border rounded">
      <h2 className="text-xl font-bold mb-2">Wallet Status</h2>
      <div>
        <p>Connection Status: {isConnected ? '🟢 Connected' : '🔴 Disconnected'}</p>
        {address && (
          <>
            <p>Wallet Address: {address}</p>
            <button 
              onClick={() => disconnect()}
              className="mt-2 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
            >
              Disconnect Wallet
            </button>
          </>
        )}
      </div>
    </div>
  )
}

export default WalletStatus 