import "@webbitjs/frc";
import { addSourceProvider, getSourceProvider } from "@webbitjs/store";
import { html, css, LitElement } from 'lit-element';
import './boolean-box2';
import './control-panel';
import './ball-counter';
import './gear-shift';
import '@vaadin/vaadin';

addSourceProvider('NetworkTables', 'NetworkTables');

class UI extends LitElement {

  static get styles() {
    return css`
      :host{
      display: flex;
      height: 100%;
      width: 100%;
      position: relative;
      }
      control-panel {
        width: 500px;
      }
      .controllbuttons {
        display: flex;
        width: 400px;
      }

      label {
        display: block;
        text-align: left;
        font-size: 35px;
        font-family: sans-serif;
        text-transform: capitalize;
        margin-bottom: 10px;
      }
      

      .subsystems {
        display: flex;
        flex: 1;
        flex-wrap: wrap;
        padding: 10px;
      }

      .drive {
        width: 28%;
        height: 60%;
      }
      .shooter {
        width: 28%;
        height: 60%;
      }
      .wheel-spin {
        /* width: 44%; */
        flex: 1;
        height: 60%;
      }

      .intake-storage {
        width: 56%;
        height: 40%;
      }
      
      .climber {
        /* width: 44%; */
        flex: 1;
        height: 40%;
      }

      .subsystem {
      }



      p {
        color: green;
        background: blueviolet;
      }

      frc-boolean-box {
        color: blue;
        white-space: nowrap;
      }

      frc-boolean-box::part(box) {
        border-radius: 50%;
      }
    `;
  }

  constructor() {
    super();

  }

  render() {
    return html`

      <div class= "controllbuttons">
      </div>
      <div class="subsystems">


        <div class="drive subsystem">
          <label>Drive</label>
          <gear-shift
            source-key="/gear"
            source-provider="NetworkTables"
          >
          </gear-shift>
        </div>
     
        <div class="shooter subsystem">
          <label>Shooter</label>
        </div>

        <div class="wheel-spin subsystem">
          <label>wheel spin</label>

          <control-panel
            source-key="/controlPanel"
            source-provider="NetworkTables"
          >
          </control-panel>
        </div>

        <div class="intake-storage subsystem">
        <label>intake</label>

          <ball-counter
            source-key="/ballCount"
            source-provider="NetworkTables"
          ></ball-counter>
        </div>

        <div class="climber subsystem">
        <label>climb</label>
      </div>

    

      </div>
    `;
  }
}

customElements.define('robot-ui', UI);
