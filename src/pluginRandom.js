
export default class EvanPlugRandom extends BasePlugin {

    /** Plugin info */
    static get id()             { return 'evanPlugin-animateOpacity' }
    static get name()           { return 'Animate Opacity' }
    static get description()    { return 'Animate opacity of objects' }

    components = []

    /** Called when the plugin is loaded */
     async onLoad() {

        // Register coin component
        this.objects.registerComponent(EvanPlugRandomComp, {
            id: 'EvanPlugRandom',
            name: 'Evan Plug - Random',
            description: 'Random',
            settings: [
                {id: 'animate-delay', name: 'Opacity Min', type: 'number', default: 1000 },
                {id: 'animate-duration', name: 'Opacity Max', type: 'number', default: 1000 },
                {id: 'animate-value', name: 'opacity Step Size', type: 'number', default: 0 },     
                {id: 'btn-animateOpacity', name: 'Animate Opacity!', type: 'button'},
                {id: 'btn-animateScale', name: 'Animate Scale!', type: 'button'},
                {id: 'btn-applyVelocity', name: 'Apply Vertical Velocity', type: 'button'},
                {id: 'btn-createObject', name: 'Apply Vertical Velocity', type: 'button'}



            ]
        })

       

       

      


    }

  
    
}




  class EvanPlugRandomComp extends BaseComponent {

  Duration = 0
  Delay = 0
  Value = 0
  InstanceID = 'string'

  onLoad() 
    {
        this.instanceID = Math.random().toString(36).substring(2)

        this.Duration = parseInt(this.getField('animate-duration'))
        this.Delay = parseInt(this.getField('animate-delay'))
        this.Value = parseInt(this.getField('animate-value'))

    }


     

    
    async onAction(id)
    {

        console.log('action clicked!')
        console.log(id)

            //is there a button in the settings? this worked!
           if (id=='btn-animateOpacity') {
               
            this.plugin.objects.animate({ target: this.objectID, duration: this.Duration, field: 'opacity', value: this.Value, delay: this.Delay })
          
           }
           
           if (id=='btn-applyVelocity') {
            await this.hooks.trigger('avatar.applyVerticalVelocity', { velocity: 20 })
            
           }

           if (id=='btn-animateScale') {

            this.plugin.objects.animate({ target: this.objectID, duration: this.Duration, field: 'scale', value: this.Value, delay: this.Delay })
          
            
           }

           if (id=='btn-createObject') {

            this.plugin.objects.create({
                type: 'sphere',
                color: '#000',
                x: 5,
                y: 5,
                height: 5,
                name: 'EvanPluginSphere'
            }




            )




            }
          
            
           

    }
         
}

    

