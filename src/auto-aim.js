import { Webbit, html, css } from '@webbitjs/webbit';
import '@vaadin/vaadin-button';

class AutoAim extends Webbit {

  static get styles() {
    return css`
      :host {
        display: inline-block;
        font-size: 15px;
        display: flex;
        flex-direction: row;
        height: 100px;
        width: 300px;
      }
      vaadin-button {
        border-radius: 0;
        margin: 0;
        flex: 1;
        font-size: inherit;
        text-transform: capitalize;
        height: 100%;
        font-family: Sans-Serif;
      }
    `;
  }

  static get properties() {
    return {
      value: { type: Boolean, primary: true }
    };
  }

  constructor() {
    super();
    this.value = true;
  }

  setValue(value) {
    this.value = value;
  }

  render() {
    return html`   
      <vaadin-button 
        theme="contrast ${this.value == true ? 'primary' : ''}"
        @click="${() => this.setValue(true)}">Auto</vaadin-button>
        
        <vaadin-button 
        theme="contrast ${this.value == false ? 'primary' : ''}"
        @click="${() => this.setValue(false)}">Manual</vaadin-button>
    `;
  }
}

webbitRegistry.define('auto-aim', AutoAim);