import BasePlugin from "../../BasePlugin"
import React from 'react'
import ReactDOM from 'react-dom'
import Users from '../../../Users'
import constants from "../../../constants"
import Timer from "../../../utilities/Timer"

// Tutorial pages
const Pages = [

    {
        title: `Go`,
        text: `Click, drag, or use keys`,
        images: [require('./v2/icon_mouse_drag.svg'),require('./v2/icon_finger_drag.svg'), require('./v2/icon_updown_keys.svg')]
    },
    {
        title: `Turn`,
        text: `Use joystick, doubletap left/right, or use keys`,
        images: [require('./v2/icon_joystick_horiz.svg'), require('./v2/icon_leftright_keys.svg'), require('./v2/icon_two_finger_swipe.svg')]
    },
    {
        title: `Zoom In & Out`,
        text: `Mousewheel, +/- or, pinch/expand`,
        images: [require('./v2/icon_mouse_scroll.svg'),require('./v2/icon_zoom_buttons.svg'), require('./v2/icon_two_finger_zoom.svg')]
    },
    {
        title: `Change Controls`,
        text: `Click profile picture -> settings`,
        image: require('./v2/icon_change_controls.svg')
    },
    {
        title: `Find and go to someone`,
        text: <>Click on the "people" button,<br/>then click on the<img width='30px' src={require('./icon-goto-alt.svg')}/>icon</>,
        image: require('./icon-goto.svg')
    },
    {
        title: `Go to a place`,
        text: <>In the places menu<img width='30px' src={require('./icon-gotoplaces-alt.svg')}/>, click on the<br/>mini-map or on a place name</>,
        image: require('./icon-gotoplaces.svg')
    },
    {
        title: `Become a real person`,
        text: <>Click on the video icon<img width='30px' src={require('./icon-realperson-alt.svg')}/>to open and<br/>close your video</>,
        image: require('./icon-realperson.svg')
    },
    {
        title: `Engage with someone`,
        text: `Click on someone's avatar to get options to exchange business cards, follow them or chat`,
        image: require('./icon-engage.svg')
    },
    {
        title: `Change your perspective`,
        text: <>Click<img width='30px' src={require('./icon-perspective-alt.svg')}/>for 1st Person View.<br/>Click again to return to normal view</>,
        image: require('./icon-perspective.svg')
    },
    {
        title: `Reset your view`,
        text: <>Click on the "reset view" button<img width='35px' src={require('./icon-reset-alt.svg')}/>to snap back<br/>to default view</>,
        image: require('./icon-reset.svg')
    },
    {
        title: `That's it, you're done!`,
        text: `Explore all the other icons and buttons in the app. \nYou can't break anything!`,
        image: require('./icon-done.svg')
    }

]

const PagesLanding = [

    {
        title: `Go`,
        text: `Click, drag, or use keys`,
        images: [require('./v2/icon_mouse_drag.svg'),require('./v2/icon_finger_drag.svg'), require('./v2/icon_updown_keys.svg')]
    },
    {
        title: `Turn`,
        text: `Use joystick, doubletap left/right, or use keys`,
        images: [require('./v2/icon_joystick_horiz.svg'), require('./v2/icon_leftright_keys.svg'), require('./v2/icon_two_finger_swipe.svg')]
    },
    {
        title: `Zoom In & Out`,
        text: `Mousewheel, +/- or, pinch/expand`,
        images: [require('./v2/icon_mouse_scroll.svg'),require('./v2/icon_zoom_buttons.svg'), require('./v2/icon_two_finger_zoom.svg')]
    },
    {
        title: `Change Controls`,
        text: `Click profile picture -> settings`,
        image: require('./v2/icon_change_controls.svg')
    },
    {
        title: `Learn More / Get Help`,
        text: `For the full tutorialclick the help icon`,
        image: require('./icon-help.svg')
    },
    {
        title: `That's it, you're done!`,
        text: `Explore! \nYou can't break anything!`,
        image: require('./icon-done.svg')
    }

]

export default class TutorialPlugin extends BasePlugin {

    // Plugin info
    static id = 'tutorial-tasks'
    static name = 'Tutorial'
    static description = "Displays tutorial tasks to the user."

    /** Called on load */
    onLoad() {
        
        // Checks when entry animation is over and then shows tutorial
        if (!localStorage['tutorial.complete']) {
            this.renderer = Timer.setInterval(() => {
                if(Users.entryAnimationFinished) {
                    Timer.setTimeout(this.showUI, 250)
                    Timer.clearInterval(this.renderer)
                    return
                }

            }, 1000)
       }
    }

    /** Called on unload */
    onUnload() {
        
        // Hide the UI if it's visible right now
        this.hideUI()

    }

    /** Show the UI */
    showUI = () => {

        // Stop if already visible
        if (this.div)
            return

        // Render it
        this.div = document.createElement('div')
        document.body.appendChild(this.div)
        ReactDOM.render(<Tutorial onClose={e => this.close()} />, this.div)

    }

