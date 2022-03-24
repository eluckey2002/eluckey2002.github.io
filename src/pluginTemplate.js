export default class EvanPlugAnimateOpacity extends BasePlugin {

    /** Plugin info */
    static get id()             { return 'evanPlugin-animateOpacity' }
    static get name()           { return 'Animate Opacity' }
    static get description()    { return 'Animate opacity of objects' }

    /** Called when the plugin is loaded */
     async onLoad() {

        // Register coin component
        this.objects.registerComponent(EvanPlugAnimateOpacityComp, {
            id: 'EvanPlugAnimateOpacity',
            name: 'Evan Plug - Animate Opacity',
            description: 'Animate opacity ',
            settings: [
                {id: 'opacity-min', name: 'Opacity Min', type: 'number', default: 0.5 },
                {id: 'opacity-max', name: 'Opacity Max', type: 'number', default: 1 },
                {id: 'opacity-step', name: 'opacity Step Size', type: 'number', default: 0.1 },     
                {id: 'btn-Action', name: 'Action!', type: 'button'} 

            ]
        })

        console.log("Animate Opacity Plugin loaded")


    }

  
    
}




  class EvanPlugAnimateOpacityComp extends BaseComponent {

    opacity = 1
    OpacityMax = 0.9
    OpacityMin = 0.5
    OpacityStep = 0.1
    isRunnning = false
 

  onLoad() 
    {
        this.instanceID = Math.random().toString(36).substring(2)

        this.opacity = 1
        this.OpacityMin = this.getField('opacity-min')
        this.OpacityMax = this.getField('opacity-max')
        this.OpacityStep = this.getField('opacity-step') * -1
        this.isRunnning = false
        this.timer = setInterval(this.onTimer.bind(this), 2000)
    
    
      

       console.log("component almost finished loading - out object id in console is next")
       console.log(this.objectID)
      

      

    }

    async onTimer()
    {
        console.log("running timer spit out opacity min and max and step values")
            //check min / max
            console.log(this.OpacityMax)
            console.log(this.OpacityMin)
            console.log(this.OpacityStep)
          

            if (this.opacity < this.OpacityMin){
                //opacity has reached min. Go back up. '
                this.OpacityStep = this.OpacityStep * -1
            }

             if (this.opacity > this.OpacityMax) {
                //opacity has reached max - substract
                this.OpacityStep = this.OpacityStep * -1
            }

           this.opacity += this.OpacityStep
           this.plugin.objects.update(this.objectID, { opacity: this.opacity}, false)

           console.log(this.opacity)

    }


    onSettingsUpdated(field, value)
    {


    }

    onMessage(data)
    {
        

    }


    onAction(id)
    {
            //is there a button in the settings?
            console.log("BUTTON PRESSED!")

    }

        
           
}

    

