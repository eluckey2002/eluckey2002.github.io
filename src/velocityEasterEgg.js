export default class evanPlugEvanOnEnter extends BasePlugin  {

    /** Plugin info */
    static get id()             { return 'evanplug-velocityEasterEgg' }
    static get name()           { return 'velocityEasterEgg' }
    static get description()    { return 'triggers velocity movement' }

    /** Called when the plugin is loaded */
    onLoad() {

       console.log("Velocity Plug loaded - v.01")
       
        // Register component
        this.objects.registerComponent(evanPlugVelocityBase, {
            id: 'evanplug-velocity-base',
            name: 'Evan Plugin Testing',
            description: "Testing plugin capabilities",
            settings: [
                { type: 'label', value: "This is the value in the label." }
            ]
        })

    }
}

class evanPlugVelocityBase extends BaseComponent {
    hasTriggered = false

    onLoad(){
        console.log("Velocity Plug BaseComponet loaded - v.01")

            // Generate instance ID
        //this.instanceID = Math.random().toString(36).substr(2)

        this.timer = setInterval(this.onTimer.bind(this), 200)


    }


   
    async onTimer() {

        // Only allow triggering once
        if (this.hasTriggered) {
            return
        }

        // Get user position
        let userPos = await this.plugin.user.getPosition()
        
        // Get object position 
        const x = this.fields.x       || 0
        const y = this.fields.height  || 0
        const z = this.fields.y       || 0

        // Calculate distance between the user and this pickup
        const distance = Math.sqrt((x - userPos.x) ** 2 + (y - userPos.y) ** 2 + (z - userPos.z) ** 2)

        // If close enough, trigger Mine
        let triggerDistance = 1
        if (distance < triggerDistance) {
            this.onEnter()
            return
        }       

    }

    onEnter(){
        console.log("onEnter called!")
    
    
    }

  
}
 

