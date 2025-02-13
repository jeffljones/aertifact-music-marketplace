import React from 'react'
import { ConnectButton } from '@rainbow-me/rainbowkit'
import { useWeb3 } from '../context/Web3Context'
import { useBalance } from 'wagmi'
import styles from './Navbar.module.css'

const Navbar = () => {
  const { address, isConnected } = useWeb3()
  const { data: balance } = useBalance({
    address: address as `0x${string}`,
  })

  return (
    <nav className={styles.navbar}>
      <div className={styles.logo}>
        <h1>My dApp</h1>
      </div>
      <div className={styles.walletInfo}>
        {isConnected && address && (
          <div className={styles.userInfo}>
            <span className={styles.address}>
              {address.slice(0, 6)}...{address.slice(-4)}
            </span>
            {balance && (
              <span className={styles.balance}>
                {parseFloat(balance.formatted).toFixed(4)} {balance.symbol}
              </span>
            )}
          </div>
        )}
        <div className={styles.connectButton}>
          <ConnectButton 
            showBalance={true}
            chainStatus="icon"
          />
        </div>
      </div>
    </nav>
  )
}

export default Navbar 