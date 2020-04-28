(window.webpackJsonp=window.webpackJsonp||[]).push([[13],{137:function(e,t,n){"use strict";n.r(t),n.d(t,"frontMatter",(function(){return s})),n.d(t,"metadata",(function(){return l})),n.d(t,"rightToc",(function(){return c})),n.d(t,"default",(function(){return u}));var o=n(1),a=n(9),r=(n(0),n(152)),i=n(163),s={id:"save-load-state",title:"Save and Load"},l={id:"guides/save-load-state",title:"Save and Load",description:'import {Image} from "../../src/components/Image.js";',source:"@site/docs/guides/save-load.md",permalink:"/r/docs/guides/save-load-state",sidebar:"docs",previous:{title:"Basic Tutorial",permalink:"/r/docs/guides/basic-tutorial"},next:{title:"EditorState",permalink:"/r/docs/api/editor-state"}},c=[{value:"Overview",id:"overview",children:[]},{value:"Copy compressed output",id:"copy-compressed-output",children:[]},{value:"Load state",id:"load-state",children:[{value:"Load JSON on page load",id:"load-json-on-page-load",children:[]}]},{value:"All set! \ud83d\udc96",id:"all-set-",children:[]}],d={rightToc:c},p="wrapper";function u(e){var t=e.components,n=Object(a.a)(e,["components"]);return Object(r.b)(p,Object(o.a)({},d,n,{components:t,mdxType:"MDXLayout"}),Object(r.b)("p",null,"This guide extends upon the ",Object(r.b)("a",Object(o.a)({parentName:"p"},{href:"/craft.js/r/docs/basic-tutorial"}),"Basic Tutorial")),Object(r.b)("h2",{id:"overview"},"Overview"),Object(r.b)("p",null,"Previously, we saw how we could serialise the entire state of ",Object(r.b)("inlineCode",{parentName:"p"},"Nodes")," in our editor into JSON. Of course, you probably will not want to store the JSON in your server or database, for obvious reasons. Instead, you should first employ a text compression technique of your choice to compress the serialised JSON Nodes."),Object(r.b)("p",null,"In this guide, we'll be mainly modifying the previous tutorial's Topbar component. We'll add 2 new features"),Object(r.b)("ul",null,Object(r.b)("li",{parentName:"ul"},"Copy the compressed output of the serialised Nodes to the user's clipboard"),Object(r.b)("li",{parentName:"ul"},"Load the editor state from a compressed output of serialised Nodes.")),Object(r.b)("p",null,"We'll be using 2 external libraries - ",Object(r.b)("inlineCode",{parentName:"p"},"lzutf8")," (for compression) and ",Object(r.b)("inlineCode",{parentName:"p"},"copy-to-clipboard")," (you know)"),Object(r.b)("pre",null,Object(r.b)("code",Object(o.a)({parentName:"pre"},{className:"language-bash"}),"yarn add lzutf8 copy-to-clipboard\n")),Object(r.b)("h2",{id:"copy-compressed-output"},"Copy compressed output"),Object(r.b)("p",null,"We'll use ",Object(r.b)("inlineCode",{parentName:"p"},"lzutf8")," to compress our serialised JSON Nodes, and additionally transform it into base64."),Object(r.b)("pre",null,Object(r.b)("code",Object(o.a)({parentName:"pre"},{className:"language-jsx",metastring:"{24-36}","{24-36}":!0}),'import React, { useState } from "react";\nimport { Box, FormControlLabel, Switch, Grid, Button as MaterialButton, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, TextField, Snackbar } from "@material-ui/core";\nimport { useEditor } from "@craftjs/core";\nimport lz from "lzutf8";\nimport copy from \'copy-to-clipboard\';\n\nexport const Topbar = () => {\n  const { actions, query, enabled } = useEditor((state) => ({\n    enabled: state.options.enabled\n  }));\n\nconst [snackbarMessage, setSnackbarMessage] = useState();\n  return (\n    <Box px={1} py={1} mt={3} mb={1} bgcolor="#cbe8e7">\n      <Grid container alignItems="center">\n        <Grid item xs>\n          <FormControlLabel\n            className="enable-disable-toggle"\n            control={<Switch checked={enabled} onChange={(_, value) => actions.setOptions(options => options.enabled = value)} />}\n            label="Enable"\n          />\n        </Grid>\n        <Grid item>\n          <MaterialButton \n            className="copy-state-btn"\n            size="small" \n            variant="outlined" \n            color="secondary"\n            onClick={() => {\n              const json = query.serialize();\n              copy(lz.encodeBase64(lz.compress(json)));\n              setSnackbarMessage("State copied to clipboard")\n            }}\n          >\n              Copy current state\n          </MaterialButton>\n          <Snackbar\n            autoHideDuration={1000}\n            anchorOrigin={{ vertical: "bottom", horizontal: "center" }}\n            open={!!snackbarMessage}\n            onClose={() => setSnackbarMessage(null)}\n            message={<span>{snackbarMessage}</span>}\n          />\n        </Grid>\n      </Grid>\n    </Box>\n  )\n};\n')),Object(r.b)("p",null,"When you click on the button now, it should copy the compressed base64 string to the clipboard."),Object(r.b)("h2",{id:"load-state"},"Load state"),Object(r.b)("p",null,"Now let's implement the Load State button in our Topbar component. We will display a Dialog box when the button is clicked, and our users would be able to paste the compressed base64 string here. "),Object(r.b)("p",null,"Then, we would need to work in reverse to obtain the original JSON provided by our editor. Finally, we'll call the ",Object(r.b)("inlineCode",{parentName:"p"},"deserialize")," action which will result in the editor replacing all the current Nodes in the editor with the deserialized output."),Object(r.b)("pre",null,Object(r.b)("code",Object(o.a)({parentName:"pre"},{className:"language-jsx",metastring:"{12-14,40-83}","{12-14,40-83}":!0}),'import React, { useState } from "react";\nimport { Box, FormControlLabel, Switch, Grid, Button as MaterialButton, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, TextField, Snackbar } from "@material-ui/core";\nimport { useEditor } from "@craftjs/core";\nimport lz from "lzutf8";\nimport copy from \'copy-to-clipboard\';\n\nexport const Topbar = () => {\n  const { actions, query, enabled } = useEditor((state) => ({\n    enabled: state.options.enabled\n  }));\n\n  const [dialogOpen, setDialogOpen] = useState(false);\n  const [snackbarMessage, setSnackbarMessage] = useState();\n  const [stateToLoad, setStateToLoad] = useState(null);\n\n  return (\n    <Box px={1} py={1} mt={3} mb={1} bgcolor="#cbe8e7">\n      <Grid container alignItems="center">\n        <Grid item xs>\n          <FormControlLabel\n            className="enable-disable-toggle"\n            control={<Switch checked={enabled} onChange={(_, value) => actions.setOptions(options => options.enabled = value)} />}\n            label="Enable"\n          />\n        </Grid>\n        <Grid item>\n          <MaterialButton \n            className="copy-state-btn"\n            size="small" \n            variant="outlined" \n            color="secondary"\n            onClick={() => {\n              const json = query.serialize();\n              copy(lz.encodeBase64(lz.compress(json)));\n              setSnackbarMessage("State copied to clipboard")\n            }}\n          >\n              Copy current state\n          </MaterialButton>\n          <MaterialButton \n            className="load-state-btn"\n            size="small" \n            variant="outlined" \n            color="secondary"\n            onClick={() => setDialogOpen(true)}\n          >\n              Load\n          </MaterialButton>\n          <Dialog\n            open={dialogOpen}\n            onClose={() => setDialogOpen(false)}\n            fullWidth\n            maxWidth="md"\n          >\n            <DialogTitle id="alert-dialog-title">Load state</DialogTitle>\n            <DialogContent>\n              <TextField \n                multiline \n                fullWidth\n                placeholder=\'Paste the contents that was copied from the "Copy Current State" button\'\n                size="small"\n                value={stateToLoad}\n                onChange={e => setStateToLoad(e.target.value)}\n              />\n            </DialogContent>\n            <DialogActions>\n              <MaterialButton onClick={() => setDialogOpen(false)} color="primary">\n                Cancel\n              </MaterialButton>\n              <MaterialButton \n                onClick={() => {\n                  setDialogOpen(false);\n                  const json = lz.decompress(lz.decodeBase64(stateToLoad));\n                  actions.deserialize(json);\n                  setSnackbarMessage("State loaded")\n                }} \n                color="primary" \n                autoFocus\n              >\n                Load\n              </MaterialButton>\n            </DialogActions>\n          </Dialog>\n          <Snackbar\n            autoHideDuration={1000}\n            anchorOrigin={{ vertical: "bottom", horizontal: "center" }}\n            open={!!snackbarMessage}\n            onClose={() => setSnackbarMessage(null)}\n            message={<span>{snackbarMessage}</span>}\n          />\n        </Grid>\n      </Grid>\n    </Box>\n  )\n};\n')),Object(r.b)("h3",{id:"load-json-on-page-load"},"Load JSON on page load"),Object(r.b)("p",null,"Of course, what if we wanted our editor to load a serialized output on page load? For this, we will need to take a step back and revisit the ",Object(r.b)("inlineCode",{parentName:"p"},"<Frame />")," component which we encountered when we first set up Craft.js. "),Object(r.b)("p",null,"By default, it constructs the editor state based on whats was initially rendered in its ",Object(r.b)("inlineCode",{parentName:"p"},"children"),". But, we could also specifiy the serialised JSON nodes to its ",Object(r.b)("inlineCode",{parentName:"p"},"json")," prop which would cause it to load the state from the JSON string instead. "),Object(r.b)("pre",null,Object(r.b)("code",Object(o.a)({parentName:"pre"},{className:"language-jsx"}),'import React, {useState, useEffect} from \'react\';\nimport "../styles/main.css";\nimport {Typography, Button as MaterialButton, Paper, Grid, makeStyles} from \'@material-ui/core\';\nimport {Toolbox} from \'../components/Toolbox\';\nimport {Container} from \'../components/user/Container\';\nimport {Button} from \'../components/user/Button\';\nimport {Card, CardBottom, CardTop} from \'../components/user/Card\';\nimport {Text} from \'../components/user/Text\';\nimport {SettingsPanel} from \'../components/SettingsPanel\';\nimport {Editor, Frame, Canvas} from "@craftjs/core";\nimport { Topbar } from \'../components/Topbar\';\n\n\nexport default function App() {\n  const [enabled, setEnabled] = useState(true);\n  const [json, setJson] = useState(null);\n\n  // Load save state from server on page load\n  useEffect(() => {\n    const stateToLoad = await fetch("your api to get the compressed data");\n    const json = lz.decompress(lz.decodeBase64(stateToLoad));\n    setJson(json);\n  }, []);\n\n  return (\n    <div style={{margin: "0 auto", width: "800px"}}>\n      <Typography style={{margin: "20px 0"}} variant="h5" align="center">Basic Page Editor</Typography>\n        <Editor\n          resolver={{Card, Button, Text, Container, CardTop, CardBottom}}\n          enabled={enabled}\n        > \n          <Topbar />\n          <Grid container spacing={5} style={{paddingTop: "10px"}}>\n            <Grid item xs>\n              <Frame json={json}>\n                <Canvas is={Container} padding={5} background="#eeeeee">\n                  ...\n                </Canvas>\n              </Frame>\n            </Grid>\n            <Grid item xs={4}>\n              ...\n            </Grid>\n          </Grid>\n        </Editor>\n    </div>\n  );\n}\n')),Object(r.b)("h2",{id:"all-set-"},"All set! \ud83d\udc96"),Object(r.b)("p",null,"Now, play with the editor and press the ",Object(r.b)("inlineCode",{parentName:"p"},"Copy Current State")," button when you are done. Refresh the page so the editor returns to its default state, then press the ",Object(r.b)("inlineCode",{parentName:"p"},"Load State")," button and paste the copied output - you should see the editor displaying the elements in the state from the time you copied."),Object(r.b)(i.a,{img:"tutorial/save-and-load.gif",mdxType:"Image"}))}u.isMDXComponent=!0},152:function(e,t,n){"use strict";n.d(t,"a",(function(){return p})),n.d(t,"b",(function(){return g}));var o=n(0),a=n.n(o);function r(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function i(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);t&&(o=o.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,o)}return n}function s(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?i(Object(n),!0).forEach((function(t){r(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):i(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function l(e,t){if(null==e)return{};var n,o,a=function(e,t){if(null==e)return{};var n,o,a={},r=Object.keys(e);for(o=0;o<r.length;o++)n=r[o],t.indexOf(n)>=0||(a[n]=e[n]);return a}(e,t);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);for(o=0;o<r.length;o++)n=r[o],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(a[n]=e[n])}return a}var c=a.a.createContext({}),d=function(e){var t=a.a.useContext(c),n=t;return e&&(n="function"==typeof e?e(t):s({},t,{},e)),n},p=function(e){var t=d(e.components);return a.a.createElement(c.Provider,{value:t},e.children)},u="mdxType",b={inlineCode:"code",wrapper:function(e){var t=e.children;return a.a.createElement(a.a.Fragment,{},t)}},m=Object(o.forwardRef)((function(e,t){var n=e.components,o=e.mdxType,r=e.originalType,i=e.parentName,c=l(e,["components","mdxType","originalType","parentName"]),p=d(n),u=o,m=p["".concat(i,".").concat(u)]||p[u]||b[u]||r;return n?a.a.createElement(m,s({ref:t},c,{components:n})):a.a.createElement(m,s({ref:t},c))}));function g(e,t){var n=arguments,o=t&&t.mdxType;if("string"==typeof e||o){var r=n.length,i=new Array(r);i[0]=m;var s={};for(var l in t)hasOwnProperty.call(t,l)&&(s[l]=t[l]);s.originalType=e,s[u]="string"==typeof e?e:o,i[1]=s;for(var c=2;c<r;c++)i[c]=n[c];return a.a.createElement.apply(null,i)}return a.a.createElement.apply(null,n)}m.displayName="MDXCreateElement"},154:function(e,t,n){"use strict";var o=n(0),a=n(48);t.a=function(){return Object(o.useContext)(a.a)}},163:function(e,t,n){"use strict";n.d(t,"a",(function(){return i}));var o=n(0),a=n.n(o),r=n(154),i=function(e){var t=e.img,n=Object(r.a)().siteConfig.baseUrl;return a.a.createElement("div",{className:"img-wrapper"},a.a.createElement("div",null,a.a.createElement("header",null,a.a.createElement("div",null),a.a.createElement("div",null),a.a.createElement("div",null)),a.a.createElement("img",{src:n+"img/"+t})))}}}]);