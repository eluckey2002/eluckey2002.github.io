export default class iframeAccordion extends BasePlugin  {

    /** Plugin info */
    static get id()             { return 'evanplug-iframepanel' }
    static get name()           { return 'Iframe Panel' }
    static get description()    { return 'Opens an iframe in the accordian panel' }

    /** Called when the plugin is loaded */
    onLoad() {

        this.crossOrigin = 'anonymous'
        this.objID = ''

        // Allow playlist URL to be modified
        this.menus.register({
            id: 'evanplug-iframepanel',
            section: 'plugin-settings',
            panel: {
                fields: [
                    { type: 'section', name: 'IFrame' },
                    { type: 'textarea', id: 'url', name: 'URL', help: 'URL of iframe to to be shown' }
                ]
            }
        })

         

        //WORKING! Allows cross-origin - use the this.paths.absolute
        // Register the button
        
        this.menus.register({
            id: 'evan-iframe-button',
            text: 'Iframe Test',
            section: 'controls',
            order: 3,
            inAccordion: true,
            panel: {
                iframeURL: this.paths.absolute('./iframe.html'),
                width: 320
            }
        })

       

    }

    //working!
    async onMessage(e) {
       
        if (e.action === 'send-toast') {
           this.sendAlert(e.value)
            return
        }

        if (e.action === 'send-alert') {
            this.sendAlert2()
             return
         }

         if (e.action === 'animate') {
            this.animate(e.id)
             return
         }

         if (e.action === 'createObject') {
            this.createObject()
            return

         }

         if (e.action === 'increase') {
            this.updateSize(e)
            return

         }
    }

   async updateSize(msg)
    { //create and scale are working!
        console.log('increase called')
        console.log(msg.id)
       
        console.log("is the id and scale passed from js")
         if (msg.action === 'increase') {

            let obj = await this.objects.get(msg.id)
           console.log("scale y is")
           console.log(obj.scale_y)

            let objYHeight = parseInt(obj.scale_y) + 1

            console.log(objYHeight)
           

           await this.objects.update(obj.id, {scale_y: parseInt(objYHeight)})
          
            console.log('obj height increased')
             
         }
    }

    applyVelocity()
    {
            //not connected to front end
            console.log("apply velocity code needed")

    }

    //working! iframe uses parent.postMessage with * 
    sendAlert(msg){
        console.log("alert function called")
        this.menus.alert(msg,'Message','Info')

    }
    

    //testing iframe calling parent.send
    sendAlert2()
    {
        this.menus.alert('Button called from iframe','Message','Info')


    }

    animate(e)
    {
        this.objects.animate({ target: this.objID, duration: 2000, field: 'Opacity', value: 0, delay: 1000 })

    }

  async createObject()
    {
        //create and scale are working!
        console.log('create object message received and in method')
   
       this.objID = await this.objects.create(
           { type: 'cube',
           scale: 1.0,
           x: 5,
           y: 5,
           scale_y: 1.0,
           height: 2,
           clientOnly: false,
           shading: 'basic',
           disabled: false,
           targetable: true,
           color: '#A52A2A'}, false)

       console.log(this.objID)

       console.log("is the id returned from creating the object")

    }

   



    /**
     * Updates the plugin when the settings have changed.
     * @param {string} field Field that has been updated.
     * @param {any} value New value of the field.
     */
    onSettingsUpdated(field, value) {

        // Ignore any update that is not a URL change
        if (field !== 'url') {
            return
        }

    return

    }

}
