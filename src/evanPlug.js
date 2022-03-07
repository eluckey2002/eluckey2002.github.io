


export default class EvanPlug extends BasePlugin {

    /** Plugin info */
    static get id()             { return 'vatominc-popup-message' }
    static get name()           { return 'Popup Message' }
    static get description()    { return 'Display a message, in a popup, to users when they enter the space.' }

    /** Called when the plugin is loaded */
     async onLoad() {

        // Allow message to be configured
        this.menus.register({
            id: 'evan-plug',
            section: 'plugin-settings',
            panel: {
                fields: [
                    { type: 'section', name: 'EvanPlug' },
                    { type: 'checkbox', id: 'enabled', name: 'Enabled', help: 'When enabled, the popup will be shown.' },
                    { type: 'text', id: 'title', name: 'Title', help: 'Title of the message.' },
                    { type: 'text', id: 'text', name: 'Text', help: 'Text to display in the message.' },
                    { type: 'select', id: 'icon', name: 'Icon', values: ['', 'info', 'warning', 'question', 'error'] }
                ]
            }
        })

        
        intervalID = setInterval(this.retrieveObjects,5000)

        
    }




    //UNLOAD METHOD
      onUnload(){

        clearInterval(intervalID)
     }



    //MAIN METHOD
        async retrieveObjects()
        {
            console.log("Retrieving objects in radius")

            
        let centerX = 0; 
        let centery = 0;
        let radius = 100;


        let obj = await this.objects.fetchInRadius(centerX, centerY, radius)

        for (let obj = 0; obj < obj.length; obj++) {
            const element = array[obj];

            console.log(element)
            
        }

        }
     
           
           
        }

    

