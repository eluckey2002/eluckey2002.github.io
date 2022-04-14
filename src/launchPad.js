export default class evanPlugEvanOnEnter extends BasePlugin  {

    /** Plugin info */
    static get id()             { return 'evanplug-CompEventMessaging' }
    static get name()           { return 'evanPlug-IDCompEventMessaging' }
    static get description()    { return 'custom component enter exit' }

    /** Called when the plugin is loaded */
    onLoad() {

       console.log("ComponentCompEventMessaging Plug loaded - v0.1")
       
        // Register component
        this.objects.registerComponent(evanPlugVelocityBase, {
            id: 'evanplug-velocity-base',
            name: 'Evan Plugin Testing',
            description: "Testing plugin capabilities",
            settings: [
                { type: 'label', value: "X Distance" },
                { id: 'xdist', type: 'number',  default: '5'},
                { type: 'label', value: "Height Distance " },
                { id: 'ydist', type: 'number',  default: '20'},
                { type: 'label', value: "Z Distance" },
                { id: 'zdist', type: 'number',  default: '5'}
            ]
        })

    }
}

class evanPlugVelocityBase extends BaseComponent {
    hasTriggered = false
    isPreviousInside = false
    onEnterMessage = ""
    onExitMessage = ""

    onLoad(){
        console.log("Event Component Loaded 0.5v")

            // Generate instance ID
        //this.instanceID = Math.random().toString(36).substr(2)

        this.timer = setInterval(this.onTimer.bind(this), 100)

    


    }

    onUnload(){
            console.log("on unload method called")

            clearInterval(this.Timer)


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

   async onEnter(){
        this.hasTriggered = true
      
        const xDist = this.getField('xdist')
        const yDist = this.getField('ydist')
        const zDist = this.getField('zdist')

         // Get user position
         let userPos = await this.plugin.user.getPosition()

            //display toast
        this.plugin.menus.toast({     
            text: 'You are flying!!! Weeeeeeee!',
            textColor: '#2CCA8C',
            duration: 3000})

           

         //set position in air
       await this.plugin.user.setPosition(userPos.x+xDist, userPos.y + yDist, userPos.z+zDist, false)   
        
     
       this.hasTriggered = false
       
   
    
    }

 
   
 
}



 

   

   