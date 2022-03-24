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
                {id: 'opacity-min', name: 'Opacity Min', type: 'number', default: 1 },
                {id: 'opacity-max', name: 'Opacity Max', type: 'number', default: 1 },
                {id: 'opacity-step', name: 'opacity Step Size', type: 'number', default: 0.01 }      

            ]
        })


    }

  


      //UNLOAD METHOD
      onUnload(){

       
  
       }
}




  class EvanPlugAnimateOpacityComp extends BaseComponent {
      CurrentOpacity = 1
      OpacityStep = 0      
  
  onLoad() 
    {
        this.OpacityMin = this.getField('opacity-min')
        this.OpacityMax = this.getField('opacity-max')
        this.OpacityStep = this.getField('opacity-step') * -1

        this.timer = setInterval(this.onTimer.bind(this), 200)
    
        //get objectID
        this.ObjectIDDD = this.plugin.objects.id

        console.log("This is the object id " & this.ObjectIDDD )

    }

    async onTimer()
    {
            //check min / max

            if (this.CurrentOpacity < this.OpacityMin) {
                this.OpacityStep = this.CurrentOpacity * -1
            }
            if (this.CurrentOpacity > this.OpacityMax) {
                this.OpacityStep = this.CurrentOpacity * -1
            }

            this.CurrentOpacity += this.OpacityStep
           this.plugin.objects.update(this.plugin.objects.id, { opacity: this.CurrentOpacity}, false)

           log.console(this.CurrentOpacity)

    }


    
    onUnload()
    {



    }
  



    
           
}

    

