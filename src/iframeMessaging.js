export default class evanPlugIframeMessaging extends BasePlugin  {

    /** Plugin info */
    static get id()             { return 'evanplug-iframe-messaging' }
    static get name()           { return 'evanPlug-iframe-messaging' }
    static get description()    { return 'evanPlug-iframe-messaging' }

    /** Called when the plugin is loaded */
    onLoad() {

       console.log("iframe messaging - 0.2")
       
      
      this.iFrameID =  this.menus.register(
          {section: 'infopanel',
           panel: 
           {
              iframeURL: this.paths.absolute('./overlay.html'),
              width: '300',
              height: '300'
           }
          }
      )

      this.triggerHook()

    }

    onUnload()
    {
        this.plugin.menus.unregister(this.iFrameID)

    }

    loadHook()
    {
        //testing hooks
        this.hooks.addHandler
        Hooks.get('view.change').removeHandler(this.updateHelpImage)

    }

    triggerHook()
    {
        this.hooks.trigger('hud.update-button', { id: 'mute', altID: 'unmute', type: 'disable' })

    }
}




 

   

   