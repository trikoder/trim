import{_ as a,a8 as n,a9 as r}from"./index-58233bfe.js";import o from"./date-1988aea6.js";const i={elementType:"dateTime",extends:o,props:{format:{type:String,default:"ISOString"},displayFormat:{type:String,default:"DD.MM.YYYY HH:mm"},pickTime:{type:Boolean,default:!0},pickMinutes:{type:Boolean,default:!0},pickSeconds:{type:Boolean,default:!1},parseDate:{type:Function,default:(e,t)=>t==="ISOString"?new Date(e):n(e,t)},formatDate:{type:Function,default:(e,t)=>t==="ISOString"?e.toISOString():r(e,t)}}},l=a(i,[["__file","dateTime.vue"]]);export{l as default};