    /** Called when the user closes the tutorial popup */
    close = () => {

        // Close it
        this.hideUI()

        // Notify closed
        localStorage['tutorial.complete'] = true

    }

    /** Hide the UI */
    hideUI = () => {

        // Stop if already hidden
        if (!this.div)
            return

        // Remove it
        ReactDOM.unmountComponentAtNode(this.div)
        document.body.removeChild(this.div)
        this.div = null

    }

}

class Tutorial extends React.PureComponent {

    /** Initial state */
    state = {
        page: 0,
        pageLanding: 0
    }

    render() {

        // Return UI
        let mobile = window.innerWidth < 500
        let isOnLast = this.state.page == Pages.length-1
        let isOnLastLanding = this.state.pageLanding == PagesLanding.length-1

        return localStorage['tutorial.complete'] ? <div style={{ position: 'fixed', zIndex: 99, top: mobile ? 15 : '15%', left: mobile ? 15 : 'calc(50% - 472px/2)', width: mobile ? 'calc(100% - 30px)' : 472, display: 'flex', flexDirection: 'column', borderRadius: 10, overflow: 'hidden', boxShadow: '0px 0px 30px rgba(67, 67, 68, 0.2)', opacity: this.state.closing ? 0 : 1, transition: 'opacity 0.5s' }}>
            
            {/* Single header image */}
            {Pages[this.state.page].image ? <>
                <div style={{ width: '100%', height: 150, backgroundImage: isOnLast ? 'none' : 'url(' + require('./top-bg.svg') + ')', backgroundColor: isOnLast ? '#100146' : 'transparent', backgroundSize: 'cover', backgroundPosition: 'center', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' }}>
                    {Pages[this.state.page] ? <img src={Pages[this.state.page].image} style={{ maxWidth: mobile ? 'calc(100% - 40px)' : 'none' }} /> : null}
                </div> 
            </> : null}

            {/* Multiple header images */}
            {Pages[this.state.page].images ? <>
                <div style={{ width: '100%', height: 150, backgroundImage: isOnLast ? 'none' : 'url(' + require('./top-bg.svg') + ')', backgroundColor: isOnLast ? '#100146' : 'transparent', backgroundSize: 'cover', backgroundPosition: 'center', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' }}>
                    <div style={{display: 'flex', transform: 'translate(-5px)'}}>
                        {Pages[this.state.page] ? <img src={Pages[this.state.page].images[0]} style={{ maxWidth: mobile ? 'calc(100% - 40px)' : 'none' }} /> : null}
                        <img src={require('./v2/icon_or.svg')} style={{margin: 15}}/>
                        {Pages[this.state.page] ? <img src={Pages[this.state.page].images[1]} style={{ maxWidth: mobile ? 'calc(100% - 40px)' : 'none' }} /> : null}
                        <img src={require('./v2/icon_or.svg')} style={{margin: 15}}/>
                        {Pages[this.state.page] ? <img src={Pages[this.state.page].images[2]} style={{ maxWidth: mobile ? 'calc(100% - 40px)' : 'none' }} /> : null}
                    </div>
                </div> 
            </> : null}

            {/* Text area */}
            <div style={{ position: 'relative', width: '100%', minHeight: 100, backgroundColor: 'white', textAlign: 'center' }}>

                {/* Labels */}
                <div style={{ color: '#1B1464', fontSize: 28, fontWeight: 'bold', padding: '13px 10px 5px 10px' }}>{Pages[this.state.page]?.title}</div>
                <div style={{ color: '#7B8082', fontSize: 16, padding: '0px 44px 58px 44px', lineHeight: '1.8', whiteSpace: mobile ? 'default' : 'pre-wrap' }}>{Pages[this.state.page]?.text}</div>

                {/* Arrows */}
                {this.state.page <= 0 ? null : <img src={require('./left.svg')} style={{ position: 'absolute', bottom: 10, left: 10, cursor: 'pointer' }} onClick={e => this.setState({ page: this.state.page-1 })} />}
                {this.state.page >= Pages.length-1 ? null : <img src={require('./right.svg')} style={{ position: 'absolute', bottom: 10, right: 10, cursor: 'pointer' }} onClick={e => this.setState({ page: this.state.page+1 })} />}
                {this.state.page != Pages.length-1 ? null : <img src={require('./right-done.svg')} style={{ position: 'absolute', bottom: 10, right: 10, cursor: 'pointer' }} onClick={e => this.close()} />}

                {/* Progress bar */}
                <div style={{ position: 'absolute', bottom: 29, left: 99, width: 'calc(100% - 99px - 99px)', height: 10, backgroundColor: 'rgba(20, 20, 20, 0.2)', borderRadius: 5, overflow: 'hidden', position: 'relative' }}>
                    <div style={{ position: 'absolute', top: 0, left: 0, height: '100%', width: (this.state.page / (Pages.length-1) * 100).toFixed(0) + '%', backgroundColor: constants.colors.blue, transition: 'width 0.5s' }} />
                </div>

            </div>

            {/* Close button */}
            <img src={require('./close.svg')} style={{ position: 'absolute', top: 0, right: 0, cursor: 'pointer' }} onClick={e => this.close()} />

        </div> :

        <div style={{ position: 'fixed', zIndex: 99, top: mobile ? 15 : '15%', left: mobile ? 15 : 'calc(50% - 472px/2)', width: mobile ? 'calc(100% - 30px)' : 472, display: 'flex', flexDirection: 'column', borderRadius: 10, overflow: 'hidden', boxShadow: '0px 0px 30px rgba(67, 67, 68, 0.2)', opacity: this.state.closing ? 0 : 1, transition: 'opacity 0.5s' }}>

        {/* Single header image */}
        {PagesLanding[this.state.pageLanding].image ? <>
                <div style={{ width: '100%', height: 150, backgroundImage: isOnLastLanding ? 'none' : 'url(' + require('./top-bg.svg') + ')', backgroundColor: isOnLastLanding ? '#100146' : 'transparent', backgroundSize: 'cover', backgroundPosition: 'center', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' }}>
                    {PagesLanding[this.state.pageLanding] ? <img src={PagesLanding[this.state.pageLanding].image} style={{ maxWidth: mobile ? 'calc(100% - 40px)' : 'none' }} /> : null}
                </div> 
            </> : null}

            {/* Multiple header images */}
            {PagesLanding[this.state.pageLanding].images ? <>
                <div style={{ width: '100%', height: 150, backgroundImage: isOnLastLanding ? 'none' : 'url(' + require('./top-bg.svg') + ')', backgroundColor: isOnLastLanding ? '#100146' : 'transparent', backgroundSize: 'cover', backgroundPosition: 'center', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' }}>
                    <div style={{display: 'flex', transform: mobile ? `scale(0.75)` : `scale(1)`}} >
                        {PagesLanding[this.state.pageLanding] ? <img src={PagesLanding[this.state.pageLanding].images[0]} /> : null}
                        <img src={require('./v2/icon_or.svg')} style={{margin: 15}}/>
                        {PagesLanding[this.state.pageLanding] ? <img src={PagesLanding[this.state.pageLanding].images[1]} /> : null}
                        <img src={require('./v2/icon_or.svg')} style={{margin: 15}}/>
                        {PagesLanding[this.state.pageLanding] ? <img src={PagesLanding[this.state.pageLanding].images[2]} /> : null}
                    </div>
                </div> 
            </> : null}

        {/* Text area */}
        <div style={{ position: 'relative', width: '100%', minHeight: 100, backgroundColor: 'white', textAlign: 'center' }}>

            {/* Labels */}
            <div style={{ color: '#1B1464', fontSize: 28, fontWeight: 'bold', padding: '13px 10px 5px 10px' }}>{PagesLanding[this.state.pageLanding]?.title}</div>
            <div style={{ color: '#7B8082', fontSize: 16, padding: '0px 44px 58px 44px', lineHeight: '1.8', whiteSpace: mobile ? 'default' : 'pre-wrap' }}>{PagesLanding[this.state.pageLanding]?.text}</div>

            {/* Arrows */}
            {this.state.pageLanding <= 0 ? null : <img src={require('./left.svg')} style={{ position: 'absolute', bottom: 10, left: 10, cursor: 'pointer' }} onClick={e => this.setState({ pageLanding: this.state.pageLanding-1 })} />}
            {this.state.pageLanding >= PagesLanding.length-1 ? null : <img src={require('./right.svg')} style={{ position: 'absolute', bottom: 10, right: 10, cursor: 'pointer' }} onClick={e => this.setState({ pageLanding: this.state.pageLanding+1 })} />}
            {this.state.pageLanding != PagesLanding.length-1 ? null : <img src={require('./right-done.svg')} style={{ position: 'absolute', bottom: 10, right: 10, cursor: 'pointer' }} onClick={e => this.close()} />}

            {/* Progress bar */}
            <div style={{ position: 'absolute', bottom: 29, left: 99, width: 'calc(100% - 99px - 99px)', height: 10, backgroundColor: 'rgba(20, 20, 20, 0.2)', borderRadius: 5, overflow: 'hidden', position: 'relative' }}>
                <div style={{ position: 'absolute', top: 0, left: 0, height: '100%', width: (this.state.pageLanding / (PagesLanding.length-1) * 100).toFixed(0) + '%', backgroundColor: constants.colors.blue, transition: 'width 0.5s' }} />
            </div>

        </div>

        {/* Close button */}
        {this.state.pageLanding >= 5 ? <img src={require('./close.svg')} style={{ position: 'absolute', top: 0, right: 0, cursor: 'pointer' }} onClick={e => this.close()} /> : null}

        </div>
    }

    /** Close the popup */
    close() {

        // Animate away
        this.setState({ closing: true })

        // Remove UI after done
        Timer.setTimeout(e => this.props.onClose(), 600)

    }

}
