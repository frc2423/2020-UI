
import { Webbit, html, css, svg } from '@webbitjs/webbit';

class ControllerChooser extends Webbit {
  
  static get styles() {
    return css`
        :host {
            display: inline-block;
            width: 100%;
        }
        div {
          height: 20%;
          border-bottom: 3px solid white;
          display: flex;
          background: gray;
          justify-content: center;
          align-items: center;
          font-size: 35px;
          font-weight: bold;
          font-family: "Comic Sans MS", "Comic Sans", cursive;

          /* background-image: url("/images/controller.png"); */
          /* background-size: cover; */
        }

        .auto.selected {
          background: rgb(255, 51, 51);
        }

        /* .auto {
          background: rgb(255, 153, 153);
        } */

        .teleop.selected {
          background: rgb(0,204,0);
        }

        /* .teleop {
          background: rgb(204, 255, 153);
        } */

        .shoot.selected {
          background: yellow;
        }

        /* .shoot {
          background: rgb(253, 253, 150);
        } */

        .controlpanel.selected {
          background: rgb(0, 128, 255);
        }

        /* .controlpanel {
          background: rgb(153, 204, 255);
        } */

       .climbtime.selected {
         background: rgb(178, 102, 255);
       } 

       /* .climbtime { 
           background: rgb(204, 153, 255) 
         } */
    `;
  }

  static get properties() {
    return {
        currentController: {type: String, attribute:'current-controller', primary: true },
    };
  }

  constructor() {
    super();
    this.currentController = 'teleop';

    // "auto", "teleop", "shoot", "controlPanel", "climb"

  }

  selectController(controller) {
    this.currentController = controller;
  }


  
  render() {

    return html`
      <div 
        class="auto ${this.currentController === 'auto' ? 'selected' : ''}"
        @click="${() => this.selectController("auto")}"
      >
        Auto
      </div>
      <div 
        class="teleop ${this.currentController === "teleop" ? "selected" : ""}" 
        @click="${() => this.selectController("teleop")}"
      >
        Teleop
      </div>
      <div 
        class="shoot ${this.currentController === "shoot" ? "selected" : ""}" 
        @click="${() => this.selectController("shoot")}"
      > 
        Shoot 
      </div>
      <div 
        class="controlpanel ${this.currentController === "controlPanel" ? "selected":""}" 
        @click="${() => this.selectController("controlPanel")}"
      >
        Control Panel 
      </div>
      <div 
        class="climbtime ${this.currentController === "climb" ? "selected" : ""}"
        @click="${() => this.selectController("climb")}"
      > 
        Climb Time 
      </div>
    `;
  }
}

let name = "Jules"
let sentence = `Howdy my name is ${name}`


webbitRegistry.define('controller-chooser', ControllerChooser);

