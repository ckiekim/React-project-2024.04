"use strict";(self.webpackChunkproject=self.webpackChunkproject||[]).push([[359],{35161:(e,t,s)=>{s.d(t,{A:()=>i});var c=s(98623),l=s(93230),n=s(87233),a=s(44414);function i(){return(0,a.jsxs)(l.A,{direction:"row",spacing:2,sx:{display:"flex"},children:[(0,a.jsx)(c.A,{}),(0,a.jsx)(n.A,{children:"\ub85c\ub529\uc911..."})]})}},18359:(e,t,s)=>{s.r(t),s.d(t,{default:()=>y});var c=s(17814),l=s(9950),n=s(67535),a=s(19808),i=s(58094),o=s(93230),r=s(87233),d=s(23912),u=s(42142),m=s(59740),h=s(26938),p=s(74105),x=s(44414);const g=new d.T({cloud:{cloudName:"dqullcaz5"}});function j(e){let{publicId:t}=e;const s=g.image(t).resize((0,u.xn)().width(500).height(500).gravity((0,m.ei)())).delivery((0,h.GP)("auto")).delivery((0,h.Q0)("auto"));return(0,x.jsx)(p.If,{cldImg:s,style:{maxWidth:"100%",borderRadius:"5%"},plugins:[(0,p.qf)()],className:"rounded-lg shadow-lg"})}var f=s(16255),b=s(35161);function w(){const[e,t]=(0,l.useState)({}),[s,c]=(0,l.useState)(!0),[d,u]=(0,l.useState)(!1),[m,h]=(0,l.useState)([]),[p,g]=(0,l.useState)(!1),w=(e,t)=>{if("close"===t.event&&g(!1),t&&"success"===t.event){const e=t.info.secure_url;console.log(e);const s=e.replace("/upload/","/upload/c_thumb,g_auto,h_500,w_500/f_auto/q_auto/");h((e=>[...e,s])),g(!1)}e&&g(!1)};return(0,l.useEffect)((()=>{h([]),(async e=>{const s=await fetch("https://res.cloudinary.com/".concat("dqullcaz5","/image/list/").concat(e,".json")),l=await s.json();t(l),c(!1)})("myphotoalbum-react")}),[]),(0,l.useEffect)((()=>{const e=document.getElementById("uw");if(!d&&!e){const e=document.createElement("script");e.setAttribute("async",""),e.setAttribute("id","uw"),e.src="https://upload-widget.cloudinary.com/global/all.js",e.addEventListener("load",(()=>u(!0))),document.body.appendChild(e)}}),[d]),(0,x.jsxs)(a.A,{maxWidth:"xl",children:[(0,x.jsxs)(o.A,{direction:"row",alignItems:"center",justifyContent:"space-between",mb:5,children:[(0,x.jsx)(r.A,{variant:"h4",children:"Cloudinary Photo Album"}),(0,x.jsx)(n.A,{variant:"contained",color:"inherit",startIcon:(0,x.jsx)(f.A,{icon:"eva:plus-fill"}),onClick:()=>{g(!0),window.cloudinary.openUploadWidget({cloudName:"dqullcaz5",uploadPreset:"c9wxtz7u",sources:["local","url"],tags:["myphotoalbum-react"],clientAllowedFormats:["image"],resourceType:"image"},w)},disabled:p,children:"New Photo"})]}),s&&(0,x.jsx)(b.A,{}),!s&&0!==e.length&&(0,x.jsxs)(i.A,{container:!0,spacing:3,children:[0!==m.length&&(0,x.jsx)(x.Fragment,{children:m.map(((e,t)=>(0,x.jsx)(i.A,{xs:12,sm:6,md:4,lg:3,children:(0,x.jsx)("img",{src:e,alt:"uploaded",style:{maxWidth:"100%",borderRadius:"5%"}})},t)))}),e.resources.map((e=>(0,x.jsx)(i.A,{xs:12,sm:6,md:4,lg:3,children:(0,x.jsx)(j,{publicId:e.public_id})},e.public_id)))]})]})}function y(){return(0,x.jsxs)(x.Fragment,{children:[(0,x.jsx)(c.mg,{children:(0,x.jsx)("title",{children:" Album | CK React World "})}),(0,x.jsx)(w,{})]})}}}]);