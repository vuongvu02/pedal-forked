import{j as r}from"./jsx-runtime-BjG_zV1W.js";import{B as n}from"./button-BHZLz9Yn.js";import"./index-DUolvyrz.js";import"./_commonjsHelpers-Cpj98o6Y.js";const v={title:"Components/Button",component:n},s={render:e=>r.jsx(n,{...e}),args:{children:"Hello"}},a={render:e=>r.jsxs(r.Fragment,{children:[r.jsx(n,{...e,variant:"primary",children:"Primary"})," ",r.jsx(n,{...e,variant:"secondary",children:"Secondary"})]})},t={render:e=>r.jsxs(r.Fragment,{children:[r.jsx(n,{...e,size:"sm",children:"Small"})," ",r.jsx(n,{...e,size:"md",children:"Medium"})," ",r.jsx(n,{...e,size:"lg",children:"Large"})]})},o={render:e=>r.jsx(n,{...e,disabled:!0,children:"Hello"})};var i,c,d;s.parameters={...s.parameters,docs:{...(i=s.parameters)==null?void 0:i.docs,source:{originalSource:`{
  render: args => <Button {...args} />,
  args: {
    children: "Hello"
  }
}`,...(d=(c=s.parameters)==null?void 0:c.docs)==null?void 0:d.source}}};var l,m,u;a.parameters={...a.parameters,docs:{...(l=a.parameters)==null?void 0:l.docs,source:{originalSource:`{
  render: args => <>
      <Button {...args} variant="primary">
        Primary
      </Button>{" "}
      <Button {...args} variant="secondary">
        Secondary
      </Button>
    </>
}`,...(u=(m=a.parameters)==null?void 0:m.docs)==null?void 0:u.source}}};var p,g,B;t.parameters={...t.parameters,docs:{...(p=t.parameters)==null?void 0:p.docs,source:{originalSource:`{
  render: args => <>
      <Button {...args} size="sm">
        Small
      </Button>{" "}
      <Button {...args} size="md">
        Medium
      </Button>{" "}
      <Button {...args} size="lg">
        Large
      </Button>
    </>
}`,...(B=(g=t.parameters)==null?void 0:g.docs)==null?void 0:B.source}}};var x,j,h;o.parameters={...o.parameters,docs:{...(x=o.parameters)==null?void 0:x.docs,source:{originalSource:`{
  render: args => <Button {...args} disabled>
      Hello
    </Button>
}`,...(h=(j=o.parameters)==null?void 0:j.docs)==null?void 0:h.source}}};const A=["Basic","AllVariants","AllSizes","Disabled"];export{t as AllSizes,a as AllVariants,s as Basic,o as Disabled,A as __namedExportsOrder,v as default};
