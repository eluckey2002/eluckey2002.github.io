import React from 'react'
import JSFileManager from 'js-file-manager'

import { Loader } from '../../../../extensions/Utils'
import BasePlugin from '../../BasePlugin'
import Users from '../../../Users'
import Map3D from '../../../Map3D'
import Swal from 'sweetalert2'
import Server from '../../../Server'
import { Button, Checkbox, Field, Input, ScrollContainer, AccordionHeader, PositionVector3D } from '../../../ui/PanelComponents'
import MapControlsTopDown from '../../../Map3D/MapControlsTopDown'
import Storage from '../../../Storage'
import Analytics from '../../../utilities/Analytics'
import constants from '../../../constants'
import BrowserUtils from '../../../utilities/BrowserUtils'
import Timer from '../../../utilities/Timer'

/** Displays a list of users on the server */
export default class AgendaPlugin extends BasePlugin {

    /** Plugin info */
    static id = "agenda"
    static name = "Agenda"
    static description = "Allows an admin to set up places and display their information."

    /** Called on start */
    onLoad() {

        // Register a menu item
        this.menus.register({
            icon: require('./agenda.svg'),
            text: 'Agenda',
            section: 'controls',
            order: 0,
            inAccordion: true,
            panel: {
                component: AgendaPanel
            }
        })

    }
}

class AgendaPanel extends React.PureComponent {

    /** Initial state */
    state = {
        selectedPlaces: null
    }

    /** Render UI */
    render() {

        // Render a specific place information when place is selected, otherwise
        // render list of places
        if (this.state.selectedPlaces) {
            return this.renderPlaces()
        } else {
            return this.renderList()
        }

    }

