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
                {id: 'opacity-step', name: 'opacity Step Size', type: 'number', default: 0.1 }      

            ]
        })

        console.log("Animate Opacity Plugin loaded")


    }

  
    
}




  class EvanPlugAnimateOpacityComp extends BaseComponent {

  Opacity = 1
  OpacityMin = 0
  OpacityMax = 1
  OpacityStep = 0

  onLoad() 
    {
        this.CurrentOpacity = 1   
        this.OpacityMin = this.getField('opacity-min')
        this.OpacityMax = this.getField('opacity-max')
        this.OpacityStep = this.getField('opacity-step') * -1

        this.timer = setInterval(this.onTimer.bind(this), 500)
    
      

       console.log("component almost finished loading - out object id in console is next")
       console.log(this.objectID)
       console.log(this.OpacityMax)

      

    }

    async onTimer()
    {
        console.log("running timer")
            //check min / max

            console.log(this.opacity)
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

           this.CurrentOpacity += this.OpacityStep
           this.plugin.objects.update(this.objectID, { opacity: this.opacity}, false)

           console.log(this.CurrentOpacity)

    }


        
           
}

    

