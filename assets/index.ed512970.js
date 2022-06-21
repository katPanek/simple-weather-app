const S=function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const n of document.querySelectorAll('link[rel="modulepreload"]'))i(n);new MutationObserver(n=>{for(const r of n)if(r.type==="childList")for(const d of r.addedNodes)d.tagName==="LINK"&&d.rel==="modulepreload"&&i(d)}).observe(document,{childList:!0,subtree:!0});function o(n){const r={};return n.integrity&&(r.integrity=n.integrity),n.referrerpolicy&&(r.referrerPolicy=n.referrerpolicy),n.crossorigin==="use-credentials"?r.credentials="include":n.crossorigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function i(n){if(n.ep)return;n.ep=!0;const r=o(n);fetch(n.href,r)}};S();function b(e,t,o,i="string"){const n=e["data-id"],r=t["data-id"];let d=e.querySelector(`#${o}-${n}`).innerText,l=t.querySelector(`#${o}-${r}`).innerText;return i==="number"&&(d=Number(d),l=Number(l)),d<l?-1:d>l?1:0}let L=0;const y=document.querySelector(".overlay-loader"),f=document.querySelector(".city-input"),q=document.querySelector(".city-search-btn"),c=document.querySelector(".city-card-list"),g=document.querySelector(".city-card-list-wrapper"),N=document.querySelector("#city-card-template"),a=document.querySelector("#city-card-left-btn"),u=document.querySelector("#city-card-right-btn"),w=document.querySelector("#sort-name-btn"),B=document.querySelector("#sort-temperature-btn"),k=document.querySelector("#sort-cards-goup"),m=document.querySelector("#city-input-error-alert"),T=document.querySelector("#city-input-error-message"),I=document.querySelector("#city-input-error-close-btn");window.addEventListener("resize",s);q.addEventListener("click",v);I.addEventListener("click",()=>m.hiden=!0);w.addEventListener("click",W);B.addEventListener("click",M);f.addEventListener("keypress",e=>{e.key==="Enter"&&v()});a.addEventListener("click",()=>{c.scroll({left:c.scrollLeft-(274+24),behavior:"smooth"}),setTimeout(s,400)});u.addEventListener("click",()=>{c.scroll({left:c.scrollLeft+(274+24),behavior:"smooth"}),setTimeout(s,400)});c.addEventListener("wheel",e=>{c.scroll({left:c.scrollLeft+e.deltaY,behavior:"smooth"}),setTimeout(s,400)});function s(){c.scrollWidth>g.scrollWidth?(a.classList.remove("btn-disabled"),u.classList.remove("btn-disabled")):(a.classList.add("btn-disabled"),u.classList.add("btn-disabled")),c.scrollLeft<=0&&a.classList.add("btn-disabled"),c.scrollLeft+c.clientWidth>=c.scrollWidth&&u.classList.add("btn-disabled")}function W(){const t=[...[...c.childNodes].filter(o=>o.tagName!==void 0)].sort((o,i)=>b(o,i,"city"));c.replaceChildren(...t)}function M(){const t=[...[...c.childNodes].filter(o=>o.tagName!==void 0)].sort((o,i)=>b(o,i,"temperature","number"));c.replaceChildren(...t)}function v(){$(f.value),f.value=""}function $(e){y.hidden=!1,fetch(`https://api.weatherapi.com/v1/current.json?key=6dff9e9af6924898825174855223005&q=${e}&aqi=yes`).then(t=>t.json()).then(t=>{if(t.error)throw new Error(t.error.message);return t}).then(t=>{const o=t.location.name,i=t.current.temp_c,n=t.current.condition.icon,r=t.current.condition.text;A(L,o,i,n,r),y.hidden=!0,C(!1),s(),m.hidden=!0,L++}).catch(t=>{y.hidden=!0,m.hidden=!1,T.innerHTML=t})}function C(e){a.hidden=e,u.hidden=e,k.hidden=e}function A(e,t,o,i,n){const r=N.cloneNode(!0),d=r.querySelector("#city"),l=r.querySelector("#temperature"),h=r.querySelector("#weather-icon"),p=r.querySelector("#weather-condition"),E=r.querySelector("#city-card-delete-btn");r.hidden=!1,r.id="city-card-"+e,r["data-id"]=e,d.id="city-"+e,d.innerHTML=t,l.id="temperature-"+e,l.innerHTML=Math.round(o),h.id="weather-icon-"+e,h.src=i,p.id="weather-condition-"+e,p.innerHTML=n,E.id="city-card-delete-btn-"+e,E.addEventListener("click",()=>D(e)),c.appendChild(r)}function D(e){O(e).remove(),s(),[...c.childNodes].filter(o=>o.tagName!==void 0).length===0&&C(!0)}function O(e){return document.querySelector(`#city-card-${e}`)}