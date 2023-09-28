const n={resourceName:"user",resourceCaption:"email",createRequiresDraft:!0,setupList({list:e}){this.addCreateControl("Create new user"),e.addFilter("TextFormElement",{name:"email",label:"Email"}),e.addItem("TextListItem",{caption:"ID",mapTo:"id",addIf:this.screenIsLarge}),e.addItem("LinkListItem",{caption:"Email",mapTo:"email",action:"editItem"}),e.addItem("TextListItem",{caption:"Contact data",mapTo:a=>a.get("contactData")&&a.get("contactData").map(t=>t.get("label")+": "+t.get("entry")).join(" / "),ifEmpty:"No contact data"}),e.addItem("ContextMenuListItem",{caption:"Actions",items:[{caption:"Edit",action:"editItem"}]})},setupEdit({edit:e,method:a}){this.addToIndexControl().addSaveControl(),e.addField("TextFormElement",{label:"Email",name:"email",attributes:{input:{class:"inputType2 size2"}}}),e.addField("TextFormElement",{label:a==="create"?"Password":"Change password",saveEmptyValue:!1,name:"password",attributes:{input:{type:"password"}}}),e.addField("IncludedAdminFormElement",{label:"Contacts",name:"contactData",updatePosition:!0,setupEdit:({editIncluded:t})=>{t.addField("TextFormElement",{label:"Contact label",name:"label"}),t.addField("TextFormElement",{label:"Contact entry",name:"entry"})},relation:{resourceName:"userContactEntry"}})}};export{n as default};