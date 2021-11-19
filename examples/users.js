import firebase from "firebase/app"
import EventEmitter from './utilities/EventEmitter'
import Server from "./Server"
import Analytics from "./utilities/Analytics"
import UndoManager from "./UndoManager"
import jwt_decoder from "jwt-decode";
import Grid, { Cell } from "./utilities/Grid"
import FirebaseUtils, { FirestoreAggregator } from "./utilities/FirebaseUtils"
import constants from "./constants"
import Map3D from "./Map3D"

const hostName = window.location.host;

// When running normally, autodetect the domain:
const vatomIncBaseUrl = hostName.includes("spatialweb.cc") ? "https://id.vatominc.cc" : hostName.includes("spatialweb.cool") ? "https://id.vatominc.cool" : "https://id.vatominc.com";
const vatomIncEventsUrl = hostName.includes("spatialweb.cc") ? "https://events.api.vatominc.cc" : hostName.includes("spatialweb.cool") ? "https://events.api.vatominc.cool" : "https://events.api.vatominc.com";
const vatomIncBillingUrl = hostName.includes("spatialweb.cc") ? "https://billing.api.vatominc.cc" : hostName.includes("spatialweb.cool") ? "https://billing.api.vatominc.cool" : "https://billing.api.vatominc.com";
const vatomIncClientId = hostName.includes("spatialweb.cc") ? "i9JbYBQHWS0LjHoe8ckhz" : hostName.includes("spatialweb.cool") ? "g8XPzf9r9s44oP7piuLR_" : "3H5qpyiQu9";
const storageKey = `oidc.user:${vatomIncBaseUrl}:${vatomIncClientId}`;
const vatomIncEnvironment = hostName.includes("spatialweb.cc") ? "test" : hostName.includes("spatialweb.cool") ? "development" : "production";

// When running the events API server locally. Make sure to use spatialweb.cool/@spacename?v=localhost when entering a space this way.
// const vatomIncBaseUrl = 'https://id.vatominc.cool'
// const vatomIncEventsUrl = 'http://localhost:3001'
// const vatomIncClientId = 'g8XPzf9r9s44oP7piuLR_'
// const storageKey = `oidc.user:${vatomIncBaseUrl}:${vatomIncClientId}`;
// const vatomIncEnvironment = 'development'

/**
 * User manager, manages the current user's session in Firebase and stores a list of other online users.
 *
 * @event updated Called when anything changes.
 * @event currentUser.updated Called when the current user's profile data changes.
 */
