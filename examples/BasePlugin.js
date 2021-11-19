import Menus from "./components/Menus"
import Messages from "./components/Messages"
import User from "./components/User"
import Textures from "./components/Textures"
import Objects from "./components/Objects"
import World from "./components/World"
import EventEmitter from "../utilities/EventEmitter"
import HooksComponent from "./components/HooksComponent"
import Audio from "./components/Audio"
import Server from "../Server"
import constants from "../constants"

/**
 * Base plugin class. All plugins should extend this class.
 */
export default class BasePlugin extends EventEmitter {

    /** Plugin information */
    id = ""
    name = ""
    description = ""
    version = 1

    /** Settings panel, a React component displayed when the user configures the plugin */
    settingsPanel = null

    /** Colours for control buttons */
    selectedColour = constants.colors.green;
    unselectedColour = constants.colors.lightGrey;
    inactiveColour = constants.colors.red;

    /** Component APIs the plugin can use */
    audio = new Audio(this)
    hooks = new HooksComponent(this)
    menus = new Menus(this)
    messages = new Messages(this)
    objects = new Objects(this)
    textures = new Textures(this)
    user = new User(this)
    world = new World(this)

    /** @abstract Called on load */
    onLoad() {}

    /** @abstract Called on unload */
    onUnload() {}

    /** @abstract Called on all instances when you call `this.messages.send()`. */
    onMessage(msg, fromID) {}

    /** @abstract Called on all instances when you call `this.messages.request()`. The first instance with a truthy return value is used as the response. */
    onRequest(msg, fromID) {}

    /** @abstract Called when the user's position moves */
    onUserMoved(x, y, z) {}

    /** @abstract Called when the user's profile data is updated */
    onCurrentUserUpdated() {}

    /** Get configuration field */
    getField(name) {
        return Server.dimension.data['plugin:' + this.id + ':' + name]
    }

}
