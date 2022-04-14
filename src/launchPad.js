export default class evanPlugEvanOnEnter extends BasePlugin  {

    /** Plugin info */
    static get id()             { return 'ep_launchpadd' }
    static get name()           { return 'ep-LaunchPad' }
    static get description()    { return 'custom component enter exit' }

    /** Called when the plugin is loaded */
    onLoad() {

       console.log("ComponentCompEventMessaging Plug loaded - v0.7")
       
        // Register component
        this.objects.registerComponent(evanPlugLaunchPadBase, {
            id: 'evanplug-launch-bases',
            name: 'ep-launchpad',
            description: "Launch a user in the air in a specified direction",
            settings: [
                { id: 'lbl-xdist', type: 'label', value: "X Dist" },
                { id: 'xdist', type: 'number',  default: '5'},
                { id: 'lblydist', type: 'label', value: "Y (UP) Dist" },
                { id: 'ydist', type: 'number',  default: '5'},
                { id: 'lblzdist', type: 'label', value: "Z Dist" },
                { id: 'zdist', type: 'number',  default: '5'},

               
            ]
        })

    }
}

class evanPlugLaunchPadBase extends BaseComponent {
    isChecking = false
    instanceID = "string"

    onLoad(){
       

        //Generate instanceID
    
        this.instanceID = Math.random().toString(36)

        console.log("LaunchPad BaseComp Loaded Instance ID is")
        console.log(this.instanceID)

        this.timer = setInterval(this.onTimer.bind(this), 1000)

   
    }

  

    onUnload(){
          console.log("Launchpad Plugin Base unloaded")
            clearInterval(this.Timer)


    }


  
    async onTimer() {
        console.log("onTime start")

        // Only allow triggering once
        if (this.isChecking) {
            console.log("isChecking is true. Return.")
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
        
         //set position in air
         await this.plugin.user.setPosition(userPos.x + parseInt(this.getField('xdist')), userPos.y + parseInt(this.getField('ydist')), userPos.z + parseInt(this.getField('zdist')),false)   
        

         //display toast
         this.plugin.menus.toast({     
           text: 'You are flying!!! Weeeeeeee!',
           textColor: '#2DCA8C',
           duration: 3000})


        this.isChecking = false
        console.log("isChecking set to false. Done running timer.")

          
        }      
     
      

    }

   


   
 
}



 

   

   