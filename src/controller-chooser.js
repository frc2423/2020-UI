
import { Webbit, html, css, svg } from '@webbitjs/webbit';

class ControllerChooser extends Webbit {
  
  static get styles() {
    return css`
        :host {
            display: inline-block;
            width: 100%;
            height: 100%;
        }
        div {
          height: 20%;
          display: flex;
          justify-content: center;
          align-items: center;
          font-size: 35px;
          font-weight: bold;
          font-family: Sans-Serif;
          border-right: 10px solid white;

          /* background-image: url("/images/controller.png"); */
          /* background-size: cover; */
        }

        .selected {
          border-right: 10px solid darkblue;
        }

        .auto {
          background-image: url("/images/auto-deselected.png");
          background-size: cover;
        }

        .auto.selected {
          background-image: url("/images/auto-selected.png");
        }

        .teleop.selected {
          background-image: url("/images/teleop-selected.png");
        }

        .teleop {
          background-image: url("/images/teleop-deselected.png");
          background-size: cover;
        }

        .shoot.selected {
          background-image: url("/images/shoot-selected.png");
        }

        .shoot {
          background-image: url("/images/shoot-deselected.png");
          background-size: cover;
        }

        .controlpanel.selected {
          background-image: url("/images/ControlPanel-selected.png");
        }

        .controlpanel {
          background-image: url("/images/ControlPanel-deselected.png");
          background-size: cover;
        }

       .climbtime.selected {
          background-image: url("/images/climb-selected.png");
       } 

       .climbtime { 
          background-image: url("/images/climb-deselected.png");
          background-size: cover;
        }
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

  firstUpdated() {
    this.setWidth();
    window.addEventListener('resize', this.setWidth);
  }

  setWidth() {
    const height = this.offsetHeight;
    const width = `${height * 2 / 5 + 10}px`;
    this.style.width = width;
  }

  render() {

    return html`
      <div 
        class="auto ${this.currentController === 'auto' ? 'selected' : ''}"
        @click="${() => this.selectController("auto")}"
      >
      </div>
      <div 
        class="teleop ${this.currentController === "teleop" ? "selected" : ""}" 
        @click="${() => this.selectController("teleop")}"
      >
      </div>
      <div 
        class="shoot ${this.currentController === "shoot" ? "selected" : ""}" 
        @click="${() => this.selectController("shoot")}"
      > 
      </div>
      <div 
        class="controlpanel ${this.currentController === "controlPanel" ? "selected":""}" 
        @click="${() => this.selectController("controlPanel")}"
      >
      </div>
      <div 
        class="climbtime ${this.currentController === "climb" ? "selected" : ""}"
        @click="${() => this.selectController("climb")}"
      > 
 
      </div>
    `;
  }
}


webbitRegistry.define('controller-chooser', ControllerChooser);

