import { LitElement, html, css } from 'lit-element';

/**
 * `aspen-meta-input`
 * Convert any component metadata aware.
 *
 * @customElement
 * @polymer
 */
class AspenMetaInput extends LitElement {
  constructor() {
    super();
    this.metaData = 'Loading...';
    this.isLoading = true;
    this.isValid = true
  }

  static get styles() {
    return css`
      :host {
        display: block;
      }
      .meta-wrp {
        display: flex;
        align-items: center 
      }
      .icon {
        padding-left: 0.2em;
        width: var(--icon-width, 16px);
        height: var(--icon-height, 16px);
      }
      ::slotted(input[invalid]) {
        color: red;
        border: 2px solid red;
      }
    `;
  }

  validateInput() {
    return this.isValid;
  }

  firstUpdated() {
    this.fetchAndSetMetaData();
  }

  _handleValueChange(e) {
    this.isValid = this.regex.test(e.target.value);
  }

  /**
   * Fetch meta data from any api provided by user.
   */
  async fetchAndSetMetaData() {
    const response = await this.apiCall(this.metaUrl);
    this.metaData = await this.readValue(response, this.fieldPath);
    this.isLoading = false;

    // if(this.validate && this.metaData.regex) {
    if(this.validate) {
      this.regex = new RegExp('^[a-z]*$');
      this.shadowRoot.querySelector('input').addEventListener('keyup', e => this._handleValueChange(e))
    }
  }

  /**
   * Actual api call.
   * @param { String } uri 
   */
  async apiCall(uri) {
    const res = await fetch(uri);
    return await res.json();
  }

  /**
   * Read data from object, sometime we need to read from nested object too.
   * 
   * @param { Object } response 
   * @param { String } path Path to value in object. 
   */
  readValue(response, path) {
    const properties = path.split('.');
    return properties.reduce((prev, curr) => prev && prev[curr], response);
  }

  /**
   * Open new tab with detail url.
   */
  handleIconClick() {
   this.detailUrl &&
      window.open(this.detailUrl);
  }

  render() {
    return html`
      <input invalid type="text" />
      <img 
      class='icon' 
      src='../assets/images/info-icon.png' 
      @click=${this.handleIconClick} 
      title=${this.metaData} />
      <p>${this.isLoading ? 'Loading..' : ''}</p>
      `
    ;

  }

  static get properties() {
    return { 
      isLoading: { type: Boolean },
      metaUrl: { type: String },
      fieldPath: { type: String },
      metaData: { type: String },
      detailUrl: { type: String },
      validate: { type: Boolean },
      regex: { type: String },
      isValid: { type: Boolean }
    };
  }
}

window.customElements.define('aspen-meta-input', AspenMetaInput);
