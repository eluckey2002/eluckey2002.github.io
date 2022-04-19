



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
            description: "Set custom size of popup",
            settings: [
                { type: 'checkbox', id: 'enabled', name: 'Enabled'},
                { type: 'text', id: 'title', name: 'Popup Header Text'},
                { type: 'text', id: 'uri', name: 'url', help: 'Url to display.' },
                { type: 'number', id: 'hei', name: 'Height(px)', help: 'Size of the iframe', default: 400 },
                { type: 'number', id: 'wid', name: 'Width(px)', help: 'Size of the iframe', default: 600 }
            ]
        })

 

       

    }

}

class evanPlugIframePopup extends BaseComponent {


    onLoad() 
    {

        console.log("component loaded - user settings v.7 parse two statements")
        // Generate instance ID
        this.instanceID = Math.random().toString(36).substring(2)

    }

   async onClick(){

    console.log('Displaying popup.')

    const heightStr = this.plugin.getField('hei')
    const widthStr = this.plugin.getField('wid')


    let isEnabled = this.plugin.getField('enabled')
    const heightC = parseInt(heightStr)
    const widthC = parseInt(widthStr)
    let url = this.plugin.getField('uri')
    const titleC = this.plugin.getField('title')

    console.log(widthC)
    console.log(heightC)

    


   
     this.plugin.menus.displayPopup({
            title: titleC,
            panel: {
                iframeURL: this.plugin.paths.absolute('./iframe.html'),
                width: widthC,
                height: heightC,

            }
        })

      
        console.log('Popup displayed')
    
            
        

    }

    onObjectUpdated(newFields){

        console.log(newFields)



    }



}