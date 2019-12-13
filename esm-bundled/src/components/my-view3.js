import{LitElement,html,css,PageViewElement,connect,store,addToCartIcon,removeFromCartIcon,ButtonSharedStyles,SharedStyles}from"./my-app.js";function defaultEqualityCheck(a,b){return a===b}function areArgumentsShallowlyEqual(equalityCheck,prev,next){if(null===prev||null===next||prev.length!==next.length){return!1}// Do this in a for loop (and not a `forEach` or an `every`) so we can determine equality as fast as possible.
for(var length=prev.length,i=0;i<length;i++){if(!equalityCheck(prev[i],next[i])){return!1}}return!0}function defaultMemoize(func){var equalityCheck=1<arguments.length&&arguments[1]!==void 0?arguments[1]:defaultEqualityCheck,lastArgs=null,lastResult=null;// we reference arguments instead of spreading them for performance reasons
return function(){if(!areArgumentsShallowlyEqual(equalityCheck,lastArgs,arguments)){// apply arguments instead of spreading for performance.
lastResult=func.apply(null,arguments)}lastArgs=arguments;return lastResult}}function getDependencies(funcs){var dependencies=Array.isArray(funcs[0])?funcs[0]:funcs;if(!dependencies.every(function(dep){return"function"===typeof dep})){var dependencyTypes=dependencies.map(function(dep){return typeof dep}).join(", ");throw new Error("Selector creators expect all input-selectors to be functions, "+("instead received the following types: ["+dependencyTypes+"]"))}return dependencies}function createSelectorCreator(memoize){for(var _len=arguments.length,memoizeOptions=Array(1<_len?_len-1:0),_key=1;_key<_len;_key++){memoizeOptions[_key-1]=arguments[_key]}return function(){for(var _len2=arguments.length,funcs=Array(_len2),_key2=0;_key2<_len2;_key2++){funcs[_key2]=arguments[_key2]}var recomputations=0,resultFunc=funcs.pop(),dependencies=getDependencies(funcs),memoizedResultFunc=memoize.apply(void 0,[function(){recomputations++;// apply arguments instead of spreading for performance.
return resultFunc.apply(null,arguments)}].concat(memoizeOptions)),selector=memoize(function(){for(var params=[],length=dependencies.length,i=0;i<length;i++){// apply arguments instead of spreading and mutate a local list of params for performance.
params.push(dependencies[i].apply(null,arguments))}// apply arguments instead of spreading for performance.
return memoizedResultFunc.apply(null,params)});selector.resultFunc=resultFunc;selector.dependencies=dependencies;selector.recomputations=function(){return recomputations};selector.resetRecomputations=function(){return recomputations=0};return selector}}var createSelector=createSelectorCreator(defaultMemoize);function createStructuredSelector(selectors){var selectorCreator=1<arguments.length&&arguments[1]!==void 0?arguments[1]:createSelector;if("object"!==typeof selectors){throw new Error("createStructuredSelector expects first argument to be an object "+("where each property is a selector, instead received a "+typeof selectors))}var objectKeys=Object.keys(selectors);return selectorCreator(objectKeys.map(function(key){return selectors[key]}),function(){for(var _len3=arguments.length,values=Array(_len3),_key3=0;_key3<_len3;_key3++){values[_key3]=arguments[_key3]}return values.reduce(function(composition,value,index){composition[objectKeys[index]]=value;return composition},{})})}var index={defaultMemoize:defaultMemoize,createSelectorCreator:createSelectorCreator,createSelector:createSelector,createStructuredSelector:createStructuredSelector};/**
   @license
   Copyright (c) 2018 The Polymer Project Authors. All rights reserved.
   This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
   The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
   The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
   Code distributed by Google as part of the polymer project is also
   subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
   */const GET_PRODUCTS="GET_PRODUCTS",ADD_TO_CART="ADD_TO_CART",REMOVE_FROM_CART="REMOVE_FROM_CART",CHECKOUT_SUCCESS="CHECKOUT_SUCCESS",CHECKOUT_FAILURE="CHECKOUT_FAILURE",PRODUCT_LIST=[{id:1,title:"Cabot Creamery Extra Sharp Cheddar Cheese",price:10.99,inventory:2},{id:2,title:"Cowgirl Creamery Mt. Tam Cheese",price:29.99,inventory:10},{id:3,title:"Tillamook Medium Cheddar Cheese",price:8.99,inventory:5},{id:4,title:"Point Reyes Bay Blue Cheese",price:24.99,inventory:7},{id:5,title:"Shepherd's Halloumi Cheese",price:11.99,inventory:3}],getAllProducts=()=>dispatch=>{// Here you would normally get the data from the server. We're simulating
// that by dispatching an async action (that you would dispatch when you
// successfully got the data back).
// You could reformat the data in the right format as well.
const products=PRODUCT_LIST.reduce((obj,product)=>{obj[product.id]=product;return obj},{});dispatch({type:GET_PRODUCTS,products})},checkout=()=>dispatch=>{// Here you could do things like credit card validation, etc.
// If that fails, dispatch CHECKOUT_FAILURE. We're simulating that
// by flipping a coin :)
const flip=Math.floor(2*Math.random());if(0===flip){dispatch({type:CHECKOUT_FAILURE})}else{dispatch({type:CHECKOUT_SUCCESS})}},addToCart=productId=>(dispatch,getState)=>{const state=getState();// Just because the UI thinks you can add this to the cart
// doesn't mean it's in the inventory (user could've fixed it).
if(0<state.shop.products[productId].inventory){dispatch(addToCartUnsafe(productId))}},removeFromCart=productId=>{return{type:REMOVE_FROM_CART,productId}},addToCartUnsafe=productId=>{return{type:ADD_TO_CART,productId}};var shop={GET_PRODUCTS:GET_PRODUCTS,ADD_TO_CART:ADD_TO_CART,REMOVE_FROM_CART:REMOVE_FROM_CART,CHECKOUT_SUCCESS:CHECKOUT_SUCCESS,CHECKOUT_FAILURE:CHECKOUT_FAILURE,getAllProducts:getAllProducts,checkout:checkout,addToCart:addToCart,removeFromCart:removeFromCart,addToCartUnsafe:addToCartUnsafe};const INITIAL_STATE={products:{},cart:{},error:""},shop$1=(state=INITIAL_STATE,action)=>{switch(action.type){case GET_PRODUCTS:return{...state,products:action.products};case ADD_TO_CART:case REMOVE_FROM_CART:case CHECKOUT_SUCCESS:return{...state,products:products(state.products,action),cart:cart(state.cart,action),error:""};case CHECKOUT_FAILURE:return{...state,error:"Checkout failed. Please try again"};default:return state;}},products=(state,action)=>{switch(action.type){case ADD_TO_CART:case REMOVE_FROM_CART:const productId=action.productId;return{...state,[productId]:product(state[productId],action)};default:return state;}},product=(state,action)=>{switch(action.type){case ADD_TO_CART:return{...state,inventory:state.inventory-1};case REMOVE_FROM_CART:return{...state,inventory:state.inventory+1};default:return state;}},cart=(state,action)=>{switch(action.type){case ADD_TO_CART:const addId=action.productId;return{...state,[addId]:(state[addId]||0)+1};case REMOVE_FROM_CART:const removeId=action.productId,quantity=(state[removeId]||0)-1;if(0>=quantity){const newState={...state};delete newState[removeId];return newState}else{return{...state,[removeId]:quantity}}case CHECKOUT_SUCCESS:return{};default:return state;}},cartSelector=state=>state.shop.cart,productsSelector=state=>state.shop.products,cartItemsSelector=createSelector(cartSelector,productsSelector,(cart,products)=>{return Object.keys(cart).map(id=>{const item=products[id];return{id:item.id,title:item.title,amount:cart[id],price:item.price}})}),cartTotalSelector=createSelector(cartSelector,productsSelector,(cart,products)=>{let total=0;Object.keys(cart).forEach(id=>{const item=products[id];total+=item.price*cart[id]});return Math.round(100*total)/100}),cartQuantitySelector=createSelector(cartSelector,cart=>{let num=0;Object.keys(cart).forEach(id=>{num+=cart[id]});return num});var shop$2={default:shop$1,cartItemsSelector:cartItemsSelector,cartTotalSelector:cartTotalSelector,cartQuantitySelector:cartQuantitySelector};class ShopItem extends LitElement{static get properties(){return{name:{type:String},amount:{type:String},price:{type:String}}}render(){return html`
      ${this.name}:
      <span ?hidden="${0===this.amount}">${this.amount} * </span>
      $${this.price}
      </span>
    `}}window.customElements.define("shop-item",ShopItem);class ShopProducts extends connect(store)(LitElement){static get properties(){return{_products:{type:Object}}}static get styles(){return[ButtonSharedStyles,css`
        :host {
          display: block;
        }
      `]}render(){return html`
      ${Object.keys(this._products).map(key=>{const item=this._products[key];return html`
          <div>
            <shop-item name="${item.title}" amount="${item.inventory}" price="${item.price}"></shop-item>
            <button
                .disabled="${0===item.inventory}"
                @click="${this._addButtonClicked}"
                data-index="${item.id}"
                title="${0===item.inventory?"Sold out":"Add to cart"}">
              ${0===item.inventory?"Sold out":addToCartIcon}
            </button>
          </div>
        `})}
    `}firstUpdated(){store.dispatch(getAllProducts())}_addButtonClicked(e){store.dispatch(addToCart(e.currentTarget.dataset.index))}// This is called every time something is updated in the store.
stateChanged(state){this._products=state.shop.products}}window.customElements.define("shop-products",ShopProducts);class ShopCart extends connect(store)(LitElement){static get properties(){return{_items:{type:Array},_total:{type:Number}}}static get styles(){return[ButtonSharedStyles,css`
        :host {
          display: block;
        }
      `]}render(){return html`
      <p ?hidden="${0!==this._items.length}">Please add some products to cart.</p>
      ${this._items.map(item=>html`
          <div>
            <shop-item .name="${item.title}" .amount="${item.amount}" .price="${item.price}"></shop-item>
            <button
                @click="${this._removeButtonClicked}"
                data-index="${item.id}"
                title="Remove from cart">
              ${removeFromCartIcon}
            </button>
          </div>
        `)}
      <p ?hidden="${!this._items.length}"><b>Total:</b> ${this._total}</p>
    `}_removeButtonClicked(e){store.dispatch(removeFromCart(e.currentTarget.dataset.index))}// This is called every time something is updated in the store.
stateChanged(state){this._items=cartItemsSelector(state);this._total=cartTotalSelector(state)}}window.customElements.define("shop-cart",ShopCart);store.addReducers({shop:shop$1});// These are the elements needed by this element.
class MyView3 extends connect(store)(PageViewElement){static get properties(){return{// This is the data from the store.
_quantity:{type:Number},_error:{type:String}}}static get styles(){return[SharedStyles,ButtonSharedStyles,css`
        button {
          border: 2px solid var(--app-dark-text-color);
          border-radius: 3px;
          padding: 8px 16px;
        }

        button:hover {
          border-color: var(--app-primary-color);
          color: var(--app-primary-color);
        }

        .cart,
        .cart svg {
          fill: var(--app-primary-color);
          width: 64px;
          height: 64px;
        }

        .circle.small {
          margin-top: -72px;
          width: 28px;
          height: 28px;
          font-size: 16px;
          font-weight: bold;
          line-height: 30px;
        }
      `]}render(){return html`
      <section>
        <h2>Redux example: shopping cart</h2>
        <div class="cart">${addToCartIcon}<div class="circle small">${this._quantity}</div></div>
        <p>This is a slightly more advanced Redux example, that simulates a
          shopping cart: getting the products, adding/removing items to the
          cart, and a checkout action, that can sometimes randomly fail (to
          simulate where you would add failure handling). </p>
        <p>This view, as well as its 2 child elements, <code>&lt;shop-products&gt;</code> and
        <code>&lt;shop-cart&gt;</code> are connected to the Redux store.</p>
      </section>
      <section>
        <h3>Products</h3>
        <shop-products></shop-products>

        <br>
        <h3>Your Cart</h3>
        <shop-cart></shop-cart>

        <div>${this._error}</div>
        <br>
        <p>
          <button ?hidden="${0==this._quantity}" @click="${this._checkoutButtonClicked}">
            Checkout
          </button>
        </p>
      </section>
    `}_checkoutButtonClicked(){store.dispatch(checkout())}// This is called every time something is updated in the store.
stateChanged(state){this._quantity=cartQuantitySelector(state);this._error=state.shop.error}}window.customElements.define("my-view3",MyView3);export{index as $index,shop as $shop,shop$2 as $shop$1,shop$1 as $shopDefault,ADD_TO_CART,CHECKOUT_FAILURE,CHECKOUT_SUCCESS,GET_PRODUCTS,REMOVE_FROM_CART,addToCart,addToCartUnsafe,cartItemsSelector,cartQuantitySelector,cartTotalSelector,checkout,createSelector,createSelectorCreator,createStructuredSelector,defaultMemoize,getAllProducts,removeFromCart};