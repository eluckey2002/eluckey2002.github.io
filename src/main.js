
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

        this.updatePositions()
        this.retrieveObjectsInRadius()

       
        

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