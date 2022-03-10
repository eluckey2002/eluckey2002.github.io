


export default class BringToMePlugin extends BasePlugin {
    /** Plugin info */
    static id = "bring-to-me"
    static name = "Bring To Me"
    static description = "Enables ability to bring all users or a subset of users to an admin's location"

    /** Called when plugin is loaded */
    onLoad() {
        // Register a menu item
        this.menus.register({
            text: 'Bring To Me',
            icon: require('./bring_all.svg'),
            section: 'admin-panel',
            adminOnly: true,
            panel: {
                component: props => <MainMenu plugin={this} {...props} />
            }
        })

        this.menus.register({
            section: 'usermenu',
            order: 2,
            title: 'Bring user to me',
            icon: require('./bring_all.svg'),
            text: 'Bring user to me',
            currentUser: false,
            otherUsers: true,
            adminOnly: true,
            action: user => {this.bringUserToMe(user)}
        })

        MessageManager.addMessageListener("bringToMe.getOnlineUsers", (data, fromID) => {
            
            // Stop if message is received from yourself
            if (Users.userID == fromID) {
                return
            }

            // Stop if user is not in same space
            if (data.spaceID != Server.spaceID) {
                return
            }

            if (data.type == 'everyone') {
                // Anyone who recieves broadcast, then send message back
                return MessageManager.sendMessage("bringToMe.foundOnlineUser:" + data.requestID, {}, fromID)                
            } 
            else if (data.type == 'group') {
                // Anyone who is a group member, then send message back
                if (data.memberIDs.includes(Users.userID)) {
                    return MessageManager.sendMessage("bringToMe.foundOnlineUser:" + data.requestID, {}, fromID)                
                }
            } 
            else {
                // If user is specifically selected user, then send message back
                if (Users.userID == data.userID) {
                    return MessageManager.sendMessage("bringToMe.foundOnlineUser:" + data.requestID, {}, fromID)                
                }
            }
           
        })

    }

    /** Bring all online users to me */
    async bringEveryoneToMe() {
        // Confirm with the user
        let { value } = await Swal.fire({
            title: `Are you sure?`,
            text: 'This will bring every user in this space to your location.',
            icon: 'question',
            showCancelButton: true,
            confirmButtonColor: '3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Confirm'
        })

        // Stop if they said no
        if (!value) {
            return
        }

        // Generate unique ID
        let requestID = uuidv4()
        // Create list of taken positions
        let userPositions = []

        // Temporary listener, is called when users respond to broadcast
        MessageManager.addMessageListener("bringToMe.foundOnlineUser:" + requestID,  (data, fromID) => {
            
            // Get untaken position for avatar to move to
            let position = this.getNewPosition(userPositions)
            let x = position.x
            let y = position.y
            let h = position.h

            // Add position to list of taken positions
            userPositions.push({x, y})
            
            // Move avatar to new position
            MessageManager.sendMessage('position:set', { x, y, h }, fromID)

        })

        // Broadcast to all users
        MessageManager.sendMessage("bringToMe.getOnlineUsers", { type: 'everyone', requestID: requestID, spaceID: Server.spaceID  }, "global")

        // Wait 30 seconds for the process to finish (no need to inform the user)
        await new Promise(c => setTimeout(c, 30000))

        // Clean up
        MessageManager.removeMessageListener("bringToMe.foundOnlineUser:" + requestID)
        
    }

