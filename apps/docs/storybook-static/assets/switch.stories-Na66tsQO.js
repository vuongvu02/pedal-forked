import{j as o}from"./jsx-runtime-BjG_zV1W.js";import{r as C}from"./index-7h80QhK_.js";import{S as t}from"./switch-BU7heKeU.js";import"./_commonjsHelpers-Cpj98o6Y.js";import"./index-Dmd9PWHg.js";import"./index-DUolvyrz.js";const E={title:"Components/Switch",component:t},r={render:e=>o.jsx(t,{...e}),args:{}},s={render:e=>{const[g,S]=C.useState(!1);return o.jsx(t,{...e,checked:g,onCheckedChange:S})}},a={render:e=>o.jsx(t,{...e,disabled:!0})};var c,n,d;r.parameters={...r.parameters,docs:{...(c=r.parameters)==null?void 0:c.docs,source:{originalSource:`{
  render: args => <Switch {...args} />,
  args: {}
}`,...(d=(n=r.parameters)==null?void 0:n.docs)==null?void 0:d.source}}};var m,i,p;s.parameters={...s.parameters,docs:{...(m=s.parameters)==null?void 0:m.docs,source:{originalSource:`{
  render: args => {
    const [checked, setChecked] = useState(false);
    return <Switch {...args} checked={checked} onCheckedChange={setChecked} />;
  }
}`,...(p=(i=s.parameters)==null?void 0:i.docs)==null?void 0:p.source}}};var h,u,l;a.parameters={...a.parameters,docs:{...(h=a.parameters)==null?void 0:h.docs,source:{originalSource:`{
  render: args => <Switch {...args} disabled />
}`,...(l=(u=a.parameters)==null?void 0:u.docs)==null?void 0:l.source}}};const B=["Basic","Controlled","Disabled"];export{r as Basic,s as Controlled,a as Disabled,B as __namedExportsOrder,E as default};
