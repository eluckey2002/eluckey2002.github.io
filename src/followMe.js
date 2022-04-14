export default class evanPlugFollowMe extends BasePlugin  {

    /** Plugin info */
    static get id()             { return 'evanplug-followMe' }
    static get name()           { return 'evanPlug-followMe' }
    static get description()    { return 'evanPlug-followMe' }

    /** Called when the plugin is loaded */
    onLoad() {

       console.log("evanPlug follow me - 0.1")
       
        // Register component
        this.objects.registerComponent(evanPlugFollowMeComp, {
            id: 'evanplug-velocity-base',
            name: 'Evan Plugin Testing',
            description: "Testing plugin capabilities",
            settings: [
                { type: 'label', value: "X Distance" },
                { id: 'compId', type: 'text'}
              
            ]
        })

    }
}

class evanPlugFollowMeComp extends BaseComponent {
    hasTriggered = false
    isPreviousInside = false
    onEnterMessage = ""
    onExitMessage = ""

    onLoad(){
        console.log("Follow Me ")

        // Generate instance ID
        this.instanceID = Math.random().toString(36).substring(2)
        console.log(this.instanceID)

        console.log("This is a test of " + "concat : " + this.instanceID)

        this.timer = setInterval(this.onTimer.bind(this), 250)

    }

    onUnload(){
   
    }


   


   
    async onTimer() {

          // Get user position
          let userPos = await this.plugin.user.getPosition()

          this.plugin.objects.update(this.objectID, { x: userPos.x, y: userPos.y }, false)
    
    

    }

 

 
   
 
}



 

   

   