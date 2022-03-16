

export default class EvanPlugin extends BasePlugin {

    /** Plugin info */
    static id = 'id0evanPlugin'
    static name = 'Evan Plugin'
    static description = 'testting plugin'

    /** List of all running components */
    static components = []

  
   
    /** Called on load */
    onLoad() {

        // Register component
        this.objects.registerComponent(EvanBaseComponent, {
            id: 'evan-plugin',
            name: 'Evan Plugin Testing',
            description: "Testing plugin capabilities",
            settings: [
                { type: 'label', value: "This component reads the 'Collide' field to tell if it's a correct pathway tile, and highlights the floor when a user walks on it." }
            ]
        })


     

       console.log("Evan Plugin Loaded")
       
       

        // Add panel view
        this.menus.register({
            section: 'infopanel',
            panel: {
              
                iframeURL: absolutePath('infopanel.html'),
                width: 400,
                height: 100
            }
        })

     
        // Start render timer
        // TODO: Some better way to receive avatar position updates every frame?
        this.renderTimer = setInterval(this.onRender.bind(this), 1000)

    }

    /** Called on unload */
    onUnload() {

        // Remove timer
        clearInterval(this.renderTimer)

    }

    /** Called every frame */
    onRender() {

  
    }
  
         
}


class EvanBaseComponent extends BaseComponent {



    /** Called on load */
    onLoad() {

           
        console.log("evan basecomponent loaded")
     
     
      
    }

    /** Called on unload */
    onUnload() {

     
    }

    /** Called every frame, by the main plugin class */
    onRender(userPos) {

      

    }

    /** Called when we receive a message from a remote instance of this component */
    onMessage(data) {

    
    }

}







