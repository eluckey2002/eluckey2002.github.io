import React from 'react'

import Analytics from '../../../../js/utilities/Analytics'
import BasePlugin from '../../BasePlugin'
import constants from '../../../constants'
import Hooks from '../../../utilities/Hooks'
import Map3D from '../../../Map3D'
import Server from '../../../Server'
import Toast from '../../../ui/Toast'
import Users from '../../../Users'

import { AccordionHeader, ScrollContainer } from '../../../ui/PanelComponents'
import { ContextMenu, ContextMenuItem } from '../../../ui/EditorUI/ContextMenu'

export default class HelpPlugin extends BasePlugin{

    /** Plugin info */
    static id = "help"
    static name = "Help & Instructions"
    static description = "Display Help"

    onLoad() {

        // Register a menu item
        this.menus.register({
            icon: require('./information.svg'),
            text: 'Help',
            section: 'controls',
            order: 999,
            inAccordion: true,
            panel: {
                component: props => <HelpPanel plugin={this} {...props} />,
                autoHeight: true
            }
        })

    }
}

class HelpPanel extends React.PureComponent {

    /** Initial state */
    state = {
        quickGuideVisible: false,
        showThankYou: false,

        linkText: '',
        contextMenuPos: { x: 0, y: 0 },
        showContextMenu: false
    }

    /** Link to redirect to about page */
    aboutLink = 'https://www.spatialweb.net/'

    /** Help image used in the popup */
    helpImage = null

    /** Called after first render */
    componentDidMount() {
        Hooks.get('view.change').addHandler(this.updateHelpImage)
        this.helpImage = require('./help-screen-simple.svg')
    }

    /** Called before component is unloaded */
    componentWillUnmount() {
        Hooks.get('view.change').removeHandler(this.updateHelpImage)
    }

    /**
     * @private Updates the help image so that it makes sense for the current user view.
     * @param {object} data Data given by the calling function.
     * @param {string} data.view New view mode.
     */
    updateHelpImage = data => {
        const viewMode = data.view
        let helpImg = require('./help-screen-simple.svg')

        if (viewMode === 'topdown' || viewMode === 'first-person') {
            helpImg = require('./help-screen-advanced.svg')
        } else if (viewMode === 'free-camera') {
            helpImg = require('./help-screen-free.svg')
        }

        // Update image
        this.helpImage = helpImg

        // User is currently viewing the help screen, so change the image there
        const imageDOM = document.getElementById('overview-help-image')
        if (imageDOM) {
            imageDOM.src = this.helpImage
        }

        this.forceUpdate()
    }

    /** Called when quick guide screen is clicked. */
    onQuickGuideClick = e => {
        this.setState({ quickGuideVisible: false })
    }

    /**
     * Toggles the quick guide on or off.
     * @param {boolean} on `true` to show the help image, `false` otherwise.
     */
    toggleQuickGuide(on) {
        // Show quick guide
        if (on) {
            // Already shown
            if (document.getElementById('overview-help-screen') != null) {
                return
            }

            const helpElement = document.createElement('div')
            helpElement.setAttribute('id', 'overview-help-screen')
            helpElement.setAttribute('style', 'position: fixed; top: 0; left: 0; width: 100%; height: 100%; z-index: 101; background-color: rgba(0, 0, 0, 0.9); display: flex; align-items: center; justify-content: center; cursor: pointer;')
            helpElement.addEventListener('click', this.onQuickGuideClick)

            const imageElement = document.createElement('img')
            imageElement.src = this.helpImage
            imageElement.setAttribute('id', 'overview-help-image')
            imageElement.setAttribute('style', 'width: 80%; max-width: calc(100% - 40px); max-height: calc(100% - 40px);')

            helpElement.appendChild(imageElement)
            document.body.appendChild(helpElement)
            return
        }

        // Already hidden
        if (document.getElementById('overview-help-screen') == null) {
            return
        }

        // Hide quick guide
        document.getElementById('overview-help-screen').removeEventListener('click', this.onQuickGuideClick)
        document.getElementById('overview-help-screen').removeChild(document.getElementById('overview-help-image'))
        document.body.removeChild(document.getElementById('overview-help-screen'))
    }

    /**
     * @private Called when a chat message link has been clicked.
     * @param {MouseEvent} e Mouse event.
     * @param {string} link Link that was clicked.
     */
    onLinkClick(e, link) {
        this.setState({
            linkText: link,
            contextMenuPos: { x: e.clientX, y: e.clientY },
            showContextMenu: true
        })
    }

    /**
     * @private Copies a URL to the clipboard.
     * @param {string} url URL to copy to clipboard.
     */
    onCopyURL(url) {
        navigator.clipboard.writeText(url)

        Toast.show({
            text: 'URL copied to clipboard',
            icon: require('./copy-white.svg'),
            duration: 3000,
            autoWidth: true
        })
    }

    /** Render relevant UI */
    render() {
        if (this.state.showThankYou) {
            return this.renderThankYou()
        } else {
            return this.renderList()
        }
    }

