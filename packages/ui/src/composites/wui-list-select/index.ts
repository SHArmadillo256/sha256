import { html, LitElement } from 'lit'
import { customElement, property } from 'lit/decorators.js'
import { globalStyles } from '../../utils/ThemeUtil'
import '../../components/wui-text'
import '../wui-wallet-image'
import '../wui-all-wallets-image'
import styles from './styles'
import type { IWalletImage } from '../../utils/TypesUtil'

@customElement('wui-list-select')
export class WuiListSelect extends LitElement {
  public static styles = [globalStyles, styles]

  // -- state & properties ------------------------------------------- //
  @property({ type: Array }) public walletImages?: IWalletImage[] = []

  @property() public imageSrc? = ''

  @property() public name = ''

  @property() public status?: 'installed' | 'qr code' | 'recent'

  @property({ type: Boolean }) public disabled = false

  @property({ type: Boolean }) public showAllWallets = false

  @property() public onClick: (event: PointerEvent) => void = () => null

  // -- render ------------------------------------------------------- //
  public render() {
    const textColor = this.disabled ? 'fg-300' : 'fg-100'

    return html`
      <button ?disabled=${this.disabled} @click=${this.onClick.bind(this)}>
        ${this.templateAllWallets()} ${this.templateWalletImage()}
        <wui-text variant="paragraph-500" color=${textColor}>${this.name}</wui-text>
        ${this.templateStatus()}
      </button>
    `
  }

  private templateAllWallets() {
    if (this.showAllWallets && this.walletImages) {
      return html`<wui-all-wallets-image
        .walletImages=${this.walletImages}
      ></wui-all-wallets-image>`
    }

    return null
  }

  private templateWalletImage() {
    if (!this.showAllWallets && this.imageSrc) {
      return html`<wui-wallet-image
        size="sm"
        src=${this.imageSrc}
        alt=${this.name}
      ></wui-wallet-image>`
    } else if (!this.showAllWallets && !this.imageSrc) {
      return html`<wui-wallet-image size="sm" alt=${this.name}></wui-wallet-image>`
    }

    return null
  }

  private templateStatus() {
    if (this.status) {
      return html` <wui-text variant="micro-700" color="fg-300">${this.status}</wui-text> `
    }

    return null
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'wui-list-select': WuiListSelect
  }
}