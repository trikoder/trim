const e={resourceName:"tag",setupList:function({list:t}){this.addCreateControl("Create new tag"),t.addItem("TextListItem",{caption:"ID",mapTo:"id",addIf:this.screenIsLarge}),t.addItem("LinkListItem",{caption:"Title",mapTo:"title",action:"editItem"}),t.addItem("ContextMenuListItem",{caption:"Actions",items:[{caption:"Edit",action:"editItem"}]})},setupEdit:function({edit:t}){this.addToIndexControl().addSaveControl(),t.addField("TextFormElement",{label:"Title",name:"title",attributes:{input:{class:"inputType2 size2"}}})}};export{e as default};
