import{LitElement,css,html,plusIcon,minusIcon,ButtonSharedStyles,PageViewElement,connect,store,SharedStyles}from"./my-app.js";/**
@license
Copyright (c) 2018 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
Code distributed by Google as part of the polymer project is also
subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
*/const INCREMENT="INCREMENT",DECREMENT="DECREMENT",increment=()=>{return{type:INCREMENT}},decrement=()=>{return{type:DECREMENT}};var counter={INCREMENT:INCREMENT,DECREMENT:DECREMENT,increment:increment,decrement:decrement};// imagine that it could just as well be a third-party element that you
// got from someone else.
class CounterElement extends LitElement{static get properties(){return{/* The total number of clicks you've done. */clicks:{type:Number},/* The current value of the counter. */value:{type:Number}}}static get styles(){return[ButtonSharedStyles,css`
        span {
          width: 20px;
          display: inline-block;
          text-align: center;
          font-weight: bold;
        }
      `]}render(){return html`
      <div>
        <p>
          Clicked: <span>${this.clicks}</span> times.
          Value is <span>${this.value}</span>.
          <button @click="${this._onIncrement}" title="Add 1">${plusIcon}</button>
          <button @click="${this._onDecrement}" title="Minus 1">${minusIcon}</button>
        </p>
      </div>
    `}constructor(){super();this.clicks=0;this.value=0}_onIncrement(){this.value++;this.clicks++;this.dispatchEvent(new CustomEvent("counter-incremented"))}_onDecrement(){this.value--;this.clicks++;this.dispatchEvent(new CustomEvent("counter-decremented"))}}window.customElements.define("counter-element",CounterElement);const INITIAL_STATE={clicks:0,value:0},counter$1=(state=INITIAL_STATE,action)=>{switch(action.type){case INCREMENT:return{clicks:state.clicks+1,value:state.value+1};case DECREMENT:return{clicks:state.clicks+1,value:state.value-1};default:return state;}};var counter$2={default:counter$1};store.addReducers({counter:counter$1});// These are the elements needed by this element.
class MyView2 extends connect(store)(PageViewElement){static get properties(){return{// This is the data from the store.
_clicks:{type:Number},_value:{type:Number}}}static get styles(){return[SharedStyles]}render(){return html`
      <section>
        <h2>Redux example: simple counter</h2>
        <div class="circle">${this._value}</div>
        <p>This page contains a reusable <code>&lt;counter-element&gt;</code>. The
        element is not built in a Redux-y way (you can think of it as being a
        third-party element you got from someone else), but this page is connected to the
        Redux store. When the element updates its counter, this page updates the values
        in the Redux store, and you can see the current value of the counter reflected in
        the bubble above.</p>
        <br><br>
      </section>
      <section>
        <p>
          <counter-element
              value="${this._value}"
              clicks="${this._clicks}"
              @counter-incremented="${this._counterIncremented}"
              @counter-decremented="${this._counterDecremented}">
          </counter-element>
        </p>
      </section>
    `}_counterIncremented(){store.dispatch(increment())}_counterDecremented(){store.dispatch(decrement())}// This is called every time something is updated in the store.
stateChanged(state){this._clicks=state.counter.clicks;this._value=state.counter.value}}window.customElements.define("my-view2",MyView2);export{counter as $counter,counter$2 as $counter$1,counter$1 as $counterDefault,DECREMENT,INCREMENT,decrement,increment};