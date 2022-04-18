



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
                { type: 'number', id: 'hei', name: 'Height(px)', help: 'Size of the iframe' },
                { type: 'number', id: 'wid', name: 'Width(px)', help: 'Size of the iframe' }
            ]
        })

 

       

    }

}

class evanPlugIframePopup extends BaseComponent {


    onLoad() 
    {

        console.log("component loaded - user settings v.2")
        // Generate instance ID
        this.instanceID = Math.random().toString(36).substring(2)

    }

   async onClick(){

    console.log('Displaying popup.')


    const isEnabled = this.plugin.getField('enabled')
    const height = parseFloat(this.plugin.getField('hei'))
    const width = parseFloat(this.plugin.getField('wid'))
    const url = this.plugin.getField('uri')
    const title = this.plugin.getField('title')

    if(isEnabled)
    {
     this.plugin.menus.displayPopup({
            title: title,
            panel: {
                iframeURL: this.plugin.paths.absolute(url),
                width: width,
                height: height,

            }
        })

      
        console.log('Popup displayed')
    }
            
        

    }

    onObjectUpdated(newFields){

        console.log(newFields)



    }



}