export default new class Users extends EventEmitter {

    /** Current Firebase user ID */
    userID = null

    /** User's document object */
    currentUser = {}

    /** Users who are connected to this server, or who have recently connected */
    all = []

    /** True if the current user is the owner */
    isOwner = false

    /** True if the current user is an admin */
    isAdmin = false

    /** True if the current user is a guide */
    isGuide = false

    /** True if the user is a guest (anonymous) user */
    isGuest = true

    /** True if the user list has been fetched */
    hasFetchedUsers = false

    /** Users current raised hand status */
    raisedHandStatus = null

    /** True when the entry animation is complete */
    entryAnimationFinished = false

    /** The grid for determining which user zones to load */
    userZoneGrid = null

    /** Current user's display name */
    get displayName() {
        return this.currentUser?.name || this.currentUser?.auto_name || "Guest"
    }

    /** Current user's private data */
    privateData = {}

    /**
     * Manages history of actions this user applied to allow for undo and redo.
     * @type UndoManager
     */
    undoManager = null

    /** Expose the vatomInc details to other classes */
    vatomIncBaseUrl = vatomIncBaseUrl
    vatomIncEventsUrl = vatomIncEventsUrl
    vatomIncBillingUrl = vatomIncBillingUrl
    vatomIncClientId = vatomIncClientId
    vatomIncStorageKey = storageKey
    vatomIncEnvironment = vatomIncEnvironment

    /** @deprecated No longer necessary since everything is done during login and after login now. */
    setup() {}

    /** Stop listeners and clear current user data */
    stop() {

        this.all = []
        this.dbAggregate?.removeAllSources()
        this.dbAggregate = null
        this.userZoneGrid?.stop()
        this.userZoneGrid = null
        this.hasDoneAfterLoginSetup = false

    }

    /** @private Compare two versions of the same user's object to see if it's changed */
    checkUserHasChanged(newUser, existingUser) {

        // First, ensure that the fields are correct
        newUser.user_id = newUser.id

        // Stop if there was no existing user
        if (!existingUser)
            return true

        // Check if changed based on modified date
        if (newUser.lastModified && !existingUser.lastModified) return true
        if (newUser.lastModified > existingUser.lastModified) return true
        if (newUser.lastModified < existingUser.lastModified) return false

        // Check if new user has a name while the old one doesn't ... this is to fix an odd bug where some fields are only loaded later
        if (newUser.lastModified == existingUser.lastModified && newUser.name && !existingUser.name)
            return true

        // Unchanged
        return false

    }

    /** Wait until the user data has loaded */
    async waitUntilLoaded() {
        return this.dbAggregate?.waitForSomeData()
    }

    /** Assign the user, their space specific document and private document */
    async assignDocument(userDocument) {

        // Assign current user, their firebase document
        this.currentUser = userDocument

        this.currentUser.id = this.userID
        this.currentUser.user_id = this.userID

        console.debug(`[Users] Auth state changed! Fetching user data for our ID = ${this.userID}`)
        // Fetch private data
        let [ /* spaceSpecificDoc, */ privateDoc ] = await Promise.all([
            // firebase.firestore().collection('servers').doc(Server.serverID).collection('users').doc(this.userID).get(),
            firebase.firestore().collection('users_private').doc(this.userID).get()
        ])

        this.privateData = privateDoc.data() || {}

        this.isOwner = this.currentUser.auth == 'owner'
        this.isAdmin = this.currentUser.auth == 'owner' || this.currentUser.auth == 'admin'
        this.isGuide = !!this.currentUser.guide

        // Ensure we have a valid display name
        if (!this.currentUser.auto_name) {
            const chars = '0123456789ABCDEF'.split('')
            let name = 'Visitor '

            // Generate random username
            for (let i = 0 ; i < 4 ; i++) {
                name += chars[Math.floor(Math.random() * chars.length)]
            }

            // Store it
            this.updateUser({ auto_name: name })
        }

        // Ensure we have a valid avatar color
        if (!this.currentUser.color) {
            const chars = '0123456789ABCDEF'.split('')
            let randomColor = '#'

            // Generate random hex color
            for (let i = 0 ; i < 6 ; i++) {
                randomColor += chars[Math.floor(Math.random() * chars.length)]
            }

            // Update and store
            this.updateUser({ color: randomColor })
        }

        // Initialize undo manager
        this.undoManager = new UndoManager(this.currentUser)

        // Stop if space admin has enabled the space to override user preffered view mode
        if (Server.dimension.data.override_user_view_mode) {
            return
        }

        // Determine if we are using a mobile device based on width of device
        const useMobileDesign = window.innerWidth < constants.mobileBreakpointWidth

        if (useMobileDesign && this.currentUser.defaultViewMobile) {
            // Switch to saved mobile view mode
            Map3D.main.setControlScheme(this.currentUser.defaultViewMobile)
        }
        else if (!useMobileDesign && this.currentUser.defaultViewDesktop) {
            // Switch to saved desktop view mode
            Map3D.main.setControlScheme(this.currentUser.defaultViewDesktop)
        }

    }

    /** Login with a custom user token created by the server */
    async loginWithCustomToken(token) {

        // Log in. This should trigger onAuthStateChanged()
        await firebase.auth().signInWithCustomToken(token)
        console.debug(`[Users] Successfully logged into Firebase with a custom user token`)

        // Continue the login
        await this.afterLoginComplete()

    }

    /** @private Called after the login completes, to finish setting up listeners etc */
    async afterLoginComplete() {

        // Only do once
        if (this.hasDoneAfterLoginSetup) return
        this.hasDoneAfterLoginSetup = true

        // Store current user ID
        this.userID = firebase.auth().currentUser?.uid
        this.isGuest = !firebase.auth().currentUser || firebase.auth().currentUser?.isAnonymous

        // Stop if somehow we didn't get a user ID or the user is a guest
        if (!this.userID)
            throw new Error("We did not receive a user ID after logging in.")

        // Analytics: Identify user
        Analytics.identify(this.userID, {
            email: firebase.auth().currentUser?.email,
            emailVerified: firebase.auth().currentUser?.emailVerified,
            phoneNumber: firebase.auth().currentUser?.phoneNumber,
            isAnonymous: firebase.auth().currentUser?.isAnonymous,
        })

        // Create grid for user zones. This grid gets updated by the Map3D class.
        this.userZoneGrid?.stop()
        this.userZoneGrid = new Grid()
        this.userZoneGrid.idPrefix = 'usercell'
        this.userZoneGrid.cellSize = 40
        this.userZoneGrid.activationRange = 20
        this.userZoneGrid.createCell = e => new UserCell(this)
        this.userZoneGrid.addEventListener('user.cell.changed', this.updateZoneID.bind(this))
        this.userZoneGrid.start()

        // Create database listeners
        this.dbAggregate?.removeAllSources()
        this.dbAggregate = new FirestoreAggregator()
        this.dbAggregate.checkObjectHasChanged = this.checkUserHasChanged.bind(this)
        this.dbAggregate.addEventListener('updated', this.onUserListUpdated.bind(this))
        this.dbAggregate.addSource('owners', cb => firebase.firestore().collection("servers").doc(Server.serverID).collection("users").where('auth', '==', 'owner').onSnapshot(cb))
        this.dbAggregate.addSource('admins', cb => firebase.firestore().collection("servers").doc(Server.serverID).collection("users").where('auth', '==', 'admin').onSnapshot(cb))
        this.dbAggregate.addSource('myuser', cb => firebase.firestore().collection("servers").doc(Server.serverID).collection("users").doc(this.userID).onSnapshot(cb))

        // Wait fomr some data from the user zones
        // await this.dbAggregate.waitForSomeData()

        // Update our current zone ID in the database
        this.updateZoneID()

        // Notify updated
        this.emit('updated')
        this.emit('currentUser.updated')

        // If we're an admin, purge old guest users
        if (this.isAdmin) {
            this.purgeGuestUsers()
        }

        // If we're a bot with a name, set it now
        if (window.swAutomation?.botUserFields) {
            this.updateUser(window.swAutomation.botUserFields)
        }

    }

    /** Extract VatomInc token from the URL, if any exists */
    extractVatomIncTokenFromURL() {

        try {

            // Get token
            let search = new URLSearchParams(location.search)
            let token = search.get('token')
            if (token) {

                // Decode token
                let txt = atob(token)
                let json = JSON.parse(txt)

                // There is no way to know which environment the provided token is for... So just assume it's for our current one
                if (json.access_token) {
                    localStorage[storageKey] = txt
                    console.debug(`[Users] Successfully retrieved token from the URL.`)
                }

                // Remove token from the URL, to ensure it doesn't get out ... it's a once-off token anyway
                search.delete('token')
                window.history.replaceState({}, '', `${location.pathname}?${search}`)

            }

        } catch (err) {

            // Failed to decode token!
            console.warn("[Users] Unable to decode token from the token param in the URL: ", err)

        }

    }

    /** Get VatomInc access token information */
    async getVatomincAccessTokenObject() {

        // Fetch VatomInc access token
        let vatomincTokenObj = null

        try {
            vatomincTokenObj = JSON.parse(localStorage[storageKey])
        } catch (err) {}

        if (!vatomincTokenObj) {
            console.warn(`[Users] No VatomInc access token was found`)
            return
        }

        // Check if the token is still valid
        let vatomincAccessTokenExpiresAt = vatomincTokenObj.expires_at * 1000 || 0;
        if (vatomincAccessTokenExpiresAt < Date.now()) {

            console.debug(`[Users] Refreshing VatomInc access token...`)
            let response = await fetch(`${vatomIncBaseUrl}/token`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                body: `grant_type=refresh_token&client_id=${vatomIncClientId}&refresh_token=${encodeURIComponent(vatomincTokenObj.refresh_token)}`
            })

            // Parse response
            let json = await response.json()

            // Stop on error
            if (!response.ok || json.error) {

                const errorMessage = json.error_description || json.error || (response.status + ' ' + response.statusText)
                if (errorMessage.includes("grant request is invalid")) {
                    // Delete the token in local storage since it is invalid
                    localStorage.removeItem(storageKey)
                    if (window.location.pathname.startsWith("/@")) {
                        // Refresh
                        window.location.reload()
                        return
                    }
                }
                throw new Error(`Unable to refresh your user access token. Please try logging in again. Error: ${errorMessage}`)
            }

            // Store it
            vatomincAccessTokenExpiresAt = Date.now() + (json.expires_in * 1000 || 60000)  // If not defined, assume 60 seconds
            json.expires_at = vatomincAccessTokenExpiresAt / 1000

            // Save token back into local storage
            try {
                localStorage[storageKey] = JSON.stringify({
                    ...vatomincTokenObj,
                    ...json,
                })
            } catch (err) {
                console.warn(`[Users] Unable to save new access token to local storage.`, err)
            }
            return json.access_token;
        }

        return vatomincTokenObj;

    }

    /** The VatomInc access token */
    async getVatomincAccessToken() {

        let obj = await this.getVatomincAccessTokenObject()
        return obj?.access_token

    }

    /**
     * Decodes a JWT token.
     * @param {object} token Access token from OTP response.
     * @returns JSON object of decoded JWT token.
     */
    decodeJWT(token) {
        return jwt_decoder(token);
    }

    /**
     * Calls the VatomInc API with the specified base.
     * @param {string} base The base URL to use.
     * @param {string} method The HTTP method to request with.
     * @param {string} endpoint The endpoint to request.
     * @param {object=} body Optional. Sent in the body of the request.
     */
    async callAPI(base, method, endpoint, body) {
        // Get token information
        let vatomincToken = await this.getVatomincAccessTokenObject();

        // Call API
        let response = await fetch(`${base}${endpoint}`, {
            method: method,
            headers: {
                'Authorization': `Bearer ${vatomincToken.access_token}`,
                'Content-Type': 'application/json'
            },
            body: body ? JSON.stringify(body) : null
        });

        // Parse response
        let json = await response.json();

        // Check for error
        if (json.error_description || json.error) {
            throw new Error(json.error_description || json.error);
        }

        // Return response as JSON
        return json;
    }

    /** Call a VatomInc API */
    async callVatomIncAPI(method, endpoint, body) {
        return this.callAPI(vatomIncBaseUrl, method, endpoint, body);
    }

    /** Call a VatomInc events API */
    async callVatomIncEventsAPI(method, endpoint, body) {
        return this.callAPI(vatomIncEventsUrl, method, endpoint, body);
    }

    /** Call a VatomInc billing API */
    async callVatomIncBillingAPI(method, endpoint, body) {
        return this.callAPI(vatomIncBillingUrl, method, endpoint, body);
    }

    /** Refresh JWT claims */
    async refreshClaims() {

        // Call cloud function
        await firebase.functions().httpsCallable('updateClaims')({
            serverID: Server.serverID
        })

        // Force a token refresh
        let response = await firebase.auth().currentUser?.getIdTokenResult(true)
        this.claims = response.claims
        return this.claims

    }

    /** Modify fields on the current user's document */
    async updateUser(changes) {

        // Delete dangerous fields
        // ...

        // Insert extra fields
        changes.last_access = new Date()
        changes.lastModified = Date.now()

        // Modify our local copy immediately
        Object.assign(this.currentUser, changes)

        // Update user assigned to undo manager
        if (this.undoManager) {
            this.undoManager.setUser(this.currentUser)
        }

        // Do the update to the space-specific user object
        await firebase.firestore().collection("servers").doc(Server.serverID).collection("users").doc(this.userID).set(changes, { merge: true })

        // Copy changes into the shared public document as well, without space-specific fields
        delete changes['id']
        delete changes['auth']
        delete changes['status']
        delete changes['user_role']
        delete changes['forced_mute']
        delete changes['conference_id']
        delete changes['hosted_conference']
        delete changes['ban_end']
        for (let fieldName of Object.keys(changes))
            if (fieldName.startsWith('space:'))
                delete changes[fieldName]

        await firebase.firestore().collection("users_public").doc(this.userID).set(changes, { merge: true })

        // Check if VatomInc profile data should be updated
        if (await this.getVatomincAccessToken()) {
            if (changes.name) this.updateVatomIncProfile({ name: changes.name })
            if (changes.email) this.updateVatomIncProfile({ email: changes.email })
            if (changes.phone) this.updateVatomIncProfile({ phone: changes.phone })
            if (changes.company_name) this.updateVatomIncProfile({ company_name: changes.company_name })
            if (changes.job_title) this.updateVatomIncProfile({ job_title: changes.job_title })
            if (changes.website) this.updateVatomIncProfile({ website: changes.website })
            if (changes.linkedin) this.updateVatomIncProfile({ linkedin: changes.linkedin })
            if (changes.bio) this.updateVatomIncProfile({ bio: changes.bio })
            if (changes.profile_url) this.updateVatomIncProfile({ picture: changes.profile_url })
        }

        // Call the server to update our keywords
        if (changes.name)
            this.updateSearchTerms()

        // Notify listeners
        this.emit('updated')
        this.emit('currentUser.updated')

    }

    /** Updates our user's search terms on the server. */
    updateSearchTerms() {

        // Stop if no name
        if (!this.currentUser?.name)
            return

        // Send request
        firebase.functions().httpsCallable('userSearchUpdateKeywords')({
            text: this.currentUser.name,
            group: Server.dimension.data.world_group_id || Server.serverID
        }).catch(err => console.error(`[Users] Unable to update our user's search keys: ${err.message}`))

    }

    /** Modify the user's private data */
    async updatePrivate(changes) {

        // Merge changes locally
        Object.assign(this.privateData, changes)

        // Do update
        await firebase.firestore().collection("users_private").doc(this.userID).set(changes, { merge: true })

        // We don't monitor this property through Firebase, so trigger updates manually
        this.emit('updated')
        this.emit('currentUser.updated')

    }

    /** @private Update VatomInc profile data */
    async updateVatomIncProfile(changes) {

        // Refresh access token
        // await this.refreshVatomIncAccessToken()

        // Send request
        let res = await fetch(`${vatomIncBaseUrl}/me`, {
            method: 'PATCH',
            headers: {
                'Authorization': 'Bearer ' + await this.getVatomincAccessToken(),
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(changes)
        })

        // Check for error
        if (!res.ok) {
            console.error("Failed to update VatomInc profile data. Error " + res.status)
        } else {
            const profile = await res.json();

            // Update localStorage
            try {
                const storageKey = `oidc.user:${vatomIncBaseUrl}:${vatomIncClientId}`;
                const vatomincTokenObj = JSON.parse(localStorage[storageKey])
                localStorage[storageKey] = JSON.stringify({
                    ...vatomincTokenObj,
                    profile,
                })
            } catch (err) {
                console.warn(`[Users] Unable to update local storage with user profile.`, err)
            }
        }
    }

    /** Modify fields on another user's document. Admins only. */
    async set(userid, changes) {

        // If this user is a local simulated bot, stop
        if (userid.startsWith('simuser:'))
            return

        // Delete dangerous fields
        // ...

        // Do update - will be blocked by Firestore security rules if the user is not an admin
        changes.lastModified = Date.now()
        await firebase.firestore().collection("servers").doc(Server.serverID).collection("users").doc(userid).set(changes, { merge: true })

    }

    /** @private Updates the zone ID in the database. */
    updateZoneID() {

        // Check if we have a user ID and it is loaded from the server
        if (!this.currentUser?.user_id)
            return

        // Check if we have a cell ID
        let cellID = this.userZoneGrid?.userCell?.id
        if (!cellID)
            return

        // Check if it hasn't changed
        let search_group = Server.dimension.data.world_group_id || Server.serverID
        if (this.currentUser.location_zone_id == cellID && this.currentUser.search_group == search_group)
            return

        // Update it
        console.debug(`[Users] Updating our current zone ID: ${cellID}`)
        this.updateUser({ location_zone_id: cellID, search_group })

    }

    /** @private Called when the list of users on this server changes. This is called by dbAggregator. */
    onUserListUpdated(items) {

        // Store new list of users
        this.all = items || this.all

        // Add bot users
        if (this.bots)
            this.all = this.all.concat(this.bots)

        // Check if we have updates for our own user
        let lastCurrentUserModified = this.currentUser?.lastModified
        let currentUser = this.all.find(u => u.id == this.userID)
        if (currentUser) {
            this.currentUser = currentUser
            this.isOwner = this.currentUser.auth == 'owner'
            this.isAdmin = this.currentUser.auth == 'owner' || this.currentUser.auth == 'admin'
            this.isGuide = !!this.currentUser.guide
        }

        // Emit updated event
        this.emit('updated')

        // Emit current user updated event if needed
        if (this.currentUser.lastModified != lastCurrentUserModified)
            this.emit('currentUser.updated')

        // Stop if no user yet
        if (!this.userID)
            return

        // Update our current zone ID in the database
        this.updateZoneID()

    }

    /** Called to add bot users */
    setBots(bots) {
        this.bots = bots
        this.onUserListUpdated(null)
    }

    /** Claim ownership of this server. Can only be done once. */
    async claimOwner() {

        // Ensure the current user is not a guest user
        if (this.isGuest)
            throw new Error("Please log in first, by refreshing the page and then selecting the user icon in the top-right.")

        // Run the command
        return await firebase.functions().httpsCallable('claimOwner')({ instance: Server.serverID })

    }

    /** Get user object for the specified user ID */
    getUserInfo(id) {
        return this.all.find(u => u.id == id)
    }

    /**
     * Purge guest users from the system
     *
     * @param {boolean} simulate If true, will not actually delete anything.
     * @param {number} fromDate Purge users older than this date. Defaults to 24 hours ago.
     * @param {bool} botsOnly If true, will only purge bot users.
     * @returns {int} Number of users deleted, or to be deleted if 'simulate' is true.
     */
    async purgeGuestUsers(simulate = false, fromDate = Date.now() - 1000*60*60*24, botsOnly = false) {

        // Fetch users to purge
        let snap = await firebase.firestore().collection('servers').doc(Server.serverID).collection('users').limit(5000).get()

        // Find all guest users who are expired
        let toPurge = snap.docs.filter(doc => {

            // Skip if user is not a guest
            let user = doc.data()
            if (user.auth && user.auth != 'guest')
                return false

            // Skip if this user has a role
            if (user.user_role)
                return false

            // Skip if bots only and this user is not a bot
            if (botsOnly && !user.is_bot)
                return false

            // Skip if date is soon
            let lastModified = user.lastModified || 0
            if (lastModified > fromDate)
                return false

            // Yes, purge this user
            return true

        })

        // Purge them all
        if (!simulate && toPurge.length > 0) {
            console.debug(`[Users] Admin is purging ${toPurge.length} old guest users`)
            for (let doc of toPurge)
               doc.ref.delete()
        }

        // Return count
        return toPurge.length

    }

    /** Manually query a single user ID and add that user into the user DB cache. */
    async addUserToCache(userID) {

        try {
            await this.dbAggregate?.addCacheDocument(userID, e => firebase.firestore().collection("servers").doc(Server.serverID).collection("users").doc(userID).get())
            console.debug(`[Users] Added user ID ${userID} to the cache`)
        } catch (err) {
            console.warn(`[Users] Unable to cache user ID ${userID}: ${err.message}`, err)
        }

    }

}

/**
 * Represents a single zone in the user grid.
 */
class UserCell extends Cell {

    /** Constructor */
    constructor(users) {
        super()

        // Store reference back to the Users class
        this.users = users

    }

    /** Called on load */
    onLoad() {

        // Start listener for this region
        console.debug(`[Users] Starting listener for zone: ${this.id}`)
        this.users.dbAggregate?.addSource(this.id, cb => firebase.firestore().collection("servers").doc(Server.serverID).collection("users").where('location_zone_id', '==', this.id).onSnapshot(cb))

    }

    /** Called on unload */
    onUnload() {

        // Remove listener
        console.debug(`[Users] Removing listener for zone: ${this.id}`)
        this.users.dbAggregate?.removeSource(this.id)

    }

}
