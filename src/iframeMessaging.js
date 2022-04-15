export default class evanPlugIframeMessaging extends BasePlugin  {

    /** Plugin info */
    static get id()             { return 'evanplug-iframe-messaging' }
    static get name()           { return 'evanPlug-iframe-messaging' }
    static get description()    { return 'evanPlug-iframe-messaging' }

    /** Called when the plugin is loaded */
    onLoad() {

       console.log("iframe messaging - 0.1")
       
      
      this.iFrameID =  this.menus.register(
          {section: 'infopanel',
           panel: 
           {
              iframeURL: this.paths.absolute('./overlay.html')
           }
          }
      )

    }

    onUnload()
    {
        this.plugin.menus.unregister(this.iFrameID)

    }
}




 

   

   