try{self["workbox:core:6.5.2"]&&_()}catch{}const ct=(t,...e)=>{let n=t;return e.length>0&&(n+=` :: ${JSON.stringify(e)}`),n},lt=ct;class u extends Error{constructor(e,n){const s=lt(e,n);super(s),this.name=e,this.details=n}}const m={googleAnalytics:"googleAnalytics",precache:"precache-v2",prefix:"workbox",runtime:"runtime",suffix:typeof registration!="undefined"?registration.scope:""},Q=t=>[m.prefix,t,m.suffix].filter(e=>e&&e.length>0).join("-"),ut=t=>{for(const e of Object.keys(m))t(e)},q={updateDetails:t=>{ut(e=>{typeof t[e]=="string"&&(m[e]=t[e])})},getGoogleAnalyticsName:t=>t||Q(m.googleAnalytics),getPrecacheName:t=>t||Q(m.precache),getPrefix:()=>m.prefix,getRuntimeName:t=>t||Q(m.runtime),getSuffix:()=>m.suffix};function Ce(t,e){const n=e();return t.waitUntil(n),n}try{self["workbox:precaching:6.5.2"]&&_()}catch{}const ft="__WB_REVISION__";function ht(t){if(!t)throw new u("add-to-cache-list-unexpected-type",{entry:t});if(typeof t=="string"){const i=new URL(t,location.href);return{cacheKey:i.href,url:i.href}}const{revision:e,url:n}=t;if(!n)throw new u("add-to-cache-list-unexpected-type",{entry:t});if(!e){const i=new URL(n,location.href);return{cacheKey:i.href,url:i.href}}const s=new URL(n,location.href),r=new URL(n,location.href);return s.searchParams.set(ft,e),{cacheKey:s.href,url:r.href}}class dt{constructor(){this.updatedURLs=[],this.notUpdatedURLs=[],this.handlerWillStart=async({request:e,state:n})=>{n&&(n.originalRequest=e)},this.cachedResponseWillBeUsed=async({event:e,state:n,cachedResponse:s})=>{if(e.type==="install"&&n&&n.originalRequest&&n.originalRequest instanceof Request){const r=n.originalRequest.url;s?this.notUpdatedURLs.push(r):this.updatedURLs.push(r)}return s}}}class pt{constructor({precacheController:e}){this.cacheKeyWillBeUsed=async({request:n,params:s})=>{const r=(s==null?void 0:s.cacheKey)||this._precacheController.getCacheKeyForURL(n.url);return r?new Request(r,{headers:n.headers}):n},this._precacheController=e}}let A;function gt(){if(A===void 0){const t=new Response("");if("body"in t)try{new Response(t.body),A=!0}catch{A=!1}A=!1}return A}async function mt(t,e){let n=null;if(t.url&&(n=new URL(t.url).origin),n!==self.location.origin)throw new u("cross-origin-copy-response",{origin:n});const s=t.clone(),r={headers:new Headers(s.headers),status:s.status,statusText:s.statusText},i=e?e(r):r,o=gt()?s.body:await s.blob();return new Response(o,i)}const wt=t=>new URL(String(t),location.href).href.replace(new RegExp(`^${location.origin}`),"");function Ee(t,e){const n=new URL(t);for(const s of e)n.searchParams.delete(s);return n.href}async function yt(t,e,n,s){const r=Ee(e.url,n);if(e.url===r)return t.match(e,s);const i=Object.assign(Object.assign({},s),{ignoreSearch:!0}),o=await t.keys(e,i);for(const a of o){const c=Ee(a.url,n);if(r===c)return t.match(a,s)}}class bt{constructor(){this.promise=new Promise((e,n)=>{this.resolve=e,this.reject=n})}}const _t=new Set;async function It(){for(const t of _t)await t()}function Rt(t){return new Promise(e=>setTimeout(e,t))}try{self["workbox:strategies:6.5.2"]&&_()}catch{}function M(t){return typeof t=="string"?new Request(t):t}class kt{constructor(e,n){this._cacheKeys={},Object.assign(this,n),this.event=n.event,this._strategy=e,this._handlerDeferred=new bt,this._extendLifetimePromises=[],this._plugins=[...e.plugins],this._pluginStateMap=new Map;for(const s of this._plugins)this._pluginStateMap.set(s,{});this.event.waitUntil(this._handlerDeferred.promise)}async fetch(e){const{event:n}=this;let s=M(e);if(s.mode==="navigate"&&n instanceof FetchEvent&&n.preloadResponse){const o=await n.preloadResponse;if(o)return o}const r=this.hasCallback("fetchDidFail")?s.clone():null;try{for(const o of this.iterateCallbacks("requestWillFetch"))s=await o({request:s.clone(),event:n})}catch(o){if(o instanceof Error)throw new u("plugin-error-request-will-fetch",{thrownErrorMessage:o.message})}const i=s.clone();try{let o;o=await fetch(s,s.mode==="navigate"?void 0:this._strategy.fetchOptions);for(const a of this.iterateCallbacks("fetchDidSucceed"))o=await a({event:n,request:i,response:o});return o}catch(o){throw r&&await this.runCallbacks("fetchDidFail",{error:o,event:n,originalRequest:r.clone(),request:i.clone()}),o}}async fetchAndCachePut(e){const n=await this.fetch(e),s=n.clone();return this.waitUntil(this.cachePut(e,s)),n}async cacheMatch(e){const n=M(e);let s;const{cacheName:r,matchOptions:i}=this._strategy,o=await this.getCacheKey(n,"read"),a=Object.assign(Object.assign({},i),{cacheName:r});s=await caches.match(o,a);for(const c of this.iterateCallbacks("cachedResponseWillBeUsed"))s=await c({cacheName:r,matchOptions:i,cachedResponse:s,request:o,event:this.event})||void 0;return s}async cachePut(e,n){const s=M(e);await Rt(0);const r=await this.getCacheKey(s,"write");if(!n)throw new u("cache-put-with-no-response",{url:wt(r.url)});const i=await this._ensureResponseSafeToCache(n);if(!i)return!1;const{cacheName:o,matchOptions:a}=this._strategy,c=await self.caches.open(o),f=this.hasCallback("cacheDidUpdate"),C=f?await yt(c,r.clone(),["__WB_REVISION__"],a):null;try{await c.put(r,f?i.clone():i)}catch(d){if(d instanceof Error)throw d.name==="QuotaExceededError"&&await It(),d}for(const d of this.iterateCallbacks("cacheDidUpdate"))await d({cacheName:o,oldResponse:C,newResponse:i.clone(),request:r,event:this.event});return!0}async getCacheKey(e,n){const s=`${e.url} | ${n}`;if(!this._cacheKeys[s]){let r=e;for(const i of this.iterateCallbacks("cacheKeyWillBeUsed"))r=M(await i({mode:n,request:r,event:this.event,params:this.params}));this._cacheKeys[s]=r}return this._cacheKeys[s]}hasCallback(e){for(const n of this._strategy.plugins)if(e in n)return!0;return!1}async runCallbacks(e,n){for(const s of this.iterateCallbacks(e))await s(n)}*iterateCallbacks(e){for(const n of this._strategy.plugins)if(typeof n[e]=="function"){const s=this._pluginStateMap.get(n);yield i=>{const o=Object.assign(Object.assign({},i),{state:s});return n[e](o)}}}waitUntil(e){return this._extendLifetimePromises.push(e),e}async doneWaiting(){let e;for(;e=this._extendLifetimePromises.shift();)await e}destroy(){this._handlerDeferred.resolve(null)}async _ensureResponseSafeToCache(e){let n=e,s=!1;for(const r of this.iterateCallbacks("cacheWillUpdate"))if(n=await r({request:this.request,response:n,event:this.event})||void 0,s=!0,!n)break;return s||n&&n.status!==200&&(n=void 0),n}}class vt{constructor(e={}){this.cacheName=q.getRuntimeName(e.cacheName),this.plugins=e.plugins||[],this.fetchOptions=e.fetchOptions,this.matchOptions=e.matchOptions}handle(e){const[n]=this.handleAll(e);return n}handleAll(e){e instanceof FetchEvent&&(e={event:e,request:e.request});const n=e.event,s=typeof e.request=="string"?new Request(e.request):e.request,r="params"in e?e.params:void 0,i=new kt(this,{event:n,request:s,params:r}),o=this._getResponse(i,s,n),a=this._awaitComplete(o,i,s,n);return[o,a]}async _getResponse(e,n,s){await e.runCallbacks("handlerWillStart",{event:s,request:n});let r;try{if(r=await this._handle(n,e),!r||r.type==="error")throw new u("no-response",{url:n.url})}catch(i){if(i instanceof Error){for(const o of e.iterateCallbacks("handlerDidError"))if(r=await o({error:i,event:s,request:n}),r)break}if(!r)throw i}for(const i of e.iterateCallbacks("handlerWillRespond"))r=await i({event:s,request:n,response:r});return r}async _awaitComplete(e,n,s,r){let i,o;try{i=await e}catch{}try{await n.runCallbacks("handlerDidRespond",{event:r,request:s,response:i}),await n.doneWaiting()}catch(a){a instanceof Error&&(o=a)}if(await n.runCallbacks("handlerDidComplete",{event:r,request:s,response:i,error:o}),n.destroy(),o)throw o}}class w extends vt{constructor(e={}){e.cacheName=q.getPrecacheName(e.cacheName),super(e),this._fallbackToNetwork=e.fallbackToNetwork!==!1,this.plugins.push(w.copyRedirectedCacheableResponsesPlugin)}async _handle(e,n){const s=await n.cacheMatch(e);return s||(n.event&&n.event.type==="install"?await this._handleInstall(e,n):await this._handleFetch(e,n))}async _handleFetch(e,n){let s;const r=n.params||{};if(this._fallbackToNetwork){const i=r.integrity,o=e.integrity,a=!o||o===i;s=await n.fetch(new Request(e,{integrity:o||i})),i&&a&&(this._useDefaultCacheabilityPluginIfNeeded(),await n.cachePut(e,s.clone()))}else throw new u("missing-precache-entry",{cacheName:this.cacheName,url:e.url});return s}async _handleInstall(e,n){this._useDefaultCacheabilityPluginIfNeeded();const s=await n.fetch(e);if(!await n.cachePut(e,s.clone()))throw new u("bad-precaching-response",{url:e.url,status:s.status});return s}_useDefaultCacheabilityPluginIfNeeded(){let e=null,n=0;for(const[s,r]of this.plugins.entries())r!==w.copyRedirectedCacheableResponsesPlugin&&(r===w.defaultPrecacheCacheabilityPlugin&&(e=s),r.cacheWillUpdate&&n++);n===0?this.plugins.push(w.defaultPrecacheCacheabilityPlugin):n>1&&e!==null&&this.plugins.splice(e,1)}}w.defaultPrecacheCacheabilityPlugin={async cacheWillUpdate({response:t}){return!t||t.status>=400?null:t}};w.copyRedirectedCacheableResponsesPlugin={async cacheWillUpdate({response:t}){return t.redirected?await mt(t):t}};class Ct{constructor({cacheName:e,plugins:n=[],fallbackToNetwork:s=!0}={}){this._urlsToCacheKeys=new Map,this._urlsToCacheModes=new Map,this._cacheKeysToIntegrities=new Map,this._strategy=new w({cacheName:q.getPrecacheName(e),plugins:[...n,new pt({precacheController:this})],fallbackToNetwork:s}),this.install=this.install.bind(this),this.activate=this.activate.bind(this)}get strategy(){return this._strategy}precache(e){this.addToCacheList(e),this._installAndActiveListenersAdded||(self.addEventListener("install",this.install),self.addEventListener("activate",this.activate),this._installAndActiveListenersAdded=!0)}addToCacheList(e){const n=[];for(const s of e){typeof s=="string"?n.push(s):s&&s.revision===void 0&&n.push(s.url);const{cacheKey:r,url:i}=ht(s),o=typeof s!="string"&&s.revision?"reload":"default";if(this._urlsToCacheKeys.has(i)&&this._urlsToCacheKeys.get(i)!==r)throw new u("add-to-cache-list-conflicting-entries",{firstEntry:this._urlsToCacheKeys.get(i),secondEntry:r});if(typeof s!="string"&&s.integrity){if(this._cacheKeysToIntegrities.has(r)&&this._cacheKeysToIntegrities.get(r)!==s.integrity)throw new u("add-to-cache-list-conflicting-integrities",{url:i});this._cacheKeysToIntegrities.set(r,s.integrity)}if(this._urlsToCacheKeys.set(i,r),this._urlsToCacheModes.set(i,o),n.length>0){const a=`Workbox is precaching URLs without revision info: ${n.join(", ")}
This is generally NOT safe. Learn more at https://bit.ly/wb-precache`;console.warn(a)}}}install(e){return Ce(e,async()=>{const n=new dt;this.strategy.plugins.push(n);for(const[i,o]of this._urlsToCacheKeys){const a=this._cacheKeysToIntegrities.get(o),c=this._urlsToCacheModes.get(i),f=new Request(i,{integrity:a,cache:c,credentials:"same-origin"});await Promise.all(this.strategy.handleAll({params:{cacheKey:o},request:f,event:e}))}const{updatedURLs:s,notUpdatedURLs:r}=n;return{updatedURLs:s,notUpdatedURLs:r}})}activate(e){return Ce(e,async()=>{const n=await self.caches.open(this.strategy.cacheName),s=await n.keys(),r=new Set(this._urlsToCacheKeys.values()),i=[];for(const o of s)r.has(o.url)||(await n.delete(o),i.push(o.url));return{deletedURLs:i}})}getURLsToCacheKeys(){return this._urlsToCacheKeys}getCachedURLs(){return[...this._urlsToCacheKeys.keys()]}getCacheKeyForURL(e){const n=new URL(e,location.href);return this._urlsToCacheKeys.get(n.href)}getIntegrityForCacheKey(e){return this._cacheKeysToIntegrities.get(e)}async matchPrecache(e){const n=e instanceof Request?e.url:e,s=this.getCacheKeyForURL(n);if(s)return(await self.caches.open(this.strategy.cacheName)).match(s)}createHandlerBoundToURL(e){const n=this.getCacheKeyForURL(e);if(!n)throw new u("non-precached-url",{url:e});return s=>(s.request=new Request(e),s.params=Object.assign({cacheKey:n},s.params),this.strategy.handle(s))}}let X;const Pe=()=>(X||(X=new Ct),X);try{self["workbox:routing:6.5.2"]&&_()}catch{}const Le="GET",$=t=>t&&typeof t=="object"?t:{handle:t};class D{constructor(e,n,s=Le){this.handler=$(n),this.match=e,this.method=s}setCatchHandler(e){this.catchHandler=$(e)}}class Et extends D{constructor(e,n,s){const r=({url:i})=>{const o=e.exec(i.href);if(!!o&&!(i.origin!==location.origin&&o.index!==0))return o.slice(1)};super(r,n,s)}}class Tt{constructor(){this._routes=new Map,this._defaultHandlerMap=new Map}get routes(){return this._routes}addFetchListener(){self.addEventListener("fetch",e=>{const{request:n}=e,s=this.handleRequest({request:n,event:e});s&&e.respondWith(s)})}addCacheListener(){self.addEventListener("message",e=>{if(e.data&&e.data.type==="CACHE_URLS"){const{payload:n}=e.data,s=Promise.all(n.urlsToCache.map(r=>{typeof r=="string"&&(r=[r]);const i=new Request(...r);return this.handleRequest({request:i,event:e})}));e.waitUntil(s),e.ports&&e.ports[0]&&s.then(()=>e.ports[0].postMessage(!0))}})}handleRequest({request:e,event:n}){const s=new URL(e.url,location.href);if(!s.protocol.startsWith("http"))return;const r=s.origin===location.origin,{params:i,route:o}=this.findMatchingRoute({event:n,request:e,sameOrigin:r,url:s});let a=o&&o.handler;const c=e.method;if(!a&&this._defaultHandlerMap.has(c)&&(a=this._defaultHandlerMap.get(c)),!a)return;let f;try{f=a.handle({url:s,request:e,event:n,params:i})}catch(d){f=Promise.reject(d)}const C=o&&o.catchHandler;return f instanceof Promise&&(this._catchHandler||C)&&(f=f.catch(async d=>{if(C)try{return await C.handle({url:s,request:e,event:n,params:i})}catch(ve){ve instanceof Error&&(d=ve)}if(this._catchHandler)return this._catchHandler.handle({url:s,request:e,event:n});throw d})),f}findMatchingRoute({url:e,sameOrigin:n,request:s,event:r}){const i=this._routes.get(s.method)||[];for(const o of i){let a;const c=o.match({url:e,sameOrigin:n,request:s,event:r});if(c)return a=c,(Array.isArray(a)&&a.length===0||c.constructor===Object&&Object.keys(c).length===0||typeof c=="boolean")&&(a=void 0),{route:o,params:a}}return{}}setDefaultHandler(e,n=Le){this._defaultHandlerMap.set(n,$(e))}setCatchHandler(e){this._catchHandler=$(e)}registerRoute(e){this._routes.has(e.method)||this._routes.set(e.method,[]),this._routes.get(e.method).push(e)}unregisterRoute(e){if(!this._routes.has(e.method))throw new u("unregister-route-but-not-found-with-method",{method:e.method});const n=this._routes.get(e.method).indexOf(e);if(n>-1)this._routes.get(e.method).splice(n,1);else throw new u("unregister-route-route-not-registered")}}let O;const St=()=>(O||(O=new Tt,O.addFetchListener(),O.addCacheListener()),O);function At(t,e,n){let s;if(typeof t=="string"){const i=new URL(t,location.href),o=({url:a})=>a.href===i.href;s=new D(o,e,n)}else if(t instanceof RegExp)s=new Et(t,e,n);else if(typeof t=="function")s=new D(t,e,n);else if(t instanceof D)s=t;else throw new u("unsupported-route-type",{moduleName:"workbox-routing",funcName:"registerRoute",paramName:"capture"});return St().registerRoute(s),s}function Ot(t,e=[]){for(const n of[...t.searchParams.keys()])e.some(s=>s.test(n))&&t.searchParams.delete(n);return t}function*Dt(t,{ignoreURLParametersMatching:e=[/^utm_/,/^fbclid$/],directoryIndex:n="index.html",cleanURLs:s=!0,urlManipulation:r}={}){const i=new URL(t,location.href);i.hash="",yield i.href;const o=Ot(i,e);if(yield o.href,n&&o.pathname.endsWith("/")){const a=new URL(o.href);a.pathname+=n,yield a.href}if(s){const a=new URL(o.href);a.pathname+=".html",yield a.href}if(r){const a=r({url:i});for(const c of a)yield c.href}}class Nt extends D{constructor(e,n){const s=({request:r})=>{const i=e.getURLsToCacheKeys();for(const o of Dt(r.url,n)){const a=i.get(o);if(a){const c=e.getIntegrityForCacheKey(a);return{cacheKey:a,integrity:c}}}};super(s,e.strategy)}}function Pt(t){const e=Pe(),n=new Nt(e,t);At(n)}const Lt="-precache-",Mt=async(t,e=Lt)=>{const s=(await self.caches.keys()).filter(r=>r.includes(e)&&r.includes(self.registration.scope)&&r!==t);return await Promise.all(s.map(r=>self.caches.delete(r))),s};function $t(){self.addEventListener("activate",t=>{const e=q.getPrecacheName();t.waitUntil(Mt(e).then(n=>{}))})}function xt(t){Pe().precache(t)}function Kt(t,e){xt(t),Pt(e)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *//**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ut{constructor(){this.reject=()=>{},this.resolve=()=>{},this.promise=new Promise((e,n)=>{this.resolve=e,this.reject=n})}wrapCallback(e){return(n,s)=>{n?this.reject(n):this.resolve(s),typeof e=="function"&&(this.promise.catch(()=>{}),e.length===1?e(n):e(n,s))}}}function jt(){return typeof indexedDB=="object"}function Ft(){return new Promise((t,e)=>{try{let n=!0;const s="validate-browser-context-for-indexeddb-analytics-module",r=self.indexedDB.open(s);r.onsuccess=()=>{r.result.close(),n||self.indexedDB.deleteDatabase(s),t(!0)},r.onupgradeneeded=()=>{n=!1},r.onerror=()=>{var i;e(((i=r.error)===null||i===void 0?void 0:i.message)||"")}}catch(n){e(n)}})}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const qt="FirebaseError";class B extends Error{constructor(e,n,s){super(n),this.code=e,this.customData=s,this.name=qt,Object.setPrototypeOf(this,B.prototype),Error.captureStackTrace&&Error.captureStackTrace(this,H.prototype.create)}}class H{constructor(e,n,s){this.service=e,this.serviceName=n,this.errors=s}create(e,...n){const s=n[0]||{},r=`${this.service}/${e}`,i=this.errors[e],o=i?Bt(i,s):"Error",a=`${this.serviceName}: ${o} (${r}).`;return new B(r,a,s)}}function Bt(t,e){return t.replace(Ht,(n,s)=>{const r=e[s];return r!=null?String(r):`<${s}?>`})}const Ht=/\{\$([^}]+)}/g;function ie(t,e){if(t===e)return!0;const n=Object.keys(t),s=Object.keys(e);for(const r of n){if(!s.includes(r))return!1;const i=t[r],o=e[r];if(Te(i)&&Te(o)){if(!ie(i,o))return!1}else if(i!==o)return!1}for(const r of s)if(!n.includes(r))return!1;return!0}function Te(t){return t!==null&&typeof t=="object"}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Vt(t){return t&&t._delegate?t._delegate:t}class T{constructor(e,n,s){this.name=e,this.instanceFactory=n,this.type=s,this.multipleInstances=!1,this.serviceProps={},this.instantiationMode="LAZY",this.onInstanceCreated=null}setInstantiationMode(e){return this.instantiationMode=e,this}setMultipleInstances(e){return this.multipleInstances=e,this}setServiceProps(e){return this.serviceProps=e,this}setInstanceCreatedCallback(e){return this.onInstanceCreated=e,this}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const y="[DEFAULT]";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Wt{constructor(e,n){this.name=e,this.container=n,this.component=null,this.instances=new Map,this.instancesDeferred=new Map,this.instancesOptions=new Map,this.onInitCallbacks=new Map}get(e){const n=this.normalizeInstanceIdentifier(e);if(!this.instancesDeferred.has(n)){const s=new Ut;if(this.instancesDeferred.set(n,s),this.isInitialized(n)||this.shouldAutoInitialize())try{const r=this.getOrInitializeService({instanceIdentifier:n});r&&s.resolve(r)}catch{}}return this.instancesDeferred.get(n).promise}getImmediate(e){var n;const s=this.normalizeInstanceIdentifier(e==null?void 0:e.identifier),r=(n=e==null?void 0:e.optional)!==null&&n!==void 0?n:!1;if(this.isInitialized(s)||this.shouldAutoInitialize())try{return this.getOrInitializeService({instanceIdentifier:s})}catch(i){if(r)return null;throw i}else{if(r)return null;throw Error(`Service ${this.name} is not available`)}}getComponent(){return this.component}setComponent(e){if(e.name!==this.name)throw Error(`Mismatching Component ${e.name} for Provider ${this.name}.`);if(this.component)throw Error(`Component for ${this.name} has already been provided`);if(this.component=e,!!this.shouldAutoInitialize()){if(Gt(e))try{this.getOrInitializeService({instanceIdentifier:y})}catch{}for(const[n,s]of this.instancesDeferred.entries()){const r=this.normalizeInstanceIdentifier(n);try{const i=this.getOrInitializeService({instanceIdentifier:r});s.resolve(i)}catch{}}}}clearInstance(e=y){this.instancesDeferred.delete(e),this.instancesOptions.delete(e),this.instances.delete(e)}async delete(){const e=Array.from(this.instances.values());await Promise.all([...e.filter(n=>"INTERNAL"in n).map(n=>n.INTERNAL.delete()),...e.filter(n=>"_delete"in n).map(n=>n._delete())])}isComponentSet(){return this.component!=null}isInitialized(e=y){return this.instances.has(e)}getOptions(e=y){return this.instancesOptions.get(e)||{}}initialize(e={}){const{options:n={}}=e,s=this.normalizeInstanceIdentifier(e.instanceIdentifier);if(this.isInitialized(s))throw Error(`${this.name}(${s}) has already been initialized`);if(!this.isComponentSet())throw Error(`Component ${this.name} has not been registered yet`);const r=this.getOrInitializeService({instanceIdentifier:s,options:n});for(const[i,o]of this.instancesDeferred.entries()){const a=this.normalizeInstanceIdentifier(i);s===a&&o.resolve(r)}return r}onInit(e,n){var s;const r=this.normalizeInstanceIdentifier(n),i=(s=this.onInitCallbacks.get(r))!==null&&s!==void 0?s:new Set;i.add(e),this.onInitCallbacks.set(r,i);const o=this.instances.get(r);return o&&e(o,r),()=>{i.delete(e)}}invokeOnInitCallbacks(e,n){const s=this.onInitCallbacks.get(n);if(!!s)for(const r of s)try{r(e,n)}catch{}}getOrInitializeService({instanceIdentifier:e,options:n={}}){let s=this.instances.get(e);if(!s&&this.component&&(s=this.component.instanceFactory(this.container,{instanceIdentifier:zt(e),options:n}),this.instances.set(e,s),this.instancesOptions.set(e,n),this.invokeOnInitCallbacks(s,e),this.component.onInstanceCreated))try{this.component.onInstanceCreated(this.container,e,s)}catch{}return s||null}normalizeInstanceIdentifier(e=y){return this.component?this.component.multipleInstances?e:y:e}shouldAutoInitialize(){return!!this.component&&this.component.instantiationMode!=="EXPLICIT"}}function zt(t){return t===y?void 0:t}function Gt(t){return t.instantiationMode==="EAGER"}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Jt{constructor(e){this.name=e,this.providers=new Map}addComponent(e){const n=this.getProvider(e.name);if(n.isComponentSet())throw new Error(`Component ${e.name} has already been registered with ${this.name}`);n.setComponent(e)}addOrOverwriteComponent(e){this.getProvider(e.name).isComponentSet()&&this.providers.delete(e.name),this.addComponent(e)}getProvider(e){if(this.providers.has(e))return this.providers.get(e);const n=new Wt(e,this);return this.providers.set(e,n),n}getProviders(){return Array.from(this.providers.values())}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var l;(function(t){t[t.DEBUG=0]="DEBUG",t[t.VERBOSE=1]="VERBOSE",t[t.INFO=2]="INFO",t[t.WARN=3]="WARN",t[t.ERROR=4]="ERROR",t[t.SILENT=5]="SILENT"})(l||(l={}));const Yt={debug:l.DEBUG,verbose:l.VERBOSE,info:l.INFO,warn:l.WARN,error:l.ERROR,silent:l.SILENT},Qt=l.INFO,Xt={[l.DEBUG]:"log",[l.VERBOSE]:"log",[l.INFO]:"info",[l.WARN]:"warn",[l.ERROR]:"error"},Zt=(t,e,...n)=>{if(e<t.logLevel)return;const s=new Date().toISOString(),r=Xt[e];if(r)console[r](`[${s}]  ${t.name}:`,...n);else throw new Error(`Attempted to log a message with an invalid logType (value: ${e})`)};class en{constructor(e){this.name=e,this._logLevel=Qt,this._logHandler=Zt,this._userLogHandler=null}get logLevel(){return this._logLevel}set logLevel(e){if(!(e in l))throw new TypeError(`Invalid value "${e}" assigned to \`logLevel\``);this._logLevel=e}setLogLevel(e){this._logLevel=typeof e=="string"?Yt[e]:e}get logHandler(){return this._logHandler}set logHandler(e){if(typeof e!="function")throw new TypeError("Value assigned to `logHandler` must be a function");this._logHandler=e}get userLogHandler(){return this._userLogHandler}set userLogHandler(e){this._userLogHandler=e}debug(...e){this._userLogHandler&&this._userLogHandler(this,l.DEBUG,...e),this._logHandler(this,l.DEBUG,...e)}log(...e){this._userLogHandler&&this._userLogHandler(this,l.VERBOSE,...e),this._logHandler(this,l.VERBOSE,...e)}info(...e){this._userLogHandler&&this._userLogHandler(this,l.INFO,...e),this._logHandler(this,l.INFO,...e)}warn(...e){this._userLogHandler&&this._userLogHandler(this,l.WARN,...e),this._logHandler(this,l.WARN,...e)}error(...e){this._userLogHandler&&this._userLogHandler(this,l.ERROR,...e),this._logHandler(this,l.ERROR,...e)}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class tn{constructor(e){this.container=e}getPlatformInfoString(){return this.container.getProviders().map(n=>{if(nn(n)){const s=n.getImmediate();return`${s.library}/${s.version}`}else return null}).filter(n=>n).join(" ")}}function nn(t){const e=t.getComponent();return(e==null?void 0:e.type)==="VERSION"}const oe="@firebase/app",Se="0.7.11";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const ue=new en("@firebase/app"),sn="@firebase/app-compat",rn="@firebase/analytics-compat",on="@firebase/analytics",an="@firebase/app-check-compat",cn="@firebase/app-check",ln="@firebase/auth",un="@firebase/auth-compat",fn="@firebase/database",hn="@firebase/database-compat",dn="@firebase/functions",pn="@firebase/functions-compat",gn="@firebase/installations",mn="@firebase/installations-compat",wn="@firebase/messaging",yn="@firebase/messaging-compat",bn="@firebase/performance",_n="@firebase/performance-compat",In="@firebase/remote-config",Rn="@firebase/remote-config-compat",kn="@firebase/storage",vn="@firebase/storage-compat",Cn="@firebase/firestore",En="@firebase/firestore-compat",Tn="firebase";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Me="[DEFAULT]",Sn={[oe]:"fire-core",[sn]:"fire-core-compat",[on]:"fire-analytics",[rn]:"fire-analytics-compat",[cn]:"fire-app-check",[an]:"fire-app-check-compat",[ln]:"fire-auth",[un]:"fire-auth-compat",[fn]:"fire-rtdb",[hn]:"fire-rtdb-compat",[dn]:"fire-fn",[pn]:"fire-fn-compat",[gn]:"fire-iid",[mn]:"fire-iid-compat",[wn]:"fire-fcm",[yn]:"fire-fcm-compat",[bn]:"fire-perf",[_n]:"fire-perf-compat",[In]:"fire-rc",[Rn]:"fire-rc-compat",[kn]:"fire-gcs",[vn]:"fire-gcs-compat",[Cn]:"fire-fst",[En]:"fire-fst-compat","fire-js":"fire-js",[Tn]:"fire-js-all"};/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const x=new Map,ae=new Map;function An(t,e){try{t.container.addComponent(e)}catch(n){ue.debug(`Component ${e.name} failed to register with FirebaseApp ${t.name}`,n)}}function N(t){const e=t.name;if(ae.has(e))return ue.debug(`There were multiple attempts to register component ${e}.`),!1;ae.set(e,t);for(const n of x.values())An(n,t);return!0}function fe(t,e){return t.container.getProvider(e)}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const On={["no-app"]:"No Firebase App '{$appName}' has been created - call Firebase App.initializeApp()",["bad-app-name"]:"Illegal App name: '{$appName}",["duplicate-app"]:"Firebase App named '{$appName}' already exists with different options or config",["app-deleted"]:"Firebase App named '{$appName}' already deleted",["invalid-app-argument"]:"firebase.{$appName}() takes either no argument or a Firebase App instance.",["invalid-log-argument"]:"First argument to `onLog` must be null or a function."},K=new H("app","Firebase",On);/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Dn{constructor(e,n,s){this._isDeleted=!1,this._options=Object.assign({},e),this._config=Object.assign({},n),this._name=n.name,this._automaticDataCollectionEnabled=n.automaticDataCollectionEnabled,this._container=s,this.container.addComponent(new T("app",()=>this,"PUBLIC"))}get automaticDataCollectionEnabled(){return this.checkDestroyed(),this._automaticDataCollectionEnabled}set automaticDataCollectionEnabled(e){this.checkDestroyed(),this._automaticDataCollectionEnabled=e}get name(){return this.checkDestroyed(),this._name}get options(){return this.checkDestroyed(),this._options}get config(){return this.checkDestroyed(),this._config}get container(){return this._container}get isDeleted(){return this._isDeleted}set isDeleted(e){this._isDeleted=e}checkDestroyed(){if(this.isDeleted)throw K.create("app-deleted",{appName:this._name})}}function Nn(t,e={}){typeof e!="object"&&(e={name:e});const n=Object.assign({name:Me,automaticDataCollectionEnabled:!1},e),s=n.name;if(typeof s!="string"||!s)throw K.create("bad-app-name",{appName:String(s)});const r=x.get(s);if(r){if(ie(t,r.options)&&ie(n,r.config))return r;throw K.create("duplicate-app",{appName:s})}const i=new Jt(s);for(const a of ae.values())i.addComponent(a);const o=new Dn(t,n,i);return x.set(s,o),o}function Pn(t=Me){const e=x.get(t);if(!e)throw K.create("no-app",{appName:t});return e}function E(t,e,n){var s;let r=(s=Sn[t])!==null&&s!==void 0?s:t;n&&(r+=`-${n}`);const i=r.match(/\s|\//),o=e.match(/\s|\//);if(i||o){const a=[`Unable to register library "${r}" with version "${e}":`];i&&a.push(`library name "${r}" contains illegal characters (whitespace or "/")`),i&&o&&a.push("and"),o&&a.push(`version name "${e}" contains illegal characters (whitespace or "/")`),ue.warn(a.join(" "));return}N(new T(`${r}-version`,()=>({library:r,version:e}),"VERSION"))}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Ln(t){N(new T("platform-logger",e=>new tn(e),"PRIVATE")),E(oe,Se,t),E(oe,Se,"esm2017"),E("fire-js","")}Ln("");var Mn="firebase",$n="9.6.1";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */E(Mn,$n,"app");function xn(t){return Array.prototype.slice.call(t)}function $e(t){return new Promise(function(e,n){t.onsuccess=function(){e(t.result)},t.onerror=function(){n(t.error)}})}function V(t,e,n){var s,r=new Promise(function(i,o){s=t[e].apply(t,n),$e(s).then(i,o)});return r.request=s,r}function Kn(t,e,n){var s=V(t,e,n);return s.then(function(r){if(!!r)return new P(r,s.request)})}function S(t,e,n){n.forEach(function(s){Object.defineProperty(t.prototype,s,{get:function(){return this[e][s]},set:function(r){this[e][s]=r}})})}function he(t,e,n,s){s.forEach(function(r){r in n.prototype&&(t.prototype[r]=function(){return V(this[e],r,arguments)})})}function W(t,e,n,s){s.forEach(function(r){r in n.prototype&&(t.prototype[r]=function(){return this[e][r].apply(this[e],arguments)})})}function xe(t,e,n,s){s.forEach(function(r){r in n.prototype&&(t.prototype[r]=function(){return Kn(this[e],r,arguments)})})}function v(t){this._index=t}S(v,"_index",["name","keyPath","multiEntry","unique"]);he(v,"_index",IDBIndex,["get","getKey","getAll","getAllKeys","count"]);xe(v,"_index",IDBIndex,["openCursor","openKeyCursor"]);function P(t,e){this._cursor=t,this._request=e}S(P,"_cursor",["direction","key","primaryKey","value"]);he(P,"_cursor",IDBCursor,["update","delete"]);["advance","continue","continuePrimaryKey"].forEach(function(t){t in IDBCursor.prototype&&(P.prototype[t]=function(){var e=this,n=arguments;return Promise.resolve().then(function(){return e._cursor[t].apply(e._cursor,n),$e(e._request).then(function(s){if(!!s)return new P(s,e._request)})})})});function p(t){this._store=t}p.prototype.createIndex=function(){return new v(this._store.createIndex.apply(this._store,arguments))};p.prototype.index=function(){return new v(this._store.index.apply(this._store,arguments))};S(p,"_store",["name","keyPath","indexNames","autoIncrement"]);he(p,"_store",IDBObjectStore,["put","add","delete","clear","get","getAll","getKey","getAllKeys","count"]);xe(p,"_store",IDBObjectStore,["openCursor","openKeyCursor"]);W(p,"_store",IDBObjectStore,["deleteIndex"]);function L(t){this._tx=t,this.complete=new Promise(function(e,n){t.oncomplete=function(){e()},t.onerror=function(){n(t.error)},t.onabort=function(){n(t.error)}})}L.prototype.objectStore=function(){return new p(this._tx.objectStore.apply(this._tx,arguments))};S(L,"_tx",["objectStoreNames","mode"]);W(L,"_tx",IDBTransaction,["abort"]);function z(t,e,n){this._db=t,this.oldVersion=e,this.transaction=new L(n)}z.prototype.createObjectStore=function(){return new p(this._db.createObjectStore.apply(this._db,arguments))};S(z,"_db",["name","version","objectStoreNames"]);W(z,"_db",IDBDatabase,["deleteObjectStore","close"]);function G(t){this._db=t}G.prototype.transaction=function(){return new L(this._db.transaction.apply(this._db,arguments))};S(G,"_db",["name","version","objectStoreNames"]);W(G,"_db",IDBDatabase,["close"]);["openCursor","openKeyCursor"].forEach(function(t){[p,v].forEach(function(e){t in e.prototype&&(e.prototype[t.replace("open","iterate")]=function(){var n=xn(arguments),s=n[n.length-1],r=this._store||this._index,i=r[t].apply(r,n.slice(0,-1));i.onsuccess=function(){s(i.result)}})})});[v,p].forEach(function(t){t.prototype.getAll||(t.prototype.getAll=function(e,n){var s=this,r=[];return new Promise(function(i){s.iterateCursor(e,function(o){if(!o){i(r);return}if(r.push(o.value),n!==void 0&&r.length==n){i(r);return}o.continue()})})})});function de(t,e,n){var s=V(indexedDB,"open",[t,e]),r=s.request;return r&&(r.onupgradeneeded=function(i){n&&n(new z(r.result,i.oldVersion,r.transaction))}),s.then(function(i){return new G(i)})}function Z(t){return V(indexedDB,"deleteDatabase",[t])}const Ke="@firebase/installations",pe="0.5.4";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Ue=1e4,je=`w:${pe}`,Fe="FIS_v2",Un="https://firebaseinstallations.googleapis.com/v1",jn=60*60*1e3,Fn="installations",qn="Installations";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Bn={["missing-app-config-values"]:'Missing App configuration value: "{$valueName}"',["not-registered"]:"Firebase Installation is not registered.",["installation-not-found"]:"Firebase Installation not found.",["request-failed"]:'{$requestName} request failed with error "{$serverCode} {$serverStatus}: {$serverMessage}"',["app-offline"]:"Could not process request. Application offline.",["delete-pending-registration"]:"Can't delete installation while there is a pending registration request."},I=new H(Fn,qn,Bn);function qe(t){return t instanceof B&&t.code.includes("request-failed")}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Be({projectId:t}){return`${Un}/projects/${t}/installations`}function He(t){return{token:t.token,requestStatus:2,expiresIn:Vn(t.expiresIn),creationTime:Date.now()}}async function Ve(t,e){const s=(await e.json()).error;return I.create("request-failed",{requestName:t,serverCode:s.code,serverMessage:s.message,serverStatus:s.status})}function We({apiKey:t}){return new Headers({"Content-Type":"application/json",Accept:"application/json","x-goog-api-key":t})}function Hn(t,{refreshToken:e}){const n=We(t);return n.append("Authorization",Wn(e)),n}async function ze(t){const e=await t();return e.status>=500&&e.status<600?t():e}function Vn(t){return Number(t.replace("s","000"))}function Wn(t){return`${Fe} ${t}`}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function zn(t,{fid:e}){const n=Be(t),s=We(t),r={fid:e,authVersion:Fe,appId:t.appId,sdkVersion:je},i={method:"POST",headers:s,body:JSON.stringify(r)},o=await ze(()=>fetch(n,i));if(o.ok){const a=await o.json();return{fid:a.fid||e,registrationStatus:2,refreshToken:a.refreshToken,authToken:He(a.authToken)}}else throw await Ve("Create Installation",o)}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Ge(t){return new Promise(e=>{setTimeout(e,t)})}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Gn(t){return btoa(String.fromCharCode(...t)).replace(/\+/g,"-").replace(/\//g,"_")}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Jn=/^[cdef][\w-]{21}$/,ce="";function Yn(){try{const t=new Uint8Array(17);(self.crypto||self.msCrypto).getRandomValues(t),t[0]=112+t[0]%16;const n=Qn(t);return Jn.test(n)?n:ce}catch{return ce}}function Qn(t){return Gn(t).substr(0,22)}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function J(t){return`${t.appName}!${t.appId}`}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Je=new Map;function Ye(t,e){const n=J(t);Qe(n,e),Xn(n,e)}function Qe(t,e){const n=Je.get(t);if(!!n)for(const s of n)s(e)}function Xn(t,e){const n=Zn();n&&n.postMessage({key:t,fid:e}),es()}let b=null;function Zn(){return!b&&"BroadcastChannel"in self&&(b=new BroadcastChannel("[Firebase] FID Change"),b.onmessage=t=>{Qe(t.data.key,t.data.fid)}),b}function es(){Je.size===0&&b&&(b.close(),b=null)}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const ts="firebase-installations-database",ns=1,R="firebase-installations-store";let ee=null;function ge(){return ee||(ee=de(ts,ns,t=>{switch(t.oldVersion){case 0:t.createObjectStore(R)}})),ee}async function U(t,e){const n=J(t),r=(await ge()).transaction(R,"readwrite"),i=r.objectStore(R),o=await i.get(n);return await i.put(e,n),await r.complete,(!o||o.fid!==e.fid)&&Ye(t,e.fid),e}async function Xe(t){const e=J(t),s=(await ge()).transaction(R,"readwrite");await s.objectStore(R).delete(e),await s.complete}async function Y(t,e){const n=J(t),r=(await ge()).transaction(R,"readwrite"),i=r.objectStore(R),o=await i.get(n),a=e(o);return a===void 0?await i.delete(n):await i.put(a,n),await r.complete,a&&(!o||o.fid!==a.fid)&&Ye(t,a.fid),a}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function me(t){let e;const n=await Y(t,s=>{const r=ss(s),i=rs(t,r);return e=i.registrationPromise,i.installationEntry});return n.fid===ce?{installationEntry:await e}:{installationEntry:n,registrationPromise:e}}function ss(t){const e=t||{fid:Yn(),registrationStatus:0};return Ze(e)}function rs(t,e){if(e.registrationStatus===0){if(!navigator.onLine){const r=Promise.reject(I.create("app-offline"));return{installationEntry:e,registrationPromise:r}}const n={fid:e.fid,registrationStatus:1,registrationTime:Date.now()},s=is(t,n);return{installationEntry:n,registrationPromise:s}}else return e.registrationStatus===1?{installationEntry:e,registrationPromise:os(t)}:{installationEntry:e}}async function is(t,e){try{const n=await zn(t,e);return U(t,n)}catch(n){throw qe(n)&&n.customData.serverCode===409?await Xe(t):await U(t,{fid:e.fid,registrationStatus:0}),n}}async function os(t){let e=await Ae(t);for(;e.registrationStatus===1;)await Ge(100),e=await Ae(t);if(e.registrationStatus===0){const{installationEntry:n,registrationPromise:s}=await me(t);return s||n}return e}function Ae(t){return Y(t,e=>{if(!e)throw I.create("installation-not-found");return Ze(e)})}function Ze(t){return as(t)?{fid:t.fid,registrationStatus:0}:t}function as(t){return t.registrationStatus===1&&t.registrationTime+Ue<Date.now()}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function cs({appConfig:t,platformLoggerProvider:e},n){const s=ls(t,n),r=Hn(t,n),i=e.getImmediate({optional:!0});i&&r.append("x-firebase-client",i.getPlatformInfoString());const o={installation:{sdkVersion:je}},a={method:"POST",headers:r,body:JSON.stringify(o)},c=await ze(()=>fetch(s,a));if(c.ok){const f=await c.json();return He(f)}else throw await Ve("Generate Auth Token",c)}function ls(t,{fid:e}){return`${Be(t)}/${e}/authTokens:generate`}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function we(t,e=!1){let n;const s=await Y(t.appConfig,i=>{if(!et(i))throw I.create("not-registered");const o=i.authToken;if(!e&&hs(o))return i;if(o.requestStatus===1)return n=us(t,e),i;{if(!navigator.onLine)throw I.create("app-offline");const a=ps(i);return n=fs(t,a),a}});return n?await n:s.authToken}async function us(t,e){let n=await Oe(t.appConfig);for(;n.authToken.requestStatus===1;)await Ge(100),n=await Oe(t.appConfig);const s=n.authToken;return s.requestStatus===0?we(t,e):s}function Oe(t){return Y(t,e=>{if(!et(e))throw I.create("not-registered");const n=e.authToken;return gs(n)?Object.assign(Object.assign({},e),{authToken:{requestStatus:0}}):e})}async function fs(t,e){try{const n=await cs(t,e),s=Object.assign(Object.assign({},e),{authToken:n});return await U(t.appConfig,s),n}catch(n){if(qe(n)&&(n.customData.serverCode===401||n.customData.serverCode===404))await Xe(t.appConfig);else{const s=Object.assign(Object.assign({},e),{authToken:{requestStatus:0}});await U(t.appConfig,s)}throw n}}function et(t){return t!==void 0&&t.registrationStatus===2}function hs(t){return t.requestStatus===2&&!ds(t)}function ds(t){const e=Date.now();return e<t.creationTime||t.creationTime+t.expiresIn<e+jn}function ps(t){const e={requestStatus:1,requestTime:Date.now()};return Object.assign(Object.assign({},t),{authToken:e})}function gs(t){return t.requestStatus===1&&t.requestTime+Ue<Date.now()}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function ms(t){const e=t,{installationEntry:n,registrationPromise:s}=await me(e.appConfig);return s?s.catch(console.error):we(e).catch(console.error),n.fid}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function ws(t,e=!1){const n=t;return await ys(n.appConfig),(await we(n,e)).token}async function ys(t){const{registrationPromise:e}=await me(t);e&&await e}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function bs(t){if(!t||!t.options)throw te("App Configuration");if(!t.name)throw te("App Name");const e=["projectId","apiKey","appId"];for(const n of e)if(!t.options[n])throw te(n);return{appName:t.name,projectId:t.options.projectId,apiKey:t.options.apiKey,appId:t.options.appId}}function te(t){return I.create("missing-app-config-values",{valueName:t})}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const tt="installations",_s="installations-internal",Is=t=>{const e=t.getProvider("app").getImmediate(),n=bs(e),s=fe(e,"platform-logger");return{app:e,appConfig:n,platformLoggerProvider:s,_delete:()=>Promise.resolve()}},Rs=t=>{const e=t.getProvider("app").getImmediate(),n=fe(e,tt).getImmediate();return{getId:()=>ms(n),getToken:r=>ws(n,r)}};function ks(){N(new T(tt,Is,"PUBLIC")),N(new T(_s,Rs,"PRIVATE"))}ks();E(Ke,pe);E(Ke,pe,"esm2017");/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const nt="BDOU99-h67HcA6JeFXHbSNMu7e2yNNu3RzoMj8TM4W88jITfq7ZmPvIM1Iv-4_l2LxQcYwhqby2xGpWwzjfAnG4",vs="https://fcmregistrations.googleapis.com/v1",st="FCM_MSG",Cs="google.c.a.c_id",Es=3,Ts=1;var j;(function(t){t[t.DATA_MESSAGE=1]="DATA_MESSAGE",t[t.DISPLAY_NOTIFICATION=3]="DISPLAY_NOTIFICATION"})(j||(j={}));/**
 * @license
 * Copyright 2018 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License"); you may not use this file except
 * in compliance with the License. You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software distributed under the License
 * is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express
 * or implied. See the License for the specific language governing permissions and limitations under
 * the License.
 */var F;(function(t){t.PUSH_RECEIVED="push-received",t.NOTIFICATION_CLICKED="notification-clicked"})(F||(F={}));/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function g(t){const e=new Uint8Array(t);return btoa(String.fromCharCode(...e)).replace(/=/g,"").replace(/\+/g,"-").replace(/\//g,"_")}function Ss(t){const e="=".repeat((4-t.length%4)%4),n=(t+e).replace(/\-/g,"+").replace(/_/g,"/"),s=atob(n),r=new Uint8Array(s.length);for(let i=0;i<s.length;++i)r[i]=s.charCodeAt(i);return r}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const ne="fcm_token_details_db",As=5,De="fcm_token_object_Store";async function Os(t){if("databases"in indexedDB&&!(await indexedDB.databases()).map(i=>i.name).includes(ne))return null;let e=null;return(await de(ne,As,async s=>{var r;if(s.oldVersion<2||!s.objectStoreNames.contains(De))return;const i=s.transaction.objectStore(De),o=await i.index("fcmSenderId").get(t);if(await i.clear(),!!o){if(s.oldVersion===2){const a=o;if(!a.auth||!a.p256dh||!a.endpoint)return;e={token:a.fcmToken,createTime:(r=a.createTime)!==null&&r!==void 0?r:Date.now(),subscriptionOptions:{auth:a.auth,p256dh:a.p256dh,endpoint:a.endpoint,swScope:a.swScope,vapidKey:typeof a.vapidKey=="string"?a.vapidKey:g(a.vapidKey)}}}else if(s.oldVersion===3){const a=o;e={token:a.fcmToken,createTime:a.createTime,subscriptionOptions:{auth:g(a.auth),p256dh:g(a.p256dh),endpoint:a.endpoint,swScope:a.swScope,vapidKey:g(a.vapidKey)}}}else if(s.oldVersion===4){const a=o;e={token:a.fcmToken,createTime:a.createTime,subscriptionOptions:{auth:g(a.auth),p256dh:g(a.p256dh),endpoint:a.endpoint,swScope:a.swScope,vapidKey:g(a.vapidKey)}}}}})).close(),await Z(ne),await Z("fcm_vapid_details_db"),await Z("undefined"),Ds(e)?e:null}function Ds(t){if(!t||!t.subscriptionOptions)return!1;const{subscriptionOptions:e}=t;return typeof t.createTime=="number"&&t.createTime>0&&typeof t.token=="string"&&t.token.length>0&&typeof e.auth=="string"&&e.auth.length>0&&typeof e.p256dh=="string"&&e.p256dh.length>0&&typeof e.endpoint=="string"&&e.endpoint.length>0&&typeof e.swScope=="string"&&e.swScope.length>0&&typeof e.vapidKey=="string"&&e.vapidKey.length>0}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Ns="firebase-messaging-database",Ps=1,k="firebase-messaging-store";let se=null;function ye(){return se||(se=de(Ns,Ps,t=>{switch(t.oldVersion){case 0:t.createObjectStore(k)}})),se}async function be(t){const e=Ie(t),s=await(await ye()).transaction(k).objectStore(k).get(e);if(s)return s;{const r=await Os(t.appConfig.senderId);if(r)return await _e(t,r),r}}async function _e(t,e){const n=Ie(t),r=(await ye()).transaction(k,"readwrite");return await r.objectStore(k).put(e,n),await r.complete,e}async function Ls(t){const e=Ie(t),s=(await ye()).transaction(k,"readwrite");await s.objectStore(k).delete(e),await s.complete}function Ie({appConfig:t}){return t.appId}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Ms={["missing-app-config-values"]:'Missing App configuration value: "{$valueName}"',["only-available-in-window"]:"This method is available in a Window context.",["only-available-in-sw"]:"This method is available in a service worker context.",["permission-default"]:"The notification permission was not granted and dismissed instead.",["permission-blocked"]:"The notification permission was not granted and blocked instead.",["unsupported-browser"]:"This browser doesn't support the API's required to use the Firebase SDK.",["indexed-db-unsupported"]:"This browser doesn't support indexedDb.open() (ex. Safari iFrame, Firefox Private Browsing, etc)",["failed-service-worker-registration"]:"We are unable to register the default service worker. {$browserErrorMessage}",["token-subscribe-failed"]:"A problem occurred while subscribing the user to FCM: {$errorInfo}",["token-subscribe-no-token"]:"FCM returned no token when subscribing the user to push.",["token-unsubscribe-failed"]:"A problem occurred while unsubscribing the user from FCM: {$errorInfo}",["token-update-failed"]:"A problem occurred while updating the user from FCM: {$errorInfo}",["token-update-no-token"]:"FCM returned no token when updating the user to push.",["use-sw-after-get-token"]:"The useServiceWorker() method may only be called once and must be called before calling getToken() to ensure your service worker is used.",["invalid-sw-registration"]:"The input to useServiceWorker() must be a ServiceWorkerRegistration.",["invalid-bg-handler"]:"The input to setBackgroundMessageHandler() must be a function.",["invalid-vapid-key"]:"The public VAPID key must be a string.",["use-vapid-key-after-get-token"]:"The usePublicVapidKey() method may only be called once and must be called before calling getToken() to ensure your VAPID key is used."},h=new H("messaging","Messaging",Ms);/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function $s(t,e){const n=await ke(t),s=it(e),r={method:"POST",headers:n,body:JSON.stringify(s)};let i;try{i=await(await fetch(Re(t.appConfig),r)).json()}catch(o){throw h.create("token-subscribe-failed",{errorInfo:o})}if(i.error){const o=i.error.message;throw h.create("token-subscribe-failed",{errorInfo:o})}if(!i.token)throw h.create("token-subscribe-no-token");return i.token}async function xs(t,e){const n=await ke(t),s=it(e.subscriptionOptions),r={method:"PATCH",headers:n,body:JSON.stringify(s)};let i;try{i=await(await fetch(`${Re(t.appConfig)}/${e.token}`,r)).json()}catch(o){throw h.create("token-update-failed",{errorInfo:o})}if(i.error){const o=i.error.message;throw h.create("token-update-failed",{errorInfo:o})}if(!i.token)throw h.create("token-update-no-token");return i.token}async function rt(t,e){const n=await ke(t),s={method:"DELETE",headers:n};try{const i=await(await fetch(`${Re(t.appConfig)}/${e}`,s)).json();if(i.error){const o=i.error.message;throw h.create("token-unsubscribe-failed",{errorInfo:o})}}catch(r){throw h.create("token-unsubscribe-failed",{errorInfo:r})}}function Re({projectId:t}){return`${vs}/projects/${t}/registrations`}async function ke({appConfig:t,installations:e}){const n=await e.getToken();return new Headers({"Content-Type":"application/json",Accept:"application/json","x-goog-api-key":t.apiKey,"x-goog-firebase-installations-auth":`FIS ${n}`})}function it({p256dh:t,auth:e,endpoint:n,vapidKey:s}){const r={web:{endpoint:n,auth:e,p256dh:t}};return s!==nt&&(r.web.applicationPubKey=s),r}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Ks=7*24*60*60*1e3;async function Us(t){const e=await Fs(t.swRegistration,t.vapidKey),n={vapidKey:t.vapidKey,swScope:t.swRegistration.scope,endpoint:e.endpoint,auth:g(e.getKey("auth")),p256dh:g(e.getKey("p256dh"))},s=await be(t.firebaseDependencies);if(s){if(qs(s.subscriptionOptions,n))return Date.now()>=s.createTime+Ks?js(t,{token:s.token,createTime:Date.now(),subscriptionOptions:n}):s.token;try{await rt(t.firebaseDependencies,s.token)}catch(r){console.warn(r)}return Ne(t.firebaseDependencies,n)}else return Ne(t.firebaseDependencies,n)}async function le(t){const e=await be(t.firebaseDependencies);e&&(await rt(t.firebaseDependencies,e.token),await Ls(t.firebaseDependencies));const n=await t.swRegistration.pushManager.getSubscription();return n?n.unsubscribe():!0}async function js(t,e){try{const n=await xs(t.firebaseDependencies,e),s=Object.assign(Object.assign({},e),{token:n,createTime:Date.now()});return await _e(t.firebaseDependencies,s),n}catch(n){throw await le(t),n}}async function Ne(t,e){const s={token:await $s(t,e),createTime:Date.now(),subscriptionOptions:e};return await _e(t,s),s.token}async function Fs(t,e){const n=await t.pushManager.getSubscription();return n||t.pushManager.subscribe({userVisibleOnly:!0,applicationServerKey:Ss(e)})}function qs(t,e){const n=e.vapidKey===t.vapidKey,s=e.endpoint===t.endpoint,r=e.auth===t.auth,i=e.p256dh===t.p256dh;return n&&s&&r&&i}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Bs(t){const e={from:t.from,collapseKey:t.collapse_key,messageId:t.fcm_message_id};return Hs(e,t),Vs(e,t),Ws(e,t),e}function Hs(t,e){if(!e.notification)return;t.notification={};const n=e.notification.title;n&&(t.notification.title=n);const s=e.notification.body;s&&(t.notification.body=s);const r=e.notification.image;r&&(t.notification.image=r)}function Vs(t,e){!e.data||(t.data=e.data)}function Ws(t,e){if(!e.fcmOptions)return;t.fcmOptions={};const n=e.fcmOptions.link;n&&(t.fcmOptions.link=n);const s=e.fcmOptions.analytics_label;s&&(t.fcmOptions.analyticsLabel=s)}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function zs(t){return typeof t=="object"&&!!t&&Cs in t}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Gs(t){return new Promise(e=>{setTimeout(e,t)})}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ot("hts/frbslgigp.ogepscmv/ieo/eaylg","tp:/ieaeogn-agolai.o/1frlglgc/o");ot("AzSCbw63g1R0nCw85jG8","Iaya3yLKwmgvh7cF0q4");async function Js(t,e){const n=Ys(e,await t.firebaseDependencies.installations.getId());Qs(t,n)}function Ys(t,e){var n,s;const r={};return t.from&&(r.project_number=t.from),t.fcm_message_id&&(r.message_id=t.fcm_message_id),r.instance_id=e,t.notification?r.message_type=j.DISPLAY_NOTIFICATION.toString():r.message_type=j.DATA_MESSAGE.toString(),r.sdk_platform=Es.toString(),r.package_name=self.origin.replace(/(^\w+:|^)\/\//,""),t.collapse_key&&(r.collapse_key=t.collapse_key),r.event=Ts.toString(),!((n=t.fcmOptions)===null||n===void 0)&&n.analytics_label&&(r.analytics_label=(s=t.fcmOptions)===null||s===void 0?void 0:s.analytics_label),r}function Qs(t,e){const n={};n.event_time_ms=Math.floor(Date.now()).toString(),n.source_extension_json_proto3=JSON.stringify(e),t.logEvents.push(n)}function ot(t,e){const n=[];for(let s=0;s<t.length;s++)n.push(t.charAt(s)),s<e.length&&n.push(e.charAt(s));return n.join("")}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function Xs(t,e){var n,s;const{newSubscription:r}=t;if(!r){await le(e);return}const i=await be(e.firebaseDependencies);await le(e),e.vapidKey=(s=(n=i==null?void 0:i.subscriptionOptions)===null||n===void 0?void 0:n.vapidKey)!==null&&s!==void 0?s:nt,await Us(e)}async function Zs(t,e){const n=nr(t);if(!n)return;e.deliveryMetricsExportedToBigQueryEnabled&&await Js(e,n);const s=await at();if(rr(s))return ir(s,n);if(n.notification&&await or(tr(n)),!!e&&e.onBackgroundMessageHandler){const r=Bs(n);typeof e.onBackgroundMessageHandler=="function"?e.onBackgroundMessageHandler(r):e.onBackgroundMessageHandler.next(r)}}async function er(t){var e,n;const s=(n=(e=t.notification)===null||e===void 0?void 0:e.data)===null||n===void 0?void 0:n[st];if(s){if(t.action)return}else return;t.stopImmediatePropagation(),t.notification.close();const r=ar(s);if(!r)return;const i=new URL(r,self.location.href),o=new URL(self.location.origin);if(i.host!==o.host)return;let a=await sr(i);if(a?a=await a.focus():(a=await self.clients.openWindow(r),await Gs(3e3)),!!a)return s.messageType=F.NOTIFICATION_CLICKED,s.isFirebaseMessaging=!0,a.postMessage(s)}function tr(t){const e=Object.assign({},t.notification);return e.data={[st]:t},e}function nr({data:t}){if(!t)return null;try{return t.json()}catch{return null}}async function sr(t){const e=await at();for(const n of e){const s=new URL(n.url,self.location.href);if(t.host===s.host)return n}return null}function rr(t){return t.some(e=>e.visibilityState==="visible"&&!e.url.startsWith("chrome-extension://"))}function ir(t,e){e.isFirebaseMessaging=!0,e.messageType=F.PUSH_RECEIVED;for(const n of t)n.postMessage(e)}function at(){return self.clients.matchAll({type:"window",includeUncontrolled:!0})}function or(t){var e;const{actions:n}=t,{maxActions:s}=Notification;return n&&s&&n.length>s&&console.warn(`This browser only supports ${s} actions. The remaining actions will not be displayed.`),self.registration.showNotification((e=t.title)!==null&&e!==void 0?e:"",t)}function ar(t){var e,n,s;const r=(n=(e=t.fcmOptions)===null||e===void 0?void 0:e.link)!==null&&n!==void 0?n:(s=t.notification)===null||s===void 0?void 0:s.click_action;return r||(zs(t.data)?self.location.origin:null)}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function cr(t){if(!t||!t.options)throw re("App Configuration Object");if(!t.name)throw re("App Name");const e=["projectId","apiKey","appId","messagingSenderId"],{options:n}=t;for(const s of e)if(!n[s])throw re(s);return{appName:t.name,projectId:n.projectId,apiKey:n.apiKey,appId:n.appId,senderId:n.messagingSenderId}}function re(t){return h.create("missing-app-config-values",{valueName:t})}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class lr{constructor(e,n,s){this.deliveryMetricsExportedToBigQueryEnabled=!1,this.onBackgroundMessageHandler=null,this.onMessageHandler=null,this.logEvents=[],this.isLogServiceStarted=!1;const r=cr(e);this.firebaseDependencies={app:e,appConfig:r,installations:n,analyticsProvider:s}}_delete(){return Promise.resolve()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const ur=t=>{const e=new lr(t.getProvider("app").getImmediate(),t.getProvider("installations-internal").getImmediate(),t.getProvider("analytics-internal"));return self.addEventListener("push",n=>{n.waitUntil(Zs(n,e))}),self.addEventListener("pushsubscriptionchange",n=>{n.waitUntil(Xs(n,e))}),self.addEventListener("notificationclick",n=>{n.waitUntil(er(n))}),e};function fr(){N(new T("messaging-sw",ur,"PUBLIC"))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function hr(){return jt()&&await Ft()&&"PushManager"in self&&"Notification"in self&&ServiceWorkerRegistration.prototype.hasOwnProperty("showNotification")&&PushSubscription.prototype.hasOwnProperty("getKey")}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function dr(t=Pn()){return hr().then(e=>{if(!e)throw h.create("unsupported-browser")},e=>{throw h.create("indexed-db-unsupported")}),fe(Vt(t),"messaging-sw").getImmediate()}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */fr();var pr={apiKey:"AIzaSyDkC3M4GkH9G00tBnsNiCgsC1R9xGOPLe0",authDomain:"doupak-6480d.firebaseapp.com",projectId:"doupak-6480d",storageBucket:"doupak-6480d.appspot.com",messagingSenderId:"259784749271",appId:"1:259784749271:web:b7328800f91f4e28764092"};const gr=Nn(pr);dr(gr);self.addEventListener("message",t=>{t.data&&t.data.type==="SKIP_WAITING"&&self.skipWaiting()});Kt([{"revision":null,"url":"assets/index.2250cd2f.js"},{"revision":null,"url":"assets/index.8edecee1.css"},{"revision":"ece9cd6162376168f62d00b7d24da8dc","url":"index.html"},{"revision":"61cf66be3a39e51ed4ab660030ac79d7","url":"favicon.svg"},{"revision":"eb4401d1e7cdc08628a2231e9c2069b9","url":"favicon.ico"},{"revision":"5e0bd1c281a62a380d7a948085bfe2d1","url":"robots.txt"},{"revision":"dbd172afa272a342c14f8f301862b0d3","url":"apple-touch-icon.png"},{"revision":"22f4b54ac60950ddd3f5b6096e35beb2","url":"pwa-192x192.png"},{"revision":"0da57c48d3b8c13ca1d08b98a8ffaabd","url":"pwa-512x512.png"},{"revision":"24c4552597a394f34449b29ed1f08ebe","url":"manifest.webmanifest"}]);$t();
