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

        // Register the button
        this.menus.register({
            id: 'evan-iframe-button',
            text: 'Iframe Test',
            section: 'controls',
            order: 3,
            inAccordion: true,
            panel: {
                iframeURL: this.getField('url'),
                width: 320
            }
        })

    }

    async onMessage(e) {
    console.log("on Message received")
    console.log(e)
        // Update image now if panel loaded
        if (e.action === 'send-toast') {
           this.sendAlert()
            return
        }
    }

    sendAlert(){
        console.log("alert function called")
        this.menus.alert('Button called from iframe','Message','Info')

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

        // Re-register the button when settings have changed
        this.menus.register({
            id: 'evan-iframe-button',
            text: 'IFrame Test',
            section: 'controls',
            order: 3,
            inAccordion: true,
            panel: {
                iframeURL: value,
                width: 320
            }
        })

    }

}
