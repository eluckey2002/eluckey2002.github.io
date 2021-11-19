import React from 'react';
import BasePlugin from '../../BasePlugin';
import TestPanel from './components';
import { CustomVideo } from './components/PanelItems';

import Walkthrough from './components/video/walkthrough.mp4';

/**
 * Welcome Page for Cannes.
 * 
 * Replaces the default starting screen with introduction and how to use app.
 */
export default class WelcomeCannesPlugin extends BasePlugin {

    /** Plugin info */
    static id = "welcome-cannes"
    static name = "Cannes Welcome Page"
    static description = "Customized landing page for Cannes"
    static hidden = true
    welcomePanel = props => <CannesLanding onClose={props.onClose} {...props} />

    /** Called when plugin is loaded */
    onLoad() {

        this.menus.register({
            id: 'welcome-cannes',
            text: 'Cannes',
            section: 'start-screen'
        })

    }

}

/**
 * Landing page for Cannes.
 * User will see this when first entering a space.
 */
class CannesLanding extends React.PureComponent {

    /** Initial state */
    state = {
        innerMargin: 55
    }

    /** Called when component is loaded */
    componentDidMount() {
        window.addEventListener('resize', this.onResize)
    }

    /** Called when component is unloaded */
    componentWillUnmount() {
        window.removeEventListener('resize', this.onResize)
    }

    /** Called when window resizes */
    onResize = e => {
        this.forceUpdate()
    }

    /** Render UI */
    render() {
        const isMobile = window.innerWidth < 850
        const footerHeight = 80

        return <div id='welcome-cannes' style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', backgroundColor: '#416d90', zIndex: 9999, fontFamily: "'Riviera Nights', Inter, Verdana, Arial", letterSpacing: '0.3px' }}>

            {/* Content */}
            <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: `calc(100% - ${footerHeight}px)` }}>

                {/* Cannes logo */}
                <div style={{ display: 'flex', position: 'absolute', top: 35, width: '100%', justifyContent: 'center', alignItems: 'center' }}>
                    <img src={require('./logo.svg')} style={{ width: 138, height: 40, backgroundColor: '#416d90', padding: '0px 25px 0px 20px', zIndex: 1 }} />
                </div>

                {/* Inner box with border */}
                <div style={{ display: 'flex', position: 'relative', flexDirection: 'column', width: `calc(100% - ${this.state.innerMargin*2}px)`, height: `calc(100% - ${this.state.innerMargin*2}px)`, margin: `${this.state.innerMargin}px`, backgroundColor: 'transparent', border: '3px solid #f4f4f4', justifyContent: 'center', alignItems: 'center' }}>

                    {/* Title */}
                    <div style={{ display: 'flex', position: 'relative', flexDirection: 'column', margin: '10px 0 30px 0', justifyContent: 'center', alignItems: 'center' }}>
                        <div style={{ color: '#f4f4f4', fontSize: 23, fontWeight: 700 }}>
                            Welcome to the
                        </div>
                        <div style={{ textTransform: 'uppercase', color: '#f4f4f4', fontSize: 39, fontWeight: 900 }}>
                            Lions Virtual Experience
                        </div>
                    </div>

                    {/* Middle section */}
                    <div style={{ display: 'grid', position: 'relative', width: '100%', gridTemplateColumns: '558px 382px', justifyContent: 'center', alignItems: 'center' }}>

                        {/* Video player */}
                        <CustomVideo src={Walkthrough} style={{ width: 589, height: 363 }} autoPlay={true} muted={true} />

                        {/* Test Panel */}
                        <div style={{ display: 'flex', position: 'relative', flexDirection: 'column', overflow: 'hidden', width: 321, minHeight: 220, borderRadius: 8, background: '#e8dcc6', padding: '22px 30px' }}>
                            <TestPanel maxSteps={4} onComplete={this.props.onClose} />
                        </div>

                    </div>

                    {/* Bottom section */}
                    <div style={{ display: 'flex', position: 'relative', flexDirection: 'column', width: '100%', margin: '30px 0 10px 0', justifyContent: 'center', alignItems: 'center' }}>

                        {/* Skip button */}
                        <div style={{ display: 'flex', color: '#f4f4f4', margin: '0 0 13px 0', width: 178, height: 50, fontWeight: 500, justifyContent: 'center', alignItems: 'center', border: '2px solid #f4f4f4', cursor: 'pointer' }} onClick={this.props.onClose}>
                            Skip this setup
                        </div>

                        {/* Link to download Google Chrome */}
                        <div style={{ position: 'relative', color: '#f4f4f4', fontSize: 11 }}>
                            The SpatialWeb experience requires the <a href='https://www.google.com/chrome/' target='_blank' style={{ textDecoration: 'underline', color: '#f4f4f4' }}>Chrome Browser</a>.
                        </div>

                    </div>
                </div>

            </div>

            {/* Footer */}
            <div style={{ display: 'flex', position: 'absolute', bottom: 0, left: 0, width: '100%', height: footerHeight, color: '#ffffff', backgroundColor: '#2e2e2e', alignItems: 'center' }}>

                {/* Spatial Web logo */}
                <a href='https://spatialweb.net' target='_blank' style={{ display: 'flex', flexDirection: 'row', padding: isMobile ? '0 0 0 20px' : `0 0 0 ${this.state.innerMargin + 2}px`, flex: '0 0 auto', textDecoration: 'none', alignItems: 'center' }}>
                    <div style={{ color: '#ffffff', fontSize: 12, fontWeight: 400, margin: '0 13px 0 0' }}>
                        Powered by
                    </div>

                    <img src={require('./powered-by.svg')} style={{ width: isMobile ? 122 : 151, height: isMobile ? 32 : 40 }} />
                </a>

                <div style={{ flex: '1 1 auto' }} />

                {/* Footer legal stuff */}
                <div style={{ padding: isMobile ? '0 20px 0 0' : `0 ${this.state.innerMargin + 2}px 0 0`, fontSize: 12, fontWeight: 400, flex: '0 0 auto', color: '#ffffff', textAlign: 'right' }}>
                    &copy; 2020 Vatom Inc. { isMobile ? <br /> : ' | ' } <a href='https://www.vatominc.com/wp-content/uploads/2020/06/privacy-policy.pdf' target='_blank' style={{ textDecoration: 'underline', color: '#ffffff' }}>Privacy Policy</a> { isMobile ? <br /> : '  |  ' } <a href='https://www.vatominc.com/wp-content/uploads/2020/06/terms.pdf' target='_blank' style={{ textDecoration: 'underline', color: '#ffffff' }}>Terms of Service</a>
                </div>

            </div>

        </div>
    }

}
