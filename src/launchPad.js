export default class evanPlugEvanOnEnter extends BasePlugin  {

    /** Plugin info */
    static get id()             { return 'ep_launchpad' }
    static get name()           { return 'ep-LaunchPad' }
    static get description()    { return 'custom component enter exit' }

    /** Called when the plugin is loaded */
    onLoad() {

       console.log("ComponentCompEventMessaging Plug loaded - v0.6")
       
        // Register component
        this.objects.registerComponent(evanPlugVelocityBase, {
            id: 'evanplug-launch-base',
            name: 'ep-launchpad',
            description: "Launch a user in the air in a specified direction",
            settings: [
                { id: 'lbl-xdist', type: 'label', value: "X Dist" },
                { id: 'xdist', type: 'number',  default: '5'},
                { id: 'lblydist', type: 'label', value: "Y (UP) Dist" },
                { id: 'ydist', type: 'number',  default: '25'},
                { id: 'lblzdist', type: 'label', value: "Z Dist" },
                { id: 'zdist', type: 'number',  default: '5'},

               
            ]
        })

    }
}

class evanPlugVelocityBase extends BaseComponent {
    isChecking = false
    instanceID = "string"

    onLoad(){
       

        //Generate instanceID
    
        this.instanceID = Math.random().toString(36).substring(2)

        console.log("LaunchPad BaseComp Loaded - " & this.instanceID)

        this.timer = setInterval(this.onTimer.bind(this), 250)

   
    }

  

    onUnload(){
          console.log("Launchpad Plugin Base unloaded")
            clearInterval(this.Timer)


    }


  
    async onTimer() {

        // Only allow triggering once
        if (this.isChecking) {
            return
        }

        this.isChecking = true

        // Get user position
        let userPos = await this.plugin.user.getPosition()
        
        // Get object position 
        const x = this.fields.x       || 0
        const y = this.fields.height  || 0
        const z = this.fields.y       || 0

        

        // Calculate distance between the user and this pickup
        const distance = Math.sqrt((x - userPos.x) ** 2 + (y - userPos.y) ** 2 + (z - userPos.z) ** 2)

        // If close enough
        let triggerDistance = 1
        if (distance < triggerDistance) {
            this.onTrigger()
            return
        }      
        else{
            this.isChecking = false
        }
      

    }

   async onTrigger(){
        
      
         // Get user position
         let userPos = await this.plugin.user.getPosition()

        //display toast
        this.plugin.menus.toast({     
            text: 'You are flying!!! Weeeeeeee! - ' & this.instanceID,
            textColor: '#2DCA8C',
            duration: 3000})

         //set position in air
         await this.plugin.user.setPosition(userPos.x + parseInt(this.getField('xdist')), userPos.y + parseInt(this.getField('ydist')), userPos.z + parseInt(this.getField('zdist')),false)   
        
        this.isChecking = false
   
    
    }


   
 
}



 

   

   