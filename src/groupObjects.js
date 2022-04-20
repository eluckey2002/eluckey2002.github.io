


export default class groupObjects extends BasePlugin {

    /** Plugin info */
    static get id()             { return 'evanplug-groupObjects' }
    static get name()           { return 'evanplug-groupObjects' }
    static get description()    { return 'Group Objects' }

    /** Called when the plugin is loaded */
     onLoad() {

           // Register component
            this.objects.registerComponent(evanPlugIframePopup, {
            id: 'evanplug-groupObjComp',
            name: 'evanplug-groupObjects',
            description: 'Group Objects',
            settings: [
                { id: 'group-name', name: 'Group Name', type: 'text'}
               
            ]
        })

          

       

    }

}

class evanPlugIframePopup extends BaseComponent {


    onLoad() 
    {
       
        // Generate instance ID
        this.instanceID = Math.random().toString(36).substring(2)

        
          this.groupName = ""


    }

  

    onObjectUpdated(newFields){

   
       this.groupName = this.getField('group-name')

       

       this.plugin.objects.update(this.id, {type: 'group'}, )

     

     

     

    }



}