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
    isPreviousInside = false

    onLoad(){
        console.log("Velocity Plug BaseComponet loaded - v.01")

            // Generate instance ID
        //this.instanceID = Math.random().toString(36).substr(2)

        this.timer = setInterval(this.checkIfWithin.bind(this), 200)


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
        console.log("onEnter called!")

         // Get user position
         let userPos = await this.plugin.user.getPosition()

            //display toast
        this.plugin.menus.toast({     
            text: 'You are flying!!! Weeeeeeee!',
            textColor: '#2DCA8C',
            duration: 5000})

         //set position in air
       await this.plugin.user.setPosition(userPos.x+2, userPos.y + 20, userPos.z+2, false)   
        
     

        this.hasTriggered = false
   
    
    }

   async checkIfWithin(){

         // Get user position
         let userPos = await this.plugin.user.getPosition()

         // Check if we are inside this object
         let minX = this.fields.world_center_x - this.fields.world_bounds_x/2
         let minY = this.fields.world_center_y - this.fields.world_bounds_y/2
         let minZ = this.fields.world_center_z - this.fields.world_bounds_z/2
         let maxX = this.fields.world_center_x + this.fields.world_bounds_x/2
         let maxY = this.fields.world_center_y + this.fields.world_bounds_y/2
         let maxZ = this.fields.world_center_z + this.fields.world_bounds_z/2
         let isNowInside = userPos.x >= minX && userPos.x <= maxX && userPos.y >= minY && userPos.y <= maxY && userPos.z >= minZ && userPos.z <= maxZ
        
         if (!this.isPreviousInside && isNowInside) //outside and now inside
         {
                //user has entered
                this.isPreviousInside = true
                
                //display toast
                this.plugin.menus.toast({     
                text: 'You have an entered a presentation sound zone. You can hear and speak to everyone throughout the whole zone. Sound is no longer limiited by distance.',
                textColor: '#2DCA8C',
                duration: 5000})

                



         }
         if(this.isPrevious = "inside" && !isNowInside) //inside and now outside
         {
                //user has exited
                this.isPreviousInside = false
               
                //display toast
                this.plugin.menus.toast({     
                    text: 'You have left the presentation sound zone.  You will only be able to speak and hear others who are close to you.',
                    textColor: '#2DCA8C',
                    duration: 5000})


         }
           
    }
   
 
}



 

   

   