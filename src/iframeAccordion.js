export default class iframeAccordion extends BasePlugin  {

    /** Plugin info */
    static get id()             { return 'evanplug-iframepanel' }
    static get name()           { return 'Iframe Panel' }
    static get description()    { return 'Opens an iframe in the accordian panel' }

    /** Called when the plugin is loaded */
    onLoad() {

        this.crossOrigin = 'anonymous'

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

    updateSize(msg)
    {
        console.log('increase called')
         if (msg.action === 'increase') {

            let obj = this.objects.get(msg.id)
            console.log(obj)
            let objHeight = obj.height

            this.objects.update(obj.id, {height: objHeight+1}, false)

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

    animate(objId)
    {
        this.objects.animate({ target: objId, duration: 1000, field: 'Opacity', value: 0, delay: 1000 })

    }

    createObject()
    {
        //in development
       let objID = this.objects.create({type: 'cube'})

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
