
export default class EvanPlugin extends BasePlugin {

 /** Plugin info */
 static id = 'evanPluginID'
 static name = 'EL Plugin'
 static description = 'Evan Plugin Dscrp'

 static counter = 112



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

        //update positions
        console.log("Getting User Position")
        this.updatePositions()

        //retrieving objects in radius
        console.log("retrieving objects in radius")
        this.retrieveObjectsInRadius()

       
        console.log("finished loading evan plugin")

    }
    

    async updatePositions() {

        // Get user's position
        let userPos = await this.user.getPosition()

        console.log(userPos)

     

    }

    async retrieveObjectsInRadius() {

        console.log("retrieveObjects method called")
       
        let m = await this.plugin.objects.fetchInRadius(0, 0, 100)
        

        

        for (let index = 0; index < m.length; index++) {
            const element = m[index]
            console.log(element.name)


        }
    }

    

   


 

}

class EvanPluginComp extends BaseComponent {

    onLoad() {

       

    }

    
    onUnload() {

     

    }


}