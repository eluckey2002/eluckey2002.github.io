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


     

       console.log("Evan Plugin v0.2")
       
       

        // Add panel view
         // Register a menu item
         this.menus.register({
            id: 'evanPlugin',
            icon: 'data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIj8+CjxzdmcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayIgeG1sbnM6c3ZnanM9Imh0dHA6Ly9zdmdqcy5jb20vc3ZnanMiIHZlcnNpb249IjEuMSIgd2lkdGg9IjUxMiIgaGVpZ2h0PSI1MTIiIHg9IjAiIHk9IjAiIHZpZXdCb3g9IjAgMCAzMiAzMiIgc3R5bGU9ImVuYWJsZS1iYWNrZ3JvdW5kOm5ldyAwIDAgNTEyIDUxMiIgeG1sOnNwYWNlPSJwcmVzZXJ2ZSIgY2xhc3M9IiI+PGc+PHBhdGggeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiBkPSJtNCAyM2g4YTEgMSAwIDAgMCAwLTJoLThhMS4wMDEzIDEuMDAxMyAwIDAgMSAtMS0xdi0xMi4yNTlsOS40ODgzIDUuNTM0OWEzLjEyMzUgMy4xMjM1IDAgMCAwIDMuMDIzNCAwbDkuNDg4My01LjUzNDl2Mi4yNTlhMSAxIDAgMCAwIDIgMHYtNGEzLjA1IDMuMDUgMCAwIDAgLTIuMzk3LTIuOTM4OCAyLjk5MzEgMi45OTMxIDAgMCAwIC0uNjAzLS4wNjEyaC0yMGEzLjA2MjIgMy4wNjIyIDAgMCAwIC0zIDN2MTRhMy4wMDMzIDMuMDAzMyAwIDAgMCAzIDN6bTAtMThoMjBhLjk4NzkuOTg3OSAwIDAgMSAuODUzNi41MTFsLTEwLjM1IDYuMDM3M2ExIDEgMCAwIDEgLTEuMDA3OCAwbC0xMC4zNDk0LTYuMDM3M2EuOTg3OS45ODc5IDAgMCAxIC44NTM2LS41MTF6IiBmaWxsPSIjY2VjZWNlIiBkYXRhLW9yaWdpbmFsPSIjMDAwMDAwIiBjbGFzcz0iIi8+PHBhdGggeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiBkPSJtMjMgMTNhOCA4IDAgMSAwIDggOCA4LjAwOTIgOC4wMDkyIDAgMCAwIC04LTh6bTAgMTRhNiA2IDAgMSAxIDYtNiA2LjAwNjYgNi4wMDY2IDAgMCAxIC02IDZ6IiBmaWxsPSIjY2VjZWNlIiBkYXRhLW9yaWdpbmFsPSIjMDAwMDAwIiBjbGFzcz0iIi8+PGNpcmNsZSB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIGN4PSIyMyIgY3k9IjI1IiByPSIxIiBmaWxsPSIjY2VjZWNlIiBkYXRhLW9yaWdpbmFsPSIjMDAwMDAwIiBjbGFzcz0iIi8+PHBhdGggeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiBkPSJtMjMgMTZhMSAxIDAgMCAwIC0xIDF2NWExIDEgMCAwIDAgMiAwdi01YTEgMSAwIDAgMCAtMS0xeiIgZmlsbD0iI2NlY2VjZSIgZGF0YS1vcmlnaW5hbD0iIzAwMDAwMCIgY2xhc3M9IiIvPjwvZz48L3N2Zz4K',
            text: 'evanPlugin',
            section: 'controls',
            order: -60,
            panel: { iframe: absolutePath('infopanel.html')
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

           
        console.log("evan basecomponent - hooks v5 loaded")

        this.hookCallback = function() {
            console.log('Anonymous function with hook triggered')
            return true
        }

     //   Hooks.get('avatarVideo.setRingColor').trigger({})

     //map.gestures.ontap
     //avatarVideo.toggle

    // this.plugin.hooks.addHandler('map.gestures.quick-move-start', hookTriggerdCallback)
  //   this.plugin.hooks.addHandler('avatarVideo.toggle',hookTriggerdCallback)
     this.plugin.hooks.addHandler('map.gestures.ontap',this.hookCallback)
     
     
      
    }

  

  

    onClick()
    {
            

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