    /** @private Render the place list UI */
    renderList() {

        let agenda = Server.dimension.data.places || []

        // Sort places
        agenda = agenda.sort((a, b) => {
            // Sort by name
            if (a.startAt && b.startAt) {
                return a.startAt.localeCompare(b.startAt)
            }
        })

        let image = Server.dimension.data.minimap_image || null

        // Render UI
        return <>

            {/* Header bar */}
            <AccordionHeader title='Agenda' buttonLayout='close' show={this.props.show} sticky={true} onClickClose={e => this.props.onClose()} onClickChevron={e => this.props.onChevron()} />

            {/* Show or hide plugin content */}
            { !this.props.show
                ? null
                : <>
                    {/* Container area for minimap*/}
                    <ScrollContainer style={{ display: 'flex', flexDirection: 'column' }}>
                        <div id="minimap" style={{ position: 'relative', display: 'flex', top: 0, left: 0, width: "100%", height: 240, zIndex: 1, cursor: 'pointer' }}>
                            <img width='100%' height='100%' src={image} ismap='true' onClick={e => { this.clickedMiniMap(e) }}></img>
                        </div>

                        {/* Header bar */}
                        <div style={{ position: 'relative', width: '100%', height: 44, zIndex: 2, background: 'rgba(0, 0, 0, 0.3)', boxShadow: '0px 1px 4px rgba(0, 0, 0, 0.25)', display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                            <div style={{ textAlign: 'center', fontSize: 17, fontWeight: 'bold', color: Server.dimension.data.fieldColor }}>Schedule</div>
                        </div>

                        {/* Container area */}
                        <ScrollContainer>

                            <div style={{ height: 5 }} />

                            {/* Show each user */}
                            { Users.isAdmin
                                ? agenda.map(event => <AgendaRow key={event.key} event={event} onClick={e => this.setState({ selectedPlaces: event })} />)
                                : agenda.map(event => <AgendaRow key={event.key} event={event} onClick={e => this.goToPlaces(event)} />)
                            }

                            <div style={{ height: 5 }} />

                            {/* Add new agenda item */}
                            { Users.isAdmin ? <Button title="Add Agenda Item" onClick={e => this.addPlaces()} /> : null }
                            { Users.isAdmin ? <Button title="Take Minimap Screenshot" onClick={e => this.updateMiniMap()} /> : null }
                            { Users.isAdmin ? <Button title="Upload Minimap Image" onClick={e => this.uploadMiniMap()} /> : null }

                        </ScrollContainer>
                    </ScrollContainer>
                </>
            }

        </>
    }

    /** @private Render a single user UI */
    renderPlaces() {
        // Check status
        let place = this.state.selectedPlaces
        let currentDate = new Date()

        // Update information
        place.name = this.state.selectedPlaces.name || ""
        place.description = this.state.selectedPlaces.description || ""
        place.home_position = this.state.selectedPlaces.home_position || { x: 0, y: 0 }
        place.displayName = this.state.selectedPlaces.displayName || ""
        place.startAt = this.state.selectedPlaces.startAt || null
        place.endAt = this.state.selectedPlaces.endAt || null

        let isSafari = BrowserUtils.isSafari()

        // Render UI
        return <>

            {/* Header bar */}
            <AccordionHeader title='Agenda' buttonLayout='close' show={this.props.show} sticky={true} onClickClose={e => this.props.onClose()} onClickChevron={e => this.props.onChevron()} />

            {/* Show or hide plugin content */}
            { !this.props.show
                ? null
                : <>
                    <AccordionHeader title='Information' buttonLayout='back' sticky={true} top={constants.panelHeaderHeight} onClickBack={e => this.setState({ selectedPlaces: null })} />

                    {/* Container area */}
                    <ScrollContainer>

                        {/* Name and status */}
                        <div style={{ height: 10 }} />

                        <Field name='Presenter' otherWidth='45%' help='Person who will be presenting. Name should be at least one character in length.'>
                            <Input type='text' value={place.displayName} onValue={v => v.trim().length > 0 ? this.updatePlaces(place, "displayName", { displayName: v }) : Swal.fire('Invalid Name', 'Please enter a name that is at least one character in length.', 'warning')} help='Person who will be presenting. Name should be at least one character in length.' />
                        </Field>

                        <Field name='Description' otherWidth='45%' help='Description of the event.'>
                            <Input value={place.description} onValue={v => this.updatePlaces(place, "description", { description: v })} help='Description of the event.' />
                        </Field>

                        {/* Set Event start and end times */}
                        { isSafari
                            ? <Field name='Start Time (UTC)' otherWidth='45%' help='Start time for the event.'>
                                <Input placeholder="YYYY-MM-DDTHH:MM" value={place.startAt|| currentDate.toISOString().substring(0,16)} onValue={v => this.updatePlaces(place, "startAt", { startAt: v.target.value })} help='Start time for the event.' />
                              </Field>
                            : <Field name='Start Time (UTC)' otherWidth='45%' help='Start time for the event.'>
                                <input style={{ width: 130 }} type="datetime-local" value={place.startAt || ''} onChange={v => this.updatePlaces(place, "startAt", { startAt: v.target.value })} />
                              </Field>
                        }

                        { isSafari
                            ? <Field name='End Time (UTC)' otherWidth='45%' help='End time for the event.'>
                                <Input placeholder="YYYY-MM-DDTHH:MM" value={place.endAt || currentDate.toISOString().substring(0,16)} onValue={v => this.updatePlaces(place, "endAt", { endAt: v.target.value })} help='End time for the event.' />
                              </Field>
                            : <Field name='End Time (UTC)' otherWidth='45%' help='End time for the event.'>
                                <input style={{ width: 130 }} type="datetime-local" value={place.endAt|| ''} onChange={v => this.updatePlaces(place, "endAt", { endAt: v.target.value })} />
                              </Field>
                        }

                        <Field name='Set Event as Active' otherWidth='45%' help='When enabled, this event will show up as currently active.'>
                            <Checkbox on={place.active_event} onToggle={v => this.updatePlaces(place, "activeEvent", { active_event: v })} />
                        </Field>

                        {/* Entry point */}
                        <Field name='Position' otherWidth='45%'>
                            <PositionVector3D
                                valueX={place.start_x} onValueX={v => this.updatePlaces(place, "startX", { start_x: v })}
                                valueY={place.start_y} onValueY={v => this.updatePlaces(place, "startY", { start_y: v })}
                                valueZ={place.start_z} onValueZ={v => this.updatePlaces(place, "startZ", { start_z: v })}
                            />
                        </Field>

                        { Users.isAdmin
                            ? <Button title="Set Current Position as Event Area" onClick={e => this.updatePlaces(place, "home", null)} />
                            : null
                        }

                        <Field name='Focus Position' otherWidth='45%'>
                            <PositionVector3D
                                valueX={place.lookstart_x} onValueX={v => this.updatePlaces(place, "lookStartX", { lookstart_x: v })}
                                valueY={place.lookstart_y} onValueY={v => this.updatePlaces(place, "lookStartY", { lookstart_y: v })}
                                valueZ={place.lookstart_z} onValueZ={v => this.updatePlaces(place, "lookStartZ", { lookstart_z: v })}
                            />
                        </Field>

                        { Users.isAdmin
                            ? <Button title="Set Current Position as Focus" onClick={e => this.updatePlaces(place, "lookat", null)} />
                            : null
                        }

                        <Field name='Spread Radius' otherWidth='45%' help='Radius size to spread out avatars on arrival.'>
                            <Input value={place.start_radius} onValue={v => this.updatePlaces(place, "startRadius", { start_radius: parseFloat(v) || 0 })} help='Radius size to spread out avatars on arrival.' />
                        </Field>
                        <Field name='Orientation' otherWidth='45%' help='Rotation in degrees.'>
                            <Input value={place.start_orientation} onValue={v => this.updatePlaces(place, "startOrientation", { start_orientation: parseFloat(v) || 0 })} help='Rotation in degrees.' />
                        </Field>
                        <Field name='Zoom' otherWidth='45%' help='Zoom distance (in meters).'>
                            <Input value={place.start_height} onValue={v => this.updatePlaces(place, "startHeight", { start_height: parseFloat(v) || 0 })} help='Zoom distance (in meters).' />
                        </Field>
                        <Field name='Tilt' otherWidth='45%' help='Tilt angle (in degrees).'>
                            <Input value={place.start_tilt} onValue={v => this.updatePlaces(place, "startTilt", { start_tilt: parseFloat(v) || 0 })} help='Tilt angle (in degrees).' />
                        </Field>

                        {/* Buttons */}
                        <div style={{ height: 5 }} />
                        { Users.isAdmin
                            ? <Button title="Remove Agenda Item" onClick={e => this.removePlaces(place)} />
                            : null
                        }
                        <Button title="Go To Event" onClick={e => this.goToPlaces(place)} />

                    </ScrollContainer>
                </>
            }
        </>

    }

    /** Called on component mount */
    componentDidMount() {

        // Start update timer ... since everything is changing constantly anyway, using a timer should be fine...
        this.timer = Timer.setInterval(this.forceUpdate.bind(this), 2000)
        Users.addEventListener('updated', this.didUpdate)

    }

    /** Called on component remove */
    componentWillUnmount() {

        // Remove timer
        Timer.clearInterval(this.timer)
        Users.removeEventListener('updated', this.didUpdate)

    }

    /** @private Called on update */
    didUpdate = e => this.forceUpdate()

    /** @private Set a property on a user */
    @Loader async goToPlaces(place) {

        heap.track('goToAgendaItem', {agendaItem: place})
        Analytics.track('goToAgendaItem', {agendaItem: place})

        if (!place.active_event) {
            if (!place.endAt || !place.startAt)
                return
        }

        if (!place.home_position)
            return

        let endDate= new Date(place.endAt?.replace(/\s+/g, 'T')+'Z')
        let startDate= new Date(place.startAt?.replace(/\s+/g, 'T')+'Z')
        let currentDate = new Date()

        let home = null
        let lookat = null

        home = {
            x: place.home_position.x,
            y: place.home_position.y,
            z: place.home_position.z || 0
        }

        if (place.lookat_position) {
            lookat = {
                x: place.lookat_position.x,
                y: place.lookat_position.y,
                z: place.lookat_position.z || 0
            }
        }

        // Only go if event is active
        if ((currentDate.getTime() >= startDate.getTime() && currentDate.getTime() <= endDate.getTime()) || place.active_event) {
            Swal.fire({
                title: 'Go to event',
                text: 'Are you sure you want to travel to the event?',
                icon: 'info',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: "Yes",
                cancelButtonText: "No",
                reverseButtons: true
            }).then((result) => {
                if (result.value) {
                    // Set View
                    Map3D.main.controls.remove()
                    //document.exitPointerLock();
                    Map3D.main.previousControlMode = Map3D.main.currentControlMode
                    var euler = new THREE.Euler( 0, 0, 0, 'YXZ' );
                    euler.setFromQuaternion( Map3D.main.cameraContainer.quaternion );
                    localStorage['camera.fov'] = Map3D.main.camera.fov
                    localStorage['cameraContainer.rotation.x'] = Map3D.main.cameraContainer.quaternion._x * Math.PI
                    localStorage['cameraContainer.rotation.y'] = euler._y
                    localStorage['cameraContainer.rotation.z'] = Map3D.main.cameraContainer.rotation._z
                    localStorage['cameraContainer.position.x'] = Map3D.main.cameraContainer.position.x

                    // Apply new control system
                    Map3D.main.controls = new MapControlsTopDown(Map3D.main, true)

                    // Apply home tilt if any
                    if (typeof place.start_tilt == "number" && Map3D.main.currentControlMode == "topdown")
                        Map3D.main.cameraTiltContainer.rotation.x = place.start_tilt || Map3D.main.cameraTiltContainer.rotation.x

                    // Apply home orientation if any
                    if (typeof place.start_orientation == "number" && Map3D.main.currentControlMode == "topdown" && !lookat)
                        Map3D.main.cameraContainer.rotation.y = place.start_orientation || Map3D.main.cameraContainer.rotation.y

                    if (typeof place.start_height == "number" && Map3D.main.currentControlMode == "topdown")
                        Map3D.main.camera.position.y = place.start_height || Map3D.main.camera.position.y

                    let spread = 5
                    if (place.start_radius) {
                        spread = place.start_radius
                    }

                    if (home) {
                        const randomPos = this.generatePointInCircle(spread, home.x, home.z)
                        let xPos = randomPos.x
                        let zPos = randomPos.y

                        Map3D.main.setAvatarPosition(xPos, home.y, zPos, false)
                    }

                    if (lookat) {
                        let deltaX = (Map3D.main.source.userAvatar.properties.x - lookat.x)
                        let deltaY = (Map3D.main.source.userAvatar.properties.z - lookat.z)
                        let degree = Math.atan2(deltaX, deltaY)
                        Map3D.main.cameraContainer.rotation.y = degree
                    }

                    // Update UI
                    this.forceUpdate()
                }
            })
        }
    }

    /**
     * @private Generates a random point inside a circle.
     * @param {number} radius Radius around circle centre.
     * @param {number} centerX Center x co-ordinate of the circle.
     * @param {number} centerY Center y co-ordinate of the circle.
     */
    generatePointInCircle(radius, centerX, centerY) {
        const r = radius * Math.sqrt(Math.random())
        const theta = Math.random() * 2 * Math.PI

        const xPos = Math.round(r * Math.cos(theta) + centerX)
        const yPos = Math.round(r * Math.sin(theta) + centerY)

        return {
            x: xPos,
            y: yPos
        }
    }

    updateMiniMap() {

        let image = null

        let photoCamera = Map3D.main.camera.clone()

        let mapHeight = Server.dimension.data.minimap_height || 200

        let currentPosition = {x: Map3D.main.source.userAvatar.properties.x, y: Map3D.main.source.userAvatar.properties.y}

        if (Map3D.main.controls.map.currentControlMode == "firstperson") {
            photoCamera.position.x = 0
            photoCamera.position.y = mapHeight/2
            photoCamera.position.z = -5
            photoCamera.rotation.set(-1.5707963267948963, 0, 0)
            photoCamera.quaternion.set(-0.7, 0, 0, 0.7)
            photoCamera.fov = 90
        } else {
            photoCamera.position.x = currentPosition.x
            photoCamera.position.y = mapHeight
            photoCamera.position.z = currentPosition.y
            photoCamera.quaternion.set(-0.7, 0, 0, 0.7)
            photoCamera.fov = 90
        }

        let screenshotRenderer = Map3D.main
        photoCamera.aspect = 1600 / 1200;
        photoCamera.updateProjectionMatrix();
        screenshotRenderer.renderer.render( screenshotRenderer.scene, photoCamera );
        image = screenshotRenderer.renderer.domElement.toDataURL("image/jpeg", 0.25);

        // Save
        Server.dimension.update({ minimap_center: currentPosition })
        Server.dimension.update({ minimap_image: image  })
        Server.dimension.update({ customMinimap: false })

    }

    async uploadMiniMap(){
        // Select file
        let file = await JSFileManager.pick({})

        // Check extension is in our known list
        if (!['.jpg', '.jpeg', '.gif', '.png'].find(ext => file.name.toLowerCase().endsWith(ext))) {
            Swal.fire({
                title: 'Invalid Image Type',
                html: 'Please select a valid image type. Supported image types are:<br/><code>.jpg</code>, <code>.jpeg</code>, <code>.gif</code>, <code>.png</code> and <code>.svg</code>',
                icon: 'warning',
                confirmButtonText: 'OK'
            })
            return
        }

        // Upload the file
        let uploadedFile = await Storage.uploadFile(file)

        // Save
        Server.dimension.update({ minimap_image: uploadedFile })
        Server.dimension.update({ customMinimap: true })

        Swal.fire({
            title: 'Success!',
            html: 'Minimap image has been successfully uploaded!',
            icon: 'success'
        })
    }

    updatePlaces(key, field, change) {
        // Get places
        let places = Server.dimension.data.places || []

        let home = {}
        let lookat = {}

        // Find index of area we are looking to update
        const areaIndex = places.findIndex(p => p.key === key.key)

        // Area does not exist
        if (areaIndex < 0) {
            console.error(`[AgendaPlugin] Cannot find area '${key.displayName}' to update`)
            return
        }

        // Update values based on field

        if (field == "displayName") {
            places[areaIndex].displayName = change.displayName
        }
        else if (field == "description") {
            places[areaIndex].description = change.description
        }
        else if (field == "activeEvent") {
            places[areaIndex].active_event = change.active_event
        }
        else if (field == "startOrientation") {
            places[areaIndex].start_orientation = change.start_orientation
        }
        else if (field == "startHeight") {
            places[areaIndex].start_height = change.start_height
        }
        else if (field == "startTilt") {
            places[areaIndex].start_tilt = change.start_tilt
        }
        else if (field == "startRadius") {
            places[areaIndex].start_radius = change.start_radius
        }
        else if (field == "startAt") {
            places[areaIndex].startAt = change.startAt
        }
        else if (field == "endAt") {
            places[areaIndex].endAt = change.endAt
        }
        else if (field == "home") {
            home = {
                x: Map3D.main.source.userAvatar.properties.x,
                y: Map3D.main.source.userAvatar.properties.height,
                z: Map3D.main.source.userAvatar.properties.y
            }

            places[areaIndex].home_position = home
            places[areaIndex].start_x = home.x
            places[areaIndex].start_y = home.y
            places[areaIndex].start_z = home.z
        }
        else if (field == "lookat") {
            lookat = {
                x: Map3D.main.source.userAvatar.properties.x,
                y: Map3D.main.source.userAvatar.properties.height,
                z: Map3D.main.source.userAvatar.properties.y
            }

            places[areaIndex].lookat_position = lookat
            places[areaIndex].lookstart_x = lookat.x
            places[areaIndex].lookstart_y = lookat.y
            places[areaIndex].lookstart_z = lookat.z
        }
        else if (field == "startX" || field == "startY" || field == "startZ") {
            home = {
                x: change.start_x || places[areaIndex].start_x || 0,
                y: change.start_y || places[areaIndex].start_y || 0,
                z: change.start_z || places[areaIndex].start_z || 0
            }

            places[areaIndex].home_position = home

            if (field == "startX") {
                places[areaIndex].start_x = change.start_x
            } else if (field == "startY") {
                places[areaIndex].start_y = change.start_y
            } else {
                places[areaIndex].start_z = change.start_z
            }
        }
        else if (field == "lookStartX" || field == "lookStartY" || field == "lookStartZ") {
            lookat = {
                x: change.lookstart_x || places[areaIndex].lookstart_x || 0,
                y: change.lookstart_y || places[areaIndex].lookstart_y || 0,
                z: change.lookstart_z || places[areaIndex].lookstart_z || 0
            }

            places[areaIndex].lookat_position = lookat

            if (field == "lookStartX") {
                places[areaIndex].lookstart_x = change.lookstart_x
            } else if (field == "lookStartY") {
                places[areaIndex].lookstart_y = change.lookstart_y
            } else {
                places[areaIndex].lookstart_z = change.lookstart_z
            }
        }

        this.setState({ selectedPlaces: places[areaIndex] })

        // Save
        Server.dimension.update({ places })
    }

    createGuid() {
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
            var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8)
            return v.toString(16)
        })
    }

    addPlaces() {
        Swal.mixin({
            input: 'text',
            confirmButtonText: 'Next &rarr;',
            showCancelButton: true,
            progressSteps: ['1', '2']
          }).queue([
            {
                title: 'Agenda Speaker',
                text: 'Name of the speaker',
                input: 'text',
                inputValidator: result => result.trim().length < 1 && 'Name should be at least one character in length.'
            },
            {
                title: 'Agenda Topic',
                text: 'Topic of discussion',
                input: 'textarea'
            }
          ]).then((result) => {
            if (result.value) {

                let key = this.createGuid()
                let value = result.value
                let place = { key: key, displayName: value[0], description: value[1] }

                let places = Server.dimension.data.places || []

                // Add it
                places.push(place)

                // Save
                Server.dimension.update({ places })

              Swal.fire({
                title: 'All done!',
                icon: 'success',
                confirmButtonText: 'Continue'
            })
        }
        })
    }

    /** @private Remove a plugin */
    removePlaces(place) {

        // Remove existing, if any
        let places = Server.dimension.data.places || []

        if (place.key) {
            places = places.filter(s => s.key != place.key)
        } else {
            places = places.filter(s => s.description != place.description)
        }

        // Save
        Server.dimension.update({ places })

        this.setState({ selectedPlaces: null })

    }

    /**
     * Updates avatar position based on where user clicked on minimap.
     * @param {React.MouseEvent<HTMLImageElement, MouseEvent>} e Mouse click event.
     */
    clickedMiniMap(e) {
        // Get rectangle bounds that contain the minimap image
        let minimapImage = document.getElementById('minimap');
        let elemRect = minimapImage.getBoundingClientRect();

        // Use bounds to determine width and height of minimap
        let imageWidth = elemRect.right - elemRect.left;
        let imageHeight = elemRect.bottom - elemRect.top;

        // Find center of minimap
        let centerX = elemRect.left + (imageWidth / 2);
        let centerY = elemRect.top + (imageHeight / 2);

        // Used when scaling is applied to minimap
        let dividerX = imageWidth / 320;
        let dividerY = imageHeight / 240;

        if (Server.dimension.data.customMinimap) {
            // Get minimap information from server
            let minimapPosition = Server.dimension.data.minimapcustom_center || [0, 0];
            let minimapClickDistance = (Server.dimension.data.minimap_click || 100) / 100;

            // Determine position to move to
            let positionX = (e.clientX - centerX) * (minimapClickDistance / dividerX / 1.25);
            let positionY = (e.clientY - centerY) * (minimapClickDistance / dividerY / 1.25);

            // Move to position
            Map3D.main.moveAvatarToTarget(positionX + minimapPosition[0], positionY + minimapPosition[1])

            // Update UI
            this.forceUpdate()
        } else {
            let centerPos = Server.dimension.data.minimap_center || { x: 0, y: 0 };
            let mapHeight = Server.dimension.data.minimap_height || 20;
            let multiplier = mapHeight * 85/10000;

            // Determine position relative to center of minimap
            let positionX = (e.clientX - centerX) * multiplier / dividerX;
            let positionY = (e.clientY - centerY) * multiplier / dividerY;

            // Move to position
            Map3D.main.moveAvatarToTarget(positionX + centerPos.x, positionY + centerPos.y)

            // Update UI
            this.forceUpdate()
        }
    }

}