    /** Bring a specific group to me */
    async bringGroupToMe(members) {
        
        // Confirm with the user
        let { value } = await Swal.fire({
            title: `Are you sure?`,
            text: "This will bring all group members in this space to your location.",
            icon: 'question',
            showCancelButton: true,
            confirmButtonColor: '3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Confirm'
        })

        // Stop if they said no
        if (!value) {
            return
        }

        // Get just the user ID of all group members
        let memberIDs = []
        for (let member of members) {
            memberIDs.push(member.fbObject.id)
        }

        // Generate unique ID
        let requestID = uuidv4()
        // Create list of taken positions
        let userPositions = []

        // Temporary listener, is called when users respond to broadcasr
        MessageManager.addMessageListener("bringToMe.foundOnlineUser:" + requestID,  (data, fromID) => {
            
            // Get untaken position for avatar to move to
            let position = this.getNewPosition(userPositions)
            let x = position.x
            let y = position.y
            let h = position.h

            // Add position to list of taken positions
            userPositions.push({x, y})
            
            // Move avatar to new position
            MessageManager.sendMessage('position:set', { x, y, h }, fromID)

        })

        // Broadcast to all users
        MessageManager.sendMessage("bringToMe.getOnlineUsers", { type: 'group', requestID: requestID, memberIDs: memberIDs, spaceID: Server.spaceID  }, "global")

        // Wait 30 seconds for the process to finish (no need to inform the user)
        await new Promise(c => setTimeout(c, 30000))

        // Clean up
        MessageManager.removeMessageListener("bringToMe.foundOnlineUser:" + requestID)
        
    }

    /** Bring a specific user to me */
    async bringUserToMe(user) {
         
        // Confirm with the user
        let { value } = await Swal.fire({
            title: `Are you sure?`,
            text: "This will bring this user to your location",
            icon: 'question',
            showCancelButton: true,
            confirmButtonColor: '3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Confirm'
        })

        // Stop if they said no
        if (!value) {
            return
        }

        // Create array storing user's ID (same format as groups)
        let memberIDs = []
        memberIDs.push(user.fbObject.id)

        // Generate unique ID
        let requestID = uuidv4()
        // Create list of taken positions
        let userPositions = []

        // Temporary listener, is called when users respond to broadcasr
        MessageManager.addMessageListener("bringToMe.foundOnlineUser:" + requestID,  (data, fromID) => {
            
            // Get untaken position for avatar to move to
            let position = this.getNewPosition(userPositions)
            let x = position.x
            let y = position.y
            let h = position.h

            // Add position to list of taken positions
            userPositions.push({x, y})
            
            // Move avatar to new position
            MessageManager.sendMessage('position:set', { x, y, h }, fromID)

        })

        // Check if user is online and in same space
        MessageManager.sendMessage("bringToMe.getOnlineUsers", { type: 'user', requestID: requestID, userID: user.fbObject.id, spaceID: Server.spaceID  }, user.fbObject.id)

        // Wait 30 seconds for the process to finish (no need to inform the user)
        await new Promise(c => setTimeout(c, 30000))

        // Clean up
        MessageManager.removeMessageListener("bringToMe.foundOnlineUser:" + requestID)
          
    }

    getNewPosition(positions) {

        // Function to check if a position is taken
        let isPositionTaken = (x, y) => {
            // Check distance between all points
            for (let point of positions) {
                // Calculate distance
                let distance = Math.sqrt((point.x - x) ** 2 + (point.y - y) ** 2)
                if (distance < 2) {
                    return true
                }
            }

            // Not taken
            return false
        }

        // If there arent any existing positions, initialize values
        if(positions.length == 0) {
            this.offsetAngle = 0
            this.radius = 3
        }

        // Find new position for avatar to move to
        while(true) {
            
            this.offsetAngle += 1
            if (this.offsetAngle >= 360) {
                this.offsetAngle = 0
                this.radius += 0.5
            }

            // Get position
            let x = Map3D.main.source.userAvatar.container.position.x + this.radius * Math.cos(this.offsetAngle * Math.PI / 180)
            let y = Map3D.main.source.userAvatar.container.position.z + this.radius * Math.sin(this.offsetAngle * Math.PI / 180)

            if (isPositionTaken(x, y)) {
                continue
            }
            else {
                // Calculate height to use, by raytracing down from this point
                if (!this.v3a) this.v3a = new Vector3()
                if (!this.v3b) this.v3b = new Vector3()

                this.v3a.set(x, Map3D.main.source.userAvatar.properties.height + 50, y) // <-- Position
                this.v3b.set(0, -1, 0)                                                  // <-- Direction

                let hits = Map3D.main.physics.raytrace(this.v3a, this.v3b, 100)
                let h = hits[0]?.point?.y || Map3D.main.source.userAvatar.properties.height || 0

                let position = {x, y, h}
                return position
            }
        }
 
    }

}
