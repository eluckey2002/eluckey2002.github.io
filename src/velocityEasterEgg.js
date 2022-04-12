export default class evanPlugEvanOnEnter extends BasePlugin  {

    /** Plugin info */
    static get id()             { return 'evanplug-CompEventMessaging' }
    static get name()           { return 'evanPlug-IDCompEventMessaging' }
    static get description()    { return 'custom component enter exit' }

    /** Called when the plugin is loaded */
    onLoad() {

       console.log("ComponentCompEventMessaging Plug loaded - v0.5")
       
        // Register component
        this.objects.registerComponent(evanPlugVelocityBase, {
            id: 'evanplug-velocity-base',
            name: 'Evan Plugin Testing',
            description: "Testing plugin capabilities",
            settings: [
                { id: 'lbl-onEnter', type: 'label', value: "onEnter Message" },
                { id: 'txt-onEnter', type: 'text',  default: "You have an entered a presentation sound zone. You can hear and speak to everyone throughout the whole zone. Sound is no longer limited by distance."},
                { id: 'lbl-onExit', type: 'label', value: "onExit Message" },
                { id: 'txt-onExit', type: 'text',  default: "You have left the presentation sound zone.  You will only be able to speak and hear others who are close to you."}
               
            ]
        })

    }
}

class evanPlugVelocityBase extends BaseComponent {
    hasTriggered = false
    isPreviousInside = false
    onEnterMessage = ""
    onExitMessage = ""
    isChecking = false
    instanceID = "string"

    onLoad(){
        console.log("Event Component Loaded 0..52v")

        //Generate instanceID
        this.instanceID = Math.random().toString(36).substring(2)

        this.timer = setInterval(this.checkIfWithin.bind(this), 1000)

        

    


    }


    onUnload(){
          

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
       if (this.isChecking){return}

       this.isChecking = true


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
                text: this.getField('txt-onEnter').toString(),
                textColor: '#2DCA8C',
                duration: 5000})

                



         }

         if( this.isPreviousInside && !isNowInside) //inside and now outside
         {
                //user has exited
                this.isPreviousInside = false

                         
                //display toast
                this.plugin.menus.toast({     
                    text: this.getField('txt-onExit').toString(),
                    textColor: '#2DCA8C',
                    duration: 5000})


         }

         this.isChecking = false
           
    }
   
 
}



 

   

   