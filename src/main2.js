
export default class EvanPlugin extends BasePlugin {

 /** Plugin info */
 static id = 'evanPluginID'
 static name = 'EL Plugin'
 static description = 'Evan Plugin Dscrp'


    /** Called on load */
    onLoad() {

        // Register component
        this.objects.registerComponent(EvanPluginComp, {
            id: 'evanPluginComp',
            name: 'Evan Plugin Comp',
            description: "Evan Plugin Comp Descr",
            settings: [
                { type: 'label', value: "Evan Plugin Label Component" }
            ]
        })

        // Get user's position
        let userPos = await this.user.getPosition()

        console.log(userPos)
        

    }


 

}

class EvanPluginComp extends BaseComponent {

    onLoad() {

       

    }

    
    onUnload() {

     

    }


}