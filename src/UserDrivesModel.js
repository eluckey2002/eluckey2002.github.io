export default class EYFoundryUserDrivesModel extends BasePlugin  {

    /** Plugin info */
    static get id()             { return 'EYFoundry-UserDrivesModel' }
    static get name()           { return 'User Drives Model' }
    static get description()    { return 'User drives model' }

    /** Called when the plugin is loaded */
    onLoad() {

       console.log("EYFoundry-UserDrivesModel Plug loaded - v0.22")
       
        // Register component
        this.objects.registerComponent(userDrivesModelComponent, {
            id: 'EYFoundry-userDrivesModelComp',
            name: 'UserDrivesModelComp 0.2v',
            description: "Display custom messages to user on entry and exit of object",
            settings: [
                { id: 'lbl-onEnter', type: 'label', value: "onEnter Message" },
                { id: 'txt-onEnter', type: 'text'},
                { id: 'lbl-onExit', type: 'label', value: "onExit Message" },
                { id: 'txt-onExit', type: 'text'},
                { id: 'lbl-x', type: 'label', value: "X" },
                { id: 'xloc', type: 'number'},
                { id: 'lbl-y', type: 'label', value: "Y" },
                { id: 'yloc', type: 'number'},
                { id: 'lbl-scale', type: 'label', value: 'Scale'},
                { id: 'scale', type: 'text', value: 1},
                { id: 'lbl-url', type: 'label', value: "URL" },
                { id: 'url', type: 'text', help: './CornPlant.glb'},
                { id: 'code', type: 'textarea'},
                { id: 'eval', type: 'button', value: 'Run Code'}
              
            ]
        })

    }

    createAndViewObject(ifUserDriven, url)
    {

     console.log("User entered object - create and view called")

    }

}

class userDrivesModelComponent extends BaseComponent {
   
    isPreviousInside = false
    isChecking = false
    instanceID = "string"
    objID = "objectID"
    
   

    onLoad(){
        console.log("userDrivesModelComponent 0.22v Loaded")

        //Generate instanceID
        this.instanceID = Math.random().toString(36).substring(2)

        this.timer = setInterval(this.checkIfWithin.bind(this), 1000)

     }

     onObjectUpdated(newFields)
     {

        console.log(newFields)
     }
  

    onUnload(){
          
            clearInterval(this.Timer)


    }

    onAction(id){

            eval(this.getField('code'))

    }



   async checkIfWithin(){
       if (this.isChecking){return}

       this.isChecking = true


         // Get user position
         let userPos = await this.plugin.user.getPosition()

         // Check if we are inside this object
         let minX = this.fields.world_center_x - this.fields.world_bounds_x/2
         let minY = this.fields.world_center_y - this.fields.world_bounds_y/2
         let minZ = this.fields.world_center_z - this.fields.world_bounds_z/2
         let maxX = this.fields.world_center_x + this.fields.world_bounds_x/2
         let maxY = this.fields.world_center_y + this.fields.world_bounds_y/2
         let maxZ = this.fields.world_center_z + this.fields.world_bounds_z/2
         let isNowInside = userPos.x >= minX && userPos.x <= maxX && userPos.y >= minY && userPos.y <= maxY && userPos.z >= minZ && userPos.z <= maxZ
        

    
         if (!this.isPreviousInside && isNowInside) //outside and now inside
         {
                //user has entered
                this.isPreviousInside = true


                //display toast
                this.plugin.menus.toast({     
                text: this.getField('txt-onEnter'),
                textColor: '#2DCA8C',
                duration: 4000})

                let ifUserDriven = true
                let url = ""

                console.log("calling createObject with small model!")

                    // Create new coin properties
                        const newCoinProps = {
                        name: 'Obj1',
                        type: 'model',
                        x: parseInt(this.getField('xloc')),                 
                        y: parseInt(this.getField('yloc')),
                        height: 1,
                        scale: parseInt(this.getField('scale')),
                        shading: 'basic',
                        url: this.plugin.paths.absolute(this.getField('url')),
                        clientOnly: false
                        }

                    // Create a coin
                  this.objID =  await this.plugin.objects.create(newCoinProps)

                   

                 // url: this.plugin.paths.absolute('./CornPlant.glb'),
          

   

         }

         if( this.isPreviousInside && !isNowInside) //inside and now outside
         {
                //user has exited
                this.isPreviousInside = false

                         
                //display toast
                this.plugin.menus.toast({     
                    text: this.getField('txt-onExit'),
                    textColor: '#2DCA8C',
                    duration: 4000})

               this.plugin.objects.remove(this.objID)

              


         }

         this.isChecking = false
           
    }
   
 
}



 

   

   