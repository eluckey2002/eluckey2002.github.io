export default class EvanPlugAnimateOpacity extends BasePlugin {

    /** Plugin info */
    static get id()             { return 'evanPlugin-animateOpacity' }
    static get name()           { return 'Animate Opacity' }
    static get description()    { return 'Animate opacity of objects' }

    components = []

    /** Called when the plugin is loaded */
     async onLoad() {

        // Register coin component
        this.objects.registerComponent(EvanPlugAnimateOpacityComp, {
            id: 'EvanPlugAnimateOpacity',
            name: 'Evan Plug - Animate Opacity',
            description: 'Animate opacity ',
            settings: [
                {id: 'opacity-min', name: 'Opacity Min', type: 'number', default: 0.1 },
                {id: 'opacity-max', name: 'Opacity Max', type: 'number', default: 0.9 },
                {id: 'opacity-step', name: 'opacity Step Size', type: 'number', default: 0.01 },     
                {id: 'btn-start', name: 'Start!', type: 'button'} 

            ]
        })

        console.log("Animate Opacity Plugin loaded")


    }

  
    
}




  class EvanPlugAnimateOpacityComp extends BaseComponent {

    opacity = 0.8
    OpacityMax = 0.8
    OpacityMin = 0.1
    OpacityStep = 0.01
    isRunnning = false
    isTimerRunning = false
    dimUp = false

  onLoad() 
    {
        this.instanceID = Math.random().toString(36).substring(2)

        this.opacity = 1
        this.OpacityMin = this.getField('opacity-min')
        this.OpacityMax = this.getField('opacity-max')
        this.OpacityStep = this.getField('opacity-step') 
        this.dimUp = false;
        this.isRunnning = false
        this.isTimerRunning = false
       
    
    
      

       console.log("component almost finished loading - out object id in console is next")
       console.log(this.objectID )
       console.log(this.instanceID)
    
      

      

    }

   

    async onTimer()
    {
        let newOpacityValue = 0
        if(this.dimUp == false)
        {
            newOpacityValue = this.Opacity - this.OpacityStep
            if(newOpacityValue < 0 || newOpacityValue < this.OpacityMin){ 
                newOpacityValue = this.OpacityMin
                this.dimUp = true
            
            }

        }

        else if (this.dimUp == true)
        {
            newOpacityValue = this.Opacity + this.OpacityStep
            if(newOpacityValue > 1 || newOpacityValue > this.OpacityMax){ 
                newOpacityValue = this.OpacityMax
                this.dimUp = false
              }   
       }

       this.plugin.objects.update(this.objectID, { opacity: newOpacityValue}, false)
       this.opacity = newOpacityValue

    }
     

    


    onAction(id)
    {

       
       // THIS WORKS! this.plugin.objects.animate({ target: this.objectID, duration: 1000, field: 'opacity', value: 0, delay: 1000 })

            //is there a button in the settings? this worked!
           if (id=='btn-start') {
               
                if (this.isRunnning == false) {



                    //restart values
                    this.plugin.objects.update(this.objectID, { opacity: this.OpacityMax}, false)
                    this.OpacityMin = this.getField('opacity-min')
                    this.OpacityMax = this.getField('opacity-max')
                    this.OpacityStep = this.getField('opacity-step')
                    this.opacity = this.OpacityMax
                    this.dimUp = false
                   

                    this.timer = setInterval(this.onTimer.bind(this), 1000)
                    this.isRunnning = true
                  
                }
                else if (this.isRunnning == true)
                {
                    clearInterval(this.timer)
                    this.isRunnning = false
                  
                  
                }



           }
         

    }

  
        
           
}

    

