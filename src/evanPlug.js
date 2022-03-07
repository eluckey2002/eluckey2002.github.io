
export default class EvanPlug extends BasePlugin {

    /** Plugin info */
    static get id()             { return 'vatominc-popup-message' }
    static get name()           { return 'Popup Message' }
    static get description()    { return 'Display a message, in a popup, to users when they enter the space.' }

    /** Called when the plugin is loaded */
     async onLoad() {


        
        // Register coin component
        this.objects.registerComponent(EvanPlugComponent, {
            id: 'evan-plug-comp',
            name: 'Collectible Coin',
            description: 'Allows this object to act as a coin that can be picked up.'
        })

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

          // Listen for slow avatar updates
       //   MessageManager.addMessageListener('avatar:slow', this.onSlowAvatarUpdate.bind(this))

          
       // intervalID = setInterval(this.retrieveObjects,5000)

       console.log("calling fetch in main base plugin")
       let nearby = await this.objects.fetchInRadius(0,0,100)

       for (let obj = 0; obj < nearby.length; obj++) {
           const element = nearby[obj];

           console.log(element)
           
       }
    
        
    }


      //UNLOAD METHOD
      onUnload(){

        //  clearInterval(intervalID)
  
       }
}




  class EvanPlugComponent extends BaseComponent {
     

     onLoad() 
    {

            console.log("EvanPlugComponent Loaded")
        
          //   console.log("calling retrieve in plugin component on load")
        //         await this.retrieveObjects()

    }  
  

  



    
        async retrieveObjects()
        {
            console.log("Retrieving objects in radius")


        let centerX = 0;
        let centerY = 0;
        let radius = 100;

        
       

            let nearby = await this.plugin.objects.fetchInRadius(0,0,100)

            for (let obj = 0; obj < nearby.length; obj++) {
                const element = nearby[obj];

                console.log(element)
                
            }

        }
     
    
        
        onSlowAvatarUpdate(data, fromUserId)
        {
                //Testing out message listener
            

        }

           
}

    

