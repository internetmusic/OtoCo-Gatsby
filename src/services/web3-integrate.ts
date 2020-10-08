import Web3 from 'web3'
import { provider } from 'web3-core'
import Web3Modal from 'web3modal'
import WalletConnectProvider from '@walletconnect/web3-provider'

interface ModalType {
  callModal: () => Promise<boolean>
  disconnect: () => void
  web3Modal: Web3Modal | null
  provider: provider | null
}

const Modal: ModalType = {
  web3Modal: null,
  provider: null,

  callModal: async function (): Promise<boolean> {
    if (!this.web3Modal) {
      const providerOptions = {
        walletconnect: {
          package: WalletConnectProvider, // required
          options: {
            infuraId: 'f2e6a40391274a0793c63e923de0a170', // required
          },
        },
      }

      this.web3Modal = new Web3Modal({
        // network: "kovan", // optional
        cacheProvider: false, // optional
        providerOptions, // required
        theme: 'dark',
      })
    }

    this.provider = await this.web3Modal.connect()
    //console.log(this.provider);
    const web3 = new Web3(this.provider)
    window.web3 = web3

    // if (this.provider.isAuthereum) this.provider.authereum.showWidget();
    // else if (this.provider.isUniLogin) web3.currentProvider.callModal = this.provider.boundOpenDashboard;
    // else web3.currentProvider.callModal = undefined;
    return true
  },
  disconnect: function (): void {
    if (this.web3Modal) this.web3Modal.clearCachedProvider()
    this.provider = null
    window.web3 = undefined
  },
}

export default Modal
