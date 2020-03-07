import "@webbitjs/frc";
import { addSourceProvider, getSourceProvider } from "@webbitjs/store";
import { html, css, LitElement } from 'lit-element';
import './boolean-box2';
import './control-panel';
import './ball-counter';
import './gear-shift';
import './controller-chooser';
import './auto-aim';
import './intake-state';
import './climb-state';
import './shooter-tracker';
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
        width: 550px;
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
        padding: 10px 30px;
      }

      .drive {
        width: 28%;
        height: 60%;
      }
      .shooter {
        width: 50%;
        height: 60%;
      }
      .wheel-spin {
        /* width: 44%; */
        width: 50%;
        height: 60%;
      }

      .intake-storage {
        width: 32%;
        height: 40%;
      }
      
      .climber {
        /* width: 44%; */
        width: 40%;
        height: 40%;
      }

      ball-counter {
        margin-bottom: 20px;
      }

      auto-aim {
        margin-bottom: 30px;
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

      h3 {
        color: rgba(27, 43, 65, 0.72);
        font-size: 20px;
        font-family:-apple-system, BlinkMacSystemFont, Roboto, "Segoe UI", Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
        font-weight: 500;
        margin: 10px 0;
      }
    `;
  }

  constructor() {
    super();

  }

  render() {
    return html`
      <div class= "controllbuttons">
        <controller-chooser
          source-key="/currentController"
          source-provider="NetworkTables"
        >

        </controller-chooser>
      </div>
      <div class="subsystems">



          <div class="shooter subsystem">
            <label>Shooter</label>

            <h3>Aiming</h3>
            <auto-aim 
              source-key="/autoAim"
              source-provider="NetworkTables"
            >
            </auto-aim>

            <h3>Shooter Pizza Tracker</h3>
            <shooter-tracker
              source-key="/shooterTracker"
              source-provider="NetworkTables"
            ></shooter-tracker>
          </div>

          <div class="wheel-spin subsystem">
            <label>Control Panel</label>

            <control-panel
              source-key="/controlPanel"
              source-provider="NetworkTables"
            >
            </control-panel>
          </div>


          <div class="intake-storage subsystem">
          <label>intake</label>

            <h3>Ball Count</h3>
            <ball-counter
              source-key="/ballCount"
              source-provider="NetworkTables"
            ></ball-counter>
            <h3>Intake State</h3>
            <intake-state
              source-key="/intakeState"
              source-provider="NetworkTables"
            ></intake-state>
          </div>

          <div class="drive subsystem">
            <label>Drive</label>
            <gear-shift
              source-key="/gear"
              source-provider="NetworkTables"
            >
            </gear-shift>
          </div>


          <div class="climber subsystem">
          <label>climb</label>
            <climb-state 
              source-key="/climbState"
              source-provider="NetworkTables"
            ></climb-state>
          </div>

      </div>
    `;
  }
}

customElements.define('robot-ui', UI);
