



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

            console.log('iframe 0.9 running - remove defaults')

       

    }

}

class evanPlugIframePopup extends BaseComponent {


    onLoad() 
    {
        console.log("component loaded - user settings 1.0 debugging")
        // Generate instance ID
        this.instanceID = Math.random().toString(36).substring(2)

    }

   onClick(){

    console.log('Displaying popup.')
    

   

  //  const heightStr = parseFloat(this.plugin.getField('iframe-height')) || 300
  //  const widthStr = parseFloat(this.plugin.getField('iframe-width')) || 400

 //   console.log("Type OF:")
//    console.log(typeof heightStr)
//    console.log(typeof widthStr)
    

    
   this.heightStr = this.plugin.getField('iframe-height')
   this.widthStr = this.plugin.getField('iframe-width')
   
    console.log("Output values")
    console.log(heightStr)
    console.log(widthStr)
   
    
   this.tit = this.plugin.getField('iframe-title')

   
     this.plugin.menus.displayPopup({
            title: this.tit,
            panel: {
                iframeURL: this.plugin.paths.absolute('./iframe.html'),
                width:  this.widthStr,
                height:  this.heightStr 

            }
        })

      
        console.log('Popup displayed')
    
            
        

    }

    onObjectUpdated(newFields){

        console.log(this.plugin.getField('iframe-title'))
        console.log(this.plugin.getField('iframe-width'))
        console.log(this.plugin.getField('iframe-height'))
        



    }



}