(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const t of document.querySelectorAll('link[rel="modulepreload"]'))s(t);new MutationObserver(t=>{for(const r of t)if(r.type==="childList")for(const c of r.addedNodes)c.tagName==="LINK"&&c.rel==="modulepreload"&&s(c)}).observe(document,{childList:!0,subtree:!0});function n(t){const r={};return t.integrity&&(r.integrity=t.integrity),t.referrerPolicy&&(r.referrerPolicy=t.referrerPolicy),t.crossOrigin==="use-credentials"?r.credentials="include":t.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function s(t){if(t.ep)return;t.ep=!0;const r=n(t);fetch(t.href,r)}})();const d=async(o,e={})=>{try{const n=await fetch(o,e);if(!n.ok)throw new Error(`Fetch failed. ${n.status} ${n.statusText}`);return[(n.headers.get("content-type")||"").includes("application/json")?await n.json():await n.text(),null]}catch(n){return console.error(n.message),[null,n]}},u=async o=>{const e=`https://pokeapi.co/api/v2/pokemon/${o}`,[n,s]=await d(e);return console.log(n),s?(console.error("Cannot fetch details for",o),null):n},f=async()=>{const o="https://pokeapi.co/api/v2/pokemon/?&limit=20",[e,n]=await d(o);if(n){console.error("Cannot fetch names");return}const s=e.results,t=document.querySelector("#fetch-cards");s.forEach(async r=>{try{const c=await u(r.name),a=p(c);t.append(a)}catch{console.warn("failed to fetch pokemon name")}})},p=o=>{const e=document.createElement("li");e.classList.add("pokemon-card");const n=document.createElement("h3");n.textContent=o.name;const s=document.createElement("p");s.textContent=`Height: ${o.height}`;const t=document.createElement("p");t.textContent=`Weight: ${o.weight}`;const r=document.createElement("p");r.textContent=`Type(s): ${o.types.map(m=>m.type.name).join(", ")}`;const c=l(o.sprites.front_default),a=l(o.sprites.front_shiny);a.style.display="none";let i=!0;return e.addEventListener("click",()=>{i=!i,i?(a.style.display="none",c.style.display="block"):(a.style.display="block",c.style.display="none")}),e.append(n),e.append(c),e.append(a),e.appendChild(s),e.appendChild(t),e.appendChild(r),e},l=o=>{const e=document.createElement("img");return e.src=o,e.id="random",e.alt="pokemon-image",e.title="click on me",e.classList.add("image"),e},h=async o=>{o.preventDefault();const e=document.querySelector("#pokemon-search").value;console.log(e);const n=await u(e),s=document.querySelector("#search-list"),t=p(n);s.append(t)},y=document.querySelector("#search-bar");y.addEventListener("submit",h);f();
