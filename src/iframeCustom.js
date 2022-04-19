



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
                { id: 'iframe-height', name: 'Iframe Height', type: 'number', default: 40, help: 'Height of iframe' },
                { id: 'iframe-width', name: 'Iframe Height', type: 'number', default: 40, help: 'Width of iframe' },
                { id: 'iframe-title', name: 'Iframe Title', type: 'text'}
            ]
        })

            console.log('iframe 0.8 running - cannot convert the damn numbers')

       

    }

}

class evanPlugIframePopup extends BaseComponent {


    onLoad() 
    {
        console.log("component loaded - user settings v.9 debugging")
        // Generate instance ID
        this.instanceID = Math.random().toString(36).substring(2)

    }

   onClick(){

    console.log('Displaying popup.')
    

   

    const heightStr = parseFloat(this.plugin.getField('iframe-height')) || 300
    const widthStr = parseFloat(this.plugin.getField('iframe-width')) || 400

    console.log("Type OF:")
    console.log(typeof heightStr)
    console.log(typeof widthStr)
    

    
   
   
   
    console.log("Output values")
    console.log(heightStr)
    console.log(widthStr)
   
    
   

   
     this.plugin.menus.displayPopup({
            title: this.plugin.getField('iframe-title'),
            panel: {
                iframeURL: this.plugin.paths.absolute('./iframe.html'),
                width:  parseFloat(this.plugin.getField('iframe-width')) || 400,
                height:  parseFloat(this.plugin.getField('iframe-height')) || 400

            }
        })

      
        console.log('Popup displayed')
    
            
        

    }

    onObjectUpdated(newFields){

        console.log(newFields)

        



    }



}