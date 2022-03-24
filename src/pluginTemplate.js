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
                {id: 'opacity-min', name: 'Opacity Min', type: 'number', default: 0.5 },
                {id: 'opacity-max', name: 'Opacity Max', type: 'number', default: 1 },
                {id: 'opacity-step', name: 'opacity Step Size', type: 'number', default: 0.1 },     
                {id: 'btn-start', name: 'Start!', type: 'button'} 

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
    isTimerRunning = false

  onLoad() 
    {
        this.instanceID = Math.random().toString(36).substring(2)

        this.opacity = 1
        this.OpacityMin = this.getField('opacity-min')
        this.OpacityMax = this.getField('opacity-max')
        this.OpacityStep = this.getField('opacity-step') * -1
        this.isRunnning = false
       
    
    
      

       console.log("component almost finished loading - out object id in console is next")
       console.log(this.objectID)
       console.log(this.instanceID)
    
      

      

    }

   

    async onTimer()
    {

        if(this.isTimerRunning == true){return}
        this.isTimerRunning = true
        
        this.newMethod(this.OpacityMin, this.OpacityMax, this.OpacityStep)
          
        try {
      
            
        
            if (this.opacity <= this.OpacityMin){
                //opacity has reached min. Go back up. '
                this.OpacityStep = this.OpacityStep * - 1
            }

             if (this.opacity >= this.OpacityMax) {
                //opacity has reached max - substract
                this.OpacityStep = this.OpacityStep * - 1
            }

      
       

           this.opacity += this.OpacityStep

        } catch (error) 
        { console.warn(error) }
                 

try{

           if (this.opacity > 1) {
               console.log("opacity was higher than 1. resetting to 1.")
               this.opacity = 1
            
           }
           else if (this.opacity < 0)
           {

             this.opacity = 0
           }

        }catch(err){ console.warn(err)}

        try{
           this.plugin.objects.update(this.objectID, { opacity: this.opacity}, false)
        }
        catch(er){ console.warn(er) }


            console.log(this.opacity)

           this.isTimerRunning = false
        }


      newMethod(opMin, opMax, opStep) {
          console.log("running timer spit out opacity min and max and step values")
          //check min / max
          console.log(opMin)
          console.log(opMax)
          console.log(opStep)
      }

    Updated(field, value)
    {
        console.log("field updated : " & field & " : " & value)

    }

    onMessage(data)
    {
        

    }


    onAction(id)
    {

       
       // THIS WORKS! this.plugin.objects.animate({ target: this.objectID, duration: 1000, field: 'opacity', value: 0, delay: 1000 })

            //is there a button in the settings? this worked!
           if (id='btn-start') {
               
                if (this.isRunnning == false) {



                    //restart values
                    this.plugin.objects.update(this.objectID, { opacity: 1}, false)
                    this.OpacityMin = this.getField('opacity-min')
                    this.OpacityMax = this.getField('opacity-max')
                    this.OpacityStep = this.getField('opacity-step')

                    this.timer = setInterval(this.onTimer.bind(this), 200)
                    this.isRunnning = true
                    console.log("Start Pressed and Interval set!")
                }
                else if (this.isRunnning == true)
                {
                    clearInterval(this.timer)
                    this.isRunnning = false
                    console.log("Stop Pressed. Interval removed")
                  
                }



           }
         

    }

    dimDown()
    {
                this.opacity = this.opacity - this.OpacityStep

                if(this.opacity < this.OpacityMin)
                {
                    this.opacity = this.OpacityMin
                    return true
                }
                
                 return false   
        
    }

    dimUp()
    {

                this.opacity = this.opacity + this.OpacityStep

                if(this.opacity > this.OpacityMax)
                {
                    this.opacity = this.OpacityMax
                    return true
                }
                
                 return false   
    }

        
           
}

    

