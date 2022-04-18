



export default class iframeCustom extends BasePlugin {

    /** Plugin info */
    static get id()             { return 'vatominc-popup-message' }
    // @ts-ignore
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
                { type: 'section', name: 'iframe popup' },
                { type: 'checkbox', id: 'enabled', name: 'Enabled'},
                { type: 'text', id: 'url', name: 'url', help: 'Url to display.' },
                { type: 'number', id: 'height', name: 'Height(px)', help: 'Size of the iframe' },
                { type: 'number', id: 'width', name: 'Width(px)', help: 'Size of the iframe' }
            ]
        })

 

       

    }

}

class evanPlugIframePopup extends BaseComponent {


    onLoad() 
    {

        // Generate instance ID
        this.instanceID = Math.random().toString(36).substring(2)

    }

    onClick(){

        // Show message now, if enabled
        if (this.getField('enabled')) {
                // Show it
                this.plugin.menus.displayPopup({
                    title: 'Popup',
                    panel: {
                        iframeURL: this.paths.absolute(this.getField('url')),
                        width: this.getField('width'),
                        height: this.getField('height')
                    }
                 })
        }

            
        

    }

}