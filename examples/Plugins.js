import { Vector3 } from "three"
import MessageManager from "../MessageManager"

// Reusable vars
let v3a = new Vector3()

/**
 * Manages plugins
 */
export default new class Plugins {

    /** Change index, used to rerun certain functions when plugin state changes */
    stateIndex = 0

    /** List of installed plugins */
    all = []

    /** List of internal plugins */
    internal = [
        require('./builtin/AgendaPlugin').default,
        require('./builtin/AvatarVideoPlugin').default,
        require('./builtin/BringToMePlugin').default,
        require('./builtin/BroadcastPlugin').default,
        require('./builtin/BusinessCardPlugin').default,
        require('./builtin/ClaimYourSpacePlugin').default,
        require('./builtin/ConferencePlugin').default,
        require('./builtin/ContactsPlugin').default,
        require('./builtin/CustomLandingPagePlugin').default,
        require('./builtin/DebugPlugin').default,
        require('./builtin/DirectMessagePlugin').default,
        require('./builtin/EmojisPlugin').default,
        require('./builtin/ExitSurveyPlugin').default,
        require('./builtin/HelpPlugin').default,
        require('./builtin/HubspotPlugin').default,
        require('./builtin/ImageReplacer').default,
        require('./builtin/IntercomPlugin').default,
        require('./builtin/Interscripted').default,
        require('./builtin/LockoutControlPlugin').default,
        require('./builtin/MarketplacePlugin').default,
        require('./builtin/MediaPlugin').default,
        require('./builtin/MediaWowzaPlugin').default,
        require('./builtin/MicrophonePlugin').default,
        require('./builtin/NameTagPlugin').default,
        require('./builtin/PlacesPlugin').default,
        require('./builtin/PresenterPlugin').default,
        require('./builtin/RadioPlugin').default,
        require('./builtin/RaiseHandPlugin').default,
        require('./builtin/RenderEffectDepthOfField').default,
        require('./builtin/RenderEffectSSAO').default,
        require('./builtin/ScreenSharingPlugin').default,
        require('./builtin/SeatingPlugin').default,
        require('./builtin/SpatialAudioPlugin').default,
        require('./builtin/SpatialVideoPlugin').default,
        require('./builtin/SponsorPlugin').default,
        require('./builtin/StageViewButton').default,
        require('./builtin/TutorialPlugin').default,
        require('./builtin/UserVideoPlugin').default,
        require('./builtin/VatomPlugin').default,
        require('./builtin/WebFramePlugin').default,
        require('./builtin/WelcomeCannes').default,
    ]

    /** Constructor */
    constructor() {

        // Add message listener
        MessageManager.addMessageListener('plugin:msg', this.onPluginMessage.bind(this))
        MessageManager.addMessageListener('plugin:request', this.onPluginRequest.bind(this))
        MessageManager.addMessageListener('plugin:response', this.onPluginResponse.bind(this))

    }

    /** Install a plugin */
    install(plugin, extensionManager) {

        // Store reference to this plugin manager
        plugin.plugins = this
        plugin.extensionManager = extensionManager

        // Ensure plugin details are copied from the static class
        plugin.id = plugin.id || plugin.constructor.id || ""
        plugin.name = plugin.name || plugin.constructor.name || ""
        plugin.description = plugin.description || plugin.constructor.description || ""

        // Pass objects to the plugin
        if (this._allObjects)
            plugin.objects.refreshComponentInstances(this._allObjects)

        // Add plugin
        this.all.push(plugin)

        // Load plugin
        Promise.resolve().then(e => plugin.onLoad()).then(e => {

            // Plugin loaded successfully
            console.debug(`[Plugins] Loaded ${plugin.id}`)

        }).catch(err => {

            // Plugin failed to load
            console.warn(`[Plugins] Failed to load ${plugin.id}: `, err)

        })

    }

    /** Remove a plugin */
    remove(plugin) {

        // Remove it from the array
        this.all = this.all.filter(p => p.id != plugin.id)

        // Unload the plugin
        plugin.objects.onUnload()
        plugin.hooks.onUnload()
        plugin.user.onUnload()
        try {
            plugin.onUnload()
        } catch (err) {
            console.warn(`[Plugins] Error in onUnload for plugin ${plugin.id}:`, err)
        }

        // Refresh the menus
        // Menus.updateMenuItems(this)

        // Done
        console.debug(`[Plugins] Unloaded ${plugin.id}`)

    }

    /** @private Called when a plugin on any peer sends a message to instances of itself. */
    onPluginMessage(data, fromID) {

        // Find the plugin instance
        let plugin = this.all.find(p => p.id == data.plugin)
        if (!plugin)
            return

        // Inform the plugin or the component of the message
        try {
            if (data.componentID)
                plugin.objects.componentInstances.find(c => c.componentID == data.componentID && c.objectID == data.objectID)?.onMessage(data.message, fromID)
            else
                plugin.onMessage(data.message, fromID)
        } catch (err) {
            console.warn(`[Plugins] Error in onMessage for plugin ${data.plugin}:`, err)
        }

    }

    /** @private Called when a plugin on any peer sends a request to instances of itself. */
    onPluginRequest(data, fromID) {

        // Find the plugin instance
        let plugin = this.all.find(p => p.id == data.plugin)
        if (!plugin)
            return

        // Inform the plugin or the component of the message
        Promise.resolve().then(e => {

            if (data.componentID)
                return plugin.objects.componentInstances.find(c => c.componentID == data.componentID && c.objectID == data.objectID)?.onRequest(data.message, fromID)
            else
                return plugin.onRequest(data.message, fromID)

        }).then(result => {

            // Check if valid
            if (!result)
                return

            // Send as the response
            MessageManager.sendMessage('plugin:response', { id: data.id, plugin: data.plugin, result }, data.isGlobal)

        }).catch(err => {

            // Failed
            MessageManager.sendMessage('plugin:response', { id: data.id, plugin: data.plugin, error: err.message }, data.isGlobal)

        })

    }

    /** @private Called when a plugin on any peer sends a response to instances of itself. */
    onPluginResponse(data, fromID) {

        // Find the plugin instance
        let plugin = this.all.find(p => p.id == data.plugin)
        if (!plugin)
            return

        // Inform the plugin of the message
        try {
            plugin.messages.onResponse(data, fromID)
        } catch (err) {
            console.warn(`[Plugins] Error in message response for plugin ${data.plugin}:`, err)
        }

    }

    /** @private Called when the objects in the world change */
    onObjectsUpdated(allObjects, updatedObjects) {

        // Pass to each plugin
        if (allObjects) {
            this._allObjects = allObjects
        }

        // Only update if we have objects. Fixes issue when no objects have been
        // loaded yet but we are trying to update the non-existant objects, which
        // causes the avatar disc to disappear
        if (this._allObjects) {
            for (let plugin of this.all) {
                plugin.objects.refreshComponentInstances(this._allObjects, updatedObjects)
            }
        }

    }

    /** @private Called when the user's position changes */
    onRender(delta, map) {

        // Pass render event to each plugin
        for (let plugin of this.all) {
            if (plugin.onRender) {
                try {
                    plugin.onRender(delta)
                } catch (err) {
                    console.warn(`[Plugins] Error in onRender for plugin ${plugin.id}:`, err)
                }
            }
        }

        // Check if user moved
        let userPos = map.source.userAvatar.container.position
        if (this._lastUserX == userPos.x && this._lastUserY == userPos.y && this._lastUserZ == userPos.z && this._lastStateIndexForRender == this.stateIndex) return
        this._lastUserX = userPos.x
        this._lastUserY = userPos.y
        this._lastUserZ = userPos.z
        this._lastStateIndexForRender = this.stateIndex

        // Pass to each plugin
        for (let plugin of this.all) {
            try {
                plugin.onUserMoved(userPos.x, userPos.y, userPos.z)
            } catch (err) {
                console.warn(`[Plugins] Error in onUserMoved for plugin ${plugin.id}:`, err)
            }
        }

        // Calculate entered/exit notifications for components
        for (let plugin of this.all) {
            for (let component of plugin.objects.componentInstances) {

                // Stop if function doesn;t exist
                if (!component.onEntered && !component.onExited)
                    continue

                // Calculate bounds for the object
                let maxDistance = (component.mapItem.properties.scale || 1) / 2
                let center = component.mapItem.container.getWorldPosition(v3a)

                // Get distance from user
                let distance = v3a.distanceTo(component.mapItem.map.source.userAvatar.container.position)
                let inside = distance < maxDistance

                // Check if changed
                if (inside == component._lastInside) continue
                component._lastInside = inside

                // Notify the component
                try {
                    if (inside && component.onEntered) component.onEntered()
                    else if (!inside && component.onExited) component.onExited()
                } catch (err) {
                    console.warn(`[Plugins] Error in ${inside ? 'onEntered' : 'onExited'} for plugin ${plugin.id}:`, err)
                }

            }
        }

    }

    /** @private Called when an object is clicked */
    onObjectClick(mapItem) {

        // Pass to plugin components
        for (let plugin of this.all)
            plugin.objects.onObjectClick(mapItem)

    }

}
