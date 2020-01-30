import { LitElement, html, css } from 'lit-element';
import '../components/aspen-meta-input'

class IndexPage extends LitElement {

  validateInput () {
    let inputField = this.shadowRoot.getElementById('geneID')
    let isValid = inputField.validateInput()
    if (isValid) alert('The input is valid')
    else alert('The input is invalid')
  }

  render() {
    return html`
      <label>GeneID </label>
      <aspen-meta-input
        id="geneID" 
        validate
        metaUrl="https://www.ebi.ac.uk/proteins/api/proteins/P04629" 
        fieldPath="protein.recommendedName.fullName.value" 
        detailUrl="http://www.ncbi.nlm.nih.gov/pubmed/1281417"
      ></aspen-meta-input>
      <button 
        @click="${this.validateInput}"
      > 
        Validate 
      </button>      
    `
  }
}

window.customElements.define('index-page', IndexPage);
