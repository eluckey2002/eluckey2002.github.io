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

    opacity = 1
    OpacityMax = 0.9
    OpacityMin = 0.5
    OpacityStep = 0.1
 

  onLoad() 
    {
        
        this.opacity = 1
        this.OpacityMin = 0.5  //this.getField('opacity-min')
        this.OpacityMax = 1    //this.getField('opacity-max')
        this.OpacityStep = 0.1 //this.getField('opacity-step') * -1

        this.timer = setInterval(this.onTimer.bind(this), 1000)
    
      

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


        
           
}

    