/**
 * Renders a row item for a place.
 * @param {object} props Properties related to the place to display.
 * @param {object} props.event Event object used to display information.
 * @param {boolean} props.event.active_event `true` if event is active, `false` otherwise.
 * @param {string} props.event.displayName Name of the speaker.
 * @param {string} props.event.description Description of the topic of discussion.
 * @param {string} props.event.startAt Start date of discussion.
 * @param {string} props.event.endAt End date of discussion.
 * @param {Function} props.onClick Function to execute when item is clicked.
 * @param {(number | string)=} props.opacity Optional. Specifies who opaque the row should be. Default is 0.9
 */
const AgendaRow = props => {

    // Specify opacity of row item
    let opacity = props.opacity || '0.9'

    // Time and date values
    let startTime = null
    let startDate = null
    let startDateStr = null
    let endTime = null
    let endDate = null
    let endDateStr = undefined

    if (props.event.startAt) {
        const startValues = new Date(props.event.startAt.replace(/\s+/g, 'T')+'Z')
        startTime = startValues.toLocaleTimeString()
        startDate = new Date(props.event.startAt.replace(/\s+/g, 'T')+'Z')
    }

    if (props.event.endAt) {
        const endValues = new Date(props.event.endAt.replace(/\s+/g, 'T')+'Z')
        endTime = endValues.toLocaleTimeString()
        endDate = new Date(props.event.endAt.replace(/\s+/g, 'T')+'Z')
    }

    const backgroundColorPast = 'rgba(255, 255, 255, 0.1)'
    const backgroundColorActive = constants.colors.green
    const backgroundColorFuture = constants.colors.blue

    let backgroundColor = backgroundColorPast
    let currentDate = new Date()
    let isCurrentlyActive = props.event.active_event
    let isFinished = false

    if (props.event.active_event) {
        backgroundColor = backgroundColorActive
    } else if (endDate && startDate) {
        if (currentDate.getTime() > endDate.getTime()) {
            backgroundColor = backgroundColorPast
            isFinished = true
        } else if (currentDate.getTime() < startDate.getTime() && !props.event.active_event) {
            backgroundColor = backgroundColorFuture
        } else if (currentDate.getTime() >= startDate.getTime() && currentDate.getTime() <= endDate.getTime()) {
            backgroundColor = backgroundColorActive
            isCurrentlyActive = true
        }
    }

    const hasDatesSet = startDate && startTime && endDate && endTime

    if (hasDatesSet) {
        startDateStr = startDate.toLocaleString('default', { weekday: 'short', month: 'short', day: 'numeric', year: 'numeric' })
        endDateStr = endDate.toLocaleString('default', { weekday: 'short', month: 'short', day: 'numeric', year: 'numeric' })
    }

    // Render UI
    return <div onClick={props.onClick} style={{ display: 'flex', position: 'relative', margin: '7px 10px', borderRadius: 6, backgroundColor: backgroundColor, cursor: 'pointer', overflow: 'hidden' }}>

        {/* Name and description */}
        <div style={{ display: 'flex', flexDirection: 'column', margin: '10px 5px', width: '100%' }}>
            {/* Name */}
            <div style={{ display: 'flex', fontSize: 16, color: '#ffffff', fontStyle: hasDatesSet ? 'normal' : 'italic', wordBreak: 'break-word', margin: '0 10px', paddingBottom: 5, opacity: opacity }}>
                { isCurrentlyActive || isFinished
                    ? isCurrentlyActive ? 'Currently Active' : `Finished at ${endTime} on ${endDateStr}`
                    : hasDatesSet
                        ? `Active from ${startTime}${startDateStr === endDateStr ? '' : ` on ${startDateStr}`} to ${endTime} on ${endDateStr}`
                        : 'Date has not been set'
                }
            </div>

            {/* Speaker and Topic */}
            <div style={{ display: 'flex', flexDirection: 'column', margin: '0 10px', fontSize: 13, color: '#ffffff', opacity: opacity }}>
                <div style={{ padding: '3px 0' }}>
                    <strong>Speaker:</strong> { props.event.displayName || 'Unknown' }
                </div>
                <div style={{ padding: '3px 0' }}>
                    <strong>Topic:</strong> { props.event.description || '-' }
                </div>
            </div>
        </div>

    </div>

}
