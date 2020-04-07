import { store } from './store'
import { actions as errorActions } from './actions/errors'

// TODO: enumerate errors in CAL and handle here.
const errorMap = {
  'Unable to claim interface.': 'Ledger is unable to connect. Please unlock the device; exit the current account on your device; enter into the desired account and retry connecting.',
  'Ledger device: INS_NOT_SUPPORTED (0x6d00)': 'Ledger is connected to a different account. Please navigate to the correct account on your device.',
  'Ledger device: Incorrect length (0x6700)': 'Ledger is unable to connect. Please navigate to the correct account on your device.',
  'Ledger device: Security not satisfied': 'Ledger is unable to connect. Please unlock your device, navigate to the correct account, and try connecting again.',
  'Ledger device: Condition of use not satisfied': 'Ledger is unable to connect. Please unlock your device, navigate to the correct account, and try connecting again.',
  'Ledger Device is busy': 'Ledger is unable to connect. Please exit the current account on your device; enter into the desired account and retry connecting.',
  'A transfer error has occured': 'Ledger is unable to swap. Please reconnect your device, enter into the desired account and retry.',
  'Internal error, please report': 'Ledger is unable to swap. Please reconnect your device, enter into the desired account and retry.',
  'Transaction amount does not cover fee': 'Transaction amount does not cover fee. Please increase the transaction amount',
  'Not enough balance': 'Not enough balance on your selected wallet. Please connect a different wallet or top up your balance.',
  'Please enable Contract data on the Ethereum app settings': `Ledger unable to claim. Please go to your Ethereum app setting on your Ledger device and allow ‘Contract Data’`,
  'insufficient funds for gas': 'Insufficient funds for gas. Please make sure you have enough eth in your selected wallet to cover gas costs.',
  'Request failed with status code 401. Insufficient balance': 'Trade partner does not have enough balance to swap. Please reduce the amount.',
  'MetaMask Tx Signature: User denied transaction signature.': 'To proceed, please retry and sign the transaction on MetaMask',
  'MetaMask Message Signature: User denied message signature.': 'To proceed with the swap, please retry and sign the message on MetaMask'
}

function errorHandler (e) {
  if (e instanceof Error) {
    console.log(e.message)
    const errorMapping = Object.keys(errorMap).find(err => e.message.includes(err))
    if (errorMapping) {
      e.name = ''
      e.message = errorMap[errorMapping]
    }
    store.dispatch(errorActions.setError(e))
  } else {
    throw e
  }
}

export default errorHandler