    /** Render the 'Thank You' panel */
    renderThankYou() {

        return <>
            {/* Header bar */}
            <AccordionHeader title='Help' buttonLayout='close' show={this.props.show} sticky={true} onClickClose={e => this.props.onClose()} onClickChevron={e => this.props.onChevron()} />

            {/* Show or hide plugin content */}
            { !this.props.show
                ? null
                : <>
                    <AccordionHeader title='Thank You' buttonLayout='back' sticky={true} top={constants.panelHeaderHeight} onClickBack={e => this.setState({ showThankYou: false })} />

                    <TextRow>
                        We will contact you at <span style={{ fontStyle: 'italic' }}>{Users.currentUser.email}</span>. Thank you!
                    </TextRow>

                    <TextRow>
                        In the meantime, please find case studies, press kits, and more at <a href={this.aboutLink} target='_blank' style={{ color: '#58a6ff' }} onContextMenu={e => this.onLinkClick(e, this.aboutLink)}>{ this.aboutLink }</a>
                    </TextRow>

                    {/* Context menu for links */}
                    { this.state.showContextMenu
                        ? <ContextMenu x={this.state.contextMenuPos.x} y={this.state.contextMenuPos.y} onClose={e => this.setState({ linkText: '', showContextMenu: false })} style={{ minWidth: 180 }}>
                            <ContextMenuItem icon={require('./new-tab.svg')} text='Open In New Tab' onClick={e => window.open(this.state.linkText, '_blank')} />
                            <ContextMenuItem icon={require('./copy.svg')} text='Copy URL' onClick={e => this.onCopyURL(this.state.linkText)} />
                        </ContextMenu>
                        : null
                    }
                </>
            }

        </>

    }

    /** Renders the Help UI */
    renderList() {

        // Find tutorial plugin, if it exists
        let tutorialPlugin = this.props.plugin.plugins.all.find(p => p.id == 'tutorial-tasks')

        // Find the places plugin if it exists
        let placesPlugin = this.props.plugin.plugins.all.find(p => p.id == 'places')

        // Find the "Help Lounge" place, if it exists
        let areas = Server.dimension.data.areas || []
        let helpLoungeArea = areas.find(a => a.displayName == "Help Lounge")

        // Quick guide will make no sense in VR mode, since we would not move
        // using a keyboard or look using a mouse/trackpad
        const isVR = Map3D.main?.controls?.id != null && Map3D.main.controls.id === 'vr'

        // Show or hide quick guide
        this.toggleQuickGuide(this.state.quickGuideVisible)

        // Render UI
        return <>

            {/* Header bar */}
            <AccordionHeader title='Help' buttonLayout='close' show={this.props.show} sticky={true} onClickClose={e => this.props.onClose()} onClickChevron={e => this.props.onChevron()} />

            {/* Show or hide plugin content */}
            { !this.props.show
                ? null
                : <>
                    {/* Container area */}
                    <ScrollContainer>

                        <div style={{ height: 15 }} />

                        {/* Opens the help center in a new tab */}
                        <ListItem icon={require('./vatom.svg')} title="Visit Help Center" onClick={e => window.open('https://help.vatom.com/vatom-spatialweb', '_blank')} />

                        {/* Add 'tutorial' item if plugin exists */}
                        { tutorialPlugin
                            ? <ListItem icon={require('./tutorial.svg')} title="Show Tutorial" onClick={e => tutorialPlugin.showUI()} />
                            : null
                        }

                        {/* Displays an image explaining the UI, only when not in VR mode */}
                        { isVR
                            ? null
                            : <ListItem icon={require('./quickhelp.svg')} title="Show Quick Guide" onClick={e => this.setState({ quickGuideVisible: true })} />
                        }

                        {/* Takes the user to the 'Help' area in a space (if one exists) */}
                        { placesPlugin && helpLoungeArea
                            ? <ListItem icon={require('./helpdesk.svg')} title="Take me to the Help lounge" onClick={e => placesPlugin.goToArea(helpLoungeArea)} />
                            : null
                        }

                        <ListItem icon={require('./launch.svg')} title="I am INTERESTED in SpatialWeb" onClick={e => { Analytics.track('learnMore', Users.currentUser); this.setState({ showThankYou: true }) }} />

                        <div style={{ height: 20 }} />

                    </ScrollContainer>
                </>
            }

        </>
    }

}

/**
 * Displays a clickable row item with an icon.
 * @param {object} props List item properties.
 * @param {any} props.icon Icon to display.
 * @param {string} props.title Title to display.
 * @param {Function} props.onClick Function to execute when item is clicked.
 */
const ListItem = props => {
    // Hovering state
    let [ isHovering, setHovering ] = React.useState(false)

    // Return UI
    return <div style={{ display: 'flex', margin: '0px 20px 4px 20px', padding: '7px 0px', alignItems: 'center', borderRadius: 6, backgroundColor: isHovering ? 'rgba(255, 255, 255, 0.1)' : 'rgba(255, 255, 255, 0)', cursor: 'pointer', opacity: 0.8 }} onMouseOver={e => setHovering(true)} onMouseOut={e => setHovering(false)} onClick={props.onClick}>
        {/* List item image */}
        <div style={{ width: 20, height: 20, margin: '5px 10px', flex: '0 0 auto', backgroundImage: `url(${props.icon})`, backgroundSize: 'contain', backgroundPosition: 'center', backgroundRepeat: 'no-repeat' }} />

        {/* List item text */}
        <div style={{ flex: '1 1 auto', color: '#FFF', fontSize: 16 }}>
            { props.title }
        </div>
    </div>
}

/**
 * Displays text in a row.
 * @param {object} props Text row properties.
 */
const TextRow = props => {
    return <div style={{ color: Server.dimension.data.fieldColor, fontSize: 15, margin: 10 }}>
        { props.children }
    </div>
}
