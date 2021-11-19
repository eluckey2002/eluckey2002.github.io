import Map3D from "../Map3D"

/**
 * Represents a plugin component that is attached to an object.
 */
export default class BaseComponent {

    /** Plugin */
    plugin = null

    /** ID of this component */
    componentID = ''

    /** ID of the object this component is associated with */
    objectID = ''

    /** The map item that this component is attached to. */
    mapItem = null

    /** Current object fields */
    fields = {}

    /** Called when the object is loaded */
    onLoad() {}

    /** Called when the object is removed */
    onUnload() {}

    /** Called when the object;s fields changed */
    onObjectUpdated(newFields) {}

    /** Called when the user clicks on the object */
    onClick() {}

    /** Get a field value */
    getField(name) {
        return this.fields['component:' + this.componentID + ':' + name]
    }
    
    /** Set a field value, admins only */
    setField(name, value) {
        return this.mapItem.updateProperties({ 
            ['component:' + this.componentID + ':' + name]: value
        }, true)
    }

    /** Send a message to this component on other devices */
    sendMessage(msg, isGlobal, targetUserID) {
        return this.plugin.messages.send(msg, isGlobal, targetUserID, this.objectID, this.componentID)
    }

    /** Send a request to this component on other devices. The first truthy response from onRequest(msg) will be returned. */
    sendRequest(msg, isGlobal, targetUserID) {
        return this.plugin.messages.request(msg, isGlobal, targetUserID, this.objectID, this.componentID)
    }

}