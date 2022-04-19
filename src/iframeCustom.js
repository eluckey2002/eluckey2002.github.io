



export default class iframeCustom extends BasePlugin {

    /** Plugin info */
    static get id()             { return 'vatominc-popup-message' }
    static get name()           { return 'Popup Message' }
    static get description()    { return 'Display a message, in a popup, to users when they enter the space.' }

    /** Called when the plugin is loaded */
     onLoad() {

           // Register component
            this.objects.registerComponent(evanPlugIframePopup, {
            id: 'evan-plugin-iframe-popup',
            name: 'IFrame Popup',
            description: 'Set custom size of popup',
            settings: [
                { id: 'iframe-height', name: 'Iframe Height', type: 'text', help: 'Height of iframe' },
                { id: 'iframe-width', name: 'Iframe Height', type: 'text', help: 'Width of iframe' },
                { id: 'iframe-title', name: 'Iframe Title', type: 'text'}
            ]
        })

            console.log('iframe 2 running - 850 800')

       

    }

}

class evanPlugIframePopup extends BaseComponent {


    onLoad() 
    {
        console.log("component loaded - user settings 2.0 debugging")
        // Generate instance ID
        this.instanceID = Math.random().toString(36).substring(2)

    }

   onClick(){

    console.log('Displaying popup.')
    

   


    
 
     this.plugin.menus.displayPopup({
            title: 'Product Info 850x800 numbers not px strings',
            panel: {
                iframeURL: this.plugin.paths.absolute('./iframe.html'),
                width: 850,
                height: 800

            }
        })

      
        console.log('Popup displayed')
    
            
        

    }

    onObjectUpdated(newFields){

       console.log(newFields)


        



    }



}