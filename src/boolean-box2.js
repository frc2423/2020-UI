
import { Webbit, html, css } from '@webbitjs/webbit';


class BooleanBox extends Webbit {

  static get properties() {
    return {
      color: { type: String, primary: true }
    };
  }

  constructor() {
    super();
    this.color = '';
  }

  render() {
    return html`
      <p>I'm a box!</p>
      <p>Color: ${this.color}</p>
    `;
  }
}

webbitRegistry.define('boolean-box2', BooleanBox);

