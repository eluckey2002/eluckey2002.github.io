//Working as of 4/18
//User settings work for width, height, title
//URL is the last to be connected



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
                { id: 'iframe-height', name: 'Iframe Height', type: 'number', help: 'Height of iframe' },
                { id: 'iframe-width', name: 'Iframe Width', type: 'number', help: 'Width of iframe' },
                { id: 'iframe-title', name: 'Iframe Title', type: 'text'},
                { id: 'iframe-url', name: 'Iframe URL', type: 'text'}
            ]
        })

            console.log("so close!")

       

    }

}

class evanPlugIframePopup extends BaseComponent {


    onLoad() 
    {
        console.log("component loaded - user settings 2.0 debugging")
        // Generate instance ID
        this.instanceID = Math.random().toString(36).substring(2)

        
            this.IframeWidth = 0
            this.IframeHeight = 0
            this.IframeTitle = ""
            this.IframeURL = ""


    }

   onClick(){

    
    let widthInt = parseInt(this.getField('iframe-width'))
    let heightInt = parseInt(this.getField('iframe-height'))

    console.log("UPDATE : Store width in height in temp variables and use getField with parseInt")
    console.log(widthInt)
    console.log(heightInt)
    console.log(widthInt + heightInt)

     this.plugin.menus.displayPopup({
            title: this.getField('iframe-title') || 'Product Info',
            panel: {
                iframeURL: this.plugin.paths.absolute('./iframe.html'),
                width: widthInt, // 780,
                height: heightInt // 660

            }
        })

     
  

    }

    onObjectUpdated(newFields){

       

     

       let widthInt = parseInt(this.getField('iframe-width'))
       let heightInt = parseInt(this.getField('iframe-height'))

       this.IframeWidth = widthInt
       this.IframeHeight = heightInt

       this.IframeTitle = this.getField('iframe-title')
       this.IframeURL = this.getField('iframe-url')

     

    }



}